import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) => {
  const { email, name } = req.body;

  // Prevenir usuarios duplicados
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();

    // Enviar el email para confirmar
    emailRegistro({
      email,
      name,
      token: veterinarioGuardado.token,
    });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  const { veterinario } = req;
  res.json({ veterinario });
};

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Veterinario.findOne({ token });

  if (!usuarioConfirmar) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuarioConfirmar.token = null;
    usuarioConfirmar.confirmed = true;
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const usuario = await Veterinario.findOne({ email });

  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar si el usuario esta confirmado
  if (!usuario.confirmed) {
    const error = new Error("Usuario no esta confirmado");
    return res.status(403).json({ msg: error.message });
  }

  // Revisar el password
  if (await usuario.comprobarPassword(password)) {
    // Autenticar
    res.json({ token: generarJWT(usuario.id) });
  } else {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
  res.json({ msg: "Usuario autenticado" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const veterinario = await Veterinario.findOne({ email });

  if (!veterinario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = generarId();
    await veterinario.save();

    // Enviar email con instrucciones
    emailOlvidePassword({
      email,
      name: veterinario.name,
      token: veterinario.token,
    });
    return res.json({ msg: "Hemos enviado un email con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};
const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }
  return res.json({ msg: "Token valido" });
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password modificado correctamente" });
  } catch (error) {
    console.log(error);
  }
};
export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  forgotPassword,
  comprobarToken,
  nuevoPassword,
};
