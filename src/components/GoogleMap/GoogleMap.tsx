import { Crosshair2Icon, RulerHorizontalIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, IconButton } from "@radix-ui/themes";
import { useContext, useEffect, useRef, useState } from "react";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import useGoogleMapsScript from "../../hooks/useGoogleMapsScript";
import useLocalStorage from "../../hooks/useLocalStorage";

import type {
	ICoordinates,
	IGeolocationCoordinates,
} from "../../interfaces/Coordinates.interface";

import geoService from "../../services/Geoservice.service";
import type {
	T_GoogleDistanceMatrix,
	T_GooglePolyline,
} from "../../types/Google.types";
import DialogForm from "../Shared/DialogForm/DialogForm";

function GoogleMap() {
	const storageKey = "user-coordinates";

	// -- Hooks variables
	const [openPlaceForm, setOpenPlaceForm] = useState(false);

	const [userCoordinates, setUserCoordinates] = useState<ICoordinates>();

	const [selectionCoord, setSelectionCoord] = useState<ICoordinates>({
		lat: 0,
		lng: 0,
	});

	// -- Custom hooks variables
	const { getStorageValue } = useLocalStorage(storageKey);

	const { googleMapsScriptLoaded, loadGoogleSripts } = useGoogleMapsScript();

	// -- Ref hooks variables
	const mapDivRef = useRef<HTMLDivElement>(null);

	const mapPolylineRef = useRef<T_GooglePolyline>(null);

	const mapDistanceMatrixRef = useRef<T_GoogleDistanceMatrix>(null);

	// --- Context variables
	const {
		gMap,
		selectedMarkers,
		setGMap,
		addPlaceToMap,
		createInfoWindow,
		showUserLocation,
	} = useContext(GMapContext);

	useEffect(() => {
		if (googleMapsScriptLoaded) {
			initializeMap();
		}
	}, [googleMapsScriptLoaded]);

	const loadGMaps = () => {
		const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
		loadGoogleSripts(apiKey);
	};

	const initializeMap = async () => {
		await geoService.loadGoogleMapsLibrary();

		const MapObject = geoService.getMapObject();

		if (!MapObject || !mapDivRef.current) {
			console.error("Null reference: MapObject or mapDivRef");
			return;
		}

		const googleMapObj = new MapObject(mapDivRef.current, {
			center: { lat: 9.9947165, lng: -84.1407853 },
			zoom: 12,
			mapId: "Mapa Proyecto",
		});

		googleMapObj.addListener(
			"click",
			(mapsMouseEvent: google.maps.MapMouseEvent) => {
				const lat = mapsMouseEvent.latLng?.lat();
				const lng = mapsMouseEvent.latLng?.lng();

				if (!lat || !lng) {
					console.error("Null reference: lat or lng");
					return;
				}

				setSelectionCoord({ lat, lng });
				setOpenPlaceForm(true);
			},
		);

		setGMap(googleMapObj);

		mapPolylineRef.current = new google.maps.Polyline({ geodesic: true });
		mapDistanceMatrixRef.current = new google.maps.DistanceMatrixService();
	};

	const handleMyLocation = async () => {
		if (userCoordinates) {
			gMap?.panTo(userCoordinates);
			return;
		}

		const coordsRaw = getStorageValue();
		let coords: ICoordinates | null = null;

		if (!coordsRaw) {
			const { latitude, longitude }: IGeolocationCoordinates =
				await geoService.getUserCoordinates();

			coords = {
				lat: latitude,
				lng: longitude,
			};
		} else {
			coords = JSON.parse(coordsRaw);
		}

		if (!gMap || !coords) {
			console.error("Null reference: gMap or coords");
			return;
		}

		setUserCoordinates(coords);

		// addPlaceToMap({
		// 	lat: coords.lat,
		// 	lng: coords.lng,
		// 	name: "Your position",
		// });
		showUserLocation(coords);
	};

	const handleDistanceCalculation = async () => {
		if (
			!selectedMarkers ||
			!mapPolylineRef.current ||
			!mapDistanceMatrixRef.current
		) {
			console.log("No markers are selected");
			return;
		}
		if (selectedMarkers.current.length < 2) {
			console.log("No enough markers are selected");
			return;
		}
		mapPolylineRef.current.setMap(null);

		const markers = selectedMarkers.current;

		const firstPosition = markers[0].position as google.maps.LatLngLiteral;
		const secondPosition = markers[1].position as google.maps.LatLngLiteral;

		if (!firstPosition || !secondPosition) {
			console.log("Error raro");
			return;
		}

		const coords = [
			{ lat: firstPosition.lat, lng: firstPosition.lng },
			{ lat: secondPosition.lat, lng: secondPosition.lng },
		];

		const origin = new google.maps.LatLng(firstPosition.lat, firstPosition.lng);
		const destination = new google.maps.LatLng(
			secondPosition.lat,
			secondPosition.lng,
		);

		const distanceConfig: google.maps.DistanceMatrixRequest = {
			destinations: [origin],
			origins: [destination],
			travelMode: google.maps.TravelMode.DRIVING,
		};

		mapDistanceMatrixRef.current.getDistanceMatrix(
			distanceConfig,
			(response, status) => {
				if (status === google.maps.DistanceMatrixStatus.OK && response) {
					const { distance, duration } = response.rows[0].elements[0];

					const distanceText = distance.text;
					const durationText = duration.text;

					createInfoWindow(
						markers[0],
						`Distance: ${distanceText}<br/>Duration: ${durationText}`,
					);
				}
			},
		);

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
					<Button onClick={loadGMaps}>Load Google Maps</Button>
				</Flex>
			)}
		</>
	);
}

export default GoogleMap;
