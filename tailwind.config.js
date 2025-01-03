import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            maxWidth: {
                "8xl": "96rem",
            },
            colors: {
                scamdom: {
                    30: "#181f26",
                    40: "#131a22",
                    50: "#0b131b",
                    90: "#0a1119",
                    primary: "#00e701",
                    chat: "#131a22",
                },
                roulette: {
                    red: "rgb(236, 75, 63)",
                    green: "rgb(48, 193, 73)",
                    black: "rgb(53, 57, 66)",
                    text_black: "#6e7689",
                },
                scamgreen: {
                    30: "rgb(0, 255, 134)",
                    40: "rgb(48, 193, 73)",
                    50: "rgba(1, 211, 112, 0.08)",
                },
            },

            backgroundImage: {
                slot: "linear-gradient(219deg, rgb(7, 109, 203) 0%, rgb(65, 148, 226) 100%)",
                crash: "linear-gradient(219deg, rgb(10, 131, 79) 0%, rgb(1, 194, 96) 100%)",
                roulette:
                    "linear-gradient(227deg, rgb(142, 12, 37) 0%, rgb(204, 20, 53) 100%)",
                dice: "linear-gradient(227deg, rgb(14, 38, 123) 0%, rgb(43, 68, 157) 100%)",
                hilo: "linear-gradient(227deg, rgb(133, 60, 48) 0%, rgb(133, 95, 35) 100%)",
                plinko: "linear-gradient(227deg, rgb(14, 38, 123) 0%, rgb(43, 68, 157) 100%)",
            },
        },
    },

    plugins: [forms],
};
