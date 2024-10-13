export const countriesDb = {
	US: "United States",
	NL: "Netherlands",
	BE: "Belgium",
	DE: "Germany",
	CH: "Switzerland",
	FR: "France",
	AU: "Australia",
	MX: "Mexico",
	CZ: "Czech Republic",
	CA: "Canada",
	NO: "Norway",
	CL: "Chile",
	JP: "Japan",
	PL: "Poland",
	ES: "Spain",
	KR: "South Korea",
	MY: "Malaysia",
	IT: "Italy",
	PT: "Portugal",
	AT: "Austria",
	RO: "Romania",
	HU: "Hungary",
	HR: "Croatia",
	SE: "Sweden",
	FI: "Finland",
	GB: "United Kingdom",
	TH: "Thailand",
} as const;

export type CountryCodes = keyof typeof countriesDb;
export type CountryNames = (typeof countriesDb)[keyof typeof countriesDb];

export const continentsDb = {
	AF: {
		name: "Africa",
		countries: [],
	},
	AS: {
		name: "Asia",
		countries: ["JP", "KR", "MY", "TH"],
	},
	EU: {
		name: "Europe",
		countries: [
			"NL",
			"BE",
			"DE",
			"CH",
			"FR",
			"CZ",
			"NO",
			"PL",
			"ES",
			"IT",
			"PT",
			"AT",
			"RO",
			"HU",
			"HR",
			"SE",
			"FI",
			"GB",
		],
	},
	NA: {
		name: "North America",
		countries: ["US", "MX", "CA"],
	},
	OC: {
		name: "Oceania",
		countries: ["AU"],
	},
	SA: {
		name: "South America",
		countries: ["CL"],
	},
} as const satisfies Record<
	string,
	{
		name: string;
		countries: CountryCodes[];
	}
>;

export type ContinentCodes = keyof typeof continentsDb;
export type CountinentValues = (typeof continentsDb)[keyof typeof continentsDb];
