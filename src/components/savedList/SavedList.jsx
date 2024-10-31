import React, { useState, useEffect } from 'react';
import conversionService from '../../services/ConvertService';
import SavedItem from './saved_item/SavedItem';
import './SavedList.css'

export default function SavedList() {
    const [conversions, setConversions] = useState([]);

    useEffect(() => {
        const savedConversions = conversionService.getAllConversions();
        setConversions(savedConversions);
    }, []);

    const handleDelete = (index) => {
        conversionService.deleteConversion(index);
        setConversions((prevConversions) => prevConversions.filter((_, i) => i !== index));
    };

    return (
        <div className='global-container'>
            <div className='titleOfList'>saved</div>
            <div className="saved-list">
                {conversions.length > 0 ? (
                    conversions.map((convert, index) => (
                        <SavedItem
                            key={index}
                            input={convert.input}
                            result={convert.result}
                            from={convert.from}
                            to={convert.to}
                            onDelete={() => handleDelete(index)}
                        />
                    ))
                ) : (
                    <p>No hay conversiones guardadas.</p>
                )}
            </div>
        </div>
    );
}