var exec = require('child_process').exec;
var cmd = 'ipconfig';
var endOfLine = require('os').EOL;


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

exec(cmd, function(error, stdout, stderr){
	 var mess = stdout.replaceAll(endOfLine, '<br />');
	 console.log(mess);
});