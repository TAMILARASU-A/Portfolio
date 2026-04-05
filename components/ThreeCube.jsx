"use client";
import { motion } from "framer-motion";

export default function ThreeCube() {
  return (
    <motion.div
      initial={{ rotateX: 0, rotateY: 0 }}
      animate={{ rotateX: 360, rotateY: 360 }}
      transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
      className="relative w-28 h-28 cube-3d"
    >
      <div className="cube-face face-front"></div>
      <div className="cube-face face-back"></div>
      <div className="cube-face face-left"></div>
      <div className="cube-face face-right"></div>
      <div className="cube-face face-top"></div>
      <div className="cube-face face-bottom"></div>
    </motion.div>
  );
}
