import { Pagination } from "react-bootstrap";
import { usePagination, DOTS } from "../hooks/usePagination";

export default function Paginate({
  dispatch,
  total,
  limit,
  setCurrentPage,
  setLimit,
  currentPage,
}) {
  let active = currentPage;
  let items = [];
  const totalNumberofPages = Math.ceil(total / limit);
  for (let number = 1; number <= totalNumberofPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => dispatch(setCurrentPage(number))}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Pagination ellipses inclusion and check if pagination is not having any issue
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex d-flex justify-content-center">
      <div className="row">
        <div className="col-auto">
          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => {
                dispatch(setCurrentPage(1));
              }}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => {
                currentPage === 1
                  ? null
                  : dispatch(setCurrentPage(currentPage - 1));
              }}
            />
            {paginationRange.map((number, index) => {
              if (number === DOTS) {
                return <Pagination.Ellipsis key={`${index}-${number}`} />;
              }

              return (
                <Pagination.Item
                  key={number}
                  onClick={() => dispatch(setCurrentPage(number))}
                  active={currentPage === number}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={currentPage === totalNumberofPages}
              onClick={() => {
                currentPage === totalNumberofPages
                  ? null
                  : dispatch(setCurrentPage(currentPage + 1));
              }}
            />

            <Pagination.Last
              disabled={currentPage === totalNumberofPages}
              onClick={() => {
                dispatch(setCurrentPage(totalNumberofPages));
              }}
            />
          </Pagination>
        </div>

        <div className="col-auto">
          <select
            value={limit}
            className="form-select"
            size={"lg"}
            onChange={(e) => dispatch(setLimit(Number(e.target.value)))}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
    </div>
  );
}