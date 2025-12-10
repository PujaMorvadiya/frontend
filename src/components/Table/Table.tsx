import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import NoDataFound from 'components/NoDataFound';
import Pagination from 'components/Pagination/Pagination';
import { ITableHeaderProps, ITableProps } from 'components/Table/types';
import ToolTip from 'components/Tooltip';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import './style/table.css';
import { customRandomNumberGenerator } from 'utils';

function Table<DataType>({
  bodyData = [],
  headerData = [],
  loader,
  dataPerPage = 10,
  totalPage,
  dataCount,
  pagination,
  setLimit,
  setSort,
  columnWidth,
  sort,
  width,
  tableHeightClassName,
  parentClassName,
  tableRoundedRadius,
  rowClass,
  tableHeaderClass,
  renderRowClass,
  headerTitle,
  headerExtra,
  islastRowOnRight = true,
  tableRowClick,
  handleSelectAll,
  isAllSelected,
  rowSubComponent,
  expandedRowIds,
  currentPageState,
  setCurrentPageState,
}: Readonly<ITableProps<DataType>>) {
  const [isSortAsc, setIsSortAsc] = useState<boolean>();
  const { currentPage: reduxCurrentPage } = useSelector(currentPageSelector);
  const currentPage = currentPageState ?? reduxCurrentPage;
  const tablLazyCount = [...Array(dataPerPage > 0 ? dataPerPage : 10).keys()];

  const renderTableHeader = (val: ITableHeaderProps, index: number) => {
    if (Object.keys(val).length) {
      const RenderComponent = val.filterComponent;
      return (
        <th
          key={`${val.header}_${index + 1}`}
          scope="col"
          className={`group/tbl 2xl:first:w-[70px] first:w-[50px] ${columnWidth || ''} ${val.className || ''}`}
        >
          {val?.option?.hasFilter ? RenderComponent : renderDefaultHeader(val)}
        </th>
      );
    }
  };

  const renderDefaultHeader = (val: ITableHeaderProps) => (
    <span
      className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end' : 'group-last/tbl:justify-center'}`}
    >
      {val?.header}
      {val.isCheckBox && (
        <Checkbox
          check={isAllSelected === true}
          indeterminate={isAllSelected === 'partial'}
          onChange={(e) => {
            handleSelectAll?.();
            e.stopPropagation();
          }}
        />
      )}
      {val?.option?.sort ? (
        <Button
          className="w-4 h-4 ms-1 opacity-0 group-hover/tbl:opacity-100"
          onClickHandler={() => handleSorting(val ?? '')}
        >
          {val?.option?.sort && renderSortIcon()}
        </Button>
      ) : (
        ''
      )}
    </span>
  );

  const handleSorting = (val: ITableHeaderProps) => {
    const splitName = val.name?.split('.');
    const sortFieldName = splitName ? splitName[splitName.length - 1] : val.name;

    if (sortFieldName) {
      if (sort?.includes(`-${sortFieldName}`)) {
        setSort?.(sortFieldName);
        setIsSortAsc(true);
      } else {
        setSort?.(`-${sortFieldName}`);
        setIsSortAsc(false);
      }
    }
  };

  const renderSortIcon = () => (
    <Image
      iconClassName={`w-4 h-4 ${isSortAsc ? 'rotate-90' : '-rotate-90'}`}
      iconName="arrowRightIcon"
    />
  );

  const renderColumnCell = (
    row: { [key: string]: string },
    columnCell: ITableHeaderProps
  ) => {
    if (columnCell?.cell && !columnCell.subString) {
      if (typeof columnCell.cell(row) === 'string') {
        const str = columnCell.cell(row) as string;
        if (columnCell.isToolTips) {
          return <ToolTip position="top" value={str} spanClass="w-0 flex-1" />;
        }
      }
    }
    return columnCell.cell?.(row);
  };

  const renderRowCell = (
    row: { [key: string]: string },
    columnCell: ITableHeaderProps,
    index: number
  ) => {
    if (columnCell?.option?.isIndex) {
      return { value: `${startRecord + index}` };
    }
    if (columnCell?.name) {
      if (row[columnCell.name]) {
        if (columnCell.isHtml) {
          const e = document.createElement('span');
          e.innerHTML = row[columnCell.name];
          row[columnCell.name] = e.innerHTML;
        }

        if (columnCell.isToolTips) {
          return {
            value: `${row[columnCell.name]}`,
            tooltip: row[columnCell.name],
            className: 'w-full',
          };
        }
        return { value: row[columnCell.name] };
      }
      if (columnCell.name.toString().includes('.')) {
        const allKeys = columnCell.name.split('.');

        let newData: any = null;
        allKeys.forEach((element: string) => {
          newData = !newData ? row[element] : newData[element];
        });
        return { value: newData ?? '-' };
      }
    }
    return { value: '-' };
  };

  useEffect(() => {
    const wrapper = document.querySelector('.table-wrapper');
    if (wrapper) wrapper.scrollTop = 0;
  }, [bodyData]);

  const startRecord = (Number(currentPage || 1) - 1) * Number(dataPerPage) + 1;
  const endRecord =
    Number(currentPage || 1) * Number(dataPerPage) <= Number(dataCount)
      ? Number(currentPage || 1) * Number(dataPerPage)
      : dataCount;

  /* Check if there is data available for the current page. */
  const isDataAvailable = endRecord && startRecord <= endRecord;
  return (
    <div className={parentClassName ?? `main-table`}>
      <div
        className={`table-wrapper ${tableHeightClassName || 'max-h-[calc(100dvh_-_290px)]'} overflow-auto relative ${tableRoundedRadius ?? ''} style-scroll`}
      >
        {headerExtra || headerTitle ? (
          <div className="header-title-wrap">
            {headerTitle ? (
              <div className="table-header-title">{headerTitle}</div>
            ) : (
              ''
            )}
            {headerExtra && <div className="header-title-extra">{headerExtra}</div>}
          </div>
        ) : (
          ''
        )}
        <div className="">
          {/* overflow-auto */}
          <table
            className={`datatable-main w-full ${width || '2xl:min-w-[1300px]'}`}
          >
            {!loader && bodyData.length > 0 && (
              <thead className={tableHeaderClass ?? 'custom-table-header'}>
                <tr>
                  {headerData.map((val: ITableHeaderProps, index) =>
                    renderTableHeader(val, index)
                  )}
                </tr>
              </thead>
            )}
            <tbody className="rounded">
              {loader && (
                <>
                  {tablLazyCount.map((_, i) => {
                    return (
                      <tr key={`Key_${i + 1}`}>
                        {headerData.map((_, j) => {
                          return (
                            <td key={`Key_${j + 1}`}>
                              <div className="relative w-full flex items-center">
                                <div className="lazy w-full h-10 rounded-lg" />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              )}
              {!loader && bodyData.length === 0 && (
                <tr>
                  <td className="" colSpan={Number(headerData?.length ?? 1) + 1}>
                    <NoDataFound message='No Data Found' />
                  </td>
                </tr>
              )}
              {!loader && bodyData && bodyData.length > 0 && (
                <>
                  {bodyData.map((row: any, index) => {
                    const rowId = row?.id ?? customRandomNumberGenerator();
                    const isExpanded =
                      expandedRowIds && rowId && expandedRowIds.includes(rowId);
                    return (
                      <>
                        <tr
                          role="button"
                          onClick={() => {
                            tableRowClick?.(row);
                          }}
                          key={`tr_${rowId}`}
                        >
                          {headerData?.map((columnCell) => {
                            if (Object.keys(columnCell).length) {
                              return (
                                <td
                                  className={`group/tbl  ${renderRowClass?.(row) && rowClass ? rowClass : ''
                                    } ${columnCell?.cellClasses ?? ''}`}
                                  key={`td_${columnCell?.header ??
                                    customRandomNumberGenerator(100000)
                                    }`}
                                >
                                  <div
                                    className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end group-last/tbl:text-right' : ''} ${columnCell.childClassName ?? ''}`}
                                    onClick={() => columnCell?.onClickHandler?.(row)}
                                  >
                                    {columnCell?.cell
                                      ? renderColumnCell(row, columnCell)
                                      : (() => {
                                        const { value, tooltip, className } =
                                          renderRowCell(row, columnCell, index);
                                        return tooltip ? (
                                          <span className="relative group w-full">
                                            <ToolTip
                                              value={tooltip}
                                              position="bottom"
                                              spanClass={className}
                                            />
                                          </span>
                                        ) : columnCell.isToolTips ? (
                                          <ToolTip
                                            value={value}
                                            position="top"
                                            spanClass="w-0 flex-1"
                                          />
                                        ) : (
                                          <span className="w-full">{value}</span>
                                        );
                                      })()}
                                  </div>
                                </td>
                              );
                            }
                            return (
                              <td
                                key={`td_${columnCell?.header ??
                                  customRandomNumberGenerator(100000)
                                  }`}
                              />
                            );
                          })}
                        </tr>
                        {isExpanded && rowSubComponent && (
                          <tr key={`subtr_${rowId}`}>
                            <td colSpan={headerData.length} className="bg-gray-50">
                              {rowSubComponent(row)}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dataPerPage && isDataAvailable && totalPage && pagination ? (
        <div className="table-footer ">
          <div className="pagination-show-count">
            <p className="">
              {isDataAvailable
                ? `Showing ${startRecord} to ${endRecord} of ${dataCount} records`
                : ''}
            </p>

          </div>
          {pagination && totalPage ? (
            <Pagination
              setLimit={setLimit}
              currentPage={currentPage ?? 1}
              dataPerPage={dataPerPage}
              dataCount={dataCount}
              totalPages={totalPage}
              setCurrentPageState={setCurrentPageState}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Table;
