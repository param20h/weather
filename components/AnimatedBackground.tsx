'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  condition: string;
}

export default function AnimatedBackground({ condition }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const createParticles = () => {
      const count = condition === 'rain' ? 300 : condition === 'snow' ? 150 : 100;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: condition === 'rain' ? (Math.random() - 0.5) * 2 : (Math.random() - 0.5) * 1,
          vy: condition === 'rain' ? Math.random() * 8 + 5 : condition === 'snow' ? Math.random() * 2 + 1 : Math.random() * 1,
          size: condition === 'rain' ? Math.random() * 2 + 1 : condition === 'snow' ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset particles that go off screen
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;

        // Draw particles based on weather condition
        ctx.save();
        ctx.globalAlpha = particle.opacity;

        if (condition === 'rain') {
          // Rain drops
          ctx.strokeStyle = '#60A5FA';
          ctx.lineWidth = particle.size;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.vx * 3, particle.y - particle.vy * 3);
          ctx.stroke();
        } else if (condition === 'snow') {
          // Snowflakes
          ctx.fillStyle = '#F8FAFC';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Add sparkle effect
          ctx.strokeStyle = '#E2E8F0';
          ctx.lineWidth = 0.5;
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(
              particle.x + Math.cos(angle) * particle.size * 2,
              particle.y + Math.sin(angle) * particle.size * 2
            );
            ctx.stroke();
          }
        } else {
          // Default particles (clouds/clear)
          ctx.fillStyle = condition === 'clouds' ? '#9CA3AF' : '#FCD34D';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    createParticles();
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
      style={{ opacity: 0.4 }}
    />
  );
}