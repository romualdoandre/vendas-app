import { InputHTMLAttributes } from "react";
import {converterEmBigDecimal, formatReal} from 'app/util/money';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (value: any) => void;
    label: string;
    value: string;
    id: string;
    columnClasses?: string;
    currency?: boolean;
}

export const Input: React.FC<InputProps> = ({onChange, label, value, id, columnClasses, currency, ...inputProps}: InputProps)=>{

    const onInputChange = (evt)=>{
        let value = evt.target.value
        if(value && currency){
            value = formatReal(value)
        }
        if(onChange)
            onChange(value)
        }

    return (<div className={`field column ${columnClasses}`}>
        <label className='label' htmlFor={id}>{label}</label>
        <div className='control'>
            <input className='input'
                id={id}
                {...inputProps}
                value={value}
                onChange={onInputChange}>
            </input>
        </div>
    </div>)
}