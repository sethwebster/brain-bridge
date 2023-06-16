import { verifyJWT } from "../../lib/jwt";
import { MessageWithRelations } from "./types";
import { Server, Socket } from "socket.io";
import { LLMChain, PromptTemplate } from "langchain";
import { OpenAIChat } from "langchain/llms";
import { LLMResponse } from "../../lib/llm";
import { promptGeneratorPrompt } from "../../lib/prompt-templates";
import { ConversationalRetrievalQAChain } from "langchain/chains";


const model = new OpenAIChat({
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo-0613',
  maxTokens: -1
});



const additionalHistory = [
  "gen-bot: How can I help you?",
  "human: I need you to help be generate a great prompt for another bot I am creating.",
  "gen-bot: I can do that. How would you like me to help?",
  "human: I want you to interview me to learn about the bot I want to create, and once you know enough, generate the prompt.",
  "gen-bot: Sounds great! What would I need to know about the bot? Give me some required questions I'll gather information about.",
  "human: What is the bot's Name?",
  "gen-bot: great. next question?",
  "human: What is the bot's purpose?",
  "gen-bot: great. next question?",
  "human: Tell me about the bot. Background information, etc.",
  "gen-bot: great. next question?",
  "human: what is it's conversational style?",
  "gen-bot: great. next question?",
  "human: Are there any constraints on the bot's responses?",
  "gen-bot: great. next question?",
  "human: That should be enough to get you started.",
  "gen-bot: Sounds great! Are there any *optional* questions I should ask?",
  "human: No, make sure to ask all the REQUIRED questions first, and then ask the optional questions if you feel it's necessary.",
  "gen-bot: Is it okay for me to skip any of these questions?",
  "human: No! Never ever jump ahead. Never skip a question. Ask the questions one by one, and do NOT make up the my responses. Always, ALWAYS, get answers to the questions above.",
  "gen-bot: Ok, I'll make sure to ALWAYS understand their purpose, background, conversational style, and constraints.",
  "human: When generating the prompt, it is important that you format the text as instructions TO CHATGPT.",
  "gen-bot: Ok, I will format as instructions to ChatGPT to guide the bot's responses.",
  "human: Great. Please don't generate a prompt until you undersand asked ALL these questions. If my answers are vague, clarify details. Each time I give you an answer, repeat that you understand the answer by paraphrasing it back to me.",
  "gen-bot: Ok, what is the final format of the prompt?",
  `human: Once you have enough information (Do NOT proceed until you have HUMAN input on each of these sections), fill out EVERY SECTION of this template and send back:

  <prompt>
  --- detailed instructions for the bot ---
  [instructions]
  [purpose]
  [background information]
  [conversational style]
  </prompt>

  and I will copy and paste it into my bot.`,
  "gen-bot: Ok, I let's start the interview. What is the bot's purpose?",
  "human: Let's start over from the beginning. Pay attention to all my instructions above And follow the approach. Start with responding with a welcome to my next message, and the ASK ME THE first question.",
  // "gen-bot: Ok. Waiting for your next message. I",

]


export function promptGeneratorHandler(socket: Socket, io: Server) {

  socket.on("prompt-generator-message", async (data) => {
    try {
      const { token, data: { message, history, mode } } = data as { token: string; data: { history: string, message: MessageWithRelations; mode: "one-shot" | "critique" | "refine"; }; };
      const verifiedToken = verifyJWT(token);
      if (!verifiedToken) {
        socket.emit("prompt-generator-message-error", { error: "Invalid token" });
        return;
      }
      setTimeout(() => socket.emit('llm-response-started', {}), 100);

      console.log("GENPROMPT", promptGeneratorPrompt, history)

      const promptTemplate = new PromptTemplate({
        template: promptGeneratorPrompt,
        inputVariables: ["history", "prompt"]
      });

      const llmChain = new LLMChain({
        llm: model,
        prompt: promptTemplate,
      });

      const split = history.split("\n");

      const theHistory = [...additionalHistory, ...split].join("\n");

      try {
        console.log(
          { task: "prompt-generator-message", message, history: theHistory }
        );
        const { text } = await llmChain.call({ prompt: message.text, history: theHistory }) as LLMResponse;

        switch (mode) {
          case "one-shot":
            const newMessage: MessageWithRelations = generateMessage(text);
            socket.emit("prompt-generator-message", { message: newMessage });
            socket.emit("llm-response-complete", {})
            break;
          case "critique":
            const critiquePrompt = generateCritiquePrompt(text)
            const { text: critique } = await llmChain.call({ prompt: critiquePrompt, history }) as LLMResponse;
            const newMessageCritiqued: MessageWithRelations = generateMessage(critique);
            socket.emit("prompt-generator-message", { message: newMessageCritiqued });
            socket.emit("llm-response-complete", {})
            break;
          case "refine":
            const critiquePrompt2 = generateCritiquePrompt(text)
            const { text: critiqueInRefine } = await llmChain.call({ prompt: critiquePrompt2, history }) as LLMResponse;
            const finalPrompt = generateRefinePrompt(text, critiqueInRefine)
            const { text: final } = await llmChain.call({ prompt: finalPrompt, history }) as LLMResponse;
            const newMessageRefined = await llmChain.call({ prompt: finalPrompt, history }) as LLMResponse;
            socket.emit("prompt-generator-message", { message: newMessageRefined });
            socket.emit("llm-response-complete", {})
            break;
          default:
            throw new Error("Invalid mode")
        }

      } catch (error: any) {
        console.error(error);
        socket.emit("prompt-generator-message-error", { error: error.message });
      }
    } catch (err: unknown) {
      // console.error("THIS IS THE", JSON.stringify(err, null, 2))
      throw err;
    }



  });
}
function generateRefinePrompt(text: string, critique: string) {
  return `
          You are having a conversation with a human and have provided this response:
          -- your response --
          ${text}
          -- end your response --

          You just provided a critique of your own respones:
          -- your critique --
          ${critique}
          -- end your critique --

          Use your critique to generate an improved repsponse. Return ONLY your response with you additional text. Do NOT include "-- your response --"


        `;
}

function generateCritiquePrompt(text: string) {
  return `
              You are having a conversation with a human and have just provided this response:
              -- your response --
              ${text}
              -- end your response --

              Critique your response and provide the ways you would improve your response. Think step-by-step.
            `;
}

function generateMessage(final: string): MessageWithRelations {
  return {
    id: "",
    text: final,
    createdAt: new Date(),
    sender: {
      conversationId: "",
      createdAt: new Date(),
      id: "generator",
      name: "gen-bot",
      type: 'BOT',
      publicChatInstanceId: null,
      updatedAt: new Date(),
    },
    conversationId: null,
    conversation: null,
    participantId: "generator",
    publicChatInstance: null,
    publicChatInstanceId: null,
  };
}

