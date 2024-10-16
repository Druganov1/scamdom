import React, { useState, useEffect, useRef } from "react";

export default function RouletteStopwatch({
    initialTimeInMilliseconds,
    lastColor,
}) {
    const totalTime = 15000; // 15,000 milliseconds or 15 seconds
    const [seconds, setSeconds] = useState(initialTimeInMilliseconds / 1000);
    const [progress, setProgress] = useState(0); // Will adjust based on remaining time

    const startTimeRef = useRef(performance.now());

    useEffect(() => {
        // This function updates the remaining time and progress width
        const updateProgress = () => {
            const elapsedTime = performance.now() - startTimeRef.current; // Time elapsed since component mount
            const remainingTime = Math.max(
                0,
                initialTimeInMilliseconds - elapsedTime
            ); // Remaining time in milliseconds

            setSeconds(remainingTime / 1000); // Convert to seconds for display

            // Calculate the correct width for the progress bar
            const progressPercentage = (remainingTime / totalTime) * 100;
            setProgress(progressPercentage);

            // Clear the interval if time runs out
            if (remainingTime <= 0) {
                clearInterval(intervalId);
            }
        };

        const intervalId = setInterval(updateProgress, 10); // Update every 10ms for smooth progress

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [initialTimeInMilliseconds]);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <p className="mb-1 text-xs">Spinning in</p>
            <h5 className="font-mono text-2xl">
                {String(Math.floor(seconds)).padStart(2, "0")}.
                {String(Math.floor((seconds % 1) * 100)).padStart(2, "0")} s
            </h5>
            <div className="w-full h-2 rounded-full bg-scamdom-30">
                <div
                    className={`h-full rounded-full ${
                        lastColor === "red"
                            ? "bg-roulette-red"
                            : lastColor === "green"
                            ? "bg-roulette-green"
                            : "bg-roulette-black"
                    }`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </div>
    );
}
