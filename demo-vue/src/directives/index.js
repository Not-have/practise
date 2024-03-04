import { setupPermissionDirective } from './permission';
import { setupLoadingDirective } from './loading';
import { setupEllipsisDirective } from './ellipsis';
export function setupGlobDirectives(app) {
    setupPermissionDirective(app);
    setupLoadingDirective(app);
    setupEllipsisDirective(app);
}
