import type { T_GoogleAdvMarker } from "../types/Google.types";
import type { IAmenities } from "../utils/FiltersOptions.util";
import type { IMarker } from "./Marker.interface";

export interface IPlaceData extends IMarker {
	description?: string;
	images?: string[];
	category_type?: string;
	category_ammenities?: IAmenities[];
	isFavorite: boolean;
}

export interface IPlace extends IPlaceData {
	marker: T_GoogleAdvMarker | null;
}
