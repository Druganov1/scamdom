import Dropdown from '@/Components/Dropdown';
import WalletBalance from '@/Components/WalletBalance';
import { Link } from '@inertiajs/react';
import { useState } from 'react';




export default function Header({user}) {


    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const currentRouteName = route().current(); // Get the current route name

    const menuItems = [
        { name: 'Home', routeName: 'dashboard' },
        { name: 'Casino', routeName: 'casino.index' },
        { name: 'Battles', routeName: 'battles.index' },
        { name: 'Sports', routeName: 'sports.index' },
        { name: 'Support', routeName: 'support.index' },
        { name: 'Rewards', routeName: 'rewards.index' },
    ];


    return (
        <header className="bg-scamdom-50 text-white border-b-2 border-scamdom-30">
        <div className="flex justify-between items-center px-5 py-4 max-w-7xl mx-auto sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">Scamdom</span>
            </div>

            {/* Navigation Links */}
            <div className="flex-grow flex justify-center mx-8">
                <nav className="flex space-x-6">
                    {menuItems.map((item) => {
                        // Check if the route exists
                        let href;
                        try {
                            href = route(item.routeName);
                        } catch (error) {
                            // Skip this item if the route doesn't exist
                            return null;
                        }

                        return (
                            <div key={item.name} className="relative">
                                <Link
                                    href={href}
                                    className={`hover:text-green-400 ${
                                        currentRouteName === item.routeName ? 'font-bold' : ''
                                    }`}
                                >
                                    {item.name}
                                </Link>
                                {currentRouteName === item.routeName && (
                                    <div
                                        style={{
                                            width: '22px',
                                            height: '2px',
                                            backgroundColor: 'rgb(0, 255, 134)',
                                            position: 'absolute',
                                            top: '32px',
                                            transform: 'translateX(-50%)',
                                            left: '50%',
                                            borderRadius: '10px',
                                            zIndex: '2001',
                                        }}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </div>

            <div className="flex items-center space-x-4">
                {/* Wallet Section */}
                <WalletBalance user={user} />

                {/* Profile Dropdown */}
                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                {user.name}

                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    </header>
    );
}
