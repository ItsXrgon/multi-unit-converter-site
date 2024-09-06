import ReactSelect, { SingleValue } from 'react-select';

export default function UnitSelect({
	label,
	unit,
	options,
	onChangeFunction,
}: {
	label: string;
	unit: {
		name: string;
		label: string;
	};
	options: {
		name: string;
		label: string;
	}[];
	onChangeFunction: (unit: string) => void;
}) {
	return (
		<div className="unit">
			<label>{label}</label>
			<ReactSelect
				className="text-black mt-[2px]"
				value={{
					value: unit.name,
					label: unit.label,
				}}
				options={options.map((option) => {
					return {
						value: option.name,
						label: option.label,
					};
				})}
				onChange={(option: SingleValue<{ value: string; label: string }>) => {
					if (option != null) {
						onChangeFunction(option.value);
					}
				}}
				isSearchable={true}
			/>
		</div>
	);
}
