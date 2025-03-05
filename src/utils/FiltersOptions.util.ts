export interface IAmenities {
	label: string;
	icon: string;
}

export interface IAmenitiesObject {
	[key: string]: IAmenities;
}

export enum E_Categories {
	categoryType = "categoryType",
	categoryAmenities = "categoryAmenities",
	categoryBudget = "categoryBudget",
}
export enum E_type {
	Cafe = "Café",
	Bar = "Bar",
	Games = "Arcade/Games",
	Restaurant = "Restaurant",
	Park = "Park",
	Mall = "Mall",
	MovieTheater = "Movie Theater ",
	CoWorkingSpace = "Co-working space",
	Other = "Other",
}

export enum E_Budget {
	Free = "Free",
	Low = "$ (Low)",
	Medium = "$$ (Moderate)",
	High = "$$$ (High)",
}
export const availableAmenities: IAmenitiesObject = {
	FreeWiFi: { label: "Free Wi-Fi", icon: "wifi" },
	OutdoorSeating: { label: "Outdoor seating", icon: "nature" },
	PetFriendly: { label: "Pet-friendly", icon: "pets" },
	LiveMusic: { label: "Live music", icon: "music_note" },
	DanceFloor: { label: "Dance floor", icon: "nightlife" },
	ParkingAvailable: { label: "Parking available", icon: "directions_car" },
};
