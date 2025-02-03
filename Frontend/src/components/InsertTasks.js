import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InsertTask() {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState();
    const [taskPriority, setTaskPriority] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setName = (e) => {
        setTaskName(e.target.value);
    }

    const setDescription = (e) => {
        setTaskDescription(e.target.value);
    }

    const setPriority = (e) => {
        const value = e.target.value.slice(0, 12);
        setTaskPriority(value);
    };

    const addTask = async (e) => {
        e.preventDefault();

        if (!taskName || !taskDescription || !taskPriority) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:3001/addtask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "TaskName": taskName, "TaskDescription": taskDescription, "TaskPriority": taskPriority })
            });

            await res.json();

            if (res.status === 201) {
                navigate('/tasks', { state: { message: "Data Inserted" } });
            }
            else if (res.status === 422) {
                toast.error("Task is already added with that Priority.");
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
            <ToastContainer />
            <h1 className=''>Enter Task Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="task_name" className="form-label fw-bold">Task Name</label>
                <input type="text" onChange={setName} value={taskName} className="form-control fs-5" id="task_name" placeholder="Enter Task Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="task_price" className="form-label fw-bold">Task Description</label>
                <input type="text" onChange={setDescription} value={taskDescription} className="form-control fs-5" id="task_price" placeholder="Enter Task Description" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="task_Priority" className="form-label fw-bold">Task Priority</label>
                <input type="number" onChange={setPriority} value={taskPriority} maxLength={12} className="form-control fs-5" id="task_Priority" placeholder="Enter Task Priority" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/tasks" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={addTask} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Inserting...' : 'Insert'}</button>
            </div>
            <div className="col text-center col-lg-6">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}