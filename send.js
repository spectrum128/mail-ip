var nodemailer = require('nodemailer');
var endOfLine = require('os').EOL;
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://myaddress@gmail.com:mypassword@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


var maxTries = 6;
var tries = 1;
var timer = 120000;
// send mail with defined transport object 
var toMail = 'toEmail@gmail.com'; 

var sendMail = function(mess){
	
	var htmlMessage = '<b>' + mess.replaceAll(endOfLine, '<br />') + '</b>';
	
	var mailOptions = {
    from: '"Me" <fromMe@gmail>', // sender address 
    to: toMail, // list of receivers 
    subject: 'boot up', // Subject line 
    text: mess, // plaintext body 
    html: htmlMessage// html body 
	};
	
	var cb = function(error, info){
		
			if(error){
				//console.log(error + '\n\n');
				
				
				tries++;
				
				if(tries < maxTries)
				{
					setTimeout(function(){transporter.sendMail(mailOptions, cb)}, timer);
					return;
				}
				
				return ;//console.log('Failed. Gave up after ' + maxTries + ' tries.');
				//return console.log(error);
			}
			//console.log('Message sent: ' + info.response);
	};
			

	transporter.sendMail(mailOptions, cb);

};

var exec = require('child_process').exec;
var cmd = 'ipconfig';

var tries2 = 1;

var cb2 = function(error, stdout, stderr) {
  // command output is in stdout
    if(error){  
		
		tries2++;
		
		if(tries2 < maxTries)
		{
			setTimeout(function(){exec(cmd, cb2)}, timer);
			return;
		}
	}
	
	//console.log('here it is: ');
	//console.log(stdout);
	sendMail(stdout);
};

exec(cmd, cb2);