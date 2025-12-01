import Button from 'components/Button/Button';
import Icon from 'components/Icon';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentPageCount } from 'reduxStore/slices/paginationSlice';

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  dataPerPage: number;
  dataCount?: number;
  parentClass?: string;
  setLimit?: (number: number) => void;
  disableMassPaginate?: boolean;
  setCurrentPageState?: Dispatch<SetStateAction<number>>;
}
const Pagination = ({
  parentClass,
  currentPage,
  totalPages,
  dataPerPage,
  dataCount,
  setLimit,
  disableMassPaginate = false,
  setCurrentPageState,
}: IPaginationProps) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState<number[]>([]);
  const [limitData, setLimitData] = useState<number>();
  function generatePaginationNumbers(
    totalPages: number,
    currentPage: number,
    perPage: number // Limit ( Per Page Data)
  ) {
    const paginationNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(perPage / 2));
    if (currentPage === totalPages && totalPages > 1) {
      startPage -= 1;
    }
    startPage = Math.max(startPage, 1);
    const endPage = Math.min(startPage + perPage - 1, totalPages);

    if (currentPage > endPage) {
      setPageHandler(endPage);
    }
    while (startPage <= endPage) {
      paginationNumbers.push(startPage);
      startPage++;
    }
    return paginationNumbers;
  }

  useEffect(() => {
    setLimitData(dataPerPage);
  }, [limitData]);

  useEffect(() => {
    setPageNumber(generatePaginationNumbers(totalPages, currentPage, 3));
  }, [currentPage, totalPages]);

  const handlePageChange = (value: number, action?: string) => {
    if (action === 'increment') {
      setPageHandler(value + 1);
    } else if (action === 'decrement') {
      setPageHandler(value - 1);
    } else {
      setPageHandler(value);
    }
  };

  const setPageHandler = (value: number) => {
    if (setCurrentPageState) {
      setCurrentPageState(value);
    } else {
      dispatch(currentPageCount({ currentPage: value }));
    }
  };

  const PaginationItem =
    'p-0 w-9 h-9 inline-flex items-center justify-center rounded-lg text-xs bg-LightGray text-black';

  return (
    <div className={`pagination-wrap ${parentClass ?? ''}`}>
      <div className="pagination-inner flex gap-12 justify-end items-center ">
        {totalPages >= 1 && (
          <ul className="pagination-list flex gap-2 items-start">
            {!disableMassPaginate && (
              <li className="h-fit">
                <Button
                  className={`${PaginationItem} arrow text-black hover:bg-PrimaryWood hover:text-white ${
                    currentPage !== 1
                      ? ' text-white bg-PrimaryWood '
                      : 'cursor-not-allowed opacity-50 hover:bg-LightGray hover:text-black'
                  }`}
                  onClickHandler={() =>
                    currentPage > 1 && handlePageChange(1, 'start')
                  }
                >
                  <span className="icon w-full h-full p-2.5 flex items-center align-middle">
                    <Icon name="leftDoubleArrows" />
                  </span>
                </Button>
              </li>
            )}
            <li className="h-fit">
              <Button
                className={`${PaginationItem} arrow text-black hover:bg-PrimaryWood hover:text-white ${
                  currentPage > 1
                    ? ' text-white bg-PrimaryWood '
                    : 'cursor-not-allowed opacity-50 hover:bg-LightGray hover:text-black'
                } `}
                onClickHandler={() =>
                  currentPage > 1 && handlePageChange(currentPage, 'decrement')
                }
              >
                <span className="icon w-full h-full p-2.5 flex items-center align-middle">
                  <Icon name="chevronLeft" />
                </span>
              </Button>
            </li>
            {pageNumber?.map((num: number) => {
              return (
                <li key={num} className="h-fit flex">
                  <Button
                    onClickHandler={() => handlePageChange(num)}
                    className={`${PaginationItem}  font-medium ${
                      num === currentPage ? ' text-white bg-PrimaryWood ' : ''
                    } `}
                  >
                    {num}
                  </Button>
                </li>
              );
            })}
            <li className="h-fit">
              <Button
                className={`${PaginationItem} arrow text-black hover:bg-PrimaryWood hover:text-white  ${
                  currentPage < totalPages
                    ? ' '
                    : 'cursor-not-allowed opacity-50 hover:bg-LightGray hover:text-black'
                } `}
                onClickHandler={() =>
                  currentPage < totalPages &&
                  handlePageChange(currentPage, 'increment')
                }
              >
                <span className="icon w-full h-full p-2.5 flex items-center align-middle">
                  <Icon name="chevronRight" />
                </span>
              </Button>
            </li>
            {!disableMassPaginate && (
              <li className="h-fit">
                <Button
                  className={`${PaginationItem} arrow text-black hover:bg-PrimaryWood hover:text-white ${
                    currentPage !== totalPages
                      ? ' '
                      : 'cursor-not-allowed opacity-50 hover:bg-LightGray hover:text-black'
                  }`}
                  onClickHandler={() =>
                    currentPage < totalPages && handlePageChange(totalPages, 'end')
                  }
                >
                  <span className="icon w-full h-full p-2.5 flex items-center align-middle">
                    <Icon name="rightDoubleArrows" />
                  </span>
                </Button>
              </li>
            )}
          </ul>
        )}
        {dataCount && limitData && (
          <div className="pagination-select  flex items-center gap-2.5">
            <span className="text-sm/4 text-black/50 font-semibold">Show</span>
            <select
              name=""
              id=""
              className="text text-sm font-medium px-3.5 py-2.5 border rounded-md text-primary/80 ml-2"
              value={dataPerPage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setLimit?.(Number(e.target.value));
                setPageHandler(1);
              }}
              defaultValue={dataPerPage}
            >
              {dataCount >= 1 && <option value={5}>5</option>}
              {dataCount > 5 && <option value={10}>10</option>}
              {dataCount > 10 && <option value={20}>20</option>}
              {dataCount > 20 && <option value={50}>50</option>}
              {dataCount > 50 && <option value={100}>100</option>}
              {dataCount > 100 && <option value={dataCount}>All</option>}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
