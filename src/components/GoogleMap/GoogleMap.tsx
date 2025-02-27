import { Crosshair2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Grid } from "@radix-ui/themes";
import { useContext, useEffect, useRef, useState } from "react";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import useLocalStorage from "../../hooks/useLocalStorage";

import type {
	ICoordinates,
	IGeolocationCoordinates,
} from "../../interfaces/Coordinates.interface";

import geoService from "../../services/Geoservice.service";
import DialogForm from "../Shared/DialogForm/DialogForm";
import style from "./GoogleMap.module.scss";

function GoogleMap() {
	const storageKey = "user-coordinates";

	// -- Hooks variables
	const [openPlaceForm, setOpenPlaceForm] = useState(false);

	const [selectionCoord, setSelectionCoord] = useState<ICoordinates>({
		lat: 0,
		lng: 0,
	});

	// -- Custom hooks variables
	const { getStorageValue } = useLocalStorage(storageKey);

	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	// -- Ref hooks variables
	const mapDivRef = useRef<HTMLDivElement>(null);

	// --- Context variables
	const { gMap, setGMap, addPlaceToMap } = useContext(GMapContext);

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

		googleMapObj.addListener(
			"click",
			(mapsMouseEvent: google.maps.MapMouseEvent) => {
				const lat = mapsMouseEvent.latLng?.lat();
				const lng = mapsMouseEvent.latLng?.lng();

				if (!lat || !lng) {
					console.error("Null reference: lat or lng");
					return;
				}

				setSelectionCoord({ lat, lng });
				setOpenPlaceForm(true);
			},
		);

		setGMap(googleMapObj);
	};

	const handleMyLocation = async () => {
		const coordsRaw = getStorageValue();
		let coords: ICoordinates | null = null;

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

		if (!gMap || !coords) {
			console.error("Null reference: gMap or coords");
			return;
		}

		addPlaceToMap({
			lat: coords.lat,
			lng: coords.lng,
			name: "Your position",
		});
	};

	return (
		<>
			<Box position={"relative"} p={"3"}>
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

			<DialogForm
				openPlaceForm={openPlaceForm}
				setOpenPlaceForm={setOpenPlaceForm}
				coords={selectionCoord}
			/>
		</>
	);
}

export default GoogleMap;
