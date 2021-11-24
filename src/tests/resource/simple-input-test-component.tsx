import React from "react";
import { fireEvent } from "@testing-library/dom";
import { useReactive } from "../../hook";

let renders: number = 0;
const getRenders = () => renders;
const getDriver = () => {
    const input = document.querySelector("input") as HTMLInputElement;

    return {
        changeInputValue: (value: string) => {
            fireEvent.change(input, { target: { value } });
        },
        getInputValue: () => {
            return input.value;
        },
    };
};

const SimpleInputComponent = ({ msg }: { msg: string }) => {
    renders++;
    let state = useReactive<{ value: string }>({ value: msg });

    const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        state.value = e.target.value;
    };

    return (
        <>
            <input
                type="input"
                onChange={handleInputChanged}
                value={state.value}
            />
        </>
    );
};

export { SimpleInputComponent, getRenders, getDriver };
