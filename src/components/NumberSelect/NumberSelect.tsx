'use client';
import {SetStateAction} from 'react';
import './NumberSelect.scss';

type Props = {
  classes: string;
  name: string;
  options: {value: string | number; label: string}[];
  value: number;
  setter: (value: SetStateAction<number>) => void;
};
function NumberSelect({classes, setter, options, name, value}: Props) {
  return (
    <select
      className={`NumberSelect ${classes}`}
      name={name}
      value={value}
      onChange={e => setter(Number(e.currentTarget.value))}
    >
      {options.map(({label, value}) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
export {NumberSelect};
