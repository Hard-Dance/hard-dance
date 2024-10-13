export const getUserLocation = async () => {
	navigator.geolocation.getCurrentPosition((position) => {
		return position;
	});
};
