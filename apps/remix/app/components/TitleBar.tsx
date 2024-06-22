import { useLocation } from "@remix-run/react";
import cx from "classnames";
import * as React from "react";

export const TitleBar = () => {
	const location = useLocation();

	// Upcoming events if and only if URL = /
	// const isShowingUpcomingEvents = window.location.pathname === "/";

	const pageLayout = location.pathname;

	const pageTitleDrawerItemsWrapper = React.useRef<HTMLDivElement>(null);

	//   return <div>Hello</div>;

	const [showFilters, setShowFilters] = React.useState(false);

	return (
		<div
			className={cx("page-title", {
				"event-page-title": pageLayout === "/event",
			})}
		>
			{/* {% if page.layout == 'event' %} */}
			{pageLayout === "/event" && (
				<div className="event-page-title-stacked">
					<h1
						//   style="view-transition-name: post-title-{{ page.title | slugify }};"
						style={{
							// TODO: Use real data
							viewTransitionName: "post-title-{{ page.title | slugify }}",
						}}
					>
						{/* {{ page.title }} */}
						TODO: page.title
					</h1>
					<span>
						{/* <!-- TODO: Have a {{ page.daterange }} variable --> */}
						{/* {{ page.datestart | date: "%B %d, %Y" }} {% if page.dateend %} - {{
        page.dateend | date: "%B %d, %Y" }} {% endif %} */}
						{/* TODO: Use real data */}
					</span>
				</div>
			)}

			{/* {% else %} */}

			{pageLayout !== "/event" && (
				<h1>
					{/* {{ page.title }} */}
					{/* TODO: Use real data */}
					Events
				</h1>
			)}
			{/* {% endif %} */}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/" ? (
				<>
					<div className="page-title-start">
						<a aria-label="View past events" className="button" href="/events/">
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#past" />
							</svg>
							<span className="hide-on-mobile">Past</span>
						</a>
						<button
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
						</button>
					</div>

					<div className="page-title-end">
						<a
							// TODO: Is aria-label needed when the link has text?
							aria-label="Subscribe to RSS feed"
							className="button"
							href="feed:{{ '/feed.xml' | absolute_url }}"
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#rss" />
							</svg>
							<span className="hide-on-mobile">Subscribe</span>
						</a>
						<button
							type="button"
							className="button"
							id="events-filter-drawer-button"
							aria-label="Show filter options"
							aria-controls="filters-drawer"
							aria-expanded={showFilters}
							onClick={() => setShowFilters((prev) => !prev)}
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#options" />
							</svg>
							<span className="hide-on-mobile">Filters</span>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#chevron-down" />
							</svg>
						</button>
					</div>
				</>
			) : pageLayout === "/archives" ? (
				// {% elsif page.layout == 'archives' %}

				<div className="page-title-start">
					<a aria-label="View upcoming events" className="button" href="/">
						<svg aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
							<use xlinkHref="/assets/symbols.svg#past" />
						</svg>
						<span className="hide-on-mobile">Upcoming</span>
					</a>
				</div>
			) : // {% elsif page.layout == 'event' %}
			pageLayout === "/event" ? (
				<button
					type="button"
					className="button page-title-end"
					id="shareButton"
				>
					<svg aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#share" />
					</svg>
					<span className="hide-on-mobile">Share</span>
				</button>
			) : // {% endif %}
			undefined}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/" && (
				<div
					className="page-title-drawer"
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
						className="page-title-drawer-items-wrapper"
						//   inert TODO: What is the JSX equivalent of this?
					>
						<div className="page-title-drawer-item">
							<label htmlFor="filter-virtual">
								Live streams only
								<input
									type="checkbox"
									// switch TODO: What is the JSX equivalent of this?
									name="virtual"
									id="filter-virtual"
								/>
							</label>
						</div>

						<div className="page-title-drawer-item">
							<label htmlFor="filter-continent">
								Continent
								<select name="continent" id="filter-continent">
									<option value="all" selected>
										All
									</option>
									<hr />
									{/* {% for continent in site.continents %} */}
									{/* TODO: Use real data */}
									<option value="{{ continent | slugify }}">
										TODO continent
									</option>
									{/* {% endfor %} */}
								</select>
							</label>
						</div>

						<div className="page-title-drawer-item" id="filter-country-wrapper">
							<label htmlFor="filter-country">
								Country
								<select name="country" id="filter-country" />
							</label>
						</div>

						<div className="page-title-drawer-item">
							<label htmlFor="filter-host">
								Host
								<select name="host" id="filter-host">
									<option value="all" selected>
										All
									</option>
									<hr />
									{/* {% for host in site.event-hosts %} */}
									{/* TODO: Use real data */}
									<option value="{{ host.name | slugify }}">
										{/* {{ host.name }} */}
										TODO host.name
									</option>
									{/* {% endfor %} */}
								</select>
							</label>
						</div>
					</div>
				</div>
			)}
			{/* // {% endif %} */}
		</div>
	);
};
