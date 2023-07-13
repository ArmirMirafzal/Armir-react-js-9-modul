import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
	label: string;
	name: string;
	value: string | number;
	type?: HTMLInputTypeAttribute;
	onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ name, label, type, value, onChange }: InputProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<input
			required
			className="form-control"
			type={type}
			id={name}
			name={name}
			value={value}
			onChange={onChange}
		/>
	</div>
);

export default Input;
