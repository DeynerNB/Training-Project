import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import type { ICoordinates } from "../../interfaces/Coordinates.interface";
import type { IPlace, IPlaceData } from "../../interfaces/Places.interface";
import type {
	T_GoogleAdvMarker,
	T_GoogleInfoWindow,
	T_GoogleMap,
} from "../../types/Google.types";

export interface IGMapProvider {
	children: ReactNode;
}

export interface IGMapContext {
	gMap: T_GoogleMap | null;
	setGMap: Dispatch<SetStateAction<T_GoogleMap | null>>;
	placesList: IPlace[];
	initializePlacesFromList: (places: IPlaceData[], map: T_GoogleMap) => void;
	addPlaceToMap: (placeData: IPlaceData, initialLoad?: boolean) => void;
	removePlaceFromMap: (placeName: string) => void;
	findPlace: (placeName: string) => IPlace | undefined;
	createInfoWindow: (
		marker: T_GoogleAdvMarker,
		content: string,
	) => T_GoogleInfoWindow | null;

	selectedMarkers: RefObject<T_GoogleAdvMarker[]> | null;

	showUserLocation: (coords: ICoordinates) => void;
	toggleFavorite: (placeName: string) => void;

	setMapCenter: (coords: ICoordinates) => void;
}
