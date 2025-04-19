const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST || "smtp.gmail.com",
        port: process.env.SMPT_PORT || 587,
        secure: false,
        service: process.env.SMPT_SERVICE || "gmail",
        auth: {
            user: process.env.SMPT_MAIL || "saurabhdokade77@gmail.com",
            pass: process.env.SMPT_PASSWORD || "dvvi wdtc gulm kocy", // Use env for safety
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL || "saurabhdokade77@gmail.com",
        to: options.to,              // ✅ corrected
        subject: options.subject,
        text: options.text,
        html: options.html || "",    // ✅ optional HTML fallback
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
