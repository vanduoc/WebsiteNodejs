import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let infor = await transporter.sendMail({
        from: '"Duoc Huynh 👻" <vanduoc198@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh', // Subject line
        // text: 'Hello world?', // plain text body
        html: getBodyHTMLmail(dataSend), // html body
    });
};

let getBodyHTMLmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn đã đặt lịch khám bệnh thành công trên website của chúng tôi</p>
        <p>Thông tin lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng, vui lòng nhấp vào link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn!</div>
        `;
    } else {
        result = `
            <h3>Dear, ${dataSend.patientName}</h3>
            <p>You have successfully booked a medical appointment on our website</p>
            <p>Information on medical appointments:</p>
            <div><b>Time: ${dataSend.time}</b></div>
            <div><b>Doctor: ${dataSend.doctorName}</b></div>
            <p>If the above information is correct, please click on the link below to complete the procedure to book an appointment</p>
            <div>
                <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <div>Sincerely thank!</div>
        `;
    }
    return result;
};

export default { sendSimpleEmail };
