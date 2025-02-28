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
	FreeWiFi: { label: "Free Wi-Fi", icon: "wifi" },
	OutdoorSeating: { label: "Outdoor seating", icon: "nature" },
	PetFriendly: { label: "Pet-friendly", icon: "pets" },
	LiveMusic: { label: "Live music", icon: "music_note" },
	DanceFloor: { label: "Dance floor", icon: "nightlife" },
	ParkingAvailable: { label: "Parking available", icon: "directions_car" },
};
