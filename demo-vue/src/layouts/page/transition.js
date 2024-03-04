export function getTransitionName({ route, openCache, cacheTabs, enableTransition, def }) {
    if (!enableTransition) {
        return undefined;
    }
    const isInCache = cacheTabs.includes(route.name);
    const transitionName = 'fade-slide';
    let name = transitionName;
    if (openCache) {
        name = isInCache && route.meta.loaded ? transitionName : undefined;
    }
    return name || route.meta.transitionName || def;
}
