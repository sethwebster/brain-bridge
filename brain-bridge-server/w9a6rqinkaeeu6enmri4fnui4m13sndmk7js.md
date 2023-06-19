useTransition – React

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

useTransition[](#undefined "Link for this heading")
===================================================

`useTransition` is a React Hook that lets you update the state without blocking the UI.

    const [isPending, startTransition] = useTransition()

*   [Reference](#reference)
    *   [`useTransition()`](#usetransition)
    *   [`startTransition` function](#starttransition)
*   [Usage](#usage)
    *   [Marking a state update as a non-blocking transition](#marking-a-state-update-as-a-non-blocking-transition)
    *   [Updating the parent component in a transition](#updating-the-parent-component-in-a-transition)
    *   [Displaying a pending visual state during the transition](#displaying-a-pending-visual-state-during-the-transition)
    *   [Preventing unwanted loading indicators](#preventing-unwanted-loading-indicators)
    *   [Building a Suspense-enabled router](#building-a-suspense-enabled-router)
*   [Troubleshooting](#troubleshooting)
    *   [Updating an input in a transition doesn’t work](#updating-an-input-in-a-transition-doesnt-work)
    *   [React doesn’t treat my state update as a transition](#react-doesnt-treat-my-state-update-as-a-transition)
    *   [I want to call `useTransition` from outside a component](#i-want-to-call-usetransition-from-outside-a-component)
    *   [The function I pass to `startTransition` executes immediately](#the-function-i-pass-to-starttransition-executes-immediately)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useTransition()`[](#usetransition "Link for this heading")

Call `useTransition` at the top level of your component to mark some state updates as transitions.

    import 

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

`useTransition` does not take any parameters.

#### Returns[](#returns "Link for Returns ")

`useTransition` returns an array with exactly two items:

1.  The `isPending` flag that tells you whether there is a pending transition.
2.  The [`startTransition` function](#starttransition) that lets you mark a state update as a transition.

* * *

### `startTransition` function[](#starttransition "Link for this heading")

The `startTransition` function returned by `useTransition` lets you mark a state update as a transition.

    function TabContainer() 

#### Parameters[](#starttransition-parameters "Link for Parameters ")

*   `scope`: A function that updates some state by calling one or more [`set` functions.](useState.html#setstate) React immediately calls `scope` with no parameters and marks all state updates scheduled synchronously during the `scope` function call as transitions. They will be [non-blocking](#marking-a-state-update-as-a-non-blocking-transition) and [will not display unwanted loading indicators.](#preventing-unwanted-loading-indicators)

#### Returns[](#starttransition-returns "Link for Returns ")

`startTransition` does not return anything.

#### Caveats[](#starttransition-caveats "Link for Caveats ")

*   `useTransition` is a Hook, so it can only be called inside components or custom Hooks. If you need to start a transition somewhere else (for example, from a data library), call the standalone [`startTransition`](startTransition.html) instead.
    
*   You can wrap an update into a transition only if you have access to the `set` function of that state. If you want to start a transition in response to some prop or a custom Hook value, try [`useDeferredValue`](useDeferredValue.html) instead.
    
*   The function you pass to `startTransition` must be synchronous. React immediately executes this function, marking all state updates that happen while it executes as transitions. If you try to perform more state updates later (for example, in a timeout), they won’t be marked as transitions.
    
*   A state update marked as a transition will be interrupted by other state updates. For example, if you update a chart component inside a transition, but then start typing into an input while the chart is in the middle of a re-render, React will restart the rendering work on the chart component after handling the input update.
    
*   Transition updates can’t be used to control text inputs.
    
*   If there are multiple ongoing transitions, React currently batches them together. This is a limitation that will likely be removed in a future release.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Marking a state update as a non-blocking transition[](#marking-a-state-update-as-a-non-blocking-transition "Link for Marking a state update as a non-blocking transition ")

Call `useTransition` at the top level of your component to mark state updates as non-blocking _transitions_.

    import 

`useTransition` returns an array with exactly two items:

1.  The `isPending` flag that tells you whether there is a pending transition.
2.  The `startTransition` function that lets you mark a state update as a transition.

You can then mark a state update as a transition like this:

    function TabContainer() 

Transitions let you keep the user interface updates responsive even on slow devices.

With a transition, your UI stays responsive in the middle of a re-render. For example, if the user clicks a tab but then change their mind and click another tab, they can do that without waiting for the first re-render to finish.

#### The difference between useTransition and regular state updates[](#examples "Link for The difference between useTransition and regular state updates")

1. Updating the current tab in a transition 2. Updating the current tab without a transition

#### 

Example 1 of 2:

Updating the current tab in a transition[](#updating-the-current-tab-in-a-transition "Link for this heading")

In this example, the “Posts” tab is **artificially slowed down** so that it takes at least a second to render.

Click “Posts” and then immediately click “Contact”. Notice that this interrupts the slow render of “Posts”. The “Contact” tab shows immediately. Because this state update is marked as a transition, a slow re-render did not freeze the user interface.

App.jsTabButton.jsAboutTab.jsPostsTab.jsContactTab.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const \[isPending, startTransition\] = useTransition();
  const \[tab, setTab\] = useState('about');

  function selectTab(nextTab) {
    startTransition(() \=> {
      setTab(nextTab);      
    });
  }

  return (
    <\>
      <TabButton
        isActive\=
        onClick\=
      \>
        About
      </TabButton\>
      <TabButton
        isActive\=
        onClick\=
      \>
        Posts (slow)
      </TabButton\>
      <TabButton
        isActive\=
        onClick\=
      \>
        Contact
      </TabButton\>
      <hr />
      
      
      
    </\>
  );
}

Show more

Next Example

* * *

### Updating the parent component in a transition[](#updating-the-parent-component-in-a-transition "Link for Updating the parent component in a transition ")

You can update a parent component’s state from the `useTransition` call, too. For example, this `TabButton` component wraps its `onClick` logic in a transition:

    export default function TabButton(

Because the parent component updates its state inside the `onClick` event handler, that state update gets marked as a transition. This is why, like in the earlier example, you can click on “Posts” and then immediately click “Contact”. Updating the selected tab is marked as a transition, so it does not block user interactions.

App.jsTabButton.jsAboutTab.jsPostsTab.jsContactTab.js

TabButton.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function TabButton() {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\></b\>
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        onClick();
      });
    }}\>
      
    </button\>
  );
}

Show more

* * *

### Displaying a pending visual state during the transition[](#displaying-a-pending-visual-state-during-the-transition "Link for Displaying a pending visual state during the transition ")

You can use the `isPending` boolean value returned by `useTransition` to indicate to the user that a transition is in progress. For example, the tab button can have a special “pending” visual state:

    function TabButton(  // ...

Notice how clicking “Posts” now feels more responsive because the tab button itself updates right away:

App.jsTabButton.jsAboutTab.jsPostsTab.jsContactTab.js

TabButton.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function TabButton() {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\></b\>
  }
  if (isPending) {
    return <b className\="pending"\></b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        onClick();
      });
    }}\>
      
    </button\>
  );
}

Show more

* * *

### Preventing unwanted loading indicators[](#preventing-unwanted-loading-indicators "Link for Preventing unwanted loading indicators ")

In this example, the `PostsTab` component fetches some data using a [Suspense-enabled](Suspense.html) data source. When you click the “Posts” tab, the `PostsTab` component _suspends_, causing the closest loading fallback to appear:

App.jsTabButton.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import TabButton from './TabButton.js';
import AboutTab from './AboutTab.js';
import PostsTab from './PostsTab.js';
import ContactTab from './ContactTab.js';

export default function TabContainer() {
  const \[tab, setTab\] = useState('about');
  return (
    <Suspense fallback\=\>
      <TabButton
        isActive\=
        onClick\=
      \>
        About
      </TabButton\>
      <TabButton
        isActive\=
        onClick\=
      \>
        Posts
      </TabButton\>
      <TabButton
        isActive\=
        onClick\=
      \>
        Contact
      </TabButton\>
      <hr />
      
      
      
    </Suspense\>
  );
}

Show more

Hiding the entire tab container to show a loading indicator leads to a jarring user experience. If you add `useTransition` to `TabButton`, you can instead indicate display the pending state in the tab button instead.

Notice that clicking “Posts” no longer replaces the entire tab container with a spinner:

App.jsTabButton.js

TabButton.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function TabButton() {
  const \[isPending, startTransition\] = useTransition();
  if (isActive) {
    return <b\></b\>
  }
  if (isPending) {
    return <b className\="pending"\></b\>;
  }
  return (
    <button onClick\={() \=> {
      startTransition(() \=> {
        onClick();
      });
    }}\>
      
    </button\>
  );
}

Show more

[Read more about using transitions with Suspense.](Suspense.html#preventing-already-revealed-content-from-hiding)

### Note

Transitions will only “wait” long enough to avoid hiding _already revealed_ content (like the tab container). If the Posts tab had a [nested `<Suspense>` boundary,](Suspense.html#revealing-nested-content-as-it-loads) the transition would not “wait” for it.

* * *

### Building a Suspense-enabled router[](#building-a-suspense-enabled-router "Link for Building a Suspense-enabled router ")

If you’re building a React framework or a router, we recommend marking page navigations as transitions.

    function Router()   // ...

This is recommended for two reasons:

*   [Transitions are interruptible,](#marking-a-state-update-as-a-non-blocking-transition) which lets the user click away without waiting for the re-render to complete.
*   [Transitions prevent unwanted loading indicators,](#preventing-unwanted-loading-indicators) which lets the user avoid jarring jumps on navigation.

Here is a tiny simplified router example using transitions for navigations.

App.jsLayout.jsIndexPage.jsArtistPage.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import IndexPage from './IndexPage.js';
import ArtistPage from './ArtistPage.js';
import Layout from './Layout.js';

export default function App() {
  return (
    <Suspense fallback\=\>
      <Router />
    </Suspense\>
  );
}

function Router() {
  const \[page, setPage\] = useState('/');
  const \[isPending, startTransition\] = useTransition();

  function navigate(url) {
    startTransition(() \=> {
      setPage(url);
    });
  }

  let content;
  if (page === '/') {
    content = (
      <IndexPage navigate\= />
    );
  } else if (page === '/the-beatles') {
    content = (
      <ArtistPage
        artist\={{
          id: 'the-beatles',
          name: 'The Beatles',
        }}
      />
    );
  }
  return (
    <Layout isPending\=\>
      
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

Show more

### Note

[Suspense-enabled](Suspense.html) routers are expected to wrap the navigation updates into transitions by default.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### Updating an input in a transition doesn’t work[](#updating-an-input-in-a-transition-doesnt-work "Link for Updating an input in a transition doesn’t work ")

You can’t use a transition for a state variable that controls an input:

    const [text, setText] = useState('');// ...function handleChange(e)  />;

This is because transitions are non-blocking, but updating an input in response to the change event should happen synchronously. If you want to run a transition in response to typing, you have two options:

1.  You can declare two separate state variables: one for the input state (which always updates synchronously), and one that you will update in a transition. This lets you control the input using the synchronous state, and pass the transition state variable (which will “lag behind” the input) to the rest of your rendering logic.
2.  Alternatively, you can have one state variable, and add [`useDeferredValue`](useDeferredValue.html) which will “lag behind” the real value. It will trigger non-blocking re-renders to “catch up” with the new value automatically.

* * *

### React doesn’t treat my state update as a transition[](#react-doesnt-treat-my-state-update-as-a-transition "Link for React doesn’t treat my state update as a transition ")

When you wrap a state update in a transition, make sure that it happens _during_ the `startTransition` call:

    startTransition(() => );

The function you pass to `startTransition` must be synchronous.

You can’t mark an update as a transition like this:

    startTransition(() => );

Instead, you could do this:

    setTimeout(() => , 1000);

Similarly, you can’t mark an update as a transition like this:

    startTransition(async () => );

However, this works instead:

    await someAsyncFunction();startTransition(() => );

* * *

### I want to call `useTransition` from outside a component[](#i-want-to-call-usetransition-from-outside-a-component "Link for this heading")

You can’t call `useTransition` outside a component because it’s a Hook. In this case, use the standalone [`startTransition`](startTransition.html) method instead. It works the same way, but it doesn’t provide the `isPending` indicator.

* * *

### The function I pass to `startTransition` executes immediately[](#the-function-i-pass-to-starttransition-executes-immediately "Link for this heading")

If you run this code, it will print 1, 2, 3:

    console.log(1);startTransition(() => );console.log(3);

**It is expected to print 1, 2, 3.** The function you pass to `startTransition` does not get delayed. Unlike with the browser `setTimeout`, it does not run the callback later. React executes your function immediately, but any state updates scheduled _while it is running_ are marked as transitions. You can imagine that it works like this:

    // A simplified version of how React workslet isInsideTransition = false;function startTransition(scope) 

[PrevioususeSyncExternalStore](useSyncExternalStore.html)[NextComponents](components.html)

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
*   [`useTransition()`](#usetransition)
*   [`startTransition` function](#starttransition)
*   [Usage](#usage)
*   [Marking a state update as a non-blocking transition](#marking-a-state-update-as-a-non-blocking-transition)
*   [Updating the parent component in a transition](#updating-the-parent-component-in-a-transition)
*   [Displaying a pending visual state during the transition](#displaying-a-pending-visual-state-during-the-transition)
*   [Preventing unwanted loading indicators](#preventing-unwanted-loading-indicators)
*   [Building a Suspense-enabled router](#building-a-suspense-enabled-router)
*   [Troubleshooting](#troubleshooting)
*   [Updating an input in a transition doesn’t work](#updating-an-input-in-a-transition-doesnt-work)
*   [React doesn’t treat my state update as a transition](#react-doesnt-treat-my-state-update-as-a-transition)
*   [I want to call `useTransition` from outside a component](#i-want-to-call-usetransition-from-outside-a-component)
*   [The function I pass to `startTransition` executes immediately](#the-function-i-pass-to-starttransition-executes-immediately)

