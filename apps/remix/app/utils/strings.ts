import slugify from "slugify";

export const getSlugifiedString = (str: string) => {
	return slugify(str).toLowerCase();
};

export const getDisplayVersionOfUrl = (url: string | undefined) =>
	url?.replaceAll(/https:\/\//g, "").replaceAll(/www./g, "");
