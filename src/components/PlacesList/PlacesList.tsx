import { Box } from "@radix-ui/themes";
import { useContext, useEffect } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlace } from "../../interfaces/Places.interface";

function PlacesList() {
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	useEffect(() => {
		console.log("fiesta", placesList);
	}, [placesList]);

	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	return (
		<Box p={"3"}>
			{placesList.map((place: IPlace) => {
				return (
					<PlaceCard
						key={place.name}
						placeData={place}
						handleRemovePlace={handleRemovePlace}
					/>
				);
			})}
		</Box>
	);
}

export default PlacesList;
