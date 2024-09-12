import React, { useEffect } from 'react';

export default function WalletBalance() {

    useEffect(() => {
        Echo.channel('testChannel').listen('testEvent', (e) => {
            console.log('Event received:', e);
        });

        return () => {
            channel.stopListening('testEvent');
        };
    }, []);
    return (

        <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-1 text-white">
            <span className="text-green-400 text-lg">$</span>
            <span className="text-lg font-semibold">0.00</span>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
            Wallet
        </button>
        </div>

    );
}
