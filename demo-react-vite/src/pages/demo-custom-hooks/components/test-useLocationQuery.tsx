import {
  QueryHookResult,
  QueryTypes,
  useLocationQuery
} from "@mt-kit/react-hooks";
import React, {
  useCallback
} from "react";

// 定义查询参数的类型
interface IQueryParams {
  page: number;
  showDetails: boolean;
}

const types: QueryTypes<IQueryParams> = {
  page: "number",
  showDetails: "boolean"
};

// 或者
/*
const type = {
  page: "number" as const,          // ✅ 正确
  showDetails: "boolean" as const   // ✅ 正确
};
*/

const options = {
  keys: ["page", "showDetails"] as (keyof IQueryParams)[],
  defaults: {
    page: 1,
    showDetails: false
  },
  types,
  replaceMode: false
};

export default function TestUseLocationQuery(): React.ReactElement {

  const arr: QueryHookResult<IQueryParams> = useLocationQuery<IQueryParams>(options);

  const [query, updateQuery] = arr;

  const handlePageChange = useCallback((newPage: number) => {
    updateQuery({
      page: newPage
    });
  }, [updateQuery]);

  const handleShowDetailsChange = useCallback((show: boolean) => {
    updateQuery({
      showDetails: show
    });
  }, [updateQuery]);

  return <div>
    <p>useHistory 的使用</p>

    <p>
      Current Page:
      {query.page}
    </p>

    <p>
      Show Details:
      {query.showDetails ? "Yes" : "No"}
    </p>

    <button onClick={() => handlePageChange(2)}>Go to Page 2</button>
    <button onClick={() => handleShowDetailsChange(true)}>Show Details</button>
    <button onClick={() => handleShowDetailsChange(false)}>Show Details Reset</button>
  </div>;
}
