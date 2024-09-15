import React, { useState, useEffect, useRef } from 'react';

const RouletteStopwatch = ({ initialTimeInSeconds = 20 }) => { // Set default countdown time (e.g., 60 seconds)
  const [seconds, setSeconds] = useState(initialTimeInSeconds);
  const [microseconds, setMicroseconds] = useState(0);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const intervalId = setInterval(() => {
      const elapsedTime = performance.now() - startTimeRef.current;
      const totalElapsedTimeInSeconds = elapsedTime / 1000;

      // Calculate remaining time
      const remainingTimeInSeconds = Math.max(0, initialTimeInSeconds - totalElapsedTimeInSeconds);
      const remainingSeconds = Math.floor(remainingTimeInSeconds);
      const remainingMicroseconds = Math.floor((remainingTimeInSeconds % 1) * 100);

      setSeconds(remainingSeconds);
      setMicroseconds(remainingMicroseconds);

      if (remainingTimeInSeconds <= 0) {
        clearInterval(intervalId);
      }
    }, 10); // Update every 10ms for higher resolution

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [initialTimeInSeconds]);

  return (
<div className='flex flex-col items-center justify-center'>
  <p className='text-xs mb-1'>Spinning in</p>
  <h5 className='text-2xl font-mono'>
    {String(seconds).padStart(2, '0')}.{String(microseconds).padStart(2, '0')} s
  </h5>
</div>

  );
};

export default RouletteStopwatch;

