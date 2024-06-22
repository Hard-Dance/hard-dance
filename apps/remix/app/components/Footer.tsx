export const Footer = () => {
	return (
		<footer>
			<ul className="footer-list">
				<li title="Last updated on {{ 'now' | date: '%b %d, %Y @ %H:%M %Z' }}">
					{/* &copy; {{ "now" | date: "%Y" }} {{ site.title }} */}
					{/* TODO: Use real data */}
					TODO
				</li>
				<li>
					<a href="mailto:{{ site.email }}" className="footer-anchor">
						Contact us
					</a>
				</li>
				<li>
					<a
						href="{{ site.privacy-policy }}"
						className="footer-anchor"
						rel="noopener noreferrer"
					>
						Privacy policy
					</a>
				</li>
				<li>
					<a
						href="{{ site.cookie-policy }}"
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
