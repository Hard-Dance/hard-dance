import path from "node:path";

/**
 * @param innerPath Path with respect to app/server/assets
 * @returns Correct path depending on whether in production or not
 */
export const getServerAssetPath = (innerPath: string) => {
	const pathPieces = path.normalize(import.meta.dirname).split(path.sep);

	let numberOfGoUps = 0;
	for (let i = pathPieces.length - 1; i >= 0; i--) {
		if (pathPieces[i] === "remix") {
			break;
		}
		numberOfGoUps++;
	}

	return path.resolve(
		import.meta.dirname,
		import.meta.env.MODE === "production"
			? ""
			: [...Array(numberOfGoUps)].map(() => "..").join("/"),
		import.meta.env.MODE === "production" ? "./assets" : "./app/server/assets",
		innerPath,
	);
};
