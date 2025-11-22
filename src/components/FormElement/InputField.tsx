import Image from 'components/Image';
import { useField } from 'formik';
import { forwardRef, Ref } from 'react';
import ErrorMessage from './ErrorMessage';
import './style/inputField.css';
import { IInputProps } from './types';

const InputField = (
  {
    name,
    value,
    label,
    id,
    placeholder,
    className,
    isDisabled = false,
    type,
    onBlur,
    onKeyUp,
    onKeyDown,
    min,
    max,
    isCompulsory,
    onFocus,
    icon,
    parentClass,
    labelClass,
    maxLength,
    onChange,
    prefix,
    prefixBig,
    step,
    isLoading = false,
    customStyle,
    showError = true,
    withFile = false,
    autoComplete,
  }: IInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const [field] = name ? useField(name) : [];
  const getPrefixClass = () => {
    if (prefix && prefixBig) {
      return ' !ps-16 ';
    }
    if (prefix) {
      return ' !ps-12 ';
    }
    return '';
  };
  return (
    <div
      className={`w-full relative  ${parentClass ?? ''} ${withFile ? 'input-file' : ''} `}
    >
      {!withFile ? (
        <>
          {isLoading ? (
            <div className="lazy h-[50px]" />
          ) : (
            <>
              {label && (
                <label className={`input-label ${labelClass ?? ''}`} htmlFor={name}>
                  {label}
                  {isCompulsory && <span className="text-red-700">*</span>}
                </label>
              )}
              {prefix && (
                <span
                  className={`absolute pb-1 bg-offWhite2 rounded-s-lg h-[47px] flex items-center justify-center text-sm leading-5 font-medium text-PrimaryWood left-0 text-center border-e border-solid border-LightGray ${
                    prefix && !label ? ' top-0' : ' top-[29px]'
                  } ${prefix && prefixBig ? ' w-14' : ''} ${prefix ? ' w-10' : ''}`}
                >
                  {prefix}
                </span>
              )}
              <input
                style={customStyle}
                className={`inputField ${getPrefixClass()} ${className ?? ''}`}
                id={id}
                ref={ref}
                placeholder={placeholder ?? ''}
                type={type}
                {...(field ?? {})}
                name={name}
                min={min}
                max={max}
                maxLength={maxLength}
                onFocus={onFocus}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
                onChange={!isDisabled ? (onChange ?? field?.onChange) : undefined}
                value={type === 'file' ? undefined : (value ?? field?.value ?? '')}
                onBlur={onBlur}
                autoComplete={autoComplete ?? 'false'}
                disabled={isDisabled ?? false}
                step={step}
                aria-label={placeholder ?? ''}
              />
              {icon && (
                <span className={`absolute right-5 ${label ? 'top-11' : 'top-4'}`}>
                  {icon}
                </span>
              )}
              {showError && name ? <ErrorMessage name={name} /> : <></>}
            </>
          )}
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="lazy h-[50px]" />
          ) : (
            <>
              {label && (
                <label className={`input-label ${labelClass ?? ''}`} htmlFor={name}>
                  {label}
                  {isCompulsory && <span className="text-red-700">*</span>}
                </label>
              )}
              <div className="input-text">
                <input
                  style={customStyle}
                  className={`inputField ${getPrefixClass()} ${className ?? ''} ${withFile ? 'has-file-input' : ''}`}
                  id={id}
                  ref={ref}
                  placeholder={placeholder ?? ''}
                  type={type}
                  {...(field ?? {})}
                  name={name}
                  min={min}
                  max={max}
                  maxLength={maxLength}
                  onFocus={onFocus}
                  onKeyUp={onKeyUp}
                  onKeyDown={onKeyDown}
                  onChange={!isDisabled ? (onChange ?? field?.onChange) : undefined}
                  value={type === 'file' ? undefined : (value ?? field?.value ?? '')}
                  onBlur={onBlur}
                  autoComplete="false"
                  disabled={isDisabled ?? false}
                  step="0.01"
                  aria-label={placeholder ?? ''}
                />
                <label className="input-file-item" htmlFor="Inputlabel">
                  <Image iconName="linkIcon" />
                  <input type="file" id="Inputlabel" />
                </label>
              </div>
              <div className="text-file-input-upload">
                <Image isFromDataBase={false} serverPath={false} src="" />
                <span className="icon">
                  <Image iconName="trashIcon" />
                </span>
              </div>
              {showError && name ? <ErrorMessage name={name} /> : <></>}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default forwardRef(InputField);
