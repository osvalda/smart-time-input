import React from 'react'

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// import { SmartTimeInput } from './../src/smart-time-input.tsx'
import { SmartTimeInput } from './../dist/smart-time-input.js'

const InputWrapper = (props) => {
    console.log("hello: " + props.helpText);
    // const onTimeChangeHandler = (val) => {
    //     if (val.length === 5) {
    //     }
    // }

    return (
        <SmartTimeInput
            initTime={props.init}
            placeholder={props.helpText}
            className='input'
        // onTimeChange={onTimeChangeHandler}
        />
    );

}

function App() {
    return (
        <div>
            <InputWrapper init="12:34"/>
            <InputWrapper helpText="HH:mm"/>
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
