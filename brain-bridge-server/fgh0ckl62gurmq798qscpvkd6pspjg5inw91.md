Referencing Values with Refs – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../index.html)

Search⌘CtrlK

[Learn](../learn.html)

[Reference](../reference/react.html)

[Community](../community.html)

[Blog](../blog.html)

[](https://github.com/facebook/react/releases)

### GET STARTED

*   [Quick Start](../learn.html "Quick Start")
    
    *   [Tutorial: Tic-Tac-Toe](tutorial-tic-tac-toe.html "Tutorial: Tic-Tac-Toe")
    *   [Thinking in React](thinking-in-react.html "Thinking in React")
    
*   [Installation](installation.html "Installation")
    
    *   [Start a New React Project](start-a-new-react-project.html "Start a New React Project")
    *   [Add React to an Existing Project](add-react-to-an-existing-project.html "Add React to an Existing Project")
    *   [Editor Setup](editor-setup.html "Editor Setup")
    *   [React Developer Tools](react-developer-tools.html "React Developer Tools")
    

### LEARN REACT

*   [Describing the UI](describing-the-ui.html "Describing the UI")
    
    *   [Your First Component](your-first-component.html "Your First Component")
    *   [Importing and Exporting Components](importing-and-exporting-components.html "Importing and Exporting Components")
    *   [Writing Markup with JSX](writing-markup-with-jsx.html "Writing Markup with JSX")
    *   [JavaScript in JSX with Curly Braces](javascript-in-jsx-with-curly-braces.html "JavaScript in JSX with Curly Braces")
    *   [Passing Props to a Component](passing-props-to-a-component.html "Passing Props to a Component")
    *   [Conditional Rendering](conditional-rendering.html "Conditional Rendering")
    *   [Rendering Lists](rendering-lists.html "Rendering Lists")
    *   [Keeping Components Pure](keeping-components-pure.html "Keeping Components Pure")
    
*   [Adding Interactivity](adding-interactivity.html "Adding Interactivity")
    
    *   [Responding to Events](responding-to-events.html "Responding to Events")
    *   [State: A Component's Memory](state-a-components-memory.html "State: A Component's Memory")
    *   [Render and Commit](render-and-commit.html "Render and Commit")
    *   [State as a Snapshot](state-as-a-snapshot.html "State as a Snapshot")
    *   [Queueing a Series of State Updates](queueing-a-series-of-state-updates.html "Queueing a Series of State Updates")
    *   [Updating Objects in State](updating-objects-in-state.html "Updating Objects in State")
    *   [Updating Arrays in State](updating-arrays-in-state.html "Updating Arrays in State")
    
*   [Managing State](managing-state.html "Managing State")
    
    *   [Reacting to Input with State](reacting-to-input-with-state.html "Reacting to Input with State")
    *   [Choosing the State Structure](choosing-the-state-structure.html "Choosing the State Structure")
    *   [Sharing State Between Components](sharing-state-between-components.html "Sharing State Between Components")
    *   [Preserving and Resetting State](preserving-and-resetting-state.html "Preserving and Resetting State")
    *   [Extracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.html "Extracting State Logic into a Reducer")
    *   [Passing Data Deeply with Context](passing-data-deeply-with-context.html "Passing Data Deeply with Context")
    *   [Scaling Up with Reducer and Context](scaling-up-with-reducer-and-context.html "Scaling Up with Reducer and Context")
    
*   [Escape Hatches](escape-hatches.html "Escape Hatches")
    
    *   [Referencing Values with Refs](referencing-values-with-refs.html "Referencing Values with Refs")
    *   [Manipulating the DOM with Refs](manipulating-the-dom-with-refs.html "Manipulating the DOM with Refs")
    *   [Synchronizing with Effects](synchronizing-with-effects.html "Synchronizing with Effects")
    *   [You Might Not Need an Effect](you-might-not-need-an-effect.html "You Might Not Need an Effect")
    *   [Lifecycle of Reactive Effects](lifecycle-of-reactive-effects.html "Lifecycle of Reactive Effects")
    *   [Separating Events from Effects](separating-events-from-effects.html "Separating Events from Effects")
    *   [Removing Effect Dependencies](removing-effect-dependencies.html "Removing Effect Dependencies")
    *   [Reusing Logic with Custom Hooks](reusing-logic-with-custom-hooks.html "Reusing Logic with Custom Hooks")
    

Is this page useful?

[Learn React](../learn.html)

[Escape Hatches](escape-hatches.html)

Referencing Values with Refs[](#undefined "Link for this heading")
==================================================================

When you want a component to “remember” some information, but you don’t want that information to [trigger new renders](render-and-commit.html), you can use a _ref_.

### You will learn

*   How to add a ref to your component
*   How to update a ref’s value
*   How refs are different from state
*   How to use refs safely

Adding a ref to your component[](#adding-a-ref-to-your-component "Link for Adding a ref to your component ")
------------------------------------------------------------------------------------------------------------

You can add a ref to your component by importing the `useRef` Hook from React:

    import  from 'react';

Inside your component, call the `useRef` Hook and pass the initial value that you want to reference as the only argument. For example, here is a ref to the value `0`:

    const ref = useRef(0);

`useRef` returns an object like this:

    

![An arrow with 'current' written on it stuffed into a pocket with 'ref' written on it.](../images/docs/illustrations/i_ref.png)

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

You can access the current value of that ref through the `ref.current` property. This value is intentionally mutable, meaning you can both read and write to it. It’s like a secret pocket of your component that React doesn’t track. (This is what makes it an “escape hatch” from React’s one-way data flow—more on that below!)

Here, a button will increment `ref.current` on every click:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick\=\>
      Click me!
    </button\>
  );
}

Show more

The ref points to a number, but, like [state](state-a-components-memory.html), you could point to anything: a string, an object, or even a function. Unlike state, ref is a plain JavaScript object with the `current` property that you can read and modify.

Note that **the component doesn’t re-render with every increment.** Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not!

Example: building a stopwatch[](#example-building-a-stopwatch "Link for Example: building a stopwatch ")
--------------------------------------------------------------------------------------------------------

You can combine refs and state in a single component. For example, let’s make a stopwatch that the user can start or stop by pressing a button. In order to display how much time has passed since the user pressed “Start”, you will need to keep track of when the Start button was pressed and what the current time is. **This information is used for rendering, so you’ll keep it in state:**

    const [startTime, setStartTime] = useState(null);const [now, setNow] = useState(null);

When the user presses “Start”, you’ll use [`setInterval`](https://developer.mozilla.org/docs/Web/API/setInterval) in order to update the time every 10 milliseconds:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Stopwatch() {
  const \[startTime, setStartTime\] = useState(null);
  const \[now, setNow\] = useState(null);

  function handleStart() {
    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    setInterval(() \=> {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <\>
      <h1\>Time passed: </h1\>
      <button onClick\=\>
        Start
      </button\>
    </\>
  );
}

Show more

When the “Stop” button is pressed, you need to cancel the existing interval so that it stops updating the `now` state variable. You can do this by calling [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval), but you need to give it the interval ID that was previously returned by the `setInterval` call when the user pressed Start. You need to keep the interval ID somewhere. **Since the interval ID is not used for rendering, you can keep it in a ref:**

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Stopwatch() {
  const \[startTime, setStartTime\] = useState(null);
  const \[now, setNow\] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() \=> {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <\>
      <h1\>Time passed: </h1\>
      <button onClick\=\>
        Start
      </button\>
      <button onClick\=\>
        Stop
      </button\>
    </\>
  );
}

Show more

When a piece of information is used for rendering, keep it in state. When a piece of information is only needed by event handlers and changing it doesn’t require a re-render, using a ref may be more efficient.

Differences between refs and state[](#differences-between-refs-and-state "Link for Differences between refs and state ")
------------------------------------------------------------------------------------------------------------------------

Perhaps you’re thinking refs seem less “strict” than state—you can mutate them instead of always having to use a state setting function, for instance. But in most cases, you’ll want to use state. Refs are an “escape hatch” you won’t need often. Here’s how state and refs compare:

refs

state

`useRef(initialValue)` returns ``

`useState(initialValue)` returns the current value of a state variable and a state setter function ( `[value, setValue]`)

Doesn’t trigger re-render when you change it.

Triggers re-render when you change it.

Mutable—you can modify and update `current`’s value outside of the rendering process.

“Immutable”—you must use the state setting function to modify state variables to queue a re-render.

You shouldn’t read (or write) the `current` value during rendering.

You can read state at any time. However, each render has its own [snapshot](state-as-a-snapshot.html) of state which does not change.

Here is a counter button that’s implemented with state:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[count, setCount\] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick\=\>
      You clicked  times
    </button\>
  );
}

Because the `count` value is displayed, it makes sense to use a state value for it. When the counter’s value is set with `setCount()`, React re-renders the component and the screen updates to reflect the new count.

If you tried to implement this with a ref, React would never re-render the component, so you’d never see the count change! See how clicking this button **does not update its text**:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  let countRef = useRef(0);

  function handleClick() {
    // This doesn't re-render the component!
    countRef.current = countRef.current + 1;
  }

  return (
    <button onClick\=\>
      You clicked  times
    </button\>
  );
}

Show more

This is why reading `ref.current` during render leads to unreliable code. If you need that, use state instead.

##### Deep Dive

#### How does useRef work inside?[](#how-does-use-ref-work-inside "Link for How does useRef work inside? ")

Show Details

Although both `useState` and `useRef` are provided by React, in principle `useRef` could be implemented _on top of_ `useState`. You can imagine that inside of React, `useRef` is implemented like this:

    // Inside of Reactfunction useRef(initialValue) 

During the first render, `useRef` returns ``. This object is stored by React, so during the next render the same object will be returned. Note how the state setter is unused in this example. It is unnecessary because `useRef` always needs to return the same object!

React provides a built-in version of `useRef` because it is common enough in practice. But you can think of it as a regular state variable without a setter. If you’re familiar with object-oriented programming, refs might remind you of instance fields—but instead of `this.something` you write `somethingRef.current`.

When to use refs[](#when-to-use-refs "Link for When to use refs ")
------------------------------------------------------------------

Typically, you will use a ref when your component needs to “step outside” React and communicate with external APIs—often a browser API that won’t impact the appearance of the component. Here are a few of these rare situations:

*   Storing [timeout IDs](https://developer.mozilla.org/docs/Web/API/setTimeout)
*   Storing and manipulating [DOM elements](https://developer.mozilla.org/docs/Web/API/Element), which we cover on [the next page](manipulating-the-dom-with-refs.html)
*   Storing other objects that aren’t necessary to calculate the JSX.

If your component needs to store some value, but it doesn’t impact the rendering logic, choose refs.

Best practices for refs[](#best-practices-for-refs "Link for Best practices for refs ")
---------------------------------------------------------------------------------------

Following these principles will make your components more predictable:

*   **Treat refs as an escape hatch.** Refs are useful when you work with external systems or browser APIs. If much of your application logic and data flow relies on refs, you might want to rethink your approach.
*   **Don’t read or write `ref.current` during rendering.** If some information is needed during rendering, use [state](state-a-components-memory.html) instead. Since React doesn’t know when `ref.current` changes, even reading it while rendering makes your component’s behavior difficult to predict. (The only exception to this is code like `if (!ref.current) ref.current = new Thing()` which only sets the ref once during the first render.)

Limitations of React state don’t apply to refs. For example, state acts like a [snapshot for every render](state-as-a-snapshot.html) and [doesn’t update synchronously.](queueing-a-series-of-state-updates.html) But when you mutate the current value of a ref, it changes immediately:

    ref.current = 5;console.log(ref.current); // 5

This is because **the ref itself is a regular JavaScript object,** and so it behaves like one.

You also don’t need to worry about [avoiding mutation](updating-objects-in-state.html) when you work with a ref. As long as the object you’re mutating isn’t used for rendering, React doesn’t care what you do with the ref or its contents.

Refs and the DOM[](#refs-and-the-dom "Link for Refs and the DOM ")
------------------------------------------------------------------

You can point a ref to any value. However, the most common use case for a ref is to access a DOM element. For example, this is handy if you want to focus an input programmatically. When you pass a ref to a `ref` attribute in JSX, like `<div ref=>`, React will put the corresponding DOM element into `myRef.current`. You can read more about this in [Manipulating the DOM with Refs.](manipulating-the-dom-with-refs.html)

Recap[](#recap "Link for Recap")
--------------------------------

*   Refs are an escape hatch to hold onto values that aren’t used for rendering. You won’t need them often.
*   A ref is a plain JavaScript object with a single property called `current`, which you can read or set.
*   You can ask React to give you a ref by calling the `useRef` Hook.
*   Like state, refs let you retain information between re-renders of a component.
*   Unlike state, setting the ref’s `current` value does not trigger a re-render.
*   Don’t read or write `ref.current` during rendering. This makes your component hard to predict.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix a broken chat input 2. Fix a component failing to re-render 3. Fix debouncing 4. Read the latest state

#### 

Challenge 1 of 4:

Fix a broken chat input[](#fix-a-broken-chat-input "Link for this heading")

Type a message and click “Send”. You will notice there is a three second delay before you see the “Sent!” alert. During this delay, you can see an “Undo” button. Click it. This “Undo” button is supposed to stop the “Sent!” message from appearing. It does this by calling [`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout) for the timeout ID saved during `handleSend`. However, even after “Undo” is clicked, the “Sent!” message still appears. Find why it doesn’t work, and fix it.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Chat() {
  const \[text, setText\] = useState('');
  const \[isSending, setIsSending\] = useState(false);
  let timeoutID = null;

  function handleSend() {
    setIsSending(true);
    timeoutID = setTimeout(() \=> {
      alert('Sent!');
      setIsSending(false);
    }, 3000);
  }

  function handleUndo() {
    setIsSending(false);
    clearTimeout(timeoutID);
  }

  return (
    <\>
      <input
        disabled\=
        value\=
        onChange\=
      />
      <button
        disabled\=
        onClick\=\>
        
      </button\>
      {isSending &&
        <button onClick\=\>
          Undo
        </button\>
      }
    </\>
  );
}

Show more

Show hint Show solution

Next Challenge

[PreviousEscape Hatches](escape-hatches.html)[NextManipulating the DOM with Refs](manipulating-the-dom-with-refs.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../learn.html)

[Quick Start](../learn.html)

[Installation](installation.html)

[Describing the UI](describing-the-ui.html)

[Adding Interactivity](adding-interactivity.html)

[Managing State](managing-state.html)

[Escape Hatches](escape-hatches.html)

[API Reference](../reference/react.html)

[React APIs](../reference/react.html)

[React DOM APIs](../reference/react-dom.html)

[Community](../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../community/team.html)

[Docs Contributors](../community/docs-contributors.html)

[Acknowledgements](../community/acknowledgements.html)

More

[Blog](../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

On this page
------------

*   [Overview](#)
*   [Adding a ref to your component](#adding-a-ref-to-your-component)
*   [Example: building a stopwatch](#example-building-a-stopwatch)
*   [Differences between refs and state](#differences-between-refs-and-state)
*   [When to use refs](#when-to-use-refs)
*   [Best practices for refs](#best-practices-for-refs)
*   [Refs and the DOM](#refs-and-the-dom)
*   [Recap](#recap)
*   [Challenges](#challenges)

