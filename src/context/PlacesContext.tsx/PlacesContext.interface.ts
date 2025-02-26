import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { IPlace } from "../../interfaces/Places.interface";

export interface IPlacesProvider {
	children: ReactNode;
}

export interface IPlaceContext {
	placesList: IPlace[];
	setPlacesList: Dispatch<SetStateAction<IPlace[]>>;
	addPlace: (placeData: IPlace) => void;
}
