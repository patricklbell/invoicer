const uid = function () {
  let id = '';
  for (let i = 0; i < 10; i++) {
    id = id + Math.floor(Math.random() * 10);
  }
  return id;
};

export default uid;
