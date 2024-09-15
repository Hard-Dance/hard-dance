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
		.slice(0, 10);

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

			<main className={styles.main}>
				<TitleBar userLocation={loaderData.location} />

				{viewMode === "gallery" ? (
					<EventCards events={events} location={loaderData.location} />
				) : (
					<div className={styles.mapGrid}>
						{/* <GMapProvider> */}
						<MapView events={events} userLocation={loaderData.location} />
						{/* </GMapProvider> */}
						<EventCards events={events} location={loaderData.location} />
					</div>
				)}
			</main>

			<Footer />
		</>
	);
}

// ----------------------------------------------------------------------------

const MapView = ({
	events,
	userLocation: userLocationProp,
}: { events: Event[]; userLocation: string | null }) => {
	// TODO: Properly get userlocation in all places, even the cookie, so that no need to split() each time
	const userLocation =
		userLocationProp != null ? userLocationProp.split(",") : null;

	// TODO: I think defaultCenter is required. So need to have a fallback. Or maybe just the bounds are enough?
	const defaultCenter =
		userLocation != null
			? { lat: Number(userLocation[0]), lng: Number(userLocation[1]) }
			: { lat: 0, lng: 0 };

	// const { zoom, setZoom } = React.useContext(GMapProviderContext) || {};

	return (
		<ClientOnly>
			{() => (
				<APIProvider
					/* eslint-disable @typescript-eslint/no-explicit-any */
					// biome-ignore lint/suspicious/noExplicitAny: Manually added properties to window
					apiKey={(window as any).ENV.VITE_MK}
					/* eslint-enable */
				>
					<GMap
						mapId={"map123"}
						className={styles.map}
						defaultCenter={defaultCenter}
						defaultZoom={12}
						gestureHandling={"greedy"}
						// disableDefaultUI={true}
						// zoom={zoom}
						// onZoomChanged={(e) => {
						// 	setZoom?.(e.detail.zoom);
						// }}
					>
						<InsideMap events={events} userLocation={userLocation} />
					</GMap>
				</APIProvider>
			)}
		</ClientOnly>
	);
};

// const GMapProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [zoom, setZoom] = React.useState(12);

// 	return (
// 		<GMapProviderContext.Provider value={{ zoom, setZoom }}>
// 			{children}
// 		</GMapProviderContext.Provider>
// 	);
// };

// const GMapProviderContext = React.createContext<{
// 	zoom: number;
// 	setZoom: React.Dispatch<React.SetStateAction<number>>;
// } | null>(null);

const InsideMap = ({
	events,
	userLocation,
}: { events: Event[]; userLocation: string[] | null }) => {
	const map = useMap();
	const [markers, setMarkers] = React.useState<{ [key: string]: GMarker }>({});
	const clusterer = React.useRef<MarkerClusterer | null>(null);

	// Listen to change in the hash of the URL. When changed, go to the marker with the same ID.
	const goToMarkerFromUrlHash = React.useCallback(
		(hash: string) => {
			console.log("hash", hash);
			if (hash.startsWith("#event-card-")) {
				const eventId = hash.slice("#event-card-".length);
				console.log("eventId", eventId);
				const event = events.find((e) => e.id === eventId);
				const mapLocation = event?.coordinates;
				if (mapLocation) {
					// map?.setCenter(
					// 	new google.maps.LatLng(mapLocation.lat, mapLocation.lng),
					// );
					map?.panTo(new google.maps.LatLng(mapLocation.lat, mapLocation.lng));
				}
				// console.log("event", event);
			}
		},
		[events, map],
	);

	const [previousLocationHash, setPreviousLocationHash] = React.useState(
		location.hash,
	);
	if (previousLocationHash !== location.hash) {
		goToMarkerFromUrlHash(location.hash);
		setPreviousLocationHash(location.hash);
	}

	React.useEffect(() => {
		if (!map) return;
		if (!clusterer.current) {
			clusterer.current = new MarkerClusterer({ map });
		}
	}, [map]);

	React.useEffect(() => {
		clusterer.current?.clearMarkers();
		clusterer.current?.addMarkers(Object.values(markers));
	}, [markers]);

	const setMarkerRef = (marker: GMarker | null, key: string) => {
		if (marker && markers[key]) return;
		if (!marker && !markers[key]) return;

		setMarkers((prev) => {
			if (marker) {
				return { ...prev, [key]: marker };
			}

			const newMarkers = { ...prev };
			delete newMarkers[key];
			return newMarkers;
		});
	};

	React.useEffect(() => {
		const latlng = events
			.map((e) =>
				e.coordinates != null
					? new google.maps.LatLng(e.coordinates.lat, e.coordinates.lng)
					: null,
			)
			.filter(Boolean) as google.maps.LatLng[];

		// [
		// 	new google.maps.LatLng(1.23, 4.56),
		// 	new google.maps.LatLng(7.89, 1.01),
		// 	// ...
		// ];
		const latlngbounds = new google.maps.LatLngBounds();
		for (let i = 0; i < latlng.length; i++) {
			latlngbounds.extend(latlng[i]);
		}

		map?.fitBounds(latlngbounds);
	}, [events, map]);

	return [
		...events
			.map((event) => {
				return event.coordinates != null ? (
					// <Marker
					// 	key={event.id}
					// 	position={event.coordinates}
					// 	onClick={(e) => console.log(e)}
					// />
					// <a key={event.id} href={`#event-card-${event.id}`}>
					<AdvancedMarker
						key={event.id}
						position={new google.maps.LatLng(event.coordinates)}
						ref={(marker) => setMarkerRef(marker, event.id)}
						onClick={() => {
							console.log(event.id);

							document
								.querySelector(`#event-card-${event.id}`)
								?.scrollIntoView({
									behavior: "smooth",
								});

							// location.hash = `#event-card-${event.id}`;
							// window.location = `#event-card-${event.id}`;
							window.location.replace(`#event-card-${event.id}`);
						}}
					>
						{/* <p style={{ color: "red", fontWeight: "bold" }}>ABC</p> */}
						<Pin glyphColor={"#000"} borderColor={"#000"} />
					</AdvancedMarker>
					// </a>
				) : null;
			})
			.filter(Boolean),

		userLocation != null ? (
			<AdvancedMarker
				key={"userLocation"}
				position={
					new google.maps.LatLng(
						Number(userLocation[0]),
						Number(userLocation[1]),
					)
				}
				// ref={(marker) => setMarkerRef(marker, "userLocation")}
			>
				{/* <p style={{ color: "red", fontWeight: "bold" }}>ABC</p> */}
				{/* <Pin background={"#0f0"} glyphColor={"#000"} borderColor={"#000"} /> */}
				<div
					style={{
						width: "15px",
						height: "15px",
						borderRadius: "50%",
						border: "1px solid #1965c4",
						backgroundColor: "#4b90f5",
					}}
				/>
			</AdvancedMarker>
		) : undefined,
	];
};

const EventCards = ({
	events,
	location,
}: { events: Event[]; location: string | null }) => {
	return events.length > 0 ? (
		<ol className={cx("grid", "events-grid", styles.eventCards)}>
			{events.map((event, index) => (
				<EventCardLi
					key={event.id}
					event={event}
					index={index}
					userLocation={location}
				/>
			))}
		</ol>
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
