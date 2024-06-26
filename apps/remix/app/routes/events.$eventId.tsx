import type {
	LoaderFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { type Event, markdownToEvent } from "../data/data";
import fs from "node:fs";
import path from "node:path";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = async ({
	params,
}: LoaderFunctionArgs) => {
	const markdownFilePath = path.resolve(
		import.meta.dirname,
		"../../../jekyll/_posts",
		`${params.eventId}.md`,
	);

	if (!fs.existsSync(markdownFilePath)) {
		throw new Response(null, {
			status: 404,
			statusText: "Event not Found",
		});
	}

	const event = markdownToEvent(markdownFilePath);

	return {
		event,
	};
};

export default function Index() {
	const loaderData = useLoaderData<typeof loader>();
	const event = loaderData.event as Event;

	return (
		<>
			<Header />

			<Footer />
		</>
	);
}
