Synchronizing with Effects – React

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

Synchronizing with Effects[](#undefined "Link for this heading")
================================================================

Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. _Effects_ let you run some code after rendering so that you can synchronize your component with some system outside of React.

### You will learn

*   What Effects are
*   How Effects are different from events
*   How to declare an Effect in your component
*   How to skip re-running an Effect unnecessarily
*   Why Effects run twice in development and how to fix them

What are Effects and how are they different from events?[](#what-are-effects-and-how-are-they-different-from-events "Link for What are Effects and how are they different from events? ")
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Before getting to Effects, you need to be familiar with two types of logic inside React components:

*   **Rendering code** (introduced in [Describing the UI](describing-the-ui.html)) lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. [Rendering code must be pure.](keeping-components-pure.html) Like a math formula, it should only _calculate_ the result, but not do anything else.
    
*   **Event handlers** (introduced in [Adding Interactivity](adding-interactivity.html)) are nested functions inside your components that _do_ things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain [“side effects”](https://en.wikipedia.org/wiki/Side_effect_(computer_science)) (they change the program’s state) caused by a specific user action (for example, a button click or typing).
    

Sometimes this isn’t enough. Consider a `ChatRoom` component that must connect to the chat server whenever it’s visible on the screen. Connecting to a server is not a pure calculation (it’s a side effect) so it can’t happen during rendering. However, there is no single particular event like a click that causes `ChatRoom` to be displayed.

**_Effects_ let you specify side effects that are caused by rendering itself, rather than by a particular event.** Sending a message in the chat is an _event_ because it is directly caused by the user clicking a specific button. However, setting up a server connection is an _Effect_ because it should happen no matter which interaction caused the component to appear. Effects run at the end of a [commit](render-and-commit.html) after the screen updates. This is a good time to synchronize the React components with some external system (like network or a third-party library).

### Note

Here and later in this text, capitalized “Effect” refers to the React-specific definition above, i.e. a side effect caused by rendering. To refer to the broader programming concept, we’ll say “side effect”.

You might not need an Effect[](#you-might-not-need-an-effect "Link for You might not need an Effect ")
------------------------------------------------------------------------------------------------------

**Don’t rush to add Effects to your components.** Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some _external_ system. This includes browser APIs, third-party widgets, network, and so on. If your Effect only adjusts some state based on other state, [you might not need an Effect.](you-might-not-need-an-effect.html)

How to write an Effect[](#how-to-write-an-effect "Link for How to write an Effect ")
------------------------------------------------------------------------------------

To write an Effect, follow these three steps:

1.  **Declare an Effect.** By default, your Effect will run after every render.
2.  **Specify the Effect dependencies.** Most Effects should only re-run _when needed_ rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying _dependencies._
3.  **Add cleanup if needed.** Some Effects need to specify how to stop, undo, or clean up whatever they were doing. For example, “connect” needs “disconnect”, “subscribe” needs “unsubscribe”, and “fetch” needs either “cancel” or “ignore”. You will learn how to do this by returning a _cleanup function_.

Let’s look at each of these steps in detail.

### Step 1: Declare an Effect[](#step-1-declare-an-effect "Link for Step 1: Declare an Effect ")

To declare an Effect in your component, import the [`useEffect` Hook](../reference/react/useEffect.html) from React:

    import  from 'react';

Then, call it at the top level of your component and put some code inside your Effect:

    function MyComponent() 

Every time your component renders, React will update the screen _and then_ run the code inside `useEffect`. In other words, **`useEffect` “delays” a piece of code from running until that render is reflected on the screen.**

Let’s see how you can use an Effect to synchronize with an external system. Consider a `<VideoPlayer>` React component. It would be nice to control whether it’s playing or paused by passing an `isPlaying` prop to it:

    <VideoPlayer isPlaying= />;

Your custom `VideoPlayer` component renders the built-in browser [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag:

    function VideoPlayer(

However, the browser `<video>` tag does not have an `isPlaying` prop. The only way to control it is to manually call the [`play()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play) and [`pause()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause) methods on the DOM element. **You need to synchronize the value of `isPlaying` prop, which tells whether the video _should_ currently be playing, with calls like `play()` and `pause()`.**

We’ll need to first [get a ref](manipulating-the-dom-with-refs.html) to the `<video>` DOM node.

You might be tempted to try to call `play()` or `pause()` during rendering, but that isn’t correct:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function VideoPlayer() {
  const ref = useRef(null);

  if (isPlaying) {
    ref.current.play();  // Calling these while rendering isn't allowed.
  } else {
    ref.current.pause(); // Also, this crashes.
  }

  return <video ref\= loop playsInline />;
}

export default function App() {
  const \[isPlaying, setIsPlaying\] = useState(false);
  return (
    <\>
      <button onClick\=\>
        
      </button\>
      <VideoPlayer
        isPlaying\=
        src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </\>
  );
}

Show more

The reason this code isn’t correct is that it tries to do something with the DOM node during rendering. In React, [rendering should be a pure calculation](keeping-components-pure.html) of JSX and should not contain side effects like modifying the DOM.

Moreover, when `VideoPlayer` is called for the first time, its DOM does not exist yet! There isn’t a DOM node yet to call `play()` or `pause()` on, because React doesn’t know what DOM to create until you return the JSX.

The solution here is to **wrap the side effect with `useEffect` to move it out of the rendering calculation:**

    import 

By wrapping the DOM update in an Effect, you let React update the screen first. Then your Effect runs.

When your `VideoPlayer` component renders (either the first time or if it re-renders), a few things will happen. First, React will update the screen, ensuring the `<video>` tag is in the DOM with the right props. Then React will run your Effect. Finally, your Effect will call `play()` or `pause()` depending on the value of `isPlaying`.

Press Play/Pause multiple times and see how the video player stays synchronized to the `isPlaying` value:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function VideoPlayer() {
  const ref = useRef(null);

  useEffect(() \=> {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  });

  return <video ref\= loop playsInline />;
}

export default function App() {
  const \[isPlaying, setIsPlaying\] = useState(false);
  return (
    <\>
      <button onClick\=\>
        
      </button\>
      <VideoPlayer
        isPlaying\=
        src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </\>
  );
}

Show more

In this example, the “external system” you synchronized to React state was the browser media API. You can use a similar approach to wrap legacy non-React code (like jQuery plugins) into declarative React components.

Note that controlling a video player is much more complex in practice. Calling `play()` may fail, the user might play or pause using the built-in browser controls, and so on. This example is very simplified and incomplete.

### Pitfall

By default, Effects run after _every_ render. This is why code like this will **produce an infinite loop:**

    const [count, setCount] = useState(0);useEffect(() => );

Effects run as a _result_ of rendering. Setting state _triggers_ rendering. Setting state immediately in an Effect is like plugging a power outlet into itself. The Effect runs, it sets the state, which causes a re-render, which causes the Effect to run, it sets the state again, this causes another re-render, and so on.

Effects should usually synchronize your components with an _external_ system. If there’s no external system and you only want to adjust some state based on other state, [you might not need an Effect.](you-might-not-need-an-effect.html)

### Step 2: Specify the Effect dependencies[](#step-2-specify-the-effect-dependencies "Link for Step 2: Specify the Effect dependencies ")

By default, Effects run after _every_ render. Often, this is **not what you want:**

*   Sometimes, it’s slow. Synchronizing with an external system is not always instant, so you might want to skip doing it unless it’s necessary. For example, you don’t want to reconnect to the chat server on every keystroke.
*   Sometimes, it’s wrong. For example, you don’t want to trigger a component fade-in animation on every keystroke. The animation should only play once when the component appears for the first time.

To demonstrate the issue, here is the previous example with a few `console.log` calls and a text input that updates the parent component’s state. Notice how typing causes the Effect to re-run:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function VideoPlayer() {
  const ref = useRef(null);

  useEffect(() \=> {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  });

  return <video ref\= loop playsInline />;
}

export default function App() {
  const \[isPlaying, setIsPlaying\] = useState(false);
  const \[text, setText\] = useState('');
  return (
    <\>
      <input value\= />
      <button onClick\=\>
        
      </button\>
      <VideoPlayer
        isPlaying\=
        src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </\>
  );
}

Show more

You can tell React to **skip unnecessarily re-running the Effect** by specifying an array of _dependencies_ as the second argument to the `useEffect` call. Start by adding an empty `[]` array to the above example on line 14:

      useEffect(() => , []);

You should see an error saying `React Hook useEffect has a missing dependency: 'isPlaying'`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function VideoPlayer() {
  const ref = useRef(null);

  useEffect(() \=> {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, \[\]); // This causes an error

  return <video ref\= loop playsInline />;
}

export default function App() {
  const \[isPlaying, setIsPlaying\] = useState(false);
  const \[text, setText\] = useState('');
  return (
    <\>
      <input value\= />
      <button onClick\=\>
        
      </button\>
      <VideoPlayer
        isPlaying\=
        src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </\>
  );
}

Show more

The problem is that the code inside of your Effect _depends on_ the `isPlaying` prop to decide what to do, but this dependency was not explicitly declared. To fix this issue, add `isPlaying` to the dependency array:

      useEffect(() => , [isPlaying]); // ...so it must be declared here!

Now all dependencies are declared, so there is no error. Specifying `[isPlaying]` as the dependency array tells React that it should skip re-running your Effect if `isPlaying` is the same as it was during the previous render. With this change, typing into the input doesn’t cause the Effect to re-run, but pressing Play/Pause does:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function VideoPlayer() {
  const ref = useRef(null);

  useEffect(() \=> {
    if (isPlaying) {
      console.log('Calling video.play()');
      ref.current.play();
    } else {
      console.log('Calling video.pause()');
      ref.current.pause();
    }
  }, \[isPlaying\]);

  return <video ref\= loop playsInline />;
}

export default function App() {
  const \[isPlaying, setIsPlaying\] = useState(false);
  const \[text, setText\] = useState('');
  return (
    <\>
      <input value\= />
      <button onClick\=\>
        
      </button\>
      <VideoPlayer
        isPlaying\=
        src\="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </\>
  );
}

Show more

The dependency array can contain multiple dependencies. React will only skip re-running the Effect if _all_ of the dependencies you specify have exactly the same values as they had during the previous render. React compares the dependency values using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. See the [`useEffect` reference](../reference/react/useEffect.html#reference) for details.

**Notice that you can’t “choose” your dependencies.** You will get a lint error if the dependencies you specified don’t match what React expects based on the code inside your Effect. This helps catch many bugs in your code. If you don’t want some code to re-run, [_edit the Effect code itself_ to not “need” that dependency.](lifecycle-of-reactive-effects.html#what-to-do-when-you-dont-want-to-re-synchronize)

### Pitfall

The behaviors without the dependency array and with an _empty_ `[]` dependency array are different:

    useEffect(() => , [a, b]);

We’ll take a close look at what “mount” means in the next step.

##### Deep Dive

#### Why was the ref omitted from the dependency array?[](#why-was-the-ref-omitted-from-the-dependency-array "Link for Why was the ref omitted from the dependency array? ")

Show Details

This Effect uses _both_ `ref` and `isPlaying`, but only `isPlaying` is declared as a dependency:

    function VideoPlayer(, [isPlaying]);

This is because the `ref` object has a _stable identity:_ React guarantees [you’ll always get the same object](../reference/react/useRef.html#returns) from the same `useRef` call on every render. It never changes, so it will never by itself cause the Effect to re-run. Therefore, it does not matter whether you include it or not. Including it is fine too:

    function VideoPlayer(, [isPlaying, ref]);

The [`set` functions](../reference/react/useState.html#setstate) returned by `useState` also have stable identity, so you will often see them omitted from the dependencies too. If the linter lets you omit a dependency without errors, it is safe to do.

Omitting always-stable dependencies only works when the linter can “see” that the object is stable. For example, if `ref` was passed from a parent component, you would have to specify it in the dependency array. However, this is good because you can’t know whether the parent component always passes the same ref, or passes one of several refs conditionally. So your Effect _would_ depend on which ref is passed.

### Step 3: Add cleanup if needed[](#step-3-add-cleanup-if-needed "Link for Step 3: Add cleanup if needed ")

Consider a different example. You’re writing a `ChatRoom` component that needs to connect to the chat server when it appears. You are given a `createConnection()` API that returns an object with `connect()` and `disconnect()` methods. How do you keep the component connected while it is displayed to the user?

Start by writing the Effect logic:

    useEffect(() => );

It would be slow to connect to the chat after every re-render, so you add the dependency array:

    useEffect(() => , []);

**The code inside the Effect does not use any props or state, so your dependency array is `[]` (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.**

Let’s try running this code:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

export default function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection();
    connection.connect();
  }, \[\]);
  return <h1\>Welcome to the chat!</h1\>;
}

This Effect only runs on mount, so you might expect `"✅ Connecting..."` to be printed once in the console. **However, if you check the console, `"✅ Connecting..."` gets printed twice. Why does it happen?**

Imagine the `ChatRoom` component is a part of a larger app with many different screens. The user starts their journey on the `ChatRoom` page. The component mounts and calls `connection.connect()`. Then imagine the user navigates to another screen—for example, to the Settings page. The `ChatRoom` component unmounts. Finally, the user clicks Back and `ChatRoom` mounts again. This would set up a second connection—but the first connection was never destroyed! As the user navigates across the app, the connections would keep piling up.

Bugs like this are easy to miss without extensive manual testing. To help you spot them quickly, in development React remounts every component once immediately after its initial mount.

Seeing the `"✅ Connecting..."` log twice helps you notice the real issue: your code doesn’t close the connection when the component unmounts.

To fix the issue, return a _cleanup function_ from your Effect:

      useEffect(() => , []);

React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed). Let’s see what happens when the cleanup function is implemented:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

export default function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection();
    connection.connect();
    return () \=> connection.disconnect();
  }, \[\]);
  return <h1\>Welcome to the chat!</h1\>;
}

Now you get three console logs in development:

1.  `"✅ Connecting..."`
2.  `"❌ Disconnected."`
3.  `"✅ Connecting..."`

**This is the correct behavior in development.** By remounting your component, React verifies that navigating away and back would not break your code. Disconnecting and then connecting again is exactly what should happen! When you implement the cleanup well, there should be no user-visible difference between running the Effect once vs running it, cleaning it up, and running it again. There’s an extra connect/disconnect call pair because React is probing your code for bugs in development. This is normal—don’t try to make it go away!

**In production, you would only see `"✅ Connecting..."` printed once.** Remounting components only happens in development to help you find Effects that need cleanup. You can turn off [Strict Mode](../reference/react/StrictMode.html) to opt out of the development behavior, but we recommend keeping it on. This lets you find many bugs like the one above.

How to handle the Effect firing twice in development?[](#how-to-handle-the-effect-firing-twice-in-development "Link for How to handle the Effect firing twice in development? ")
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

React intentionally remounts your components in development to find bugs like in the last example. **The right question isn’t “how to run an Effect once”, but “how to fix my Effect so that it works after remounting”.**

Usually, the answer is to implement the cleanup function. The cleanup function should stop or undo whatever the Effect was doing. The rule of thumb is that the user shouldn’t be able to distinguish between the Effect running once (as in production) and a _setup → cleanup → setup_ sequence (as you’d see in development).

Most of the Effects you’ll write will fit into one of the common patterns below.

### Controlling non-React widgets[](#controlling-non-react-widgets "Link for Controlling non-React widgets ")

Sometimes you need to add UI widgets that aren’t written to React. For example, let’s say you’re adding a map component to your page. It has a `setZoomLevel()` method, and you’d like to keep the zoom level in sync with a `zoomLevel` state variable in your React code. Your Effect would look similar to this:

    useEffect(() => , [zoomLevel]);

Note that there is no cleanup needed in this case. In development, React will call the Effect twice, but this is not a problem because calling `setZoomLevel` twice with the same value does not do anything. It may be slightly slower, but this doesn’t matter because it won’t remount needlessly in production.

Some APIs may not allow you to call them twice in a row. For example, the [`showModal`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal) method of the built-in [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement) element throws if you call it twice. Implement the cleanup function and make it close the dialog:

    useEffect(() => , []);

In development, your Effect will call `showModal()`, then immediately `close()`, and then `showModal()` again. This has the same user-visible behavior as calling `showModal()` once, as you would see in production.

### Subscribing to events[](#subscribing-to-events "Link for Subscribing to events ")

If your Effect subscribes to something, the cleanup function should unsubscribe:

    useEffect(() => , []);

In development, your Effect will call `addEventListener()`, then immediately `removeEventListener()`, and then `addEventListener()` again with the same handler. So there would be only one active subscription at a time. This has the same user-visible behavior as calling `addEventListener()` once, as in production.

### Triggering animations[](#triggering-animations "Link for Triggering animations ")

If your Effect animates something in, the cleanup function should reset the animation to the initial values:

    useEffect(() => , []);

In development, opacity will be set to `1`, then to `0`, and then to `1` again. This should have the same user-visible behavior as setting it to `1` directly, which is what would happen in production. If you use a third-party animation library with support for tweening, your cleanup function should reset the timeline to its initial state.

### Fetching data[](#fetching-data "Link for Fetching data ")

If your Effect fetches something, the cleanup function should either [abort the fetch](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) or ignore its result:

    useEffect(() => , [userId]);

You can’t “undo” a network request that already happened, but your cleanup function should ensure that the fetch that’s _not relevant anymore_ does not keep affecting your application. If the `userId` changes from `'Alice'` to `'Bob'`, cleanup ensures that the `'Alice'` response is ignored even if it arrives after `'Bob'`.

**In development, you will see two fetches in the Network tab.** There is nothing wrong with that. With the approach above, the first Effect will immediately get cleaned up so its copy of the `ignore` variable will be set to `true`. So even though there is an extra request, it won’t affect the state thanks to the `if (!ignore)` check.

**In production, there will only be one request.** If the second request in development is bothering you, the best approach is to use a solution that deduplicates requests and caches their responses between components:

    function TodoList() /todos`);  // ...

This will not only improve the development experience, but also make your application feel faster. For example, the user pressing the Back button won’t have to wait for some data to load again because it will be cached. You can either build such a cache yourself or use one of the many alternatives to manual fetching in Effects.

##### Deep Dive

#### What are good alternatives to data fetching in Effects?[](#what-are-good-alternatives-to-data-fetching-in-effects "Link for What are good alternatives to data fetching in Effects? ")

Show Details

Writing `fetch` calls inside Effects is a [popular way to fetch data](https://www.robinwieruch.de/react-hooks-fetch-data/), especially in fully client-side apps. This is, however, a very manual approach and it has significant downsides:

*   **Effects don’t run on the server.** This means that the initial server-rendered HTML will only include a loading state with no data. The client computer will have to download all JavaScript and render your app only to discover that now it needs to load the data. This is not very efficient.
*   **Fetching directly in Effects makes it easy to create “network waterfalls”.** You render the parent component, it fetches some data, renders the child components, and then they start fetching their data. If the network is not very fast, this is significantly slower than fetching all data in parallel.
*   **Fetching directly in Effects usually means you don’t preload or cache data.** For example, if the component unmounts and then mounts again, it would have to fetch the data again.
*   **It’s not very ergonomic.** There’s quite a bit of boilerplate code involved when writing `fetch` calls in a way that doesn’t suffer from bugs like [race conditions.](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)

This list of downsides is not specific to React. It applies to fetching data on mount with any library. Like with routing, data fetching is not trivial to do well, so we recommend the following approaches:

*   **If you use a [framework](start-a-new-react-project.html#production-grade-react-frameworks), use its built-in data fetching mechanism.** Modern React frameworks have integrated data fetching mechanisms that are efficient and don’t suffer from the above pitfalls.
*   **Otherwise, consider using or building a client-side cache.** Popular open source solutions include [React Query](https://tanstack.com/query/latest), [useSWR](https://swr.vercel.app/), and [React Router 6.4+.](https://beta.reactrouter.com/en/main/start/overview) You can build your own solution too, in which case you would use Effects under the hood, but add logic for deduplicating requests, caching responses, and avoiding network waterfalls (by preloading data or hoisting data requirements to routes).

You can continue fetching data directly in Effects if neither of these approaches suit you.

### Sending analytics[](#sending-analytics "Link for Sending analytics ")

Consider this code that sends an analytics event on the page visit:

    useEffect(() => , [url]);

In development, `logVisit` will be called twice for every URL, so you might be tempted to try to fix that. **We recommend keeping this code as is.** Like with earlier examples, there is no _user-visible_ behavior difference between running it once and running it twice. From a practical point of view, `logVisit` should not do anything in development because you don’t want the logs from the development machines to skew the production metrics. Your component remounts every time you save its file, so it logs extra visits in development anyway.

**In production, there will be no duplicate visit logs.**

To debug the analytics events you’re sending, you can deploy your app to a staging environment (which runs in production mode) or temporarily opt out of [Strict Mode](../reference/react/StrictMode.html) and its development-only remounting checks. You may also send analytics from the route change event handlers instead of Effects. For more precise analytics, [intersection observers](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) can help track which components are in the viewport and how long they remain visible.

### Not an Effect: Initializing the application[](#not-an-effect-initializing-the-application "Link for Not an Effect: Initializing the application ")

Some logic should only run once when the application starts. You can put it outside your components:

    if (typeof window !== 'undefined') 

This guarantees that such logic only runs once after the browser loads the page.

### Not an Effect: Buying a product[](#not-an-effect-buying-a-product "Link for Not an Effect: Buying a product ")

Sometimes, even if you write a cleanup function, there’s no way to prevent user-visible consequences of running the Effect twice. For example, maybe your Effect sends a POST request like buying a product:

    useEffect(() => , []);

You wouldn’t want to buy the product twice. However, this is also why you shouldn’t put this logic in an Effect. What if the user goes to another page and then presses Back? Your Effect would run again. You don’t want to buy the product when the user _visits_ a page; you want to buy it when the user _clicks_ the Buy button.

Buying is not caused by rendering; it’s caused by a specific interaction. It should run only when the user presses the button. **Delete the Effect and move your `/api/buy` request into the Buy button event handler:**

      function handleClick() 

**This illustrates that if remounting breaks the logic of your application, this usually uncovers existing bugs.** From the user’s perspective, visiting a page shouldn’t be different from visiting it, clicking a link, and pressing Back. React verifies that your components abide by this principle by remounting them once in development.

Putting it all together[](#putting-it-all-together "Link for Putting it all together ")
---------------------------------------------------------------------------------------

This playground can help you “get a feel” for how Effects work in practice.

This example uses [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) to schedule a console log with the input text to appear three seconds after the Effect runs. The cleanup function cancels the pending timeout. Start by pressing “Mount the component”:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function Playground() {
  const \[text, setText\] = useState('a');

  useEffect(() \=> {
    function onTimeout() {
      console.log('⏰ ' + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () \=> {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, \[text\]);

  return (
    <\>
      <label\>
        What to log:
        <input
          value\=
          onChange\=
        />
      </label\>
      <h1\></h1\>
    </\>
  );
}

export default function App() {
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <button onClick\=\>
         the component
      </button\>
      
      
    </\>
  );
}

Show more

You will see three logs at first: `Schedule "a" log`, `Cancel "a" log`, and `Schedule "a" log` again. Three second later there will also be a log saying `a`. As you learned earlier, the extra schedule/cancel pair is because React remounts the component once in development to verify that you’ve implemented cleanup well.

Now edit the input to say `abc`. If you do it fast enough, you’ll see `Schedule "ab" log` immediately followed by `Cancel "ab" log` and `Schedule "abc" log`. **React always cleans up the previous render’s Effect before the next render’s Effect.** This is why even if you type into the input fast, there is at most one timeout scheduled at a time. Edit the input a few times and watch the console to get a feel for how Effects get cleaned up.

Type something into the input and then immediately press “Unmount the component”. Notice how unmounting cleans up the last render’s Effect. Here, it clears the last timeout before it has a chance to fire.

Finally, edit the component above and comment out the cleanup function so that the timeouts don’t get cancelled. Try typing `abcde` fast. What do you expect to happen in three seconds? Will `console.log(text)` inside the timeout print the _latest_ `text` and produce five `abcde` logs? Give it a try to check your intuition!

Three seconds later, you should see a sequence of logs (`a`, `ab`, `abc`, `abcd`, and `abcde`) rather than five `abcde` logs. **Each Effect “captures” the `text` value from its corresponding render.** It doesn’t matter that the `text` state changed: an Effect from the render with `text = 'ab'` will always see `'ab'`. In other words, Effects from each render are isolated from each other. If you’re curious how this works, you can read about [closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

##### Deep Dive

#### Each render has its own Effects[](#each-render-has-its-own-effects "Link for Each render has its own Effects ")

Show Details

You can think of `useEffect` as “attaching” a piece of behavior to the render output. Consider this Effect:

    export default function ChatRoom(

Let’s see what exactly happens as the user navigates around the app.

#### Initial render[](#initial-render "Link for Initial render ")

The user visits `<ChatRoom roomId="general" />`. Let’s [mentally substitute](state-as-a-snapshot.html#rendering-takes-a-snapshot-in-time) `roomId` with `'general'`:

      // JSX for the first render (roomId = "general")  return <h1>Welcome to general!</h1>;

**The Effect is _also_ a part of the rendering output.** The first render’s Effect becomes:

      // Effect for the first render (roomId = "general")  () => ,  // Dependencies for the first render (roomId = "general")  ['general']

React runs this Effect, which connects to the `'general'` chat room.

#### Re-render with same dependencies[](#re-render-with-same-dependencies "Link for Re-render with same dependencies ")

Let’s say `<ChatRoom roomId="general" />` re-renders. The JSX output is the same:

      // JSX for the second render (roomId = "general")  return <h1>Welcome to general!</h1>;

React sees that the rendering output has not changed, so it doesn’t update the DOM.

The Effect from the second render looks like this:

      // Effect for the second render (roomId = "general")  () => ,  // Dependencies for the second render (roomId = "general")  ['general']

React compares `['general']` from the second render with `['general']` from the first render. **Because all dependencies are the same, React _ignores_ the Effect from the second render.** It never gets called.

#### Re-render with different dependencies[](#re-render-with-different-dependencies "Link for Re-render with different dependencies ")

Then, the user visits `<ChatRoom roomId="travel" />`. This time, the component returns different JSX:

      // JSX for the third render (roomId = "travel")  return <h1>Welcome to travel!</h1>;

React updates the DOM to change `"Welcome to general"` into `"Welcome to travel"`.

The Effect from the third render looks like this:

      // Effect for the third render (roomId = "travel")  () => ,  // Dependencies for the third render (roomId = "travel")  ['travel']

React compares `['travel']` from the third render with `['general']` from the second render. One dependency is different: `Object.is('travel', 'general')` is `false`. The Effect can’t be skipped.

**Before React can apply the Effect from the third render, it needs to clean up the last Effect that _did_ run.** The second render’s Effect was skipped, so React needs to clean up the first render’s Effect. If you scroll up to the first render, you’ll see that its cleanup calls `disconnect()` on the connection that was created with `createConnection('general')`. This disconnects the app from the `'general'` chat room.

After that, React runs the third render’s Effect. It connects to the `'travel'` chat room.

#### Unmount[](#unmount "Link for Unmount ")

Finally, let’s say the user navigates away, and the `ChatRoom` component unmounts. React runs the last Effect’s cleanup function. The last Effect was from the third render. The third render’s cleanup destroys the `createConnection('travel')` connection. So the app disconnects from the `'travel'` room.

#### Development-only behaviors[](#development-only-behaviors "Link for Development-only behaviors ")

When [Strict Mode](../reference/react/StrictMode.html) is on, React remounts every component once after mount (state and DOM are preserved). This [helps you find Effects that need cleanup](#step-3-add-cleanup-if-needed) and exposes bugs like race conditions early. Additionally, React will remount the Effects whenever you save a file in development. Both of these behaviors are development-only.

Recap[](#recap "Link for Recap")
--------------------------------

*   Unlike events, Effects are caused by rendering itself rather than a particular interaction.
*   Effects let you synchronize a component with some external system (third-party API, network, etc).
*   By default, Effects run after every render (including the initial one).
*   React will skip the Effect if all of its dependencies have the same values as during the last render.
*   You can’t “choose” your dependencies. They are determined by the code inside the Effect.
*   Empty dependency array (`[]`) corresponds to the component “mounting”, i.e. being added to the screen.
*   In Strict Mode, React mounts components twice (in development only!) to stress-test your Effects.
*   If your Effect breaks because of remounting, you need to implement a cleanup function.
*   React will call your cleanup function before the Effect runs next time, and during the unmount.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Focus a field on mount 2. Focus a field conditionally 3. Fix an interval that fires twice 4. Fix fetching inside an Effect

#### 

Challenge 1 of 4:

Focus a field on mount[](#focus-a-field-on-mount "Link for this heading")

In this example, the form renders a `<MyInput />` component.

Use the input’s [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method to make `MyInput` automatically focus when it appears on the screen. There is already a commented out implementation, but it doesn’t quite work. Figure out why it doesn’t work, and fix it. (If you’re familiar with the `autoFocus` attribute, pretend that it does not exist: we are reimplementing the same functionality from scratch.)

MyInput.js

MyInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function MyInput() {
  const ref = useRef(null);

  // TODO: This doesn't quite work. Fix it.
  // ref.current.focus()    

  return (
    <input
      ref\=
      value\=
      onChange\=
    />
  );
}

Show more

To verify that your solution works, press “Show form” and verify that the input receives focus (becomes highlighted and the cursor is placed inside). Press “Hide form” and “Show form” again. Verify the input is highlighted again.

`MyInput` should only focus _on mount_ rather than after every render. To verify that the behavior is right, press “Show form” and then repeatedly press the “Make it uppercase” checkbox. Clicking the checkbox should _not_ focus the input above it.

Show solutionNext Challenge

[PreviousManipulating the DOM with Refs](manipulating-the-dom-with-refs.html)[NextYou Might Not Need an Effect](you-might-not-need-an-effect.html)

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
*   [What are Effects and how are they different from events?](#what-are-effects-and-how-are-they-different-from-events)
*   [You might not need an Effect](#you-might-not-need-an-effect)
*   [How to write an Effect](#how-to-write-an-effect)
*   [Step 1: Declare an Effect](#step-1-declare-an-effect)
*   [Step 2: Specify the Effect dependencies](#step-2-specify-the-effect-dependencies)
*   [Step 3: Add cleanup if needed](#step-3-add-cleanup-if-needed)
*   [How to handle the Effect firing twice in development?](#how-to-handle-the-effect-firing-twice-in-development)
*   [Controlling non-React widgets](#controlling-non-react-widgets)
*   [Subscribing to events](#subscribing-to-events)
*   [Triggering animations](#triggering-animations)
*   [Fetching data](#fetching-data)
*   [Sending analytics](#sending-analytics)
*   [Not an Effect: Initializing the application](#not-an-effect-initializing-the-application)
*   [Not an Effect: Buying a product](#not-an-effect-buying-a-product)
*   [Putting it all together](#putting-it-all-together)
*   [Recap](#recap)
*   [Challenges](#challenges)

