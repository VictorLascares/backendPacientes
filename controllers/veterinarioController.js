const registrar = (req, res) => {
  res.send("Desde api/veterinarios");
};

const perfil = (req, res) => {
  res.send("Desde api/veterinarios/perfil");
};

export { registrar, perfil };
