import React from 'react';
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Header() {

    return (
        <div className="Header">
            <div className="Header-icon-arrows"><FontAwesomeIcon icon={faArrowRightArrowLeft} /></div>
            <div className="Header-title">unit converter</div>
        </div>
    );
}