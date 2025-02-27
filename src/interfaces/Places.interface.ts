import type { T_GoogleAdvMarker } from "../types/Google.types";

export interface IPlaceData {
	name: string;
	lat: number;
	lng: number;
}

export interface IPlace extends IPlaceData {
	marker: T_GoogleAdvMarker | null;
}
