 // Import nodemailer for sending emails

import nodemailer from 'nodemailer'


// sendMail function accepts an object with sender, recipient, subject, and body
export const sendMail = async ({ mailFrom, mailTo, subject, body }) => {
    try {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, 
            port: process.env.EMAIL_PORT, 
            secure: true,
            auth: {
                user: process.env.EMAIL_USER, // SMTP username
                pass: process.env.EMAIL_PASS, // SMTP password
            },
        })

        // Send email using transporter
        const info = await transporter.sendMail({
            from: mailFrom, 
            to: mailTo,     
            subject,       
            html: body      
        })

        console.log('Email Sent:', info.messageId) 
    } catch (error) {
        throw new Error("Email sending failed") 
    }
}
