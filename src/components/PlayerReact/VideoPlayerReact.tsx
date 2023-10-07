import React from "react";
import ReactPlayer from "react-player";

interface IProps {
  play: boolean;
  path: string;
}

const VideoPlayer: React.FC<IProps> = ({ play, path }) => {
  return (
    <ReactPlayer
      playing={play}
      light={false}
      playsinline={true}
      controls={false}
      loop={true}
      url={[{ src: path, type: "video/mp4" }]}
      width="100%"
      height="100%"
      //   className="react-player"
    />
  );
};

export default VideoPlayer;
