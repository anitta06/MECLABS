import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
	return {
		plugins: [react()],
		envDir: "./env",
		server: {
			proxy: {
				"/api": {
					target: "http://localhost:8080",
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					secure: false,
				},
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern-compiler",
				},
			},
		},
	};
});
