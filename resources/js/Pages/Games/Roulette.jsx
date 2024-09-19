import RouletteWheel from '@/Components/RouletteWheel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';
import YourBet from "@/Components/YourBet.jsx";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Roulte" />

            <div className="py-12">
                <RouletteWheel></RouletteWheel>
                </div>

            <YourBet></YourBet>

        </AuthenticatedLayout>
    );
}
