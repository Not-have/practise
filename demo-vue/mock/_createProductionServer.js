import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
const modules = import.meta.glob('./**/*.ts', { eager: true });
const mockModules = [];
Object.keys(modules).forEach(key => {
    if (key.includes('/_')) {
        return;
    }
    mockModules.push(...modules[key].default);
});
export function setupProdMockServer() {
    createProdMockServer(mockModules);
}