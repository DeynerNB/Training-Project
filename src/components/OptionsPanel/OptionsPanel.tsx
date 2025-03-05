import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
	Box,
	Button,
	CheckboxGroup,
	Flex,
	Grid,
	Select,
	Separator,
	Switch,
	Text,
	TextField,
} from "@radix-ui/themes";
import { Accordion } from "radix-ui";
import { useContext, useRef } from "react";

import { FilterContext } from "../../context/FilterContext/FilterContext";
import {
	E_Budget,
	E_type,
	availableAmenities,
} from "../../utils/FiltersOptions.util";

import type { IOptionsPanel } from "./OptionsPanel.interface";
import style from "./OptionsPanel.module.scss";

function OptionsPanel(props: IOptionsPanel) {
	// Set a list of available place types
	const availableTypes = Object.values(E_type);

	// Set a list of available place budgets
	const availableBudgets = Object.values(E_Budget);

	// -- Context variables
	const { setSelectedFilters, setSearchActive } = useContext(FilterContext);

	// -- Ref variables
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const switchFavoritePlacesRef = useRef<boolean>(false);

	// -- Handlers functions
	const handleTypeSelection = (value: E_type) => {
		setSelectedFilters((s) => ({ ...s, type: value }));
	};

	const handleBudgetSelection = (value: E_Budget) => {
		setSelectedFilters((s) => ({ ...s, budget: value }));
	};

	const handleAmmenitiesSelection = (values: string[]) => {
		setSelectedFilters((s) => ({ ...s, ammenities: values }));
	};

	const handleToggleFavorite = () => {
		switchFavoritePlacesRef.current = !switchFavoritePlacesRef.current;
		setSelectedFilters((s) => ({
			...s,
			searchValue: "",
			showFavorites: switchFavoritePlacesRef.current,
		}));
		setSearchActive(true);
	};

	const handleSearch = () => {
		setSelectedFilters((s) => ({
			...s,
			searchValue: searchInputRef.current?.value || "",
			showFavorites: switchFavoritePlacesRef.current,
		}));
		setSearchActive(true);
	};

	const handleResetFilters = () => {
		setSelectedFilters((s) => ({
			...s,
			type: null,
			budget: null,
			ammenities: [],
		}));
	};

	return (
		<Flex
			direction={"column"}
			gap={"3"}
			display={{ initial: "none", sm: "flex" }}
		>
			{/* Search filter */}
			{props.title && (
				<Box height={"80px"}>
					<img
						src="WhereNow Logo.png"
						className={style["app-image"]}
						alt="WhereNow Logo"
					/>
				</Box>
			)}
			<TextField.Root
				size={"3"}
				className={style["search-input"]}
				ref={searchInputRef}
				placeholder="Search"
			/>

			<Flex gap={"2"} align={"center"}>
				<Switch size={"2"} onCheckedChange={handleToggleFavorite} /> Show
				favorites
			</Flex>

			{/* Filters accordion */}
			<Accordion.Root
				type="single"
				onValueChange={handleResetFilters}
				collapsible
			>
				<Accordion.Item className={style["accordion-item"]} value="filters">
					<Accordion.Header className={style["accordion-header"]}>
						<Accordion.Trigger className={style["accordion-trigger"]}>
							Filters
							<ChevronDownIcon
								className={style["accordion-icon"]}
								aria-hidden
							/>
						</Accordion.Trigger>
					</Accordion.Header>
					<Accordion.Content className={style["accordion-content"]}>
						<Grid gap={"3"}>
							{/* Place Type filter */}
							<Text as="label">Place type</Text>
							<Select.Root
								onValueChange={handleTypeSelection}
								defaultValue="all"
							>
								<Select.Trigger aria-label="Select place type" />
								<Select.Content>
									<Select.Group>
										<Select.Item value={"all"}>All</Select.Item>
										{availableTypes.map((valueType) => (
											<Select.Item key={valueType} value={valueType}>
												{valueType}
											</Select.Item>
										))}
									</Select.Group>
								</Select.Content>
							</Select.Root>

							{/* Place Budget filter */}
							<Text as="label">Place budget</Text>
							<Select.Root
								onValueChange={handleBudgetSelection}
								defaultValue="all"
							>
								<Select.Trigger aria-label="Select place budget" />
								<Select.Content>
									<Select.Group>
										<Select.Item value={"all"}>All</Select.Item>
										{availableBudgets.map((valueType) => (
											<Select.Item key={valueType} value={valueType}>
												{valueType}
											</Select.Item>
										))}
									</Select.Group>
								</Select.Content>
							</Select.Root>

							{/* Ammenities filter */}
							<CheckboxGroup.Root onValueChange={handleAmmenitiesSelection}>
								<Text as="label">Ammenities</Text>
								<Flex wrap={"wrap"} gap={"3"}>
									{Object.entries(availableAmenities).map(([key, value]) => (
										<CheckboxGroup.Item
											key={key}
											value={value.label}
											aria-label={value.label}
										>
											<Text as="label" aria-hidden>
												{value.label}
											</Text>
										</CheckboxGroup.Item>
									))}
								</Flex>
							</CheckboxGroup.Root>
						</Grid>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<Button onClick={handleSearch} variant={"surface"}>
				Search
			</Button>

			<Separator size={"4"} />
		</Flex>
	);
}

export default OptionsPanel;
