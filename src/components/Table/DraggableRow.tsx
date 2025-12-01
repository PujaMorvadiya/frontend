import { useSortable } from '@dnd-kit/sortable';
import Image from 'components/Image';
import { JSXElementConstructor, ReactElement } from 'react';
import { CellProps, ITableHeaderProps } from './types';
import { customRandomNumberGenerator } from 'modules/utils';

interface DraggableRowProps<DataType> {
  row: CellProps;
  index: string;
  tableRowClick?: (props: DataType) => void;
  headerData?: ITableHeaderProps[];
  rowClass?: string;
  renderRowClass?: (props: CellProps) => boolean;
  islastRowOnRight?: boolean;
  id?: string;
  renderColumnCell: (
    row: {
      [key: string]: string;
    },
    columnCell: ITableHeaderProps
  ) => string | ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  renderInnerHtml: (
    columnCell: ITableHeaderProps,
    row: {
      [key: string]: string;
    },
    index: number
  ) => string;
}

function DraggableRow<DataType>({
  row,
  index,
  tableRowClick,
  headerData,
  rowClass,
  renderRowClass,
  islastRowOnRight,
  renderColumnCell,
  renderInnerHtml,
  id,
}: DraggableRowProps<DataType>) {
  const { attributes, listeners, transform, transition, setNodeRef } = useSortable({
    id: String(id),
  });
  const style = {
    width: '100%',
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };
  return (
    <tr
      style={style}
      ref={setNodeRef}
      role="button"
      onClick={() => {
        tableRowClick?.(row as DataType);
      }}
      // key={`tr_${row?.id ?? customRandomNumberGenerator()}`}
    >
      <td {...attributes} {...listeners}>
        <Image iconName="dNDIcon" iconClassName="dndicon" />
      </td>
      {headerData?.map((columnCell) => {
        if (Object.keys(columnCell).length) {
          return (
            <td
              className={`group/tbl  ${
                renderRowClass?.(row) && rowClass ? rowClass : ''
              }`}
              key={`td_${columnCell?.header ?? customRandomNumberGenerator(100000)}`}
            >
              <div
                className={`td-child ${islastRowOnRight ? 'group-last/tbl:justify-end group-last/tbl:text-right justify-start' : ''}`}
              >
                {columnCell?.cell ? (
                  renderColumnCell(row, columnCell)
                ) : (
                  <span
                    className="w-full"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: renderInnerHtml(columnCell, row, Number(index ?? 0)),
                    }}
                  />
                )}
              </div>
            </td>
          );
        }
        return (
          <td
            key={`td_${columnCell?.header ?? customRandomNumberGenerator(100000)}`}
          />
        );
      })}
    </tr>
  );
}

export default DraggableRow;
