import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Tasks() {
    const location = useLocation();
    const [taskData, setTaskData] = useState([]);

    useEffect(() => {
        if (location.state && location.state.message) {
            toast.success(location.state.message);
            window.history.replaceState({}, document.title);
        }
        getTasks();
    }, [location.state]);

    const getTasks = async () => {
        try {
            const res = await fetch("https://task-management-backend-y5jk.onrender.com/tasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log("Data Retrieved.");
                setTaskData(data);
            } else {
                console.log("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteTask = async (id) => {
        const response = await fetch(`https://task-management-backend-y5jk.onrender.com/deletetask/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log("Error");
        } else {
            console.log("Task deleted");
            getTasks();
        }
    };

    return (
        <div className='container-fluid p-5'>
            
            <h1>Tasks</h1>
            <div className='add_button'>
                <NavLink to="/addtask" className='btn btn-primary fs-5'> + Add New Task</NavLink>
            </div>
            <div className="overflow-auto mt-3" style={{ maxHeight: "38rem" }}>
                <table className="table table-striped table-hover mt-3 fs-5">
                    <thead>
                        <tr className="tr_color">
                            <th scope="col">#</th>
                            <th scope="col">Task Name</th>
                            <th scope="col">Task Description</th>
                            <th scope="col">Task Priority</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskData.map((element, id) => (
                            <tr key={id}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.TaskName}</td>
                                <td>{element.TaskDescription}</td>
                                <td>{element.TaskPriority}</td>
                                <td>
                                    <NavLink to={`/updatetask/${element._id}`} className="btn btn-primary">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteTask(element._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
