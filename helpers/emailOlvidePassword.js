import nodemailer from "nodemailer";

const emailOlvidePassword = async (data) => {
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport(
    new sibTransport({
      apiKey: process.env.EMAIL_KEY,
    })
  );

  const { email, name, token } = data;

  // Cuerpo del Email
  const info = await transporter.sendMail({
    from: "vmlascares@gmail.com",
    to: email,
    subject: "Reestablece tu contraseña",
    // text: "Reestablece tu contraseña",
    html: `
      <p>Hola: ${name}, has solicitado reestablecer tu contraseña.</p>
      <p>
        Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer contraseña</a>
      </p> 
      <p>Si tu no creaste esta cuenta, puedes ignorar este correo</p>
    `,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
