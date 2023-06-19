Manipulating the DOM with Refs – React

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

Manipulating the DOM with Refs[](#undefined "Link for this heading")
====================================================================

React automatically updates the [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a _ref_ to the DOM node.

### You will learn

*   How to access a DOM node managed by React with the `ref` attribute
*   How the `ref` JSX attribute relates to the `useRef` Hook
*   How to access another component’s DOM node
*   In which cases it’s safe to modify the DOM managed by React

Getting a ref to the node[](#getting-a-ref-to-the-node "Link for Getting a ref to the node ")
---------------------------------------------------------------------------------------------

To access a DOM node managed by React, first, import the `useRef` Hook:

    import  from 'react';

Then, use it to declare a ref inside your component:

    const myRef = useRef(null);

Finally, pass it to the DOM node as the `ref` attribute:

    <div ref=>

The `useRef` Hook returns an object with a single property called `current`. Initially, `myRef.current` will be `null`. When React creates a DOM node for this `<div>`, React will put a reference to this node into `myRef.current`. You can then access this DOM node from your [event handlers](responding-to-events.html) and use the built-in [browser APIs](https://developer.mozilla.org/docs/Web/API/Element) defined on it.

    // You can use any browser APIs, for example:myRef.current.scrollIntoView();

### Example: Focusing a text input[](#example-focusing-a-text-input "Link for Example: Focusing a text input ")

In this example, clicking the button will focus the input:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <input ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

To implement this:

1.  Declare `inputRef` with the `useRef` Hook.
2.  Pass it as `<input ref=>`. This tells React to **put this `<input>`’s DOM node into `inputRef.current`.**
3.  In the `handleClick` function, read the input DOM node from `inputRef.current` and call [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on it with `inputRef.current.focus()`.
4.  Pass the `handleClick` event handler to `<button>` with `onClick`.

While DOM manipulation is the most common use case for refs, the `useRef` Hook can be used for storing other things outside React, like timer IDs. Similarly to state, refs remain between renders. Refs are like state variables that don’t trigger re-renders when you set them. Read about refs in [Referencing Values with Refs.](referencing-values-with-refs.html)

### Example: Scrolling to an element[](#example-scrolling-to-an-element "Link for Example: Scrolling to an element ")

You can have more than a single ref in a component. In this example, there is a carousel of three images. Each button centers an image by calling the browser [`scrollIntoView()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView) method on the corresponding DOM node:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function CatFriends() {
  const firstCatRef = useRef(null);
  const secondCatRef = useRef(null);
  const thirdCatRef = useRef(null);

  function handleScrollToFirstCat() {
    firstCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToSecondCat() {
    secondCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function handleScrollToThirdCat() {
    thirdCatRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  return (
    <\>
      <nav\>
        <button onClick\=\>
          Tom
        </button\>
        <button onClick\=\>
          Maru
        </button\>
        <button onClick\=\>
          Jellylorum
        </button\>
      </nav\>
      <div\>
        <ul\>
          <li\>
            <img
              src\="https://placekitten.com/g/200/200"
              alt\="Tom"
              ref\=
            />
          </li\>
          <li\>
            <img
              src\="https://placekitten.com/g/300/200"
              alt\="Maru"
              ref\=
            />
          </li\>
          <li\>
            <img
              src\="https://placekitten.com/g/250/200"
              alt\="Jellylorum"
              ref\=
            />
          </li\>
        </ul\>
      </div\>
    </\>
  );
}

Show more

##### Deep Dive

#### How to manage a list of refs using a ref callback[](#how-to-manage-a-list-of-refs-using-a-ref-callback "Link for How to manage a list of refs using a ref callback ")

Show Details

In the above examples, there is a predefined number of refs. However, sometimes you might need a ref to each item in the list, and you don’t know how many you will have. Something like this **wouldn’t work**:

    <ul>  </ul>

This is because **Hooks must only be called at the top-level of your component.** You can’t call `useRef` in a loop, in a condition, or inside a `map()` call.

One possible way around this is to get a single ref to their parent element, and then use DOM manipulation methods like [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) to “find” the individual child nodes from it. However, this is brittle and can break if your DOM structure changes.

Another solution is to **pass a function to the `ref` attribute.** This is called a [`ref` callback.](../reference/react-dom/components/common.html#ref-callback) React will call your ref callback with the DOM node when it’s time to set the ref, and with `null` when it’s time to clear it. This lets you maintain your own array or a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), and access any ref by its index or some kind of ID.

This example shows how you can use this approach to scroll to an arbitrary node in a long list:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function CatFriends() {
  const itemsRef = useRef(null);

  function scrollToId(itemId) {
    const map = getMap();
    const node = map.get(itemId);
    node.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <\>
      <nav\>
        <button onClick\=\>
          Tom
        </button\>
        <button onClick\=\>
          Maru
        </button\>
        <button onClick\=\>
          Jellylorum
        </button\>
      </nav\>
      <div\>
        <ul\>
          {catList.map(cat \=> (
            <li
              key\=
              ref\={(node) \=> {
                const map = getMap();
                if (node) {
                  map.set(cat.id, node);
                } else {
                  map.delete(cat.id);
                }
              }}
            \>
              <img
                src\=
                alt\=
              />
            </li\>
          ))}
        </ul\>
      </div\>
    </\>
  );
}

const catList = \[\];
for (let i = 0; i < 10; i++) {
  catList.push({
    id: i,
    imageUrl: 'https://placekitten.com/250/200?image=' + i
  });
}

Show more

In this example, `itemsRef` doesn’t hold a single DOM node. Instead, it holds a [Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map) from item ID to a DOM node. ([Refs can hold any values!](referencing-values-with-refs.html)) The [`ref` callback](../reference/react-dom/components/common.html#ref-callback) on every list item takes care to update the Map:

    <li  key=>

This lets you read individual DOM nodes from the Map later.

Accessing another component’s DOM nodes[](#accessing-another-components-dom-nodes "Link for Accessing another component’s DOM nodes ")
--------------------------------------------------------------------------------------------------------------------------------------

When you put a ref on a built-in component that outputs a browser element like `<input />`, React will set that ref’s `current` property to the corresponding DOM node (such as the actual `<input />` in the browser).

However, if you try to put a ref on **your own** component, like `<MyInput />`, by default you will get `null`. Here is an example demonstrating it. Notice how clicking the button **does not** focus the input:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function MyInput(props) {
  return <input  />;
}

export default function MyForm() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <MyInput ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

To help you notice the issue, React also prints an error to the console:

Console

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

This happens because by default React does not let a component access the DOM nodes of other components. Not even for its own children! This is intentional. Refs are an escape hatch that should be used sparingly. Manually manipulating _another_ component’s DOM nodes makes your code even more fragile.

Instead, components that _want_ to expose their DOM nodes have to **opt in** to that behavior. A component can specify that it “forwards” its ref to one of its children. Here’s how `MyInput` can use the `forwardRef` API:

    const MyInput = forwardRef((props, ref) => );

This is how it works:

1.  `<MyInput ref= />` tells React to put the corresponding DOM node into `inputRef.current`. However, it’s up to the `MyInput` component to opt into that—by default, it doesn’t.
2.  The `MyInput` component is declared using `forwardRef`. **This opts it into receiving the `inputRef` from above as the second `ref` argument** which is declared after `props`.
3.  `MyInput` itself passes the `ref` it received to the `<input>` inside of it.

Now clicking the button to focus the input works:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const MyInput = forwardRef((props, ref) \=> {
  return <input  />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <MyInput ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

In design systems, it is a common pattern for low-level components like buttons, inputs, and so on, to forward their refs to their DOM nodes. On the other hand, high-level components like forms, lists, or page sections usually won’t expose their DOM nodes to avoid accidental dependencies on the DOM structure.

##### Deep Dive

#### Exposing a subset of the API with an imperative handle[](#exposing-a-subset-of-the-api-with-an-imperative-handle "Link for Exposing a subset of the API with an imperative handle ")

Show Details

In the above example, `MyInput` exposes the original DOM input element. This lets the parent component call `focus()` on it. However, this also lets the parent component do something else—for example, change its CSS styles. In uncommon cases, you may want to restrict the exposed functionality. You can do that with `useImperativeHandle`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import {
  forwardRef, 
  useRef, 
  useImperativeHandle
} from 'react';

const MyInput = forwardRef((props, ref) \=> {
  const realInputRef = useRef(null);
  useImperativeHandle(ref, () \=> ({
    // Only expose focus and nothing else
    focus() {
      realInputRef.current.focus();
    },
  }));
  return <input  />;
});

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <MyInput ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

Here, `realInputRef` inside `MyInput` holds the actual input DOM node. However, `useImperativeHandle` instructs React to provide your own special object as the value of a ref to the parent component. So `inputRef.current` inside the `Form` component will only have the `focus` method. In this case, the ref “handle” is not the DOM node, but the custom object you create inside `useImperativeHandle` call.

When React attaches the refs[](#when-react-attaches-the-refs "Link for When React attaches the refs ")
------------------------------------------------------------------------------------------------------

In React, every update is split in [two phases](render-and-commit.html#step-3-react-commits-changes-to-the-dom):

*   During **render,** React calls your components to figure out what should be on the screen.
*   During **commit,** React applies changes to the DOM.

In general, you [don’t want](referencing-values-with-refs.html#best-practices-for-refs) to access refs during rendering. That goes for refs holding DOM nodes as well. During the first render, the DOM nodes have not yet been created, so `ref.current` will be `null`. And during the rendering of updates, the DOM nodes haven’t been updated yet. So it’s too early to read them.

React sets `ref.current` during the commit. Before updating the DOM, React sets the affected `ref.current` values to `null`. After updating the DOM, React immediately sets them to the corresponding DOM nodes.

**Usually, you will access refs from event handlers.** If you want to do something with a ref, but there is no particular event to do it in, you might need an Effect. We will discuss effects on the next pages.

##### Deep Dive

#### Flushing state updates synchronously with flushSync[](#flushing-state-updates-synchronously-with-flush-sync "Link for Flushing state updates synchronously with flushSync ")

Show Details

Consider code like this, which adds a new todo and scrolls the screen down to the last child of the list. Notice how, for some reason, it always scrolls to the todo that was _just before_ the last added one:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function TodoList() {
  const listRef = useRef(null);
  const \[text, setText\] = useState('');
  const \[todos, setTodos\] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = ;
    setText('');
    setTodos(\[ ...todos, newTodo\]);
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <\>
      <button onClick\=\>
        Add
      </button\>
      <input
        value\=
        onChange\=
      />
      <ul ref\=\>
        {todos.map(todo \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

let nextId = 0;
let initialTodos = \[\];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}

Show more

The issue is with these two lines:

    setTodos([ ...todos, newTodo]);listRef.current.lastChild.scrollIntoView();

In React, [state updates are queued.](queueing-a-series-of-state-updates.html) Usually, this is what you want. However, here it causes a problem because `setTodos` does not immediately update the DOM. So the time you scroll the list to its last element, the todo has not yet been added. This is why scrolling always “lags behind” by one item.

To fix this issue, you can force React to update (“flush”) the DOM synchronously. To do this, import `flushSync` from `react-dom` and **wrap the state update** into a `flushSync` call:

    flushSync(() => );listRef.current.lastChild.scrollIntoView();

This will instruct React to update the DOM synchronously right after the code wrapped in `flushSync` executes. As a result, the last todo will already be in the DOM by the time you try to scroll to it:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';

export default function TodoList() {
  const listRef = useRef(null);
  const \[text, setText\] = useState('');
  const \[todos, setTodos\] = useState(
    initialTodos
  );

  function handleAdd() {
    const newTodo = ;
    flushSync(() \=> {
      setText('');
      setTodos(\[ ...todos, newTodo\]);      
    });
    listRef.current.lastChild.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });
  }

  return (
    <\>
      <button onClick\=\>
        Add
      </button\>
      <input
        value\=
        onChange\=
      />
      <ul ref\=\>
        {todos.map(todo \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

let nextId = 0;
let initialTodos = \[\];
for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}

Show more

Best practices for DOM manipulation with refs[](#best-practices-for-dom-manipulation-with-refs "Link for Best practices for DOM manipulation with refs ")
---------------------------------------------------------------------------------------------------------------------------------------------------------

Refs are an escape hatch. You should only use them when you have to “step outside React”. Common examples of this include managing focus, scroll position, or calling browser APIs that React does not expose.

If you stick to non-destructive actions like focusing and scrolling, you shouldn’t encounter any problems. However, if you try to **modify** the DOM manually, you can risk conflicting with the changes React is making.

To illustrate this problem, this example includes a welcome message and two buttons. The first button toggles its presence using [conditional rendering](conditional-rendering.html) and [state](state-a-components-memory.html), as you would usually do in React. The second button uses the [`remove()` DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) to forcefully remove it from the DOM outside of React’s control.

Try pressing “Toggle with setState” a few times. The message should disappear and appear again. Then press “Remove from the DOM”. This will forcefully remove it. Finally, press “Toggle with setState”:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[show, setShow\] = useState(true);
  const ref = useRef(null);

  return (
    <div\>
      <button
        onClick\={() \=> {
          setShow(!show);
        }}\>
        Toggle with setState
      </button\>
      <button
        onClick\={() \=> {
          ref.current.remove();
        }}\>
        Remove from the DOM
      </button\>
      
    </div\>
  );
}

Show more

After you’ve manually removed the DOM element, trying to use `setState` to show it again will lead to a crash. This is because you’ve changed the DOM, and React doesn’t know how to continue managing it correctly.

**Avoid changing DOM nodes managed by React.** Modifying, adding children to, or removing children from elements that are managed by React can lead to inconsistent visual results or crashes like above.

However, this doesn’t mean that you can’t do it at all. It requires caution. **You can safely modify parts of the DOM that React has _no reason_ to update.** For example, if some `<div>` is always empty in the JSX, React won’t have a reason to touch its children list. Therefore, it is safe to manually add or remove elements there.

Recap[](#recap "Link for Recap")
--------------------------------

*   Refs are a generic concept, but most often you’ll use them to hold DOM elements.
*   You instruct React to put a DOM node into `myRef.current` by passing `<div ref=>`.
*   Usually, you will use refs for non-destructive actions like focusing, scrolling, or measuring DOM elements.
*   A component doesn’t expose its DOM nodes by default. You can opt into exposing a DOM node by using `forwardRef` and passing the second `ref` argument down to a specific node.
*   Avoid changing DOM nodes managed by React.
*   If you do modify DOM nodes managed by React, modify parts that React has no reason to update.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Play and pause the video 2. Focus the search field 3. Scrolling an image carousel 4. Focus the search field with separate components

#### 

Challenge 1 of 4:

Play and pause the video[](#play-and-pause-the-video "Link for this heading")

In this example, the button toggles a state variable to switch between a playing and a paused state. However, in order to actually play or pause the video, toggling state is not enough. You also need to call [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) and [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) on the DOM element for the `<video>`. Add a ref to it, and make the button work.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function VideoPlayer() {
  const \[isPlaying, setIsPlaying\] = useState(false);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
  }

  return (
    <\>
      <button onClick\=\>
        
      </button\>
      <video width\="250"\>
        <source
          src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type\="video/mp4"
        />
      </video\>
    </\>
  )
}

Show more

For an extra challenge, keep the “Play” button in sync with whether the video is playing even if the user right-clicks the video and plays it using the built-in browser media controls. You might want to listen to `onPlay` and `onPause` on the video to do that.

Show solutionNext Challenge

[PreviousReferencing Values with Refs](referencing-values-with-refs.html)[NextSynchronizing with Effects](synchronizing-with-effects.html)

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
*   [Getting a ref to the node](#getting-a-ref-to-the-node)
*   [Example: Focusing a text input](#example-focusing-a-text-input)
*   [Example: Scrolling to an element](#example-scrolling-to-an-element)
*   [Accessing another component’s DOM nodes](#accessing-another-components-dom-nodes)
*   [When React attaches the refs](#when-react-attaches-the-refs)
*   [Best practices for DOM manipulation with refs](#best-practices-for-dom-manipulation-with-refs)
*   [Recap](#recap)
*   [Challenges](#challenges)

