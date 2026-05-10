const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function enviarCodigoVerificacao(email, codigo) {
  await transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Código de Verificação - TaskFlow',
    html:`<div style="font-family:Arial; max-width:400px; margin:0 auto;">
                <h2 style="color:#6366f1;">TaskFlow</h2>
                <p>Seu código de verificação é:</p>
                <div style="background:#f3f4f6; padding:20px; border-radius:10px; text-align:center;">
                    <span style="font-size:32px; font-weight:bold; letter-spacing:8px;">${codigo}</span>
                </div>
                <p style="color:#9ca3af; font-size:13px;">Expira em 10 minutos.</p>
            </div>`
  })
}
async function enviarEmailRedefinicao(email, codigo) {
  await transporter.sendMail({
    from : `"TaskFlow" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Redefinição de Senha - TaskFlow',
    html: `<div style="font-family:Arial; max-width:400px; margin:0 auto;">
                <h2 style="color:#6366f1;">TaskFlow</h2>
                <p>Seu codigo de recuperacao de senha e:</p>
                <div style="background:#f3f4f6; padding:20px; border-radius:10px; text-align:center;">
                    <span style="font-size:32px; font-weight:bold; letter-spacing:8px;">${codigo}</span>
                </div>
                <p style="color:#9ca3af; font-size:13px;">Expira em 10 minutos.</p>
            </div>`
  })
}

module.exports ={ enviarCodigoVerificacao, enviarEmailRedefinicao }
