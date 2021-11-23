import { fireEvent } from "@testing-library/dom";
import { TodosState } from "../../examples/todos";
import { useReactive } from "../../hook";

let renders: number = 0;
const getRenders = () => renders;
const getDriver = () => {
    const addTodoInput = document.querySelector(
        "input[name='add-todo-input']",
    ) as HTMLInputElement;

    const addTodoBtn = document.querySelector(
        "button[name='add-todo-btn']",
    ) as HTMLInputElement;

    return {
        changeAddTodoInput: (value: string) => {
            fireEvent.change(addTodoInput, { target: { value } });
        },
        getAddTodoInputValue: () => {
            return addTodoInput.value;
        },
        clickAddTodoBtn: () => {
            fireEvent.click(addTodoBtn);
        },
    };
};

const TodosTestComponent = () => {
    renders++;
    let state = useReactive<TodosState>({
        value: "",
        todos: [],
    });

    const handleSaveEvent = () => {
        state.todos.push({
            description: state.value,
            done: false,
        });
        state.value = "";
    };

    return (
        <div>
            <input
                type="text"
                onChange={(event) => (state.value = event.target.value)}
                value={state.value}
                placeholder="Add Todo"
                name="add-todo-input"
            />
            <button onClick={handleSaveEvent} name="add-todo-btn">
                Add
            </button>

            <div>
                {state.todos.map((todo, index) => {
                    return (
                        <div className="todo" key={index}>
                            <pre>{JSON.stringify(todo)}</pre>
                            <strong>{todo.description}</strong>
                            <input
                                type="checkbox"
                                value={todo.done.toString()}
                                onChange={() => (todo.done = !todo.done)}
                                name="todo-done-toggle"
                            />
                            <button
                                onClick={() => state.todos.splice(index, 1)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export { TodosTestComponent, getRenders, getDriver };
