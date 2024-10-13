import RouletteWheel from '@/Components/RouletteWheel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import YourBet from "@/Components/YourBet.jsx";
import {BettingContainers} from "@/Components/BettingContainers.jsx";
import {useState} from "react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [betAmount, setBetAmount] = useState("");

    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Roulte" />

            <div className="py-12">
                <RouletteWheel></RouletteWheel>
                </div>

            <div className="py-8">
                <YourBet betAmount={betAmount} setBetAmount={setBetAmount}></YourBet>
            </div>

            <BettingContainers betAmount={betAmount}></BettingContainers>

        </AuthenticatedLayout>
    );
}
