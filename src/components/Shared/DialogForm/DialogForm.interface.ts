import type { Dispatch, SetStateAction } from "react";
import type { ICoordinates } from "../../../interfaces/Coordinates.interface";

export interface IDialogForm {
	coords: ICoordinates;
	openPlaceForm: boolean;
	setOpenPlaceForm: Dispatch<SetStateAction<boolean>>;
}
