import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MinesGame from "@/Components/MinesGame";
import { Head } from "@inertiajs/react";

export default function Mines({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mines" />

            <div className="py-12">
                <MinesGame></MinesGame>
            </div>
        </AuthenticatedLayout>
    );
}
