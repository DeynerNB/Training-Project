import { useEffect, useState } from "react";

declare global {
	interface Window {
		initMap: () => void;
		google: typeof google;
	}
}

const useGoogleMapsScript = () => {
	const [googleMapsScriptLoaded, setScriptLoaded] = useState(false);

	const [checkScript, setCheckScript] = useState(false);

	useEffect(() => {
		if (checkScript) {
			// Check every 0.1s if the importLibrary is available
			const checkGoogleMaps = setInterval(() => {
				// if (window.google?.maps?.importLibrary) {
				if (window.google?.maps) {
					clearInterval(checkGoogleMaps);
					setScriptLoaded(true);
					console.log("Google maps library loaded");
				}
			}, 100);

			return () => clearInterval(checkGoogleMaps);
		}
	}, [checkScript]);

	const loadGoogleSripts = (apiKey: string) => {
		if (window.google) {
			setScriptLoaded(true);
			return;
		}

		const API_URL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&callback=initMap&libraries=marker,places&v=beta`;
		window.initMap = () => {};

		const scriptNode = document.createElement("script");
		scriptNode.type = "text/javascript";
		scriptNode.src = API_URL;
		scriptNode.defer = true;

		document.head.appendChild(scriptNode);
		setCheckScript(true);
	};

	return { googleMapsScriptLoaded, loadGoogleSripts };
};

export default useGoogleMapsScript;
