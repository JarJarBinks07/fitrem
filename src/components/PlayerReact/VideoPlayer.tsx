import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCachedResource } from "../../hooks/useCachedResource";

interface IProps {
  play: boolean;
  path: string;
  src?: string;
}

const VideoPlayerReact: React.FC<IProps> = ({ play, path }) => {
  const [test, setTest] = useState(true);

  const video = useCachedResource(path, "video");

  return (
    <ReactPlayer
      onReady={() => setTest(false)}
      width={"100%"}
      height={"100%"}
      light={false}
      playing={test || play}
      playsinline={true}
      controls={false}
      loop={true}
      url={video}
      //   className="react-player"
    />
  );
};

export default VideoPlayerReact;
