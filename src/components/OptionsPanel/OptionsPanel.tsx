import {
	Button,
	CheckboxGroup,
	Flex,
	Grid,
	Select,
	Separator,
	Text,
	TextField,
} from "@radix-ui/themes";

import { useContext, useRef } from "react";
import { FilterContext } from "../../context/FilterContext/FilterContext";
import { E_type } from "../../utils/FiltersOptions.util";

import { Accordion } from "radix-ui";
import { availableAmenities } from "../../utils/FiltersOptions.util";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import style from "./OptionsPanel.module.scss";

function OptionsPanel() {
	const availableTypes = Object.values(E_type);

	const { setSelectedFilters, setSearchActive } = useContext(FilterContext);

	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const handleTypeSelection = (value: E_type) => {
		setSelectedFilters((s) => ({ ...s, type: value }));
	};

	const handleAmmenitiesSelection = (values: string[]) => {
		setSelectedFilters((s) => ({ ...s, ammenities: values }));
	};

	const handleSearch = () => {
		setSelectedFilters((s) => ({
			...s,
			searchValue: searchInputRef.current?.value || "",
		}));
		setSearchActive(true);
	};

	const handleResetFilters = () => {
		setSelectedFilters((s) => ({ ...s, type: null, ammenities: [] }));
	};

	return (
		<Flex direction={"column"} gap={"3"}>
			{/* Search filter */}
			<Text as={"span"}>MyMap</Text>
			<TextField.Root ref={searchInputRef} placeholder="Search" />

			<Separator size={"4"} />

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
								<Select.Trigger />
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

							{/* Ammenities filter */}
							<CheckboxGroup.Root onValueChange={handleAmmenitiesSelection}>
								<Text as="label">Ammenities</Text>
								<Flex wrap={"wrap"} gap={"3"}>
									{Object.entries(availableAmenities).map(([key, value]) => (
										<CheckboxGroup.Item key={key} value={value.label}>
											{value.label}
										</CheckboxGroup.Item>
									))}
								</Flex>
							</CheckboxGroup.Root>
						</Grid>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<Button onClick={handleSearch}>Search</Button>
			<Separator size={"4"} />
		</Flex>
	);
}

export default OptionsPanel;
