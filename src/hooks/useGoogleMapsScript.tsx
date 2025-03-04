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
	const loadGoogleSripts = () => {
		setCheckScript(true);
	};

	return { googleMapsScriptLoaded, loadGoogleSripts };
};

export default useGoogleMapsScript;
