import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";

import { FilterContext } from "../../context/FilterContext/FilterContext";
// Context import
import { GMapContext } from "../../context/GMapContext/GMapContext";

// Interface import
import type { IPlace } from "../../interfaces/Places.interface";

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

	// -- Handlers functions
	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

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
				currentList = currentList.filter(
					(place) => place.name === selectedFilters.searchValue,
				);
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

	return (
		<>
			{/* If no places yet -> Display a message */}
			{displayList.length === 0 ? (
				<Box>
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
			) : (
				<Grid
					p={"3"}
					gap={"3"}
					overflowY={"scroll"}
					rows={"repeat(auto-fill, 300px)"}
				>
					{displayList.map((place: IPlace) => {
						return (
							<PlaceCard
								key={place.name}
								placeData={place}
								handleRemovePlace={handleRemovePlace}
							/>
						);
					})}
				</Grid>
			)}
		</>
	);
}

export default PlacesList;
