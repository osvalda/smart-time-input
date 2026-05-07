import React, { useState } from 'react'
import { is24hTime, addColonToTime, completeTime } from './utils';

interface SmartTimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    initTime?: string;
    divClassName?: string;
    onTimeChange?: (val: string) => void;
    onBlurHandlerSuper?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
const SmartTimeInput: React.FC<SmartTimeInputProps> = ({
    initTime,
    className,
    divClassName,
    onFocus,
    onTimeChange,
    onBlurHandlerSuper,
    children,
    ...rest
}) => {
    const [time, setTime] = useState(initTime || '');
    let lastVal = '';

    const handleTimeChange = (val: string) => {
        if (val == time) {
            return;
        }
        if (is24hTime(val)) {
            lastVal = val = addColonToTime(val, lastVal);
            setTime(val);

            if (val.length === 5 && onTimeChange) {
                onTimeChange(val);
            }
        }
    }

    const autoExtendTime = (event: React.FocusEvent<HTMLInputElement>) => {
        handleTimeChange(completeTime(event.target.value));

        if (onBlurHandlerSuper) {
            onBlurHandlerSuper(event);
        }
    }

    return (
        <div className={divClassName}>
            <input
                className={className}
                type={'text'}
                value={time}
                {...rest}
                onChange={(e) => {
                    handleTimeChange(e.target.value);
                    if (rest.onChange) rest.onChange(e);
                }}
                onBlur={(e) => autoExtendTime(e)}
                onFocus={onFocus}
            />
            {children}
        </div>
    );

}

export { SmartTimeInput };
export type { SmartTimeInputProps };