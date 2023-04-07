import { useEffect, useState } from 'react'
import Select from 'react-select';
import { FaGithub, FaNpm, FaDonate, FaBug } from "react-icons/fa";
import './App.css'
import MultiUnitConverter from 'multi-unit-converter'
import useCopyToClipboard from './useCopyToClipboard';

const muc = new MultiUnitConverter();

function App() {

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

    const pressureUnits: Option[] = [
        {value: 'Pa', label: 'Pascals'},
        {value: 'kPa', label: 'Kilopascals'},
        {value: 'MPa', label: 'Megapascals'},
        {value: 'atm', label: 'Atmospheres'},
        {value: 'psi', label: 'Pounds per square inch'},
        {value: 'bar', label: 'Bar'}
    ] 

    const energyUnits: Option[] = [
        {value: 'J', label: 'Joules'},
        {value: 'kJ', label: 'kilojoules'},
        {value: 'MJ', label: 'megajoules'},
        {value: 'kWh', label: 'kilowatt'}
    ] 

    const frequencyUnits: Option[] = [
        {value: 'Hz', label: 'Hertz'},
        {value: 'kHz', label: 'Kilohertz'},
        {value: 'MHz', label: 'Megahertz'},
        {value: 'GHz', label: 'Gigahertz'}
    ] 

    const volumeUnits: Option[] = [
        {value: 'mm3', label: 'Cubic Millimeters'},
        {value: 'cm3', label: 'Cubic Centimeters'},
        {value: 'm3', label: 'Cubic Meters'},
        {value: 'in3', label: 'Cubic Inches'},
        {value: 'ft3', label: 'Cubic Feet'},
        {value: 'yd3', label: 'Cubic Yards'}
    ] 

    const areaUnits: Option[] = [
        {value: 'tsp', label: 'Teaspoons'},
        {value: 'tbsp', label: 'Tablespoons'}
    ] 

    useEffect(() => {
        const timer = setTimeout(() => setOutputText(muc.convertText(inputText)), 500) // this is the debounce time, 500 ms
        return () => {
          clearTimeout(timer)
        }
    }, [inputText, selectedTime, selectedLength, selectedWeight, selectedLiquid, selectedTemperature, selectedElectric, selectedSpoons, selectedPressure, selectedFrequency, selectedVolume])

  return (
    <>
        <nav>
            <div className="navbar-title">
                Multi Unit Converter
            </div>
            <div className="navbar-buttons">
                <a href={"https://github.com/itsxrgon/multi-unit-converter/#readme"} target="_blank" rel="noopener noreferrer" title='Github epository'>
                    <FaGithub />
                </a>
                <a href={"https://www.npmjs.com/package/multi-unit-converter"} target="_blank" rel="noopener noreferrer" title='NPM module page'>
                    <FaNpm />
                </a>
                <a href={""} target="_blank" rel="noopener noreferrer" title='donate'>
                    <FaDonate />
                </a>
                <a href={"https://github.com/ItsXrgon/multi-unit-converter/issues"} target="_blank" rel="noopener noreferrer" title='Report a bug'>
                    <FaBug />
                </a>
            </div>
        </nav>
        <main className='unit-converter'>
            <div className='units-selector-container'>
                <h1 className='units-selector-title'>
                    -: Select your preferred units :-
                </h1>
                <div className="units-selector">
                    <label >Time Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={timeOptions[1].label}
                        defaultValue={timeOptions[1]}
                        value={selectedTime}
                        options={timeOptions}
                        onChange={(option: Option | null) => {setSelectedTime(option); 
                            if(option != null){
                                muc.setUnitTime(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Length Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={lengthOptions[2].label}
                        defaultValue={lengthOptions[2]}
                        value={selectedLength}
                        options={lengthOptions}
                        onChange={(option: Option | null) => {setSelectedLength(option); 
                            if(option != null){
                                console.log(option.value)
                                muc.setUnitLength(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    
                    <label>Weight Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={timeOptions[4].label}
                        defaultValue={timeOptions[4]}
                        value={selectedWeight}
                        options={weightOptions}
                        onChange={(option: Option | null) => {setSelectedWeight(option); 
                            if(option != null){
                                muc.setUnitWeight(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Liquid Volume Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={liquidVolumeOptions[2].label}
                        defaultValue={liquidVolumeOptions[2]}
                        value={selectedLiquid}
                        options={liquidVolumeOptions}
                        onChange={(option: Option | null) => {setSelectedLiquid(option); 
                            if(option != null){
                                console.log(option.value)
                                muc.setUnitLiquidVolume(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                </div>
                <div className="units-selector">
                    <label>Temperature Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={temperatureOptions[0].label}
                        defaultValue={temperatureOptions[0]}
                        value={selectedTemperature}
                        options={temperatureOptions}
                        onChange={(option: Option | null) => {setSelectedTemperature(option); 
                            if(option != null){
                                muc.setUnitTemperature(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Electric Current Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={electricCurrentOptions[1].label}
                        defaultValue={electricCurrentOptions[1]}
                        value={selectedElectric}
                        options={electricCurrentOptions}
                        onChange={(option: Option | null) => {setSelectedElectric(option); 
                            if(option != null){
                                muc.setUnitElectricCurrent(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Spoon Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={spoonOptions[0].label}
                        defaultValue={spoonOptions[0]}
                        value={selectedSpoons}
                        options={spoonOptions}
                        onChange={(option: Option | null) => {setSelectedSpoons(option); 
                            if(option != null){
                                muc.setUnitSpoon(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Pressure Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={pressureUnits[0].label}
                        defaultValue={pressureUnits[0]}
                        value={selectedPressure}
                        options={pressureUnits}
                        onChange={(option: Option | null) => {setSelectedPressure(option); 
                            if(option != null){
                                muc.setUnitPressure(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                </div>
                <div className="units-selector">
                    <label>Energy Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={energyUnits[0].label}
                        defaultValue={energyUnits[0]}
                        value={selectedEnergy}
                        options={energyUnits}
                        onChange={(option: Option | null) => {setSelectedEnergy(option); 
                            if(option != null){
                                muc.setUnitEnergy(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Frequency Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={frequencyUnits[0].label}
                        defaultValue={frequencyUnits[0]}
                        value={selectedFrequency}
                        options={frequencyUnits}
                        onChange={(option: Option | null) => {setSelectedFrequency(option); 
                            if(option != null){
                                muc.setUnitFrequency(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Volume Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={volumeUnits[2].label}
                        defaultValue={volumeUnits[2]}
                        value={selectedVolume}
                        options={volumeUnits}
                        onChange={(option: Option | null) => {setSelectedVolume(option); 
                            if(option != null){
                                muc.setUnitVolume(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                    <label>Area Unit:</label>
                    <Select
                        className='unit-selection-list'
                        placeholder={energyUnits[0].label}
                        defaultValue={energyUnits[0]}
                        value={selectedEnergy}
                        options={energyUnits}
                        onChange={(option: Option | null) => {setSelectedEnergy(option); 
                            if(option != null){
                                muc.setUnitEnergy(option.value)
                            }
                        }}
                        isSearchable={true}
                    />
                </div>
            </div>
            <div className='input-output-container'>
                <div className='input-container'>
                    <label>
                        Input text of measurements
                    </label>
                    <div>
                        <textarea rows={30} cols={90} placeholder='Input text' onChange={(e) => setInputText(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className='output-container'>
                    <label>
                        Output text after conversions
                    </label>
                    <div>
                        <textarea id='output' readOnly rows={30} cols={90} placeholder='Output text' value={outputText} />
                    </div>
                    <button className='copy-text' onClick={() => copy(outputText)} >
                        Copy text
                    </button>
                </div>
            </div>
        </main>
    </>
  )
}

export default App