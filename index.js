try{
var dispatcher=require("/MEME/Dispatcher/index.js");//should be changed in later revision
dispatcher.setUP(80,'172.104.29.98');
dispatcher.staticDirectory('/static','/bandzar.com/bandzar.com/static');
dispatcher.GetRequest('/',function(req,res){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
                'Location': '/static/index.html',
            });
            res.end();
        });
}catch(err) {
console.log("there was this error: "+err);
}