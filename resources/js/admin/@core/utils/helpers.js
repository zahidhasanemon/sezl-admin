// 👉 IsEmpty
export const isEmpty = (value) => {
  if (value === null || value === undefined || value === "") return true;

  return !!(Array.isArray(value) && value.length === 0);
};

// 👉 IsNullOrUndefined
export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

// 👉 IsEmptyArray
export const isEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length === 0;
};

// 👉 IsObject
export const isObject = (obj) =>
  obj !== null && !!obj && typeof obj === "object" && !Array.isArray(obj);

// 👉 IsToday
export const isToday = (date) => {
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const activeStatusColor = (status) => {
  if (status == 1) return "success";
  if (status == 0) return "warning";

  return "secondary";
};

export const stockStatusColor = (status) => {
  if (status === "in_stock") return "success";
  if (status === "limited") return "warning";
  if (status === "out_of_stock") return "error";

  return "secondary";
};

export const orderStatusColor = (status) => {
  if (status === "delivered") return "success";
  if (status === "in_transit") return "primary";
  if (status === "processing") return "info";
  if (status === "confirmed") return "primary";
  if (status === "pending") return "warning";
  if (status === "cancelled") return "error";
  return "secondary";
};

export const paymentStatusColor = (status) => {
  if (status === "paid") return "success";
  if (status === "pending") return "warning";
  if (status === "refunded") return "info";
  if (status === "failed" || status === "unpaid") return "error";
  return "secondary";
};

export const platformStatus = (status) => {
  if (status === "app") return "success";
  if (status === "web") return "warning";
  return "secondary";
};
