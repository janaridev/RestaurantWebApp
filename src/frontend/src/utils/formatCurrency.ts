export const formatCurrency = (price: number | null | undefined) => {
  if (price === null) {
    return "-";
  }
  if (typeof price === "number" && !isNaN(price)) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return "-";
};
