import { Table } from "@radix-ui/themes";

function PlacesList() {
	return (
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeaderCell>My Places</Table.ColumnHeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body>
				<Table.Row>
					<Table.Cell>Place #1</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	);
}

export default PlacesList;
