import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import { getFlag } from "../utils/flag";

type EventMarkdown = {
	layout: string;
	category: string;
	title: string;
	date: string;
	datestart: string;
	dateend?: string;
	location: string;
	coordinates?: string;
	hosts?: string[];
	is_online?: boolean;
	featured?: boolean;
	image: string;
	isForegroundBlack?: boolean;
	video?: boolean;
	country?: string;
	facebook?: string;
};

// TODO: If this type becomes big, have smaller subsets to prevent sending large amounts of data to the client.
export type Event = {
	id: string;
	title: string;
	datestart: string; // TODO: Should this be date or string?
	datestartDate: Date;
	dateend?: string;
	dateendDate?: Date;
	location: string;
	coordinates?: { lat: number; lng: number };
	hosts: string[];
	is_online?: boolean;
	featured?: boolean;
	image: string;
	isForegroundBlack?: boolean;
	video?: boolean;
	country?: string;
	flag?: string;
	facebook?: string;
	description?: string;
};

export const markdownToEvent = (markdownFilePath: string): Event => {
	const markdownFileContent = fs.readFileSync(markdownFilePath, "utf8");
	const parsedMarkdown = matter(markdownFileContent);
	const fileName = path.basename(markdownFilePath);

	const {
		title,
		datestart,
		dateend,
		location,
		coordinates: coordinatesString,
		hosts,
		featured,
		is_online,
		video,
		country,
		image,
		facebook,
	} = parsedMarkdown.data as EventMarkdown;

	const coordinatesStringSplit = coordinatesString?.split(",");
	const coordinates =
		coordinatesStringSplit != null
			? {
					lat: Number(coordinatesStringSplit[0]),
					lng: Number(coordinatesStringSplit[1]),
				}
			: undefined;

	return {
		id: fileName.replace(".md", ""),
		title,
		datestart,
		datestartDate: new Date(datestart),
		dateend,
		dateendDate: dateend ? new Date(dateend) : undefined,
		country,
		location,
		coordinates,
		hosts: hosts ?? [],
		featured,
		is_online,
		video,
		flag: getFlag(location ?? ""),
		image,
		facebook,
		description: parsedMarkdown.content,
	};
};
