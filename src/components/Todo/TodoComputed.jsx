const TodoComputed = ({ computedItemsLeft, clearComplete }) => {
  return (
    <section className="flex justify-between rounded-b-md bg-white px-4 py-4 dark:bg-gray-800">
      <span className="text-gray-400">{computedItemsLeft} items left</span>
      <button className="text-gray-400" onClick={() => clearComplete()}>
        Clear complete
      </button>
    </section>
  );
};

export default TodoComputed;
