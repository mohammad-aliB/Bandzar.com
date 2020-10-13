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
var STA256A1=JSON.parse(fs.readFileSync("/bandzar.com/bandzar.com/STA256-A1.json").toString().replace(/\\/g,"\\\\").replace(/\n/g,""));
var STA256A3=JSON.parse(fs.readFileSync("/bandzar.com/bandzar.com/STA256-A3.json").toString().replace(/\\/g,"\\\\").replace(/\n/g,""));
var Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2=JSON.parse(fs.readFileSync("/bandzar.com/bandzar.com/Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2.json").toString().replace(/\\/g,"\\\\").replace(/\n/g,""));
var STA256A1homepage=render("/bandzar.com/bandzar.com/templates/questionAnswer.hbs",STA256A1);
var STA256A3homepage=render("/bandzar.com/bandzar.com/templates/questionAnswer.hbs",STA256A3);
var Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2homepage=render("/bandzar.com/bandzar.com/templates/questionAnswer.hbs",Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2);
var STA256A1Articles={}
var articles={}
for(x=0;x<STA256A1.articles.length;x++){
    var article=render("/bandzar.com/bandzar.com/templates/questionAnswerArticle.hbs",STA256A1.articles[x]);
    articles[STA256A1.articles[x].URL]=article;
}
for(x=0;x<STA256A3.articles.length;x++){
    var article=render("/bandzar.com/bandzar.com/templates/questionAnswerArticle.hbs",STA256A3.articles[x]);
    articles[STA256A3.articles[x].URL]=article;
}
for(x=0;x<Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2.articles.length;x++){
    var article=render("/bandzar.com/bandzar.com/templates/questionAnswerArticle.hbs",Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2.articles[x]);
    articles[Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2.articles[x].URL]=article;
}
// console.log(STA256A1Articles)


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
dispatcher.GetRequest('/Article',function(req,res){
    var URLparamters=url.parse(req.url,true).query
    error=1
    if(URLparamters["q"]){
        if(articles[URLparamters["q"]]){
            error=0
            res.writeHead(200, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
            });
            res.write(articles[URLparamters["q"]]);
            res.end();
        }
    }
    if(error==1){
        res.writeHead(404, {
            'Cache-Control':'no-cache, no-store, must-revalidate',
            'Pragma':'no-cache',
            'Expires':'0',
        });
        res.write("not found");
        res.end();
    }
});
dispatcher.GetRequest('/STA256-A1',function(req,res){
        res.writeHead(200, {
            'Cache-Control':'no-cache, no-store, must-revalidate',
            'Pragma':'no-cache',
            'Expires':'0',
        });
        res.write(STA256A1homepage);
        res.end();
});
dispatcher.GetRequest('/STA256-A3',function(req,res){
        res.writeHead(200, {
            'Cache-Control':'no-cache, no-store, must-revalidate',
            'Pragma':'no-cache',
            'Expires':'0',
        });
        res.write(STA256A3homepage);
        res.end();
});
dispatcher.GetRequest('/Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2',function(req,res){
        res.writeHead(200, {
            'Cache-Control':'no-cache, no-store, must-revalidate',
            'Pragma':'no-cache',
            'Expires':'0',
        });
        res.write(Probability_and_Statistics_The_Science_of_Uncertainty_Chapter_2homepage);
        res.end();
});
console.log("the server started successfully");
}catch(err) {
console.log("there was this error: "+err);
}