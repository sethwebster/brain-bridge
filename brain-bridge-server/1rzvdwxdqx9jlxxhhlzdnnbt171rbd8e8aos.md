<Suspense> – React

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

<Suspense>[](#undefined "Link for this heading")
================================================

`<Suspense>` lets you display a fallback until its children have finished loading.

    <Suspense fallback=>  <SomeComponent /></Suspense>

*   [Reference](#reference)
    *   [`<Suspense>`](#suspense)
*   [Usage](#usage)
    *   [Displaying a fallback while content is loading](#displaying-a-fallback-while-content-is-loading)
    *   [Revealing content together at once](#revealing-content-together-at-once)
    *   [Revealing nested content as it loads](#revealing-nested-content-as-it-loads)
    *   [Showing stale content while fresh content is loading](#showing-stale-content-while-fresh-content-is-loading)
    *   [Preventing already revealed content from hiding](#preventing-already-revealed-content-from-hiding)
    *   [Indicating that a transition is happening](#indicating-that-a-transition-is-happening)
    *   [Resetting Suspense boundaries on navigation](#resetting-suspense-boundaries-on-navigation)
    *   [Providing a fallback for server errors and server-only content](#providing-a-fallback-for-server-errors-and-server-only-content)
*   [Troubleshooting](#troubleshooting)
    *   [How do I prevent the UI from being replaced by a fallback during an update?](#preventing-unwanted-fallbacks)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<Suspense>`[](#suspense "Link for this heading")

#### Props[](#props "Link for Props ")

*   `children`: The actual UI you intend to render. If `children` suspends while rendering, the Suspense boundary will switch to rendering `fallback`.
*   `fallback`: An alternate UI to render in place of the actual UI if it has not finished loading. Any valid React node is accepted, though in practice, a fallback is a lightweight placeholder view, such as a loading spinner or skeleton. Suspense will automatically switch to `fallback` when `children` suspends, and back to `children` when the data is ready. If `fallback` suspends while rendering, it will activate the closest parent Suspense boundary.

#### Caveats[](#caveats "Link for Caveats ")

*   React does not preserve any state for renders that got suspended before they were able to mount for the first time. When the component has loaded, React will retry rendering the suspended tree from scratch.
*   If Suspense was displaying content for the tree, but then it suspended again, the `fallback` will be shown again unless the update causing it was caused by [`startTransition`](startTransition.html) or [`useDeferredValue`](useDeferredValue.html).
*   If React needs to hide the already visible content because it suspended again, it will clean up [layout Effects](useLayoutEffect.html) in the content tree. When the content is ready to be shown again, React will fire the layout Effects again. This ensures that Effects measuring the DOM layout don’t try to do this while the content is hidden.
*   React includes under-the-hood optimizations like _Streaming Server Rendering_ and _Selective Hydration_ that are integrated with Suspense. Read [an architectural overview](https://github.com/reactwg/react-18/discussions/37) and watch [a technical talk](https://www.youtube.com/watch?v=pj5N-Khihgc) to learn more.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Displaying a fallback while content is loading[](#displaying-a-fallback-while-content-is-loading "Link for Displaying a fallback while content is loading ")

You can wrap any part of your application with a Suspense boundary:

    <Suspense fallback=>  <Albums /></Suspense>

React will display your loading fallback until all the code and data needed by the children has been loaded.

In the example below, the `Albums` component _suspends_ while fetching the list of albums. Until it’s ready to render, React switches the closest Suspense boundary above to show the fallback—your `Loading` component. Then, when the data loads, React hides the `Loading` fallback and renders the `Albums` component with data.

ArtistPage.js

ArtistPage.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Albums from './Albums.js';

export default function ArtistPage() {
  return (
    <\>
      <h1\></h1\>
      <Suspense fallback\=\>
        <Albums artistId\= />
      </Suspense\>
    </\>
  );
}

function Loading() {
  return <h2\>🌀 Loading...</h2\>;
}

Show more

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/advanced-features/react-18)
*   Lazy-loading component code with [`lazy`](lazy.html)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Albums` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Revealing content together at once[](#revealing-content-together-at-once "Link for Revealing content together at once ")

By default, the whole tree inside Suspense is treated as a single unit. For example, even if _only one_ of these components suspends waiting for some data, _all_ of them together will be replaced by the loading indicator:

    <Suspense fallback=>  <Biography />  <Panel>    <Albums />  </Panel></Suspense>

Then, after all of them are ready to be displayed, they will all appear together at once.

In the example below, both `Biography` and `Albums` fetch some data. However, because they are grouped under a single Suspense boundary, these components always “pop in” together at the same time.

ArtistPage.jsPanel.js

ArtistPage.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage() {
  return (
    <\>
      <h1\></h1\>
      <Suspense fallback\=\>
        <Biography artistId\= />
        <Panel\>
          <Albums artistId\= />
        </Panel\>
      </Suspense\>
    </\>
  );
}

function Loading() {
  return <h2\>🌀 Loading...</h2\>;
}

Show more

Components that load data don’t have to be direct children of the Suspense boundary. For example, you can move `Biography` and `Albums` into a new `Details` component. This doesn’t change the behavior. `Biography` and `Albums` share the same closest parent Suspense boundary, so their reveal is coordinated together.

    <Suspense fallback=

* * *

### Revealing nested content as it loads[](#revealing-nested-content-as-it-loads "Link for Revealing nested content as it loads ")

When a component suspends, the closest parent Suspense component shows the fallback. This lets you nest multiple Suspense components to create a loading sequence. Each Suspense boundary’s fallback will be filled in as the next level of content becomes available. For example, you can give the album list its own fallback:

    <Suspense fallback=>    <Panel>      <Albums />    </Panel>  </Suspense></Suspense>

With this change, displaying the `Biography` doesn’t need to “wait” for the `Albums` to load.

The sequence will be:

1.  If `Biography` hasn’t loaded yet, `BigSpinner` is shown in place of the entire content area.
2.  Once `Biography` finishes loading, `BigSpinner` is replaced by the content.
3.  If `Albums` hasn’t loaded yet, `AlbumsGlimmer` is shown in place of `Albums` and its parent `Panel`.
4.  Finally, once `Albums` finishes loading, it replaces `AlbumsGlimmer`.

ArtistPage.jsPanel.js

ArtistPage.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Albums from './Albums.js';
import Biography from './Biography.js';
import Panel from './Panel.js';

export default function ArtistPage() {
  return (
    <\>
      <h1\></h1\>
      <Suspense fallback\=\>
        <Biography artistId\= />
        <Suspense fallback\=\>
          <Panel\>
            <Albums artistId\= />
          </Panel\>
        </Suspense\>
      </Suspense\>
    </\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

function AlbumsGlimmer() {
  return (
    <div className\="glimmer-panel"\>
      <div className\="glimmer-line" />
      <div className\="glimmer-line" />
      <div className\="glimmer-line" />
    </div\>
  );
}

Show more

Suspense boundaries let you coordinate which parts of your UI should always “pop in” together at the same time, and which parts should progressively reveal more content in a sequence of loading states. You can add, move, or delete Suspense boundaries in any place in the tree without affecting the rest of your app’s behavior.

Don’t put a Suspense boundary around every component. Suspense boundaries should not be more granular than the loading sequence that you want the user to experience. If you work with a designer, ask them where the loading states should be placed—it’s likely that they’ve already included them in their design wireframes.

* * *

### Showing stale content while fresh content is loading[](#showing-stale-content-while-fresh-content-is-loading "Link for Showing stale content while fresh content is loading ")

In this example, the `SearchResults` component suspends while fetching the search results. Type `"a"`, wait for the results, and then edit it to `"ab"`. The results for `"a"` will get replaced by the loading fallback.

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

A common alternative UI pattern is to _defer_ updating the list and to keep showing the previous results until the new results are ready. The [`useDeferredValue`](useDeferredValue.html) Hook lets you pass a deferred version of the query down:

    export default function App() 

The `query` will update immediately, so the input will display the new value. However, the `deferredQuery` will keep its previous value until the data has loaded, so `SearchResults` will show the stale results for a bit.

To make it more obvious to the user, you can add a visual indication when the stale result list is displayed:

    <div style= /></div>

Enter `"a"` in the example below, wait for the results to load, and then edit the input to `"ab"`. Notice how instead of the Suspense fallback, you now see the dimmed stale result list until the new results have loaded:

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
        <div style\=\>
          <SearchResults query\= />
        </div\>
      </Suspense\>
    </\>
  );
}

Show more

### Note

Both deferred values and [transitions](#preventing-already-revealed-content-from-hiding) let you avoid showing Suspense fallback in favor of inline indicators. Transitions mark the whole update as non-urgent so they are typically used by frameworks and router libraries for navigation. Deferred values, on the other hand, are mostly useful in application code where you want to mark a part of UI as non-urgent and let it “lag behind” the rest of the UI.

* * *

### Preventing already revealed content from hiding[](#preventing-already-revealed-content-from-hiding "Link for Preventing already revealed content from hiding ")

When a component suspends, the closest parent Suspense boundary switches to showing the fallback. This can lead to a jarring user experience if it was already displaying some content. Try pressing this button:

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

  function navigate(url) {
    setPage(url);
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
    <Layout\>
      
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

Show more

When you pressed the button, the `Router` component rendered `ArtistPage` instead of `IndexPage`. A component inside `ArtistPage` suspended, so the closest Suspense boundary started showing the fallback. The closest Suspense boundary was near the root, so the whole site layout got replaced by `BigSpinner`.

To prevent this, you can mark the navigation state update as a _transition_ with [`startTransition`:](startTransition.html)

    function Router()   // ...

This tells React that the state transition is not urgent, and it’s better to keep showing the previous page instead of hiding any already revealed content. Now clicking the button “waits” for the `Biography` to load:

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
    <Layout\>
      
    </Layout\>
  );
}

function BigSpinner() {
  return <h2\>🌀 Loading...</h2\>;
}

Show more

A transition doesn’t wait for _all_ content to load. It only waits long enough to avoid hiding already revealed content. For example, the website `Layout` was already revealed, so it would be bad to hide it behind a loading spinner. However, the nested `Suspense` boundary around `Albums` is new, so the transition doesn’t wait for it.

### Note

Suspense-enabled routers are expected to wrap the navigation updates into transitions by default.

* * *

### Indicating that a transition is happening[](#indicating-that-a-transition-is-happening "Link for Indicating that a transition is happening ")

In the above example, once you click the button, there is no visual indication that a navigation is in progress. To add an indicator, you can replace [`startTransition`](startTransition.html) with [`useTransition`](useTransition.html) which gives you a boolean `isPending` value. In the example below, it’s used to change the website header styling while a transition is happening:

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

* * *

### Resetting Suspense boundaries on navigation[](#resetting-suspense-boundaries-on-navigation "Link for Resetting Suspense boundaries on navigation ")

During a transition, React will avoid hiding already revealed content. However, if you navigate to a route with different parameters, you might want to tell React it is _different_ content. You can express this with a `key`:

    <ProfilePage key= />

Imagine you’re navigating within a user’s profile page, and something suspends. If that update is wrapped in a transition, it will not trigger the fallback for already visible content. That’s the expected behavior.

However, now imagine you’re navigating between two different user profiles. In that case, it makes sense to show the fallback. For example, one user’s timeline is _different content_ from another user’s timeline. By specifying a `key`, you ensure that React treats different users’ profiles as different components, and resets the Suspense boundaries during navigation. Suspense-integrated routers should do this automatically.

* * *

### Providing a fallback for server errors and server-only content[](#providing-a-fallback-for-server-errors-and-server-only-content "Link for Providing a fallback for server errors and server-only content ")

If you use one of the [streaming server rendering APIs](../react-dom/server.html) (or a framework that relies on them), React will also use your `<Suspense>` boundaries to handle errors on the server. If a component throws an error on the server, React will not abort the server render. Instead, it will find the closest `<Suspense>` component above it and include its fallback (such as a spinner) into the generated server HTML. The user will see a spinner at first.

On the client, React will attempt to render the same component again. If it errors on the client too, React will throw the error and display the closest [error boundary.](Component.html#static-getderivedstatefromerror) However, if it does not error on the client, React will not display the error to the user since the content was eventually displayed successfully.

You can use this to opt out some components from rendering on the server. To do this, throw an error in the server environment and then wrap them in a `<Suspense>` boundary to replace their HTML with fallbacks:

    <Suspense fallback=

The server HTML will include the loading indicator. It will be replaced by the `Chat` component on the client.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### How do I prevent the UI from being replaced by a fallback during an update?[](#preventing-unwanted-fallbacks "Link for How do I prevent the UI from being replaced by a fallback during an update? ")

Replacing visible UI with a fallback creates a jarring user experience. This can happen when an update causes a component to suspend, and the nearest Suspense boundary is already showing content to the user.

To prevent this from happening, [mark the update as non-urgent using `startTransition`](#preventing-already-revealed-content-from-hiding). During a transition, React will wait until enough data has loaded to prevent an unwanted fallback from appearing:

    function handleNextPageClick() 

This will avoid hiding existing content. However, any newly rendered `Suspense` boundaries will still immediately display fallbacks to avoid blocking the UI and let the user see the content as it becomes available.

**React will only prevent unwanted fallbacks during non-urgent updates**. It will not delay a render if it’s the result of an urgent update. You must opt in with an API like [`startTransition`](startTransition.html) or [`useDeferredValue`](useDeferredValue.html).

If your router is integrated with Suspense, it should wrap its updates into [`startTransition`](startTransition.html) automatically.

[Previous<StrictMode>](StrictMode.html)[NextAPIs](apis.html)

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
*   [`<Suspense>`](#suspense)
*   [Usage](#usage)
*   [Displaying a fallback while content is loading](#displaying-a-fallback-while-content-is-loading)
*   [Revealing content together at once](#revealing-content-together-at-once)
*   [Revealing nested content as it loads](#revealing-nested-content-as-it-loads)
*   [Showing stale content while fresh content is loading](#showing-stale-content-while-fresh-content-is-loading)
*   [Preventing already revealed content from hiding](#preventing-already-revealed-content-from-hiding)
*   [Indicating that a transition is happening](#indicating-that-a-transition-is-happening)
*   [Resetting Suspense boundaries on navigation](#resetting-suspense-boundaries-on-navigation)
*   [Providing a fallback for server errors and server-only content](#providing-a-fallback-for-server-errors-and-server-only-content)
*   [Troubleshooting](#troubleshooting)
*   [How do I prevent the UI from being replaced by a fallback during an update?](#preventing-unwanted-fallbacks)

