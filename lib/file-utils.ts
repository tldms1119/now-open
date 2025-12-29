import fs from "fs/promises";

// save Image into 'public' folder and return the name of saved file.
export async function saveImage(file: File): Promise<string> {
  const image = await file.arrayBuffer();
  const filename = `/${file.name}_${Date.now().toString()}`;
  await fs.appendFile(`./public${filename}`, Buffer.from(image));
  return filename;
}

// delete Image from 'public' folder
export function deleteImage(filename: string) {
  fs.rm(`./public${filename}`);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function uploadToS3(file: File): Promise<string> {
  // TODO implement real logic
  // 예: fetch, aws-sdk, presigned-url 등
  // return url value
  return "https://your-s3-bucket-url/" + file.name;
}
