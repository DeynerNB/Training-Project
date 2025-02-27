import { createContext, useRef, useState } from "react";

import type { IPlace, IPlaceData } from "../../interfaces/Places.interface";
import type { T_GoogleInfoWindow, T_GoogleMap } from "../../types/Google.types";
import type { IGMapContext, IGMapProvider } from "./GMapContext.interface";

import geoService from "../../services/Geoservice.service";

const defaultValue: IGMapContext = {
	gMap: null,
	placesList: [],
	setGMap: () => {},
	addPlaceToMap: () => {},
	removePlaceFromMap: () => {},
};

// Create the context
export const GMapContext = createContext(defaultValue);

// Create provider
export const GMapProvider = ({ children }: IGMapProvider) => {
	const activeMarker = useRef<T_GoogleInfoWindow>(null);

	const [gMap, setGMap] = useState<T_GoogleMap | null>(null);

	const [placesList, setPlacesList] = useState<IPlace[]>([]);

	const addPlaceToMap = (placeData: IPlaceData) => {
		const { name, lat, lng } = placeData;

		const marker = createMarker({ name, lat, lng });

		setPlacesList([
			...placesList,
			{
				name,
				lat,
				lng,
				marker,
			},
		]);
	};

	const removePlaceFromMap = (placeName: string) => {
		setPlacesList(placesList.filter((place) => place.name !== placeName));

		removeMarker(placeName);
	};

	// --> Create a marker in a specific position and add it to the map
	const createMarker = ({ name, lat, lng }: IPlaceData) => {
		const Marker = geoService.getAdvancedMarker();
		const InfoWindow = geoService.getInfoWindow();

		if (!Marker || !InfoWindow) {
			console.error("Null reference: Marker or InfoWindow");
			return null;
		}

		const infoWindow = new InfoWindow();
		const marker = new Marker({
			map: gMap,
			position: { lat, lng },
			title: name,
			gmpClickable: true,
		});

		marker.addEventListener("gmp-click", () => {
			if (activeMarker.current) {
				activeMarker.current.close();
			}

			infoWindow.close();
			infoWindow.setContent(
				`<div style="text-align: center">${name}<br/><br/>Lat: ${lat}<br/>Lng: ${lng}</div>`,
			);
			infoWindow.open(gMap, marker);

			activeMarker.current = infoWindow;
		});

		return marker;
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
			value={{ gMap, placesList, setGMap, addPlaceToMap, removePlaceFromMap }}
		>
			{children}
		</GMapContext.Provider>
	);
};
