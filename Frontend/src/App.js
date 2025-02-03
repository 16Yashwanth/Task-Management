import './App.css';
// import Home from './components/Home';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import InsertTask from './components/InsertTasks'
import UpdateTask from './components/UpdateTasks';
import About from './components/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <Navbar title="IMS" about="About"></Navbar>
      <ToastContainer/>
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/addtask" element={<InsertTask />} />
          <Route path="/updatetask/:id" element={<UpdateTask />} />
          <Route path="/about" element={<About />} />

        </Routes>

      </Router>


    </div>
  );
}

export default App;
