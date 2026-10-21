mkdir RestAPILab
cd RestAPILab
npm init -y
npm install express


const express = require('express');
const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Arun", department: "IT" },
    { id: 2, name: "Priya", department: "CSE" }
];

// GET - Display all students
app.get('/students', (req, res) => {
    res.json(students);
});

// GET - Display student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student)
        return res.status(404).json({ message: "Student not found" });

    res.json(student);
});

// POST - Add a student
app.post('/students', (req, res) => {
    const student = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1 : 1,
        name: req.body.name,
        department: req.body.department
    };

    students.push(student);
    res.status(201).json(student);
});

// PUT - Update a student
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student)
        return res.status(404).json({ message: "Student not found" });

    student.name = req.body.name;
    student.department = req.body.department;

    res.json(student);
});

// DELETE - Delete a student
app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1)
        return res.status(404).json({ message: "Student not found" });

    students.splice(index, 1);
    res.json({ message: "Student deleted successfully" });
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});



node server.js

then test in postman 
