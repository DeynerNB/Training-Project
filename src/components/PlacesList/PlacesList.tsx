import {
	Box,
	Dialog,
	Flex,
	Grid,
	type GridProps,
	IconButton,
	Text,
} from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";

import { FilterContext } from "../../context/FilterContext/FilterContext";
// Context import
import { GMapContext } from "../../context/GMapContext/GMapContext";

// Interface import
import type { IPlace } from "../../interfaces/Places.interface";

import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import OptionsPanel from "../OptionsPanel/OptionsPanel";
// Component and style imports
import PlaceCard from "../PlaceCard/PlaceCard";
import style from "./PlacesList.module.scss";

function PlacesList() {
	// -- Context variables
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	const { selectedFilters, searchActive, setSearchActive } =
		useContext(FilterContext);

	// -- State variables
	const [displayList, setDisplayList] = useState<IPlace[]>([...placesList]);

	const [showDialogList, setShowDialogList] = useState<boolean>(false);

	// -- UseEffects functions
	// Update the display list
	useEffect(() => {
		setDisplayList([...placesList]);
	}, [placesList]);

	// Update the display list based on filters options
	useEffect(() => {
		if (searchActive) {
			let currentList = [...placesList];

			// Filter by search
			if (selectedFilters.searchValue !== "") {
				const pattern = new RegExp(selectedFilters.searchValue, "gi");

				currentList = currentList.filter((place) => pattern.test(place.name));
			}
			// Filter by favorite
			if (selectedFilters.showFavorites) {
				currentList = currentList.filter((place) => place.isFavorite);
			}
			// Filter by type
			if (selectedFilters.type && (selectedFilters.type as string) !== "all") {
				currentList = currentList.filter(
					(place) => place.category_type === selectedFilters.type,
				);
			}
			// Filter by budget
			if (
				selectedFilters.budget &&
				(selectedFilters.budget as string) !== "all"
			) {
				currentList = currentList.filter(
					(place) => place.categoryBudget === selectedFilters.budget,
				);
			}
			// Filter by amenities
			if (selectedFilters.ammenities.length > 0) {
				currentList = currentList.filter((place) =>
					place.category_ammenities?.some((amenity) =>
						selectedFilters.ammenities.includes(amenity.label),
					),
				);
			}

			// Update the display list
			setDisplayList([...currentList]);
			setSearchActive(false);
		}
	}, [searchActive, selectedFilters, setSearchActive, placesList]);

	// -- Handlers functions
	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	// -- Handlers functions
	const closeDialog = () => {
		setShowDialogList(false);
	};

	const generateCards = (attributes: GridProps) => {
		return displayList.length > 0 ? (
			<Grid {...attributes}>
				{displayList.map((place: IPlace) => {
					return (
						<PlaceCard
							key={place.name}
							placeData={place}
							handleRemovePlace={handleRemovePlace}
							closeDialog={closeDialog}
						/>
					);
				})}
			</Grid>
		) : (
			<Box pt={{ initial: "3", sm: "2" }} height={"100%"}>
				<Flex
					p={"3"}
					height={"100%"}
					direction={"column"}
					justify={"center"}
					align={"center"}
					className={style["container-no-places-yet"]}
				>
					<Text align={"center"} as={"p"}>
						There are no places added yet.
					</Text>
					<Text align={"center"} as={"p"}>
						To add one, click the place you want to add on the map.
					</Text>
				</Flex>
			</Box>
		);
	};

	return (
		<>
			<Box display={{ initial: "none", sm: "block" }} overflow={"scroll"}>
				{generateCards({
					py: "1",
					gap: "3",
					rows: "repeat(auto-fill, 350px)",
				})}
			</Box>
			<Box display={{ initial: "block", sm: "none" }}>
				<Dialog.Root
					open={showDialogList}
					onOpenChange={() => {
						if (showDialogList) {
							setShowDialogList(false);
						}
					}}
				>
					<Dialog.Trigger onClick={() => setShowDialogList(true)}>
						<Box
							position={"absolute"}
							top={"3"}
							left={"3"}
							style={{ zIndex: 20 }}
						>
							<IconButton size={"3"} aria-label="Menu">
								<HamburgerMenuIcon className="default-icon" />
							</IconButton>
						</Box>
					</Dialog.Trigger>

					<Dialog.Content>
						<Dialog.Title align={"center"}>Saved places</Dialog.Title>
						<Box>
							<OptionsPanel />
						</Box>

						{generateCards({
							mt: "3",
							py: "3",
							gap: "3",
							overflowY: "scroll",
							rows: "repeat(auto-fill, 350px)",
							maxHeight: "600px",
						})}

						<Dialog.Close>
							<Box position={"absolute"} top={"3"} right={"4"}>
								<IconButton color={"ruby"} variant={"ghost"}>
									<Cross2Icon className="default-icon" />
								</IconButton>
							</Box>
						</Dialog.Close>
					</Dialog.Content>
				</Dialog.Root>
			</Box>
		</>
	);
}

export default PlacesList;
