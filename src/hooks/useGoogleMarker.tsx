import { useRef, useState } from "react";
import type {
	ICreateMarker,
	IMarkerListItem,
} from "../interfaces/Marker.interface";
import type { GeoLocationService } from "../services/Geoservice.service";
import type { T_GoogleInfoWindow } from "../types/Google.types";

const useGoogleMarker = () => {
	const activeMarker = useRef<T_GoogleInfoWindow>(null);

	const [markersList, setMarkersList] = useState<IMarkerListItem[]>([]);

	// --> Create a marker in a specific position and add it to the map
	const addMarker = (
		{ map, position, id }: ICreateMarker,
		geolocationService: GeoLocationService,
	) => {
		const Marker = geolocationService.getAdvancedMarker();
		const InfoWindow = geolocationService.getInfoWindow();

		if (!Marker || !InfoWindow) {
			console.error("Null reference: Marker or InfoWindow");
			return;
		}

		const infoWindow = new InfoWindow();
		const marker = new Marker({
			map,
			position,
			title: id,
			gmpClickable: true,
		});

		marker.addEventListener("gmp-click", () => {
			if (activeMarker.current) {
				activeMarker.current.close();
			}

			infoWindow.close();
			infoWindow.setContent(
				`<div style="text-align: center">${id}<br/><br/>Lat: ${position.lat}<br/>Lng: ${position.lng}</div>`,
			);
			infoWindow.open(map, marker);

			activeMarker.current = infoWindow;
		});

		setMarkersList([...markersList, { id, marker }]);
	};

	// --> Remove a marker from the map
	const removeMarker = (markerId: string) => {
		const selectedMarker = markersList.find((marker) => marker.id === markerId);

		if (selectedMarker) {
			selectedMarker.marker.map = null;
		}

		setMarkersList(markersList.filter((marker) => marker.id !== markerId));
	};

	return { addMarker, removeMarker };
};

export default useGoogleMarker;
