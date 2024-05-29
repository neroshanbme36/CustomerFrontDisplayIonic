export class TruthyCheck {
  public static isEmpty(value: string): boolean {
    return value === null || value === undefined || value.length === 0;
  }
}
