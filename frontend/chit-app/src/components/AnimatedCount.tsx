import React, { useEffect, useState } from 'react';

const AnimatedCounter: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endCount = end;
    const durationMs = duration * 1000;
    const incrementTime = Math.round(durationMs / endCount);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endCount) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <h2>{count}+ Users Using Our Services</h2>;
};

export default AnimatedCounter;