import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	json,
	useRouteLoaderData,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";

import appStylesHref from "./styles/style.css?url";
import appStyles1Href from "./styles/style1.css?url";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStylesHref },
	{ rel: "stylesheet", href: appStyles1Href },
];

export async function loader() {
	return json({
		ENV: { MK: process.env.MK },
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
			<body>
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
