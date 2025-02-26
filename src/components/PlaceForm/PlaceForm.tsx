import { Button, Dialog, Grid } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext } from "react";
import { GMapContext } from "../../context/GMapContext/GMapContext";
import { PlacesContext } from "../../context/PlacesContext/PlacesContext";
import useForm from "../../hooks/useForm";
import useGoogleMarker from "../../hooks/useGoogleMarker";
import type { IPlace } from "../../interfaces/Places.interface";
import InputForm from "../Shared/InputForm/InputForm";

import geoService from "../../services/Geoservice.service";

function PlaceForm() {
	const [placeName, inputNameValid, handleNameChnage] = useForm({
		initialValue: "Place Name",
		validationFunction: () => true,
	});

	const [placeLat, inputLatValid, handleLatChnage] = useForm({
		initialValue: "9.9947165",
		validationFunction: () => false,
	});

	const [placeLng, inputLngValid, handleLngChnage] = useForm({
		initialValue: "-84.1407853",
		validationFunction: () => true,
	});

	const { addMarker } = useGoogleMarker();

	const { addPlace } = useContext(PlacesContext);

	const { gMap } = useContext(GMapContext);

	const handleAddPlace = () => {
		if (!gMap) {
			console.error("Null reference: gMap");
			return;
		}

		const lat = Number.parseFloat(placeLat);
		const lng = Number.parseFloat(placeLng);

		const placeData: IPlace = {
			name: placeName,
			lat,
			lng,
		};

		addPlace(placeData);

		addMarker(
			{
				map: gMap,
				position: { lat, lng },
				id: placeName,
			},
			geoService,
		);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>Add place</Button>
			</Dialog.Trigger>

			<Dialog.Content>
				<Dialog.Title>Add place</Dialog.Title>

				<Form.Root>
					{/* --> Input: Place Name */}
					<Form.Field name="PlaceName">
						<Form.Label>Name</Form.Label>
						{/* <Form.Message>Please enter the name of the place.</Form.Message> */}

						<Form.Control asChild>
							<InputForm
								inputId="location-name-input"
								inputValue={placeName}
								validState={inputNameValid}
								handleInputChange={handleNameChnage}
							/>
						</Form.Control>
					</Form.Field>

					{/* --> Input: Lat and Lng */}
					<Grid columns={"2"} gapX={"3"}>
						<Form.Field name="LatitudeValue">
							<Form.Label>Latitude</Form.Label>
							{/* <Form.Message>Please enter the VALUE.</Form.Message> */}

							<Form.Control asChild>
								<InputForm
									inputId="latitude-input"
									inputValue={placeLat}
									validState={inputLatValid}
									handleInputChange={handleLatChnage}
								/>
							</Form.Control>
						</Form.Field>
						<Form.Field name="LongitudeValue">
							<Form.Label>Longitude</Form.Label>
							{/* <Form.Message>Please enter the VALUE.</Form.Message> */}

							<Form.Control asChild>
								<InputForm
									inputId="longitude-input"
									inputValue={placeLng}
									validState={inputLngValid}
									handleInputChange={handleLngChnage}
								/>
							</Form.Control>
						</Form.Field>
					</Grid>

					{/* Submit place */}
					<Dialog.Close>
						<Button type={"button"} onClick={handleAddPlace}>
							Add place
						</Button>
					</Dialog.Close>
				</Form.Root>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default PlaceForm;
