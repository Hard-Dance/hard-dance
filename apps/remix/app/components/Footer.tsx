import {
	hardDanceCookiePolicyLink,
	hardDanceEmail,
	hardDancePrivacyPolicyLink,
	hardDanceSiteTitle,
} from "../data/about-data";

export const Footer = () => {
	const today = new Date();

	return (
		<footer>
			<ul className="footer-list">
				<li
				// TODO: Find better way to display last updated date
				// title="Last updated on {{ 'now' | date: '%b %d, %Y @ %H:%M %Z' }}"
				>
					{`© ${today.getFullYear()} ${hardDanceSiteTitle}`}
				</li>
				<li>
					<a href={`mailto:${hardDanceEmail}`} className="footer-anchor">
						Contact us
					</a>
				</li>
				<li>
					<a
						href={hardDancePrivacyPolicyLink}
						className="footer-anchor"
						rel="noopener noreferrer"
					>
						Privacy policy
					</a>
				</li>
				<li>
					<a
						href={hardDanceCookiePolicyLink}
						className="footer-anchor"
						rel="noopener noreferrer"
					>
						Cookie policy
					</a>
				</li>
			</ul>
		</footer>
	);
};
