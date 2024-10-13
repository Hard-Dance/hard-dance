import type { CountryCodes, ContinentCodes } from "./countries";

export type FileFilterIndex = {
	location: string | undefined;
	countryCode?: CountryCodes;
	continentCode?: ContinentCodes;
	hosts?: string[];
	live?: boolean;
	date: string;
	dateStart: string;
	dateEnd?: string;
};

// TODO: Maybe have stricter types for id with const
export type FileFilterIndexFile = Record<string, FileFilterIndex>;
