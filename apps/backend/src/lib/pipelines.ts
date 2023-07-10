import { PromptTemplate } from "langchain";
import { LLMResponse } from "./llm";

interface PipelineStep {
  name: string;
  prompt: PromptTemplate;
  execute: (previousResult: string, context?: Record<string, string>) => Promise<LLMResponse>;
}

interface Pipeline {
  steps: PipelineStep[];
  run: (initialPrompt: string) => Promise<LLMResponse>;
}

class LLMPipeline implements Pipeline {
  steps: PipelineStep[];
  constructor(steps: PipelineStep[]) {
    this.steps = steps;
  }
  async run(initialPrompt: string): Promise<LLMResponse> {
    let previousResult = initialPrompt;
    for (const step of this.steps) {
      const result = await step.execute(previousResult);
      previousResult = result.text;
    }
    return {
      text: previousResult,
      tokens: 0
    };
  }
}

abstract class PipelineStepBase implements PipelineStep {
  name: string;
  prompt: PromptTemplate;
  constructor(name: string, prompt: PromptTemplate) {
    this.name = name;
    this.prompt = prompt;
  }
  abstract execute(previousResult: string): Promise<LLMResponse>;
}

// class OneShotPipelineStep extends PipelineStepBase {
//   execute(previousResult: string): Promise<LLMResponse> {
//     const llm = new LLMChain({
//       llm: model,
//       prompt: this.prompt,
//     });


//   }
// }
