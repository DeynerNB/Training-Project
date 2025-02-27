import { Box } from "@radix-ui/themes";
import { useContext } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";

import { GMapContext } from "../../context/GMapContext/GMapContext";
import type { IPlace } from "../../interfaces/Places.interface";

function PlacesList() {
	const { placesList, removePlaceFromMap } = useContext(GMapContext);

	const handleRemovePlace = (markerId: string) => {
		removePlaceFromMap(markerId);
	};

	return (
		<Box py={"3"}>
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
