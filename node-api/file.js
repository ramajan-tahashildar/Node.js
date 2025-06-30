import fs from 'fs';

fs.writeFileSync("./simple.txt",
    "This is a simple text file created using Node.js. part of the file system module. It demonstrates how to write data to a file synchronously.",
    'utf8'
)
// console.log("File created successfully!");

fs.writeFileSync("./simple2.txt",
    "This is another simple text file created using Node.js. It also demonstrates how to write data to a file synchronously.",
    'utf8'
)
// console.log("Second file created successfully!");

//  const result = fs.readFileSync("./simple.txt", 'utf8');
//     console.log("File content:", result);

fs.readFile("./simple2.txt", 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
    } else {
        console.log("File content:", data);
    }
});


