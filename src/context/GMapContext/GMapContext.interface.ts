import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { IPlace, IPlaceData } from "../../interfaces/Places.interface";
import type { T_GoogleMap } from "../../types/Google.types";

export interface IGMapProvider {
	children: ReactNode;
}

export interface IGMapContext {
	gMap: T_GoogleMap | null;
	placesList: IPlace[];
	setGMap: Dispatch<SetStateAction<T_GoogleMap | null>>;
	addPlaceToMap: (placeData: IPlaceData) => void;
	removePlaceFromMap: (placeName: string) => void;
}
