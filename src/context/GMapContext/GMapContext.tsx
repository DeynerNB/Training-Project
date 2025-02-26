import { createContext, useEffect, useState } from "react";
import type { T_GoogleMap } from "../../types/Google.types";
import type { IGMapContext, IGMapProvider } from "./GMapContext.interface";

const defaultValue: IGMapContext = {
	gMap: null,
	setGMap: () => {},
};

// Create the context
export const GMapContext = createContext(defaultValue);

// Create provider
export const GMapProvider = ({ children }: IGMapProvider) => {
	const [gMap, setGMap] = useState<T_GoogleMap | null>(null);

	return (
		<GMapContext.Provider value={{ gMap, setGMap }}>
			{children}
		</GMapContext.Provider>
	);
};
