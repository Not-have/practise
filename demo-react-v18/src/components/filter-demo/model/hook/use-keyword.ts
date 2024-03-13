import useModelProps from './_use-model-props';
import useModelState from './_use-model-state';

export default function useKeyword(): string {
    const keywordProps = useModelProps().values?.keyword;
    const {
        keyword
    } = useModelState();

    return keywordProps ?? keyword;
}