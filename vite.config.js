import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
    return {
        build: {
            outDir: "build",
        },
        server: {
            open: "index.html",
        },
        plugins: [react()],
    };
});
