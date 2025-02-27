import { Button, Grid } from "@radix-ui/themes";
import { Dialog } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext, useEffect } from "react";
import { GMapContext } from "../../../context/GMapContext/GMapContext";
import useForm from "../../../hooks/useForm";
import type { IPlaceData } from "../../../interfaces/Places.interface";
import InputForm from "../../Shared/InputForm/InputForm";
import type { IDialogForm } from "./DialogForm.interface";

function DialogForm({ coords, openPlaceForm, setOpenPlaceForm }: IDialogForm) {
	const [placeName, inputNameValid, handleNameChnage] = useForm({
		initialValue: "",
		validationFunction: () => true,
	});

	const [placeLat, inputLatValid, handleLatChnage, setPlaceLat] = useForm({
		initialValue: "",
		validationFunction: () => false,
	});

	const [placeLng, inputLngValid, handleLngChnage, setPlaceLng] = useForm({
		initialValue: "",
		validationFunction: () => true,
	});

	useEffect(() => {
		if (!coords || !coords.lat || !coords.lng) {
			// console.error("Null reference: coords or lat or lng");
			return;
		}

		setPlaceLat(coords.lat.toFixed(7));
		setPlaceLng(coords.lng.toFixed(7));
	}, [coords, setPlaceLat, setPlaceLng]);

	const { addPlaceToMap } = useContext(GMapContext);

	const handleAddPlace = () => {
		const lat = Number.parseFloat(placeLat);
		const lng = Number.parseFloat(placeLng);

		const placeData: IPlaceData = {
			name: placeName,
			lat,
			lng,
		};

		addPlaceToMap(placeData);
	};

	return (
		<Dialog.Root
			open={openPlaceForm}
			onOpenChange={() => {
				setOpenPlaceForm(false);
			}}
		>
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
					<Dialog.Close>
						<Button type={"button"} onClick={() => setOpenPlaceForm(false)}>
							Close
						</Button>
					</Dialog.Close>
				</Form.Root>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default DialogForm;
