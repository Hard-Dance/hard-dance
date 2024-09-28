import { useLocation } from "@remix-run/react";
import styles from "./Header.module.scss";
import cx from "classnames";

export const Header = ({ className }: { className?: string }) => {
	// Inside your component:
	const location = useLocation();
	const currentUrl = location.pathname;

	return (
		<>
			<header className={cx(styles.root, className)}>
				<div className={cx(styles.brand, className)}>
					<svg
						className={cx(styles.icon, className)}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 18 18"
						aria-hidden={true}
					>
						<path
							className={cx(styles.iconPart, className)}
							id="logo-left"
							d="M8.2985,8.07286l-.00049.00085L1.40731,4.09538l-.21612.35327c-.263.46099-.263.47002.052,1.01799l5.94095,10.21585c.177.19403.414.28503.76299.28503h.35137v-7.89466Z"
						/>
						<path
							className={cx(styles.iconPart, className)}
							id="logo-top"
							d="M8.99936,6.85889l-.00043.00073h.00195l-.00043-.00073,6.85994-3.96057-.37658-.61559c-.276-.268.13794-.25-6.48379-.25s-6.20785-.01801-6.48385.25l-.37664.61565,6.85982,3.96051Z"
						/>
						<path
							className={cx(styles.iconPart, className)}
							id="logo-right"
							d="M16.59263,4.09532l-6.89083,3.9784-.00049-.00085v7.89466h.35156c.34899,0,.58599-.091.76299-.28503l5.94095-10.21585c.315-.54797.315-.557.052-1.01799l-.21618-.35333Z"
						/>
					</svg>
					<svg
						className={cx(styles.logo, className)}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 153 18"
						aria-hidden={true}
					>
						<path d="M27.925 0H23.73l-4.94 13.312-.008.017-1.712 4.618-.01.018 4.165.004.557-1.485.008-.005 7.248-2.247.004.013 1.388 3.724h4.165L27.925 0Zm-5.443 12.168 1.257-.911 2.084-5.622V5.63l.01.008 1.834 4.92-5.185 1.609ZM16.072.004V17.97h-3.898l.009-6.45H3.897v6.45H0V.004h3.897V7.63l8.294.013.014-7.638h3.866Zm52.763 13.987h3.98v3.983h-3.98V13.99Zm35.715-.88-1.366-3.677L99.689.026h-4.195l-4.948 13.33-1.721 4.635 4.164.005.548-1.468.013-.005 7.252-2.247L102.19 18h4.164l-1.804-4.89Zm-9.275-1.223-1.068.333 1.292-.938 2.084-5.622v-.009l.009.01 1.84 4.933-4.157 1.293Zm15.546-6.827-.425-.977.425.977ZM122.728.013v17.978H118.8v-.004h-2.396l-6.008-13.903.758 3.194v10.713l-3.928-.022V.013h1.414l-.004-.004h4.361l.005.004 5.798 13.43V.013h3.928Zm20.248 3.909v3.225h5.693v3.987h-5.693l-1.374-.004.021.004 1.353.526v2.44h9.52v3.887h-13.491v-.018h-.013V.031h13.505v3.89h-9.52ZM138.086 0v3.965h-5.462c-2.802 0-5.075 2.248-5.075 5.053a5.07 5.07 0 0 0 4.821 5.065c.084.004.171.004.254.004h5.461v3.904h-5.46c-4.975 0-9.008-4.022-9.008-9A8.98 8.98 0 0 1 132.598 0h5.487Zm3.537 11.134-.021-.004m-89.25-7.173v.004-.004ZM60.098 0l-7.737.009-.031 17.987h7.75c4.975 0 9.009-4.023 9.009-9S65.077 0 60.099 0Zm.504 14.06c-.088.01-.17.018-.258.018-.084.005-.167.01-.254.01h-5.461l1.598-.435V3.961h3.863c2.802 0 5.08 2.248 5.08 5.052a5.084 5.084 0 0 1-4.568 5.048ZM81.477.005l-7.738.01L73.71 18h7.75c4.975 0 9.008-4.022 9.008-9S86.456.004 81.477.004Zm.5 14.061c-.088.009-.172.013-.26.018-.082.004-.166.004-.253.004h-5.46l1.597-.43V3.962h3.863c2.802 0 5.075 2.248 5.075 5.052a5.064 5.064 0 0 1-4.563 5.052Zm-30.523 3.913H45.98l-6.463-6.463h-.123v6.463h-.004L35.51 18l.004-12.97h3.88v2.616h5.982a1.884 1.884 0 0 0 .232-3.75H34.157L32.72.016h12.923a5.737 5.737 0 0 1 4.165 2.077c.201.241.38.5.538.776a5.748 5.748 0 0 1-4.966 8.64H43.9l1.634.527 5.92 5.941Z"/>
					</svg>
				</div>

				<ul className={cx(styles.menu, className)} role="menu">
					<li role="presentation">
						<a
							className={cx(styles.button, className)}
							role="menuitem"
							aria-current={
								currentUrl === "/" || currentUrl.includes("/events")
									? "page"
									: undefined
							}
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
							className={cx(styles.button, className)}
							role="menuitem"
							href="/community"
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
							className={cx(styles.button, className)}
							role="menuitem"
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
			</header>
		</>
	);
};
