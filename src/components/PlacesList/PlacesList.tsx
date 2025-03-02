import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import { useContext, useEffect, useState } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlace } from "../../interfaces/Places.interface";

import { FilterContext } from "../../context/FilterContext/FilterContext";
import style from "./PlacesList.module.scss";

function PlacesList() {
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	const { selectedFilters, searchActive, setSearchActive } =
		useContext(FilterContext);

	const [displayList, setDisplayList] = useState<IPlace[]>([...placesList]);

	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	useEffect(() => {
		setDisplayList([...placesList]);
	}, [placesList]);

	useEffect(() => {
		if (searchActive) {
			let currentList = [...placesList];

			// Filter by search
			if (selectedFilters.searchValue !== "") {
				console.log("Filter by search");
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
				console.log("Filter by search");
				currentList = currentList.filter(
					(place) => place.category_type === selectedFilters.type,
				);
			}
			// Filter by amenities
			if (selectedFilters.ammenities.length > 0) {
				console.log("Filter by amenities");
				currentList = currentList.filter((place) =>
					place.category_ammenities?.some((amenity) =>
						selectedFilters.ammenities.includes(amenity.label),
					),
				);
			}
			console.log("currentList: ", currentList);
			setDisplayList([...currentList]);
			setSearchActive(false);
		}
	}, [searchActive, selectedFilters, setSearchActive, placesList]);

	return (
		<>
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
