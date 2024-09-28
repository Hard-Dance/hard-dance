import { useFetcher, useLocation, useSearchParams } from "@remix-run/react";
import cx from "classnames";
import * as React from "react";
import { continentsDb } from "../data/countries";
import hosts from "../data/hosts.json";
import styles from "./TitleBar.module.css";

export const TitleBar = ({ userLocation }: { userLocation: string | null }) => {
	const location = useLocation();
	const fetcher = useFetcher();
	const [searchParams, setSearchParams] = useSearchParams();

	const viewMode = (searchParams.get("viewMode") ?? "gallery") as
		| "gallery"
		| "withMap";

	const pageLayout = location.pathname;

	const pageTitleDrawerItemsWrapper = React.useRef<HTMLDivElement>(null);
	const [showFilters, setShowFilters] = React.useState(false);

	const isAnyFilterEnabled =
		Array.from(searchParams.keys()).filter((v) =>
			["live", "continent", "host"].includes(v),
		).length > 0;

	const onViewModeChanged = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchParams(
				(prev) => {
					if (e.target.checked) {
						prev.set("viewMode", "withMap");
					} else {
						prev.delete("viewMode");
					}
					return prev;
				},
				{ preventScrollReset: true },
			);
		},
		[setSearchParams],
	);

	const onGetLocationClicked = React.useCallback(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const formData = new FormData();
			formData.append("_action", "use-current-location-clicked");
			formData.append(
				"location",
				`${position.coords.latitude},${position.coords.longitude}`,
			);
			fetcher.submit(formData, { method: "POST" });
		});
	}, [fetcher]);

	const onStopUsingCurrentLocationClicked = React.useCallback(() => {
		const formData = new FormData();
		formData.append("_action", "stop-using-current-location-clicked");
		fetcher.submit(formData, { method: "POST" });
	}, [fetcher]);

	return (
		<div
			className={cx(styles.titleBar, {
				"event-page-title": pageLayout === "/event",
			})}
		>
			<h1 className={cx(styles.title)}>Events</h1>

			<div className={cx(styles.start)}>
				<a aria-label="View past events" className="button" href="/events/">
					<svg aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#past" />
					</svg>
					<span className="hide-on-mobile">Past</span>
				</a>

				<a
					// TODO: Is aria-label needed when the link has text?
					aria-label="Subscribe to RSS feed"
					className="button"
					// TODO: Confirm the link is correct and works
					href="feed:https://hard.dance/feed.xml"
				>
					<svg aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#rss" />
					</svg>
					<span className="hide-on-mobile">Subscribe</span>
				</a>

				{/* TODO: Re-add the add button */}
				{/* <button
							type="button"
							aria-label="Add event"
							className="button"
							// onclick="document.getElementById('add-event').show()"
							// TODO: Real onclick
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#add" />
							</svg>
							<span className="hide-on-mobile">Add</span>
						</button> */}
			</div>

			<div className={cx(styles.end)}>
				<label>
					Distance
					<input
						type="checkbox"
						checked={userLocation != null}
						onChange={
						userLocation != null
							? onStopUsingCurrentLocationClicked
							: onGetLocationClicked
						}
					/>
				</label>

				<label>
					Map
					<input
						type="checkbox"
						checked={viewMode === "withMap"}
						onChange={onViewModeChanged}
					/>
				</label>
				<button
					type="button"
					className="button"
					id="events-filter-drawer-button"
					aria-label="Show filter options"
					aria-controls="filters-drawer"
					aria-expanded={showFilters}
					onClick={() => setShowFilters((prev) => !prev)}
				>
					<div className={styles.filterIconWrapper}>
						<svg aria-hidden="true">
							<use xlinkHref="/assets/symbols.svg#options" />
						</svg>
						{isAnyFilterEnabled && (
							<div aria-hidden className={styles.filterActivatedMarker} />
						)}
					</div>
					<span className="hide-on-mobile">Filters</span>
					<svg aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</button>
			</div>

			{/* TODO: Confirm that all the filter drawer items are inerted when not in view. Not tabbable. */}
			<div
				className={cx(styles.drawer)}
				id="filters-drawer"
				style={{
					maxHeight: showFilters
						? pageTitleDrawerItemsWrapper.current?.getBoundingClientRect()
								.height ?? 0
						: 0,
				}}
			>
				<div
					ref={pageTitleDrawerItemsWrapper}
					className={cx(styles.itemsWrapper)}
					//   inert TODO: What is the JSX equivalent of this?
				>
					<div className={cx(styles.item)}>
						{/* TODO: What is the JSX equivalent of `switch`? */}
						<label htmlFor="filter-virtual">
							Online broadcast
							<input
								type="checkbox"
								switch
								name="virtual"
								id="filter-virtual"
								checked={searchParams.get("live") === "true"}
								onChange={(e) => {
									setSearchParams(
										(prev) => {
											if (e.target.checked) {
												prev.set("live", "true");
											} else {
												prev.delete("live");
											}
											return prev;
										},
										{ preventScrollReset: true },
									);
								}}
							/>
						</label>
					</div>

					<div className={cx(styles.item)}>
						<label htmlFor="filter-continent">
							Continent
							<select
								name="continent"
								id="filter-continent"
								// multiple
								// style={{ resize: "none" }}
								value={searchParams.get("continent") ?? undefined}
								onChange={(e) => {
									setSearchParams(
										(prev) => {
											if (e.target.value === "all") {
												prev.delete("continent");
											} else {
												// const continentFilters = prev.getAll("continent");
												prev.set("continent", e.target.value);
											}
											return prev;
										},
										{ preventScrollReset: true },
									);
								}}
							>
								<option value="all">All</option>
								<hr />
								{Object.entries(continentsDb).map(
									([continentCode, continentValue]) => (
										<option key={continentCode} value={continentCode}>
											{continentValue.name}
										</option>
									),
								)}
							</select>
						</label>
					</div>

					{/* <div className={cx(styles.item)} id="filter-country-wrapper">
							<label htmlFor="filter-country">
								Country
								<select name="country" id="filter-country" />
							</label>
						</div> */}

					<div className={cx(styles.item)}>
						<label htmlFor="filter-host">
							Host
							<select
								name="host"
								id="filter-host"
								value={searchParams.get("host") ?? undefined}
								onChange={(e) => {
									setSearchParams(
										(prev) => {
											if (e.target.value === "all") {
												prev.delete("host");
											} else {
												prev.set("host", e.target.value);
											}
											return prev;
										},
										{ preventScrollReset: true },
									);
								}}
							>
								<option value="all">All</option>
								<hr />

								{(hosts as string[]).map((host) => (
									<option key={host} value={host}>
										{host}
									</option>
								))}
							</select>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};
