import React, { useEffect, useState } from 'react';
import { Link } from "@inertiajs/react";
import UserBalance from './UserBalance';



export default function WalletComp({user}) {
    return (

        <div className="flex items-center space-x-2 bg-scamdom-40 rounded-lg px-4 py-2">
        <div className="flex items-center space-x-1 text-white">
            <span className="text-green-400 text-lg">$</span>
            <span className="text-lg font-semibold"> <UserBalance user={user}></UserBalance> </span>
        </div>
        <Link href="/wallet" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold">
            Wallet
        </Link>
        </div>

    );
}
