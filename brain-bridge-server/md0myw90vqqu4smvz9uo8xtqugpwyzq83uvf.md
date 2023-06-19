useDeferredValue – React

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

useDeferredValue[](#undefined "Link for this heading")
======================================================

`useDeferredValue` is a React Hook that lets you defer updating a part of the UI.

    const deferredValue = useDeferredValue(value)

*   [Reference](#reference)
    *   [`useDeferredValue(value)`](#usedeferredvalue)
*   [Usage](#usage)
    *   [Showing stale content while fresh content is loading](#showing-stale-content-while-fresh-content-is-loading)
    *   [Indicating that the content is stale](#indicating-that-the-content-is-stale)
    *   [Deferring re-rendering for a part of the UI](#deferring-re-rendering-for-a-part-of-the-ui)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useDeferredValue(value)`[](#usedeferredvalue "Link for this heading")

Call `useDeferredValue` at the top level of your component to get a deferred version of that value.

    import 

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `value`: The value you want to defer. It can have any type.

#### Returns[](#returns "Link for Returns ")

During the initial render, the returned deferred value will be the same as the value you provided. During updates, React will first attempt a re-render with the old value (so it will return the old value), and then try another re-render in background with the new value (so it will return the updated value).

#### Caveats[](#caveats "Link for Caveats ")

*   The values you pass to `useDeferredValue` should either be primitive values (like strings and numbers) or objects created outside of rendering. If you create a new object during rendering and immediately pass it to `useDeferredValue`, it will be different on every render, causing unnecessary background re-renders.
    
*   When `useDeferredValue` receives a different value (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), in addition to the current render (when it still uses the previous value), it schedules a re-render in the background with the new value. The background re-render is interruptible: if there’s another update to the `value`, React will restart the background re-render from scratch. For example, if the user is typing into an input faster than a chart receiving its deferred value can re-render, the chart will only re-render after the user stops typing.
    
*   `useDeferredValue` is integrated with [`<Suspense>`.](Suspense.html) If the background update caused by a new value suspends the UI, the user will not see the fallback. They will see the old deferred value until the data loads.
    
*   `useDeferredValue` does not by itself prevent extra network requests.
    
*   There is no fixed delay caused by `useDeferredValue` itself. As soon as React finishes the original re-render, React will immediately start working on the background re-render with the new deferred value. Any updates caused by events (like typing) will interrupt the background re-render and get prioritized over it.
    
*   The background re-render caused by `useDeferredValue` does not fire Effects until it’s committed to the screen. If the background re-render suspends, its Effects will run after the data loads and the UI updates.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Showing stale content while fresh content is loading[](#showing-stale-content-while-fresh-content-is-loading "Link for Showing stale content while fresh content is loading ")

Call `useDeferredValue` at the top level of your component to defer updating some part of your UI.

    import 

During the initial render, the deferred value will be the same as the value you provided.

During updates, the deferred value will “lag behind” the latest value. In particular, React will first re-render _without_ updating the deferred value, and then try to re-render with the newly received value in background.

**Let’s walk through an example to see when this is useful.**

### Note

This example assumes you use one of Suspense-enabled data sources:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/advanced-features/react-18)
*   Lazy-loading component code with [`lazy`](lazy.html)

[Learn more about Suspense and its limitations.](Suspense.html)

In this example, the `SearchResults` component [suspends](Suspense.html#displaying-a-fallback-while-content-is-loading) while fetching the search results. Try typing `"a"`, waiting for the results, and then editing it to `"ab"`. The results for `"a"` get replaced by the loading fallback.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const \[query, setQuery\] = useState('');
  return (
    <\>
      <label\>
        Search albums:
        <input value\= />
      </label\>
      <Suspense fallback\=\>
        <SearchResults query\= />
      </Suspense\>
    </\>
  );
}

Show more

A common alternative UI pattern is to _defer_ updating the list of results and to keep showing the previous results until the new results are ready. Call `useDeferredValue` to pass a deferred version of the query down:

    export default function App() 

The `query` will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.

Enter `"a"` in the example below, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the stale result list until the new results have loaded:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const \[query, setQuery\] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <\>
      <label\>
        Search albums:
        <input value\= />
      </label\>
      <Suspense fallback\=\>
        <SearchResults query\= />
      </Suspense\>
    </\>
  );
}

Show more

##### Deep Dive

#### How does deferring a value work under the hood?[](#how-does-deferring-a-value-work-under-the-hood "Link for How does deferring a value work under the hood? ")

Show Details

You can think of it as happening in two steps:

1.  **First, React re-renders with the new `query` (`"ab"`) but with the old `deferredQuery` (still `"a")`.** The `deferredQuery` value, which you pass to the result list, is _deferred:_ it “lags behind” the `query` value.
    
2.  **In background, React tries to re-render with _both_ `query` and `deferredQuery` updated to `"ab"`.** If this re-render completes, React will show it on the screen. However, if it suspends (the results for `"ab"` have not loaded yet), React will abandon this rendering attempt, and retry this re-render again after the data has loaded. The user will keep seeing the stale deferred value until the data is ready.
    

The deferred “background” rendering is interruptible. For example, if you type into the input again, React will abandon it and restart with the new value. React will always use the latest provided value.

Note that there is still a network request per each keystroke. What’s being deferred here is displaying results (until they’re ready), not the network requests themselves. Even if the user continues typing, responses for each keystroke get cached, so pressing Backspace is instant and doesn’t fetch again.

* * *

### Indicating that the content is stale[](#indicating-that-the-content-is-stale "Link for Indicating that the content is stale ")

In the example above, there is no indication that the result list for the latest query is still loading. This can be confusing to the user if the new results take a while to load. To make it more obvious to the user that the result list does not match the latest query, you can add a visual indication when the stale result list is displayed:

    <div style= /></div>

With this change, as soon as you start typing, the stale result list gets slightly dimmed until the new result list loads. You can also add a CSS transition to delay dimming so that it feels gradual, like in the example below:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import SearchResults from './SearchResults.js';

export default function App() {
  const \[query, setQuery\] = useState('');
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;
  return (
    <\>
      <label\>
        Search albums:
        <input value\= />
      </label\>
      <Suspense fallback\=\>
        <div style\={{
          opacity: isStale ? 0.5 : 1,
          transition: isStale ? 'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear'
        }}\>
          <SearchResults query\= />
        </div\>
      </Suspense\>
    </\>
  );
}

Show more

* * *

### Deferring re-rendering for a part of the UI[](#deferring-re-rendering-for-a-part-of-the-ui "Link for Deferring re-rendering for a part of the UI ")

You can also apply `useDeferredValue` as a performance optimization. It is useful when a part of your UI is slow to re-render, there’s no easy way to optimize it, and you want to prevent it from blocking the rest of the UI.

Imagine you have a text field and a component (like a chart or a long list) that re-renders on every keystroke:

    function App() 

First, optimize `SlowList` to skip re-rendering when its props are the same. To do this, [wrap it in `memo`:](memo.html#skipping-re-rendering-when-props-are-unchanged)

    const SlowList = memo(function SlowList();

However, this only helps if the `SlowList` props are _the same_ as during the previous render. The problem you’re facing now is that it’s slow when they’re _different,_ and when you actually need to show different visual output.

Concretely, the main performance problem is that whenever you type into the input, the `SlowList` receives new props, and re-rendering its entire tree makes the typing feel janky. In this case, `useDeferredValue` lets you prioritize updating the input (which must be fast) over updating the result list (which is allowed to be slower):

    function App() 

This does not make re-rendering of the `SlowList` faster. However, it tells React that re-rendering the list can be deprioritized so that it doesn’t block the keystrokes. The list will “lag behind” the input and then “catch up”. Like before, React will attempt to update the list as soon as possible, but will not block the user from typing.

#### The difference between useDeferredValue and unoptimized re-rendering[](#examples "Link for The difference between useDeferredValue and unoptimized re-rendering")

1. Deferred re-rendering of the list 2. Unoptimized re-rendering of the list

#### 

Example 1 of 2:

Deferred re-rendering of the list[](#deferred-re-rendering-of-the-list "Link for this heading")

In this example, each item in the `SlowList` component is **artificially slowed down** so that you can see how `useDeferredValue` lets you keep the input responsive. Type into the input and notice that typing feels snappy while the list “lags behind” it.

App.jsSlowList.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import SlowList from './SlowList.js';

export default function App() {
  const \[text, setText\] = useState('');
  const deferredText = useDeferredValue(text);
  return (
    <\>
      <input value\= />
      <SlowList text\= />
    </\>
  );
}

Next Example

### Pitfall

This optimization requires `SlowList` to be wrapped in [`memo`.](memo.html) This is because whenever the `text` changes, React needs to be able to re-render the parent component quickly. During that re-render, `deferredText` still has its previous value, so `SlowList` is able to skip re-rendering (its props have not changed). Without [`memo`,](memo.html) it would have to re-render anyway, defeating the point of the optimization.

##### Deep Dive

#### How is deferring a value different from debouncing and throttling?[](#how-is-deferring-a-value-different-from-debouncing-and-throttling "Link for How is deferring a value different from debouncing and throttling? ")

Show Details

There are two common optimization techniques you might have used before in this scenario:

*   _Debouncing_ means you’d wait for the user to stop typing (e.g. for a second) before updating the list.
*   _Throttling_ means you’d update the list every once in a while (e.g. at most once a second).

While these techniques are helpful in some cases, `useDeferredValue` is better suited to optimizing rendering because it is deeply integrated with React itself and adapts to the user’s device.

Unlike debouncing or throttling, it doesn’t require choosing any fixed delay. If the user’s device is fast (e.g. powerful laptop), the deferred re-render would happen almost immediately and wouldn’t be noticeable. If the user’s device is slow, the list would “lag behind” the input proportionally to how slow the device is.

Also, unlike with debouncing or throttling, deferred re-renders done by `useDeferredValue` are interruptible by default. This means that if React is in the middle of re-rendering a large list, but the user makes another keystroke, React will abandon that re-render, handle the keystroke, and then start rendering in background again. By contrast, debouncing and throttling still produce a janky experience because they’re _blocking:_ they merely postpone the moment when rendering blocks the keystroke.

If the work you’re optimizing doesn’t happen during rendering, debouncing and throttling are still useful. For example, they can let you fire fewer network requests. You can also use these techniques together.

[PrevioususeDebugValue](useDebugValue.html)[NextuseEffect](useEffect.html)

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
*   [`useDeferredValue(value)`](#usedeferredvalue)
*   [Usage](#usage)
*   [Showing stale content while fresh content is loading](#showing-stale-content-while-fresh-content-is-loading)
*   [Indicating that the content is stale](#indicating-that-the-content-is-stale)
*   [Deferring re-rendering for a part of the UI](#deferring-re-rendering-for-a-part-of-the-ui)

