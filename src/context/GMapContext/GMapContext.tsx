import { createContext, useRef, useState } from "react";

import type { ICoordinates } from "../../interfaces/Coordinates.interface";
// -- Interfaces export
import type { IMarker } from "../../interfaces/Marker.interface";
import type { IPlace, IPlaceData } from "../../interfaces/Places.interface";
import type {
	T_GoogleAdvMarker,
	T_GoogleInfoWindow,
	T_GoogleMap,
	T_GooglePinElement,
} from "../../types/Google.types";
import type { IGMapContext, IGMapProvider } from "./GMapContext.interface";

// -- Hooks and service export
import useLocalStorage from "../../hooks/useLocalStorage";
import geoService from "../../services/Geoservice.service";

const defaultValue: IGMapContext = {
	gMap: null,
	setGMap: () => {},
	placesList: [],
	initializePlacesFromList: () => {},
	addPlaceToMap: () => {},
	removePlaceFromMap: () => {},
	findPlace: () => undefined,
	createInfoWindow: () => null,
	selectedMarkers: null,
	showUserLocation: () => {},
	toggleFavorite: () => {},
	setMapCenter: () => {},
};

// Create the context
export const GMapContext = createContext(defaultValue);

// Create provider
export const GMapProvider = ({ children }: IGMapProvider) => {
	const activeMarker = useRef<T_GoogleInfoWindow>(null);

	const [gMap, setGMap] = useState<T_GoogleMap | null>(null);

	const [placesList, setPlacesList] = useState<IPlace[]>([]);

	const selectedMarkers = useRef<T_GoogleAdvMarker[]>([]);

	const userLocationActiveRef = useRef<boolean>(false);

	const { writeStorageValue } = useLocalStorage();

	// Sort the places list by the favorite attribute
	const sortByFavoritePlace = (places: IPlace[]) => {
		places.sort((placeA, placeB) =>
			placeA.isFavorite === placeB.isFavorite ? 0 : placeA.isFavorite ? -1 : 1,
		);

		return places;
	};

	// Load the user saved places list into the map
	const initializePlacesFromList = (places: IPlaceData[], map: T_GoogleMap) => {
		const userPlaces: IPlace[] = [];

		for (const place of places) {
			const { name, lat, lng } = place;
			const marker = createMarker({ name, lat, lng }, map);
			userPlaces.push({ ...place, marker });
		}

		const sortedPlaces = sortByFavoritePlace(userPlaces);
		setPlacesList(sortedPlaces);
	};

	// Update the list of places saved in local storage
	const updatePlacesLocalStorage = (places: IPlace[]) => {
		const jsonPlaces = JSON.stringify(
			places.map(({ marker, ...data }) => data),
		);
		writeStorageValue("user-places", jsonPlaces);
	};

	// Create google pin object
	const createPinElement = (
		background: string,
		borderColor?: string,
		glyphColor?: string,
	) => {
		const PinElement = geoService.getPinElement();

		if (!PinElement) {
			console.error("Null reference: PinElement");
			return;
		}

		const pin = new PinElement({
			background,
			borderColor,
			glyphColor,
		});

		return pin;
	};

	// Create a google map marker in a specific position
	const createMarker = (
		{ name, lat, lng }: IMarker,
		map?: T_GoogleMap,
		pin?: T_GooglePinElement,
		pinAct?: T_GooglePinElement,
	) => {
		const Marker = geoService.getAdvancedMarker();

		if (!Marker) {
			console.error("Null reference: Marker");
			return null;
		}

		// Create the marker object
		const marker = new Marker({
			map: map || gMap,
			position: { lat, lng },
			title: name,
			gmpClickable: true,
			content: pin?.element,
		});

		// Set the map view into the marker
		gMap?.panTo({ lat, lng });

		// Create the clickable event listenter
		marker.addEventListener("gmp-click", () => {
			// If there is another marker infowindow open -> Close it
			if (activeMarker.current) {
				activeMarker.current.close();
			}

			// Update the list of selected markers
			updateSelectedMarkersList(marker, pin, pinAct);
		});

		return marker;
	};

	// Add a new place and set up the marker on the map
	const addPlaceToMap = (placeData: IPlaceData) => {
		const { name, lat, lng } = placeData;

		const marker = createMarker({ name, lat, lng });

		const places = [
			...placesList,
			{
				...placeData,
				marker,
			},
		];

		// Update the places list
		setPlacesList(places);
		// Update the local storage list of places
		updatePlacesLocalStorage(places);
	};

	// Remove a selected place from the map
	const removePlaceFromMap = (placeName: string) => {
		const filteredList = placesList.filter((place) => place.name !== placeName);

		// Update the list without the specified place
		setPlacesList(filteredList);
		updatePlacesLocalStorage(filteredList);

		// Remove the marker from the map
		removeMarker(placeName);
	};

	// Remove a marker from the map
	const removeMarker = (name: string) => {
		const selectedPlace = placesList.find((place) => place.name === name);

		if (selectedPlace?.marker) {
			selectedPlace.marker.map = null;
		}
	};

	// Update the list of selected markers
	const updateSelectedMarkersList = (
		marker: T_GoogleAdvMarker,
		pinDef?: T_GooglePinElement,
		pinAct?: T_GooglePinElement,
	) => {
		// Create each pin style
		const pinDefault = pinDef || createPinElement("#FC4C04");
		const pinSelected = pinAct || createPinElement("#ff6977");

		if (!pinDefault || !pinSelected) {
			return;
		}

		// If the selected marker is already selected
		const index = selectedMarkers.current.indexOf(marker);
		if (index >= 0) {
			// Get the non selected marker index
			const nonSelectedIndex = Math.abs(index - 1);
			const nonSelectedMarker = selectedMarkers.current[nonSelectedIndex];

			// Get the selected marker and updated its style
			const selectedMarker = selectedMarkers.current[index];
			selectedMarker.content = pinDefault.element;

			// Remove the selected marker form the selected list
			selectedMarkers.current = nonSelectedMarker ? [nonSelectedMarker] : [];
			return;
		}

		// If there is already 2 markers selected -> Remove the oldest one
		if (selectedMarkers.current.length >= 2) {
			const oldestSelection = selectedMarkers.current[0];
			oldestSelection.content = pinDefault.element;
			selectedMarkers.current.shift();
		}

		// Update the marker pin and added it to the selected list
		marker.content = pinSelected.element;
		selectedMarkers.current.push(marker);
	};

	// Create an InfoWindow Object
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

	// Set the user location marker on the map
	const showUserLocation = (coords: ICoordinates) => {
		if (!userLocationActiveRef.current) {
			const userPin = createPinElement("#4285F4", "#1159d1", "#1159d1");
			const userPinAct = createPinElement("#82daff", "#2c66c7", "#2c66c7");

			createMarker(
				{ name: "Your position", lat: coords.lat, lng: coords.lng },
				undefined,
				userPin,
				userPinAct,
			);
		}

		userLocationActiveRef.current = true;
	};

	// Set place as favorite or non-favorite
	const toggleFavorite = (placeName: string) => {
		const places = placesList.map((place) => {
			if (place.name === placeName) {
				return { ...place, isFavorite: !place.isFavorite };
			}

			return place;
		});

		const sortedPlaces = sortByFavoritePlace(places);
		setPlacesList(sortedPlaces);
		updatePlacesLocalStorage(sortedPlaces);
	};

	// Return a place object based on its name
	const findPlace = (placeName: string) => {
		const selectedPlace = placesList.find((place) => place.name === placeName);
		return selectedPlace;
	};

	// Set the map center position
	const setMapCenter = (coords: ICoordinates) => {
		gMap?.panTo(coords);

		const zoomV = gMap?.getZoom();

		if (zoomV && zoomV < 15) {
			gMap?.setZoom(17);
		}
	};

	return (
		<GMapContext.Provider
			value={{
				gMap,
				selectedMarkers,
				placesList,
				initializePlacesFromList,
				setGMap,
				addPlaceToMap,
				removePlaceFromMap,
				findPlace,
				createInfoWindow,
				showUserLocation,
				toggleFavorite,
				setMapCenter,
			}}
		>
			{children}
		</GMapContext.Provider>
	);
};
