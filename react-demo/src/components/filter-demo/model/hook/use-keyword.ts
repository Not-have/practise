import useModelState from './_use-model-state';

export default function useKeyword(): string {
    return useModelState().keyword;
}