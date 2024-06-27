import { getDisplayVersionOfUrl, getSlugifiedString } from "../utils/strings";
import { Header } from "../components/Header";
import {
	aboutBannerContent,
	hardDanceEmail,
	hardDanceRepoLink,
	ourFriends,
	theCrew,
	theHostsWeCheck,
} from "../data/about-data";
import { Footer } from "../components/Footer";

export default function Index() {
	return (
		<>
			<Header />

			<main>
				<AboutBanner />

				<TheCrewDetails />

				<TheHostsWeCheck />

				<OurFriends />

				<HowToHelpUs />

				<HowToGetTheApp />
			</main>

			<Footer />
		</>
	);
}

// -----------------

const AboutBanner = () => {
	return (
		<section className="about-banner" id="top">
			<h1 className="handwritten">Welcome to our digital tribe!</h1>
			<blockquote>{aboutBannerContent}</blockquote>
			<figcaption>
				Your <span>Hard.Dance</span> crew
			</figcaption>

			<video
				autoPlay
				muted
				loop
				playsInline
				poster="/assets/video/about-banner.jpg"
				className="about-banner-video"
			>
				<source src="/assets/video/about-banner.mp4" type="video/mp4" />
				<source src="/assets/video/about-banner.ogv" type="video/ogv" />
				<source src="/assets/video/about-banner.webm" type="video/webm" />
			</video>
		</section>
	);
};

