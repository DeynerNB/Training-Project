import type { IMarker } from "../../interfaces/Marker.interface";

export interface IFormLocationProps {
	submitMarker: ({ id, position }: IMarker) => void;
}
