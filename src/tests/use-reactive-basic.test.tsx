import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { times } from "lodash";
import { Counter } from "../examples/counter";

describe("[useReactive basic flow suit]", () => {
    it("should update inner counter after 5 times click on the regular counter", async () => {
        render(<Counter />);
        const button = screen.getByText("counter +");
        times(6, () => {
            fireEvent.click(button);
        });
        expect(screen.getByText("counter: 0")).toBeInTheDocument();
        expect(screen.getByText("counter inner: 6")).toBeInTheDocument();
    });

    it("should take a default state and render upon change", async () => {
        const { SimpleInputComponent, getDriver } = await import(
            "./resources/simple-input-test-component"
        );
        render(<SimpleInputComponent msg="hello" />);
        const driver = getDriver();

        expect(driver.getInputValue()).toBe("hello");

        driver.changeInputValue("world");
        expect(driver.getInputValue()).toBe("world");
    });
});
