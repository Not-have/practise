/**
 * 在这书写 Ui 层 和 model 层 都需要的类型
 */
export interface IProps {
    values?: {
        keyword: string;
        status: string;
    };
    onChange?: (value: IProps["values"]) => void;
}