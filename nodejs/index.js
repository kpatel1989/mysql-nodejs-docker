
const app = require('express')();
const mysql = require('mysql');

const bodyParser = require('body-parser');

app.use(bodyParser.json({
    limit: '8mb'
})); // support json encoded bodies

// environment variables
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

// mysql credentials
const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	port: process.env.MYSQL_PORT,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
	if (err) {
		console.error('error connecting mysql: ', err);
	} else {
		console.log('mysql connection successful');
		app.listen(PORT, HOST, (err) => {
			if (err) {
				console.error('Error starting  server', err);
			} else {
				console.log('server listening at port ' + PORT);
			}
		});
	}
});

// home page
app.get('/', (req, res) => {
	res.json({
		success: true,
		message: 'Welcome to tasks'
	});
});

// Get all the tasks into database
app.get('/tasks', (req, res) => {
	const task = req.body;
	const query = 'SELECT * FROM tasks';

	connection.query(query, (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: err
			});
		} else {
			res.json(results);
		}
	});
});
// insert a task into database
app.post('/tasks', (req, res) => {
	const task = req.body;
	const query = 'INSERT INTO tasks (dueDate, description) values(?, ?)';

	connection.query(query, [task.dueDate, task.description], (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: results
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully added task'
			});
		}
	});
});

// Update a task into database
app.put('/tasks', (req, res) => {
	const task = req.body;
	const query = 'Update tasks set dueDate = ?, description=? where taskId = ?';

	connection.query(query, [task.dueDate, task.description, task.taskId], (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: 'Error occured'
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully updated task'
			});
		}
	});
});

// Update a task into database
app.delete('/tasks', (req, res) => {
	const task = req.body;
	const query = 'delete from tasks where taskId = ?';

	connection.query(query, [task.taskId], (err, results, fields) => {
		if (err) {
			console.error(err);
			res.json({
				success: false,
				message: 'Error occured'
			});
		} else {
			res.json({
				success: true,
				message: 'Successfully deleted task'
			});
		}
	});
});
