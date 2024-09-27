import averageColors from "../data/average-colors";
import type { Event } from "../data/data";
import { format, isAfter, isSameDay } from "date-fns";
import { getDistance } from "geolib";
import styles from "./EventCard.module.css";
import cx from "classnames";

export const EventCardLi = ({
	event,
	index,
	userLocation: userLocationProp,
}: {
	event: Event;
	index: number;
	userLocation: string | null;
}) => {
	const userLocation = userLocationProp ? userLocationProp.split(",") : null;

	const averageColor = averageColors[event.id];
	const baseTextColor = event.isForegroundBlack ? "black" : "white";

	// TODO: Change the folder to video instead of videos
	const videoUrlWithoutType = `assets/videos/events/${event.id}`;

	const dateStartDate = new Date(event.datestart);
	const dateEndDate = new Date(event.dateend);

	const dateFormat = "MMM d";
	const formattedDateStart = format(dateStartDate, dateFormat);
	const formattedDateEnd = event.dateend
		? format(dateEndDate, dateFormat)
		: undefined;

	const today = new Date();

	const distanceFromUserSpecifiedLocation =
		event.coordinates != null && userLocation != null
			? getDistance(
					{
						latitude: event.coordinates.lat,
						longitude: event.coordinates.lng,
					},
					{
						latitude: Number(userLocation[0]),
						longitude: Number(userLocation[1]),
					},
				)
			: undefined;

	// TODO: Make sure user's timezone is taken into account since their timezone may not be equal to the event's timezone
	const isHappeningNow = event.dateend
		? !isAfter(dateStartDate, today) && !isAfter(today, dateEndDate)
		: isSameDay(dateStartDate, today);
	return (
		<li
			// id={`grid-item-${index}`}
			id={`event-card-${event.id}`}
			className={cx(styles.root, "grid-item", "events-grid-item")}
			// TODO: Get this working.
			style={
				{
					"--xxx-color-background": averageColor,

					"--xxx-color-text": `color-mix(in srgb, ${averageColor}, ${baseTextColor} 80%)`,
					"--xxx-color-text-muted": `color-mix(in srgb, ${averageColor} 50%, ${baseTextColor} 50%)`,
					"--xxx-color-accent": `color-mix(in srgb, ${averageColor} 100%, ${baseTextColor} 25%)`,
				} as React.CSSProperties
			}
			data-virtual={event.is_online ? true : undefined}
			data-featured={event.featured ? true : undefined}
		>
			{event.featured && event.video && (
				<video
					autoPlay
					muted
					loop
					playsInline
					poster={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=300`}
					className="grid-item-image"
				>
					<source src={`${videoUrlWithoutType}.mp4`} type="video/mp4" />
					<source src={`${videoUrlWithoutType}.ogv`} type="video/ogv" />
					<source src={`${videoUrlWithoutType}.webm`} type="video/webm" />
				</video>
			)}

			<img
				className="grid-item-image"
				srcSet={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=600&w=600 2x, https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=900&w=900 3x`}
				src={`https://hard.dance/.netlify/images/?url=${event.image}&fit=cover&h=300&w=300`}
				alt={event.title}
				data-index={index}
				draggable="false"
				style={
					{
						viewTransitionName: `post-image-${event.id}`,
					} as React.CSSProperties
				}
			/>

			<div className="grid-item-metadata">
				<a
					className="grid-item-metadata-title grid-item-anchor"
					href={`/events/${event.id}`}
					style={
						{
							viewTransitionName: `post-title-${event.id}}`,
						} as React.CSSProperties
					}
				>
					{event.title}
				</a>

				{distanceFromUserSpecifiedLocation != null && (
					<div className="">
						{Math.floor(distanceFromUserSpecifiedLocation / 1000)}km away from
						you
					</div>
				)}

				<div className="grid-item-metadata-subtitle">
					<time dateTime={event.datestart}>{formattedDateStart}</time>

					{event.dateend && (
						<>
							{" - "}
							<time dateTime={event.dateend}>{formattedDateEnd}</time>
						</>
					)}
				</div>

				<div className="grid-item-metadata-symbol">
					{event.is_online && "🛰️"}
					{event.flag}
				</div>

				{isHappeningNow && <div className="event-list-item-status">Today</div>}
			</div>

			{/* TODO: How AT users will know that "Show on map" refers to which event?
			i.e. with a callout like "Show on map, button", how to know which event will be shown on the map? */}
			{event.coordinates != null && (
				<button
					type="button"
					className={styles.showOnMapButton}
					onClick={(e) => {
						e.stopPropagation();

						window.location.replace(`#event-card-${event.id}`);
					}}
				>
					Show on map
				</button>
			)}
		</li>
	);
};
