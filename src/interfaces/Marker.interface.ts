import type { T_GoogleAdvMarker, T_GoogleMap } from "../types/Google.types";
import type { ICoordinates } from "./Coordinates.interface";

export interface IMarker {
	id: string;
	position: ICoordinates;
}

export interface ICreateMarker extends IMarker {
	map: T_GoogleMap;
}

export interface IMarkerListItem {
	id: string;
	marker: T_GoogleAdvMarker;
}
