import nodemailer from "nodemailer";


interface EmailOptions{
    email:string;
    subject:string;
    message:string;
}

const sendEmail = async (options: EmailOptions) =>{
//create a transporter
const transporter = nodemailer.createTransport({
host: process.env.EMAIL_HOST,
port: process.env.EMAIL_PORT,
auth:{
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASSWORD
}
})  

//Define email options
const emailOptions ={
    from:'Cineflix support <support@cineflix.com>',
    to:options.email,
    subject:options.subject,
    text:options.message
};
try {
    // Send email
    await transporter.sendMail(emailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
  }

}

export default sendEmail;