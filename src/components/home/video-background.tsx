import React from "react";

const VideoBackground: React.FC = () => (
  <div className="relative">
    <video
      src="./background.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover opacity-20"
    >
      Your browser does not support the video tag.
    </video>
    <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none"></div>
  </div>
);

export default VideoBackground;
