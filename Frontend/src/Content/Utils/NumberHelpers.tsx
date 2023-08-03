export default class NumberHelper {
  static ToCurrencyString(value: number | null): string {
    return value != null
      ? value.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
      : "";
  }

  static ToPercentString(value: number | null): string {
    return value != null
      ? (value / 100).toLocaleString("en-GB", {
          style: "percent",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";
  }
}
