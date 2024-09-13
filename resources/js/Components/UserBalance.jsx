import React, { useEffect, useState } from 'react';


export default function UserBalance({user}) {
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
            <>{balance}</>
    );
}
