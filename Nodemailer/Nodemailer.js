// const nodemailer = require("nodemailer");

// const sendWelcomeEmail = async (user) => {
//   console.log(user);
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       auth: {
//         user: "callie.anderson49@ethereal.email",
//         pass: "rJ7w8uumvpGNHdexHn",
//       },
//     });
//     const mailOptions = await transporter.sendMail({
//       from: '"Patidar Group" <jaideeppatidar3421@gmail.com>',
//       to: "jaideeppatidar3421@gmail.com",
//       subject: "Your Employee ID and Login Details",
//       html: `
//                 <div style="font-family: Arial, sans-serif; color: #333;">
//                   <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
//                   <h2>Welcome to Our Company!</h2>
//                   <p>Dear ${user.firstName} ${user.lastName},</p>
//                   <p>We are pleased to welcome you to the company. Below are your login details:</p>
//                   <ul>
//                     <li><strong>Employee ID:</strong> ${user.id}</li>
//                     <li><strong>Email:</strong> ${user.email}</li>
//                     <li><strong>Password:</strong> ${user.password}</li>
//                   </ul>
//                   <p>Please keep this information secure.</p>
//                   <p>Best regards,</p>
//                   <p>Your Company Name</p>
//                 </div>
//             `,
//       attachments: [
//         {
//           filename: "query.png",
//           path: "./img/query.png",
//           cid: "logo",
//         },
//       ],
//     });

//     await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw new Error("Failed to send email");
//   }
// };

// module.exports = { sendWelcomeEmail };


const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (user) => {
  console.log(user);
  try {
    const config ={
      service: "gmail",
      auth: {
        user: "jaideeppatidar3421@gmail.com",
        pass: "kljp uypu xzlf ldrh",
      },
    };

     const  transporter = nodemailer.createTransport(config)
    const mailOptions = await transporter.sendMail({
      from: '"Patidar Group" <jaideeppatidar3421@gmail.com>',
      to: "jaideeppatidar3421@gmail.com",
      subject: "Your Employee ID and Login Details",
      html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                  <img src="cid:logo" alt="Company Logo" style="width: 150px; margin-bottom: 20px;">
                  <h2>Welcome to Our Company!</h2>
                  <p>Dear ${user.firstName} ${user.lastName},</p>
                  <p>We are pleased to welcome you to the company. Below are your login details:</p>
                  <ul>
                    <li><strong>Employee ID:</strong> ${user.id}</li>
                    <li><strong>Email:</strong> ${user.email}</li>
                    <li><strong>Password:</strong> ${user.password}</li>
                  </ul>
                  <p>Please keep this information secure.</p>
                  <p>Best regards,</p>
                  <p>Your Company Name</p>
                </div>
            `,
      attachments: [
        {
          filename: "query.png",
          path: "./img/query.png",
          cid: "logo",
        },
      ],
    });

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendWelcomeEmail };
