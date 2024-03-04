import { ref } from 'vue';
export const grid = ref(12);
export const useSlider = (min = 6, max = 12) => {
    const getMarks = () => {
        const l = {};
        for (let i = min; i < max + 1; i++) {
            l[i] = {
                style: {
                    color: '#fff'
                },
                label: i
            };
        }
        return l;
    };
    return {
        min,
        max,
        marks: getMarks(),
        step: 1
    };
};
