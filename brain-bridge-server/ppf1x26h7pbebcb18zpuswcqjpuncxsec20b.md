Escape Hatches – React

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

Escape Hatches[](#undefined "Link for this heading")
====================================================

Advanced

Some of your components may need to control and synchronize with systems outside of React. For example, you might need to focus an input using the browser API, play and pause a video player implemented without React, or connect and listen to messages from a remote server. In this chapter, you’ll learn the escape hatches that let you “step outside” React and connect to external systems. Most of your application logic and data flow should not rely on these features.

### In this chapter

*   [How to “remember” information without re-rendering](referencing-values-with-refs.html)
*   [How to access DOM elements managed by React](manipulating-the-dom-with-refs.html)
*   [How to synchronize components with external systems](synchronizing-with-effects.html)
*   [How to remove unnecessary Effects from your components](you-might-not-need-an-effect.html)
*   [How an Effect’s lifecycle is different from a component’s](lifecycle-of-reactive-effects.html)
*   [How to prevent some values from re-triggering Effects](separating-events-from-effects.html)
*   [How to make your Effect re-run less often](removing-effect-dependencies.html)
*   [How to share logic between components](reusing-logic-with-custom-hooks.html)

Referencing values with refs[](#referencing-values-with-refs "Link for Referencing values with refs ")
------------------------------------------------------------------------------------------------------

When you want a component to “remember” some information, but you don’t want that information to [trigger new renders](render-and-commit.html), you can use a _ref_:

    const ref = useRef(0);

Like state, refs are retained by React between re-renders. However, setting state re-renders a component. Changing a ref does not! You can access the current value of that ref through the `ref.current` property.

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

A ref is like a secret pocket of your component that React doesn’t track. For example, you can use refs to store [timeout IDs](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#return_value), [DOM elements](https://developer.mozilla.org/en-US/docs/Web/API/Element), and other objects that don’t impact the component’s rendering output.

Ready to learn this topic?
--------------------------

Read **[Referencing Values with Refs](referencing-values-with-refs.html)** to learn how to use refs to remember information.

[Read More](referencing-values-with-refs.html)

* * *

Manipulating the DOM with refs[](#manipulating-the-dom-with-refs "Link for Manipulating the DOM with refs ")
------------------------------------------------------------------------------------------------------------

React automatically updates the DOM to match your render output, so your components won’t often need to manipulate it. However, sometimes you might need access to the DOM elements managed by React—for example, to focus a node, scroll to it, or measure its size and position. There is no built-in way to do those things in React, so you will need a ref to the DOM node. For example, clicking the button will focus the input using a ref:

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

Ready to learn this topic?
--------------------------

Read **[Manipulating the DOM with Refs](manipulating-the-dom-with-refs.html)** to learn how to access DOM elements managed by React.

[Read More](manipulating-the-dom-with-refs.html)

* * *

Synchronizing with Effects[](#synchronizing-with-effects "Link for Synchronizing with Effects ")
------------------------------------------------------------------------------------------------

Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Unlike event handlers, which let you handle particular events, _Effects_ let you run some code after rendering. Use them to synchronize your component with a system outside of React.

Press Play/Pause a few times and see how the video player stays synchronized to the `isPlaying` prop value:

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
  }, \[isPlaying\]);

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

Many Effects also “clean up” after themselves. For example, an Effect that sets up a connection to a chat server should return a _cleanup function_ that tells React how to disconnect your component from that server:

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

In development, React will immediately run and clean up your Effect one extra time. This is why you see `"✅ Connecting..."` printed twice. This ensures that you don’t forget to implement the cleanup function.

Ready to learn this topic?
--------------------------

Read **[Synchronizing with Effects](synchronizing-with-effects.html)** to learn how to synchronize components with external systems.

[Read More](synchronizing-with-effects.html)

* * *

You Might Not Need An Effect[](#you-might-not-need-an-effect "Link for You Might Not Need An Effect ")
------------------------------------------------------------------------------------------------------

Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.

There are two common cases in which you don’t need Effects:

*   **You don’t need Effects to transform data for rendering.**
*   **You don’t need Effects to handle user events.**

For example, you don’t need an Effect to adjust some state based on other state:

    function Form() 

Instead, calculate as much as you can while rendering:

    function Form() 

However, you _do_ need Effects to synchronize with external systems.

Ready to learn this topic?
--------------------------

Read **[You Might Not Need an Effect](you-might-not-need-an-effect.html)** to learn how to remove unnecessary Effects.

[Read More](you-might-not-need-an-effect.html)

* * *

Lifecycle of reactive effects[](#lifecycle-of-reactive-effects "Link for Lifecycle of reactive effects ")
---------------------------------------------------------------------------------------------------------

Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time.

This Effect depends on the value of the `roomId` prop. Props are _reactive values,_ which means they can change on a re-render. Notice that the Effect _re-synchronizes_ (and re-connects to the server) if `roomId` changes:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);

  return <h1\>Welcome to the  room!</h1\>;
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly. If you forget to specify `roomId` in the list of dependencies in the above example, the linter will find that bug automatically.

Ready to learn this topic?
--------------------------

Read **[Lifecycle of Reactive Events](lifecycle-of-reactive-effects.html)** to learn how an Effect’s lifecycle is different from a component’s.

[Read More](lifecycle-of-reactive-effects.html)

* * *

Separating events from Effects[](#separating-events-from-effects "Link for Separating events from Effects ")
------------------------------------------------------------------------------------------------------------

### Under Construction

This section describes an **experimental API that has not yet been released** in a stable version of React.

Event handlers only re-run when you perform the same interaction again. Unlike event handlers, Effects re-synchronize if any of the values they read, like props or state, are different than during last render. Sometimes, you want a mix of both behaviors: an Effect that re-runs in response to some values but not others.

All code inside Effects is _reactive._ It will run again if some reactive value it reads has changed due to a re-render. For example, this Effect will re-connect to the chat if either `roomId` or `theme` have changed:

App.jschat.jsnotifications.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';
import  from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () \=> {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId, theme\]);

  return <h1\>Welcome to the  room!</h1\>
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[isDark, setIsDark\] = useState(false);
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\=
        />
        Use dark theme
      </label\>
      <hr />
      <ChatRoom
        roomId\=
        theme\= 
      />
    </\>
  );
}

Show more

This is not ideal. You want to re-connect to the chat only if the `roomId` has changed. Switching the `theme` shouldn’t re-connect to the chat! Move the code reading `theme` out of your Effect into an _Effect Event_:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react';
import  from './chat.js';
import  from './notifications.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  const onConnected = useEffectEvent(() \=> {
    showNotification('Connected!', theme);
  });

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () \=> {
      onConnected();
    });
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);

  return <h1\>Welcome to the  room!</h1\>
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[isDark, setIsDark\] = useState(false);
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\=
        />
        Use dark theme
      </label\>
      <hr />
      <ChatRoom
        roomId\=
        theme\= 
      />
    </\>
  );
}

