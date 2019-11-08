export default class ConvertationHelper {
    static toPercents(min: number, max: number, value: number): number {
        return (value - min) * 100 / (max - min);
    }
}