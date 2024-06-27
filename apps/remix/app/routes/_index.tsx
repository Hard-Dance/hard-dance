import type {
	LoaderFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";
import { Footer } from "../components/Footer";
import { TitleBar } from "../components/TitleBar";
import { EventCardLi } from "../components/EventCard";
import { type Event, markdownToEvent } from "../data/data";
import fs from "node:fs";
import path from "node:path";
import { useLoaderData } from "@remix-run/react";
import type { FileFilterIndexFile } from "~/data/filter";
import { compareAsc } from "date-fns";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const allFileNames = fs
		.readdirSync("../jekyll/_posts")
		.filter((fileName) => !fileName.includes("2024-01-01-template-2024.md"));

	// TODO: Confirm if this takes into account the user's timezone
	const today = new Date();

	let events: Event[] = allFileNames
		.map((fileName) => {
			const markdownFilePath = path.join(
				import.meta.dirname,
				"../../../jekyll/_posts",
				fileName,
			);
			return markdownToEvent(markdownFilePath);
		})
		.filter(
			(event) =>
				compareAsc(today, event.datestartDate) !== 1 ||
				(event.dateendDate != null &&
					compareAsc(today, event.dateendDate) !== 1),
		);

	const fileFilterIndex = JSON.parse(
		fs.readFileSync(
			path.resolve(import.meta.dirname, "../data/file-filter-indexes.json"),
			"utf-8",
		),
	) as FileFilterIndexFile;

	const url = new URL(request.url);
	const continentFilter = url.searchParams.get("continent");
	const hostFilter = url.searchParams.get("host");
	const liveFilter = url.searchParams.get("live");

	if (!!continentFilter || !!hostFilter || !!liveFilter) {
		events = events.filter((event) => {
			const eventIndexObject = fileFilterIndex[event.id];
			console.log(event.id, eventIndexObject);
			return (
				(!continentFilter ||
					eventIndexObject.continentCode === continentFilter) &&
				(!hostFilter || event.hosts.includes(hostFilter)) &&
				(!liveFilter || (liveFilter === "true" && event.is_online))
			);
		});
	}

	events.sort((e1, e2) => compareAsc(e1.datestartDate, e2.datestartDate));

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
