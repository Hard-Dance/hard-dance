import type {
	LoaderFunction,
	LoaderFunctionArgs,
	MetaFunction,
} from "@remix-run/node";
import { Footer } from "../components/Footer";
import { type Event, markdownToEvent } from "../data/data";
import fs from "node:fs";
import path from "node:path";
import { useLoaderData } from "@remix-run/react";
import { getFormattedDateRange } from "../utils/date";
import Markdown from "react-markdown";
import { Header } from "../components/Header";
import type { CSSProperties } from "react";
import { VisuallyHidden } from "@itwin/itwinui-react";
import React from "react";

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

			<CustomBanner event={event} />

			<main>
				<div
					className="xyz"
					style={{
						gridColumn: "padded-start / padded-end",
					}}
				>
					<CustomTitleBar event={event} />

					<dl className="grid event-data-list">
						{event.facebook && (
							<div className="grid-item event-data-list-item">
								<svg aria-hidden="true">
									<use xlinkHref="/assets/symbols.svg#facebook" />
								</svg>
								<dt>RSVP</dt>
								<dd>
									<a
										className="grid-item-anchor"
										href={event.facebook}
										target="_blank"
										rel="noopener noreferrer"
									>
										Facebook
									</a>
								</dd>
							</div>
						)}
					</dl>

					<CustomMap event={event} />

					<section>
						<h2>Description</h2>
						<Markdown>{event.description}</Markdown>
					</section>
				</div>
			</main>

			<Footer />
		</>
	);
}

// -----------------------

const CustomTitleBar = ({ event }: { event: Event }) => {
	const dateFormat = "MMM dd, yyyy";
	const formattedDateRange = getFormattedDateRange(
		dateFormat,
		event.datestartDate,
		event.dateendDate,
	);

	const onShareClick = () => {};
	// !!navigator && navigator.share
	// 	? // Web Share API is supported
	// 		() => {
	// 			navigator
	// 				.share({
	// 					title: document.title,
	// 					url: window.location.href,
	// 				})
	// 				.then(() => {
	// 					console.log("Thanks for sharing!");
	// 				})
	// 				.catch(console.error);
	// 		}
	// 	: // Fallback for browsers that do not support the Web Share API
	// 		() => {
	// 			// Attempt to copy the current URL to the clipboard as a fallback
	// 			navigator.clipboard.writeText(window.location.href).then(() => {
	// 				alert("URL copied to clipboard");
	// 			});
	// 		};

	return (
		<div className="page-title event-page-title">
			<div className="event-page-title-stacked">
				<h1
					style={{
						viewTransitionName: "post-title-defqon-1-weekend-festival-2024",
					}}
				>
					{event.title}
				</h1>
				{/* TODO: Should we use <time> each for the start and end? */}
				<span>{formattedDateRange}</span>
			</div>

			<button
				type="button"
				className="button page-title-end"
				id="shareButton"
				onClick={onShareClick}
			>
				<svg aria-hidden="true">
					<use xlinkHref="/assets/symbols.svg#share" />
				</svg>
				<span className="hide-on-mobile">Share</span>
			</button>
		</div>
	);
};

const CustomBanner = ({ event }: { event: Event }) => {
	return (
		<div className="banner" id="top">
			<div className="banner-event-slides">
				<div
					id="poster"
					style={
						{
							"--_post-image": `url(https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=300)`,
						} as CSSProperties
					}
				>
					<img
						srcSet={`https://hard.dance/.netlify/images/?url=${event.image}&amp;h=1024 2x,https://hard.dance/.netlify/images/?url=${event.image}&amp;h=1536 3x`}
						src={`https://hard.dance/.netlify/images/?url=${event.image}&amp;h=512`}
						alt={`${event.title} poster`}
						draggable="false"
						style={{
							viewTransitionName: "post-image-airbeat-one-festival-2024;",
						}}
					/>
				</div>
			</div>
		</div>
	);
};

const CustomMap = ({ event }: { event: Event }) => {
	const [key, setKey] = React.useState<string>();

	React.useEffect(() => {
		/* eslint-disable @typescript-eslint/no-explicit-any */
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setKey((window as any).ENV.MK);
		/* eslint-enable */
	}, []);

	return (
		<section>
			<h2 id="location">
				Location
				<a
					className="anchorjs-link"
					data-anchorjs-icon="#"
					href="#location"
					style={{
						marginLeft: "0.1875em",
						paddingRight: "0.1875em",
						paddingLeft: "0.1875em",
					}}
				>
					<VisuallyHidden>Location section anchor link</VisuallyHidden>
				</a>
			</h2>
			<iframe
				id="map"
				// width="450"
				// height="250"
				frameBorder="0"
				style={{ border: "0" }}
				referrerPolicy="no-referrer-when-downgrade"
				src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${encodeURIComponent(event.location)}`}
				allowFullScreen
				title={`${event.title} location`}
			/>
		</section>
	);
};
