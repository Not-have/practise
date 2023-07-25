import {
    ReactNode
} from 'react';
import {
    IProps
} from "../../types";

export interface IModelProviderProps {
    props: IProps;
    children: ReactNode;
}

export interface IModelContext {
    props: IProps;
}