import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import Button from 'components/Button/Button';
import Checkbox from 'components/FormElement/CheckBox';
import Image from 'components/Image';
import InfiniteScroll from 'components/InfiniteScrollComponent';
import NoDataFound from 'components/NoDataFound';
import Pagination from 'components/Pagination/Pagination';
import { CellProps, ITableHeaderProps, ITableProps } from 'components/Table/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { currentPageSelector } from 'reduxStore/slices/paginationSlice';
import DraggableRow from './DraggableRow';
import './style/table.css';

function DraggableRowTable<DataType>({
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
  handleDragRow,
  isAllSelected,
  fetchData,
  onLoad,
  limit,
}: Readonly<ITableProps<DataType>>) {
  const [isSortAsc, setIsSortAsc] = useState<boolean>();
  const items = bodyData.map((_item: any) => _item?.id);
  const [activeId, setActiveId] = useState<string>();
  const [newBodyData, setNewBodyData] = useState<Array<CellProps>>([]);
  const { currentPage } = useSelector(currentPageSelector);

  const tablLazyCount = [...Array(dataPerPage > 0 ? dataPerPage : 10).keys()];
  useEffect(() => {
    if (bodyData) {
      setNewBodyData(bodyData as CellProps[]);
    }
  }, [bodyData]);


  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const renderTableHeader = (val: ITableHeaderProps, index: number) => {
    if (Object.keys(val).length) {
      const RenderComponent = val.filterComponent;
      return (
        <th
          key={`${val.header}_${index + 1}`}
          scope="col"
          className={`group/tbl 2xl:first:w-[70px] first:w-[50px] ${columnWidth ?? ''} ${val.className ?? ''}`}
        >
          {val?.option?.hasFilter ? RenderComponent : renderDefaultHeader(val)}
        </th>
      );
    }
  };

  const renderDefaultHeader = (val: ITableHeaderProps) => (
    <span
      className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end' : ''} `}
    >
      {val?.header}
      {val.isCheckBox && (
        <Checkbox
          check={Boolean(isAllSelected)}
          onChange={() => handleSelectAll?.()}
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
        if (str.length > 25) return `${str.substring(0, 25)}...`;
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
      return startRecord + index;
    }
    if (columnCell?.name) {
      if (row[columnCell.name]) {
        if (row[columnCell.name].length > 100) {
          return `${row[columnCell.name].substring(0, 25)}...`;
        }
        return row[columnCell.name];
      }
      if (columnCell.name.toString().includes('.')) {
        const allKeys = columnCell.name.split('.');

        let newData: any = null;
        allKeys.forEach((element: string) => {
          newData = !newData ? row[element] : newData[element];
        });
        return newData ?? '-';
      }
    }
    return '-';
  };

  const renderInnerHtml = (
    columnCell: ITableHeaderProps,
    row: { [key: string]: string },
    index: number
  ) => {
    return `<span>
        ${renderRowCell(row, columnCell, index)}
      </span>`;
  };

  const [selectedRow, setSelectedRow] = useState<CellProps>();

  useEffect(() => {
    if (activeId) {
      const row = bodyData.find((item) => (item as CellProps).id === activeId);
      setSelectedRow(row as CellProps);
    }
  }, [activeId]);

  const handleDragStart = (e: DragStartEvent) => {
    return setActiveId(String(e.active.id));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id !== over?.id) {
      const oldIndex = newBodyData.findIndex((item) => item.id === active.id);
      const newIndex = newBodyData.findIndex((item) => item.id === over?.id);

      const sortOrderObj = newBodyData?.[newIndex]?.sort_order
        ? { sort_order: newBodyData?.[newIndex]?.sort_order ?? '' }
        : {};

      const newOptionsData = [...newBodyData];
      const [draggedItem] = newOptionsData.splice(oldIndex, 1);
      newOptionsData.splice(newIndex, 0, draggedItem);
      setNewBodyData(newOptionsData);
      handleDragRow?.(
        {
          ...selectedRow,
          ...(sortOrderObj.sort_order
            ? { sort_order: sortOrderObj.sort_order }
            : {}),
        },
        newOptionsData
      );
    }

    return {};
  };

  /* Calculate the starting and ending records for the current page, considering the number of records pehandleDragEnd
handleDragEndr page. */
  const startRecord = (Number(currentPage || 1) - 1) * Number(dataPerPage) + 1;
  const endRecord =
    Number(currentPage || 1) * Number(dataPerPage) <= Number(dataCount)
      ? Number(currentPage || 1) * Number(dataPerPage)
      : dataCount;

  /* Check if there is data available for the current page. */
  const isDataAvailable = endRecord && startRecord <= endRecord;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className={parentClassName ?? `main-table`}>
        <div className={`table-wrapper relative ${tableRoundedRadius ?? ''}`}>
          {headerExtra || headerTitle ? (
            <div className="header-title-wrap">
              {headerTitle ? (
                <div className="table-header-title">{headerTitle}</div>
              ) : (
                ''
              )}
              {headerExtra && (
                <div className="header-title-extra">{headerExtra}</div>
              )}
            </div>
          ) : (
            ''
          )}
          <div
            id="crew-scroll-container"
            className={`overflow-auto style-scroll ${tableHeightClassName ?? ''}`}
          >
            <table className={`datatable-main w-full ${width ?? ''}`}>
              {/* sticky top-0 z-1 */}
              <thead className={tableHeaderClass ?? 'sticky top-0 z-50'}>
                <tr>
                  <th
                    scope="col"
                    className="group/tbl 2xl:first:w-[70px] first:w-[50px]"
                  />
                  {headerData.map((val: ITableHeaderProps, index) =>
                    renderTableHeader(val, index)
                  )}
                </tr>
              </thead>

              <tbody className="rounded">
                {loader && (
                  <>
                    {tablLazyCount.map((_, i) => {
                      return (
                        <tr key={`Key_${i + 1}`}>
                          {headerData.map((_, j) => {
                            return (
                              //  colSpan={headerData?.length}
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
                    <td className="" colSpan={headerData?.length}>
                      <NoDataFound message='No Data Found' />
                    </td>
                  </tr>
                )}
                {!loader && bodyData && bodyData.length > 0 && (
                  <SortableContext
                    key="uniqueKey"
                    items={items}
                    strategy={horizontalListSortingStrategy}
                  >
                    {newBodyData.map((row: any, index) => {
                      return (
                        <DraggableRow
                          key={`DraggableRow${index + 1}`}
                          row={row}
                          index={index as unknown as string}
                          renderColumnCell={renderColumnCell}
                          renderInnerHtml={renderInnerHtml}
                          headerData={headerData}
                          renderRowClass={renderRowClass}
                          rowClass={rowClass}
                          tableRowClick={tableRowClick}
                          islastRowOnRight={islastRowOnRight}
                          id={row?.id}
                        />
                      );
                    })}
                  </SortableContext>
                )}
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                  {activeId && (
                    <DraggableRow
                      key={`DraggableRow${activeId + 1}`}
                      row={selectedRow ?? {}}
                      index={
                        newBodyData.findIndex(
                          (item) => String(item.id) === activeId
                        ) as unknown as string
                      }
                      renderColumnCell={renderColumnCell}
                      renderInnerHtml={renderInnerHtml}
                      headerData={headerData}
                      renderRowClass={renderRowClass}
                      rowClass={rowClass}
                      tableRowClick={tableRowClick}
                      islastRowOnRight={islastRowOnRight}
                      id={activeId}
                    />
                  )}
                </DragOverlay>
              </tbody>
            </table>
            {!pagination && (
              <InfiniteScroll<DataType>
                fetchData={
                  fetchData as (page: number, limit: number) => Promise<DataType[]>
                }
                onLoad={onLoad as (items: DataType[]) => void}
                limit={limit}
                containerId="crew-scroll-container"
              />
            )}
          </div>
        </div>

        {dataPerPage ? (
          <div className="table-footer ">
            <div className="pagination-show-count">
              <p className="">
                {isDataAvailable
                  ? 'Showing {{startRecord}} to {{endRecord}} of {{dataCount}} records'
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
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </DndContext>
  );
}

export default DraggableRowTable;
