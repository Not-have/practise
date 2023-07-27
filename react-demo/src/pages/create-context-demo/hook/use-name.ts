import useModelProps from './_use-model-props';

export default function useName(): string {
    const {
        name
    } = useModelProps();

    return name;
}