import RouletteWheel from '@/Components/RouletteWheel';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

        >
            <Head title="Roulte" />

            <div className="py-12">
                <RouletteWheel></RouletteWheel>
                </div>
        </AuthenticatedLayout>
    );
}
