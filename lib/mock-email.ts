export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export async function mockSendEmail(payload: EmailPayload): Promise<boolean> {
  const html = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EMAIL NOTIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To: ${payload.to}
Subject: ${payload.subject}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${payload.body}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent by NomadBridge • Bangkok, Thailand
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`.trim();

  console.log(html);
  return true;
}
