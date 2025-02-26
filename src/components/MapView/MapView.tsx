import { useEffect, useRef, useState } from "react";
import style from "./MapView.module.scss";

import Alert from "../Alert/Alert";
import FormLocation from "../FormLocation/FormLocation";
import MarkersList from "../MarkersList/MarkersList";
import Spinner from "../Spinner/Spinner";

import GeoLocationService from "../../services/Geoservice.service";

import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import useGoogleMarker from "../../hooks/useGoogleMarker";
import useLocalStorage from "../../hooks/useLocalStorage";
import useQueryParams from "../../hooks/useQueryParams";

import type {
	ICoordinates,
	IGeolocationCoordinates,
} from "../../interfaces/Coordinates.interface";
import type { IMarker } from "../../interfaces/Marker.interface";
import type { IMapViewProps } from "./MapView.interface";

function MapView(props: IMapViewProps) {
	const { handleLocationName } = props;

	const storageKey = "user-coordinates";

	// State hooks variables
	const [displayMap, setDisplayMap] = useState(false);

	const [showAlert, setShowAlert] = useState(false);

	const [userCoordsAvailable, setUserCoordsAvailable] = useState(false);

	const [shareLocationURL, setShareLocationURL] = useState("");

	// Custom hooks variables
	const { getStorageValue, writeStorageValue } = useLocalStorage(storageKey);

	const { currentParams, createQueryParamsURL } = useQueryParams();

	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	const { markersList, addMarker, removeMarker } = useGoogleMarker();

	// Ref hooks variables
	const geolocationService = useRef<GeoLocationService>(null);

	const mapContainer = useRef<HTMLDivElement>(null);

	const googleMapObject = useRef<google.maps.Map>(null);

	const userCoordinates = useRef<string | null>(getStorageValue());

	const userName = useRef<string>("");

	const URL_Anchor = useRef<HTMLAnchorElement>(null);

	// Wait until all google maps scripts are loaded
	useEffect(() => {
		if (window.google && googleMapsScriptLoaded) {
			geolocationService.current = new GeoLocationService();
			handleDisplayMapLocation();
		}
	}, [googleMapsScriptLoaded]);

	const handleDisplayMapLocation = async () => {
		setDisplayMap(true);

		// Load the google maps scripts
		if (!window.google) {
			const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
			loadGoogleSripts(apiKey);
			return;
		}

		// If is already loaded -> Just focus the user coordinates
		if (googleMapObject.current && userCoordinates.current) {
			const coords: ICoordinates = JSON.parse(userCoordinates.current);
			setMapPosition(coords);
		}
		// If is first load -> Load all libraries and set the map
		else {
			// If the user coords are in the localStorage -> Use those coordinates
			if (userCoordinates.current) {
				const coords: ICoordinates = JSON.parse(userCoordinates.current);
				initializeMap(coords);
			}
			// Otherwise, use navigator to get their coordinates
			else {
				if (geolocationService.current) {
					const { latitude, longitude }: IGeolocationCoordinates =
						await geolocationService.current.getUserCoordinates();

					const format_coords: ICoordinates = {
						lat: latitude,
						lng: longitude,
					};

					writeStorageValue(JSON.stringify(format_coords));
					initializeMap(format_coords);

					userCoordinates.current = JSON.stringify(format_coords);
				}
			}
		}

		setUserCoordsAvailable(true);
	};

	// --> Display the map into the page
	const initializeMap = async (coords: ICoordinates) => {
		if (coords === null) {
			return;
		}

		if (!geolocationService.current) {
			return;
		}

		// Load the scripts for the google maps libraries
		await geolocationService.current.loadGoogleMapsLibrary();

		// Get all the necessary google maps object
		const mapObject = geolocationService.current.getMapObject();
		const geocoderObject = geolocationService.current.getGeocoder();

		if (!mapObject || !geocoderObject || !mapContainer.current) {
			return;
		}

		// Create the map and add it to the DOM
		const mapRef = new mapObject(mapContainer.current, {
			center: coords,
			zoom: 12,
			mapId: "Konrad Map Practice",
		});

		// Save the map reference
		googleMapObject.current = mapRef;

		// Set the user marker and its clickable event
		addMarker(
			{
				map: mapRef,
				position: coords,
				id: "Your location",
			},
			geolocationService.current,
		);

		// Use the geocoder to get the location name
		geocoderObject
			.geocode({
				location: coords,
			})
			.then((response: google.maps.GeocoderResponse) => {
				const { formatted_address } = response.results[0];
				userName.current = formatted_address;

				handleLocationName(formatted_address);
			});

		addGuestMarker();
	};

	const addGuestMarker = () => {
		// Add the guest marker that was passed using queryParams
		if (currentParams && Object.keys(currentParams).length > 0) {
			const guestParams = currentParams;

			const position: ICoordinates = {
				lat: Number.parseFloat(guestParams.lat),
				lng: Number.parseFloat(guestParams.lng),
			};

			submitMarker({
				id: guestParams.name || "",
				position,
			});
		}
	};

	// --> Add a new marker to the map
	const submitMarker = ({ id, position }: IMarker) => {
		// Check if there is already a marker with the same name
		const repeatedMarker = markersList.some(
			(markerData) => markerData.id === id,
		);

		// If is repeated--> Show the alert
		if (repeatedMarker) {
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 3000);
			return;
		}

		// If there is not --> Add the marker to the map and the markersList
		if (googleMapObject.current && geolocationService.current) {
			addMarker(
				{
					map: googleMapObject.current,
					position,
					id,
				},
				geolocationService.current,
			);
		}
	};

	// --> Set the map center position
	const setMapPosition = (position: ICoordinates) => {
		if (googleMapObject.current) {
			googleMapObject.current.panTo(position);
		}
	};

	const handleShareLocation = () => {
		if (userCoordinates.current && URL_Anchor.current) {
			const { lat, lng }: ICoordinates = JSON.parse(userCoordinates.current);

			const sharedURL = createQueryParamsURL({
				name: userName.current,
				lat: lat.toString(),
				lng: lng.toString(),
			}).toString();

			setShareLocationURL(sharedURL);
		}
	};

	return (
		<>
			<div className={style["map--button-container"]}>
				<button
					type="button"
					className="btn"
					onClick={handleDisplayMapLocation}
				>
					<span className="material-symbols-outlined">my_location</span>
					Find Me
				</button>
			</div>
			<hr />
			{displayMap && (
				<div className={style["map-container"]}>
					<div className={style["map-container--group"]}>
						<FormLocation submitMarker={submitMarker} />
						<MarkersList
							markersList={markersList}
							removeMarker={removeMarker}
							setMapPosition={setMapPosition}
						/>

						{showAlert && (
							<Alert
								content={
									"Marker with the same name found! Please, change its name."
								}
							/>
						)}
					</div>
					<div className={style["map-container--group__rounded"]}>
						<div ref={mapContainer} className={style["map-container--map"]}>
							<Spinner />
						</div>
						<div className={style["share-location-container"]}>
							<button
								type="button"
								className="btn"
								onClick={handleShareLocation}
								disabled={!userCoordsAvailable}
							>
								Share my location
							</button>
							<a
								href={shareLocationURL}
								target="_blank"
								rel="noopener noreferrer"
								className={style["url-a"]}
								ref={URL_Anchor}
							>
								{shareLocationURL}
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default MapView;
