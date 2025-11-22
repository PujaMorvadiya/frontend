import { useField, useFormikContext } from 'formik';
import ErrorMessage from './ErrorMessage';
import './style/radioInput.css';
import { IOptions, IRadioProps } from './types';

const RadioButtonGroup = ({
  name,
  options,
  label,
  parentClass,
  isCompulsory,
  optionWrapper,
  readOnly,
  selectedValue,
  className,
  isCheckbox,
  onChange,
  isDisabled,
}: IRadioProps) => {
  const [field] = name ? useField(name) : [];
  const formik = useFormikContext();

  const handleRadioChange = (option: string) => {
    if (!readOnly && name) {
      field?.onChange({ target: { value: option, name } });
      formik.setFieldTouched(name, true, false);
    }
  };
  return (
    <div className={`${parentClass}`}>
      {label && (
        <label className={`input-label ${className || ''} `}>
          {label}
          {isCompulsory && <span className=" text-red-700">*</span>}
        </label>
      )}
      <div className={`option-wrapper ${optionWrapper || ''}`}>
        {options.map((option: IOptions, index: number) => (
          <label
            htmlFor={`${name}_${index}`}
            key={`radio_${index + 1}`}
            className={`radio-option ${isCheckbox && 'checkbox'}`}
          >
            <span className="input-wrap">
              <input
                className={`radioButton peer `}
                type="radio"
                id={`${name}_${index}`}
                name={name}
                value={option.value}
                checked={
                  field
                    ? field.value === option.value
                    : option.value === selectedValue
                }
                onChange={
                  onChange || (() => handleRadioChange(option.value as string))
                }
                disabled={isDisabled}
              />
            </span>
            <span className="">{option.label}</span>
          </label>
        ))}
      </div>
      {formik && name ? <ErrorMessage name={name} /> : ''}
    </div>
  );
};

export default RadioButtonGroup;
