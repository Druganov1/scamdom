import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import Header from '@/Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Authenticated({ user, children }) {
    return (

        <div className="min-h-screen bg-scamdom-90">
            <Header user={user} />
            <div className="py-16">
                <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
                <main>{children}</main>

                </div>
            </div>
            <ToastContainer />
        </div>

    );

}
