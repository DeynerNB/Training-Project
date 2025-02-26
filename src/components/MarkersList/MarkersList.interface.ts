import type { ICoordinates } from "../../interfaces/Coordinates.interface";
import type { IMarkerListItem } from "../../interfaces/Marker.interface";

export interface IMarkersListProps {
	markersList: IMarkerListItem[];
	removeMarker: (markerId: string) => void;
	setMapPosition: (position: ICoordinates) => void;
}
