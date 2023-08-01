import {
    IProps
} from './props';
import {
    TModelDispatch
} from './action';
import {
    IModelState
} from './reducer';

/**
 * 传入 useContext 的类型
 */
export interface IModelContext {
    props: IProps;
    /**
     * 只定义了初始值，他不等于 props 传入的所有值
     */
    state: IModelState;
    dispatch: TModelDispatch;
}