// GamesCatalog
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
export default function GamesCatalog() {
    return (
        <div className="py-12">
            <div class="bg-background p-6">
                <h1 class="text-2xl font-bold text-foreground mb-4">
                    Scamdom Originals
                </h1>
                <div class="grid grid-cols-3 gap-4">
                    <button class="bg-scamdom-slot text-white py-10 px-9 rounded-lg flex items-center justify-center text-sm w-2/3">
                        <img
                            aria-hidden="true"
                            alt="slot-battles-icon"
                            src="https://openui.fly.dev/openui/24x24.svg?text=🎰"
                            class="mr-2 h-4 w-4"
                        />
                        Slot Battles
                    </button>
                    <button class="bg-blue-500 text-white py-10 px-9 rounded-lg flex items-center justify-center text-sm w-2/3">
                        <img
                            aria-hidden="true"
                            alt="slot-battles-icon"
                            src="https://openui.fly.dev/openui/24x24.svg?text=🎰"
                            class="mr-2 h-4 w-4"
                        />
                        Slot Battles
                    </button>
                    <button class="bg-blue-500 text-white py-10 px-9 rounded-lg flex items-center justify-center text-sm w-2/3">
                        <img
                            aria-hidden="true"
                            alt="slot-battles-icon"
                            src="https://openui.fly.dev/openui/24x24.svg?text=🎰"
                            class="mr-2 h-4 w-4"
                        />
                        Slot Battles
                    </button>
                    <button class="bg-blue-500 text-white py-10 px-9 rounded-lg flex items-center justify-center text-sm w-2/3">
                        <img
                            aria-hidden="true"
                            alt="slot-battles-icon"
                            src="https://openui.fly.dev/openui/24x24.svg?text=🎰"
                            class="mr-2 h-4 w-4"
                        />
                        Slot Battles
                    </button>

                </div>
            </div>
        </div>
    );
}