const TheCrewDetails = () => {
	return (
		<details className="about-details">
			<summary>
				<span className="details-summary-expander">
					<svg className="details-summary-expander-icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</span>
				The crew
				<span className="details-summary-badge">{theCrew.length}</span>
			</summary>
			<div className="details-body">
				<ul className="grid">
					{theCrew.map((crewMember) => {
						const slugifiedName = getSlugifiedString(crewMember.name);

						return (
							<li key={crewMember.name} className="grid-item">
								<img
									className="grid-item-image"
									srcSet={`https://hard.dance/.netlify/images/?url=/assets/img/admins/${slugifiedName}.jpg&fit=cover&h=600 2x, https://hard.dance/.netlify/images/?url=/assets/img/admins/${slugifiedName}.jpg&fit=cover&h=900 3x`}
									src={`https://hard.dance/.netlify/images/?url=/assets/img/admins/${slugifiedName}.jpg&fit=cover&h=300`}
									alt={crewMember.name}
									draggable="false"
								/>

								<div className="grid-item-metadata">
									<h3 className="grid-item-metadata-title">
										{crewMember.name}
										{crewMember.alias && ` / ${crewMember.alias}`}
									</h3>
									<div className="grid-item-metadata-subtitle">
										{crewMember.position}
									</div>
									<div
										className="grid-item-metadata-symbol"
										style={{ color: "unset" }}
									>
										{crewMember.location}
									</div>
									<ul
										className="button-group grid-item-metadata-body about-the-crew-button-group"
										data-wrap
									>
										{crewMember.socials?.map((social) => {
											const slugifiedSocialService = getSlugifiedString(
												social.service,
											);

											return (
												<li key={social.service}>
													<a
														href={
															social.service === "email"
																? `mailto:${crewMember.email}`
																: social.url
														}
														aria-label={
															social.service === "website"
																? `Visit {admin.name}'s website`
																: social.service === "email"
																	? `Email ${crewMember.name}`
																	: `Follow ${crewMember.name} on ${social.service}`
														}
														className="button"
														{...(social.service !== "email"
															? {
																	target: "_blank",
																	rel: "noopener noreferrer",
																}
															: {})}
													>
														<svg aria-hidden="true">
															<use
																xlinkHref={`/assets/symbols.svg#${slugifiedSocialService}`}
															/>
														</svg>
													</a>
												</li>
											);
										})}
									</ul>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</details>
	);
};

const TheHostsWeCheck = () => {
	return (
		<details className="about-details">
			<summary className="about-details-summary">
				<span className="details-summary-expander">
					<svg className="details-summary-expander-icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</span>
				The hosts we check
				<span className="details-summary-badge">{theHostsWeCheck.length}</span>
			</summary>
			<div className="details-body" data-padding="false">
				<table>
					<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Website</th>
							<th scope="col">Facebook</th>
							<th scope="col">Icon</th>
						</tr>
					</thead>

					<tbody>
						{theHostsWeCheck.map((host) => (
							<tr key={host.name}>
								<th scope="row">{host.name}</th>
								<td>
									<a href={host.url} target="_blank" rel="noopener noreferrer">
										{getDisplayVersionOfUrl(host.url)}
									</a>
								</td>
								<td>
									<a
										href={host.facebook}
										target="_blank"
										rel="noopener noreferrer"
									>
										{getDisplayVersionOfUrl(host.facebook)}
									</a>
								</td>
								<td>
									<div className="icon">
										<svg aria-hidden="true">
											<use
												xlinkHref={`/assets/hosts.svg#${getSlugifiedString(host.name)}`}
											/>
										</svg>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</details>
	);
};

const OurFriends = () => {
	return (
		<details className="about-details">
			<summary className="about-details-summary">
				<span className="details-summary-expander">
					<svg className="details-summary-expander-icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</span>
				Our friends
				<span className="details-summary-badge">{ourFriends.length}</span>
			</summary>
			<div className="details-body">
				<ul className="grid">
					{ourFriends.map((friend) => (
						<li key={friend.title} className="grid-item">
							<img
								className="grid-item-image"
								srcSet="https://hard.dance/.netlify/images/?url=/assets/img/friends/{{ friend.title | slugify }}.png&fit=cover&h=600 2x, https://hard.dance/.netlify/images/?url=/assets/img/friends/{{ friend.title | slugify }}.png&fit=cover&h=900 3x"
								src="https://hard.dance/.netlify/images/?url=/assets/img/friends/{{ friend.title | slugify }}.png&fit=cover&h=300"
								alt="A graphic of {{ friend.title }}"
								draggable="false"
							/>

							<div className="grid-item-metadata">
								<a
									className="grid-item-metadata-title grid-item-anchor"
									href="{{ friend.url }}"
									aria-label="Visit {{ friend.title }}'s website"
									target="_blank"
									rel="noopener noreferrer"
								>
									{friend.title}
								</a>
								<div className="grid-item-metadata-subtitle">
									{friend.subtitle}
								</div>
								<div className="grid-item-metadata-symbol">
									<div className="icon">
										<svg aria-hidden="true">
											<use xlinkHref="/assets/symbols.svg#{{ friend.subtitle | slugify }}" />
										</svg>
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</details>
	);
};

const HowToHelpUs = () => {
	return (
		<details className="about-details">
			<summary className="about-details-summary">
				<span className="details-summary-expander">
					<svg className="details-summary-expander-icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</span>
				How to help us
			</summary>
			<div className="details-body">
				<p>
					{`We are an open source platform, meaning anyone can contribute to the
					Hard.Dance project. There's a couple of ways that you can contribute:`}
				</p>

				<dl className="x">
					<dt>Add a missing event</dt>
					<dd>
						{`If there is a hard dance event that we're not showing, you have two
						options:`}
						<ul>
							<li>
								{"Go to the "}
								<a href="/">
									<CustomIcon iconId="calendar" />
									{"Events"}
								</a>
								{" page and click on the "}
								<CustomIcon iconId="add" /> <strong>Add</strong>
								{" button to fill out a form to submit an event."}
							</li>
							<li>
								{"Go to "}
								<a
									href={hardDanceRepoLink}
									target="_blank"
									rel="noopener noreferrer"
								>
									the open source GitHub repository
								</a>
								{` and submit a pull request. This is the preferred method as it is
								fewer steps for us, however this is developer centric and not
								easy for everyone.`}
							</li>
						</ul>
					</dd>

					<dt>Add a missing host</dt>
					<dd>Coming soon!</dd>

					<dt>Help in other ways</dt>
					<dd>
						{`Your unique insights and innovative ideas are invaluable to us. If
						you see opportunities for improvement or have suggestions that could
						enhance our website, we're all ears. While we can't promise to
						implement every idea, we genuinely appreciate and consider all
						contributions. `}
						<a href={`mailto:${hardDanceEmail}`}>{`Let's collaborate`}</a>
						{" to make our site even better for everyone."}
					</dd>

					<dt>Donations</dt>
					<dd>
						{`As we continue to enhance our website, your support can make a
						significant difference. Every donation we receive goes directly into
						developing new features, improving user experience, and covering
						hosting and maintenance costs. By contributing, you're not just
						donating; you're investing in a platform that grows with and for its
						community. Currently we accept `}
						<a
							href="https://www.paypal.com/paypalme/jongraft"
							target="_blank"
							rel="noopener noreferrer"
						>
							{" donations via PayPal "}
						</a>
						.
					</dd>
				</dl>
			</div>
		</details>
	);
};

// TODO: Confirm that the icons are not sticking to the adjacent words. If sticking, add approprite spaces
const HowToGetTheApp = () => {
	return (
		<details className="about-details" id="app">
			<summary className="about-details-summary">
				<span className="details-summary-expander">
					<svg className="details-summary-expander-icon" aria-hidden="true">
						<use xlinkHref="/assets/symbols.svg#chevron-down" />
					</svg>
				</span>
				How to get the Hard.Dance app
			</summary>
			<div className="details-body">
				<p>
					While Hard.Dance is not available in app stores, you can easily
					install it as a Progressive Web App (PWA) for a seamless app-like
					experience. Follow these platform-specific instructions:
				</p>

				<dl className="x">
					<dt>iOS</dt>
					<dd>
						<ol>
							<li>Open Safari and navigate to Hard.Dance.</li>
							<li>
								Tap the <CustomIcon iconId="share" />
								<strong>Share</strong> icon at the bottom of the screen.
							</li>
							<li>
								{/* TODO: These icons that are part of sentences need to likely have <text> and no aria-hidden for screen readers? */}
								Scroll down and select <CustomIcon iconId="add-square" />
								<strong>Add to Home Screen</strong>.
							</li>
							<li>
								Tap <strong>Add</strong> to install.
							</li>
						</ol>
					</dd>

					<dt>Android</dt>
					<dd>
						<ol>
							<li>Open Chrome and visit Hard.Dance.</li>
							<li>
								Tap the <CustomIcon iconId="ellipsis-vertical" />{" "}
								<strong>Menu</strong> icon in the top right corner.
							</li>
							<li>
								Tap <strong>Add to Home screen</strong>.
							</li>
							<li>
								Name the app if desired, then tap <strong>Add</strong>.
							</li>
						</ol>
					</dd>

					<dt>macOS</dt>
					<dd>
						<ol>
							<li>Open Safari and go to Hard.Dance.</li>
							<li>
								Click the <CustomIcon iconId="share" />
								<strong>Share</strong> icon in the toolbar.
							</li>
							<li>
								Choose <CustomIcon iconId="add-square" />{" "}
								<strong>Add to Home Screen</strong> from the share options.
							</li>
							<li>
								Name your app and then click <strong>Add</strong>.
							</li>
						</ol>
					</dd>

					<dt>Windows</dt>
					<dd>
						<ol>
							<li>Open Chrome and navigate to Hard.Dance.</li>
							<li>
								Click the <CustomIcon iconId="ellipsis-vertical" />
								<strong>Menu</strong> in the top right corner for the menu.
							</li>
							<li>
								Select <strong>More tools</strong>, then
								<strong>Create shortcut</strong>.
							</li>
							<li>
								Name the app and check <strong>Open as window</strong>, then
								click <strong>Create</strong>.
							</li>
						</ol>
					</dd>
				</dl>

				<p>
					Now, Hard.Dance will run just like an app from your device, providing
					a full-screen, immersive experience without the need for a traditional
					app store download.
				</p>
			</div>
		</details>
	);
};

const CustomIcon = ({ iconId }: { iconId: string }) => {
	return (
		<div className="icon">
			<svg aria-hidden="true">
				<use xlinkHref={`/assets/symbols.svg#${iconId}`} />
			</svg>
		</div>
	);
};
