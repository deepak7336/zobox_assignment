import { useEffect, useState } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ title: "", description: "" });
    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }
    useEffect(() => {
        axios.get("http://localhost:8000/api/todo", { params: { _id } }).then(res => {
            setData({ title: res.data.title, description: res.data.description });

        })
    }, [])
    function handleSubmit(e) {
        e.preventDefault();

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8000/api/todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}
        >
            <label htmlFor="title" className="label">
                Title
            </label>
            <input
                type="text"
                name="title"
                value={data.title}
                className="input"
                onChange={handleChange}
            />
            <label htmlFor="description" className="label">
                Description
            </label>
            <input
                type="text"
                name="description"
                value={data.description}
                className="input"
                onChange={handleChange}
            />
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    );
}
