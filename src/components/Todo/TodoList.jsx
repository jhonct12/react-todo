import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import TodoItem from './TodoItem';

const TodoList = ({ todos, removeTodo, updateTodo }) => {
  return (
    <Droppable droppableId="todos">
      {(droppableProvider) => (
        <div
          ref={droppableProvider.innerRef}
          {...droppableProvider.droppableProps}
          className="mt-8  rounded-t-md bg-white dark:bg-gray-800 [&>article]:px-4 [&>article]:py-4"
        >
          {todos.map((todo, index) => {
            return (
              <Draggable key={todo.id} index={index} draggableId={`${todo.id}`}>
                {(draggableProvider) => (
                  <TodoItem
                    todo={todo}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                    {...draggableProvider.draggableProps}
                  ></TodoItem>
                )}
              </Draggable>
            );
          })}
          {droppableProvider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;
