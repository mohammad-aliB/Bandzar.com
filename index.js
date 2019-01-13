var dispatcher=require("/MEME/Dispatcher/index.js");
dispatcher.setUP(80,'172.104.29.98');
dispatcher.staticDirectory('/static/','/MEME/MEME/static');
dispatcher.GetRequest('/',function(req,res){
            res.writeHead(302, {
                'Cache-Control':'no-cache, no-store, must-revalidate',
                'Pragma':'no-cache',
                'Expires':'0',
                'Location': '/static/index.html',
            });
            res.end();
        });