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

export async function base64FromPath(path: string): Promise<string> {
  const blob = await fetch(path).then((r) => r.blob());
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("base64 format isn't string");
      }
    };
  });
}
// export const writeBlob64File = async (urlPath: string, fileName: string) => {
//   const base64Data = await base64FromPath(urlPath).then((resp) => resp.split(",")[1]);
//   console.log("base64Data:", base64Data);
//   const buffer = await Buffer.from(base64Data, "base64");
//   console.log("buffer: ", buffer);

//   try {
//     await Filesystem.writeFile({
//       path: `videos/${fileName}`,
//       data: buffer,
//       directory: Directory.Documents,
//       encoding: Encoding.UTF8, // reguired for base64
//     });
//     console.log("Blob file was saved successfully");
//   } catch (error) {
//     console.log("Error with writing blob file");
//   }
// };
///////////////////////////////////////////////////////
// works with web
export const writeBlob64File = async (urlPath: string, fileName: string) => {
  try {
    const base64Data = await base64FromPath(urlPath);
    await Filesystem.writeFile({
      path: `videos/${fileName}`,
      data: base64Data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8, // reguired for base64
    });
    console.log("Base64 file was saved successfully");
  } catch (error) {
    console.log("Error with writing base64 file ", error);
  }
};
///////////////////////////////////////////////////////
// export const readBlob64File = async (fileName: string) => {
//   try {
//     const contents = await Filesystem.readFile({
//       path: `${fileName}`,
//       directory: Directory.Documents,
//       //   encoding: Encoding.UTF8,
//     });
//     console.log("Base64 data from DB:", contents);
//     return contents;
//   } catch (error) {
//     console.log("Error with reciving base64 data from DB:", error);
//   }
// };

///////////////////////////////////////////////////////////////
//saving data to device and web - works //

export const saveTrackResources = async (urlPath: string, fileName: string) => {
  try {
    const base64Data = await base64FromPath(urlPath);
    const savedFile = await Filesystem.writeFile({
      path: `${fileName}`,
      data: base64Data,
      directory: Directory.Data,
    });
    if (isPlatform("hybrid")) {
      console.log("Base64 file for hybrid platform");
      return {
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    console.log("Base64 file for web platform");
    return {
      filePath: fileName,
      webviewPath: `${fileName}`,
    };
  } catch (error) {
    console.log("Error with writing base64 file ", error);
  }
};

//////////////////////////////////////////////////////////////
export const readStoredFile = async (fileName: string): Promise<string | null> => {
  try {
    const fileData = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data,
    });
    console.log("*********** read");
    return fileData.data as string;
  } catch (error) {
    console.error("Error with reading", error);
    return null;
  }
};
// removing data from device and web - works //

export const removeTrack = async (fileName: string) => {
  try {
    await Filesystem.deleteFile({
      path: fileName,
      directory: Directory.Data,
    });
    console.log("Track was removed successfully");
  } catch (error) {
    console.log("Error with removing track ", error);
  }
};
////////////////////////////////////////////
