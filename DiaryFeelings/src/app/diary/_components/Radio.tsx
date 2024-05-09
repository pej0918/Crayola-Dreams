'use client'

import { useContext } from 'react';
import { RadioContext } from './RadioContext';


const Radio = ({ children, value, name, defaultChecked, disabled, className }: any) => {
    const group = useContext(RadioContext) as any;

    return (
        <label className={`flex flex-col mx-[10px] ${className} cursor-pointer`}>
            {children}
            <input
                hidden={true}
                type="radio"
                value={value}
                name={name}
                defaultChecked={defaultChecked}
                disabled={disabled || group.disabled}
                checked={group.value !== undefined ? value === group.value : undefined}
                onChange={(e) => group.onChange && group.onChange(e.target.value)}
            />
        </label>
    )
};

export default Radio