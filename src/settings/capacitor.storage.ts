import { Photo } from "@capacitor/camera";
import { isPlatform } from "@ionic/react";
import { Capacitor } from "@capacitor/core";

import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// export const writeSecretFile = async () => {
//   await Filesystem.writeFile({
//     path: "secrets/text.txt",
//     data: "This is a test",
//     directory: Directory.Documents,
//     encoding: Encoding.UTF8,
//   });
// };

// export const readSecretFile = async () => {
//   const contents = await Filesystem.readFile({
//     path: "secrets/text.txt",
//     directory: Directory.Documents,
//     encoding: Encoding.UTF8,
//   });

//   console.log("secrets:", contents);
// };

// const deleteSecretFile = async () => {
//   await Filesystem.deleteFile({
//     path: "secrets/text.txt",
//     directory: Directory.Documents,
//   });
// };
/////////////////////////////////////////////////////////////
// interface PhotoItem {
//   filePath: string;
//   webviewPath?: string;
// }

async function base64FromPath(path: string): Promise<string> {
  const blob = await fetch(path).then((r) => r.blob());
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        console.log(reader.result);
        resolve(reader.result);
      } else {
        reject("base64 format isn't string");
      }
    };
  });
}
export const writeBlob64File = async (urlPath: string, fileName: string) => {
  const base64Data = await base64FromPath(urlPath).then((resp) => resp.split(",")[1]);
  console.log("base64Data:", base64Data);
  const buffer = await Buffer.from(base64Data, "base64");
  console.log("buffer: ", buffer);

  try {
    await Filesystem.writeFile({
      path: `videos/${fileName}`,
      data: buffer,
      directory: Directory.Documents,
      encoding: Encoding.UTF8, // reguired for base64
    });
    console.log("Blob file was saved successfully");
  } catch (error) {
    console.log("Error with writing blob file");
  }
};

export const readBlob64File = async (fileName: string) => {
  try {
    const contents = await Filesystem.readFile({
      path: `/videos/${fileName}`,
      directory: Directory.Documents,
      //   encoding: Encoding.UTF8,
    });
    console.log("Blob data from DB:", contents);
    return contents;
  } catch (error) {
    console.log("Error with reciving blob file:", error);
  }
};

export const saveImage = async (image: Photo, fileName: string): Promise<PhotoItem> => {
  let base64Data: string;

  if (isPlatform("hybrid")) {
    const file = await Filesystem.readFile({
      path: image.path!,
    });
    base64Data = file.data;
  } else {
    base64Data = await base64FromPath(image.webPath!);
  }

  const savedFile = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: Directory.Data,
  });

  if (isPlatform("hybrid")) {
    return {
      filePath: savedFile.uri,
      webviewPath: Capacitor.convertFileSrc(savedFile.uri),
    };
  }

  return {
    filePath: fileName,
    webviewPath: image.webPath,
  };
};
