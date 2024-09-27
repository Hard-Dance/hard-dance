import type {
	ActionFunctionArgs,
	LoaderFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { TitleBar } from "../components/TitleBar";
import { EventCardLi } from "../components/EventCard";
import { type Event, markdownToEvent } from "../data/data";
import fs from "node:fs";
import path from "node:path";
import { json, useLoaderData } from "@remix-run/react";
import type { FileFilterIndexFile } from "../data/filter";
import _fileFilterIndex from "../data/file-filter-indexes.json";
import { compareAsc } from "date-fns";
import { getServerAssetPath } from "../utils/assets";
import {
	AdvancedMarker,
	APIProvider,
	Map as GMap,
	// Marker,
	Pin,
	useMap,
} from "@vis.gl/react-google-maps";
import styles from "../styles/routes/index.module.css";
import { ClientOnly } from "remix-utils/client-only";
import cx from "classnames";
import React from "react";
import { EventsGrid } from "../components/EventsGrid";
import { EventsMap } from "../components/EventsMap"; 

import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import pkg from "@googlemaps/markerclusterer";
// const { MarkerClusterer } = pkg;

import type { Marker as GMarker } from "@googlemaps/markerclusterer";
import { locationCookie } from "../state/location-cookie";

const fileFilterIndex = _fileFilterIndex as FileFilterIndexFile;

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export const loader: LoaderFunction = async ({
	request,
}: LoaderFunctionArgs) => {
	const cookieHeader = request.headers.get("Cookie");
	const cookie = (await locationCookie.parse(cookieHeader)) || null;

	const postsFolder = getServerAssetPath("_posts");

	const allFileNames = fs
		.readdirSync(postsFolder)
		.filter((fileName) => !fileName.includes("2024-01-01-template-2024.md"));

	// TODO: Confirm if this takes into account the user's timezone
	// I think it should show all user event today regardless of the timezone?
	// Or maybe show events related to the timezone of the event?
	// Some improvements need to be done here.
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	let events: Event[] = allFileNames
		.map((fileName) => {
			const markdownFilePath = path.join(postsFolder, fileName);
			return markdownToEvent(markdownFilePath);
		})
		.filter(
			(event) =>
				compareAsc(today, event.datestartDate) !== 1 ||
				(event.dateendDate != null &&
					compareAsc(today, event.dateendDate) !== 1),
		)
		// TODO: Remove slice
		.slice(0, 50);

	const url = new URL(request.url);
	const continentFilter = url.searchParams.get("continent");
	const hostFilter = url.searchParams.get("host");
	const liveFilter = url.searchParams.get("live");

	if (!!continentFilter || !!hostFilter || !!liveFilter) {
		events = events.filter((event) => {
			const eventIndexObject = fileFilterIndex[event.id];
			return (
				(!continentFilter ||
					eventIndexObject.continentCode === continentFilter) &&
				(!hostFilter || event.hosts.includes(hostFilter)) &&
				(!liveFilter || (liveFilter === "true" && event.is_online))
			);
		});
	}

	events.sort((e1, e2) => compareAsc(e1.datestartDate, e2.datestartDate));

	const viewMode = (url.searchParams.get("viewMode") ?? "gallery") as
		| "gallery"
		| "withMap";

	return {
		events,
		viewMode,
		location: cookie?.location,
	};
};

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const { _action, ...values } = Object.fromEntries(formData);

	if (_action === "use-current-location-clicked") {
		const cookieHeader = request.headers.get("Cookie");
		const cookie = (await locationCookie.parse(cookieHeader)) || {};

		const { location } = values;
		cookie.location = location;

		return json(location, {
			headers: {
				"Set-Cookie": await locationCookie.serialize(cookie),
			},
		});
	}
	if (_action === "stop-using-current-location-clicked") {
		// Delete the location cookie
		return json(null, {
			headers: {
				"Set-Cookie": await locationCookie.serialize("", {
					maxAge: 1,
				}),
			},
		});
	}
	// if (_action === "update-hash") {
	// 	// return null;

	// 	const hash = values.hash;
	// 	console.log("update-hash", hash);
	// 	const newUrl = new URL(request.url);
	// 	newUrl.hash = hash.toString();
	// 	return redirect(newUrl.toString());
	// }

	return null;
}
export default function Index() {
	const loaderData = useLoaderData<typeof loader>();
	const events = loaderData.events as Event[];
	const viewMode = loaderData.viewMode as "gallery" | "withMap";

	return (
		<>
			<Header className={styles.header} />

			{/* {viewMode === "gallery" && ( */}
			{/* <div className="banner events-banner" id="top">
				<BannerEvents />
			</div> */}
			{/* )} */}

			<TitleBar userLocation={loaderData.location} />

			{viewMode === "withMap" && <EventsMap events={events} userLocation={loaderData.location} />}

			<div className={styles.jonLookHere}>
				<EventCards events={events} location={loaderData.location} />
				<Footer />
			</div>
		</>
	);
}

// TODO: standardize common separator length
// ----------------------------------------------------------------------------

const EventCards = ({
	events,
	location,
}: { events: Event[]; location: string | null }) => {
	return events.length > 0 ? (
		<EventsGrid>
			{events.map((event, index) => (
				<EventsGrid.Item
					key={event.id}
					event={event}
					index={index}
					userLocation={location}
				/>
			))}
		</EventsGrid>
	) : (
		<NoEventsView />
	);
};

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