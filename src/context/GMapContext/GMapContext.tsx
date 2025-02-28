import { createContext, useRef, useState } from "react";

import type { IPlace, IPlaceData } from "../../interfaces/Places.interface";
import type {
	T_GoogleAdvMarker,
	T_GoogleInfoWindow,
	T_GoogleMap,
} from "../../types/Google.types";
import type { IGMapContext, IGMapProvider } from "./GMapContext.interface";

import geoService from "../../services/Geoservice.service";

const defaultValue: IGMapContext = {
	gMap: null,
	placesList: [],
	selectedMarkers: null,
	setGMap: () => {},
	addPlaceToMap: () => {},
	removePlaceFromMap: () => {},
	createInfoWindow: () => null,
};

// Create the context
export const GMapContext = createContext(defaultValue);

// Create provider
export const GMapProvider = ({ children }: IGMapProvider) => {
	const activeMarker = useRef<T_GoogleInfoWindow>(null);

	const [gMap, setGMap] = useState<T_GoogleMap | null>(null);

	const [placesList, setPlacesList] = useState<IPlace[]>([]);

	const selectedMarkers = useRef<T_GoogleAdvMarker[]>([]);

	const addPlaceToMap = (placeData: IPlaceData) => {
		const { name, lat, lng, description, images } = placeData;

		const marker = createMarker({ name, lat, lng });

		setPlacesList([
			...placesList,
			{
				name,
				lat,
				lng,
				description,
				images,
				marker,
			},
		]);
	};

	const removePlaceFromMap = (placeName: string) => {
		setPlacesList(placesList.filter((place) => place.name !== placeName));

		removeMarker(placeName);
	};

	const updateSelectedMarkersList = (marker: T_GoogleAdvMarker) => {
		const PinElement = geoService.getPinElement();

		if (!PinElement) {
			console.error("Null reference: PinElement");
			return null;
		}

		const pinDefault = new PinElement({
			background: "#FC4C04",
		});
		const pinBackground = new PinElement({
			background: "#FBBC04",
		});

		if (selectedMarkers.current.length >= 2) {
			const oldestSelection = selectedMarkers.current[0];
			oldestSelection.content = pinDefault.element;
			selectedMarkers.current.shift();
		}

		marker.content = pinBackground.element;

		selectedMarkers.current.push(marker);
	};

	// --> Create a marker in a specific position and add it to the map
	const createMarker = ({ name, lat, lng }: IPlaceData) => {
		const Marker = geoService.getAdvancedMarker();
		const PinElement = geoService.getPinElement();

		if (!Marker || !PinElement) {
			console.error("Null reference: Marker or InfoWindow or PinElement");
			return null;
		}

		const marker = new Marker({
			map: gMap,
			position: { lat, lng },
			title: name,
			gmpClickable: true,
		});

		gMap?.panTo({ lat, lng });

		marker.addEventListener("gmp-click", () => {
			if (activeMarker.current) {
				activeMarker.current.close();
			}

			updateSelectedMarkersList(marker);
		});

		return marker;
	};

	const createInfoWindow = (marker: T_GoogleAdvMarker, content: string) => {
		const InfoWindow = geoService.getInfoWindow();

		if (!InfoWindow) {
			console.error("Null reference: InfoWindow ");
			return null;
		}

		const infoWindow = new InfoWindow();

		infoWindow.close();
		infoWindow.setContent(content);
		infoWindow.open(gMap, marker);

		activeMarker.current = infoWindow;

		return infoWindow;
	};

	// --> Remove a marker from the map
	const removeMarker = (name: string) => {
		const selectedPlace = placesList.find((place) => place.name === name);

		if (selectedPlace?.marker) {
			selectedPlace.marker.map = null;
		}
	};

	return (
		<GMapContext.Provider
			value={{
				gMap,
				selectedMarkers,
				placesList,
				setGMap,
				addPlaceToMap,
				removePlaceFromMap,
				createInfoWindow,
			}}
		>
			{children}
		</GMapContext.Provider>
	);
};
