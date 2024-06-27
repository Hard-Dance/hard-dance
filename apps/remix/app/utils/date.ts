import { format } from "date-fns";

export function getFormattedDate(dateFormat: string, date: Date): string;
export function getFormattedDate(
	dateFormat: string,
	date: undefined,
): undefined;
export function getFormattedDate(
	dateFormat: string,
	date: Date | undefined,
): string | undefined;
export function getFormattedDate(
	dateFormat: string,
	date: Date | undefined,
): string | undefined {
	return date ? format(date, dateFormat) : undefined;
}

export function getFormattedDateRange(
	dateFormat: string,
	dateStart: Date,
	dateEnd: Date | undefined,
) {
	const formattedDateStart = getFormattedDate(dateFormat, dateStart);
	const formattedDateEnd = getFormattedDate(dateFormat, dateEnd);

	let formattedDateString = formattedDateStart;
	if (formattedDateEnd) {
		formattedDateString += `- ${formattedDateEnd}`;
	}

	return formattedDateString;
}
