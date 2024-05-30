export class ArrayHelper {
    public static last<T>(arr: T[]): T | undefined {
        return arr[arr.length - 1];
    }
}
