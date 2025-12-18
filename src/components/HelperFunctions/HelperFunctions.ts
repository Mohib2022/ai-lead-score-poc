export const returnMaxUsedClass = (
  elements: NodeListOf<HTMLTableCellElement>
): string => {
  const commonClasses: { [key: number]: string } = {};

  elements.forEach((th) => {
    let thClassesCount = 0;
    elements.forEach((nTh) => {
      if (nTh.className === th.className) thClassesCount += 1;
    });
    commonClasses[thClassesCount] = th.className;
  });
  const maxUsedKey = Math.max(...Object.keys(commonClasses).map(Number));

  return commonClasses[maxUsedKey];
};
