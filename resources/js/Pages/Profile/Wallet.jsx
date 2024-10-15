import React, { useContext } from "react";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { BalanceContext } from "@/Layouts/AuthenticatedLayout.jsx";
import WalletFunds from "@/Components/WalletFunds";
export default function Wallet({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <WalletFunds />
        </AuthenticatedLayout>
    );
}
