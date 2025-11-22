// ** components **
import Button from 'components/Button/Button';
import Image from 'components/Image';
import CreatableSelect from 'react-select/creatable';
import ErrorMessage from './ErrorMessage';

// ** Hooks **
import { useField } from 'formik';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// ** type **
import { IObjectOption, IOptions, IReactSelect } from './types';

// ** Constants
import { DropdownLoaderTypes, SelectStyle } from './constants/reactSelect';

// ** Utils **
import { components, StylesConfig } from 'react-select';
import { useDebounce } from 'utils';
import './style/filterSelectCategory.css';

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
    ...rest
  } = props;
  const [field, , helpers] = rest?.name ? useField(rest?.name) : [];
  const [inputValue, setInputValue] = useState<string>('');
  const [propOptions, setPropOptions] = useState<IOptions[]>([]);
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const debounceSearch = useDebounce(search, 300);
  const [page, setPage] = useState(1);

  const { t } = useTranslation();

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
    const uniqueItems =
      Array.isArray(data) && data?.length > 0
        ? [...new Map(data.map((item) => [item.value, item])).values()]
        : [];
    return uniqueItems;
  };

  const handleChange = (option: IOptions | IOptions[]) => {
    helpers?.setValue(
      isMulti
        ? Array.isArray(option) && option.length > 0
          ? option?.map((item: IOptions) => item.value)
          : []
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

  const formatOptionLabel = ({ label, icon }: IObjectOption) => {
    return (
      <div className="flex items-center p-1">
        <Image iconName={icon} iconClassName="w-5 h-5" />
        &nbsp; -&nbsp; <span>{label}</span>
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

          <CreatableSelect
            isSearchable={isSearchable}
            {...field}
            onChange={(e) => {
              return onChange
                ? onChange(
                    e as IOptions | IOptions[],
                    t('Common.CreatableSelect.Button.Add')
                  )
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
            className={`select-wrap ${className ?? ''} ${
              disabled ? 'disabled' : ''
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
            onMenuScrollToBottom={isPaginated ? handleMenuScrollToBottom : undefined}
            formatOptionLabel={objectOptions ? formatOptionLabel : undefined}
            components={{ Option: IconOption }}
          />
          {isCompulsory && rest?.name ? <ErrorMessage name={rest?.name} /> : ''}
          {isMulti && (
            <div
              className={`multi-select-wrap  ${
                getValue() &&
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
                              onChange(
                                [data],
                                t('Common.CreatableSelect.Button.Removed')
                              );
                            }
                          }}
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
