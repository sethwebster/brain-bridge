useSyncExternalStore – React

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

useSyncExternalStore[](#undefined "Link for this heading")
==========================================================

`useSyncExternalStore` is a React Hook that lets you subscribe to an external store.

    const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)

*   [Reference](#reference)
    *   [`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`](#usesyncexternalstore)
*   [Usage](#usage)
    *   [Subscribing to an external store](#subscribing-to-an-external-store)
    *   [Subscribing to a browser API](#subscribing-to-a-browser-api)
    *   [Extracting the logic to a custom Hook](#extracting-the-logic-to-a-custom-hook)
    *   [Adding support for server rendering](#adding-support-for-server-rendering)
*   [Troubleshooting](#troubleshooting)
    *   [I’m getting an error: “The result of `getSnapshot` should be cached”](#im-getting-an-error-the-result-of-getsnapshot-should-be-cached)
    *   [My `subscribe` function gets called after every re-render](#my-subscribe-function-gets-called-after-every-re-render)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`[](#usesyncexternalstore "Link for this heading")

Call `useSyncExternalStore` at the top level of your component to read a value from an external data store.

    import 

It returns the snapshot of the data in the store. You need to pass two functions as arguments:

1.  The `subscribe` function should subscribe to the store and return a function that unsubscribes.
2.  The `getSnapshot` function should read a snapshot of the data from the store.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `subscribe`: A function that takes a single `callback` argument and subscribes it to the store. When the store changes, it should invoke the provided `callback`. This will cause the component to re-render. The `subscribe` function should return a function that cleans up the subscription.
    
*   `getSnapshot`: A function that returns a snapshot of the data in the store that’s needed by the component. While the store has not changed, repeated calls to `getSnapshot` must return the same value. If the store changes and the returned value is different (as compared by [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), React re-renders the component.
    
*   **optional** `getServerSnapshot`: A function that returns the initial snapshot of the data in the store. It will be used only during server rendering and during hydration of server-rendered content on the client. The server snapshot must be the same between the client and the server, and is usually serialized and passed from the server to the client. If you omit this argument, rendering the component on the server will throw an error.
    

#### Returns[](#returns "Link for Returns ")

The current snapshot of the store which you can use in your rendering logic.

#### Caveats[](#caveats "Link for Caveats ")

*   The store snapshot returned by `getSnapshot` must be immutable. If the underlying store has mutable data, return a new immutable snapshot if the data has changed. Otherwise, return a cached last snapshot.
    
*   If a different `subscribe` function is passed during a re-render, React will re-subscribe to the store using the newly passed `subscribe` function. You can prevent this by declaring `subscribe` outside the component.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Subscribing to an external store[](#subscribing-to-an-external-store "Link for Subscribing to an external store ")

Most of your React components will only read data from their [props,](../../learn/passing-props-to-a-component.html) [state,](useState.html) and [context.](useContext.html) However, sometimes a component needs to read some data from some store outside of React that changes over time. This includes:

*   Third-party state management libraries that hold state outside of React.
*   Browser APIs that expose a mutable value and events to subscribe to its changes.

Call `useSyncExternalStore` at the top level of your component to read a value from an external data store.

    import 

It returns the snapshot of the data in the store. You need to pass two functions as arguments:

1.  The `subscribe` function should subscribe to the store and return a function that unsubscribes.
2.  The `getSnapshot` function should read a snapshot of the data from the store.

React will use these functions to keep your component subscribed to the store and re-render it on changes.

For example, in the sandbox below, `todosStore` is implemented as an external store that stores data outside of React. The `TodosApp` component connects to that external store with the `useSyncExternalStore` Hook.

App.jstodoStore.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './todoStore.js';

export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <\>
      <button onClick\=\>Add todo</button\>
      <hr />
      <ul\>
        {todos.map(todo \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

### Note

When possible, we recommend using built-in React state with [`useState`](useState.html) and [`useReducer`](useReducer.html) instead. The `useSyncExternalStore` API is mostly useful if you need to integrate with existing non-React code.

* * *

### Subscribing to a browser API[](#subscribing-to-a-browser-api "Link for Subscribing to a browser API ")

Another reason to add `useSyncExternalStore` is when you want to subscribe to some value exposed by the browser that changes over time. For example, suppose that you want your component to display whether the network connection is active. The browser exposes this information via a property called [`navigator.onLine`.](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine)

This value can change without React’s knowledge, so you should read it with `useSyncExternalStore`.

    import 

To implement the `getSnapshot` function, read the current value from the browser API:

    function getSnapshot() 

Next, you need to implement the `subscribe` function. For example, when `navigator.onLine` changes, the browser fires the [`online`](https://developer.mozilla.org/en-US/docs/Web/API/Window/online_event) and [`offline`](https://developer.mozilla.org/en-US/docs/Web/API/Window/offline_event) events on the `window` object. You need to subscribe the `callback` argument to the corresponding events, and then return a function that cleans up the subscriptions:

    function subscribe(callback) 

Now React knows how to read the value from the external `navigator.onLine` API and how to subscribe to its changes. Disconnect your device from the network and notice that the component re-renders in response:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1\></h1\>;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () \=> {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

Show more

* * *

### Extracting the logic to a custom Hook[](#extracting-the-logic-to-a-custom-hook "Link for Extracting the logic to a custom Hook ")

Usually you won’t write `useSyncExternalStore` directly in your components. Instead, you’ll typically call it from your own custom Hook. This lets you use the same external store from different components.

For example, this custom `useOnlineStatus` Hook tracks whether the network is online:

    import 

Now different components can call `useOnlineStatus` without repeating the underlying implementation:

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

* * *

### Adding support for server rendering[](#adding-support-for-server-rendering "Link for Adding support for server rendering ")

If your React app uses [server rendering,](../react-dom/server.html) your React components will also run outside the browser environment to generate the initial HTML. This creates a few challenges when connecting to an external store:

*   If you’re connecting to a browser-only API, it won’t work because it does not exist on the server.
*   If you’re connecting to a third-party data store, you’ll need its data to match between the server and client.

To solve these issues, pass a `getServerSnapshot` function as the third argument to `useSyncExternalStore`:

    import 

The `getServerSnapshot` function is similar to `getSnapshot`, but it runs only in two situations:

*   It runs on the server when generating the HTML.
*   It runs on the client during [hydration](../react-dom/client/hydrateRoot.html), i.e. when React takes the server HTML and makes it interactive.

This lets you provide the initial snapshot value which will be used before the app becomes interactive. If there is no meaningful initial value for the server rendering, omit this argument to [force rendering on the client.](Suspense.html#providing-a-fallback-for-server-errors-and-server-only-content)

### Note

Make sure that `getServerSnapshot` returns the same exact data on the initial client render as it returned on the server. For example, if `getServerSnapshot` returned some prepopulated store content on the server, you need to transfer this content to the client. One way to do this is to emit a `<script>` tag during server rendering that sets a global like `window.MY_STORE_DATA`, and read from that global on the client in `getServerSnapshot`. Your external store should provide instructions on how to do that.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I’m getting an error: “The result of `getSnapshot` should be cached”[](#im-getting-an-error-the-result-of-getsnapshot-should-be-cached "Link for this heading")

This error means your `getSnapshot` function returns a new object every time it’s called, for example:

    function getSnapshot() 

React will re-render the component if `getSnapshot` return value is different from the last time. This is why, if you always return a different value, you will enter an infinite loop and get this error.

Your `getSnapshot` object should only return a different object if something has actually changed. If your store contains immutable data, you can return that data directly:

    function getSnapshot() 

If your store data is mutable, your `getSnapshot` function should return an immutable snapshot of it. This means it _does_ need to create new objects, but it shouldn’t do this for every single call. Instead, it should store the last calculated snapshot, and return the same snapshot as the last time if the data in the store has not changed. How you determine whether mutable data has changed depends on your mutable store.

* * *

### My `subscribe` function gets called after every re-render[](#my-subscribe-function-gets-called-after-every-re-render "Link for this heading")

This `subscribe` function is defined _inside_ a component so it is different on every re-render:

    function ChatIndicator() 

React will resubscribe to your store if you pass a different `subscribe` function between re-renders. If this causes performance issues and you’d like to avoid resubscribing, move the `subscribe` function outside:

    function ChatIndicator() 

Alternatively, wrap `subscribe` into [`useCallback`](useCallback.html) to only resubscribe when some argument changes:

    function ChatIndicator(

[PrevioususeState](useState.html)[NextuseTransition](useTransition.html)

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
*   [`useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`](#usesyncexternalstore)
*   [Usage](#usage)
*   [Subscribing to an external store](#subscribing-to-an-external-store)
*   [Subscribing to a browser API](#subscribing-to-a-browser-api)
*   [Extracting the logic to a custom Hook](#extracting-the-logic-to-a-custom-hook)
*   [Adding support for server rendering](#adding-support-for-server-rendering)
*   [Troubleshooting](#troubleshooting)
*   [I’m getting an error: “The result of `getSnapshot` should be cached”](#im-getting-an-error-the-result-of-getsnapshot-should-be-cached)
*   [My `subscribe` function gets called after every re-render](#my-subscribe-function-gets-called-after-every-re-render)

