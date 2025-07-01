'use client';

import { useEffect, useRef } from 'react';

interface SimpleParticlesProps {
  condition: string;
}

export default function SimpleParticles({ condition }: SimpleParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{x: number, y: number, vx: number, vy: number, size: number}> = [];
    const particleCount = condition === 'rain' ? 200 : 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: condition === 'rain' ? Math.random() * 5 + 2 : (Math.random() - 0.5) * 2,
        size: condition === 'snow' ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
      });
    }

    const getParticleColor = () => {
      switch (condition.toLowerCase()) {
        case 'rain': return 'rgba(96, 165, 250, 0.6)';
        case 'snow': return 'rgba(248, 250, 252, 0.8)';
        case 'clouds': return 'rgba(156, 163, 175, 0.4)';
        default: return 'rgba(252, 211, 77, 0.5)';
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = getParticleColor();

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.y > canvas.height) particle.y = -10;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (typeof window === 'undefined') return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [condition]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}