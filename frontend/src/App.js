import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Home from './pages/Home';
import AddTask from './pages/AddTask';

function App() {
	return (
		<BrowserRouter>
			{/* Routing of entire frontend */}
			<div className='App'>
				<ToastContainer position='top-center' />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/addTask' element={<AddTask />} />
					<Route path='/updateTask/:id' element={<AddTask />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
