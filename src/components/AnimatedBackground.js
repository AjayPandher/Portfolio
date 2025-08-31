import { useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const AnimatedBackground = () => {
  const { theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);
  const threads = useRef([]);
  const stars = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    setCanvasSize();

    if (theme === "dark") {
      const numStars = 4000;
      stars.current = Array.from({ length: numStars }, () => ({
        x: canvas.width / 2,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2,
        radius: Math.random() * 0.5 + 0.2,
        alpha: Math.random() * 0.8 + 0.2,
        delta: Math.random() * 0.01 + 0.001,
        direction: Math.random() > 0.5 ? 1 : -1,
      }));
    } else {
      const numThreads = 100; // more threads
      threads.current = Array.from({ length: numThreads }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * canvas.width + canvas.width, // longer threads
        width: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.2 + 0.1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.3,
        curveOffset: Math.random() * 500 - 250,
        curveSpeed: (Math.random() - 0.5) * 0.01,
        lengthGrowth: Math.random() * 2 + 0.5,
      }));
    }

    const animate = () => {
      if (theme === "dark") {
        ctx.fillStyle = "#000010";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.current.forEach((star) => {
          star.x += star.speed * star.direction;
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;

          star.alpha += star.delta;
          if (star.alpha > 1 || star.alpha < 0.1) star.delta *= -1;

          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${star.alpha.toFixed(2)})`;
          ctx.fill();
        });
      } else {
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        threads.current.forEach((thread) => {
          thread.x += thread.speedX;
          thread.y += thread.speedY;
          thread.length += thread.lengthGrowth;
          if (thread.length > canvas.width * 3) thread.length = canvas.width;

          if (thread.x < -thread.length) thread.x = canvas.width + thread.length;
          if (thread.x > canvas.width + thread.length) thread.x = -thread.length;
          if (thread.y < -thread.length) thread.y = canvas.height + thread.length;
          if (thread.y > canvas.height + thread.length) thread.y = -thread.length;

          thread.alpha += (Math.random() - 0.5) * 0.01;
          thread.alpha = Math.max(0.05, Math.min(0.25, thread.alpha));

          const gradient = ctx.createLinearGradient(
            thread.x,
            thread.y,
            thread.x + thread.length / 2,
            thread.y + thread.curveOffset
          );
          gradient.addColorStop(0, `rgba(255,255,150,${thread.alpha.toFixed(2)})`);
          gradient.addColorStop(1, `rgba(255,255,255,0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = thread.width;
          ctx.beginPath();
          ctx.moveTo(thread.x, thread.y);
          ctx.quadraticCurveTo(
            thread.x + thread.length / 4,
            thread.y + thread.curveOffset,
            thread.x + thread.length / 2,
            thread.y
          );
          ctx.stroke();

          thread.curveOffset += thread.curveSpeed;
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => setCanvasSize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[-1]" />;
};

export default AnimatedBackground;
