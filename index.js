const express = require('express');
const app = express();
const request = require('request');
const path = require('path');
var url = 'http://api.weatherstack.com/current?access_key=3077f467c693e46535dbf083f43a77af&query=';
var hbs = require('hbs');
const fs = require('fs');


const addDetails = function(email,password,name){
    const details = loadDetails();
    const duplicateDetails = details.filter((detail)=>{
        return detail.email === email;
    });
    if(duplicateDetails.length === 0){
        details.push({
            email:email,
            password:password,
            name:name,
        })
        return saveDetails(details);
    }
    else{
        return 'Email Id already registered'
    }   
}

const readDetail = (email)=>{
    const details = loadDetails();
    const detailToBeRead = details.find((detail)=>{
        return detail.email === email
    });
    if(detailToBeRead){
        return "Done"
    }
    else{
        return "not found";
    }
}

const saveDetails = (details)=>{
    const dataJSON = JSON.stringify(details);
    fs.writeFileSync('details.json',dataJSON);
    return "Done"
}

const loadDetails = ()=>{
    try{
        const dataBuffer = fs.readFileSync('details.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); 
    }
    catch (e){
        return [];
    }
}

const loadTask = ()=>{
    try{
        const dataBuffer = fs.readFileSync('tasks.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); 
    }
    catch (e){
        return [];
    }
}

const saveTasks = (tasksDetails)=>{
    const dataJSON = JSON.stringify(tasksDetails);
    fs.writeFileSync('tasks.json',dataJSON);
    return "Done"
}


const addTasks = function(task,email){
    var tasksDetails = loadTask();
    tasksDetails.push({
        work:task,
        email:email,})
    saveTasks(tasksDetails);   
    return "good"
}

const readTasks = (email)=>{
    const tasksDetails = loadTask();
    var tasksToBeRead = [];
    var i;
    for(i=0;i<tasksDetails.length;i++){
        if(tasksDetails[i].email==email){
            tasksToBeRead.push(tasksDetails[i])
        }
    };
    if(tasksToBeRead){
        return tasksToBeRead;
    }
    else{
        return "not found";
    }
}

const removeTasks = (email)=>{
    const tasksDetails = loadTask();
    var tasksToKeep = [];
    var i;
    for(i=0;i<tasksDetails.length;i++){
        if(tasksDetails[i].email!==email){
            tasksToKeep.push(tasksDetails[i])
        }
    }
    saveTasks(tasksToKeep);
}



var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ 
    extended: true
}));

app.set('view engine', 'hbs');


const director = path.join(__dirname,'/static');
app.use(express.static(director))

app.get('/weather',(req,res)=>{
    loc = req.query.location1
    url = 'http://api.weatherstack.com/current?access_key=3077f467c693e46535dbf083f43a77af&query='+loc
    console.log(loc)
    request({url:url},(error,response)=>{
        var data = JSON.parse(response.body)
        res.send(data);
    });
    
})

app.get('/',(req,res)=>{   
    res.render('login1');
});

app.post('/index',(req,res)=>{
    var detail1 = req.body
    if(detail1.submit==="Sign up"){
        var a = addDetails(detail1.email,detail1.password,detail1.name);
        if(a!=="Done"){
            res.render('login1');
        }
        else{
            res.render('index',{name1:detail1.name,email1:detail1.email});
        }
    }
    else{
        if(detail1.submit1==="SignIn"){
            var b = readDetail(detail1.email)
            if(b!=="Done"){
                res.render('login1')
            }
            else{
                
                c1 = readTasks(detail1.email);
                res.render('index',{yourtasks:c1,name1:detail1.name,email1:detail1.email});
            }
        }
    }
})


app.get('/index',(req,res)=>{
    var tasks = req.query;
    var tasks1 = req.query.name;
    console.log(tasks1)
    var tasks20 = req.query.delete;
    var tasks2 = req.query.Add;
    if(tasks2!==undefined){
        var tasks3 = tasks2.slice(3);
        console.log(tasks3)
        var tasks0 = tasks2.slice(0,3);
        console.log(tasks0)
        if(tasks0==="Add"){
            if(tasks1!==null || tasks1!==undefined || tasks1!==""){
                addTasks(tasks1,tasks3)
            }
            
        }
    }
    
    if(tasks20!==undefined){
        var tasks4 = tasks20.slice(6);
        var tasks9 = tasks20.slice(0,6)
        console.log(tasks9)
        if(tasks9==="delete"){
            removeTasks(tasks4)
        }
    }
    f = tasks3 || tasks4
    c = readTasks(f);
    console.log(c)
    res.render('index',{yourtasks:c,email1:f});
})

app.listen(process.env.PORT || 3000);







