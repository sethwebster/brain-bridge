Reusing Logic with Custom Hooks – React

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

Reusing Logic with Custom Hooks[](#undefined "Link for this heading")
=====================================================================

React comes with several built-in Hooks like `useState`, `useContext`, and `useEffect`. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, to fetch data, to keep track of whether the user is online, or to connect to a chat room. You might not find these Hooks in React, but you can create your own Hooks for your application’s needs.

### You will learn

*   What custom Hooks are, and how to write your own
*   How to reuse logic between components
*   How to name and structure your custom Hooks
*   When and why to extract custom Hooks

Custom Hooks: Sharing logic between components[](#custom-hooks-sharing-logic-between-components "Link for Custom Hooks: Sharing logic between components ")
-----------------------------------------------------------------------------------------------------------------------------------------------------------

Imagine you’re developing an app that heavily relies on the network (as most apps do). You want to warn the user if their network connection has accidentally gone off while they were using your app. How would you go about it? It seems like you’ll need two things in your component:

1.  A piece of state that tracks whether the network is online.
2.  An Effect that subscribes to the global [`online`](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) and [`offline`](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) events, and updates that state.

This will keep your component [synchronized](synchronizing-with-effects.html) with the network status. You might start with something like this:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function StatusBar() {
  const \[isOnline, setIsOnline\] = useState(true);
  useEffect(() \=> {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () \=> {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, \[\]);

  return <h1\></h1\>;
}

Show more

Try turning your network on and off, and notice how this `StatusBar` updates in response to your actions.

Now imagine you _also_ want to use the same logic in a different component. You want to implement a Save button that will become disabled and show “Reconnecting…” instead of “Save” while the network is off.

To start, you can copy and paste the `isOnline` state and the Effect into `SaveButton`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function SaveButton() {
  const \[isOnline, setIsOnline\] = useState(true);
  useEffect(() \=> {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () \=> {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, \[\]);

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled\=\>
      
    </button\>
  );
}

Show more

Verify that, if you turn off the network, the button will change its appearance.

These two components work fine, but the duplication in logic between them is unfortunate. It seems like even though they have different _visual appearance,_ you want to reuse the logic between them.

### Extracting your own custom Hook from a component[](#extracting-your-own-custom-hook-from-a-component "Link for Extracting your own custom Hook from a component ")

Imagine for a moment that, similar to [`useState`](../reference/react/useState.html) and [`useEffect`](../reference/react/useEffect.html), there was a built-in `useOnlineStatus` Hook. Then both of these components could be simplified and you could remove the duplication between them:

    function StatusBar() 

Although there is no such built-in Hook, you can write it yourself. Declare a function called `useOnlineStatus` and move all the duplicated code into it from the components you wrote earlier:

    function useOnlineStatus() 

At the end of the function, return `isOnline`. This lets your components read that value:

App.jsuseOnlineStatus.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './useOnlineStatus.js';

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1\></h1\>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled\=\>
      
    </button\>
  );
}

export default function App() {
  return (
    <\>
      <SaveButton />
      <StatusBar />
    </\>
  );
}

Show more

Verify that switching the network on and off updates both components.

Now your components don’t have as much repetitive logic. **More importantly, the code inside them describes _what they want to do_ (use the online status!) rather than _how to do it_ (by subscribing to the browser events).**

When you extract logic into custom Hooks, you can hide the gnarly details of how you deal with some external system or a browser API. The code of your components expresses your intent, not the implementation.

### Hook names always start with `use`[](#hook-names-always-start-with-use "Link for this heading")

React applications are built from components. Components are built from Hooks, whether built-in or custom. You’ll likely often use custom Hooks created by others, but occasionally you might write one yourself!

You must follow these naming conventions:

1.  **React component names must start with a capital letter,** like `StatusBar` and `SaveButton`. React components also need to return something that React knows how to display, like a piece of JSX.
2.  **Hook names must start with `use` followed by a capital letter,** like [`useState`](../reference/react/useState.html) (built-in) or `useOnlineStatus` (custom, like earlier on the page). Hooks may return arbitrary values.

This convention guarantees that you can always look at a component and know where its state, Effects, and other React features might “hide”. For example, if you see a `getColor()` function call inside your component, you can be sure that it can’t possibly contain React state inside because its name doesn’t start with `use`. However, a function call like `useOnlineStatus()` will most likely contain calls to other Hooks inside!

### Note

If your linter is [configured for React,](editor-setup.html#linting) it will enforce this naming convention. Scroll up to the sandbox above and rename `useOnlineStatus` to `getOnlineStatus`. Notice that the linter won’t allow you to call `useState` or `useEffect` inside of it anymore. Only Hooks and components can call other Hooks!

##### Deep Dive

#### Should all functions called during rendering start with the use prefix?[](#should-all-functions-called-during-rendering-start-with-the-use-prefix "Link for Should all functions called during rendering start with the use prefix? ")

Show Details

No. Functions that don’t _call_ Hooks don’t need to _be_ Hooks.

If your function doesn’t call any Hooks, avoid the `use` prefix. Instead, write it as a regular function _without_ the `use` prefix. For example, `useSorted` below doesn’t call Hooks, so call it `getSorted` instead:

    // 🔴 Avoid: A Hook that doesn't use Hooksfunction useSorted(items) 

This ensures that your code can call this regular function anywhere, including conditions:

    function List(

You should give `use` prefix to a function (and thus make it a Hook) if it uses at least one Hook inside of it:

    // ✅ Good: A Hook that uses other Hooksfunction useAuth() 

Technically, this isn’t enforced by React. In principle, you could make a Hook that doesn’t call other Hooks. This is often confusing and limiting so it’s best to avoid that pattern. However, there may be rare cases where it is helpful. For example, maybe your function doesn’t use any Hooks right now, but you plan to add some Hook calls to it in the future. Then it makes sense to name it with the `use` prefix:

    // ✅ Good: A Hook that will likely use some other Hooks laterfunction useAuth() 

Then components won’t be able to call it conditionally. This will become important when you actually add Hook calls inside. If you don’t plan to use Hooks inside it (now or later), don’t make it a Hook.

### Custom Hooks let you share stateful logic, not state itself[](#custom-hooks-let-you-share-stateful-logic-not-state-itself "Link for Custom Hooks let you share stateful logic, not state itself ")

In the earlier example, when you turned the network on and off, both components updated together. However, it’s wrong to think that a single `isOnline` state variable is shared between them. Look at this code:

    function StatusBar() 

It works the same way as before you extracted the duplication:

    function StatusBar() 

These are two completely independent state variables and Effects! They happened to have the same value at the same time because you synchronized them with the same external value (whether the network is on).

To better illustrate this, we’ll need a different example. Consider this `Form` component:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[firstName, setFirstName\] = useState('Mary');
  const \[lastName, setLastName\] = useState('Poppins');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <\>
      <label\>
        First name:
        <input value\= />
      </label\>
      <label\>
        Last name:
        <input value\= />
      </label\>
      <p\><b\>Good morning, .</b\></p\>
    </\>
  );
}

Show more

There’s some repetitive logic for each form field:

1.  There’s a piece of state (`firstName` and `lastName`).
2.  There’s a change handler (`handleFirstNameChange` and `handleLastNameChange`).
3.  There’s a piece of JSX that specifies the `value` and `onChange` attributes for that input.

You can extract the repetitive logic into this `useFormInput` custom Hook:

App.jsuseFormInput.js

useFormInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export function useFormInput(initialValue) {
  const \[value, setValue\] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

Show more

Notice that it only declares _one_ state variable called `value`.

However, the `Form` component calls `useFormInput` _two times:_

    function Form() {  const firstNameProps = useFormInput('Mary');  const lastNameProps = useFormInput('Poppins');  // ...

This is why it works like declaring two separate state variables!

**Custom Hooks let you share _stateful logic_ but not _state itself._ Each call to a Hook is completely independent from every other call to the same Hook.** This is why the two sandboxes above are completely equivalent. If you’d like, scroll back up and compare them. The behavior before and after extracting a custom Hook is identical.

When you need to share the state itself between multiple components, [lift it up and pass it down](sharing-state-between-components.html) instead.

Passing reactive values between Hooks[](#passing-reactive-values-between-hooks "Link for Passing reactive values between Hooks ")
---------------------------------------------------------------------------------------------------------------------------------

The code inside your custom Hooks will re-run during every re-render of your component. This is why, like components, custom Hooks [need to be pure.](keeping-components-pure.html) Think of custom Hooks’ code as part of your component’s body!

Because custom Hooks re-render together with your component, they always receive the latest props and state. To see what this means, consider this chat room example. Change the server URL or the chat room:

App.jsChatRoom.jschat.jsnotifications.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';
import  from './notifications.js';

export default function ChatRoom() {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useEffect(() \=> {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.on('message', (msg) \=> {
      showNotification('New message: ' + msg);
    });
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId, serverUrl\]);

  return (
    <\>
      <label\>
        Server URL:
        <input value\= />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

Show more

When you change `serverUrl` or `roomId`, the Effect [“reacts” to your changes](lifecycle-of-reactive-effects.html#effects-react-to-reactive-values) and re-synchronizes. You can tell by the console messages that the chat re-connects every time that you change your Effect’s dependencies.

Now move the Effect’s code into a custom Hook:

    export function useChatRoom(

This lets your `ChatRoom` component call your custom Hook without worrying about how it works inside:

    export default function ChatRoom(

This looks much simpler! (But it does the same thing.)

Notice that the logic _still responds_ to prop and state changes. Try editing the server URL or the selected room:

App.jsChatRoom.jsuseChatRoom.jschat.jsnotifications.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './useChatRoom.js';

export default function ChatRoom() {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl
  });

  return (
    <\>
      <label\>
        Server URL:
        <input value\= />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

Show more

Notice how you’re taking the return value of one Hook:

    export default function ChatRoom();  // ...

and pass it as an input to another Hook:

    export default function ChatRoom();  // ...

Every time your `ChatRoom` component re-renders, it passes the latest `roomId` and `serverUrl` to your Hook. This is why your Effect re-connects to the chat whenever their values are different after a re-render. (If you ever worked with audio or video processing software, chaining Hooks like this might remind you of chaining visual or audio effects. It’s as if the output of `useState` “feeds into” the input of the `useChatRoom`.)

### Passing event handlers to custom Hooks[](#passing-event-handlers-to-custom-hooks "Link for Passing event handlers to custom Hooks ")

### Under Construction

This section describes an **experimental API that has not yet been released** in a stable version of React.

As you start using `useChatRoom` in more components, you might want to let components customize its behavior. For example, currently, the logic for what to do when a message arrives is hardcoded inside the Hook:

    export function useChatRoom(

Let’s say you want to move this logic back to your component:

    export default function ChatRoom();  // ...

To make this work, change your custom Hook to take `onReceiveMessage` as one of its named options:

    export function useChatRoom(

This will work, but there’s one more improvement you can do when your custom Hook accepts event handlers.

Adding a dependency on `onReceiveMessage` is not ideal because it will cause the chat to re-connect every time the component re-renders. [Wrap this event handler into an Effect Event to remove it from the dependencies:](removing-effect-dependencies.html#wrapping-an-event-handler-from-the-props)

    import 

Now the chat won’t re-connect every time that the `ChatRoom` component re-renders. Here is a fully working demo of passing an event handler to a custom Hook that you can play with:

App.jsChatRoom.jsuseChatRoom.jschat.jsnotifications.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './useChatRoom.js';
import  from './notifications.js';

export default function ChatRoom() {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });

  return (
    <\>
      <label\>
        Server URL:
        <input value\= />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

Show more

Notice how you no longer need to know _how_ `useChatRoom` works in order to use it. You could add it to any other component, pass any other options, and it would work the same way. That’s the power of custom Hooks.

When to use custom Hooks[](#when-to-use-custom-hooks "Link for When to use custom Hooks ")
------------------------------------------------------------------------------------------

You don’t need to extract a custom Hook for every little duplicated bit of code. Some duplication is fine. For example, extracting a `useFormInput` Hook to wrap a single `useState` call like earlier is probably unnecessary.

However, whenever you write an Effect, consider whether it would be clearer to also wrap it in a custom Hook. [You shouldn’t need Effects very often,](you-might-not-need-an-effect.html) so if you’re writing one, it means that you need to “step outside React” to synchronize with some external system or to do something that React doesn’t have a built-in API for. Wrapping it into a custom Hook lets you precisely communicate your intent and how the data flows through it.

For example, consider a `ShippingForm` component that displays two dropdowns: one shows the list of cities, and another shows the list of areas in the selected city. You might start with some code that looks like this:

    function ShippingForm(, [city]);  // ...

Although this code is quite repetitive, [it’s correct to keep these Effects separate from each other.](removing-effect-dependencies.html#is-your-effect-doing-several-unrelated-things) They synchronize two different things, so you shouldn’t merge them into one Effect. Instead, you can simplify the `ShippingForm` component above by extracting the common logic between them into your own `useData` Hook:

    function useData(url) 

Now you can replace both Effects in the `ShippingForm` components with calls to `useData`:

    function ShippingForm(` : null);  // ...

Extracting a custom Hook makes the data flow explicit. You feed the `url` in and you get the `data` out. By “hiding” your Effect inside `useData`, you also prevent someone working on the `ShippingForm` component from adding [unnecessary dependencies](removing-effect-dependencies.html) to it. With time, most of your app’s Effects will be in custom Hooks.

##### Deep Dive

#### Keep your custom Hooks focused on concrete high-level use cases[](#keep-your-custom-hooks-focused-on-concrete-high-level-use-cases "Link for Keep your custom Hooks focused on concrete high-level use cases ")

Show Details

Start by choosing your custom Hook’s name. If you struggle to pick a clear name, it might mean that your Effect is too coupled to the rest of your component’s logic, and is not yet ready to be extracted.

Ideally, your custom Hook’s name should be clear enough that even a person who doesn’t write code often could have a good guess about what your custom Hook does, what it takes, and what it returns:

*   ✅ `useData(url)`
*   ✅ `useImpressionLog(eventName, extraData)`
*   ✅ `useChatRoom(options)`

When you synchronize with an external system, your custom Hook name may be more technical and use jargon specific to that system. It’s good as long as it would be clear to a person familiar with that system:

*   ✅ `useMediaQuery(query)`
*   ✅ `useSocket(url)`
*   ✅ `useIntersectionObserver(ref, options)`

**Keep custom Hooks focused on concrete high-level use cases.** Avoid creating and using custom “lifecycle” Hooks that act as alternatives and convenience wrappers for the `useEffect` API itself:

*   🔴 `useMount(fn)`
*   🔴 `useEffectOnce(fn)`
*   🔴 `useUpdateEffect(fn)`

For example, this `useMount` Hook tries to ensure some code only runs “on mount”:

    function ChatRoom(

**Custom “lifecycle” Hooks like `useMount` don’t fit well into the React paradigm.** For example, this code example has a mistake (it doesn’t “react” to `roomId` or `serverUrl` changes), but the linter won’t warn you about it because the linter only checks direct `useEffect` calls. It won’t know about your Hook.

If you’re writing an Effect, start by using the React API directly:

    function ChatRoom(

Then, you can (but don’t have to) extract custom Hooks for different high-level use cases:

    function ChatRoom(

**A good custom Hook makes the calling code more declarative by constraining what it does.** For example, `useChatRoom(options)` can only connect to the chat room, while `useImpressionLog(eventName, extraData)` can only send an impression log to the analytics. If your custom Hook API doesn’t constrain the use cases and is very abstract, in the long run it’s likely to introduce more problems than it solves.

### Custom Hooks help you migrate to better patterns[](#custom-hooks-help-you-migrate-to-better-patterns "Link for Custom Hooks help you migrate to better patterns ")

Effects are an [“escape hatch”](escape-hatches.html): you use them when you need to “step outside React” and when there is no better built-in solution for your use case. With time, the React team’s goal is to reduce the number of the Effects in your app to the minimum by providing more specific solutions to more specific problems. Wrapping your Effects in custom Hooks makes it easier to upgrade your code when these solutions become available.

Let’s return to this example:

App.jsuseOnlineStatus.js

useOnlineStatus.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export function useOnlineStatus() {
  const \[isOnline, setIsOnline\] = useState(true);
  useEffect(() \=> {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () \=> {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, \[\]);
  return isOnline;
}

Show more

In the above example, `useOnlineStatus` is implemented with a pair of [`useState`](../reference/react/useState.html) and [`useEffect`.](../reference/react/useEffect.html) However, this isn’t the best possible solution. There is a number of edge cases it doesn’t consider. For example, it assumes that when the component mounts, `isOnline` is already `true`, but this may be wrong if the network already went offline. You can use the browser [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) API to check for that, but using it directly would not work on the server for generating the initial HTML. In short, this code could be improved.

Luckily, React 18 includes a dedicated API called [`useSyncExternalStore`](../reference/react/useSyncExternalStore.html) which takes care of all of these problems for you. Here is how your `useOnlineStatus` Hook, rewritten to take advantage of this new API:

App.jsuseOnlineStatus.js

useOnlineStatus.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () \=> {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus() {
  return useSyncExternalStore(
    subscribe,
    () \=> navigator.onLine, // How to get the value on the client
    () \=> true // How to get the value on the server
  );
}

Show more

Notice how **you didn’t need to change any of the components** to make this migration:

    function StatusBar() 

This is another reason for why wrapping Effects in custom Hooks is often beneficial:

1.  You make the data flow to and from your Effects very explicit.
2.  You let your components focus on the intent rather than on the exact implementation of your Effects.
3.  When React adds new features, you can remove those Effects without changing any of your components.

Similar to a [design system,](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969) you might find it helpful to start extracting common idioms from your app’s components into custom Hooks. This will keep your components’ code focused on the intent, and let you avoid writing raw Effects very often. Many excellent custom Hooks are maintained by the React community.

##### Deep Dive

#### Will React provide any built-in solution for data fetching?[](#will-react-provide-any-built-in-solution-for-data-fetching "Link for Will React provide any built-in solution for data fetching? ")

Show Details

We’re still working out the details, but we expect that in the future, you’ll write data fetching like this:

    import `)) : null;  // ...

If you use custom Hooks like `useData` above in your app, it will require fewer changes to migrate to the eventually recommended approach than if you write raw Effects in every component manually. However, the old approach will still work fine, so if you feel happy writing raw Effects, you can continue to do that.

### There is more than one way to do it[](#there-is-more-than-one-way-to-do-it "Link for There is more than one way to do it ")

Let’s say you want to implement a fade-in animation _from scratch_ using the browser [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API. You might start with an Effect that sets up an animation loop. During each frame of the animation, you could change the opacity of the DOM node you [hold in a ref](manipulating-the-dom-with-refs.html) until it reaches `1`. Your code might start like this:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function Welcome() {
  const ref = useRef(null);

  useEffect(() \=> {
    const duration = 1000;
    const node = ref.current;

    let startTime = performance.now();
    let frameId = null;

    function onFrame(now) {
      const timePassed = now - startTime;
      const progress = Math.min(timePassed / duration, 1);
      onProgress(progress);
      if (progress < 1) {
        // We still have more frames to paint
        frameId = requestAnimationFrame(onFrame);
      }
    }

    function onProgress(progress) {
      node.style.opacity = progress;
    }

    function start() {
      onProgress(0);
      startTime = performance.now();
      frameId = requestAnimationFrame(onFrame);
    }

    function stop() {
      cancelAnimationFrame(frameId);
      startTime = null;
      frameId = null;
    }

    start();
    return () \=> stop();
  }, \[\]);

  return (
    <h1 className\="welcome" ref\=\>
      Welcome
    </h1\>
  );
}

export default function App() {
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <button onClick\=\>
        
      </button\>
      <hr />
      
    </\>
  );
}

Show more

To make the component more readable, you might extract the logic into a `useFadeIn` custom Hook:

App.jsuseFadeIn.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './useFadeIn.js';

function Welcome() {
  const ref = useRef(null);

  useFadeIn(ref, 1000);

  return (
    <h1 className\="welcome" ref\=\>
      Welcome
    </h1\>
  );
}

export default function App() {
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <button onClick\=\>
        
      </button\>
      <hr />
      
    </\>
  );
}

Show more

You could keep the `useFadeIn` code as is, but you could also refactor it more. For example, you could extract the logic for setting up the animation loop out of `useFadeIn` into a custom `useAnimationLoop` Hook:

App.jsuseFadeIn.js

useFadeIn.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react';

export function useFadeIn(ref, duration) {
  const \[isRunning, setIsRunning\] = useState(true);

  useAnimationLoop(isRunning, (timePassed) \=> {
    const progress = Math.min(timePassed / duration, 1);
    ref.current.style.opacity = progress;
    if (progress === 1) {
      setIsRunning(false);
    }
  });
}

function useAnimationLoop(isRunning, drawFrame) {
  const onFrame = useEffectEvent(drawFrame);

  useEffect(() \=> {
    if (!isRunning) {
      return;
    }

    const startTime = performance.now();
    let frameId = null;

    function tick(now) {
      const timePassed = now - startTime;
      onFrame(timePassed);
      frameId = requestAnimationFrame(tick);
    }

    tick();
    return () \=> cancelAnimationFrame(frameId);
  }, \[isRunning\]);
}

Show more

However, you didn’t _have to_ do that. As with regular functions, ultimately you decide where to draw the boundaries between different parts of your code. You could also take a very different approach. Instead of keeping the logic in the Effect, you could move most of the imperative logic inside a JavaScript [class:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

App.jsuseFadeIn.jsanimation.js

useFadeIn.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './animation.js';

export function useFadeIn(ref, duration) {
  useEffect(() \=> {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    return () \=> {
      animation.stop();
    };
  }, \[ref, duration\]);
}

Effects let you connect React to external systems. The more coordination between Effects is needed (for example, to chain multiple animations), the more it makes sense to extract that logic out of Effects and Hooks _completely_ like in the sandbox above. Then, the code you extracted _becomes_ the “external system”. This lets your Effects stay simple because they only need to send messages to the system you’ve moved outside React.

The examples above assume that the fade-in logic needs to be written in JavaScript. However, this particular fade-in animation is both simpler and much more efficient to implement with a plain [CSS Animation:](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

App.jswelcome.css

welcome.css

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

.welcome {
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);

  animation: fadeIn 1000ms;
}

@keyframes fadeIn {
  0% 
  100% 
}

Sometimes, you don’t even need a Hook!

Recap[](#recap "Link for Recap")
--------------------------------

*   Custom Hooks let you share logic between components.
*   Custom Hooks must be named starting with `use` followed by a capital letter.
*   Custom Hooks only share stateful logic, not state itself.
*   You can pass reactive values from one Hook to another, and they stay up-to-date.
*   All Hooks re-run every time your component re-renders.
*   The code of your custom Hooks should be pure, like your component’s code.
*   Wrap event handlers received by custom Hooks into Effect Events.
*   Don’t create custom Hooks like `useMount`. Keep their purpose specific.
*   It’s up to you how and where to choose the boundaries of your code.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Extract a `useCounter` Hook 2. Make the counter delay configurable 3. Extract `useInterval` out of `useCounter` 4. Fix a resetting interval 5. Implement a staggering movement

#### 

Challenge 1 of 5:

Extract a `useCounter` Hook[](#extract-a-usecounter-hook "Link for this heading")

This component uses a state variable and an Effect to display a number that increments every second. Extract this logic into a custom Hook called `useCounter`. Your goal is to make the `Counter` component implementation look exactly like this:

    export default function Counter() 

You’ll need to write your custom Hook in `useCounter.js` and import it into the `Counter.js` file.

App.jsuseCounter.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[count, setCount\] = useState(0);
  useEffect(() \=> {
    const id = setInterval(() \=> {
      setCount(c \=> c + 1);
    }, 1000);
    return () \=> clearInterval(id);
  }, \[\]);
  return <h1\>Seconds passed: </h1\>;
}

Show solutionNext Challenge

[PreviousRemoving Effect Dependencies](removing-effect-dependencies.html)

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
*   [Custom Hooks: Sharing logic between components](#custom-hooks-sharing-logic-between-components)
*   [Extracting your own custom Hook from a component](#extracting-your-own-custom-hook-from-a-component)
*   [Hook names always start with `use`](#hook-names-always-start-with-use)
*   [Custom Hooks let you share stateful logic, not state itself](#custom-hooks-let-you-share-stateful-logic-not-state-itself)
*   [Passing reactive values between Hooks](#passing-reactive-values-between-hooks)
*   [Passing event handlers to custom Hooks](#passing-event-handlers-to-custom-hooks)
*   [When to use custom Hooks](#when-to-use-custom-hooks)
*   [Custom Hooks help you migrate to better patterns](#custom-hooks-help-you-migrate-to-better-patterns)
*   [There is more than one way to do it](#there-is-more-than-one-way-to-do-it)
*   [Recap](#recap)
*   [Challenges](#challenges)

