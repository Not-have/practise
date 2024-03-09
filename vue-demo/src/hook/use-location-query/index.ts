/**
 * Storybook vue-Router Link(Not recommended)
 * https://www.npmjs.com/package/storybook-vue3-router
 */
import type { Ref, UnwrapRef } from "vue";
import { ref, computed, watchEffect } from "vue";

import type { LocationQuery } from "vue-router";
import { useRoute, useRouter } from "vue-router";

import isEqual from "@/utils/is-equal";
import type { TQueryTypes, IOptions, TQueryHookResult } from "./type";

/**
 * 把 search string 转成对象，如果从 URL 中获取到的参数为空串，将被忽略，且只有在 defaults 中有的才会被接受
 */
function searchToQuery<T>(
    search: LocationQuery,
    keys: Array<keyof T>,
    defaults: Partial<T>,
    types: TQueryTypes<T>
): Partial<T> {
    return keys.reduce((result, key) => {
        const originalValue = search[key] as unknown;

        // 忽略 undefined 和 空串
        if (!originalValue) {
            if (key in defaults) {
                result[key] = defaults[key];
            }

            return result;
        }

        // 把 originalValue 转成正确的格式
        switch (types[key] || typeof defaults[key]) {
            case "boolean":
                result[key] = originalValue === "1" || originalValue === "true";

                break;
            case "number":
                result[key] = Number(originalValue);

                break;
            default:
                result[key] = originalValue as string;

                break;
        }

        return result;
    }, {} as Record<keyof T, unknown>) as Partial<T>;
}

function queryToSearch<T>(
    query: Partial<T>,
    defaults: Partial<T>
): LocationQuery {
    const filteredObj = Object.fromEntries(
        Object.entries(query).filter(([key, value]) => {
            const stringValue = String(value);

            return (
                stringValue !== "" &&
                stringValue !== undefined &&
                // @ts-ignore
                stringValue !== defaults[key]
            );
        })
    );

    // @ts-ignore
    return filteredObj;
}

/**
 * 获取 window.location.search 并转换为 Object
 * @param queryString window.location.search
 * @returns {Record<string, string>} Object
 */
export function queryStringToObject(
    queryString: string
): Record<string, string> {
    const params = new URLSearchParams(queryString);
    const result: Record<string, string> = {};

    params.forEach((value, key) => {
        result[key] = value;
    });

    return result;
}

/**
 * obj 中所有 value 转换为 string
 */
export function objectValueToString<T extends Record<string, unknown>>(
    query: T
): { [K in keyof T]: string } {
    return Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, String(value)])
    ) as { [K in keyof T]: string };
}

/**
 *
 * @param {IOptions} params
 */
export default function useLocationQuery<T>({
    keys,
    defaults = {},
    types = {},
}: IOptions<T>): TQueryHookResult<T> {
    const route = useRoute();
    const router = useRouter();

    const query: Ref<UnwrapRef<Partial<T>>> = ref(defaults);

    const getQuery = computed(() => {
        return searchToQuery(
            {
                ...defaults,
                ...route.query,
            },
            keys,
            defaults,
            types
        );
    });

    watchEffect(() => {
        // @ts-ignore
        query.value = getQuery.value;
    });

    /**
     * 更新 query
     * 如果值是默认值会被忽略
     * 忽略 undefined 和 空串
     * 并把所有 value 先转换为 string
     */
    const updateQuery = function (queryUpdate: Partial<T>) {
        const windowSearch = decodeURIComponent(window.location.search);

        const newQuery = queryToSearch(
            {
                ...queryStringToObject(windowSearch),
                ...queryUpdate,
            },
            defaults
        );

        if (isEqual(query, newQuery)) {
            return;
        }

        router.push({
            query: newQuery,
        });
    };

    return [query, updateQuery];
}
