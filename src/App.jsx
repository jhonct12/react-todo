import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import Header from './components/Todo/Header';
import TodoComputed from './components/Todo/TodoComputed';
import TodoCreate from './components/Todo/TodoCreate';
import TodoFilter from './components/Todo/TodoFilter';
import TodoList from './components/Todo/TodoList';

const initialStateTodos = JSON.parse(localStorage.getItem('todos')) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const App = () => {
  const [todos, setTodos] = useState(initialStateTodos);

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = () => {
    switch (filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearComplete = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const handeDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      source.index === destination.index &&
      source.droppabledId === destination.droppabledId
    ) {
      return;
    }

    setTodos((prevTasks) =>
      reorder(prevTasks, source.index, destination.index),
    );
  };

  return (
    <div className="min-h-screen bg-gray-300 bg-[url(./assets/images/bg-mobile-light.jpg)] bg-contain bg-no-repeat dark:bg-gray-900 dark:bg-[url(./assets/images/bg-mobile-dark.jpg)] md:bg-[url(./assets/images/bg-desktop-light.jpg)] md:dark:md:bg-[url(./assets/images/bg-desktop-dark.jpg)]">
      <Header></Header>

      <main className="container mx-auto mt-8 px-4 md:max-w-xl">
        <TodoCreate createTodo={createTodo}></TodoCreate>

        <DragDropContext onDragEnd={handeDragEnd}>
          <TodoList
            todos={filteredTodos()}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          ></TodoList>
        </DragDropContext>

        <TodoComputed
          computedItemsLeft={computedItemsLeft}
          clearComplete={clearComplete}
        ></TodoComputed>

        <TodoFilter filter={filter} changeFilter={changeFilter}></TodoFilter>
      </main>

      <footer className="mt-8 text-center dark:text-gray-400">
        Drag and Drop to rearder list
      </footer>
    </div>
  );
};
export default App;
