import { Button, DropdownMenu } from "@radix-ui/themes";
import type { IDrowdownMenuCategory } from "./DrowdownMenuCategory.interface";

function DrowdownMenuCategory({
	filter_title,
	filter_options,
}: IDrowdownMenuCategory) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button>
					{filter_title}
					<DropdownMenu.TriggerIcon />
				</Button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Content>
				{filter_options.map((option) => (
					<DropdownMenu.Item key={option}>{option}</DropdownMenu.Item>
				))}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default DrowdownMenuCategory;
