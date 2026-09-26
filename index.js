const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=> {
    fs.appendFile('log.txt',`\n${Date.now()}: ${req.ip

    } : ${req.method}: ${req.path}`, (err,data) => {
        next();
    })
})

//Routes


app.get('/users', (req,res)=> {
    const html = `
    <ul>    
            ${users.map((user)=>`<li>${user.first_name}</li>` ).join("")}
    </ul>        
    `
    res.send(html)
})

// REST

app
    .route("/api/users/:id")
    .get((req,res)=> {
        const id = Number(req.params.id);
        const user = users.find((user)=> user.id ===id);

        if(!user) {
            return res.status(404).json({status:"failed user not found",id: id})
        }
        return res.status(200).json({Status:"Success",user},);
    })
    .patch((req,res)=> {
        const id = Number(req.params.id);
        const body = req.body;

        let user = users.find(user=> user.id===id);
        if(!user) {
            return res.status(404).json({status:"failed user not found",id: id})
        }
        // console.log("user:",user);
        // console.log("body:",body)
        Object.assign(user,{...user,...body})

        // console.log(users.find(user=> user.id ===id))

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
            
        return res.status(200).json({status: "Success",id:id});
        })
    })
    .delete((req,res)=> {
        const id = Number(req.params.id);
        let user = users.find(user=> user.id===id);
        if(!user) {
            return res.status(404).json({status:"failed user not found",id: id})
        }

        let newUsers = users.filter(user=> user.id !== id); 

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUsers),(err,data)=> {
            return res.json({status: "success",id:id})
        })
    })
app.get("/api/users", (req, res) => {
  return res.status(200).json(users);
});

app.post("/api/users",(req,res)=> {

    const body = req.body;
    // console.log("body:",body)

    if(!body || !body.first_name ||!body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({message: "All fields are required."})
    }

    users.push({id:users.length + 1,...body});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
        return res.status(201).json({Status: "Success",id:users.length})
    })
})

// app.get("/api/users/:id",(req,res)=> {

//     const id = Number(req.params.id)
//     const user = users.find(user=> user.id === id)

//     return    res.json(user)
// })

// app.post("/api/users", (req,res)=> {
//     return res.json("Status: Pending");
// })

// app.patch("/api/users/:id", (req,res)=> {
//     return res.json("Status: Pending");
// })

// app.delete("/api/users/:id", (req,res)=> {
//     return res.json("Status: Pending");
// })

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
