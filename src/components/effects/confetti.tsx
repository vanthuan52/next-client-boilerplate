'use client';

import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const ConfettiEffect: React.FC = () => {
  const requestId = useRef<number | null>(null);

  useEffect(() => {
    const duration = 15 * 1000;
    const delay = 0;
    const startTime = Date.now();
    const endTime = startTime + duration;
    let lastTime = startTime;

    const play = () => {
      const currentTime = Date.now();

      if (currentTime - lastTime >= delay) {
        confetti({
          particleCount: 2,
          angle: 65,
          spread: 75,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 2,
          angle: 125,
          spread: 75,
          origin: { x: 1 },
        });
        lastTime = currentTime;
      }

      if (currentTime < endTime) {
        requestId.current = requestAnimationFrame(play);
      }
    };

    requestId.current = requestAnimationFrame(play);

    return () => {
      if (requestId.current) {
        cancelAnimationFrame(requestId.current);
      }
    };
  }, []);

  return null;
};

export default ConfettiEffect;
