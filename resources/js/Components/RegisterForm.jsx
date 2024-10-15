import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function RegisterForm({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    const preventCopyPaste = (e) => {
        e.preventDefault();
    };

    return (
        <main className="flex items-center min-h-screen bg-scamdom-90">
            <Head title="Register" />

            <div className="flex items-center justify-center w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/4  p-10 mx-auto rounded-lg bg-[#1f2937]">
                <form
                    onSubmit={submit}
                    className="flex flex-col w-full space-y-6"
                >
                    <h1 className="text-2xl font-semibold text-white">
                        Register to Scamdom
                    </h1>
                    <div>
                        <InputLabel
                            htmlFor="name"
                            value="Name"
                            className="mb-1 text-white text-md"
                        />

                        <TextInput
                            id="name"
                            placeholder="Your name"
                            name="name"
                            value={data.name}
                            className="w-full  rounded-lg bg-[#374151] text-white placeholder:text-slate-400"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="mb-1 text-white text-md"
                        />

                        <TextInput
                            id="email"
                            placeholder="name@company.com"
                            type="email"
                            value={data.email}
                            name="email"
                            className="w-full  rounded-lg bg-[#374151] text-white placeholder:text-slate-400"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="mb-1 text-white text-md"
                        />

                        <TextInput
                            id="password"
                            placeholder="●●●●●●●●"
                            value={data.password}
                            type="password"
                            name="password"
                            className="w-full  rounded-lg bg-[#374151] text-white placeholder:text-slate-400"
                            autoComplete="cnew-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                            className="mb-1 text-white text-md"
                        />

                        <TextInput
                            id="password_confirmation"
                            placeholder="●●●●●●●●"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="w-full  rounded-lg bg-[#374151] text-white placeholder:text-slate-400"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Link
                            href={route("login")}
                            className="text-sm underline text-scamgreen-40"
                        >
                            Already registered?
                        </Link>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton
                            className="ms-4 bg-scamgreen-40"
                            disabled={processing}
                        >
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </main>
    );
}
