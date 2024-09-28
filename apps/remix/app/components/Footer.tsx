import styles from "./Footer.module.scss";
import cx from "classnames";
import {
	hardDanceCookiePolicyLink,
	hardDanceEmail,
	hardDancePrivacyPolicyLink,
	hardDanceSiteTitle,
} from "../data/about-data";

export const Footer = ({ className }: { className?: string }) => {
	const today = new Date();

	return (
		<footer className={cx(styles.root, className)}>
			<ul className={cx(styles.list, className)}>
				<li
				// TODO: Find better way to display last updated date
				// title="Last updated on {{ 'now' | date: '%b %d, %Y @ %H:%M %Z' }}"
				>
					{`© ${today.getFullYear()} ${hardDanceSiteTitle}`}
				</li>
				<li>
					<a href={`mailto:${hardDanceEmail}`} className={cx(styles.anchor, className)}>
						Contact us
					</a>
				</li>
				<li>
					<a
						href={hardDancePrivacyPolicyLink}
						className={cx(styles.anchor, className)}
						rel="noopener noreferrer"
					>
						Privacy policy
					</a>
				</li>
				<li>
					<a
						href={hardDanceCookiePolicyLink}
						className={cx(styles.anchor, className)}
						rel="noopener noreferrer"
					>
						Cookie policy
					</a>
				</li>
			</ul>
		</footer>
	);
};
