import type { Dispatch, SetStateAction } from "react";
import type { ICoordinates } from "../../../interfaces/Coordinates.interface";

export interface IDialogForm {
	coords: ICoordinates;
	openPlaceForm: boolean;
	setOpenPlaceForm: Dispatch<SetStateAction<boolean>>;
}

// Define the inputs and their types
export type Inputs = {
	placeName: string;
	lat: string;
	lng: string;
	description: string;
	imageURL: string;
	categoryType: string;
	categoryAmenities: string;
};
