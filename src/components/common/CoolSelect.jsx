import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';


export default function CoolSelect({ className, value, name, placeholder, options, invalid, onChange }) {
    const { t } = useTranslation();

    return (
        <div className={"form-group " + className}>
            <div className="cool-select" 
                invalid={invalid ? "invalid" : ""}>
                <select
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}>
                    <option value="">{placeholder}</option>
                    {options.map((option, i) =>
                        <option value={option.name} key={i}>
                            { t(option.name, option.name)}
                        </option>
                    )}
                </select>
                <i className="icon"><FontAwesomeIcon icon={faAngleDown} /></i>
            </div>
        </div>
    );
}
