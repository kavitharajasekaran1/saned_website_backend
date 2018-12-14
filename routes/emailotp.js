const cors = require('cors')
const express = require('express');
const nodemailer = require('nodemailer')
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(express.json());
const router = express.Router();

router.post("/emailotp", (req, res) => {
	userResults = req.body;
	console.log(userResults, "request")
	var otp = "";
	var possible = "0123456789";
	for (var i = 0; i < 4; i++)
		otp += possible.charAt(Math.floor(Math.random() * possible.length));
	var remoteHost = "192.168.0.29:3000";
	console.log(remoteHost);

	var encodedMail = new Buffer(req.body.email).toString('base64');
	var link = "http://" + remoteHost + "/marine/user/verify?mail=" + encodedMail;
	var userResults;
	console.log(userResults);

	console.log("results: " + userResults.email);
	emailtosend = userResults.email;
	var transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: "manoj.savaram@rapidqube.com",
			pass: "M$Hpqb$2018"
		}
	});
	var remoteHost = "119.81.59.59:8000"
	var link = "http://" + remoteHost + "/email/verify?mail=" + encodedMail;
	console.log(link);

	var mailOptions = {
		transport: transporter,
		from: "Aman Services" + "<manoj.savaram@rapidqube.com>",
		to: req.body.email,
		subject: 'Aman Service-OTP Confirmation',

		html: "Email confirmation from Aman services,<br> Your Otp is.<br> " + otp + "<br>" +
			"تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your Otp is. <br>" + otp

	};
	transporter.sendMail(mailOptions, (error, info) => {
		console.log(info, "information")
		res.send({
			Message: "please check your email for otp",
			الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
		})
		if (error) {
			console.log("Mail send error: ", error);
		}
	});
});
module.exports = router;