import { ref, onMounted, watch } from 'vue';
import { useRouter, RouteLocationNormalizedLoaded } from 'vue-router';

type QueryType<T> = Partial<Record<keyof T, 'number' | 'boolean' | 'string'>>;
type QueryDefaults<T> = Partial<T>;

interface LocationQueryOptions<T> {
  keys: Array<keyof T>;
  defaults?: QueryDefaults<T>;
  types?: QueryType<T>;
  replaceMode?: boolean;
}

type QueryUpdate<T> = Partial<T>;
type LocationQueryResult<T> = [ref<Partial<T>>, (queryUpdate: QueryUpdate<T>, replaceMode?: boolean) => void];

const useLocationQuery = <T>({ keys, defaults = {}, types = {}, replaceMode }: LocationQueryOptions<T>): LocationQueryResult<T> => {
  const routeQuery = ref<Partial<T>>({});
  const router = useRouter();

  const getQuery = (search: string): Partial<T> => searchToQuery(search, keys, defaults, types);

  const queryToSearch = (query: Partial<T>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== defaults[key]) {
        searchParams.append(key, value.toString());
      }
    });
    return searchParams.toString();
  };

  const searchToQuery = (search: string, keys: Array<keyof T>, defaults: QueryDefaults<T>, types: QueryType<T>): Partial<T> => {
    const searchParams = new URLSearchParams(search);
    return keys.reduce((result, key) => {
      const originalValue = searchParams.get(key as string);

      if (originalValue === null) {
        if (key in defaults) {
          result[key] = defaults[key];
        }
        return result;
      }

      switch (types[key] || typeof defaults[key]) {
        case 'boolean':
          result[key] = originalValue === '1' || originalValue === 'true';
          break;
        case 'number':
          result[key] = Number(originalValue);
          break;
        default:
          result[key] = originalValue;
          break;
      }

      return result;
    }, {} as Partial<T>);
  };

  const updateQuery = (queryUpdate: QueryUpdate<T>, replaceMode2?: boolean): void => {
    const windowSearch = window.location.search;
    const newSearchString = queryToSearch({
      ...getQuery(windowSearch),
      ...queryUpdate
    });

    if (windowSearch === `?${newSearchString}`) {
      return;
    }

    const navigationMethod = replaceMode2 !== undefined ? (replaceMode2 ? 'replace' : 'push') : (replaceMode ? 'replace' : 'push');
    router[navigationMethod]({
      search: newSearchString
    });
  };

  onMounted(() => {
    routeQuery.value = getQuery(router.currentRoute.value.search);
  });

  watch(router.currentRoute, (to: RouteLocationNormalizedLoaded, from: RouteLocationNormalizedLoaded) => {
    routeQuery.value = getQuery(to.search);
  });

  return [routeQuery, updateQuery];
};

export default useLocationQuery;
