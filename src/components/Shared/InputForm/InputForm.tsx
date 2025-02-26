import { Flex, TextField } from "@radix-ui/themes";
import type { IInputFormProps } from "./InputForm.interface";

function InputForm(props: IInputFormProps) {
	const { inputLabel, inputId } = props;

	return (
		<Flex direction={"column"} py={"3"} gap={"2"}>
			<label htmlFor={inputId}>{inputLabel}</label>
			<TextField.Root id={inputId} placeholder="Placeholder" />
		</Flex>
	);
}

export default InputForm;
