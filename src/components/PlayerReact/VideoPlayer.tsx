import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useCachedResource } from "../../shared/hooks/useCachedResource";

interface IProps {
  play: boolean;
  path: string;
  src?: string;
  id?: number;
}

const VideoPlayerReact: React.FC<IProps> = ({ play, path, id }) => {
  /////Fix problem with android launching/////
  const [loading, setLoading] = useState(true);

  const video = useCachedResource(path, "video");

  return (
    <>
      <ReactPlayer
        key={id}
        onReady={() => setLoading(false)}
        width={"100%"}
        height={"100%"}
        light={false}
        playing={loading || play}
        playsinline={true}
        controls={false}
        loop={true}
        url={video}
        // url={[{ src: path }]}
        //   className="react-player"
      />
      <span>{id}</span>
    </>
  );
};

export default VideoPlayerReact;
