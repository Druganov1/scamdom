import React, { useEffect, useState } from 'react';

export default function WalletBalance({user}) {
    const [balance, setBalance] = useState(0);

    function formatCurrency(amount, locale = 'nl-NL') {
        const options = {
            style: 'decimal',
            minimumFractionDigits: amount < 100 ? 2 : 0,
            maximumFractionDigits: amount < 100 ? 2 : 0,
        };

        return new Intl.NumberFormat(locale, options).format(amount);
    }


    useEffect(() => {
        setBalance(formatCurrency(user.balance))

        window.Echo.private(`wallet-balance.${user.id}`).listen('WalletBalanceUpdated', (e) => {
            let num = e.balance;


            setBalance(formatCurrency(num));
        });

    }, []);

    return (

        <div className="flex items-center space-x-2 bg-scamdom-40 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-1 text-white">
            <span className="text-green-400 text-lg">$</span>
            <span className="text-lg font-semibold">{balance}</span>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
            Wallet
        </button>
        </div>

    );
}
