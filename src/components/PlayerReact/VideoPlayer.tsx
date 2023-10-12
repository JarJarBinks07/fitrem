import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCachedResource } from "../../hooks/useCachedResource";

interface IProps {
  play: boolean;
  path: string;
  src?: string;
}

const VideoPlayerReact: React.FC<IProps> = ({ play, path }) => {
  /////////////Fix problem with android launching///////////////
  const [loading, setLoading] = useState(true);

  const video = useCachedResource(path, "video");

  // const checkVideoDestination = video.split("/").includes("https");
  // console.log(checkVideoDestination);
  // console.log(video);

  return (
    <ReactPlayer
      onReady={() => setLoading(false)}
      width={"100%"}
      height={"100%"}
      light={false}
      playing={loading || play}
      playsinline={true}
      controls={false}
      loop={true}
      // url={checkVideoDestination ? [{ src: video }] : video}
      url={video}

      //   className="react-player"
    />
  );
};

export default VideoPlayerReact;
