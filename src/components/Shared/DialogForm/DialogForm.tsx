import { Button, Dialog, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext, useEffect } from "react";
import { GMapContext } from "../../../context/GMapContext/GMapContext";
// import useForm from "../../../hooks/useForm";
import type { IPlaceData } from "../../../interfaces/Places.interface";
import InputForm from "../../Shared/InputForm/InputForm";
import type { IDialogForm } from "./DialogForm.interface";

import { type SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
	name: string;
	lat: string;
	lng: string;
};

function DialogForm({ coords, openPlaceForm, setOpenPlaceForm }: IDialogForm) {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, dirtyFields },
	} = useForm<Inputs>({
		defaultValues: {
			lat: coords.lat.toFixed(7),
			lng: coords.lng.toFixed(7),
		},
	});
	console.log("dirtyFields: ", dirtyFields);
	console.log("errors: ", errors);
	// const {
	// 	register,
	// 	handleSubmit,
	// 	watch,
	// 	formState: { errors },
	// } = useForm({});

	const { addPlaceToMap } = useContext(GMapContext);

	useEffect(() => {
		setValue("lat", coords.lat.toFixed(7));
		setValue("lng", coords.lng.toFixed(7));
	}, [coords, setValue]);

	const onSubmit: SubmitHandler<Inputs> = (data) => {
		// const onSubmit = (data: Inputs) => {
		const { name, lat, lng } = data;

		console.log("on submit");

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
				setOpenPlaceForm(false);
			}}
		>
			<Dialog.Content aria-describedby="add-place-form-description">
				<Dialog.Title>Place details</Dialog.Title>

				<Dialog.Description my={"2"} id="add-place-form-description">
					Add relevant information about this place.
				</Dialog.Description>

				<Form.Root onSubmit={handleSubmit((data) => onSubmit(data))}>
					{/* --> Input: Place Name */}
					<Grid gap={"3"}>
						<Form.Field name="PlaceName">
							<Flex align={"baseline"} justify={"between"}>
								<Form.Label>Name</Form.Label>
								{errors.name && (
									<Form.Message>
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
								{errors.lat && (
									<Form.Message>
										Please enter the latitude of the place.
									</Form.Message>
								)}

								<Form.Control asChild>
									<TextField.Root
										type="number"
										step="0.000000001"
										// defaultValue={coords.lat.toFixed(7)}
										{...register("lat")}
									/>
								</Form.Control>
							</Form.Field>
							<Form.Field name="LongitudeValue">
								<Form.Label>Longitude</Form.Label>
								{errors.lng && (
									<Form.Message>
										Please enter the longitude of the place.
									</Form.Message>
								)}

								<Form.Control asChild>
									<TextField.Root
										type="text"
										// defaultValue={coords.lng.toFixed(7)}
										{...register("lng", { required: true })}
									/>
								</Form.Control>
							</Form.Field>
						</Grid>
					</Grid>

					{/* Submit place */}
					<Flex mt={"3"} gap={"3"} justify={"end"}>
						<Button type={"submit"}>Add place</Button>
						{/* <input type="submit" value="Add" /> */}
						<Dialog.Close>
							<Button type={"button"} onClick={() => setOpenPlaceForm(false)}>
								Close
							</Button>
						</Dialog.Close>
					</Flex>
				</Form.Root>
				{/* 
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="name">Name</label>
					<input
						id="name"
						{...register("name", { required: true, maxLength: 30 })}
					/>
					{errors.name && errors.name.type === "required" && (
						
					
						<span>This is required</span>
					)}
					{errors.name && errors.name.type === "maxLength" && (
						
					
						<span>Max length exceeded</span>
					)}
					<input type="submit" />
				</form> */}
			</Dialog.Content>
		</Dialog.Root>
	);
}

export default DialogForm;
