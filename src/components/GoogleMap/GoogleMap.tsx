import { Crosshair2Icon, RulerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, IconButton } from "@radix-ui/themes";
import { useContext, useEffect, useRef, useState } from "react";

// -- Hooks import
import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import useLocalStorage from "../../hooks/useLocalStorage";

// -- Context and service import
import { GMapContext } from "../../context/GMapContext/GMapContext";
import geoService from "../../services/Geoservice.service";

import type {
	ICoordinates,
	IGeolocationCoordinates,
} from "../../interfaces/Coordinates.interface";
// -- Interfaces and types import
import type { IPlaceData } from "../../interfaces/Places.interface";
import type {
	T_GoogleDistanceMatrix,
	T_GooglePolyline,
} from "../../types/Google.types";

// -- Components import
import DialogForm from "../Shared/DialogForm/DialogForm";

function GoogleMap() {
	// -- Const variables
	const CR_lat = 9.7489;
	const CR_lng = -83.7534;

	// -- Hooks variables
	const [openPlaceForm, setOpenPlaceForm] = useState(false);

	const [userCoordinates, setUserCoordinates] = useState<ICoordinates>();

	const [selectionCoord, setSelectionCoord] = useState<ICoordinates>({
		lat: 0,
		lng: 0,
	});

	// -- Custom hooks variables
	const { writeStorageValue, getStorageValue } = useLocalStorage();

	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	// -- Ref hooks variables
	const mapDivRef = useRef<HTMLDivElement>(null);

	const mapPolylineRef = useRef<T_GooglePolyline>(null);

	const mapDistanceMatrixRef = useRef<T_GoogleDistanceMatrix>(null);

	// --- Context variables
	const {
		gMap,
		selectedMarkers,
		initializePlacesFromList,
		setGMap,
		createInfoWindow,
		showUserLocation,
	} = useContext(GMapContext);

	useEffect(() => {
		if (googleMapsScriptLoaded) {
			initializeMap();
		}
	}, [googleMapsScriptLoaded]);

	// Load every google maps script
	const initiliazeGoogleMapScripts = () => {
		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
		loadGoogleSripts(apiKey);
	};

	// Load the map into the page
	const initializeMap = async () => {
		// Load every google maps library needed
		await geoService.loadGoogleMapsLibrary();

		// Get the map class
		const MapObject = geoService.getMapObject();

		if (!MapObject || !mapDivRef.current) {
			console.error("Null reference: MapObject or mapDivRef");
			return;
		}

		// Create the map object and add it to the page
		const googleMapObj = new MapObject(mapDivRef.current, {
			center: { lat: CR_lat, lng: CR_lng },
			zoom: 11,
			mapId: "Mapa Proyecto",
		});

		// Set the click listener to add a new place
		googleMapObj.addListener(
			"click",
			(mapsMouseEvent: google.maps.MapMouseEvent) => {
				if (!mapsMouseEvent.latLng) {
					console.error("Map error: Failed getting latLng on click");
					return;
				}
				const lat = mapsMouseEvent.latLng.lat();
				const lng = mapsMouseEvent.latLng.lng();

				setSelectionCoord({ lat, lng });
				setOpenPlaceForm(true);
			},
		);

		// Save the google map object in the context
		setGMap(googleMapObj);

		// Create the polyline and distance matrix objects
		mapPolylineRef.current = new google.maps.Polyline({ geodesic: true });
		mapDistanceMatrixRef.current = new google.maps.DistanceMatrixService();

		// Restore the user saved places into the map
		const userPlaces = getStorageValue("user-places");
		if (userPlaces) {
			const userPlacesList: IPlaceData[] = JSON.parse(userPlaces);
			initializePlacesFromList(userPlacesList, googleMapObj);
		}
	};

	// Set the user location into the map
	const handleMyLocation = async () => {
		// If the userCoordinates are already set -> Pan to it
		if (userCoordinates) {
			gMap?.panTo(userCoordinates);
			return;
		}

		// Get the user coordinates from local storage
		const coords = getStorageValue("user-coordinates");
		let coordsFormatted!: ICoordinates;

		// If coords -> Parse the coords
		if (coords) {
			coordsFormatted = JSON.parse(coords);
		}
		// If not -> Get the machine coords using the geoService
		else {
			const { latitude, longitude }: IGeolocationCoordinates =
				await geoService.getUserCoordinates();

			coordsFormatted = {
				lat: latitude,
				lng: longitude,
			};
			writeStorageValue("user-coordinates", JSON.stringify(coordsFormatted));
		}

		// Set the user coordinates on the map
		setUserCoordinates(coordsFormatted);
		showUserLocation(coordsFormatted);
	};

	// Calculate and show the distance between two selected markers
	const handleDistanceCalculation = async () => {
		if (!selectedMarkers || selectedMarkers.current.length < 2) {
			console.error("No markers are selected");
			return;
		}
		if (!mapPolylineRef.current || !mapDistanceMatrixRef.current) {
			console.error("Null reference: mapPolylineRef or mapDistanceMatrixRef");
			return;
		}

		// Remove the previous line from the map
		mapPolylineRef.current.setMap(null);

		// Get the markers positions
		const markersList = selectedMarkers.current;
		const firstPosition = markersList[0].position as google.maps.LatLngLiteral;
		const secondPosition = markersList[1].position as google.maps.LatLngLiteral;

		// Set the coords values for both markers
		const coords = [
			{ lat: firstPosition.lat, lng: firstPosition.lng },
			{ lat: secondPosition.lat, lng: secondPosition.lng },
		];

		// Set the configuration request for the distance calculation
		const distanceConfig: google.maps.DistanceMatrixRequest = {
			destinations: [firstPosition],
			origins: [secondPosition],
			travelMode: google.maps.TravelMode.DRIVING,
		};

		// Make the distance calculation
		mapDistanceMatrixRef.current.getDistanceMatrix(
			distanceConfig,
			(response, status) => {
				if (status === google.maps.DistanceMatrixStatus.OK && response) {
					console.log("resp", response);

					// Get the distance and duration
					const { distance, duration, status } = response.rows[0].elements[0];

					let content = "";

					if (status === google.maps.DistanceMatrixElementStatus.OK) {
						const distanceText = distance.text;
						const durationText = duration.text;
						content = `Distance: ${distanceText}<br/>Duration: ${durationText}`;
					} else {
						content = "There is no route available";
					}

					// Create the InfoWindow for the distance and duration display
					createInfoWindow(markersList[0], content);
				}
			},
		);

		// Set the line on the map
		mapPolylineRef.current.setPath(coords);
		mapPolylineRef.current.setMap(gMap);
	};

	return (
		<>
			{googleMapsScriptLoaded ? (
				<>
					<Box position={"relative"}>
						<Box as={"div"} height={"100%"} ref={mapDivRef} />
						<Flex position={"absolute"} bottom={"6"} right={"9"} gap={"2"}>
							<IconButton size={"3"} onClick={handleDistanceCalculation}>
								<RulerHorizontalIcon />
							</IconButton>
							<IconButton size={"3"} onClick={handleMyLocation}>
								<Crosshair2Icon />
							</IconButton>
						</Flex>
					</Box>

					<DialogForm
						openPlaceForm={openPlaceForm}
						setOpenPlaceForm={setOpenPlaceForm}
						coords={selectionCoord}
					/>
				</>
			) : (
				<Flex justify={"center"} align={"center"}>
					<Button onClick={initiliazeGoogleMapScripts}>Load Map</Button>
				</Flex>
			)}
		</>
	);
}

export default GoogleMap;
