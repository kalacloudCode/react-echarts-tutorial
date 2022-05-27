import dayjs from "dayjs";

export const getTimestamp = (day) => {
  return dayjs().subtract(day, "day").valueOf();
};

export const getDates = (day) => {
  return new Array(day)
    .fill(0)
    .map((d, index) => dayjs().subtract(index, "day").format("YYYY-MM-DD"));
};
