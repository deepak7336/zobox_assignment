const Todo = require("../models/todo");

exports.getTodo = (req, res) => {
    // get todo by unique id
    if (req.query._id) {
        Todo.findById(req.query._id)
            .then((todo) => {
                res.json(todo);
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ message: "no todo found", error: err.message })
            );
    } else {
        Todo.find()
            .then((todo) => {
                res.json(todo);
            })
            .catch((err) =>
                res
                    .status(404)
                    .json({ message: "no todo found", error: err.message })
            );
    }
};

exports.createTodo = (req, res) => {
    Todo.create(req.body)
        .then((data) => {
            res.json({ message: "todo added successfully", data });
        })
        .catch((err) =>
            res.status(400).json({
                message: "unable to add new todo",
                error: err.message,
            })
        );
};

exports.updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body)
        .then((todo) => {
            return res.json({ message: "updated successfully", todo });
        })
        .catch((err) =>
            res
                .status(400)
                .json({ error: "unable to update todo", message: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndRemove(req.params.id, req.body).then((data) =>
        res
            .json({ message: "todo deleted successfully", data }))
        .catch((err) =>
            res
                .status(404)
                .json({ error: "book not found", message: err.message })
        )

};
