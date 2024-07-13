import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";
import fs from "node:fs";

const copyServerAssetsPlugin = () => {
	return {
		name: "copy-server-assets",
		closeBundle() {
			const sourceFolder = path.resolve(__dirname, "app/server/assets/_posts");
			const destinationFolder = path.resolve(
				__dirname,
				"build/server/assets/_posts",
			);

			if (!fs.existsSync(destinationFolder)) {
				fs.mkdirSync(destinationFolder, { recursive: true });
			}

			for (const fileName of fs.readdirSync(sourceFolder)) {
				const sourcePath = path.resolve(sourceFolder, fileName);
				const destinationPath = path.resolve(destinationFolder, fileName);

				fs.copyFileSync(sourcePath, destinationPath);
			}
		},
	};
};

export default defineConfig({
	plugins: [
		remix({
			future: {
				v3_fetcherPersist: true,
				v3_relativeSplatPath: true,
				v3_throwAbortReason: true,
			},
		}),
		tsconfigPaths(),
		copyServerAssetsPlugin(),
	],
});
