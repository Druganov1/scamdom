import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import WalletBalance from '@/Components/WalletBalance';
import { useEffect } from 'react';
import Header from '@/Components/Header';


export default function Authenticated({ user, children }) {
    return (

        <div className="min-h-screen bg-scamdom-90">
            <Header user={user} />
            <main>{children}</main>
        </div>
    );

}
