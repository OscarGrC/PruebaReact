import React from 'react';
import './SavedItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function SavedItem({ input, from, result, to, onDelete }) {
    return (
        <div className="saved-item">
            <div className="saved-item-content">
                <span>{input} {from} → {result.toFixed(2)} {to}</span>
            </div>
            <div className="saved-item-delete" onClick={onDelete}>
                <FontAwesomeIcon icon={faTimes} />
            </div>
        </div>
    );
}