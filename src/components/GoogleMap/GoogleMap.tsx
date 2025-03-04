import { Box, Flex, IconButton, Spinner } from "@radix-ui/themes";
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
	T_GoogleDirectionRender,
	T_GoogleDirectionService,
} from "../../types/Google.types";

// -- Components import
import DialogForm from "../Shared/DialogForm/DialogForm";

import { Toast } from "radix-ui";
import { mapStyle } from "./GoogleMap.interface";
// -- Styles import
import style from "./GoogleMap.module.scss";

function GoogleMap() {
	// -- Const variables
	const CR_lat = 9.7489;
	const CR_lng = -83.7534;

	// -- Hooks variables
	const [showDistancePanel, setShowDistancePanel] = useState(false);

	const [showAlert, setShowAlert] = useState(false);

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

	const directionPanelRef = useRef<HTMLDivElement>(null);

	const directionRenderRef = useRef<T_GoogleDirectionRender>(null);

	const directionServiceRef = useRef<T_GoogleDirectionService>(null);

	// --- Context variables
	const {
		gMap,
		selectedMarkers,
		initializePlacesFromList,
		setGMap,
		showUserLocation,
	} = useContext(GMapContext);

	useEffect(() => {
		if (googleMapsScriptLoaded) {
			initializeMap();
		}
	}, [googleMapsScriptLoaded]);

	useEffect(() => {
		loadGoogleSripts();
	}, [loadGoogleSripts]);

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
			// styles: custom_Style,
			disableDefaultUI: true,
		});

		const googleMapStyle = new google.maps.StyledMapType(mapStyle, {
			name: "Styled Map",
		});

		googleMapObj.mapTypes.set("styled_map", googleMapStyle);
		googleMapObj.setMapTypeId("styled_map");

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

		// Create a directions objects
		const directionRender = new google.maps.DirectionsRenderer();
		const directionService = new google.maps.DirectionsService();

		directionRender.setMap(googleMapObj);
		// directionRender.setPanel(directionPanelRef.current);
		directionRenderRef.current = directionRender;
		directionServiceRef.current = directionService;

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
			setShowAlert(true);
			setTimeout(() => {
				setShowAlert(false);
			}, 2000);

			console.error("No markers are selected");
			return;
		}
		if (!directionServiceRef.current || !directionRenderRef.current) {
			console.error("Null reference: directionServiceRef");
			return;
		}

		// // Get the markers positions
		const markersList = selectedMarkers.current;
		const firstPosition = markersList[0].position as google.maps.LatLngLiteral;
		const secondPosition = markersList[1].position as google.maps.LatLngLiteral;

		const request = {
			origin: firstPosition,
			destination: secondPosition,
			travelMode: google.maps.TravelMode.DRIVING,
		};

		setShowDistancePanel(true);

		directionServiceRef.current.route(request, (result, status) => {
			let content = "";
			if (status === "OK" && result) {
				directionRenderRef.current?.setDirections(result);

				const { distance, duration } = result.routes[0].legs[0];

				if (directionPanelRef.current) {
					content = `
					<p>Distance: ${distance?.text}</p>
					<p>Duration: ${duration?.text}</p>
					`;
				}
			} else {
				content = "<p>No routes available</p>";
			}

			if (directionPanelRef.current) {
				directionPanelRef.current.innerHTML = content;
			}
		});
	};

	return (
		<>
			<Box position={"relative"}>
				<Box as={"div"} height={"100%"} ref={mapDivRef}>
					<Flex justify={"center"} align={"center"} height={"100%"}>
						<Spinner />
					</Flex>
				</Box>

				<Flex position={"absolute"} bottom={"5"} right={"3"} gap={"2"}>
					<IconButton size={"3"} onClick={handleDistanceCalculation}>
						{/* <RulerHorizontalIcon className="default-icon" /> */}
						<span className="material-symbols-outlined">navigation</span>
					</IconButton>
					<IconButton size={"3"} onClick={handleMyLocation}>
						{/* <Crosshair2Icon className="default-icon" /> */}
						<span className="material-symbols-outlined">my_location</span>
					</IconButton>
				</Flex>

				{showDistancePanel ? (
					<Box
						position={"absolute"}
						bottom={"2"}
						left={"2"}
						p={"2"}
						ref={directionPanelRef}
						className={style["distance-panel"]}
					/>
				) : (
					<></>
				)}

				<Toast.Provider>
					<Toast.Root
						className={style["toast-root"]}
						open={showAlert}
						onOpenChange={setShowAlert}
					>
						<Toast.Title className={style["toast-title"]}>Info</Toast.Title>
						<Toast.Description className={style["toast-description"]}>
							Please select two markers to calculate their route
						</Toast.Description>
					</Toast.Root>
					<Toast.Viewport className={style["toast-viewport"]} />
				</Toast.Provider>
			</Box>

			<DialogForm
				openPlaceForm={openPlaceForm}
				setOpenPlaceForm={setOpenPlaceForm}
				coords={selectionCoord}
			/>
		</>
	);
}

export default GoogleMap;
