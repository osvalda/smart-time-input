import React from 'react'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { SmartTimeInput } from './../dist/smart-time-input.js'

const InputWrapper = (props) => {

    return (
        <SmartTimeInput
            initTime={props.init}
            placeholder={props.helpText}
            className='input'
        />
    );

}

function App() {
    return (
        <div>
            <InputWrapper init="12:34" />
            <InputWrapper helpText="HH:mm" />
            <InputWrapper />
        </div>
    );
}

const rootElement = document.getElementById('myApp');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
