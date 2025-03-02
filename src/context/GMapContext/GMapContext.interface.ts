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
	placesList: IPlace[];
	selectedMarkers: RefObject<T_GoogleAdvMarker[]> | null;
	initializePlaces: (places: IPlaceData[], map: T_GoogleMap) => void;
	setGMap: Dispatch<SetStateAction<T_GoogleMap | null>>;
	addPlaceToMap: (placeData: IPlaceData, initialLoad?: boolean) => void;
	removePlaceFromMap: (placeName: string) => void;
	createInfoWindow: (
		marker: T_GoogleAdvMarker,
		content: string,
	) => T_GoogleInfoWindow | null;
	showUserLocation: (coords: ICoordinates) => void;
	toggleFavorite: (placeName: string) => void;
}
