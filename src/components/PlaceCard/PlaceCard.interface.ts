import type { IPlace } from "../../interfaces/Places.interface";

export interface IPlaceCard {
	placeData: IPlace;
	handleRemovePlace: (markerId: string) => void;
	closeDialog?: () => void;
}
