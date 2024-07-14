import type { Event } from "../data/data";
import { format, addDays } from "date-fns";

const getFormattedDateForGoogleCalendar = (date: Date) => {
	return format(date, "yyyyLLdd");
};

// TODO: Confirm compatibility with timezones
export const createGoogleCalendarLink = (event: Event) => {
	const startDate = new Date(event.datestart);
	const endDate = addDays(
		event.dateend != null ? new Date(event.dateend) : startDate,
		1,
	);

	const resultUrl = new URL(
		"https://calendar.google.com/calendar/render?action=TEMPLATE",
	);

	resultUrl.searchParams.append("text", event.title);
	resultUrl.searchParams.append("location", event.location);

	if (event.facebook) {
		resultUrl.searchParams.append("sprop", `website:${event.facebook}`);
		resultUrl.searchParams.append("sprop", `name:${event.title}`);
	}

	let details: string | undefined;
	if (event.facebook) {
		details = `Full event details: <a href="${event.facebook}">${event.facebook}</a>`;
	}

	if (details) {
		resultUrl.searchParams.append("details", details);
	}

	let dates = getFormattedDateForGoogleCalendar(startDate);
	if (endDate != null) {
		dates += `/${getFormattedDateForGoogleCalendar(endDate)}`;
	}

	resultUrl.searchParams.append("dates", dates);

	return resultUrl.toString();
};
