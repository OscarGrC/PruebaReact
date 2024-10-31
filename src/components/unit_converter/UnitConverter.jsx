import React, { useState } from 'react';
import './UnitConverter.css'
import { UnitOptionsEnum } from '../../models/UnitOptionsEnum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Convert from '../../models/Convert';


export default function UnitConverter() {
    const [selectedOption, setSelectedOption] = useState(UnitOptionsEnum.OPTION_1);
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState(0);
    const [isSaved, setIsSaved] = useState(false);

    // Evento para el cambio en el select
    const handleSelectChange = (event) => {
        const selectedLabel = event.target.value;
        const selectedEnumOption = Object.values(UnitOptionsEnum).find(
            option => option.label === selectedLabel
        );
        setSelectedOption(selectedEnumOption);
        calculateResult(inputValue, selectedOption.conversionFactor);
    };
    // Evento cambio input
    const handleInputChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9]*[.,]?[0-9]*$/;

        if (value.length <= 30 && regex.test(value)) {
            setInputValue(value);
            calculateResult(value, selectedOption.conversionFactor);
        }
    };
    // Evento calculo de  resultado
    const calculateResult = (value, conver) => {
        if (!value) {
            setResult(0);
            return;
        }
        const numericValue = parseFloat(value.replace(',', '.'));
        const convertedValue = numericValue * conver;
        setResult(convertedValue);
    };
    // Evento cambio de A-B to B-A 
    const changeConvert = () => {
        const currentResult = result.toString();
        const currentIndex = Object.values(UnitOptionsEnum).indexOf(selectedOption);
        let newIndex;
        if (currentIndex % 2 === 0) {
            newIndex = currentIndex + 1 < Object.values(UnitOptionsEnum).length ? currentIndex + 1 : currentIndex;
        } else {
            newIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : currentIndex;
        }

        setSelectedOption(Object.values(UnitOptionsEnum)[newIndex]);
        setInputValue(currentResult);
        calculateResult(currentResult, Object.values(UnitOptionsEnum)[newIndex].conversionFactor);
    };
    // Evento Guardar la conversion + animacion 
    const saveConvert = () => {
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
            saveStatus()
        }, 1000);
    };

    const saveStatus = () => {
        const status = new Convert(inputValue, result, selectedOption.from, selectedOption.to);
        const conversions = localStorage.getItem('conversions') ? JSON.parse(localStorage.getItem('conversions')) : [];
        conversions.push(status.toJSON());
        localStorage.setItem('conversions', JSON.stringify(conversions));
        //  cleanConvert()
        //Se que esto es una ñapa gorda por ahorrar comunicacion entre componentes atraves del padre 
        window.location.reload()
    };

    const cleanConvert = () => {
        setSelectedOption(Object.values(UnitOptionsEnum)[0]);
        setInputValue('')
        setResult(0)

    }
    return (
        <div className="converter">
            <div className="title">convert</div>
            <div className="converter-row">
                <select className="converter-select" onChange={handleSelectChange} value={selectedOption.label}>
                    {Object.values(UnitOptionsEnum).map(option => (
                        <option key={option.label} value={option.label}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="icon-arrows"><FontAwesomeIcon icon={faArrowRightArrowLeft} onClick={changeConvert} /></div>

                <input type="text" className="user-input" placeholder="Enter value"
                    value={inputValue} onChange={handleInputChange} />
                <span className="unitIn-text">{selectedOption.from}</span>
            </div>
            <div className="converter-footer">
                <div className="icon-heart" onClick={saveConvert}>
                    <FontAwesomeIcon icon={isSaved ? faHeartSolid : faHeartRegular} />
                </div>
                <div className="result-container">
                    <div className="result-text">{result.toFixed(2)}</div>
                    <span className="unitOut-text">{selectedOption.to}</span>
                </div>
            </div>
        </div>
    );
}