export interface IInputFormProps {
	inputId: string;
	inputValue: string;
	validState: boolean;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
