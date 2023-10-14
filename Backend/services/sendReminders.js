const nodemailer = require('nodemailer');
const Cita = require('../models/cita');
const Usuario = require('../models/User');

const sendReminders = async () => {
  try {
    const manana = new Date();
    manana.setDate(manana.getDate() + 1);
    manana.setUTCHours(0, 0, 0, 0);

    const fechaLuegoDeManana = new Date(manana);
    fechaLuegoDeManana.setDate(fechaLuegoDeManana.getDate() + 1);

    const todasLasCitas = await Cita.find({});
    console.log('Todas las citas en la base de datos:', todasLasCitas);

    console.log('Fecha para buscar citas mañana (inicio):', manana.toISOString());
    console.log('Fecha para buscar citas mañana (fin):', fechaLuegoDeManana.toISOString());

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ibintegracioniv@gmail.com',
        pass: 'eddt fkor lgnl mwap',
      },
    });
    
    const citasManana = await Cita.find({
        fecha: {
           $gte: manana.toISOString(),
           $lte: fechaLuegoDeManana.toISOString(),
        },
        reservada: true,
        //especialidad: "Pediatría",
      });
      
    

    console.log('Citas encontradas para mañana:', citasManana);

    for (const cita of citasManana) {
      const usuario = await Usuario.findOne({ rut: cita.pacienteRut });

      if (usuario) {
        const mailOptions = {
          from: 'ibintegracioniv@gmail.com',
          to: usuario.correo,
          subject: `Recordatorio de cita con el Dr. ${cita.doctor}`,
          html: `
            <p>Tiene una cita con el Dr. ${cita.doctor} el ${new Date(cita.fecha).toLocaleString()}.</p>
            <img src="https://scontent.fccp1-1.fna.fbcdn.net/v/t1.6435-9/83536078_2633443550222361_8446986153264939008_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeEMLvmfBLZpUuZjYghnu9U0IMSDqcLYHN4gxIOpwtgc3sPL5TvcGqdedoirLmvXZMsF5c8hmtdSVBbnj5Bz-EBD&_nc_ohc=i-EL3eUBPAAAX_M8b9d&_nc_ht=scontent.fccp1-1.fna&oh=00_AfC7ixQXwZ3MGSVm1Ya38ghE6HmIvUd1WqCrnelNNwSMMw&oe=655150D3" alt="Imagen de la cita">
          `,
        };
        
      
        await transporter.sendMail(mailOptions);

        console.log(`Correo enviado a ${cita.pacienteRut} (${usuario.correo})`);
      }
    }

    console.log('Recordatorios enviados con éxito');
  } catch (error) {
    console.error('Error al enviar recordatorios por correo electrónico:', error);
  }
};

module.exports = sendReminders;