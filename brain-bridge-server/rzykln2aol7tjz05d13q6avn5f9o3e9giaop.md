<StrictMode> – React

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

[Components](components.html)

<StrictMode>[](#undefined "Link for this heading")
==================================================

`<StrictMode>` lets you find common bugs in your components early during development.

    <StrictMode>  <App /></StrictMode>

*   [Reference](#reference)
    *   [`<StrictMode>`](#strictmode)
*   [Usage](#usage)
    *   [Enabling Strict Mode for entire app](#enabling-strict-mode-for-entire-app)
    *   [Enabling strict mode for a part of the app](#enabling-strict-mode-for-a-part-of-the-app)
    *   [Fixing bugs found by double rendering in development](#fixing-bugs-found-by-double-rendering-in-development)
    *   [Fixing bugs found by re-running Effects in development](#fixing-bugs-found-by-re-running-effects-in-development)
    *   [Fixing deprecation warnings enabled by Strict Mode](#fixing-deprecation-warnings-enabled-by-strict-mode)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<StrictMode>`[](#strictmode "Link for this heading")

Use `StrictMode` to enable additional development behaviors and warnings for the component tree inside:

    import  from 'react-dom/client';const root = createRoot(document.getElementById('root'));root.render(  <StrictMode>    <App />  </StrictMode>);

[See more examples below.](#usage)

Strict Mode enables the following development-only behaviors:

*   Your components will [re-render an extra time](#fixing-bugs-found-by-double-rendering-in-development) to find bugs caused by impure rendering.
*   Your components will [re-run Effects an extra time](#fixing-bugs-found-by-re-running-effects-in-development) to find bugs caused by missing Effect cleanup.
*   Your components will [be checked for usage of deprecated APIs.](#fixing-deprecation-warnings-enabled-by-strict-mode)

#### Props[](#props "Link for Props ")

`StrictMode` accepts no props.

#### Caveats[](#caveats "Link for Caveats ")

*   There is no way to opt out of Strict Mode inside a tree wrapped in `<StrictMode>`. This gives you confidence that all components inside `<StrictMode>` are checked. If two teams working on a product disagree whether they find the checks valuable, they need to either reach consensus or move `<StrictMode>` down in the tree.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Enabling Strict Mode for entire app[](#enabling-strict-mode-for-entire-app "Link for Enabling Strict Mode for entire app ")

Strict Mode enables extra development-only checks for the entire component tree inside the `<StrictMode>` component. These checks help you find common bugs in your components early in the development process.

To enable Strict Mode for your entire app, wrap your root component with `<StrictMode>` when you render it:

    import  from 'react-dom/client';const root = createRoot(document.getElementById('root'));root.render(  <StrictMode>    <App />  </StrictMode>);

We recommend wrapping your entire app in Strict Mode, especially for newly created apps. If you use a framework that calls [`createRoot`](../react-dom/client/createRoot.html) for you, check its documentation for how to enable Strict Mode.

Although the Strict Mode checks **only run in development,** they help you find bugs that already exist in your code but can be tricky to reliably reproduce in production. Strict Mode lets you fix bugs before your users report them.

### Note

Strict Mode enables the following checks in development:

*   Your components will [re-render an extra time](#fixing-bugs-found-by-double-rendering-in-development) to find bugs caused by impure rendering.
*   Your components will [re-run Effects an extra time](#fixing-bugs-found-by-re-running-effects-in-development) to find bugs caused by missing Effect cleanup.
*   Your components will [be checked for usage of deprecated APIs.](#fixing-deprecation-warnings-enabled-by-strict-mode)

**All of these checks are development-only and do not impact the production build.**

* * *

### Enabling strict mode for a part of the app[](#enabling-strict-mode-for-a-part-of-the-app "Link for Enabling strict mode for a part of the app ")

You can also enable Strict Mode for any part of your application:

    import 

In this example, Strict Mode checks will not run against the `Header` and `Footer` components. However, they will run on `Sidebar` and `Content`, as well as all of the components inside them, no matter how deep.

* * *

### Fixing bugs found by double rendering in development[](#fixing-bugs-found-by-double-rendering-in-development "Link for Fixing bugs found by double rendering in development ")

[React assumes that every component you write is a pure function.](../../learn/keeping-components-pure.html) This means that React components you write must always return the same JSX given the same inputs (props, state, and context).

Components breaking this rule behave unpredictably and cause bugs. To help you find accidentally impure code, Strict Mode calls some of your functions (only the ones that should be pure) **twice in development.** This includes:

*   Your component function body (only top-level logic, so this doesn’t include code inside event handlers)
*   Functions that you pass to [`useState`](useState.html), [`set` functions](useState.html#setstate), [`useMemo`](useMemo.html), or [`useReducer`](useReducer.html)
*   Some class component methods like [`constructor`](Component.html#constructor), [`render`](Component.html#render), [`shouldComponentUpdate`](Component.html#shouldcomponentupdate) ([see the whole list](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects))

If a function is pure, running it twice does not change its behavior because a pure function produces the same result every time. However, if a function is impure (for example, it mutates the data it receives), running it twice tends to be noticeable (that’s what makes it impure!) This helps you spot and fix the bug early.

**Here is an example to illustrate how double rendering in Strict Mode helps you find bugs early.**

This `StoryTray` component takes an array of `stories` and adds one last “Create Story” item at the end:

index.jsApp.jsStoryTray.js

StoryTray.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function StoryTray() {
  const items = stories;
  items.push();
  return (
    <ul\>
      {items.map(story \=> (
        <li key\=\>
          
        </li\>
      ))}
    </ul\>
  );
}

There is a mistake in the code above. However, it is easy to miss because the initial output appears correct.

This mistake will become more noticeable if the `StoryTray` component re-renders multiple times. For example, let’s make the `StoryTray` re-render with a different background color whenever you hover over it:

index.jsApp.jsStoryTray.js

StoryTray.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function StoryTray() {
  const \[isHover, setIsHover\] = useState(false);
  const items = stories;
  items.push();
  return (
    <ul
      onPointerEnter\=
      onPointerLeave\=
      style\={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    \>
      {items.map(story \=> (
        <li key\=\>
          
        </li\>
      ))}
    </ul\>
  );
}

Show more

Notice how every time you hover over the `StoryTray` component, “Create Story” gets added to the list again. The intention of the code was to add it once at the end. But `StoryTray` directly modifies the `stories` array from the props. Every time `StoryTray` renders, it adds “Create Story” again at the end of the same array. In other words, `StoryTray` is not a pure function—running it multiple times produces different results.

To fix this problem, you can make a copy of the array, and modify that copy instead of the original one:

    export default function StoryTray();

This would [make the `StoryTray` function pure.](../../learn/keeping-components-pure.html) Each time it is called, it would only modify a new copy of the array, and would not affect any external objects or variables. This solves the bug, but you had to make the component re-render more often before it became obvious that something is wrong with its behavior.

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:**

index.jsApp.jsStoryTray.js

StoryTray.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function StoryTray() {
  const items = stories;
  items.push();
  return (
    <ul\>
      {items.map(story \=> (
        <li key\=\>
          
        </li\>
      ))}
    </ul\>
  );
}

**Strict Mode _always_ calls your rendering function twice, so you can see the mistake right away** (“Create Story” appears twice). This lets you notice such mistakes early in the process. When you fix your component to render in Strict Mode, you _also_ fix many possible future production bugs like the hover functionality from before:

index.jsApp.jsStoryTray.js

StoryTray.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function StoryTray() {
  const \[isHover, setIsHover\] = useState(false);
  const items = stories.slice(); // Clone the array
  items.push();
  return (
    <ul
      onPointerEnter\=
      onPointerLeave\=
      style\={{
        backgroundColor: isHover ? '#ddd' : '#fff'
      }}
    \>
      {items.map(story \=> (
        <li key\=\>
          
        </li\>
      ))}
    </ul\>
  );
}

Show more

Without Strict Mode, it was easy to miss the bug until you added more re-renders. Strict Mode made the same bug appear right away. Strict Mode helps you find bugs before you push them to your team and to your users.

[Read more about keeping components pure.](../../learn/keeping-components-pure.html)

### Note

If you have [React DevTools](../../learn/react-developer-tools.html) installed, any `console.log` calls during the second render call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.

* * *

### Fixing bugs found by re-running Effects in development[](#fixing-bugs-found-by-re-running-effects-in-development "Link for Fixing bugs found by re-running Effects in development ")

Strict Mode can also help find bugs in [Effects.](../../learn/synchronizing-with-effects.html)

Every Effect has some setup code and may have some cleanup code. Normally, React calls setup when the component _mounts_ (is added to the screen) and calls cleanup when the component _unmounts_ (is removed from the screen). React then calls cleanup and setup again if its dependencies changed since the last render.

When Strict Mode is on, React will also run **one extra setup+cleanup cycle in development for every Effect.** This may feel surprising, but it helps reveal subtle bugs that are hard to catch manually.

**Here is an example to illustrate how re-running Effects in Strict Mode helps you find bugs early.**

Consider this example that connects a component to a chat:

index.jsApp.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

export default function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
  }, \[\]);
  return <h1\>Welcome to the  room!</h1\>;
}

There is an issue with this code, but it might not be immediately clear.

To make the issue more obvious, let’s implement a feature. In the example below, `roomId` is not hardcoded. Instead, the user can select the `roomId` that they want to connect to from a dropdown. Click “Open chat” and then select different chat rooms one by one. Keep track of the number of active connections in the console:

index.jsApp.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
  }, \[roomId\]);

  return <h1\>Welcome to the  room!</h1\>;
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[show, setShow\] = useState(false);
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
      <button onClick\=\>
        
      </button\>
      
      
    </\>
  );
}

Show more

You’ll notice that the number of open connections always keeps growing. In a real app, this would cause performance and network problems. The issue is that [your Effect is missing a cleanup function:](../../learn/synchronizing-with-effects.html#step-3-add-cleanup-if-needed)

      useEffect(() => , [roomId]);

Now that your Effect “cleans up” after itself and destroys the outdated connections, the leak is solved. However, notice that the problem did not become visible until you’ve added more features (the select box).

**In the original example, the bug wasn’t obvious. Now let’s wrap the original (buggy) code in `<StrictMode>`:**

index.jsApp.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

export default function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
  }, \[\]);
  return <h1\>Welcome to the  room!</h1\>;
}

**With Strict Mode, you immediately see that there is a problem** (the number of active connections jumps to 2). Strict Mode runs an extra setup+cleanup cycle for every Effect. This Effect has no cleanup logic, so it creates an extra connection but doesn’t destroy it. This is a hint that you’re missing a cleanup function.

Strict Mode lets you notice such mistakes early in the process. When you fix your Effect by adding a cleanup function in Strict Mode, you _also_ fix many possible future production bugs like the select box from before:

index.jsApp.jschat.js

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
  const \[show, setShow\] = useState(false);
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
      <button onClick\=\>
        
      </button\>
      
      
    </\>
  );
}

Show more

Notice how the active connection count in the console doesn’t keep growing anymore.

Without Strict Mode, it was easy to miss that your Effect needed cleanup. By running _setup → cleanup → setup_ instead of _setup_ for your Effect in development, Strict Mode made the missing cleanup logic more noticeable.

[Read more about implementing Effect cleanup.](../../learn/synchronizing-with-effects.html#how-to-handle-the-effect-firing-twice-in-development)

* * *

### Fixing deprecation warnings enabled by Strict Mode[](#fixing-deprecation-warnings-enabled-by-strict-mode "Link for Fixing deprecation warnings enabled by Strict Mode ")

React warns if some component anywhere inside a `<StrictMode>` tree uses one of these deprecated APIs:

*   [`findDOMNode`](../react-dom/findDOMNode.html). [See alternatives.](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)
*   `UNSAFE_` class lifecycle methods like [`UNSAFE_componentWillMount`](Component.html#unsafe_componentwillmount). [See alternatives.](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#migrating-from-legacy-lifecycles)
*   Legacy context ([`childContextTypes`](Component.html#static-childcontexttypes), [`contextTypes`](Component.html#static-contexttypes), and [`getChildContext`](Component.html#getchildcontext)). [See alternatives.](createContext.html)
*   Legacy string refs ([`this.refs`](Component.html#refs)). [See alternatives.](https://reactjs.org/docs/strict-mode.html#warning-about-legacy-string-ref-api-usage)

These APIs are primarily used in older [class components](Component.html) so they rarely appear in modern apps.

[Previous<Profiler>](Profiler.html)[Next<Suspense>](Suspense.html)

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
*   [`<StrictMode>`](#strictmode)
*   [Usage](#usage)
*   [Enabling Strict Mode for entire app](#enabling-strict-mode-for-entire-app)
*   [Enabling strict mode for a part of the app](#enabling-strict-mode-for-a-part-of-the-app)
*   [Fixing bugs found by double rendering in development](#fixing-bugs-found-by-double-rendering-in-development)
*   [Fixing bugs found by re-running Effects in development](#fixing-bugs-found-by-re-running-effects-in-development)
*   [Fixing deprecation warnings enabled by Strict Mode](#fixing-deprecation-warnings-enabled-by-strict-mode)

