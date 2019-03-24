# 1.0.1 - 2019-03-24

### Adds

- Adds: readme

### Fixes

- Fixes: updates the functions to be static functions so they can be called without needing to instantiate a new `StateManager` class object

# 1.0.0 - 2019-02-23

### Adds

- Adds: new `StateManager` class manages the windows history
- Adds: public `doPush` method allowing front-end applicaitons to generate `history.pushState`
- Adds: public `doReplace` method allowing front-end applicaitons to replace the current history state