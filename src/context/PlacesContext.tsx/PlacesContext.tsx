import { createContext, useState } from "react";
import type { IPlace } from "../../interfaces/Places.interface";
import type { IPlaceContext, IPlacesProvider } from "./PlacesContext.interface";

const defaultValue: IPlaceContext = {
	placesList: [],
	setPlacesList: () => {},
	addPlace: () => {},
};

// Create the context
export const PlacesContext = createContext(defaultValue);

// Create provider
export const PlacesProvider = ({ children }: IPlacesProvider) => {
	const [placesList, setPlacesList] = useState<IPlace[]>([]);

	const addPlace = (placeData: IPlace) => {
		const { name, lat, lng } = placeData;
		setPlacesList([
			...placesList,
			{
				name,
				lat,
				lng,
			},
		]);
	};

	return (
		<PlacesContext.Provider value={{ placesList, setPlacesList, addPlace }}>
			{children}
		</PlacesContext.Provider>
	);
};
