import React, { useEffect, useRef, useState } from "react";
import RouletteStopwatch from "./RouletteStopwatch";
import SpinningNow from "./SpinningNow";
import RouletteResult from "./RouletteResult";
import PreviousRolls from "./PreviousRolls";

const RouletteWheel = () => {
    const [showStopwatch, setShowStopwatch] = useState(false);
    const [spinningNow, setSpinning] = useState(false);
    const [landed, setLanded] = useState(false);
    const [slot, setSlot] = useState(0);
    const [countdown, setCountdown] = useState(0);
    const [lastRolls, setLastRolls] = useState([]);

    const wheelRef = useRef(null);
    useEffect(() => {
        if (!Echo || !Echo.channel) {
            console.error("Echo or channel is not defined.");
            return;
        }

        initWheel();

        axios
            .post(route("api.roulette-init"))
            .then((response) => {
                const data = response.data;
                setLastRolls(data.last_rolls);

                if (data.currentStage === "countdown") {
                    setCountdown(data.remainingTime);
                    console.log("countdown:", data.remainingTime);
                    setShowStopwatch(true);
                } else if (data.currentStage === "spin") {
                    let now = Date.now();
                    let time = now - data.timeAtSpin * 1000;
                    let spintime = 6000 - time;

                    spinWheel(data.gameResult, spintime);
                    setSpinning(true);
                    setSlot(data.gameResult);
                } else if (data.currentStage === "result") {
                    setSlot(data.gameResult);
                    spinWheel(data.gameResult, 0);
                    setSpinning(false);

                    setLanded(true);
                }

                // this is for people who just joined and the game is going, so they can see the current state

                // availible parameters: currentStage, countDown_msec, gameResult
            })
            .catch((error) =>
                console.error("Error fetching init data:", error)
            );

        const channel = Echo.channel("roulette");

        channel.listen("RouletteService", (e) => {
            let data = e.data;
            switch (data.currentStage) {
                case "countdown":
                    setCountdown(data.countDown_msec);
                    setShowStopwatch(true);
                    setLanded(false);

                    break;
                case "spin":
                    setShowStopwatch(false);
                    spinWheel(data.number, 6000);
                    setSpinning(true);
                    setSlot(data.number);
                    break;
                case "result":
                    setLanded(true);
                    setSpinning(false);

                default:
                    break;
            }
        });

        return () => {
            channel.stopListening("RouletteService");
        };
    }, []);

    // Function to initialize the wheel
    const initWheel = () => {
        const wheel = wheelRef.current;
        const rows = generateRows();
        wheel.innerHTML = rows.repeat(29);
    };

    // Generates the row HTML for the roulette wheel
    const generateRows = () => `
        <div class="flex">
            ${generateCells()}
        </div>
    `;

    // Generates individual cell HTML
    const generateCells = () => {
        const cells = [
            { color: "red", number: 1 },
            { color: "black", number: 14 },
            { color: "red", number: 2 },
            { color: "black", number: 13 },
            { color: "red", number: 3 },
            { color: "black", number: 12 },
            { color: "red", number: 4 },
            { color: "green", number: 0 },
            { color: "black", number: 11 },
            { color: "red", number: 5 },
            { color: "black", number: 10 },
            { color: "red", number: 6 },
            { color: "black", number: 9 },
            { color: "red", number: 7 },
            { color: "black", number: 8 },
        ];

        return cells
            .map(
                ({ color, number }) => `
            <div class="h-[75px] w-[75px] m-[3px] rounded-lg roulette-${color} flex items-center justify-center text-white text-2xl">
                ${number}
            </div>
        `
            )
            .join("");
    };

    // Function to spin the wheel
    const spinWheel = (roll, spintime) => {
        setShowStopwatch(false);
        setSpinning(true);

        console.log(`spinning wheel with roll ${roll}`);

        const order = [0, 11, 5, 10, 6, 9, 7, 8, 1, 14, 2, 13, 3, 12, 4];
        const position = order.indexOf(roll);
        const cardSize = 75 + 3 * 2;
        const rows = 12;
        let landingPosition = rows * 15 * cardSize + position * cardSize;

        // Randomize landing position
        const randomize = Math.floor(Math.random() * 75) - 75 / 2;
        landingPosition += randomize;

        const object = {
            x: Math.floor(Math.random() * 50) / 100,
            y: Math.floor(Math.random() * 20) / 100,
        };

        // Apply the spin animation using transition and transform
        const wheel = wheelRef.current;
        wheel.style.transitionTimingFunction = `cubic-bezier(0, ${object.x}, ${object.y}, 1)`;
        wheel.style.transitionDuration = "6s";
        wheel.style.transform = `translate3d(-${landingPosition}px, 0px, 0px)`;

        // Reset wheel after spinning
        setTimeout(() => {
            wheel.style.transitionTimingFunction = "";
            wheel.style.transitionDuration = "";
            const resetTo = -(position * cardSize + randomize);
            wheel.style.transform = `translate3d(${resetTo}px, 0px, 0px)`;
        }, spintime);
    };

    return (
        <div className="flex flex-col items-center">
            <div className="mb-10 text-white">
                {showStopwatch && (
                    <RouletteStopwatch initialTimeInMilliseconds={countdown} />
                )}
                {spinningNow && <SpinningNow />}
                {landed && <RouletteResult result={slot} />}
            </div>

            <div className="roulette-wrapper relative flex justify-center w-full mx-auto overflow-hidden mask-gradient-spinner">
                <div className="w-[3px] bg-gray-500 h-full absolute left-1/2 z-10 -translate-x-1/2 "></div>
                <div ref={wheelRef} className="flex "></div>
            </div>
            <div className="flex flex-row justify-end w-full mt-10">
                <PreviousRolls rolls={lastRolls} />
            </div>
        </div>
    );
};

export default RouletteWheel;
