import React from "react";
import { useReactive } from "../hook";

type CounterState = {
    counter: number;
};

type CounterInnerState = {
    inner: {
        counter: number;
    };
};

export const Counter = () => {
    let state = useReactive<CounterState>({ counter: 0 });
    let state2 = useReactive<CounterInnerState>({ inner: { counter: 1 } });

    if (state.counter > 5) {
        state2.inner.counter *= state.counter;
        state.counter = 0;
    }

    return (
        <div>
            <div>
                counter: {state.counter}
                <button onClick={() => state.counter++}>counter +</button>
            </div>
            <div>
                counter inner: {state2.inner.counter}
                <button onClick={() => state2.inner.counter++}>
                    inner counter +
                </button>
            </div>
        </div>
    );
};
