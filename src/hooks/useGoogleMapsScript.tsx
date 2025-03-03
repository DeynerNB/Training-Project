import { useEffect, useState } from "react";

// Set the google variable into the Window browser object
declare global {
	interface Window {
		initMap: () => void;
		google: typeof google;
	}
}

// Hook that manage all google scripts loading
const useGoogleMapsScript = () => {
	// Flag to indicate when the scripts are loaded
	const [googleMapsScriptLoaded, setScriptLoaded] = useState(false);

	// Flag to indicate when to start checking for script loading
	const [checkScript, setCheckScript] = useState(false);

	useEffect(() => {
		if (checkScript) {
			// Check every 0.1s if the importLibrary is available
			const checkGoogleMaps = setInterval(() => {
				// If the maps class is available -> everything is ready to use
				if (window.google?.maps) {
					clearInterval(checkGoogleMaps);
					setScriptLoaded(true);
					console.log("Google maps library loaded");
				}
			}, 100);

			return () => clearInterval(checkGoogleMaps);
		}
	}, [checkScript]);

	// Load the initial google maps script
	const loadGoogleSripts = (apiKey: string) => {
		// If the google class is loaded -> avoid loading it again
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
