import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (value: any) => void;
    label: string;
    value: string;
    id: string;
    columnClasses?: string;
}

export const Input: React.FC<InputProps> = ({onChange, label, value, id, columnClasses, ...inputProps}: InputProps)=>{

    return (<div className={`field column ${columnClasses}`}>
        <label className='label' htmlFor={id}>{label}</label>
        <div className='control'>
            <input className='input'
                id={id}
                {...inputProps}
                value={value}
                onChange={evt => {if(onChange) onChange(evt.target.value)}}>
            </input>
        </div>
    </div>)
}