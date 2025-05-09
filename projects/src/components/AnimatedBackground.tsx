"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
};

/**
 * Animated background component with floating bubbles
 */
export const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  useEffect(() => {
    // Create bubbles only on client-side
    const colors = [
      'rgba(139, 92, 246, 0.15)', // Purple
      'rgba(236, 72, 153, 0.15)', // Pink
      'rgba(59, 130, 246, 0.15)', // Blue
      'rgba(16, 185, 129, 0.15)', // Green
    ];
    
    const newBubbles: Bubble[] = [];
    
    // Generate random bubbles
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: Math.random() * 10 + 10,
      });
    }
    
    setBubbles(newBubbles);
  }, []);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
            backgroundColor: bubble.color,
          }}
          animate={{
            x: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            y: [
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
              Math.random() * 100 - 50,
            ],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Add a subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-background/30" />
    </div>
  );
};
