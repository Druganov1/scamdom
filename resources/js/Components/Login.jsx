import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <main className="flex items-center min-h-screen bg-scamdom-90">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
            <div className="flex items-center justify-center w-3/4 md:w-2/4 lg:w-2/4 xl:w-1/4  p-10 mx-auto rounded-lg bg-[#1f2937]">
                <form
                    onSubmit={submit}
                    className="flex flex-col w-full space-y-6"
                >
                    <h1 className="text-2xl font-semibold text-white">
                        Sign in to Scamdom
                    </h1>
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
                            autoComplete="username"
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
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="text-sm text-white ms-2">
                                Remember me
                            </span>
                        </label>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <Link
                            href={route("register")}
                            className="text-sm underline text-scamgreen-40"
                        >
                            No account yet?
                        </Link>
                    </div>

                    <div className="flex items-center justify-center mt-4">
                        <PrimaryButton
                            className="ms-4 bg-scamgreen-40"
                            disabled={processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </main>
    );
}
