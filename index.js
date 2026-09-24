const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 8000;

app.use(express.urlencoded({extended:false}))

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
            return res.json({status:"failed user not found",id: id})
        }
        return res.json(user);
    })
    .patch((req,res)=> {
        const id = Number(req.params.id);
        const body = req.body;

        let user = users.find(user=> user.id===id);
        // console.log("user:",user);
        // console.log("body:",body)
        Object.assign(user,{...user,...body})

        // console.log(users.find(user=> user.id ===id))

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
            
        return res.json({status: "Success",id:id});
        })
    })
    .delete((req,res)=> {
        const id = Number(req.params.id);

        let newUsers = users.filter(user=> user.id !== id); 

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(newUsers),(err,data)=> {
            return res.json({status: "success",id:id})
        })
    })
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users",(req,res)=> {

    const body = req.body;
    // console.log("body:",body)

    users.push({id:users.length + 1,...body});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=> {
        return res.json({Status: "Success",id:users.length})
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
