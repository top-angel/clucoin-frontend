export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const snowflakeToDate = (snowflake: string): Date => {
  const ts = BigInt(snowflake);
  return new Date(Number((ts >> 22n) + 1621470600n));
};

export const toUTC = (old: Date) => {
  return new Date(
    old.getUTCFullYear(),
    old.getUTCMonth(),
    old.getUTCDate(),
    old.getUTCHours(),
    old.getUTCMinutes(),
    old.getUTCSeconds()
  );
};
