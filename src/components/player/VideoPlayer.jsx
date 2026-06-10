import { useRef, useCallback } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoKey, onProgress, playing = true }) => {
  const durationRef = useRef(0);

  const handleDurationChange = useCallback((e) => {
    durationRef.current = e.currentTarget?.duration || 0;
  }, []);

  const handleTimeUpdate = useCallback(
    (e) => {
      const duration = durationRef.current || e.currentTarget?.duration;
      if (!duration || !onProgress) return;
      onProgress({ played: e.currentTarget.currentTime / duration });
    },
    [onProgress]
  );

  if (!videoKey) return null;

  const src = `https://www.youtube.com/watch?v=${videoKey}`;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
      <ReactPlayer
        src={src}
        width="100%"
        height="100%"
        style={{ width: "100%", height: "100%" }}
        controls
        playing={playing}
        playsInline
        onDurationChange={handleDurationChange}
        onTimeUpdate={handleTimeUpdate}
        config={{
          youtube: {
            rel: 0,
            modestbranding: 1,
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
