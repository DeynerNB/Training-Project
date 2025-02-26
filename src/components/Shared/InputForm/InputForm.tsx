import { Flex, TextField } from "@radix-ui/themes";
import type { IInputFormProps } from "./InputForm.interface";

function InputForm(props: IInputFormProps) {
	const { inputId, inputValue, validState, handleInputChange } = props;

	return (
		<Flex direction={"column"} py={"3"} gap={"2"}>
			<TextField.Root
				id={inputId}
				placeholder="Placeholder"
				value={inputValue}
				onChange={handleInputChange}
				color={validState ? "indigo" : "red"}
			/>
		</Flex>
	);
}

export default InputForm;
