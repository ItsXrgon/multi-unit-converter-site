import { useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FaGithub, FaNpm, FaDonate, FaBug } from 'react-icons/fa';
import './MainPage.css';
import { MultiUnitConverter } from 'multi-unit-converter';
import useCopyToClipboard from '../Hooks/useCopyToClipboard';

const muc = new MultiUnitConverter();
function MainPage() {
	const [precision, setPrecision] = useState<string>('3');
	const [selectedTemplate, setSelectedTemplate] = useState<Option | null>(null);

	const [selectedUnits, setSelectedUnits] = useState(muc.units);

	function UnitSelectField({
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
				<Select
					className="unit-selection-list"
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
					onChange={(option: any) => {
						if (option != null) {
							console.log(option.value);
							onChangeFunction(option.value);
						}
					}}
					isSearchable={true}
				/>
			</div>
		);
	}

	const [inputText, setInputText] = useState('');
	const [outputText, setOutputText] = useState('');

	const [, copy] = useCopyToClipboard();

	interface Option {
		value: string;
		label: string;
	}

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
		<>
			<nav>
				<div className="navbar-title">Multi Converter</div>
				<div className="navbar-buttons">
					<a
						href={'https://github.com/itsxrgon/multi-unit-converter/#readme'}
						target="_blank"
						rel="noopener noreferrer"
						title="Github epository"
					>
						<FaGithub />
					</a>
					<a
						href={'https://www.npmjs.com/package/multi-unit-converter'}
						target="_blank"
						rel="noopener noreferrer"
						title="NPM module page"
					>
						<FaNpm />
					</a>
					<a href={''} target="_blank" rel="noopener noreferrer" title="donate">
						<FaDonate />
					</a>
					<a
						href={'https://github.com/ItsXrgon/multi-unit-converter/issues'}
						target="_blank"
						rel="noopener noreferrer"
						title="Report a bug"
					>
						<FaBug />
					</a>
				</div>
			</nav>
			<main className="unit-converter">
				<div className="units-selector-container">
					<h1 className="units-selector-title">Select Units</h1>
					<div className="settings">
						<div className="unit setting">
							<label>Template</label>
							<Select
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
								type="number"
								id="percision-input"
								value={precision}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>
					</div>
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
					<UnitSelectField
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
							rows={18}
							cols={90}
							placeholder="Input text"
							onChange={(e) => setInputText(e.currentTarget.value)}
						/>
					</div>
					<div className="output-container">
						<h1>Output Text</h1>
						<textarea
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
			</main>
			<footer>
				<p id="copyright">
					<Link to="/about">About Multi Unit Converter</Link>
					<br />
					Made by <a href="https://github.com/ItsXrgon">Xrgon</a>.
				</p>
			</footer>
		</>
	);
}

document.documentElement.classList.add('dark');

export default MainPage;
