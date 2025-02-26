import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
} from "react";

interface MarkersListProviderInterface {
	children: ReactNode;
}

interface MarkerItemList {
	name: string;
	marker: google.maps.marker.AdvancedMarkerElement;
}

const defaultValue: {
	markersList: MarkerItemList[];
	setMarkersList: Dispatch<SetStateAction<MarkerItemList[]>>;
} = {
	markersList: [],
	setMarkersList: () => {},
};

// Create Context
export const MarkersListContext = createContext(defaultValue);

// Create Provider Component
export const MarkersListProvider = ({
	children,
}: MarkersListProviderInterface) => {
	const [markersList, setMarkersList] = useState<MarkerItemList[]>([]);

	return (
		<MarkersListContext.Provider value={{ markersList, setMarkersList }}>
			{children}
		</MarkersListContext.Provider>
	);
};
