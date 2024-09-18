import React, { useState, useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react'


export default function PreviousRolls({ rolls }) {

    const [previousRolls, setPreviousRolls] = useState([]);
    const [parent, enableAnimations] = useAutoAnimate()

    useEffect(() => {
        if (rolls.length) {
            setPreviousRolls(rolls); // Sync with prop
        }
    }, [rolls]); // Trigger on prop change
    useEffect(() => {
        // Mockup: Example to listen to the 'roulette' WebSocket channel
        window.Echo.channel('roulette').listen('RouletteService', (e) => {
          let data = e.data;
          if (data.currentStage === 'result') {
            console.log('result:', data);

            // Assuming data contains the new roll number
            setPreviousRolls((prevRolls) => [data.gameResult, ...prevRolls]);
          }
        });

        return () => {
            channel.stopListening('RouletteService');
          };


      }, []);
      return (
        <div ref={parent} className="flex flex-row max-w-[400px] overflow-x-scroll scroll-smooth transition no-scrollbar mask-gradient gap-0">
          {previousRolls.slice(0, 10).map((roll, index) => (
            <div
              key={index}
              className={`h-[45px] w-[45px] min-w-[45px] m-[3px] rounded-full ${
                roll === 0 ? 'roulette-green' : roll >= 8 ? 'roulette-black' : 'roulette-red'
              } flex items-center justify-center text-white text-lg`}
            >
              {roll}
            </div>
          ))}
        </div>
      );
}
