import { IconTypes } from 'components/Icon/types';
import {
  ChangeEvent,
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  JSX,
  MutableRefObject,
  ReactElement,
  ReactNode,
} from 'react';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import { EnumFileType, fileInputEnum } from '../enum';

// react select
export interface IOptions {
  label: string;
  value: number | string;
  icons?: any;
  slug?: string;
  color?: string;
  countryName?: string;
  shortCode?: string;
  vat_id?: number;
  status?: string;
  vat_value?: number;
  hasAvailability?: boolean;
  [key: string]: any;
}
export interface IObjectOption {
  label?: string;
  value?: unknown;
  icon?: IconTypes;
  userId?: string;
}

export interface IReactSelect {
  inputClass?: string;
  isMulti?: boolean;
  isUseFocus?: boolean;
  label?: string;
  labelClass?: string;
  name?: string;
  options?: IOptions[];
  objectOptions?: IObjectOption[];
  placeholder?: string;
  selectedValue?: string | string[] | number | object;
  isCompulsory?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  margin?: string;
  width?: string;
  onChange?: (
    option: IOptions | IOptions[] | IObjectOption | IObjectOption[],
    type?: string
  ) => void;
  disabled?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  typeAdd?: string;
  parentClass?: string;
  className?: string;
  isLoading?: boolean;
  information?: string;
  isCreatable?: boolean;
  isInput?: boolean;
  readOnly?: boolean;
  loaderType?: string;
  warnings?: Array<number | string>;
  isPaginated?: boolean; // new prop
  loadOptions?: (page?: number, debounceSearch?: string) => Promise<IOptions[]>;
  handleCreateOption?: (value: string) => void;
  isTeacherOption?: boolean;
  component?: (props: any) => JSX.Element;
  isRemovable?: boolean;
  filterOption?:
    | ((option: FilterOptionOption<IObjectOption>, inputValue: string) => boolean)
    | null
    | undefined;
}

export interface TransformedDataItem {
  label: string;
  value: string;
  icon?: IconTypes;
}

export interface IconReactSelectProps {
  label?: string;
  labelClass?: string;
  name?: string;
  options: TransformedDataItem[];
  placeholder?: string;
  selectedValue?: string | string[] | number;
  isCompulsory?: boolean;
  margin?: string;
  width?: string;
  disabled?: boolean;
  variant?: '1' | '2' | '3';
  isSearchable?: boolean;
  isClearable?: boolean;
  typeAdd?: string;
  parentClass?: string;
  className?: string;
  isLoading?: boolean;
  information?: string;
  isCreatable?: boolean;
  readOnly?: boolean;
  loaderType?: string;
  onChange?: (
    option: TransformedDataItem | ReadonlyArray<TransformedDataItem> | null
  ) => void;
}

// checkbox
export type ICheckboxProps = {
  id?: string;
  text?: string;
  name?: string;
  parentClass?: string;
  disabled?: boolean;
  value?: string | number;
  onClick?: (e?: any) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  customClass?: string;
  labelClass?: string;
  check?: boolean;
  isLoading?: boolean;
  showError?: boolean;
  isTooltip?: boolean;
  reverse?: boolean;
  indeterminate?: boolean;
};

// radio
export type IRadioProps = {
  id?: string;
  name?: string;
  margin?: string;
  value?: string;
  onClick?: () => void;
  customClass?: string;
  check?: boolean;
  options: IOptions[];
  label?: string;
  className?: string;
  parentClass?: string;
  optionWrapper?: string;
  isCompulsory?: boolean;
  readOnly?: boolean;
  selectedValue?: string | number;
  isLoading?: boolean;
  isDisabled?: boolean;
  isCheckbox?: boolean;
  setSelectedValue?: React.Dispatch<React.SetStateAction<string>>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

// input
export interface IInputProps {
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  value?: string | number | null;
  label?: string;
  type?: string;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  onFocus?: () => void;
  min?: number;
  max?: number;
  maxLength?: number;
  isCompulsory?: boolean;
  prefixBig?: boolean;
  parentClass?: string;
  labelClass?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  isLoading?: boolean;
  customStyle?: CSSProperties;
  showError?: boolean;
  withFile?: boolean;
  step?: string | number;
  autoComplete?: string;
}

// text area
export interface ITextAreaProps {
  name: string;
  label?: string;
  id?: string;
  rows?: number;
  cols?: number;
  placeholder?: string;
  className?: string;
  labelClass?: string;
  resizeDisable?: boolean;
  parentClass?: string;
  inputClass?: string;
  extraElement?: ReactNode;
  disabled?: boolean;
  icon?: ReactElement;
  isCompulsory?: boolean;
  maxLength?: number;
  value?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onKeyUp?: (e: React.KeyboardEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  isLoading?: boolean;
  loaderType?: 'Skeleton' | 'Spin';
}

export type FieldValueTye =
  | string
  | number
  | File
  | Array<File | string>
  | Record<string, unknown>
  | null;

export interface IInputFileField {
  isCapture?: boolean;
  fileInputIcon?: IconTypes;
  selectedFileIcon?: IconTypes;
  labelClass?: string;
  variant?: string;
  Title?: string;
  SubTitle?: string;
  label?: string;
  parentClass?: string;
  dropdownInnerClass?: string;
  id?: string;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  name: string;
  value: File | string | Array<File | string> | null;
  acceptTypes?: string;
  size?: number;
  fileType?: EnumFileType | EnumFileType[];
  isMulti?: boolean;
  limit?: number;
  isNormal?: boolean;
  className?: string;
  displayAsLink?: boolean;
  isCompulsory?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  isSendMail?: boolean;
  uploadedMediaClass?: string;
  labelClassInput?: string;
  hidePreview?: boolean;
}

export type fileInputProps = {
  fileInputIcon?: IconTypes;
  selectedFileIcon?: IconTypes;
  index?: number;
  isMulti?: boolean;
  limit?: number;
  value: File | string | Array<File | string> | null;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType | EnumFileType[];
  size?: number;
  SubTitle?: string;
  Title?: string;
  isSendMail?: boolean;
  isBlack?: boolean;
  varaint?: fileInputEnum;
  uploadedMediaClass?: string;
  labelClass?: string;
  labelClassInput?: string;
  hidePreview?: boolean;
};

export interface IFileFileDisplay {
  value: File | string;
  index?: number;
  isMulti?: boolean;
  setValue: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  size?: number;
  Values?: Array<File | string>;
  name: string;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  fileType?: EnumFileType | EnumFileType[];
  limit?: number;
  selectedFileIcon?: IconTypes;
  uploadedMediaClass?: string;
  labelClass?: string;
  showVideoOverlayIcon?: boolean;
}

export type LinkDisplayProps = {
  filename?: string;
  filepath?: File | string;
  id?: number;
  crossButton?: boolean;
  name?: string;
  index?: number;
  isMulti?: boolean;
  setValue?: (field: string, value: FieldValueTye, shouldValidate?: boolean) => void;
  Values?: Array<File | string>;
  Ref?: MutableRefObject<HTMLInputElement | null>;
  isSendMail?: boolean;
  isBlack?: boolean;
  externalURL?: string;
};

// Phone Input Field
export interface IPhoneInputField {
  label?: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
  labelClass?: string;
  parentClass?: string;
  isCompulsory?: boolean;
  setFieldTouched?: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldError?: (field: string, message?: string) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  isUpdateForm?: boolean;
}
