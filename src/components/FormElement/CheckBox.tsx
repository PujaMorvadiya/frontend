import { useField } from 'formik';
import ErrorMessage from './ErrorMessage';
import { ICheckboxProps } from './types/index';

const Checkbox = ({
  text,
  name,
  parentClass,
  disabled = false,
  value,
  onChange,
  customClass,
  check,
  showError = true,
  reverse,
  id,
  labelClass,
  indeterminate = false,
  onClick,
}: ICheckboxProps) => {
  const [field] = name ? useField(name) : [];
  return (
    <>
      <div className={`checkbox-wrap flex gap-2 ${parentClass}`} onClick={onClick}>
        {reverse && text && (
          <label className="input-label !mb-0 select-none" htmlFor={id}>
            {text}
          </label>
        )}
        <input
          type="checkbox"
          className={`checkbox-input cursor-pointer translate-y-0.5 h-4 w-4 rounded relative checked:z-1 ring-1 appearance-none checked:bg-PrimaryWood checked:ring-PrimaryWood checked:before:block before:w-full before:h-full before:absolute before:z-10 before:bg-no-repeat before:bg-center transition-all duration-300 ${customClass ?? ''}  ${
            disabled ? '!cursor-default' : ''
          } ${indeterminate ? 'before:block z-1 bg-PrimaryWood ring-PrimaryWood before:bg-indeterminate' : 'before:hidden bg-white z-0 ring-LightWood/80 before:bg-checkmark'}
             `}
          // className={customClass ?? ''}
          id={id}
          name={name}
          disabled={disabled}
          value={value}
          onChange={!disabled ? (onChange ?? field?.onChange) : undefined}
          checked={check}
          ref={
            indeterminate
              ? (input) => {
                  if (input) input.indeterminate = true;
                }
              : null
          }
        />
        {!reverse && text && (
          <label
            className={`input-label text-start flex-1 !mb-0 select-none ${labelClass || ''}`}
            htmlFor={id}
          >
            {text}
          </label>
        )}
      </div>
      {name && showError ? <ErrorMessage name={name} /> : ''}
    </>
  );
};

export default Checkbox;
