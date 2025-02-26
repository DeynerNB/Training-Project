import { Box, Button, Container } from "@radix-ui/themes";
import { useContext, useEffect, useRef } from "react";
import style from "./GoogleMap.module.scss";

import { Crosshair2Icon } from "@radix-ui/react-icons";
import { GMapContext } from "../../context/GMapContext/GMapContext";
import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import useGoogleMarker from "../../hooks/useGoogleMarker";
import useLocalStorage from "../../hooks/useLocalStorage";
import type {
	ICoordinates,
	IGeolocationCoordinates,
} from "../../interfaces/Coordinates.interface";
import geoService from "../../services/Geoservice.service";
import type { T_GoogleMap } from "../../types/Google.types";

function GoogleMap() {
	const storageKey = "user-coordinates";

	// -- Custom hooks variables
	const { getStorageValue, writeStorageValue } = useLocalStorage(storageKey);

	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	const { addMarker, removeMarker } = useGoogleMarker();

	// -- Ref hooks variables
	const mapDivRef = useRef<HTMLDivElement>(null);

	const googleMapRef = useRef<T_GoogleMap>(null);

	// --- Context variables

	const { gMap, setGMap } = useContext(GMapContext);

	useEffect(() => {
		if (googleMapsScriptLoaded) {
			initializeMap();
		}
	}, [googleMapsScriptLoaded]);

	const loadGMaps = () => {
		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
		loadGoogleSripts(apiKey);
	};

	const initializeMap = async () => {
		await geoService.loadGoogleMapsLibrary();

		const MapObject = geoService.getMapObject();

		if (!MapObject || !mapDivRef.current) {
			console.error("Null reference: MapObject or mapDivRef");
			return;
		}

		const googleMapObj = new MapObject(mapDivRef.current, {
			center: { lat: 9.9947165, lng: -84.1407853 },
			zoom: 12,
			mapId: "Mapa Proyecto",
		});

		setGMap(googleMapObj);
	};

	const handleMyLocation = async () => {
		const coordsRaw = getStorageValue();
		let coords: ICoordinates | null = null;

		console.log(gMap);

		if (!coordsRaw) {
			const { latitude, longitude }: IGeolocationCoordinates =
				await geoService.getUserCoordinates();

			coords = {
				lat: latitude,
				lng: longitude,
			};
		} else {
			coords = JSON.parse(coordsRaw);
		}

		console.log("Antes de 92");
		if (!gMap || !coords) {
			console.error("Null reference: gMap or coords");
			return;
		}
		console.log("Desp de 92");

		addMarker(
			{
				map: gMap,
				position: coords,
				id: "Your position",
			},
			geoService,
		);
	};

	return (
		<Box position={"relative"}>
			<Box
				as={"div"}
				height={"100%"}
				ref={mapDivRef}
				className={style["map-container"]}
			>
				<Button onClick={loadGMaps}>Load Google Maps</Button>
			</Box>
			<Box position={"absolute"} bottom={"5"} right={"9"}>
				<Button onClick={handleMyLocation}>
					<Crosshair2Icon />{" "}
				</Button>
			</Box>
		</Box>
	);
}

export default GoogleMap;
