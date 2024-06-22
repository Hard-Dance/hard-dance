import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";
import { Footer } from "../components/Footer";
import { TitleBar } from "../components/TitleBar";
import { EventCardLi } from "../components/EventCard";
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

export const loader: LoaderFunction = async () => {
	const allFileNames = fs
		.readdirSync("../jekyll/_posts")
		.filter((fileName) => !fileName.includes("2024-01-01-template-2024.md"));
	const events: Event[] = allFileNames.map((fileName) => {
		const markdownFilePath = path.join("../jekyll/_posts", fileName);
		return markdownToEvent(markdownFilePath);
	});

	return {
		events,
	};
};

export default function Index() {
	const loaderData = useLoaderData<typeof loader>();
	const events = loaderData.events as Event[];

	return (
		<>
			<Header />

			<div className="banner events-banner" id="top">
				<BannerEvents />
			</div>

			<main>
				<TitleBar />

				{events.length > 0 ? (
					<ol className="grid events-grid">
						{events.map((event, index) => (
							<EventCardLi key={event.id} event={event} index={index} />
						))}
					</ol>
				) : (
					<NoEventsView />
				)}
			</main>

			<Footer />
		</>
	);
}

// ----------------------------------------------------------------------------

const NoEventsView = () => {
	return (
		<div
			className="events-empty-state"
			style={{
				display: "flex",
			}}
		>
			<div className="events-empty-state-emoji">🔇</div>
			<h2>No upcoming events found.</h2>
			<p>Do you know of an event that should be listed here?</p>
			<button
				type="button"
				aria-label="Add event"
				className="button"
				data-variant="call-to-action"
				// onclick="document.getElementById('add-event').show()"
				// TODO: onClick
			>
				Add an event
			</button>
		</div>
	);
};
