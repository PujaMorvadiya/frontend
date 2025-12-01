import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { SetFieldValue } from 'types';

export interface ITableHeaderProps {
  header?: string;
  image?: string;
  name?: string;
  className?: string;
  childClassName?: string;
  cell?: (props: CellProps, setFieldValue?: SetFieldValue) => string | ReactElement;
  option?: {
    sort?: boolean;
    hasFilter?: boolean;
    hasImage?: boolean;
    isIndex?: boolean;
  };
  imagePath?: string;
  filterComponent?: ReactElement;
  subString?: boolean;
  date?: Date | string;
  isCheckBox?: boolean;
  isHtml?: boolean;
  onClickHandler?: (props: CellProps) => void;
  isToolTips?: boolean;
  cellClasses?: string;
}

export type CellProps = { [key: string]: string };

export interface ITableProps<DataType> {
  bodyData?: DataType[];
  headerData?: ITableHeaderProps[];
  loader?: boolean;
  dataPerPage?: number;
  tableRowClick?: (props: DataType) => void;
  totalPage?: number;
  dataCount?: number;
  pagination?: boolean;
  setLimit?: (number: number) => void;
  setSort?: (string: string) => void;
  sort?: string;
  columnWidth?: string;
  handleDragRow?: (draggedRow: CellProps, draggedData: Array<CellProps>) => void;
  width?: string;
  tableHeightClassName?: string;
  parentClassName?: string;
  tableRoundedRadius?: string;
  rowClass?: string;
  tableHeaderClass?: string;
  renderRowClass?: (props: CellProps) => boolean;
  headerTitle?: string;
  headerExtra?: React.ReactNode;
  islastRowOnRight?: boolean;
  isAllSelected?: boolean | 'partial';
  isInModal?: boolean;
  handleSelectAll?: () => void;
  rowSubComponent?: (row: DataType) => React.ReactNode;
  expandedRowIds?: (string | number)[];
  currentPageState?: number;
  setCurrentPageState?: Dispatch<SetStateAction<number>>;
  fetchData?: (page: number, limit: number) => Promise<DataType[]>;
  onLoad?: (items: DataType[]) => void;
  limit?: number;
}
