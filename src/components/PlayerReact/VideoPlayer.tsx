import React, { useState } from "react";
import ReactPlayer from "react-player";

interface IProps {
  play: boolean;
  path: string;
  src?: string;
}

const VideoPlayerReact: React.FC<IProps> = ({ play, path, src }) => {
  const [test, setTest] = useState(true);

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
      url={[{ src: path, type: "video/mp4" }]}
      //   className="react-player"
    />
  );
};

export default VideoPlayerReact;
