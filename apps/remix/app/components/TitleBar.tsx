import { useLocation } from "@remix-run/react";

export const TitleBar = () => {
	const location = useLocation();

	// Upcoming events if and only if URL = /
	// const isShowingUpcomingEvents = window.location.pathname === "/";

	const pageLayout = location.pathname;

	//   return <div>Hello</div>;

	return (
		<div className="page-title {% if page.layout == 'event' %}event-page-title{% endif %}">
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
					page.title
				</h1>
			)}
			{/* {% endif %} */}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/events" ? (
				<>
					<div className="page-title-start">
						<a aria-label="View past events" className="button" href="/events/">
							<svg alt="Past icon" aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#past"></use>
							</svg>
							<span className="hide-on-mobile">Past</span>
						</a>
						<button
							aria-label="Add event"
							className="button"
							// onclick="document.getElementById('add-event').show()"
							// TODO: Real onclick
						>
							<svg alt="Add icon" aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#add"></use>
							</svg>
							<span className="hide-on-mobile">Add</span>
						</button>
					</div>

					<div className="page-title-end">
						<a
							aria-label="Subscribe to RSS feed"
							className="button"
							href="feed:{{ '/feed.xml' | absolute_url }}"
						>
							<svg alt="RSS icon" aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#rss"></use>
							</svg>
							<span className="hide-on-mobile">Subscribe</span>
						</a>
						<button
							className="button"
							id="events-filter-drawer-button"
							aria-label="Show filter options"
							aria-controls="filters-drawer"
							aria-expanded="false"
						>
							<svg alt="Filter icon" aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#options"></use>
							</svg>
							<span className="hide-on-mobile">Filters</span>
							<svg alt="Chevron icon" aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#chevron-down"></use>
							</svg>
						</button>
					</div>
				</>
			) : pageLayout === "/archives" ? (
				// {% elsif page.layout == 'archives' %}

				<div className="page-title-start">
					<a aria-label="View upcoming events" className="button" href="/">
						<svg
							alt="Upcoming icon"
							aria-hidden="true"
							style={{ transform: "scaleX(-1)" }}
						>
							<use xlinkHref="/assets/symbols.svg#past"></use>
						</svg>
						<span className="hide-on-mobile">Upcoming</span>
					</a>
				</div>
			) : // {% elsif page.layout == 'event' %}
			pageLayout === "/event" ? (
				<button className="button page-title-end" id="shareButton">
					<svg alt="{{ link.title }} icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#share"></use>
					</svg>
					<span className="hide-on-mobile">Share</span>
				</button>
			) : // {% endif %}
			undefined}

			{/* {% if page.layout == 'events' %} */}
			{pageLayout === "/events" && (
				<div className="page-title-drawer" id="filters-drawer">
					<div
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
								></input>
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
								<select name="country" id="filter-country"></select>
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
