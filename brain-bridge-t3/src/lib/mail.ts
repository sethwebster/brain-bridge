import * as postmark from "postmark";
import { env } from "~/env.mjs";

// Send an email:
const client = new postmark.ServerClient(env.POSTMARK_API_KEY);


async function sendEmail({ From, To, Subject, HtmlBody, TextBody, MessageStream }: postmark.Models.Message): Promise<postmark.Models.MessageSendingResponse> {
  const result = await client.sendEmail({
    From, To, Subject, HtmlBody, TextBody, MessageStream
  });
  console.log("EMAIL RESULT", result)
  return result;
}


/*
"TemplateModel": {
   {
  "product_url": "product_url_Value",
  "product_name": "product_name_Value",
  "invite_sender_name": "invite_sender_name_Value",
  "training_set_name": "training_set_name_Value",
  "action_url": "action_url_Value",
  "help_url": "help_url_Value",
  "company_name": "company_name_Value",
  "company_address": "company_address_Value",
  "name": "name_Value",
  "invite_sender_organization_name": "invite_sender_organization_name_Value",
  "support_email": "support_email_Value",
  "live_chat_url": "live_chat_url_Value"
}
  }

*/
async function sendTemplated(From: string, To: string, templateAlias: string, templateModel: object) {
  const result = await client.sendEmailWithTemplate({
    TemplateAlias: templateAlias,
    TemplateModel: templateModel,
    From: `info@brainbridge.app`,
    ReplyTo: From,
    To,
    MessageStream: "outbound",
  });
  return result;
}

interface TemplateModelTrainingSetInvitation {
  invite_sender_name: string;
  training_set_name: string;
  training_set_id: string;
}
async function sendTrainingSetInvitation(From: string, To: string, templateModel: TemplateModelTrainingSetInvitation) {
  return sendTemplated(From, To, "user-invitation", { ...templateModel, action_url: `${env.NEXT_PUBLIC_BASE_URL}/api/invitations/training/${templateModel.training_set_id}?action=accept` });
}

const Mail = {
  sendEmail,
  sendTemplated,
  sendTrainingSetInvitation
}


export default Mail;