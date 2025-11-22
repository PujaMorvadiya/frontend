import Select, { StylesConfig } from 'react-select';

import Image from 'components/Image';
import { useField } from 'formik';
import { SelectStyle } from './constants/reactSelect';
import ErrorMessage from './ErrorMessage';
import { IconReactSelectProps, IOptions, TransformedDataItem } from './types';

const IconReactSelect = ({
  placeholder,
  options,
  isCompulsory,
  label,
  labelClass,
  disabled,
  className,
  parentClass,
  isClearable,
  isLoading,
  selectedValue,
  isSearchable,
  ...rest
}: IconReactSelectProps) => {
  const [field, , helpers] = rest?.name ? useField(rest?.name) : [];
  const handleChange = (
    selectedOption: TransformedDataItem | ReadonlyArray<TransformedDataItem> | null
  ) => {
    if (typeof selectedOption === 'number') helpers?.setValue(selectedOption);
    else helpers?.setValue((selectedOption as TransformedDataItem)?.value);
  };
  const formatOptionLabel = ({ label, icon }: TransformedDataItem) => {
    return (
      <div className="flex items-center relative gap-2 p-1 pl-6">
        <span
          className={`status-icon rounded-full w-4 h-4 text-white flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 ${icon === 'checkIcon' ? 'bg-PrimaryGreen' : 'bg-PrimaryYellow'}`}
        >
          <Image
            iconName={icon}
            iconClassName={`w-full h-full text-white ${icon === 'threeMoreDots' ? 'rotate-90' : ''}`}
          />
        </span>
        <span className="block flex-1">{label}</span>
      </div>
    );
  };

  const getValue = () => {
    if (options && field?.value) {
      const obj = (options as unknown as TransformedDataItem[]).find(
        (item) => item.value === field?.value
      );
      if (obj) {
        return obj;
      }
    }
    if (selectedValue) {
      if (Array.isArray(selectedValue)) {
        return options?.filter((option: IOptions) =>
          selectedValue.includes(String(option?.value))
        );
      }
      const findProvince = options?.find(
        (option: IOptions) => option?.value === selectedValue
      );
      if (findProvince) {
        return findProvince;
      }
    }

    return field?.value;
  };

  return (
    <div className={` ${parentClass ?? ''}`}>
      {isLoading ? (
        <div className="lazy h-[80px]" />
      ) : (
        <>
          {label && (
            <label
              className={`text-sm text-black leading-4 inline-block mb-2 ${
                labelClass ?? ''
              }`}
            >
              {label}
              {isCompulsory && <span className="text-red-700">*</span>}
            </label>
          )}
          <Select
            name={rest.name}
            placeholder={placeholder ?? ''}
            value={getValue() ?? field?.value}
            options={options}
            onChange={(e) => {
              return rest.onChange ? rest.onChange(e) : handleChange(e);
            }}
            onBlur={field?.onBlur}
            formatOptionLabel={formatOptionLabel}
            isClearable={isClearable}
            menuPlacement="auto"
            isDisabled={disabled}
            className={className ?? ''}
            styles={
              SelectStyle as StylesConfig<TransformedDataItem, boolean> | undefined
            }
            menuPortalTarget={document.body}
            isSearchable={isSearchable}
          />
          {isCompulsory && rest?.name ? <ErrorMessage name={rest?.name} /> : ''}
        </>
      )}
    </div>
  );
};

export default IconReactSelect;
