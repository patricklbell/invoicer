const isEmpty = (obj) => {
  for (const property in obj) {
    const x = obj[property];
    if (property != 'id' && !(x === undefined || x === null || x === '')) {
      return false;
    }
  }
  return true;
};

export default isEmpty;
