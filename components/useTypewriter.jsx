"use client";
import { useEffect, useState } from "react";

export default function useTypewriter(texts, speed = 80, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let i = 0;
    let forward = true;

    function type() {
      const text = texts[index];

      if (forward) {
        if (i <= text.length) {
          setDisplay(text.slice(0, i));
          i++;
          setTimeout(type, speed);
        } else {
          forward = false;
          setTimeout(type, pause);
        }
      } else {
        if (i >= 0) {
          setDisplay(text.slice(0, i));
          i--;
          setTimeout(type, speed / 2);
        } else {
          forward = true;
          setIndex((prev) => (prev + 1) % texts.length);
          setTimeout(type, speed);
        }
      }
    }

    type();
  }, [index]);

  return display;
}
