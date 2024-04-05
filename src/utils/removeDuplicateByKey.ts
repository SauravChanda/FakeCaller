interface ObjectWithKey {
  [key: string]: any;
}

const removeDuplicatesByKey = <T extends ObjectWithKey>(
  array: T[],
  key: string
): T[] => {
  const seen: { [key: string]: boolean } = {};
  return array.filter((item) => {
    const value = item[key];
    if (seen[value]) {
      return false;
    }
    seen[value] = true;
    return true;
  });
};

export default removeDuplicatesByKey;
