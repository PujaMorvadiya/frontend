import { useField } from 'formik';
import { KeyboardEvent, useEffect, useState } from 'react';
import Select, { components, StylesConfig } from 'react-select';

// ** type **
import { IObjectOption, IOptions, IReactSelect } from './types';

// ** components **
import ErrorMessage from './ErrorMessage';

// ** style constants **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import { DropdownLoaderTypes, SelectStyle } from './constants/reactSelect';
import './style/filterSelectCategory.css';
import { useDebounce } from 'utils';

const { Option } = components;
const IconOption = (props: any) => {
  const { data } = props;
  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        {data.icon}
        {data.label}
      </div>
    </Option>
  );
};

const TeacherOption = (props: any) => {
  const { Option } = components;
  const { data } = props;
  return (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <span
          className={`!w-2 !h-2 rounded-full inline-flex ${data.hasAvailability ? 'bg-PrimaryGreen' : 'bg-PrimaryRed'}`}
        />
        <span>{data.label}</span>
      </div>
    </Option>
  );
};

const ReactSelect = (props: IReactSelect) => {
  const {
    isSearchable = true,
    onChange,
    placeholder,
    options = [],
    objectOptions,
    isCompulsory = false,
    isClearable = false,
    isMulti = false,
    label,
    labelClass,
    disabled,
    selectedValue,
    parentClass,
    className,
    isLoading = false,
    information,
    isInput = false,
    warnings = [],
    menuPlacement = 'auto',
    loaderType = DropdownLoaderTypes.Skeleton,
    isPaginated = false,
    loadOptions,
    isTeacherOption,
    component,
    filterOption,
    isRemovable,
    ...rest
  } = props;
  const [field, fieldInput, helpers] = rest?.name ? useField(rest?.name) : [];
  const [inputValue, setInputValue] = useState<string>('');
  const [propOptions, setPropOptions] = useState<IOptions[]>([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const debounceSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!isPaginated) {
      if (options && Array.isArray(options)) {
        setPropOptions(options);
      }
    }
  }, [options, objectOptions, isPaginated]);

  useEffect(() => {
    if (!isPaginated) {
      if (objectOptions && Array.isArray(objectOptions)) {
        setPropOptions(objectOptions as IOptions[]);
      }
    }
  }, [objectOptions, isPaginated]);

  useEffect(() => {
    if (isPaginated && loadOptions) {
      setLoader(true);
      loadOptions(page, debounceSearch).then((newOptions: IOptions[]) => {
        setPropOptions((prevOptions) =>
          // [...prevOptions, ...newOptions]
          removeDuplicates([...prevOptions, ...(newOptions || [])])
        );
        setLoader(false);
      });
    }
  }, [page, isPaginated, debounceSearch]);

  useEffect(() => {
    if (field?.value && options && isPaginated) {
      const targetValues = new Set(
        Array.isArray(field?.value) ? field?.value : [field?.value]
      );

      const result = options
        ?.filter((item) => targetValues.has(item.value))
        .map((item) => item);

      setPropOptions((prevOptions) => removeDuplicates([...prevOptions, ...result]));
    }
  }, [field?.value, options]);

  const removeDuplicates = (data: IOptions[]) => {
    return [...new Map(data.map((item) => [item.value, item])).values()];
  };

  const handleChange = (option: IOptions | IOptions[]) => {
    helpers?.setValue(
      isMulti
        ? (option as IOptions[]).map((item: IOptions) => item.value)
        : (option as IOptions)?.value
    );
  };

  const handleMenuScrollToBottom = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getValue = (): IOptions | IOptions[] | undefined => {
    if (options) {
      if (!options) {
        return isMulti ? [] : undefined;
      }
      const checkInputValue = Array.isArray(options)
        ? options?.filter((a) => a?.label?.includes(inputValue))
        : [];
      if (
        checkInputValue?.length === 0 &&
        !propOptions?.find((a) => a.value === inputValue) &&
        inputValue?.length > 0
      ) {
        setPropOptions(
          removeDuplicates([{ label: inputValue, value: inputValue }, ...options])
        );
      }
      if (selectedValue) {
        if (Array.isArray(selectedValue)) {
          return propOptions?.filter((option: IOptions) =>
            selectedValue.includes(String(option?.value))
          );
        }
        const findProvince = propOptions?.find(
          (option: IOptions) => option?.value === selectedValue
        );
        if (findProvince) {
          return findProvince;
        }
      }
      if (isMulti) {
        if (Array.isArray(field?.value) && Array.isArray(options)) {
          return removeDuplicates(
            propOptions?.filter(
              (option: IOptions) => field?.value?.indexOf(option.value) >= 0
            )
          );
        }
      } else {
        return propOptions?.find(
          (option: IOptions) => option?.value === field?.value
        );
      }
    } else if (objectOptions) {
      if (selectedValue) {
        return (objectOptions as IOptions[])?.find((option) => {
          if (option?.value) {
            if (typeof option.value === 'object') {
              return (
                JSON.stringify(Object.values(option.value).sort()) ===
                JSON.stringify(Object.values(selectedValue).sort())
              );
            }
          }
          return false;
        });
      }
    }
  };
  const handleRemoveOption = (valueToRemove: string | number | boolean) => {
    helpers?.setValue(
      (field?.value || []).filter((data: string) => data !== valueToRemove)
    );
  };

  const formatOptionLabel = (objectOption: IObjectOption) => {
    if (component) {
      return component(objectOption);
    }
    return (
      <div className="flex items-center p-1">
        <Image iconName={objectOption.icon} iconClassName="w-5 h-5" />
        &nbsp; -&nbsp; <span>{objectOption.label}</span>
      </div>
    );
  };
  const selectedVal = () => {
    if (selectedValue) {
      const val: IOptions = {
        label: selectedValue as string,
        value: selectedValue as string | number,
      };
      return val;
    }
    return null;
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    // TODO:- Blocking back space
    if (event.key === 'Backspace') {
      // event.preventDefault();
    }
  };

  return (
    <div className={` ${parentClass ?? ''} `}>
      {loaderType === DropdownLoaderTypes.Skeleton && isLoading ? (
        <div className="lazy h-[50px]" />
      ) : (
        <>
          {label && (
            <label className={` input-label ${labelClass || ''}`}>
              {label}

              {isCompulsory && <span className=" text-red-700">*</span>}
            </label>
          )}

          <Select
            isSearchable={isSearchable}
            {...field}
            onChange={(e) => {
              return onChange
                ? onChange(e as IOptions | IOptions[], 'Add')
                : handleChange(e as IOptions | IOptions[]);
            }}
            name={rest.name}
            value={getValue() ? getValue() : selectedVal()}
            placeholder={placeholder ?? ''}
            options={propOptions ?? options}
            isMulti={isMulti}
            isClearable={isClearable}
            menuPlacement={menuPlacement}
            isDisabled={disabled}
            className={`select-wrap ${className ?? ''} ${disabled ? 'disabled' : ''
              }`}
            menuPortalTarget={document.body}
            isLoading={isLoading ?? loader}
            styles={SelectStyle as StylesConfig<IObjectOption, boolean> | undefined}
            controlShouldRenderValue={!isMulti}
            onInputChange={(element) => {
              if (isPaginated) {
                setSearch(element);
              }
              if (isInput) {
                setInputValue(element);
              }
            }}
            onKeyDown={(event) => handleKeyDown(event)}
            onMenuScrollToBottom={isPaginated ? handleMenuScrollToBottom : undefined}
            formatOptionLabel={objectOptions ? formatOptionLabel : undefined}
            components={
              isTeacherOption
                ? { Option: TeacherOption }
                : component
                  ? { Option: component }
                  : { Option: IconOption }
            }
            filterOption={filterOption}
          />
          {isCompulsory && rest?.name ? <ErrorMessage name={rest?.name} /> : ''}
          {isMulti && (
            <div
              className={`multi-select-wrap  ${getValue() &&
                  Array.isArray(getValue()) &&
                  (getValue() as IOptions[]).length > 0
                  ? 'pt-3'
                  : ''
                }`}
            >
              {propOptions.length > 0 &&
                propOptions.map((data: IOptions, index: number) => {
                  if (
                    getValue() &&
                    Array.isArray(getValue()) &&
                    (getValue() as IOptions[])?.find((findData) => {
                      return findData.value === data.value;
                    })
                  ) {
                    const isWarning = warnings?.includes(data?.value as number);
                    return (
                      <div className="multi-select-item " key={`multi_${index + 1}`}>
                        <span className="text">
                          {isWarning ? (
                            <Image iconName="redExclamationMarkIcon" />
                          ) : (
                            ''
                          )}
                          {data.label}
                        </span>

                        <Button
                          parentClass="h-fit"
                          className="multi-select-clear"
                          onClickHandler={() => {
                            handleRemoveOption(data.value);
                            if (onChange) {
                              onChange([data], 'Removed');
                            }
                          }}
                          disabled={
                            !!isRemovable &&
                            fieldInput?.initialValue?.find(
                              (val: string) => val === data.value
                            )
                          }
                        >
                          <Image
                            iconName="crossIcon"
                            iconClassName="w-full h-full"
                          />
                        </Button>
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          )}
          {information && (
            <div className="flex items-center mt-2">
              <p className="block text-sm text-lightgrey leading-4  ">
                {information}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReactSelect;
