import type { IGeolocationCoordinates } from "../interfaces/Coordinates.interface";

export class GeoLocationService {
	// Map Object
	Map: typeof google.maps.Map | undefined;
	// InfoWindow Object
	InfoWindow: typeof google.maps.InfoWindow | undefined;
	// Marker Object
	AdvancedMarkerElement:
		| typeof google.maps.marker.AdvancedMarkerElement
		| undefined;
	// Pin Object
	PinElement: typeof google.maps.marker.PinElement | undefined;
	// Place Object
	Place: typeof google.maps.places.Place | undefined;
	// Geocoder Object
	Geocoder: google.maps.Geocoder | undefined;

	// Request|Load every google maps library to be used by the objects
	async loadGoogleMapsLibrary() {
		// Maps library
		const mapsLibrary = (await window.google.maps.importLibrary(
			"maps",
		)) as google.maps.MapsLibrary;

		// Map object
		const MapElement = mapsLibrary.Map;

		// InfoWindow Object
		const { InfoWindow } = mapsLibrary;

		// Geocoder Object
		const Geocoder = new window.google.maps.Geocoder();

		// Marker and Pin Objects
		const { AdvancedMarkerElement, PinElement } =
			(await window.google.maps.importLibrary(
				"marker",
			)) as google.maps.MarkerLibrary;

		// Place Object
		const { Place } = (await window.google.maps.importLibrary(
			"places",
		)) as google.maps.PlacesLibrary;

		// Initialize each class object
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

// Singleton Object
const geoService = new GeoLocationService();

export default geoService;
