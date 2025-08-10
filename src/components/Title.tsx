"use client";

import React, { useState, useEffect, useId } from "react";
import { motion } from "motion/react";

export interface ContainerTextFlipProps {
  words?: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
  animationDuration?: number;
}

export function Title({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  animationDuration = 700,
  className = "",
  textClassName = "",
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef<HTMLDivElement | null>(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);
    return () => clearInterval(intervalId);
  }, [words, interval]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000 }}
      className={`relative inline-block rounded-4xl px-6 py-4 text-center shadow-lg -blur-md bg-gray-50/50 dark:bg-neutral-900/70 ${className}`}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className="inline-block"
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => {
            const isLastLetter = index === words[currentWordIndex].length - 1;
            return (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: index * 0.02,
                }}
                className={`font-bold text-neutral-800 dark:text-white ${textClassName}`}
              >
                {letter}
                {/* Add a non-breaking space after the last letter */}
                {isLastLetter ? "\u00A0" : null}
              </motion.span>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
