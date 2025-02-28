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
}
export enum E_type {
	Café = "Café",
	Bar = "Bar",
	Restaurant = "Restaurant",
	Park = "Park",
	CoWorkingSpace = "Co-working space",
	Other = "Other",
}
export const availableAmenities: IAmenitiesObject = {
	FreeWiFi: { label: "Free Wi-Fi", icon: "" },
	OutdoorSeating: { label: "Outdoor seating", icon: "" },
	PetFriendly: { label: "Pet-friendly", icon: "" },
	LiveMusic: { label: "Live music", icon: "" },
	DanceFloor: { label: "Dance floor", icon: "" },
	ParkingAvailable: { label: "Parking available", icon: "" },
};
