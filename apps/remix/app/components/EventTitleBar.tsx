import type { Event } from "../data/data";
import { GeneralTitleBar } from "./GeneralTitleBar";
import { getFormattedDateRange } from "../utils/date";
import * as React from "react";

export const EventTitleBar = ({event}: {event: Event}) => {
  const dateFormat = "MMM dd, yyyy";
	
  const formattedDateRange = getFormattedDateRange(
		dateFormat,
		event.datestartDate,
		event.dateendDate,
	);

	const onShareClick = React.useCallback(() => {
		// Web Share API is supported
		if (!!navigator && navigator.share) {
			navigator
				.share({
					title: document.title,
					url: window.location.href,
				})
				.then(() => {
					console.log("Thanks for sharing!");
				})
				.catch(console.error);
		}
		// Fallback for browsers that do not support the Web Share API
		// Attempt to copy the current URL to the clipboard as a fallback
		else {
			navigator.clipboard.writeText(window.location.href).then(() => {
				alert("URL copied to clipboard");
			});
		}
	}, []);

  return <GeneralTitleBar>
        <GeneralTitleBar.PageTitleStart>
          
        </GeneralTitleBar.PageTitleStart>
        <GeneralTitleBar.PageTitleStart>
          
        </GeneralTitleBar.PageTitleStart>
        <GeneralTitleBar.PageTitleStart>
          
        </GeneralTitleBar.PageTitleStart>
    </GeneralTitleBar>;
}