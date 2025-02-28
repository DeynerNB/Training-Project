import { Button, Dialog, Flex, Grid, TextField } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext, useEffect } from "react";

import { GMapContext } from "../../../context/GMapContext/GMapContext";

import { type SubmitHandler, useForm } from "react-hook-form";
import type { IPlaceData } from "../../../interfaces/Places.interface";
import type { IDialogForm } from "./DialogForm.interface";

import style from "./DialogForm.module.scss";

// Define the inputs and their types
type Inputs = {
	name: string;
	lat: string;
	lng: string;
};

function DialogForm({ coords, openPlaceForm, setOpenPlaceForm }: IDialogForm) {
	const {
		register,
		handleSubmit,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<Inputs>();

	const { addPlaceToMap } = useContext(GMapContext);

	useEffect(() => {
		setValue("lat", coords.lat.toFixed(7));
		setValue("lng", coords.lng.toFixed(7));
	}, [coords, setValue]);

	// Handle the place information to be added
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const { name, lat, lng } = data;

		const placeData: IPlaceData = {
			name,
			lat: Number.parseFloat(lat),
			lng: Number.parseFloat(lng),
		};
		addPlaceToMap(placeData);
		setOpenPlaceForm(false);
	};

	return (
		<Dialog.Root
			open={openPlaceForm}
			onOpenChange={() => {
				clearErrors("name");
				clearErrors("lat");
				clearErrors("lng");

				setOpenPlaceForm(false);
			}}
		>
			<Dialog.Content aria-describedby="add-place-form-description">
				<Dialog.Title>Place details</Dialog.Title>

				<Dialog.Description my={"2"} id="add-place-form-description">
					Add relevant information about this place.
				</Dialog.Description>

				<Form.Root onSubmit={handleSubmit(onSubmit)}>
					{/* --> Input: Place Name */}
					<Grid gap={"3"}>
						<Form.Field name="PlaceName">
							<Flex align={"baseline"} justify={"between"}>
								<Form.Label>Name</Form.Label>
								{errors.name && (
									<Form.Message className={style["label--invalid"]}>
										Please enter the name of the place.
									</Form.Message>
								)}
							</Flex>

							<Form.Control asChild>
								<TextField.Root {...register("name", { required: true })} />
							</Form.Control>
						</Form.Field>

						{/* --> Input: Lat and Lng */}
						<Grid columns={"2"} gapX={"3"}>
							<Form.Field name="lat">
								<Form.Label>Latitude</Form.Label>
								<Form.Control asChild>
									<TextField.Root
										type="text"
										{...register("lat", {
											required: true,
											pattern: /^-?\d+(\.\d+)?$/i,
										})}
									/>
								</Form.Control>

								{errors.lat?.type === "pattern" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter a valid latitude value.
									</Form.Message>
								)}
								{errors.lat?.type === "required" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter the latitude of the place.
									</Form.Message>
								)}
							</Form.Field>
							<Form.Field name="LongitudeValue">
								<Form.Label>Longitude</Form.Label>
								<Form.Control asChild>
									<TextField.Root
										type="text"
										{...register("lng", {
											required: true,
											pattern: /^-?\d+(\.\d+)?$/i,
										})}
									/>
								</Form.Control>

								{errors.lng && (
									<Form.Message className={style["label--invalid"]}>
										Please enter the longitude of the place.
									</Form.Message>
								)}
							</Form.Field>
						</Grid>
					</Grid>

					{/* Submit place */}
					<Flex mt={"5"} gap={"3"} justify={"end"}>
						<Button type={"submit"}>Add place</Button>
						<Dialog.Close>
							<Button type={"button"} onClick={() => setOpenPlaceForm(false)}>
								Close
							</Button>
						</Dialog.Close>
					</Flex>
				</Form.Root>
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default DialogForm;
