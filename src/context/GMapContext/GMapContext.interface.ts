import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { T_GoogleMap } from "../../types/Google.types";

export interface IGMapProvider {
	children: ReactNode;
}

export interface IGMapContext {
	gMap: T_GoogleMap | null;
	setGMap: Dispatch<SetStateAction<T_GoogleMap | null>>;
}
