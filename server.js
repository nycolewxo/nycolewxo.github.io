const fs=require("fs");
const express = require("express");
const path=require("path");
const app = express();
const port = 3000;

const remoteServerUrl='http://localhost:8080';

app.use(express.static(path.join(__dirname,'public')));

app.use(async(req,res,next)=>{
    try{
        const response=await fetch(`${remoteServerUrl}${req.originalUrl}`);
        if(response.ok){
            const data = await response.text();
            const cacheFilePath = path.join(__dirname, 'cache', req.originalUrl);
            fs.mkdirSync(path.dirname(cacheFilePath), { recursive: true });
            fs.writeFileSync(cacheFilePath, data, 'utf8');
            res.redirect(`${remoteServerUrl}${req.originalUrl}`);
        }
        else{
            next();
        }
    }
    catch(error){
        next();
    }
});

app.get(['/','/information','/education','/experience','/projects','/technicalskills','/coursework'],(req,res)=>{
    const cacheFilePath=path.join(__dirname,'cache',req.originalUrl);
    fs.readFile(cacheFilePath,'utf8',(err,data)=>{
        if(err){
            if(err.code==='ENOENT'){
                res.status(404).send('Cached data not found');
            }
            else{
                res.status(500).send('Failed to read cache file');
            }
            return;
        }
        try{
            if(req.path.endsWith('.json')){
                res.json(JSON.parse(data));
            }
            else{
                res.send(data);
            }
        }
        catch(error){
            console.error('Failed to parse JSON from cache: ',error);
            res.status(500).send('Error processing cache data');
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});


