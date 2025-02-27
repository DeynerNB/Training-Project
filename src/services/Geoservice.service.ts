import type { IGeolocationCoordinates } from "../interfaces/Coordinates.interface";

export class GeoLocationService {
	Map: typeof google.maps.Map | undefined;
	InfoWindow: typeof google.maps.InfoWindow | undefined;
	AdvancedMarkerElement:
		| typeof google.maps.marker.AdvancedMarkerElement
		| undefined;
	PinElement: typeof google.maps.marker.PinElement | undefined;
	Place: typeof google.maps.places.Place | undefined;
	Geocoder: google.maps.Geocoder | undefined;

	async loadGoogleMapsLibrary() {
		const mapsLibrary = (await window.google.maps.importLibrary(
			"maps",
		)) as google.maps.MapsLibrary;
		const MapElement = mapsLibrary.Map;

		const { InfoWindow } = mapsLibrary;
		const Geocoder = new window.google.maps.Geocoder();

		const { AdvancedMarkerElement, PinElement } =
			(await window.google.maps.importLibrary(
				"marker",
			)) as google.maps.MarkerLibrary;

		const { Place } = (await window.google.maps.importLibrary(
			"places",
		)) as google.maps.PlacesLibrary;

		this.Map = MapElement;
		this.InfoWindow = InfoWindow;
		this.AdvancedMarkerElement = AdvancedMarkerElement;
		this.PinElement = PinElement;
		this.Place = Place;
		this.Geocoder = Geocoder;
	}

	getMapObject() {
		return this.Map;
	}

	getAdvancedMarker() {
		return this.AdvancedMarkerElement;
	}

	getPlaceObject() {
		return this.Place;
	}

	getPinElement() {
		return this.PinElement;
	}

	getGeocoder() {
		return this.Geocoder;
	}

	getInfoWindow() {
		return this.InfoWindow;
	}

	getUserCoordinates(): Promise<IGeolocationCoordinates> {
		return new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(
				({ coords }) => {
					resolve(coords);
				},
				(err) => reject(err),
			);
		});
	}
}

const geoService = new GeoLocationService();

export default geoService;
