import { useField } from 'formik';
import React from 'react';
import ErrorMessage from './ErrorMessage';
import './style/inputField.css';
import { ITextAreaProps } from './types';

const TextArea: React.FC<ITextAreaProps> = ({
  name,
  label,
  id,
  rows,
  cols,
  placeholder,
  parentClass,
  isCompulsory,
  disabled,
  icon,
  maxLength,
  labelClass,
  className,
  onChange,
  value,
}) => {
  const [field] = useField(name);

  const rawValue = value !== undefined ? value : field.value;

  const displayValue = React.useMemo(() => {
    if (!rawValue) return '';

    return rawValue.replace(/\\n/g, '\n');
  }, [rawValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: inputValue } = e.target;

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        name,
        value: inputValue,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    if (onChange) {
      onChange(syntheticEvent);
    } else {
      field.onChange(syntheticEvent);
    }
  };
  return (
    <div className={`w-full ${parentClass ?? ''}`}>
      {label && (
        <label className={`input-label ${labelClass || ''}`} htmlFor={name}>
          {label}
          {isCompulsory && <span className="text-red-700">*</span>}
        </label>
      )}
      <textarea
        className={`inputField ${className ?? ''}`}
        maxLength={maxLength}
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        disabled={disabled ?? false}
        value={displayValue}
        placeholder={placeholder}
        onChange={handleChange}
        aria-label={placeholder ?? ''}
      />
      <ErrorMessage name={name} />
      {icon}
    </div>
  );
};

export default TextArea;
