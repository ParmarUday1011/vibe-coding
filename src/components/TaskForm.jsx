import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setEditingTask } from "../features/tasks/taskSlice";

const TaskForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const { editing } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        description: editing.description || "",
        dueDate: editing.dueDate || "",
        priority: editing.priority || "Low",
      });
    } else {
      setForm({ title: "", description: "", dueDate: "", priority: "Low" });
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.dueDate) {
      alert("All fields required");
      return;
    }

    if (editing) {
      dispatch(updateTask({ id: editing.id, ...form }));
      dispatch(setEditingTask(null));
    } else {
      dispatch(addTask(form));
    }
    setForm({ title: "", description: "", dueDate: "", priority: "Low" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white rounded shadow"
    >
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Low</option>
        <option>High</option>
        <option>Medium</option>
      </select>

      <div className="flex gap-2">
        <button type="submit" className="flex-1 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
          {editing ? "Update Task" : "Add Task"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => dispatch(setEditingTask(null))}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
