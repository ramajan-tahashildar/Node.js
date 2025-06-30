// import express from 'express';
// import {user} from './database.js'
// import fs from 'fs';
// const app = express();

// const PORT = 3000;

// app.use(express.urlencoded({ extended: true }));


// app.get("/getUsers",(req, res)=>{
//     return res.json(user);
// });

// app.get("/getUsers/:id",(req,res)=>{
//   const id = req.params.id;
//   const getUserById = user.find((user)=> user.id === parseInt(id));
//     if(getUserById){
//         return res.json(getUserById);
//     }
//   else{
//     return res.status(404).send(`<h1>User with id ${id} not found</h1>`);
//   } 
// })

// // app.post("/addUser",(req,res)=>{
// //     const newUser = req.body
// //     console.log("User data",newUser);

// //     //this is creating a new user
// //     fs.appendFile('./database.js', JSON.stringify(newUser) + '\n', (err) => {
// //         if (err) {
// //             return res.status(500).send("<h1>Error adding user</h1>");
// //         }
// //         return res.send("<h1>New user added</h1>");
// //     });
// // })

// app.post("/addUser", (req, res) => {
//     const newUser = req.body;
//     console.log("User data", newUser);

//     // Read the existing data from database.js
//     fs.readFile('./database.js', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send("<h1>Error reading database</h1>");
//         }

//         // Parse the existing data and add the new user
//         let users;
//         try {
//             users = JSON.parse(data.match(/export const user = (\[.*\])/)[1]);
//         } catch (parseError) {
//             return res.status(500).send("<h1>Error parsing database</h1>");
//         }

//         users.push(newUser);

//         // Update the database.js file
//         const updatedData = `export const user = ${JSON.stringify(users, null, 2)};`;
//         fs.writeFile('./database.js', updatedData, (writeErr) => {
//             if (writeErr) {
//                 return res.status(500).send("<h1>Error updating database</h1>");
//             }

//             console.log("Updated database:", users);
//             return res.send("<h1>New user added</h1>");
//         });
//     });
// });
 
// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from 'express';
import { user } from './database.js';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded and JSON request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Add this middleware

app.get("/getUsers", (req, res) => {
    return res.json(user);
});

app.get("/getUsers/:id", (req, res) => {
    const id = req.params.id;
    const getUserById = user.find((user) => user.id === parseInt(id));
    if (getUserById) {
        return res.json(getUserById);
    } else {
        return res.status(404).send(`<h1>User with id ${id} not found</h1>`);
    }
});

// app.post("/addUser", (req, res) => {
//     const newUser = req.body;
//     console.log("User data", newUser);

//     // Read the existing data from database.js
//     fs.readFile('./database.js', 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send("<h1>Error reading database</h1>");
//         }

//         // Extract the user array from the file
//         let users;
//         try {
//             const userArrayMatch = data.match(/export const user = (\[.*\]);/s); // Match the array using regex
//             if (!userArrayMatch) {
//                 throw new Error("User array not found in database.js");
//             }
//             users = JSON.parse(userArrayMatch[1]); // Parse the array
//         } catch (parseError) {
//             console.error("Error parsing database:", parseError);
//             return res.status(500).send("<h1>Error parsing database</h1>");
//         }

//         // Add the new user to the array
//         users.push(newUser);

//         // Update the database.js file
//         const updatedData = `export const user = ${JSON.stringify(users, null, 2)};`;
//         fs.writeFile('./database.js', updatedData, (writeErr) => {
//             if (writeErr) {
//                 console.error("Error updating database:", writeErr);
//                 return res.status(500).send("<h1>Error updating database</h1>");
//             }

//             console.log("Updated database:", users);
//             return res.send("<h1>New user added</h1>");
//         });
//     });
// });
app.post("/addUser", (req, res) => {
    const newUser = req.body;
    // console.log("User data", newUser);

    // Read the existing data from database.js
    fs.readFile('./database.js', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading database:", err);
            return res.status(500).send("Error reading database");
        }

        // Safely extract the user array using eval
        let users;
        try {
            const script = data.replace('export const user =', ''); // Remove the export statement
            users = eval(script); // Evaluate the array safely
            if (!Array.isArray(users)) {
                throw new Error("Parsed data is not an array");
            }
        } catch (parseError) {
            console.error("Error parsing database:", parseError);
            return res.status(500).send("<h1>Error parsing database</h1>");
        }

        // Add the new user to the array
        users.push(newUser);

        // Update the database.js file
        const updatedData = `export const user = ${JSON.stringify(users, null, 2)};`;
        fs.writeFile('./database.js', updatedData, (writeErr) => {
            if (writeErr) {
                console.error("Error updating database:", writeErr);
                return res.status(500).send("Error updating database");
            }

            console.log("Updated database:", users);
            return res.send(newUser);
        });
    });
});


app.patch("/updateUser/:id",(req,res)=>{
    const id = req.params.id;
    const updatedUser = req.body;
    return res.send(req.body)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
