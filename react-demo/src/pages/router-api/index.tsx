import React from "react";
import useLocationQuery, {
    QueryTypes,
    QueryHookResult
} from "src/hook/use-location-query";
type MyQueryType = {
    param1: string;
    param2: number;
  };
  

export default function RouterApi() {

    const keys: Array<keyof MyQueryType> = ['param1', 'param2'];
    const defaults: Partial<MyQueryType> = { param1: '', param2: 0 };

    const types: QueryTypes<MyQueryType> = {
        param2: 'number'
    };

    const [query, updateQuery]: QueryHookResult<MyQueryType> = useLocationQuery({
        keys,
        defaults,
        types,
    });

    console.log(query);

    const fun = () => {
        updateQuery({ param1: 'newValue', param2: 42 });
    }

    return <>
        <button onClick={fun}>修改路由</button>
    </>;
}