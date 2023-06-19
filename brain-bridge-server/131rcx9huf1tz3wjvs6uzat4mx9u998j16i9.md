State as a Snapshot – React

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

[Adding Interactivity](adding-interactivity.html)

State as a Snapshot[](#undefined "Link for this heading")
=========================================================

State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.

### You will learn

*   How setting state triggers re-renders
*   When and how state updates
*   Why state does not update immediately after you set it
*   How event handlers access a “snapshot” of the state

Setting state triggers renders[](#setting-state-triggers-renders "Link for Setting state triggers renders ")
------------------------------------------------------------------------------------------------------------

You might think of your user interface as changing directly in response to the user event like a click. In React, it works a little differently from this mental model. On the previous page, you saw that [setting state requests a re-render](render-and-commit.html#step-1-trigger-a-render) from React. This means that for an interface to react to the event, you need to _update the state_.

In this example, when you press “send”, `setIsSent(true)` tells React to re-render the UI:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[isSent, setIsSent\] = useState(false);
  const \[message, setMessage\] = useState('Hi!');
  if (isSent) {
    return <h1\>Your message is on its way!</h1\>
  }
  return (
    <form onSubmit\={(e) \=> {
      e.preventDefault();
      setIsSent(true);
      sendMessage(message);
    }}\>
      <textarea
        placeholder\="Message"
        value\=
        onChange\=
      />
      <button type\="submit"\>Send</button\>
    </form\>
  );
}

function sendMessage(message) {
  // ...
}

Show more

Here’s what happens when you click the button:

1.  The `onSubmit` event handler executes.
2.  `setIsSent(true)` sets `isSent` to `true` and queues a new render.
3.  React re-renders the component according to the new `isSent` value.

Let’s take a closer look at the relationship between state and rendering.

Rendering takes a snapshot in time[](#rendering-takes-a-snapshot-in-time "Link for Rendering takes a snapshot in time ")
------------------------------------------------------------------------------------------------------------------------

[“Rendering”](render-and-commit.html#step-2-react-renders-your-components) means that React is calling your component, which is a function. The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated **using its state at the time of the render.**

Unlike a photograph or a movie frame, the UI “snapshot” you return is interactive. It includes logic like event handlers that specify what happens in response to inputs. React updates the screen to match this snapshot and connects the event handlers. As a result, pressing a button will trigger the click handler from your JSX.

When React re-renders a component:

1.  React calls your function again.
2.  Your function returns a new JSX snapshot.
3.  React then updates the screen to match the snapshot you’ve returned.

1.  ![](../images/docs/illustrations/i_render1.png)
    
    React executing the function
    
2.  ![](../images/docs/illustrations/i_render2.png)
    
    Calculating the snapshot
    
3.  ![](../images/docs/illustrations/i_render3.png)
    
    Updating the DOM tree
    

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

As a component’s memory, state is not like a regular variable that disappears after your function returns. State actually “lives” in React itself—as if on a shelf!—outside of your function. When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated **using the state values from that render!**

1.  ![](../images/docs/illustrations/i_state-snapshot1.png)
    
    You tell React to update the state
    
2.  ![](../images/docs/illustrations/i_state-snapshot2.png)
    
    React updates the state value
    
3.  ![](../images/docs/illustrations/i_state-snapshot3.png)
    
    React passes a snapshot of the state value into the component
    

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

Here’s a little experiment to show you how this works. In this example, you might expect that clicking the “+3” button would increment the counter three times because it calls `setNumber(number + 1)` three times.

See what happens when you click the “+3” button:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[number, setNumber\] = useState(0);

  return (
    <\>
      <h1\></h1\>
      <button onClick\={() \=> {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}\>+3</button\>
    </\>
  )
}

Show more

Notice that `number` only increments once per click!

**Setting state only changes it for the _next_ render.** During the first render, `number` was `0`. This is why, in _that render’s_ `onClick` handler, the value of `number` is still `0` even after `setNumber(number + 1)` was called:

    <button onClick=>+3</button>

Here is what this button’s click handler tells React to do:

1.  `setNumber(number + 1)`: `number` is `0` so `setNumber(0 + 1)`.
    *   React prepares to change `number` to `1` on the next render.
2.  `setNumber(number + 1)`: `number` is `0` so `setNumber(0 + 1)`.
    *   React prepares to change `number` to `1` on the next render.
3.  `setNumber(number + 1)`: `number` is `0` so `setNumber(0 + 1)`.
    *   React prepares to change `number` to `1` on the next render.

Even though you called `setNumber(number + 1)` three times, in _this render’s_ event handler `number` is always `0`, so you set the state to `1` three times. This is why, after your event handler finishes, React re-renders the component with `number` equal to `1` rather than `3`.

You can also visualize this by mentally substituting state variables with their values in your code. Since the `number` state variable is `0` for _this render_, its event handler looks like this:

    <button onClick=>+3</button>

For the next render, `number` is `1`, so _that render’s_ click handler looks like this:

    <button onClick=>+3</button>

This is why clicking the button again will set the counter to `2`, then to `3` on the next click, and so on.

State over time[](#state-over-time "Link for State over time ")
---------------------------------------------------------------

Well, that was fun. Try to guess what clicking this button will alert:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[number, setNumber\] = useState(0);

  return (
    <\>
      <h1\></h1\>
      <button onClick\={() \=> {
        setNumber(number + 5);
        alert(number);
      }}\>+5</button\>
    </\>
  )
}

If you use the substitution method from before, you can guess that the alert shows “0”:

    setNumber(0 + 5);alert(0);

But what if you put a timer on the alert, so it only fires _after_ the component re-rendered? Would it say “0” or “5”? Have a guess!

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[number, setNumber\] = useState(0);

  return (
    <\>
      <h1\></h1\>
      <button onClick\={() \=> {
        setNumber(number + 5);
        setTimeout(() \=> {
          alert(number);
        }, 3000);
      }}\>+5</button\>
    </\>
  )
}

Show more

Surprised? If you use the substitution method, you can see the “snapshot” of the state passed to the alert.

    setNumber(0 + 5);setTimeout(() => , 3000);

The state stored in React may have changed by the time the alert runs, but it was scheduled using a snapshot of the state at the time the user interacted with it!

**A state variable’s value never changes within a render,** even if its event handler’s code is asynchronous. Inside _that render’s_ `onClick`, the value of `number` continues to be `0` even after `setNumber(number + 5)` was called. Its value was “fixed” when React “took the snapshot” of the UI by calling your component.

Here is an example of how that makes your event handlers less prone to timing mistakes. Below is a form that sends a message with a five-second delay. Imagine this scenario:

1.  You press the “Send” button, sending “Hello” to Alice.
2.  Before the five-second delay ends, you change the value of the “To” field to “Bob”.

What do you expect the `alert` to display? Would it display, “You said Hello to Alice”? Or would it display, “You said Hello to Bob”? Make a guess based on what you know, and then try it:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[to, setTo\] = useState('Alice');
  const \[message, setMessage\] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() \=> {
      alert(\`You said $\`);
    }, 5000);
  }

  return (
    <form onSubmit\=\>
      <label\>
        To:
        <select
          value\=
          onChange\=\>
          <option value\="Alice"\>Alice</option\>
          <option value\="Bob"\>Bob</option\>
        </select\>
      </label\>
      <textarea
        placeholder\="Message"
        value\=
        onChange\=
      />
      <button type\="submit"\>Send</button\>
    </form\>
  );
}

Show more

**React keeps the state values “fixed” within one render’s event handlers.** You don’t need to worry whether the state has changed while the code is running.

But what if you wanted to read the latest state before a re-render? You’ll want to use a [state updater function](queueing-a-series-of-state-updates.html), covered on the next page!

Recap[](#recap "Link for Recap")
--------------------------------

*   Setting state requests a new render.
*   React stores state outside of your component, as if on a shelf.
*   When you call `useState`, React gives you a snapshot of the state _for that render_.
*   Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers.
*   Every render (and functions inside it) will always “see” the snapshot of the state that React gave to _that_ render.
*   You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX.
*   Event handlers created in the past have the state values from the render in which they were created.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

#### 

Challenge 1 of 1:

Implement a traffic light[](#implement-a-traffic-light "Link for this heading")

Here is a crosswalk light component that toggles when the button is pressed:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function TrafficLight() {
  const \[walk, setWalk\] = useState(true);

  function handleClick() {
    setWalk(!walk);
  }

  return (
    <\>
      <button onClick\=\>
        Change to 
      </button\>
      <h1 style\={{
        color: walk ? 'darkgreen' : 'darkred'
      }}\>
        
      </h1\>
    </\>
  );
}

Show more

Add an `alert` to the click handler. When the light is green and says “Walk”, clicking the button should say “Stop is next”. When the light is red and says “Stop”, clicking the button should say “Walk is next”.

Does it make a difference whether you put the `alert` before or after the `setWalk` call?

Show solution

[PreviousRender and Commit](render-and-commit.html)[NextQueueing a Series of State Updates](queueing-a-series-of-state-updates.html)

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
*   [Setting state triggers renders](#setting-state-triggers-renders)
*   [Rendering takes a snapshot in time](#rendering-takes-a-snapshot-in-time)
*   [State over time](#state-over-time)
*   [Recap](#recap)
*   [Challenges](#challenges)

