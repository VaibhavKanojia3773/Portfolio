"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { forwardRef, useRef, type ReactNode } from "react";

type MagneticButtonProps = Omit<HTMLMotionProps<"a">, "ref" | "style"> & {
  children: ReactNode;
  strength?: number;
};

/**
 * An anchor that translates toward the cursor when nearby.
 * Falls back to a static anchor on reduced-motion / touch devices via CSS.
 */
const MagneticButton = forwardRef<HTMLAnchorElement, MagneticButtonProps>(
  function MagneticButton(
    { children, strength = 0.35, className = "", ...props },
    forwardedRef
  ) {
    const ref = useRef<HTMLAnchorElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

    const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      x.set(dx * strength);
      y.set(dy * strength);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.a
        ref={(node) => {
          ref.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={className}
        {...props}
      >
        {children}
      </motion.a>
    );
  }
);

export default MagneticButton;
