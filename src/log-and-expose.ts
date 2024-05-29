import { StateCreator, StoreMutatorIdentifier } from "zustand";

type LogAndExpose = <
    T extends unknown,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
    f: StateCreator<T, Mps, Mcs>,
    name?: string
) => StateCreator<T, Mps, Mcs>;

type LogAndExposeImpl = <T extends unknown>(
    f: PopArgument<StateCreator<T, [], []>>,
    name?: string
) => PopArgument<StateCreator<T, [], []>>;

type PopArgument<T extends (...a: never[]) => unknown> = T extends (
    ...a: [...infer A, infer _]
) => infer R
    ? (...a: A) => R
    : never;

interface IOptions {
    logFunction: (...args: any[]) => void;
    disableExpose?: boolean;
}

export function createLogAndExposeMiddleware(options: IOptions) {
    const { logFunction, disableExpose } = options;

    return (storeName: string) => {
        const logAndExposeImpl: LogAndExposeImpl = (f) => (set, get) => {
            const loggedSet: typeof set = (...a) => {
                const old = get();
                set(...a);
                const new_ = get();

                const change = a[0];

                if (Object.keys(change || {}).every((x) => x.startsWith("__")))
                    return;

                logFunction(
                    `${storeName}:`,
                    Object.keys(change || {}).join(", ") || "?unknown",
                    "->",
                    {
                        old,
                        new: new_,
                        change,
                    }
                );

                if (!disableExpose) {
                    if (!(window as any)._zustand)
                        (window as any)._zustand = {};
                    (window as any)._zustand[storeName] = get();
                }
            };

            return f(loggedSet, get);
        };
        return logAndExposeImpl as unknown as LogAndExpose;
    };
}
