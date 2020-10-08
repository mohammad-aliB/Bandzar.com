try{
var fs = require('fs');
var Handlebars = require('handlebars');

function render(filename, data)
{
    var source   = fs.readFileSync(filename,'utf8').toString();
  //source=filename
    var template = Handlebars.compile(source);
    var output = template(data);
    return output;
}
var STA256A1=JSON.parse(fs.readFileSync("STA256-A1.json"));
var homepage=render("/templates/questionAnswer.hbs");

var dispatcher=require("/MEME/Dispatcher/index.js");//should be changed in later revision
dispatcher.setUP(80,'172.104.29.98');
dispatcher.staticDirectory('/static','/bandzar.com/bandzar.com/static');
dispatcher.GetRequest('/favicon.ico',function(req,res){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
                'Location': '/static/favicon.ico',
            });
            res.end();
        });
dispatcher.GetRequest('/',function(req,res){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
                'Location': '/static/index.html',
            });
            res.end();
        });
dispatcher.GetRequest('/STA256-A1',function(req,res){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
            });
            res.write(render("Handlebars <b>{{doesWhat}}</b>",{ doesWhat: "rocks!" }));
            res.end();
        });
console.log("the server started successfully");
}catch(err) {
console.log("there was this error: "+err);
}