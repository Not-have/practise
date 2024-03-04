import linkDemoCss from './link-demo-css';
import scriptDemoUtils from './script-demo-utils';
import scriptMap from './script-map';
import scriptToolbar from './script-toolbar';
export default async function mapGaode({ key, securityCode, version = '2.0', plugins }) {
    window._AMapSecurityConfig = {
        securityJsCode: securityCode
    };
    await linkDemoCss();
    await scriptDemoUtils();
    await scriptToolbar();
    return await scriptMap({
        key,
        version,
        plugins
    });
}
