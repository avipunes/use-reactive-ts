import React from "react";
import { useReactive } from "../hook";

export type Todo = {
    description: string;
    done: boolean;
};

export type TodosState = {
    todos: Todo[];
    value: string;
};

export const Todos = () => {
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
            />
            <button onClick={handleSaveEvent}>Add</button>

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
