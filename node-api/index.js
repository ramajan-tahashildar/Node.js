// import fs from 'fs';
// import add from './test.js';

// setTimeout(() => {
//     // console.log('Timeout executed');
// }, 0);

// setImmediate(() => {
//     // console.log('Immediate executed');
// });

// fs.readFile('example.txt', 'utf8', (err, data) => {
//     // console.log('File read completed');
// });

// // console.log('Program started, Top Level Code Executed');

// // setTimeout(() => {
// //     console.log('Timeout after file read executed');
// // }, 0);
// // setTimeout(() => {
// //     console.log('Another timeout after file read executed');
// // },3000);
// // setImmediate(() => {
// //     console.log('Immediate after file read executed');
// // });
// add(5, 10);


import { log } from 'console';
import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req, res) => {
    const log = new Date().toISOString();
    // console.log("Request received at:", log ,"By user:", req.socket.remoteAddress);
    const parsedUrl = url.parse(req.url, true);
    // console.log("Parsed URL:", parsedUrl);
    fs.appendFileSync('server.log', `Request received at: ${log} By user: ${req.socket.remoteAddress}\n and this is the request url: ${req.url}\n`);
    switch(parsedUrl.pathname) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the home page!');
            break;
        case '/about':
            const usename = parsedUrl.query.username || 'Guest';
            console.log("Username from query:", usename);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(`This is the about page. Welcome, ${usename}!`);
            break;
        case '/contact':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is the contact page.'); 
            break;
            case '/userExists':
                const username = parsedUrl.query.username;
                console.log("Username from query:", username);
                res.end("this user is valide and exis and his name is: " + username);
                // if (username) {
                //     // Simulate checking if the user exists (in a real application, this would involve a database query)
                //     const userExists = username === 'admin'; // Example condition
                //     res.writeHead(200, { 'Content-Type': 'application/json' });
                //     res.end(JSON.stringify({ exists: userExists }));
                // } else {
                //     res.writeHead(400, { 'Content-Type': 'application/json' });
                //     res.end(JSON.stringify({ error: 'Username query parameter is required' }));
                // }
            break;
        
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            break;
    }
    // res.end('Hello, World! This is a simple HTTP server created using Node.js. It demonstrates how to handle requests and send responses.');
    // console.log("Response sent at:", new Date().toISOString());
});

server.listen(3000, () => {
    log('Server is running at http://localhost:3000/');
});

