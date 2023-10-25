import { useEffect, useState } from "react";
import { readStoredFile } from "../../settings/capacitor.storage";

export function useCachedResource(path: string, format: "image" | "video") {
  const [resource, setResource] = useState("");
  const getResourceFromFS = async () => {
    try {
      const resourceName = path.split("/").pop() as string;
      const result = await readStoredFile(resourceName);
      const extension = resourceName.split(".").pop();
      setResource(result ? `data:${format}/${extension};base64, ${result}` : path);
    } catch (e) {
      setResource(path);
    }
  };

  useEffect(() => {
    getResourceFromFS();
  }, [path]);

  return resource;
}
