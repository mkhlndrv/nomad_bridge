import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

export async function saveUploadedFile(
  file: File,
  directory: string
): Promise<{ filename: string; relativePath: string }> {
  const ext = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "bin";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const fullDir = path.join(process.cwd(), "public", directory);

  await fs.mkdir(fullDir, { recursive: true });

  const filePath = path.join(fullDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return {
    filename,
    relativePath: `/${directory}/${filename}`,
  };
}
