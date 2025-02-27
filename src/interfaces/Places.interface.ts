import type { T_GoogleAdvMarker } from "../types/Google.types";
import type { ICoordinates } from "./Coordinates.interface";

export interface IPlaceData extends ICoordinates {
	name: string;
	description?: string;
	images?: string[];
}

export interface IPlace extends IPlaceData {
	marker: T_GoogleAdvMarker | null;
}
