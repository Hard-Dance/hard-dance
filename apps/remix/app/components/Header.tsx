import { useLocation } from "@remix-run/react";
import styles from "./Header.module.scss";
import cx from "classnames";

export const Header = ({ className }: { className?: string }) => {
	// Inside your component:
	const location = useLocation();
	const currentUrl = location.pathname;

	return (
		<>
			{/* {% include gdpr.html %} */}
			<header className={cx(styles.root, className)}>
				<div className="header-brand">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						aria-hidden={true}
					>
						<path
							id="logo-left"
							d="M8.2985,8.07286l-.00049.00085L1.40731,4.09538l-.21612.35327c-.263.46099-.263.47002.052,1.01799l5.94095,10.21585c.177.19403.414.28503.76299.28503h.35137v-7.89466Z"
						/>
						<path
							id="logo-top"
							d="M8.99936,6.85889l-.00043.00073h.00195l-.00043-.00073,6.85994-3.96057-.37658-.61559c-.276-.268.13794-.25-6.48379-.25s-6.20785-.01801-6.48385.25l-.37664.61565,6.85982,3.96051Z"
						/>
						<path
							id="logo-right"
							d="M16.59263,4.09532l-6.89083,3.9784-.00049-.00085v7.89466h.35156c.34899,0,.58599-.091.76299-.28503l5.94095-10.21585c.315-.54797.315-.557.052-1.01799l-.21618-.35333Z"
						/>
					</svg>
				</div>
				<ul className="header-menu-list" role="menu">
					<li role="presentation">
						<a
							className="header-button"
							role="menuitem"
							// {% if page.url == '/' or page.url contains '/events' %}
							//   aria-current="page"
							// {% endif %}
							// {% if page.url == '/' %}
							//   href="#top"
							// {% else %}
							//   href="/"
							// {% endif %}
							aria-current={
								currentUrl === "/" || currentUrl.includes("/events")
									? "page"
									: undefined
							}
							// href={currentUrl === "/" ? "#top" : "/"}
							href={currentUrl === "/" ? "#top" : "/"}
						>
							{/* TODO: Do we need <text> on icons with aria-hidden=true? */}
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#calendar" />
							</svg>
							Events
						</a>
					</li>
					<li role="presentation">
						<a
							className="header-button"
							role="menuitem"
							href="/community"
							//   {% if page.url == '/community.html' %}aria-current="page"{% endif %}
							aria-current={currentUrl === "/community" ? "page" : undefined}
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#chat" />
							</svg>
							Community
						</a>
					</li>
					<li role="presentation">
						<a
							className="header-button"
							role="menuitem"
							//   {% if page.url == '/about.html' %}
							//     aria-current="page"
							//     href="#top"
							//   {% else %}
							//     href="/about.html"
							//   {% endif %}
							aria-current={currentUrl === "/about" ? "page" : undefined}
							href={currentUrl === "/about" ? "#top" : "/about"}
						>
							<svg aria-hidden="true">
								<use xlinkHref="/assets/symbols.svg#info" />
							</svg>
							About
						</a>
					</li>
				</ul>

				{/* <!-- <a class="header-button" href="#" data-variant="live">Live stream</a> --> */}
			</header>
		</>
	);
};
