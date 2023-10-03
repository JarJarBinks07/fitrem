import React, { useEffect } from "react";
import { CapacitorVideoPlayer } from "capacitor-video-player";
//import './VideoPlayer.css';

interface IProps {
  attachment: { temporary_url?: string; path?: string };
}

const VideoPlayer = ({ attachment }: IProps) => {
  useEffect(() => {
    const playVideo = async () => {
      const url = attachment.path ? attachment.path : attachment.temporary_url;
      console.log(`url: ${url}`);
      const init = await CapacitorVideoPlayer.initPlayer({
        mode: "fullscreen",
        url: url,
        // width: 500,
        title: "Hello",
        playerId: "fullscreen",
        componentTag: "div",
      });
      console.log(`init ${JSON.stringify(init)}`);
      /*            const play = await CapacitorVideoPlayer.play({
                playerId:'fullscreen'
            })
            console.log(`play ${JSON.stringify(play)}`)
*/
    };
    // playVideo(() => {
    //   console.log("in playing video");
    // });
    playVideo();
  });
  return <div id="fullscreen" slot="fixed" style={{ maxHeight: 300 }}></div>;
};
export default VideoPlayer;
