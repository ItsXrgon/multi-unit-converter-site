'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import MultiUnitConverter from 'multi-unit-converter';
import ReactSelect from 'react-select';
import UnitSelect from '@/components/UnitSelect';

const muc = new MultiUnitConverter();
type CopyFn = (text: string) => Promise<boolean>; // Return success

export default function Page() {
	const [precision, setPrecision] = useState<string>('3');
	const [selectedTemplate, setSelectedTemplate] = useState<Option | null>(null);

	const [selectedUnits, setSelectedUnits] = useState(muc.units);

	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');

	const copy: CopyFn = async (text) => {
		if (!navigator?.clipboard) {
			return false;
		}

		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (error) {
			return false;
		}
	};

	const templateOptions: Option[] = useMemo(() => {
		return [
			{ value: 'metric', label: 'Metric' },
			{ value: 'imperial', label: 'Imperial' },
			{ value: 'us', label: 'US Customary' },
			{ value: 'recipe', label: 'Recipes' },
		];
	}, []);

	useEffect(() => {
		const timer = setTimeout(
			() => setOutputText(muc.convertText(inputText)),
			500
		);
		return () => {
			clearTimeout(timer);
		};
	}, [inputText, selectedTemplate, precision, selectedUnits]);

	useEffect(() => {
		muc.setPrecision(parseInt(precision));
	}, [precision]);

	const changeTemplate = useCallback(
		(template: string) => {
			switch (template) {
				case 'metric':
					setSelectedUnits({
						...selectedUnits,
						length: muc.lengthUnits.find(
							(u: { name: string }) => u.name === 'meter'
						)!,
						mass: muc.massUnits.find(
							(u: { name: string }) => u.name === 'kilogram'
						)!,
						liquidVolume: muc.liquidVolumeUnits.find(
							(u: { name: string }) => u.name === 'metercubed'
						)!,
						area: muc.areaUnits.find(
							(u: { name: string }) => u.name === 'metersquared'
						)!,
						volume: muc.volumeUnits.find(
							(u: { name: string }) => u.name === 'metercubed'
						)!,
					});
					break;
				case 'imperial':
					setSelectedUnits({
						...selectedUnits,
						length: muc.lengthUnits.find(
							(u: { name: string }) => u.name === 'inch'
						)!,
						mass: muc.massUnits.find(
							(u: { name: string }) => u.name === 'pound'
						)!,
						liquidVolume: muc.liquidVolumeUnits.find(
							(u: { name: string }) => u.name === 'fluidounce'
						)!,
						area: muc.areaUnits.find(
							(u: { name: string }) => u.name === 'feetsquared'
						)!,
						volume: muc.volumeUnits.find(
							(u: { name: string }) => u.name === 'feetcubed'
						)!,
					});
					break;
				case 'us':
					setSelectedUnits({
						...selectedUnits,
						length: muc.lengthUnits.find(
							(u: { name: string }) => u.name === 'feet'
						)!,
						mass: muc.massUnits.find(
							(u: { name: string }) => u.name === 'pound'
						)!,
						liquidVolume: muc.liquidVolumeUnits.find(
							(u: { name: string }) => u.name === 'fluidounce'
						)!,
						area: muc.areaUnits.find(
							(u: { name: string }) => u.name === 'feetsquared'
						)!,
					});
					break;
				case 'recipe':
					setSelectedUnits({
						...selectedUnits,
						mass: muc.massUnits.find(
							(u: { name: string }) => u.name === 'gram'
						)!,
						liquidVolume: muc.liquidVolumeUnits.find(
							(u: { name: string }) => u.name === 'cup'
						)!,
					});
					break;
				default:
					break;
			}
			muc.setTemplate(template);
		},
		[
			muc,
			selectedUnits,
			muc.lengthUnits,
			muc.massUnits,
			muc.liquidVolumeUnits,
			muc.areaUnits,
			muc.volumeUnits,
		]
	);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		if (/^\d*$/.test(value)) {
			setPrecision(value);
		}
	};

	const handleBlur = () => {
		if (precision === '' || parseInt(precision) < 1) {
			setPrecision('1');
		}
	};

	return (
		<div className="flex">
			<div className="units-selector-container">
				<h1 className="units-selector-title">Select Units</h1>
				<div className="settings">
					<div className="unit setting">
						<label>Template</label>
						<ReactSelect
							className="unit-selection-list"
							placeholder={templateOptions[0].label}
							defaultValue={templateOptions[0]}
							value={selectedTemplate}
							options={templateOptions}
							onChange={(option: Option | null) => {
								if (option != null) {
									setSelectedTemplate(option);
									changeTemplate(option.value);
								}
							}}
							isSearchable={true}
						/>
					</div>
					<div className="unit setting">
						<label>Precision</label>
						<input
							className="text-white bg-[#222]"
							type="number"
							id="percision-input"
							value={precision}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
				</div>
				<UnitSelect
					label="Time"
					unit={selectedUnits.time}
					options={muc.timeUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							time: muc.timeUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitTime(unit);
					}}
				/>
				<UnitSelect
					label="Length"
					unit={selectedUnits.length}
					options={muc.lengthUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							length: muc.lengthUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitLength(unit);
					}}
				/>
				<UnitSelect
					label="Mass"
					unit={selectedUnits.mass}
					options={muc.massUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							mass: muc.massUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitMass(unit);
					}}
				/>
				<UnitSelect
					label="Liquid Volume"
					unit={selectedUnits.liquidVolume}
					options={muc.liquidVolumeUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							liquidVolume: muc.liquidVolumeUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitLiquidVolume(unit);
					}}
				/>
				<UnitSelect
					label="Temperature"
					unit={selectedUnits.temperature}
					options={muc.temperatureUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							temperature: muc.temperatureUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitTemperature(unit);
					}}
				/>
				<UnitSelect
					label="Electric Current"
					unit={selectedUnits.electricCurrent}
					options={muc.electricCurrentUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							electricCurrent: muc.electricCurrentUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitElectricCurrent(unit);
					}}
				/>
				<UnitSelect
					label="Pressure"
					unit={selectedUnits.pressure}
					options={muc.pressureUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							pressure: muc.pressureUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitPressure(unit);
					}}
				/>
				<UnitSelect
					label="Energy"
					unit={selectedUnits.energy}
					options={muc.energyUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							energy: muc.energyUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitEnergy(unit);
					}}
				/>
				<UnitSelect
					label="Frequency"
					unit={selectedUnits.frequency}
					options={muc.frequencyUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							frequency: muc.frequencyUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitFrequency(unit);
					}}
				/>
				<UnitSelect
					label="Volume"
					unit={selectedUnits.volume}
					options={muc.volumeUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							volume: muc.volumeUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitVolume(unit);
					}}
				/>
				<UnitSelect
					label="Area"
					unit={selectedUnits.area}
					options={muc.areaUnits}
					onChangeFunction={(unit: string) => {
						setSelectedUnits({
							...selectedUnits,
							area: muc.areaUnits.find(
								(u: { name: string }) => u.name === unit
							)!,
						});
						muc.setUnitArea(unit);
					}}
				/>
			</div>
			<div className="input-output-container">
				<div className="input-container">
					<h1>Input Text</h1>
					<textarea
						className="text-white bg-[#222]"
						rows={18}
						cols={90}
						placeholder="Input text"
						onChange={(e) => setInputText(e.currentTarget.value)}
					/>
				</div>
				<div className="output-container">
					<h1>Output Text</h1>
					<textarea
						className="text-white bg-[#222]"
						id="output"
						readOnly
						rows={18}
						cols={90}
						placeholder="Output text"
						value={outputText}
					/>
					<div className="copy-text-container">
						<button className="copy-text" onClick={() => copy(outputText)}>
							Copy text
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
