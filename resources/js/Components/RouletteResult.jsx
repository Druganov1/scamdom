import React from 'react';

export default function RouletteResult({result}) {

    const colors = {
        1: 'red',
        14: 'black',
        2: 'red',
        13: 'black',
        3: 'red',
        12: 'black',
        4: 'red',
        0: 'green',
        11: 'black',
        5: 'red',
        10: 'black',
        6: 'red',
        9: 'black',
        7: 'red',
        8: 'black',

    }

    const getColorDiv = (color, result) => {
        switch (color) {
          case 'black':
            return (
              <div className="h-[35px] w-[35px] m-[3px] rounded-lg bg-gray-900 flex items-center justify-center text-white text-2xl">
                {result}
              </div>
            );
          case 'red':
            return (
              <div className="h-[35px] w-[35px] m-[3px] rounded-lg bg-red-500 flex items-center justify-center text-white text-2xl">
                {result}
              </div>
            );
          case 'green':
            return (
              <div className="h-[35px] w-[35px] m-[3px] rounded-lg bg-green-500 flex items-center justify-center text-white text-2xl">
                {result}
              </div>
            );
          default:
            return null;
        }
      };

  return (
<div className='flex flex-col items-center justify-center'>
      {getColorDiv(colors[result], result)}

</div>

  );
};

