import Dropdown from "@/Components/Dropdown";
import WalletComp from "@/Components/WalletComp";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import Avatar from "react-avatar";
export default function Header({ user }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const currentRouteName = route().current(); // Get the current route name

    const menuItems = [
        { name: "Home", routeName: "dashboard" },
        { name: "Casino", routeName: "casino.index" },
        { name: "Battles", routeName: "battles.index" },
        { name: "Sports", routeName: "sports.index" },
        { name: "Support", routeName: "support.index" },
        { name: "Rewards", routeName: "rewards.index" },
    ];

    return (
        <header className="py-3 border-b-2 bg-scamdom-50 border-scamdom-30">
            <div className="container relative mx-auto">
                <div className="flex items-center justify-between w-full text-white">
                    <h2 className="text-lg font-bold">Scamdom</h2>

                    {/* Centered Menu */}
                    <nav className="absolute flex space-x-6 transform -translate-x-1/2 left-1/2">
                        {menuItems.map((item) => {
                            let href;
                            try {
                                href = route(item.routeName);
                            } catch (error) {
                                return null;
                            }

                            return (
                                <div key={item.name} className="relative">
                                    <Link
                                        href={href}
                                        className={`hover:text-green-400 ${
                                            currentRouteName === item.routeName
                                                ? "font-bold"
                                                : ""
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                    {currentRouteName === item.routeName && (
                                        <div
                                            style={{
                                                width: "22px",
                                                height: "2px",
                                                backgroundColor:
                                                    "rgb(0, 255, 134)",
                                                position: "absolute",
                                                top: "32px",
                                                transform: "translateX(-50%)",
                                                left: "50%",
                                                borderRadius: "10px",
                                                zIndex: "2001",
                                            }}
                                        ></div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    {/* Right side: Wallet and User Menu */}
                    <div className="flex items-center space-x-4">
                        <WalletComp user={user} />
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className="w-10 h-10 overflow-hidden rounded-full">
                                    <Avatar
                                        name={user.name}
                                        size="50"
                                        round={true}
                                        textSizeRatio={1.75}
                                    />
                                </span>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route("profile.edit")}>
                                    Profile
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    Log Out
                                </Dropdown.Link>
                                <Dropdown.Link href={route("profile.bets")}>
                                    Bets
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </header>
    );
}
