try{
var fs = require('fs');
var Handlebars = require('handlebars');
var url=require('url');

function render(filename, data)
{
    var source   = fs.readFileSync(filename,'utf8').toString();
  //source=filename
    var template = Handlebars.compile(source);
    var output = template(data);
    return output;
}
var STA256A1=JSON.parse(fs.readFileSync("/bandzar.com/bandzar.com/STA256-A1.json"));
var homepage=render("/bandzar.com/bandzar.com/templates/questionAnswer.hbs",STA256A1);

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
        var URLparamters=url.parse(req.url,true).query
        // console.log(URLparamters)
        if(Object.keys(URLparamters).length==0){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
            });
            res.write(homepage);
            res.end();
        }else if(URLparamters["q"]){
            for(x=0;x<STA256A1.articles.length;x++){
                if(STA256A1.articles[x].URL==URLparamters["q"]){
                    res.writeHead(302, {
                        'Cache-Control':'no-cache, no-store, must-revalidate',
                        'Pragma':'no-cache',
                        'Expires':'0',
                    });
                    res.write("hello world");
                    res.end();
                }
            }
        }else{
            res.writeHead(404, {
                        'Cache-Control':'no-cache, no-store, must-revalidate',
                        'Pragma':'no-cache',
                        'Expires':'0',
                    });
                res.write("not found");
                res.end();
        }
        });
console.log("the server started successfully");
}catch(err) {
console.log("there was this error: "+err);
}