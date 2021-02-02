import React from 'react';

export default function CoolNumeric ({ className, value, onChange, invalid, name }) {
    return (
        <div className={"form-group " + className}>
            <input
                value={value}
                onChange={(e) => onChange(e)}
                invalid={invalid ? 'invalid' : ''}
                name={name} type="number" min="1"
                className="cool-numeric"/>
        </div>
    );
}
