import fs from "node:fs";
import path from "node:path";

const beginningDir = process.cwd();
const remixDir = path.join(import.meta.dirname, "..");

try {
	main();
} finally {
	process.chdir(beginningDir);
}

function main() {
	process.chdir(remixDir);

	const source = "../../../../jekyll/_posts";
	const destination = "./app/server/assets/_posts";

	if (!fs.existsSync(destination)) {
		fs.symlinkSync(source, destination);
	}
}
