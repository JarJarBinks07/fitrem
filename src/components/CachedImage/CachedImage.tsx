import React, { useEffect, useState } from "react";
import { IonThumbnail } from "@ionic/react";
import { readStoredFile } from "../../settings/capacitor.storage";
import { useCachedResource } from "../../shared/hooks/useCachedResource";

function CachedImage({ path }: { path: string }) {
  const image = useCachedResource(path, "image");

  return <IonThumbnail className="tracks__thumbnail">{image && <img src={image} alt="" />}</IonThumbnail>;
}

export default CachedImage;
