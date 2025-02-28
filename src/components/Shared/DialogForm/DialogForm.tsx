import {
	Button,
	Dialog,
	Flex,
	Grid,
	TextArea,
	TextField,
} from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext, useEffect, useState } from "react";

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
	description: string;
	imageURL: string;
};

function DialogForm({ coords, openPlaceForm, setOpenPlaceForm }: IDialogForm) {
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		clearErrors,
		formState: { errors },
	} = useForm<Inputs>();

	const { addPlaceToMap } = useContext(GMapContext);

	const [placeImagesURLs, setPlaceImagesURLs] = useState<string[]>([]);

	useEffect(() => {
		setValue("lat", coords.lat.toFixed(7));
		setValue("lng", coords.lng.toFixed(7));
	}, [coords, setValue]);

	// Validate the lat and lng input
	const inputRegexPattern = /^-?\d+(\.\d+)?$/i;

	// Handle the place information to be added
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const { name, lat, lng, description } = data;

		const placeData: IPlaceData = {
			name,
			lat: Number.parseFloat(lat),
			lng: Number.parseFloat(lng),
			description,
			images: [...placeImagesURLs],
		};
		addPlaceToMap(placeData);
		setOpenPlaceForm(false);
	};

	const handleAddImageURL = () => {
		const imageURL = getValues("imageURL");

		if (imageURL.length > 0) {
			setPlaceImagesURLs([...placeImagesURLs, imageURL]);
		}
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
					<Grid gap={"3"}>
						{/* --> Input: Place Name */}
						<Form.Field name="PlaceName">
							<Flex align={"baseline"} justify={"between"}>
								<Form.Label className={style["label--required"]}>
									Name
								</Form.Label>
								{/* Error message when name is not provided */}
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

						<Grid columns={"2"} gapX={"3"}>
							{/* --> Input: Lat Place */}
							<Form.Field name="lat">
								<Form.Label className={style["label--required"]}>
									Latitude
								</Form.Label>
								<Form.Control asChild>
									<TextField.Root
										type="text"
										{...register("lat", {
											required: true,
											pattern: inputRegexPattern,
										})}
									/>
								</Form.Control>

								{/* Error message when lat is not valid */}
								{errors.lat?.type === "pattern" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter a valid latitude value.
									</Form.Message>
								)}
								{/* Error message when lat is not provided */}
								{errors.lat?.type === "required" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter the latitude of the place.
									</Form.Message>
								)}
							</Form.Field>

							{/* --> Input: Lng Place */}
							<Form.Field name="LongitudeValue">
								<Form.Label className={style["label--required"]}>
									Longitude
								</Form.Label>
								<Form.Control asChild>
									<TextField.Root
										type="text"
										{...register("lng", {
											required: true,
											pattern: inputRegexPattern,
										})}
									/>
								</Form.Control>

								{/* Error message when lng is not valid */}
								{errors.lng?.type === "pattern" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter a valid longitude value.
									</Form.Message>
								)}
								{/* Error message when lng is not provided */}
								{errors.lng?.type === "required" && (
									<Form.Message className={style["label--invalid"]}>
										Please enter the longitude of the place.
									</Form.Message>
								)}
							</Form.Field>
						</Grid>

						{/* --> Input: Place Description */}
						<Form.Field name="PlaceDescription">
							<Form.Label>Description</Form.Label>

							<Form.Control asChild>
								<TextArea {...register("description")} />
							</Form.Control>
						</Form.Field>

						{/* --> Input: Place Images */}
						<Form.Field name="PlaceImage">
							<Form.Label>Images</Form.Label>

							<Flex gap={"3"}>
								<TextField.Root
									style={{ width: "100%" }}
									{...register("imageURL", { required: false })}
								/>
								<Button type="button" onClick={handleAddImageURL}>
									Add
								</Button>
							</Flex>
						</Form.Field>
					</Grid>

					{/* --> Images Grid */}
					<Grid columns={"3"} py={"2"}>
						{placeImagesURLs.map((url: string) => (
							<img
								key={Math.random().toString()}
								style={{ objectFit: "contain" }}
								src={url}
								alt=""
							/>
						))}
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
