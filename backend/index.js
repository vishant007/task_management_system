const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

// Created a connection to the mysql database
const db = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'task_management',
	port: 3306,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Endpoints
// to get all the tasks
app.get('/api/get', (req, res) => {
	const sqlGet = 'SELECT * FROM tasks';
	db.query(sqlGet, (error, result) => {
		res.send(result);
	});
});
// to add a new task
app.post('/api/post', (req, res) => {
	const { title, description } = req.body;
	const completed = req.body.completed || 0; // Default completed to 0 if not provided
	const sqlInsert =
		'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)';
	db.query(sqlInsert, [title, description, completed], (error, result) => {
		if (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	});
});
// to remove a task
app.delete('/api/remove/:id', (req, res) => {
	const { id } = req.params;
	const completed = req.body.completed || 0; // Default completed to 0 if not provided
	const sqlRemove = 'DELETE FROM tasks WHERE id = ?';
	db.query(sqlRemove, id, (error, result) => {
		if (error) {
			console.log(error);
		}
	});
});
// to get a task by id
app.get('/api/get/:id', (req, res) => {
	const { id } = req.params;
	const sqlGet = 'SELECT * FROM tasks where id = ?';
	db.query(sqlGet, id, (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});
// to update a task
app.put('/api/update/:id', (req, res) => {
	const { id } = req.params;
	const { title, description, completed } = req.body;
	const sqlUpdate =
		'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?';
	db.query(sqlUpdate, [title, description, completed, id], (error, result) => {
		if (error) {
			console.log(error);
		}
		res.send(result);
	});
});
// to update the checkbox for completed task
app.put('/api/updateCompleted/:id', (req, res) => {
	const { id } = req.params;
	const { completed } = req.body;
	const sqlUpdate = 'UPDATE tasks SET completed = ? WHERE id = ?';
	db.query(sqlUpdate, [completed, id], (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).json({ error: 'Internal server error' });
		} else {
			res.send(result);
		}
	});
});

app.get('/', (req, res) => {
	const sqlInsert =
		"INSERT INTO tasks (title, description, completed) VALUES ('Task one', 'Task one demo Description', 0)";
	db.query(sqlInsert, (error, result) => {
		console.log('error', error);
		console.log('result', result);
		res.send('Hello World');
	});
});

app.listen(5000, (req, res) => {
	console.log('running on port 5000');
});
