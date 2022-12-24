import { defineConfig } from "vite";
import mix from "vite-plugin-mix";

export default defineConfig({
	plugins: [
		//@ts-ignore
		mix.default({
			handler: "src/server/main.ts",
		}),
	],
});
