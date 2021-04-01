import { motion, useAnimation, Variants } from "framer-motion";
import React, { useRef } from "react";
import YouTube from "react-youtube";
import { MotionBox } from "./MotionBox";

type Props = { id: string };

const Component: React.FC<Props> = ({ id }) => {
  const animationControls = useAnimation();
  const isPlaying = useRef(false);

  const variants: Variants = {
    thaw: {
      opacity: 1,

      transition: { duration: 1, ease: "easeInOut" },
    },
    freeze: {
      opacity: 0.05,
      transition: { duration: 3 },
    },
  };

  return (
    <MotionBox
      w="600px"
      h="360"
      bg="blue.200"
      animate={{ x: 0, transition: { duration: 0.5, ease: "easeOut" } }}
      initial={{ x: -200 }}
      onHoverStart={() => {
        if (!isPlaying.current) {
          animationControls.start("thaw");
        }
      }}
      onHoverEnd={() => {
        if (!isPlaying.current) {
          animationControls.start("freeze");
        }
      }}
    >
      <motion.div
        variants={variants}
        initial={{ opacity: 0 }}
        animate={animationControls}
      >
        <YouTube
          opts={{
            width: "600",
            height: "360",
          }}
          videoId={id}
          onReady={async () => {
            await animationControls.start("thaw");
            animationControls.start("freeze");
          }}
          onPlay={() => {
            isPlaying.current = true;
            animationControls.start("thaw");
          }}
          onPause={() => {
            isPlaying.current = false;
            animationControls.start("freeze");
          }}
          onEnd={() => {
            isPlaying.current = false;
          }}
        />
      </motion.div>
    </MotionBox>
  );
};

export const YouTubeVideo = Component;
