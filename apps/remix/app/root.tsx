import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useRouteError,
	useRouteLoaderData,
} from "@remix-run/react";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import appStylesHref from "./styles/style.css?url";
import appStyles1Href from "./styles/style1.css?url";
import averageColors from "./data/average-colors";
import type { CSSProperties } from "react";
import "@itwin/itwinui-react/styles.css";
import styles from "./styles/routes/root.module.css";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStylesHref },
	{ rel: "stylesheet", href: appStyles1Href },
];

export async function loader({ params }: LoaderFunctionArgs) {
	return json({
		ENV: Object.fromEntries(
			["VITE_MK", "VITE_WSR", "VITE_WSC"].map((key) => [
				key,
				import.meta.env[key],
			]),
		),
		averageColor:
			averageColors[(params.eventId ?? "").slice("yyyy-mm-dd-".length)],
	});
}

export function Layout({ children }: { children: React.ReactNode }) {
	// const data = useLoaderData<typeof loader>();
	const data = useRouteLoaderData<typeof loader>("root");

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: Remix docs recommends this
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data?.ENV)}`,
					}}
				/>
			</head>
			<body
				className={styles.body}
				style={
					{
						"--xxx-color-background-backdrop": data?.averageColor,
					} as CSSProperties
				}
			>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary() {
	const error = useRouteError();
	console.error("ERRRRRROR:", error);
	return (
		<html lang="en-US">
			<head>
				<title>Oh no!</title>
				<p>{`${error}`}</p>
				<Meta />
				<Links />
			</head>
			<body>
				{/* add the UI you want your users to see */}
				<Scripts />
			</body>
		</html>
	);
}
