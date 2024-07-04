function createArray(maxItem) {
  const arr = [];
  for (let index = 1; index <= maxItem; index++) {
    arr.push(index);
  }
  return arr;
}

export default createArray;
