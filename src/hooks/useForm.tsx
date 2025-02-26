import { useState } from "react";

type FormState = {
	initialValue: string;
	validationFunction: (value: string) => boolean;
};

const useForm = (formState: FormState) => {
	const { initialValue, validationFunction } = formState;

	const [value, setValue] = useState(initialValue);
	const [validState, setValidState] = useState(true);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const input_value = event.target.value;

		setValidState(validationFunction(input_value));
		setValue(input_value);
	};

	return [value, validState, handleInputChange] as const;
};

export default useForm;
