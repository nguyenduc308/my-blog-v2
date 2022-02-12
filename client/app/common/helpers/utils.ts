export const sliceString = (
  value: string,
  length = 136,
  ramp = '...',
  delimiter = ' ',
) => {
  if (!value) return;

  if (value.length < length) return value;

  let text = value.substr(0, length);
  let lastIndex = text.lastIndexOf(delimiter);

  return text.substr(0, lastIndex) + ' ' + ramp;
};

export const uuid = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
