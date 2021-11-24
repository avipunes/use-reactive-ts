import { useState, useMemo } from "react";

function observer<T extends object>(initValue: T, callback: () => void): T {
    return new Proxy(initValue, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);

            return typeof res === "object" ? observer(res, callback) : res;
        },
        set(target, key, val) {
            callback();

            return Reflect.set(target, key, val);
        },
    });
}

function useReactive<T extends object>(initialState: T): T {
    const [observerState, setObserverState] = useState<T>(initialState);

    const state = useMemo(
        () =>
            observer(observerState, () =>
                setObserverState({ ...observerState }),
            ),
        // eslint-disable-next-line
        [],
    );

    return state;
}

export { useReactive };
