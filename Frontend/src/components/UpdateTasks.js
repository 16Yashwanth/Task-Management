import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function UpdateTask() {
    const [taskName, setTaskName] = useState("");
    const [taskPrice, setTaskDescription] = useState();
    const [taskPriority, setTaskPriority] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setName = (e) => {
        setTaskName(e.target.value);
    };

    const setDescription = (e) => {
        setTaskDescription(e.target.value);
    };

    const setPriority = (e) => {
        const value = e.target.value.slice(0, 12);
        setTaskPriority(value);
    };

    const { id } = useParams();

    useEffect(() => {
        const getTask = async () => {
            try {
                const res = await fetch(`https://task-management-backend-y5jk.onrender.com/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.");
                    setTaskName(data.TaskName);
                    setTaskDescription(data.TaskDescription);
                    setTaskPriority(data.TaskPriority);
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getTask();
    }, [id]);

    const updateTask = async (e) => {
        e.preventDefault();

        if (!taskName || !taskPrice || !taskPriority) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://task-management-backend-y5jk.onrender.com/updatetask/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "TaskName": taskName, "TaskDescription": taskPrice, "TaskPriority": taskPriority })
            });

            await response.json();

            if (response.status === 201) {
                navigate('/tasks', { state: { message: "Data Updated" } });
            } else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid p-5'>
            <h1 className=''>Enter Task Information</h1>
            <div className="mt-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="task_name" className="form-label fs-4 fw-bold">Task Name</label>
                <input type="text" onChange={setName} value={taskName} className="form-control fs-5" id="task_name" placeholder="Enter Task Name" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12">
                <label htmlFor="task_price" className="form-label fs-4 fw-bold">Task Description</label>
                <input type="text" onChange={setDescription} value={taskPrice} className="form-control fs-5" id="task_price" placeholder="Enter Task Description" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                <label htmlFor="task_Priority" className="form-label fs-4 fw-bold">Task Priority</label>
                <input type="number" onChange={setPriority} value={taskPriority} maxLength={12} className="form-control fs-5" id="task_Priority" placeholder="Enter Task Priority" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/tasks" className='btn btn-primary me-5 fs-4'>Cancel</NavLink>
                <button type="submit" onClick={updateTask} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
            </div>
            <div className="col text-center col-lg-6 ">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    );
}
