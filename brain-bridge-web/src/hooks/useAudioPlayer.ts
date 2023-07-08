import { useEffect, useRef } from "react";
import invariant from "tiny-invariant";

export default function useAudioPlayer() {
  const player = useRef<HTMLAudioElement>();

  useEffect(() => {
    player.current = new Audio();
  }, []);

  return {
    play: (url: string) => {
      invariant(player.current, "Player must be initialized");
      player.current.src = url;
      player.current.play().then(() => {
        // console.log("playing");
      }).catch((e) => {
        console.error(e);
      })
    },
    pause: () => {
      invariant(player.current, "Player must be initialized");
      player.current.pause();
    },
    seek: (time: number) => {
      invariant(player.current, "Player must be initialized");
      player.current.currentTime = time;
    },
    onTimeUpdate: (callback: (time: number) => void) => {
      invariant(player.current, "Player must be initialized");
      player.current.addEventListener("timeupdate", () => {
        invariant(player.current, "Player must be initialized");
        callback(player.current.currentTime);
      });
    },
    onEnded: (callback: () => void) => {
      invariant(player.current, "Player must be initialized");
      player.current.addEventListener("ended", () => {
        callback();
      });
    }
  }
}