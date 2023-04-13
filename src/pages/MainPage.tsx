import { useEffect, useState } from 'react'
import Select from 'react-select';
import { Link } from "react-router-dom";
import { FaGithub, FaNpm, FaDonate, FaBug } from "react-icons/fa";
import './MainPage.css'
import MultiUnitConverter from 'multi-unit-converter'
import useCopyToClipboard from '../Hooks/useCopyToClipboard';

const muc = new MultiUnitConverter();

function MainPage() {

    const [precision, setPrecision] = useState<string>("3");
    const [selectedTemplate, setSelectedTemplate] = useState<Option | null>(null);

    const [selectedTime, setSelectedTime] = useState<Option | null>(null);
    const [selectedLength, setSelectedLength] = useState<Option | null>(null);
    const [selectedWeight, setSelectedWeight] = useState<Option | null>(null);
    const [selectedLiquid, setSelectedLiquid] = useState<Option | null>(null);
    const [selectedTemperature, setSelectedTemperature] = useState<Option | null>(null);
    const [selectedElectric, setSelectedElectric] = useState<Option | null>(null);
    const [selectedSpoons, setSelectedSpoons] = useState<Option | null>(null);
    const [selectedPressure, setSelectedPressure] = useState<Option | null>(null);
    const [selectedEnergy, setSelectedEnergy] = useState<Option | null>(null);
    const [selectedFrequency, setSelectedFrequency] = useState<Option | null>(null);
    const [selectedVolume, setSelectedVolume] = useState<Option | null>(null);
    const [selectedArea, setSelectedArea] = useState<Option | null>(null);

    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const [, copy] = useCopyToClipboard();

    interface Option {
        value: string,
        label: string
    }

    const templateOptions: Option[] = [
        {value: 'metric', label: 'Metric'},
        {value: 'imperial', label: 'Imperial'},
        {value: 'us', label: 'US Customary'},
        {value: 'recipe', label: 'Recipes'}
    ]

    const timeOptions: Option[] = [
        {value: 'ms', label: 'Miliseconds'},
        {value: 's', label: 'Seconds'},
        {value: 'min', label: 'Minutes'},
        {value: 'h', label: 'Hours'},
        {value: 'day', label: 'Days'}
    ]

    const lengthOptions: Option[] = [
        {value: 'mm', label: 'Milimeters'},
        {value: 'cm', label: 'Centimeters'},
        {value: 'm', label: 'Meters'},
        {value: 'km', label: 'Kilometers'},
        {value: 'in', label: 'Inches'},
        {value: 'ft', label: 'Feet'},
        {value: 'yd', label: 'Yards'}, 
        {value: 'mi', label: 'Miles'}
    ]

    const weightOptions: Option[] = [
        {value: 'mg', label: 'Miligrams'},
        {value: 'g', label: 'Grams'},
        {value: 'oz', label: 'Ounces'},
        {value: 'lb', label: 'Pounds'},
        {value: 'kg', label: 'Kilograms'},
        {value: 'ton', label: 'Tonnes'},
        {value: 'tonnes', label: 'Tons'}
    ]   

    const liquidVolumeOptions: Option[] = [
        {value: 'mm3', label: 'Milimeters cubed'},
        {value: 'cm3', label: 'Centimeters cubed'},
        {value: 'm3', label: 'Meters cubed'},
        {value: 'ml', label: 'Milliliters'},
        {value: 'l', label: 'Liters'},
        {value: 'fl_oz', label: 'Fluid Ounces'},
        {value: 'cup', label: 'Cups'},
        {value: 'gal', label: 'Gallons'}
    ] 

    const temperatureOptions: Option[] = [
        {value: 'K', label: 'Kelvins'},
        {value: 'C', label: 'Celsius'},
        {value: 'F', label: 'Fahrenheit'}
    ] 

    const electricCurrentOptions: Option[] = [
        {value: 'mA', label: 'Milliamperes'},
        {value: 'A', label: 'Amperes'},
        {value: 'kA', label: 'Kiloamperes'}
    ] 

    const spoonOptions: Option[] = [
        {value: 'tsp', label: 'Teaspoons'},
        {value: 'tbsp', label: 'Tablespoons'}
    ] 

    const pressureOptions: Option[] = [
        {value: 'Pa', label: 'Pascals'},
        {value: 'kPa', label: 'Kilopascals'},
        {value: 'MPa', label: 'Megapascals'},
        {value: 'atm', label: 'Atmospheres'},
        {value: 'psi', label: 'Pounds per square inch'},
        {value: 'bar', label: 'Bar'}
    ] 

    const energyOptions: Option[] = [
        {value: 'J', label: 'Joules'},
        {value: 'kJ', label: 'kilojoules'},
        {value: 'MJ', label: 'megajoules'},
        {value: 'kWh', label: 'kilowatt'}
    ] 

    const frequencyOptions: Option[] = [
        {value: 'Hz', label: 'Hertz'},
        {value: 'kHz', label: 'Kilohertz'},
        {value: 'MHz', label: 'Megahertz'},
        {value: 'GHz', label: 'Gigahertz'}
    ] 

    const volumeOptions: Option[] = [
        {value: 'mm3', label: 'Cubic Millimeters'},
        {value: 'cm3', label: 'Cubic Centimeters'},
        {value: 'm3', label: 'Cubic Meters'},
        {value: 'km3', label: 'Cubic Kilometers'},
        {value: 'in3', label: 'Cubic Inches'},
        {value: 'ft3', label: 'Cubic Feet'},
        {value: 'yd3', label: 'Cubic Yards'}
    ] 

    const areaOptions: Option[] = [
        {value: 'mm2', label: 'Square Millimeters'},
        {value: 'cm2', label: 'Square Centimeters'},
        {value: 'm2', label: 'Square Meters'},
        {value: 'km2', label: 'Square Kilometers'},
        {value: 'in2', label: 'Square Inches'},
        {value: 'ft2', label: 'Square Feet'},
        {value: 'yd2', label: 'Square Yards'},
        {value: 'ac', label: 'Acres'},
        {value: 'ha', label: 'Hectares'},

    ] 

    useEffect(() => {
        const timer = setTimeout(() => setOutputText(muc.convertText(inputText)), 500) // this is the debounce time, 500 ms
        return () => {
          clearTimeout(timer)
        }
    }, [inputText, selectedTime, selectedLength, selectedWeight, selectedLiquid, selectedTemperature, selectedElectric, selectedSpoons, selectedPressure, selectedFrequency, selectedVolume])

    useEffect(() => {
        muc.setPrecision(parseInt(precision));
    }, [precision])

    useEffect(() => {
        if(selectedTemplate == null)
            return;

        switch(selectedTemplate.value.toLowerCase()){
            case("metric"): 
                setSelectedLength(lengthOptions[2]);
                setSelectedWeight(weightOptions[1]);
                setSelectedLiquid(liquidVolumeOptions[4]);
                setSelectedArea(areaOptions[2])
                setSelectedVolume(volumeOptions[2]);
                break;
            case("imperial"): 
                setSelectedLength(lengthOptions[4]);
                setSelectedWeight(weightOptions[3]);
                setSelectedLiquid(liquidVolumeOptions[5]);
                setSelectedArea(areaOptions[5])
                setSelectedVolume(volumeOptions[5]);
                break;
            case("us"): 
                setSelectedLength(lengthOptions[5]);
                setSelectedWeight(weightOptions[3]);
                setSelectedLiquid(liquidVolumeOptions[5]);
                setSelectedArea(areaOptions[5])
                break;
            case("recipe"):
                setSelectedSpoons(spoonOptions[1])
                setSelectedWeight(weightOptions[1]);
                setSelectedLiquid(liquidVolumeOptions[6]);
                break;
        }
    }, [selectedTemplate])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d*$/.test(value)) {
            setPrecision(value);
        }
      };
    
    const handleBlur = () => {
        if (precision === "" || parseInt(precision) < 1) {
            setPrecision("1");
        }
    };
    


  return (
    <>
            <nav>
                <div className="navbar-title">Multi Unit Converter</div>
                <div className="navbar-buttons">
                    <a
                        href={
                            "https://github.com/itsxrgon/multi-unit-converter/#readme"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Github epository">
                        <FaGithub />
                    </a>
                    <a
                        href={
                            "https://www.npmjs.com/package/multi-unit-converter"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="NPM module page">
                        <FaNpm />
                    </a>
                    <a
                        href={""}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="donate">
                        <FaDonate />
                    </a>
                    <a
                        href={
                            "https://github.com/ItsXrgon/multi-unit-converter/issues"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Report a bug">
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
                                setSelectedTemplate(option);
                                if (option != null) {
                                    muc.setAllUnits(option.value);
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
                    <div className="unit">
                        <label>Time</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={timeOptions[0].label}
                            defaultValue={timeOptions[0]}
                            value={selectedTime}
                            options={timeOptions}
                            onChange={(option: Option | null) => {
                                setSelectedTime(option);
                                if (option != null) {
                                    muc.setUnitTime(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Length</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={lengthOptions[0].label}
                            defaultValue={lengthOptions[0]}
                            value={selectedLength}
                            options={lengthOptions}
                            onChange={(option: Option | null) => {
                                setSelectedLength(option);
                                if (option != null) {
                                    console.log(option.value);
                                    muc.setUnitLength(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Weight</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={weightOptions[0].label}
                            defaultValue={weightOptions[0]}
                            value={selectedWeight}
                            options={weightOptions}
                            onChange={(option: Option | null) => {
                                setSelectedWeight(option);
                                if (option != null) {
                                    muc.setUnitWeight(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Liquid Volume</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={liquidVolumeOptions[0].label}
                            defaultValue={liquidVolumeOptions[0]}
                            value={selectedLiquid}
                            options={liquidVolumeOptions}
                            onChange={(option: Option | null) => {
                                setSelectedLiquid(option);
                                if (option != null) {
                                    console.log(option.value);
                                    muc.setUnitLiquidVolume(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Temperature</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={temperatureOptions[0].label}
                            defaultValue={temperatureOptions[0]}
                            value={selectedTemperature}
                            options={temperatureOptions}
                            onChange={(option: Option | null) => {
                                setSelectedTemperature(option);
                                if (option != null) {
                                    muc.setUnitTemperature(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Electric Current</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={electricCurrentOptions[0].label}
                            defaultValue={electricCurrentOptions[0]}
                            value={selectedElectric}
                            options={electricCurrentOptions}
                            onChange={(option: Option | null) => {
                                setSelectedElectric(option);
                                if (option != null) {
                                    muc.setUnitElectricCurrent(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Spoon</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={spoonOptions[0].label}
                            defaultValue={spoonOptions[0]}
                            value={selectedSpoons}
                            options={spoonOptions}
                            onChange={(option: Option | null) => {
                                setSelectedSpoons(option);
                                if (option != null) {
                                    muc.setUnitSpoon(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Pressure</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={pressureOptions[0].label}
                            defaultValue={pressureOptions[0]}
                            value={selectedPressure}
                            options={pressureOptions}
                            onChange={(option: Option | null) => {
                                setSelectedPressure(option);
                                if (option != null) {
                                    muc.setUnitPressure(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Energy</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={energyOptions[0].label}
                            defaultValue={energyOptions[0]}
                            value={selectedEnergy}
                            options={energyOptions}
                            onChange={(option: Option | null) => {
                                setSelectedEnergy(option);
                                if (option != null) {
                                    muc.setUnitEnergy(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Frequency</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={frequencyOptions[0].label}
                            defaultValue={frequencyOptions[0]}
                            value={selectedFrequency}
                            options={frequencyOptions}
                            onChange={(option: Option | null) => {
                                setSelectedFrequency(option);
                                if (option != null) {
                                    muc.setUnitFrequency(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Volume</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={volumeOptions[0].label}
                            defaultValue={volumeOptions[0]}
                            value={selectedVolume}
                            options={volumeOptions}
                            onChange={(option: Option | null) => {
                                setSelectedVolume(option);
                                if (option != null) {
                                    muc.setUnitVolume(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>

                    <div className="unit">
                        <label>Area</label>
                        <Select
                            className="unit-selection-list"
                            placeholder={areaOptions[2].label}
                            defaultValue={areaOptions[2]}
                            value={selectedArea}
                            options={areaOptions}
                            onChange={(option: Option | null) => {
                                setSelectedArea(option);
                                if (option != null) {
                                    muc.setUnitArea(option.value);
                                }
                            }}
                            isSearchable={true}
                        />
                    </div>
                </div>
                <div className="input-output-container">
                    <div className="input-container">
                        <h1>Input Text</h1>
                        <textarea
                            rows={18}
                            cols={90}
                            placeholder="Input text"
                            onChange={(e) =>
                                setInputText(e.currentTarget.value)
                            }
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
                            <button
                                className="copy-text"
                                onClick={() => copy(outputText)}>
                                Copy text
                            </button>
                        </div>
                    </div>
                </div>
            </main>
                <footer>
                <p id="about">
                    <Link to="/about">About Multi Unit Converter</Link>
                </p>
                <p id="copyright">
                    Made by <a href="https://github.com/ItsXrgon">Xrgon</a>.
                </p>
            </footer>
        </>
    );
}

document.documentElement.classList.add('dark')

export default MainPage;