Show more

Code inside Effect Events isn’t reactive, so changing the `theme` no longer makes your Effect re-connect.

Ready to learn this topic?
--------------------------

Read **[Separating Events from Effects](separating-events-from-effects.html)** to learn how to prevent some values from re-triggering Effects.

[Read More](separating-events-from-effects.html)

* * *

Removing Effect dependencies[](#removing-effect-dependencies "Link for Removing Effect dependencies ")
------------------------------------------------------------------------------------------------------

When you write an Effect, the linter will verify that you’ve included every reactive value (like props and state) that the Effect reads in the list of your Effect’s dependencies. This ensures that your Effect remains synchronized with the latest props and state of your component. Unnecessary dependencies may cause your Effect to run too often, or even create an infinite loop. The way you remove them depends on the case.

For example, this Effect depends on the `options` object which gets re-created every time you edit the input:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  const \[message, setMessage\] = useState('');

  const options = {
    serverUrl: serverUrl,
    roomId: roomId
  };

  useEffect(() \=> {
    const connection = createConnection(options);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[options\]);

  return (
    <\>
      <h1\>Welcome to the  room!</h1\>
      <input value\= />
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

You don’t want the chat to re-connect every time you start typing a message in that chat. To fix this problem, move creation of the `options` object inside the Effect so that the Effect only depends on the `roomId` string:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  const \[message, setMessage\] = useState('');

  useEffect(() \=> {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);

  return (
    <\>
      <h1\>Welcome to the  room!</h1\>
      <input value\= />
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

Notice that you didn’t start by editing the dependency list to remove the `options` dependency. That would be wrong. Instead, you changed the surrounding code so that the dependency became _unnecessary._ Think of the dependency list as a list of all the reactive values used by your Effect’s code. You don’t intentionally choose what to put on that list. The list describes your code. To change the dependency list, change the code.

Ready to learn this topic?
--------------------------

Read **[Removing Effect Dependencies](removing-effect-dependencies.html)** to learn how to make your Effect re-run less often.

[Read More](removing-effect-dependencies.html)

* * *

Reusing logic with custom Hooks[](#reusing-logic-with-custom-hooks "Link for Reusing logic with custom Hooks ")
---------------------------------------------------------------------------------------------------------------

React comes with built-in Hooks like `useState`, `useContext`, and `useEffect`. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. To do this, you can create your own Hooks for your application’s needs.

In this example, the `usePointerPosition` custom Hook tracks the cursor position, while `useDelayedValue` custom Hook returns a value that’s “lagging behind” the value you passed by a certain number of milliseconds. Move the cursor over the sandbox preview area to see a moving trail of dots following the cursor:

App.jsusePointerPosition.jsuseDelayedValue.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './usePointerPosition.js';
import  from './useDelayedValue.js';

export default function Canvas() {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 50);
  return (
    <\>
      <Dot position\= />
      <Dot position\= />
      <Dot position\= />
      <Dot position\= />
      <Dot position\= />
    </\>
  );
}

function Dot() {
  return (
    <div style\={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: \`translate($px)\`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}

Show more

You can create custom Hooks, compose them together, pass data between them, and reuse them between components. As your app grows, you will write fewer Effects by hand because you’ll be able to reuse custom Hooks you already wrote. There are also many excellent custom Hooks maintained by the React community.

Ready to learn this topic?
--------------------------

Read **[Reusing Logic with Custom Hooks](reusing-logic-with-custom-hooks.html)** to learn how to share logic between components.

[Read More](reusing-logic-with-custom-hooks.html)

* * *

What’s next?[](#whats-next "Link for What’s next? ")
----------------------------------------------------

Head over to [Referencing Values with Refs](referencing-values-with-refs.html) to start reading this chapter page by page!

[PreviousScaling Up with Reducer and Context](scaling-up-with-reducer-and-context.html)[NextReferencing Values with Refs](referencing-values-with-refs.html)

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
*   [Referencing values with refs](#referencing-values-with-refs)
*   [Manipulating the DOM with refs](#manipulating-the-dom-with-refs)
*   [Synchronizing with Effects](#synchronizing-with-effects)
*   [You Might Not Need An Effect](#you-might-not-need-an-effect)
*   [Lifecycle of reactive effects](#lifecycle-of-reactive-effects)
*   [Separating events from Effects](#separating-events-from-effects)
*   [Removing Effect dependencies](#removing-effect-dependencies)
*   [Reusing logic with custom Hooks](#reusing-logic-with-custom-hooks)
*   [What’s next?](#whats-next)

