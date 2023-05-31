import { useEffect, useRef } from "react";

export default function useAudioPlayer() {
  const player = useRef<HTMLAudioElement>();

  useEffect(() => {
    player.current = new Audio();
  }, []);

  return {
    play: (url: string) => {
      player.current!.src = url;
      player.current!.play();
    },
    pause: () => {
      player.current!.pause();
    },
    seek: (time: number) => {
      player.current!.currentTime = time;
    },
    onTimeUpdate: (callback: (time: number) => void) => {
      player.current!.addEventListener("timeupdate", () => {
        callback(player.current!.currentTime);
      });
    },
    onEnded: (callback: () => void) => {
      player.current!.addEventListener("ended", () => {
        callback();
      });
    }
  }
}