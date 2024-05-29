## Log and expose middleware for zustand

This is the middleware for [Zustand](https://github.com/pmndrs/zustand) state manager that logs store changes in console and exposes them in window object.

Usage is simple:

```
const logAndExpose = createLogAndExposeMiddleware({
    logFunction(...args) {
        console.log("Prefix", ...args);
    },
});

```

Then use `logAndExpose` variable as middleware.

You can use any kind of logger function.

Exposed stores are available through `window._zustand` after any change of store.
