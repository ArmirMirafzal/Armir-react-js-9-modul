import { ChangeEventHandler } from "react";
import { IEntity } from "types";

interface SelectProps {
	label: string;
	name: string;
	value: string | number;
	onChange?: ChangeEventHandler<HTMLSelectElement>;
	options: IEntity.Genre[];
}

const Select = ({ name, label, value, onChange, options }: SelectProps) => (
	<div className="form-group">
		<label htmlFor={name}>{label}</label>
		<select id={name} name={name} value={value} className="form-select" onChange={onChange}>
			<option value="">--Select Genre--</option>
			{options.map(({ _id, name }) => (
				<option key={_id} value={_id}>
					{name}
				</option>
			))}
		</select>
	</div>
);

export default Select;
