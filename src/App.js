import { useDispatch } from 'react-redux';
import './App.css';
import { fetchTasks } from './features/tasks/taskSlice';
import { useEffect } from 'react';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import TaskTable from './components/TaskTable';

function App() {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className='text-3xl font-bold text-center text-transparent inline-block-block text-c bg-gradient-to-r from-blue-600 via-pink-300 to-red-500 bg-clip-text'>Task manager App</h1>
        <TaskForm />
        <SearchBar />
        <TaskTable />
      </div>
    </div>
  );
}

export default App;
