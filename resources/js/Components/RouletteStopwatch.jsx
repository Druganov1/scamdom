import React, { useState, useEffect, useRef } from 'react';

export default function RouletteStopwatch({ initialTimeInMilliseconds }) {
  const [seconds, setSeconds] = useState(initialTimeInMilliseconds / 1000);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const intervalId = setInterval(() => {
      const elapsedTime = performance.now() - startTimeRef.current;
      const totalElapsedTimeInSeconds = elapsedTime / 1000;

      // Calculate remaining time
      const remainingTimeInSeconds = Math.max(0, (initialTimeInMilliseconds / 1000) - totalElapsedTimeInSeconds);

      setSeconds(remainingTimeInSeconds);

      if (remainingTimeInSeconds <= 0) {
        clearInterval(intervalId);
      }
    }, 10); // Update every 10ms for higher resolution

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [initialTimeInMilliseconds]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-xs mb-1'>Spinning in</p>
      <h5 className='text-2xl font-mono'>
        {String(Math.floor(seconds)).padStart(2, '0')}.{String(Math.floor((seconds % 1) * 100)).padStart(2, '0')} s
      </h5>
    </div>
  );
}
