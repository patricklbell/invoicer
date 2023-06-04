const makeLink = (loc, to) => {
  if (loc?.pathname === to) return { to, state: loc?.state };
  return { to, state: { from: loc } };
};

export default makeLink;
