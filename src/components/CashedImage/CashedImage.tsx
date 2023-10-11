import React, { useEffect, useState } from "react";
import { IonThumbnail } from "@ionic/react";
import { readStoredFile } from "../../settings/capacitor.storage";

function CashedImage({ path }: { path: string }) {
  const [image, setImage] = useState("");

  const getImageFromFS = async () => {
    const imageName = path.split("/").pop() as string;
    const result = await readStoredFile(imageName);
    const extension = imageName.split(".").pop();
    setImage(`data:image/${extension};base64, ${result}`);
  };

  useEffect(() => {
    getImageFromFS();
  }, [path]);

  return (
    <IonThumbnail className="tracks__thumbnail">
      <img src={image} alt="" />
    </IonThumbnail>
  );
}

export default CashedImage;
