const checkAuth = (req, res, next) => {
  console.log("Desde mi middleware");

  next();
};

export default checkAuth;
