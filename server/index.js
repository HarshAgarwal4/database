let express = require('express');
require('dotenv').config()
const form = require('./models/form');
let cors = require('cors')
let mongoose = require('mongoose')
let app = express();

app.use(express.json());
app.use(cors())

app.get('/form/api/read-data', async (req, res) => {
    let obj = await form.find();
    res.send({status:1,msg: "Data found succesfully", data: obj});
});

app.post('/form/api/post', async (req, res) => {
    let obj = new form({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
        msg: req.body.msg
    })

    obj.save().then(()=>{
        res.send({status:1,msg: "Data inserted succesfully"})
    }).catch((err) => {
        res.send({status:0, msg:"There was an error while submitting data", error: err})
    })
})

app.delete("/form/api/delete/:id" ,async (req,res)=>{
    let id = req.params.id
    let obj = await form.deleteOne({_id:id})
    if(obj.status == 1){
        res.send({status:1, msg:"Data delted suucesfully", info: obj})
    }else{
        res.send({status:0, msg:"Data not deleted", Error: obj})
    }
})
app.put("form/api/update" , async (req,res)=> {
    let email = req.query.email;
    let name = req.query.name;
    console.log(email,name)
    let obj = await form.updateOne({email: email},{name:name})
    if(obj.status == 200){
        res.send({status:1,msg:"Data updated", obj})
    }
    else{
        res.send({status:0,msg:"Data not updated", Error: obj})
    }
})

// app.get("/form/api/Userlogin" , async (req,res)=>{
//     let username = req.query.username
//     let password = req.query.password
//     let data = {
//         username: username,
//         password: password
//     }
//     console.log(data);
    
//     let obj = await form.findOne({username: username, password: password})
//     if(obj != null){
//         res.send({status:1, msg: "Login suceesful", data: obj})
//     }else{
//         res.send({status:0, msg: "Login unsuceesful"})
//     }
// })
// app.get("/form/api/find/:id" , async (req,res)=>{
//     let id = req.params.id
//     let obj = await form.findOne({_id: id})
//     if(obj != null){
//         res.send({status:1, msg: "Data found", data: obj})
//     }else{
//         res.send({status:0, msg: "Data not found"})
//     }
// })

function dashboard(name , phone,email, password,username, msg) {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Information Dashboard</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f4f4;
        }
        .dashboard {
            width: 50%;
            margin: auto;
            background: white;
            padding: 20px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h2 {
            text-align: center;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .logout {
            display: block;
            width: 100%;
            text-align: center;
            margin-top: 20px;
        }
        .logout button {
            padding: 10px 20px;
            background: red;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
        .logout button:hover {
            background: darkred;
        }
    </style>
</head>
<body>

<div class="dashboard">
    <h2>User Information Dashboard</h2>
    <table>
        <tr>
            <th>Field</th>
            <th>Details</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>${name}</td>
        </tr>
        <tr>
            <td>Phone</td>
            <td>${phone}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>${email}</td>
        </tr>
        <tr>
            <td>Username</td>
            <td>${username}</td>
        </tr>
        <tr>
            <td>Password</td>
            <td>${password}</td>
        </tr>
        <tr>
            <td>Message</td>
            <td>${msg}</td>
        </tr>
    </table>
    <div class="logout">
        <button onclick="logout()">Logout</button>
    </div>
</div>

<script>
    function logout() {
        alert("You have been logged out.");
        window.location.href = "http://127.0.0.1:3000/9_project/client/public/login.html"; // Redirect to login page
    }
</script>

</body>
</html>`
return html
}

app.get("/form/api/Userlogin", async(req,res)=>{ 
    let username = req.query.username
    let password = req.query.password
    let data = {
        username: username,
        password: password
    }
    console.log(data);
    
    let obj = await form.findOne({username: username, password: password})
    if(obj != null){
        let a = dashboard(obj.name,obj.phone,obj.email,obj.password,obj.username,obj.msg)
        res.send(a)
    }else{
        res.send( "Login unsuccesfull")
    }
})

mongoose.connect("mongodb+srv://venom7527g:xi5rO1fZ9ax7HaH8@database.5rwoa.mongodb.net/").then(()=> {
    app.listen(process.env.port)
})