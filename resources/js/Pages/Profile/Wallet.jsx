import UserBalance from '@/Components/UserBalance';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';


export default function Wallet({ auth }) {

    const notify = () => toast.success('Saldo opgewaardeerd!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });



        const addFunds = async (amount) => {
            try {
                const response = await axios.post('/api/add-funds', { amount });
                if (response.status === 200) {
                    notify();
                }
            } catch (error) {
                console.error('Error adding funds:', error);
                toast.error('Er is een fout opgetreden bij het toevoegen van saldo.', {
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
        };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Wallet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-800 shadow sm:rounded-lg">
                        <div className="text-white text-lg font-semibold">
                            Je huidige saldo is: $ <UserBalance user={auth.user} />
                        </div>
                    </div>
                    <div className="p-4 sm:p-8 bg-gray-800  shadow sm:rounded-lg">
                        <div className="text-white text-lg font-semibold mb-4">
                            Saldo opwaarderen:
                        </div>
                        <div className="space-x-4">
                            {[10, 30, 50, 100].map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => addFunds(amount)}
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded "
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
};
