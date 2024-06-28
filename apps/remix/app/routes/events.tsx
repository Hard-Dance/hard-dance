import { Header } from "../components/Header";
import { BannerEvents } from "../components/BannerEvents";
import { Footer } from "../components/Footer";
import averageColors from "../data/average-colors";
import * as fs from "node:fs";
import * as path from "node:path";
import type { LoaderFunction } from "@remix-run/node";
import { compareAsc, compareDesc } from "date-fns";
import { markdownToEvent } from "../data/data";
import type { Event } from "../data/data";
import { useLoaderData } from "@remix-run/react";
import { getFormattedDate } from "../utils/date";

export const loader: LoaderFunction = async () => {
	const allFileNames = fs
		.readdirSync("../jekyll/_posts")
		.filter((fileName) => !fileName.includes("2024-01-01-template-2024.md"));

	// TODO: Confirm if this takes into account the user's timezone
	// I think it should show all user event today regardless of the timezone?
	// Or maybe show events related to the timezone of the event?
	// Some improvements need to be done here.
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const events: Event[] = allFileNames
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
				// Merge this code with the code from _index since this is just a negation of that condition.
				!(
					compareAsc(today, event.datestartDate) !== 1 ||
					(event.dateendDate != null &&
						compareAsc(today, event.dateendDate) !== 1)
				),
		);

	events.sort((e1, e2) => compareDesc(e1.datestartDate, e2.datestartDate));

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
				<CustomTitleBar />

				<div className="archives-table-container">
					<table>
						<thead>
							<tr>
								<th scope="col">Name</th>
								<th scope="col">Date start</th>
								<th scope="col">Date end</th>
								<th scope="col">Live stream</th>
								<th scope="col">Location</th>
								<th scope="col">Hosts</th>
							</tr>
						</thead>

						<tbody>
							{events.map((event) => {
								const format = "MMM d, yyyy";
								const formattedDateStart = getFormattedDate(
									format,
									event.datestartDate,
								);
								const formattedDateEnd = getFormattedDate(
									format,
									event.dateendDate,
								);
								const averageColor = averageColors[event.id];

								return (
									<tr key={event.id}>
										<th
											scope="row"
											style={{ backgroundColor: "average_color" }}
										>
											<a
												href="{{ post.url }}"
												style={{
													outlineColor: "currentColor",

													...(event.isForegroundBlack
														? {
																color: `color-mix(in srgb, ${averageColor}, black 80%)`,
															}
														: {
																color: `color-mix(in srgb, ${averageColor}, white 80%)`,
															}),
												}}
											>
												{/* TODO: What is smartify in Jekyll? */}
												{event.title}
											</a>
										</th>
										<td>
											<time dateTime={event.datestart}>
												{formattedDateStart}
											</time>
										</td>
										<td>
											{event.dateend && (
												<time dateTime={event.dateend}>{formattedDateEnd}</time>
											)}
										</td>
										<td>{event.is_online ? "Yes" : "No"}</td>
										<td>{event.location}</td>
										<td>{event.hosts.join(", ")}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</main>

			<Footer />
		</>
	);
}

// ------------

const CustomTitleBar = () => {
	return (
		<div className="page-title ">
			<h1>Past events</h1>

			<div className="page-title-start">
				<a aria-label="View upcoming events" className="button" href="/">
					<svg aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
						<use xlinkHref="/assets/symbols.svg#past" />
					</svg>
					<span className="hide-on-mobile">Upcoming</span>
				</a>
			</div>
		</div>
	);
};
