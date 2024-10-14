import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";

export default function Wallet({ auth }) {
    const addFunds = async (amount) => {
        try {
            const response = await axios.post(
                "/api/add-funds",
                { amount },
                {
                    validateStatus: function (status) {
                        return status >= 200 && status < 500; // Accept status codes from 200 to 499
                    },
                }
            );
            if (response.status === 200) {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else if (response.status === 403) {
                toast.error(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error adding funds:", error);
            toast.error(
                "Er is een fout opgetreden bij het toevoegen van saldo.",
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                }
            );
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Wallet" />

            <div className="py-12">
                <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-4 bg-gray-800 shadow sm:p-8 sm:rounded-lg">
                        <div className="text-lg font-semibold text-white">
                            Je huidige saldo is: $ 0
                        </div>
                    </div>
                    <div className="p-4 bg-gray-800 shadow sm:p-8 sm:rounded-lg">
                        <div className="mb-4 text-lg font-semibold text-white">
                            Saldo opwaarderen:
                        </div>
                        <div className="space-x-4">
                            {[10, 30, 50, 100].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => addFunds(amount)}
                                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 "
                                >
                                    ${amount}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
