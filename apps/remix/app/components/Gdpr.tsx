import styles from "./Gdpr.module.scss";
import cx from "classnames";
import {
	hardDancePrivacyPolicyLink,
} from "../data/about-data";

export const Gdpr = ({ className }: { className?: string }) => {
	return (
        <div className={cx(styles.gdpr, className)} id="gdpr-banner">
            <p>
                This website uses cookies to ensure you get the best experience on our
                website.&nbsp;
                <a href={hardDancePrivacyPolicyLink} rel="noopener noreferrer">Read our privacy policy</a>.
            </p>
            <button
                className="button"
                data-variant="call-to-action"
                onclick="acceptCookies()"
            >
                Accept
            </button>
        </div>
	);
};