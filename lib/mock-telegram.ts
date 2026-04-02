export interface TelegramPayload {
  userId: string;
  message: string;
}

export async function mockSendTelegram(payload: TelegramPayload): Promise<boolean> {
  const truncated = payload.message.length > 300
    ? payload.message.slice(0, 297) + "..."
    : payload.message;

  console.log(`🤖 TELEGRAM → ${payload.userId}:\n${truncated}`);
  return true;
}
