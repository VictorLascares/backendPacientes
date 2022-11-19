import Paciente from "../models/Paciente.js";

const agregarPaciente = (req, res) => {
  const paciente = new Paciente(req.body);
  console.log(paciente);
};

const obtenerPacientes = (req, res) => {};

export { agregarPaciente, obtenerPacientes };
