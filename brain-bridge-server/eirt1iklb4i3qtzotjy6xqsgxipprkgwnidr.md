useReducer – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../../index.html)

Search⌘CtrlK

[Learn](../../learn.html)

[Reference](../react.html)

[Community](../../community.html)

[Blog](../../blog.html)

[](https://github.com/facebook/react/releases)

### react@18.2.0

*   [Hooks](../react.html "Hooks")
    
    *   [useCallback](useCallback.html "useCallback")
    *   [useContext](useContext.html "useContext")
    *   [useDebugValue](useDebugValue.html "useDebugValue")
    *   [useDeferredValue](useDeferredValue.html "useDeferredValue")
    *   [useEffect](useEffect.html "useEffect")
    *   [useId](useId.html "useId")
    *   [useImperativeHandle](useImperativeHandle.html "useImperativeHandle")
    *   [useInsertionEffect](useInsertionEffect.html "useInsertionEffect")
    *   [useLayoutEffect](useLayoutEffect.html "useLayoutEffect")
    *   [useMemo](useMemo.html "useMemo")
    *   [useReducer](useReducer.html "useReducer")
    *   [useRef](useRef.html "useRef")
    *   [useState](useState.html "useState")
    *   [useSyncExternalStore](useSyncExternalStore.html "useSyncExternalStore")
    *   [useTransition](useTransition.html "useTransition")
    
*   [Components](components.html "Components")
    
    *   [<Fragment> (<>)](Fragment.html "<Fragment> (<>)")
    *   [<Profiler>](Profiler.html "<Profiler>")
    *   [<StrictMode>](StrictMode.html "<StrictMode>")
    *   [<Suspense>](Suspense.html "<Suspense>")
    
*   [APIs](apis.html "APIs")
    
    *   [createContext](createContext.html "createContext")
    *   [forwardRef](forwardRef.html "forwardRef")
    *   [lazy](lazy.html "lazy")
    *   [memo](memo.html "memo")
    *   [startTransition](startTransition.html "startTransition")
    

### react-dom@18.2.0

*   [Components](../react-dom/components.html "Components")
    
    *   [Common (e.g. <div>)](../react-dom/components/common.html "Common (e.g. <div>)")
    *   [<input>](../react-dom/components/input.html "<input>")
    *   [<option>](../react-dom/components/option.html "<option>")
    *   [<progress>](../react-dom/components/progress.html "<progress>")
    *   [<select>](../react-dom/components/select.html "<select>")
    *   [<textarea>](../react-dom/components/textarea.html "<textarea>")
    
*   [APIs](../react-dom.html "APIs")
    
    *   [createPortal](../react-dom/createPortal.html "createPortal")
    *   [flushSync](../react-dom/flushSync.html "flushSync")
    *   [findDOMNode](../react-dom/findDOMNode.html "findDOMNode")
    *   [hydrate](../react-dom/hydrate.html "hydrate")
    *   [render](../react-dom/render.html "render")
    *   [unmountComponentAtNode](../react-dom/unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](../react-dom/client.html "Client APIs")
    
    *   [createRoot](../react-dom/client/createRoot.html "createRoot")
    *   [hydrateRoot](../react-dom/client/hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](../react-dom/server.html "Server APIs")
    
    *   [renderToNodeStream](../react-dom/server/renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](../react-dom/server/renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](../react-dom/server/renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](../react-dom/server/renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](../react-dom/server/renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](../react-dom/server/renderToString.html "renderToString")
    

### Legacy APIs

*   [Legacy React APIs](legacy.html "Legacy React APIs")
    
    *   [Children](Children.html "Children")
    *   [cloneElement](cloneElement.html "cloneElement")
    *   [Component](Component.html "Component")
    *   [createElement](createElement.html "createElement")
    *   [createFactory](createFactory.html "createFactory")
    *   [createRef](createRef.html "createRef")
    *   [isValidElement](isValidElement.html "isValidElement")
    *   [PureComponent](PureComponent.html "PureComponent")
    

Is this page useful?

[API Reference](../react.html)

[Hooks](../react.html)

useReducer[](#undefined "Link for this heading")
================================================

`useReducer` is a React Hook that lets you add a [reducer](../../learn/extracting-state-logic-into-a-reducer.html) to your component.

    const [state, dispatch] = useReducer(reducer, initialArg, init?)

*   [Reference](#reference)
    *   [`useReducer(reducer, initialArg, init?)`](#usereducer)
    *   [`dispatch` function](#dispatch)
*   [Usage](#usage)
    *   [Adding a reducer to a component](#adding-a-reducer-to-a-component)
    *   [Writing the reducer function](#writing-the-reducer-function)
    *   [Avoiding recreating the initial state](#avoiding-recreating-the-initial-state)
*   [Troubleshooting](#troubleshooting)
    *   [I’ve dispatched an action, but logging gives me the old state value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value)
    *   [I’ve dispatched an action, but the screen doesn’t update](#ive-dispatched-an-action-but-the-screen-doesnt-update)
    *   [A part of my reducer state becomes undefined after dispatching](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching)
    *   [My entire reducer state becomes undefined after dispatching](#my-entire-reducer-state-becomes-undefined-after-dispatching)
    *   [I’m getting an error: “Too many re-renders”](#im-getting-an-error-too-many-re-renders)
    *   [My reducer or initializer function runs twice](#my-reducer-or-initializer-function-runs-twice)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useReducer(reducer, initialArg, init?)`[](#usereducer "Link for this heading")

Call `useReducer` at the top level of your component to manage its state with a [reducer.](../../learn/extracting-state-logic-into-a-reducer.html)

    import );  // ...

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `reducer`: The reducer function that specifies how the state gets updated. It must be pure, should take the state and action as arguments, and should return the next state. State and action can be of any types.
*   `initialArg`: The value from which the initial state is calculated. It can be a value of any type. How the initial state is calculated from it depends on the next `init` argument.
*   **optional** `init`: The initializer function that should return the initial state. If it’s not specified, the initial state is set to `initialArg`. Otherwise, the initial state is set to the result of calling `init(initialArg)`.

#### Returns[](#returns "Link for Returns ")

`useReducer` returns an array with exactly two values:

1.  The current state. During the first render, it’s set to `init(initialArg)` or `initialArg` (if there’s no `init`).
2.  The [`dispatch` function](#dispatch) that lets you update the state to a different value and trigger a re-render.

#### Caveats[](#caveats "Link for Caveats ")

*   `useReducer` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   In Strict Mode, React will **call your reducer and initializer twice** in order to [help you find accidental impurities.](#my-reducer-or-initializer-function-runs-twice) This is development-only behavior and does not affect production. If your reducer and initializer are pure (as they should be), this should not affect your logic. The result from one of the calls is ignored.

* * *

### `dispatch` function[](#dispatch "Link for this heading")

The `dispatch` function returned by `useReducer` lets you update the state to a different value and trigger a re-render. You need to pass the action as the only argument to the `dispatch` function:

    const [state, dispatch] = useReducer(reducer, );  // ...

React will set the next state to the result of calling the `reducer` function you’ve provided with the current `state` and the action you’ve passed to `dispatch`.

#### Parameters[](#dispatch-parameters "Link for Parameters ")

*   `action`: The action performed by the user. It can be a value of any type. By convention, an action is usually an object with a `type` property identifying it and, optionally, other properties with additional information.

#### Returns[](#dispatch-returns "Link for Returns ")

`dispatch` functions do not have a return value.

#### Caveats[](#setstate-caveats "Link for Caveats ")

*   The `dispatch` function **only updates the state variable for the _next_ render**. If you read the state variable after calling the `dispatch` function, [you will still get the old value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value) that was on the screen before your call.
    
*   If the new value you provide is identical to the current `state`, as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison, React will **skip re-rendering the component and its children.** This is an optimization. React may still need to call your component before ignoring the result, but it shouldn’t affect your code.
    
*   React [batches state updates.](../../learn/queueing-a-series-of-state-updates.html) It updates the screen **after all the event handlers have run** and have called their `set` functions. This prevents multiple re-renders during a single event. In the rare case that you need to force React to update the screen earlier, for example to access the DOM, you can use [`flushSync`.](../react-dom/flushSync.html)
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Adding a reducer to a component[](#adding-a-reducer-to-a-component "Link for Adding a reducer to a component ")

Call `useReducer` at the top level of your component to manage state with a [reducer.](../../learn/extracting-state-logic-into-a-reducer.html)

    import );  // ...

`useReducer` returns an array with exactly two items:

1.  The current state of this state variable, initially set to the initial state you provided.
2.  The `dispatch` function that lets you change it in response to interaction.

To update what’s on the screen, call `dispatch` with an object representing what the user did, called an _action_:

    function handleClick() 

React will pass the current state and the action to your reducer function. Your reducer will calculate and return the next state. React will store that next state, render your component with it, and update the UI.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function reducer(state, action) {
  if (action.type === 'incremented\_age') {
    return {
      age: state.age + 1
    };
  }
  throw Error('Unknown action.');
}

export default function Counter() {
  const \[state, dispatch\] = useReducer(reducer, );

  return (
    <\>
      <button onClick\={() \=> {
        dispatch()
      }}\>
        Increment age
      </button\>
      <p\>Hello! You are .</p\>
    </\>
  );
}

Show more

`useReducer` is very similar to [`useState`](useState.html), but it lets you move the state update logic from event handlers into a single function outside of your component. Read more about [choosing between `useState` and `useReducer`.](../../learn/extracting-state-logic-into-a-reducer.html#comparing-usestate-and-usereducer)

* * *

### Writing the reducer function[](#writing-the-reducer-function "Link for Writing the reducer function ")

A reducer function is declared like this:

    function reducer(state, action) 

Then you need to fill in the code that will calculate and return the next state. By convention, it is common to write it as a [`switch` statement.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) For each `case` in the `switch`, calculate and return some next state.

    function reducer(state, action) 

Actions can have any shape. By convention, it’s common to pass objects with a `type` property identifying the action. It should include the minimal necessary information that the reducer needs to compute the next state.

    function Form()   // ...

The action type names are local to your component. [Each action describes a single interaction, even if that leads to multiple changes in data.](../../learn/extracting-state-logic-into-a-reducer.html#writing-reducers-well) The shape of the state is arbitrary, but usually it’ll be an object or an array.

Read [extracting state logic into a reducer](../../learn/extracting-state-logic-into-a-reducer.html) to learn more.

### Pitfall

State is read-only. Don’t modify any objects or arrays in state:

    function reducer(state, action) 

Instead, always return new objects from your reducer:

    function reducer(state, action) 

Read [updating objects in state](../../learn/updating-objects-in-state.html) and [updating arrays in state](../../learn/updating-arrays-in-state.html) to learn more.

#### Basic useReducer examples[](#examples-basic "Link for Basic useReducer examples")

1. Form (object) 2. Todo list (array) 3. Writing concise update logic with Immer

#### 

Example 1 of 3:

Form (object)[](#form-object "Link for this heading")

In this example, the reducer manages a state object with two fields: `name` and `age`.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'incremented\_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed\_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

const initialState = ;

export default function Form() {
  const \[state, dispatch\] = useReducer(reducer, initialState);

  function handleButtonClick() {
    dispatch();
  }

  function handleInputChange(e) {
    dispatch({
      type: 'changed\_name',
      nextName: e.target.value
    }); 
  }

  return (
    <\>
      <input
        value\=
        onChange\=
      />
      <button onClick\=\>
        Increment age
      </button\>
      <p\>Hello, .</p\>
    </\>
  );
}

Show more

Next Example

* * *

### Avoiding recreating the initial state[](#avoiding-recreating-the-initial-state "Link for Avoiding recreating the initial state ")

React saves the initial state once and ignores it on the next renders.

    function createInitialState(username) ) {  const [state, dispatch] = useReducer(reducer, createInitialState(username));  // ...

Although the result of `createInitialState(username)` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating large arrays or performing expensive calculations.

To solve this, you may **pass it as an _initializer_ function** to `useReducer` as the third argument instead:

    function createInitialState(username) ) {  const [state, dispatch] = useReducer(reducer, username, createInitialState);  // ...

Notice that you’re passing `createInitialState`, which is the _function itself_, and not `createInitialState()`, which is the result of calling it. This way, the initial state does not get re-created after initialization.

In the above example, `createInitialState` takes a `username` argument. If your initializer doesn’t need any information to compute the initial state, you may pass `null` as the second argument to `useReducer`.

#### The difference between passing an initializer and passing the initial state directly[](#examples-initializer "Link for The difference between passing an initializer and passing the initial state directly")

1. Passing the initializer function 2. Passing the initial state directly

#### 

Example 1 of 2:

Passing the initializer function[](#passing-the-initializer-function "Link for this heading")

This example passes the initializer function, so the `createInitialState` function only runs during initialization. It does not run when component re-renders, such as when you type into the input.

TodoList.js

TodoList.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function createInitialState(username) {
  const initialTodos = \[\];
  for (let i = 0; i < 50; i++) {
    initialTodos.push({
      id: i,
      text: username + "'s task #" + (i + 1)
    });
  }
  return {
    draft: '',
    todos: initialTodos,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'changed\_draft': {
      return {
        draft: action.nextDraft,
        todos: state.todos,
      };
    };
    case 'added\_todo': {
      return {
        draft: '',
        todos: \[{
          id: state.todos.length,
          text: state.draft
        }, ...state.todos\]
      }
    }
  }
  throw Error('Unknown action: ' + action.type);
}

export default function TodoList() {
  const \[state, dispatch\] = useReducer(
    reducer,
    username,
    createInitialState
  );
  return (
    <\>
      <input
        value\=
        onChange\={e \=> {
          dispatch({
            type: 'changed\_draft',
            nextDraft: e.target.value
          })
        }}
      />
      <button onClick\={() \=> {
        dispatch();
      }}\>Add</button\>
      <ul\>
        {state.todos.map(item \=> (
          <li key\=\>
            
          </li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

Next Example

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I’ve dispatched an action, but logging gives me the old state value[](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value "Link for I’ve dispatched an action, but logging gives me the old state value ")

Calling the `dispatch` function **does not change state in the running code**:

    function handleClick() 

This is because [states behaves like a snapshot.](../../learn/state-as-a-snapshot.html) Updating state requests another render with the new state value, but does not affect the `state` JavaScript variable in your already-running event handler.

If you need to guess the next state value, you can calculate it manually by calling the reducer yourself:

    const action = 

* * *

### I’ve dispatched an action, but the screen doesn’t update[](#ive-dispatched-an-action-but-the-screen-doesnt-update "Link for I’ve dispatched an action, but the screen doesn’t update ")

React will **ignore your update if the next state is equal to the previous state,** as determined by an [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. This usually happens when you change an object or an array in state directly:

    function reducer(state, action) 

You mutated an existing `state` object and returned it, so React ignored the update. To fix this, you need to ensure that you’re always [updating objects in state](../../learn/updating-objects-in-state.html) and [updating arrays in state](../../learn/updating-arrays-in-state.html) instead of mutating them:

    function reducer(state, action) 

* * *

### A part of my reducer state becomes undefined after dispatching[](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching "Link for A part of my reducer state becomes undefined after dispatching ")

Make sure that every `case` branch **copies all of the existing fields** when returning the new state:

    function reducer(state, action)     // ...

Without `...state` above, the returned next state would only contain the `age` field and nothing else.

* * *

### My entire reducer state becomes undefined after dispatching[](#my-entire-reducer-state-becomes-undefined-after-dispatching "Link for My entire reducer state becomes undefined after dispatching ")

If your state unexpectedly becomes `undefined`, you’re likely forgetting to `return` state in one of the cases, or your action type doesn’t match any of the `case` statements. To find why, throw an error outside the `switch`:

    function reducer(state, action) 

You can also use a static type checker like TypeScript to catch such mistakes.

* * *

### I’m getting an error: “Too many re-renders”[](#im-getting-an-error-too-many-re-renders "Link for I’m getting an error: “Too many re-renders” ")

You might get an error that says: `Too many re-renders. React limits the number of renders to prevent an infinite loop.` Typically, this means that you’re unconditionally dispatching an action _during render_, so your component enters a loop: render, dispatch (which causes a render), render, dispatch (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

    // 🚩 Wrong: calls the handler during renderreturn <button onClick=>Click me</button>

If you can’t find the cause of this error, click on the arrow next to the error in the console and look through the JavaScript stack to find the specific `dispatch` function call responsible for the error.

* * *

### My reducer or initializer function runs twice[](#my-reducer-or-initializer-function-runs-twice "Link for My reducer or initializer function runs twice ")

In [Strict Mode](StrictMode.html), React will call your reducer and initializer functions twice. This shouldn’t break your code.

This **development-only** behavior helps you [keep components pure.](../../learn/keeping-components-pure.html) React uses the result of one of the calls, and ignores the result of the other call. As long as your component, initializer, and reducer functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice the mistakes.

For example, this impure reducer function mutates an array in state:

    function reducer(state, action) 

Because React calls your reducer function twice, you’ll see the todo was added twice, so you’ll know that there is a mistake. In this example, you can fix the mistake by [replacing the array instead of mutating it](../../learn/updating-arrays-in-state.html#adding-to-an-array):

    function reducer(state, action) 

Now that this reducer function is pure, calling it an extra time doesn’t make a difference in behavior. This is why React calling it twice helps you find mistakes. **Only component, initializer, and reducer functions need to be pure.** Event handlers don’t need to be pure, so React will never call your event handlers twice.

Read [keeping components pure](../../learn/keeping-components-pure.html) to learn more.

[PrevioususeMemo](useMemo.html)[NextuseRef](useRef.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../../learn.html)

[Quick Start](../../learn.html)

[Installation](../../learn/installation.html)

[Describing the UI](../../learn/describing-the-ui.html)

[Adding Interactivity](../../learn/adding-interactivity.html)

[Managing State](../../learn/managing-state.html)

[Escape Hatches](../../learn/escape-hatches.html)

[API Reference](../react.html)

[React APIs](../react.html)

[React DOM APIs](../react-dom.html)

[Community](../../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../../community/team.html)

[Docs Contributors](../../community/docs-contributors.html)

[Acknowledgements](../../community/acknowledgements.html)

More

[Blog](../../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

On this page
------------

*   [Overview](#)
*   [Reference](#reference)
*   [`useReducer(reducer, initialArg, init?)`](#usereducer)
*   [`dispatch` function](#dispatch)
*   [Usage](#usage)
*   [Adding a reducer to a component](#adding-a-reducer-to-a-component)
*   [Writing the reducer function](#writing-the-reducer-function)
*   [Avoiding recreating the initial state](#avoiding-recreating-the-initial-state)
*   [Troubleshooting](#troubleshooting)
*   [I’ve dispatched an action, but logging gives me the old state value](#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value)
*   [I’ve dispatched an action, but the screen doesn’t update](#ive-dispatched-an-action-but-the-screen-doesnt-update)
*   [A part of my reducer state becomes undefined after dispatching](#a-part-of-my-reducer-state-becomes-undefined-after-dispatching)
*   [My entire reducer state becomes undefined after dispatching](#my-entire-reducer-state-becomes-undefined-after-dispatching)
*   [I’m getting an error: “Too many re-renders”](#im-getting-an-error-too-many-re-renders)
*   [My reducer or initializer function runs twice](#my-reducer-or-initializer-function-runs-twice)

