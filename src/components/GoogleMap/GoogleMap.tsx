import { Box, Button, Container } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import style from "./GoogleMap.module.scss";

import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import GeoLocationService from "../../services/Geoservice.service";

function GoogleMap() {
	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	useEffect(() => {
		if (googleMapsScriptLoaded) {
			console.log(window.google);
			initializeMap();
		}
	}, [googleMapsScriptLoaded]);

	const geoService = new GeoLocationService();

	const mapDivRef = useRef<HTMLDivElement>(null);

	const loadGMaps = () => {
		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
		loadGoogleSripts(apiKey);
	};

	const initializeMap = async () => {
		await geoService.loadGoogleMapsLibrary();

		const MapObject = geoService.getMapObject();

		if (!MapObject || !mapDivRef.current) {
			return;
		}

		new MapObject(mapDivRef.current, {
			center: { lat: 9.9947165, lng: -84.1407853 },
			zoom: 12,
			mapId: "MapaMieo",
		});
	};

	return (
		<Box
			as={"div"}
			height={"100%"}
			ref={mapDivRef}
			className={style["map-container"]}
		>
			<Button onClick={loadGMaps}>Load Google Maps</Button>
		</Box>
	);
}

export default GoogleMap;
