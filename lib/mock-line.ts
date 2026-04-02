export interface LinePayload {
  userId: string;
  message: string;
}

export async function mockSendLine(payload: LinePayload): Promise<boolean> {
  const truncated = payload.message.length > 200
    ? payload.message.slice(0, 197) + "..."
    : payload.message;

  console.log(`💬 LINE → ${payload.userId}: ${truncated}`);
  return true;
}
