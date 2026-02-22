import { useDispatch, useSelector } from "react-redux";
import { deleteTask, setEditingTask } from "../features/tasks/taskSlice";

const TaskTable = () => {
  const dispatch = useDispatch();
  const { list, search } = useSelector((state) => state.tasks);

  const filtered = list.filter((task) =>
    task.title?.toLowerCase().includes(search.toLowerCase())
  );

  if (!filtered.length) {
    return <p className="mt-4 text-center text-[22px] ">No records found</p>;
  }

  return (
    <table className="w-full bg-white rounded shadow">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((task) => (
          <tr key={task.id} className="text-center border-t">
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate}</td>
            <td>{task.priority}</td>
            <td>
              <button
                onClick={() => dispatch(setEditingTask(task))}
                className="px-2 py-1 mr-2 text-white bg-yellow-500 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;