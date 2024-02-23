import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddTask.css';

const initialState = {
	title: '',
	description: '',
	completed: false,
};

const AddTask = () => {
	const [task, setTask] = useState(initialState);

	const { title, description, completed } = task;
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/get/${id}`)
			.then((resp) => {
				const data = resp.data;
				if (data && data.length > 0) {
					setTask(data[0]);
				} else {
					console.error('No task found with the provided ID');
				}
			})
			.catch((err) => {
				console.error('Error fetching task:', err);
			});
	}, [id]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!title || !description) {
			return toast.warning('Please fill in all fields');
		} else {
			if (!id) {
				axios
					.post('http://localhost:5000/api/post', {
						title,
						description,
						completed,
					})
					.then(() => {
						setTask(initialState);
					})
					.catch((err) => {
						toast.error(err.response.data);
					});
				toast.success('Task added successfully');
			} else {
				axios
					.put(`http://localhost:5000/api/update/${id}`, {
						title,
						description,
						completed,
					})
					.then(() => {
						setTask(initialState);
					})
					.catch((err) => {
						toast.error(err.response.data);
					});
				toast.success('Task updated successfully');
			}

			setTimeout(() => {
				navigate('/');
			}, 500);
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setTask({ ...task, [name]: value });
	};

	return (
		<div style={{ marginTop: '100px' }}>
			<form
				style={{
					margin: 'auto',
					padding: '15px',
					maxWidth: '500px',
					alignContent: 'center',
				}}
				onSubmit={handleSubmit}
			>
				<label htmlFor='title'>Task Title</label>
				<input
					type='text'
					id='title'
					name='title'
					placeholder='Title of your task...'
					value={title || ''}
					onChange={handleInputChange}
				/>
				<label htmlFor='title'>Description</label>
				<input
					type='text'
					id='description'
					name='description'
					placeholder='Description of your task...'
					value={description || ''}
					onChange={handleInputChange}
				/>

				<input type='submit' value={id ? 'Update' : 'Save'} />
				<Link to='/'>
					<input type='button' value='Go Back' />
				</Link>
			</form>
		</div>
	);
};

export default AddTask;
