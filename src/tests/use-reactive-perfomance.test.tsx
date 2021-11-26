import React from "react";
import { render } from "@testing-library/react";

describe("[useReactive performance suit]", () => {
    it("shouldn't increase number of renders on one level state object", async () => {
        const { SimpleInputComponent, getRenders, getDriver } = await import(
            "./resources/simple-input-test-component"
        );
        render(<SimpleInputComponent msg="hello" />);
        const driver = getDriver();

        expect(getRenders()).toBe(1);
        expect(driver.getInputValue()).toBe("hello");

        driver.changeInputValue("world");
        expect(driver.getInputValue()).toBe("world");
        expect(getRenders()).toBe(2);
    });

    it("shouldn't increase number of renders on multi levels state object", async () => {
        const { TodosTestComponent, getRenders, getDriver } = await import(
            "./resources/todo-test-component"
        );
        render(<TodosTestComponent />);
        const driver = getDriver();

        expect(getRenders()).toBe(1);

        driver.changeAddTodoInput("my todo");
        expect(driver.getAddTodoInputValue()).toBe("my todo");
        expect(getRenders()).toBe(2);

        driver.clickAddTodoBtn();
        expect(getRenders()).toBe(3);
    });
});
