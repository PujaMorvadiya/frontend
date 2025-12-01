import Button from 'components/Button/Button';
import ErrorMessage from 'components/FormElement/ErrorMessage';
import Image from 'components/Image';
import React, { RefObject, useEffect, useRef, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string | number;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlurOut?: React.FocusEventHandler<HTMLInputElement>;
  onClear?: () => void;
  parentClass?: string;
  IconparentClass?: string;
  inputClass?: string;
  ref?: RefObject<HTMLDivElement>;
  isSearchIcon?: boolean;
  loading?: boolean;
  name?: string;
  IsFilter?: boolean;
  SearchBarChildren?:
    | React.ReactNode
    | ((setFilterVisible: (filterVisible: boolean) => void) => React.ReactNode);
  filterCount?: number;
}

const SearchComponent = ({
  value,
  placeholder,
  onSearch,
  onClear,
  parentClass,
  IconparentClass,
  inputClass,
  onBlurOut,
  ref,
  isSearchIcon = true,
  loading = false,
  name,
  IsFilter,
  SearchBarChildren,
  filterCount = 0,
}: SearchInputProps) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
      setFilterVisible(false);
    }
  };

  useEffect(() => {
    if (filterRef) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [filterRef]);

  return (
    <>
      <div
        className={`search-bar w-full relative h-fit flex items-center ${parentClass ?? ''} ${IsFilter && 'search-filter'} ${loading ? 'lazy' : ''}`}
        ref={ref}
      >
        {isSearchIcon && (
          <span
            className={`search-bar__icon absolute z-[1] top-[11px] left-2.5 w-5 h-5 text-black/40 ${IconparentClass ?? ''}`}
          >
            <Image
              iconName="searchStrokeSD"
              iconClassName="w-full h-full"
            />
          </span>
        )}
        <input
          type="search"
          placeholder={placeholder }
          name={name ?? 'search'}
          value={value}
          onBlur={onBlurOut}
          onChange={onSearch}
          autoComplete="off"
          className={`w-full max-w-full py-[9px] px-10 outline-none bg-white text-base font-normal relative rounded text-gray-800 placeholder-black/50  focus:ring-2 ring-offset-2 focus:ring-black/20 transition-all duration-300 ${IsFilter ? ' pr-20' : ''} ${inputClass ?? ''}`}
        />

        {value && (
          <Button
            onClickHandler={onClear}
            className={`search-bar__clear absolute top-1/2 -translate-y-1/2 items-center justify-center cursor-pointer ms-2 w-3 h-3 text-black rounded-md active:scale-75 transition-all duration-300 ${IsFilter ? ' right-14' : ' right-4'}`}
          >
            <Image iconName="crossIcon" iconClassName="w-full h-full" />
          </Button>
        )}

        {IsFilter && (
          <div
            className="search-bar__filter absolute top-1/2 -translate-y-1/2  right-4 z-1"
            ref={filterRef}
          >
            <div className="relative">
              <Button
                onClickHandler={() => {
                  setFilterVisible(!filterVisible);
                }}
                className="search-bar__filter-button  w-5 h-5 my-auto flex active:scale-95 transition-all duration-300"
              >
                <Image
                  iconName="filter"
                  iconClassName="w-full h-full"
                />
              </Button>
              {filterCount ? (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full text-[10px] bg-PrimaryWood text-white flex items-center justify-center">
                  {filterCount}
                </span>
              ) : null}
            </div>
            {filterVisible && (
              // <div className="searchbar-filter-box">{SearchBarChildren}</div>
              <div className="searchbar-filter-box  p-2.5 bg-white shadow-searchBoxFilter rounded-5px border border-solid border-LightGray absolute -right-4 top-[calc(100%_+_15px)]">
                {typeof SearchBarChildren === 'function'
                  ? SearchBarChildren(setFilterVisible)
                  : SearchBarChildren}
              </div>
            )}
          </div>
        )}
      </div>
      {name && <ErrorMessage name={name} />}
    </>
  );
};
export default SearchComponent;
