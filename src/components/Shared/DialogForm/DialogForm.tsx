import {
	Box,
	Button,
	Dialog,
	Flex,
	Grid,
	IconButton,
	TextArea,
	TextField,
} from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useContext, useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { GMapContext } from "../../../context/GMapContext/GMapContext";

import type { IPlaceData } from "../../../interfaces/Places.interface";
import {
	type IAmenities,
	availableAmenities,
} from "../../../utils/FiltersOptions.util";
import { E_Categories, E_type } from "../../../utils/FiltersOptions.util";

import type { Inputs } from "./DialogForm.interface";
import type { IDialogForm } from "./DialogForm.interface";

import { Cross1Icon } from "@radix-ui/react-icons";
import CheckboxCategory from "../CheckboxCategory/CheckboxCategory";
import SelectCategory from "../SelectCategory/SelectCategory";
import style from "./DialogForm.module.scss";

function DialogForm({ coords, openPlaceForm, setOpenPlaceForm }: IDialogForm) {
	// Regex to validate the lat and lng values
	const inputRegexPattern = /^-?\d+(\.\d+)?$/i;

	// React Hook Form variables
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		clearErrors,
		formState: { errors },
		control,
	} = useForm<Inputs>();

	// Function to add a new place to the map
	const { addPlaceToMap } = useContext(GMapContext);

	// Variables to store all images url uploaded
	const [placeImagesURLs, setPlaceImagesURLs] = useState<string[]>([]);

	// Variable to store all selected amenities
	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

	// Initialize the input default values
	useEffect(() => {
		setValue("placeName", "");
		setValue("lat", coords.lat.toFixed(7));
		setValue("lng", coords.lng.toFixed(7));
		setValue("categoryType", Object.values(E_type)[0]);
	}, [coords, setValue]);

	// Handle the place information to be added
	const onSubmit: SubmitHandler<Inputs> = (data) => {
		const { placeName, lat, lng, description, categoryType } = data;

		const ammenitiesObject: IAmenities[] = [];

		for (const ammenityKey of selectedAmenities) {
			ammenitiesObject.push(availableAmenities[ammenityKey]);
		}

		const placeData: IPlaceData = {
			name: placeName,
			lat: Number.parseFloat(lat),
			lng: Number.parseFloat(lng),
			description,
			images: [...placeImagesURLs],
			category_type: categoryType,
			category_ammenities: [...ammenitiesObject],
			isFavority: false,
		};
		addPlaceToMap(placeData);
		setOpenPlaceForm(false);
	};

	// Handle the image input
	const handleAddImageURL = () => {
		const imageURL = getValues("imageURL");

		if (
			imageURL.length > 0 &&
			placeImagesURLs.length < 3 &&
			!placeImagesURLs.includes(imageURL)
		) {
			setPlaceImagesURLs([...placeImagesURLs, imageURL]);
		}
	};

	const handleImageRemove = (url: string) => {
		setPlaceImagesURLs(placeImagesURLs.filter((imageUrl) => imageUrl !== url));
	};

	return (
		<Dialog.Root
			open={openPlaceForm}
			onOpenChange={() => {
				clearErrors("placeName");
				clearErrors("lat");
				clearErrors("lng");

				setOpenPlaceForm(false);
			}}
		>
			<Dialog.Content
				maxWidth={placeImagesURLs.length > 0 ? "800px" : "600px"}
				aria-describedby="add-place-form-description"
			>
				<Dialog.Title>Place details</Dialog.Title>

				<Dialog.Description my={"2"} id="add-place-form-description">
					Add relevant information about this place.
				</Dialog.Description>

				<Form.Root onSubmit={handleSubmit(onSubmit)}>
					<Grid
						columns={placeImagesURLs.length > 0 ? "1fr 200px" : "1fr"}
						gap={"3"}
					>
						<Grid gap={"3"}>
							{/* --> Input: Place Name */}
							<Form.Field name="PlaceName">
								<Flex align={"baseline"} justify={"between"}>
									<Form.Label className={style["label--required"]}>
										Name
									</Form.Label>
									{/* Error message when name is not provided */}
									{errors.placeName && (
										<Form.Message className={style["label--invalid"]}>
											Please enter the name of the place.
										</Form.Message>
									)}
								</Flex>

								<Form.Control asChild>
									<TextField.Root
										{...register("placeName", { required: true })}
									/>
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

							{/* --> Input: Place categories */}
							<SelectCategory
								labelValue="Place type"
								filter_title={E_Categories.categoryType}
								filter_options={E_type}
								control={control}
							/>

							<CheckboxCategory
								labelValue="Amenities"
								filterTitle={E_Categories.categoryAmenities}
								filterOptions={availableAmenities}
								selectedAmenities={selectedAmenities}
								setSelectedAmenities={setSelectedAmenities}
							/>
						</Grid>

						{/* --> Images Grid */}
						<Grid rows={"3"} py={"2"} gap={"2"}>
							{placeImagesURLs.map((url: string) => (
								<Box key={Math.random().toString()} position={"relative"}>
									<img
										style={{ height: "100%", objectFit: "cover" }}
										src={url}
										alt=""
									/>
									<Box position={"absolute"} top={"1"} right={"1"}>
										<IconButton onClick={() => handleImageRemove(url)}>
											<Cross1Icon />
										</IconButton>
									</Box>
								</Box>
							))}
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
