## Log and expose middleware for zustand

This is the middleware for [Zustand](https://github.com/pmndrs/zustand) state manager that logs store changes in console and exposes them in window object.

Usage is simple:

```
const logAndExpose = createLogAndExposeMiddleware("ConsolePrefix");
```

Then use `logAndExpose` variable as middleware.

Arguments that you will pass into the creator function will prepend console message.

Exposed stores are available through `window._zustand` after any change of store.
