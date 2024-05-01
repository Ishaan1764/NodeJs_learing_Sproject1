const express=require('express');
const app=express();
const path=require("path");
const fs=require('fs');
const { fileLoader } = require('ejs');

app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"public")));
// fs.readdir jo directory de ha uska saman read krege.
app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    });
    
})

app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,filedata)=>{
        res.render("show",{filename:req.params.filename, filedata:filedata})
    });
    
})

app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename:req.params.filename})
    
});

app.post('/edit',(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(error){
        res.redirect("/");
    })
    
})
//syntax for fs.writefile
//fs.writeFile(`path/name_and every thing`,req.body(what to write),(callback for error)=>{})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(error){
        res.redirect("/");
    });
})

app.listen(3001)