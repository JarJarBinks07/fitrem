import { IonThumbnail } from "@ionic/react";
import { useCachedResource } from "../../shared/hooks/useCachedResource";

function CachedImage({ path }: { path: string }) {
  const image = useCachedResource(path, "image");

  return <IonThumbnail className="tracks__thumbnail">{image && <img src={image} alt="" />}</IonThumbnail>;
}

export default CachedImage;
