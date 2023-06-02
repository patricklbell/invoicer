const makeLink = (loc, to) => {
  console.log(loc);
  if (loc?.pathname === to) return { to, state: loc?.state };
  return { to, state: { from: loc } };
};

export default makeLink;
