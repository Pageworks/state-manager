# State Manager

A TypeScript module for building custom pushStates, replaceStates, and popstates.

### Installation

Download State Manager via NPM:

```
npm i --save @pageworks/state-manager
```

Once the package is installed import the package:

```
import Pjax from '@pageworks/state-manager';
```

### Using The State Manager

Start by instantiating a new `StateManager` class with `new StateManager();`. The State Manager class take two optional parameters. First is a boolean for enabling debug mode, by default this value is `false`. The second value is a boolean telling State Manager if an initial `window.replaceState` needs to happen, by default this value is `false`.

The State Manager offers two static functions that can be called to handle the windows push states and replace states.

| Function            | Role                                                                          |
| ------------------- |:----------------------------------------------------------------------------- |
| `doPush`            | Creates a custom state object before calling the `window.pushState` method    |
| `doReplace`         | Creates a custom state object before calling the `window.replaceState` method |

