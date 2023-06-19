renderToString – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../../../index.html)

Search⌘CtrlK

[Learn](../../../learn.html)

[Reference](../../react.html)

[Community](../../../community.html)

[Blog](../../../blog.html)

[](https://github.com/facebook/react/releases)

### react@18.2.0

*   [Hooks](../../react.html "Hooks")
    
    *   [useCallback](../../react/useCallback.html "useCallback")
    *   [useContext](../../react/useContext.html "useContext")
    *   [useDebugValue](../../react/useDebugValue.html "useDebugValue")
    *   [useDeferredValue](../../react/useDeferredValue.html "useDeferredValue")
    *   [useEffect](../../react/useEffect.html "useEffect")
    *   [useId](../../react/useId.html "useId")
    *   [useImperativeHandle](../../react/useImperativeHandle.html "useImperativeHandle")
    *   [useInsertionEffect](../../react/useInsertionEffect.html "useInsertionEffect")
    *   [useLayoutEffect](../../react/useLayoutEffect.html "useLayoutEffect")
    *   [useMemo](../../react/useMemo.html "useMemo")
    *   [useReducer](../../react/useReducer.html "useReducer")
    *   [useRef](../../react/useRef.html "useRef")
    *   [useState](../../react/useState.html "useState")
    *   [useSyncExternalStore](../../react/useSyncExternalStore.html "useSyncExternalStore")
    *   [useTransition](../../react/useTransition.html "useTransition")
    
*   [Components](../../react/components.html "Components")
    
    *   [<Fragment> (<>)](../../react/Fragment.html "<Fragment> (<>)")
    *   [<Profiler>](../../react/Profiler.html "<Profiler>")
    *   [<StrictMode>](../../react/StrictMode.html "<StrictMode>")
    *   [<Suspense>](../../react/Suspense.html "<Suspense>")
    
*   [APIs](../../react/apis.html "APIs")
    
    *   [createContext](../../react/createContext.html "createContext")
    *   [forwardRef](../../react/forwardRef.html "forwardRef")
    *   [lazy](../../react/lazy.html "lazy")
    *   [memo](../../react/memo.html "memo")
    *   [startTransition](../../react/startTransition.html "startTransition")
    

### react-dom@18.2.0

*   [Components](../components.html "Components")
    
    *   [Common (e.g. <div>)](../components/common.html "Common (e.g. <div>)")
    *   [<input>](../components/input.html "<input>")
    *   [<option>](../components/option.html "<option>")
    *   [<progress>](../components/progress.html "<progress>")
    *   [<select>](../components/select.html "<select>")
    *   [<textarea>](../components/textarea.html "<textarea>")
    
*   [APIs](../../react-dom.html "APIs")
    
    *   [createPortal](../createPortal.html "createPortal")
    *   [flushSync](../flushSync.html "flushSync")
    *   [findDOMNode](../findDOMNode.html "findDOMNode")
    *   [hydrate](../hydrate.html "hydrate")
    *   [render](../render.html "render")
    *   [unmountComponentAtNode](../unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](../client.html "Client APIs")
    
    *   [createRoot](../client/createRoot.html "createRoot")
    *   [hydrateRoot](../client/hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](../server.html "Server APIs")
    
    *   [renderToNodeStream](renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](renderToString.html "renderToString")
    

### Legacy APIs

*   [Legacy React APIs](../../react/legacy.html "Legacy React APIs")
    
    *   [Children](../../react/Children.html "Children")
    *   [cloneElement](../../react/cloneElement.html "cloneElement")
    *   [Component](../../react/Component.html "Component")
    *   [createElement](../../react/createElement.html "createElement")
    *   [createFactory](../../react/createFactory.html "createFactory")
    *   [createRef](../../react/createRef.html "createRef")
    *   [isValidElement](../../react/isValidElement.html "isValidElement")
    *   [PureComponent](../../react/PureComponent.html "PureComponent")
    

Is this page useful?

[API Reference](../../react.html)

[Server APIs](../server.html)

renderToString[](#undefined "Link for this heading")
====================================================

### Pitfall

`renderToString` does not support streaming or waiting for data. [See the alternatives.](#alternatives)

`renderToString` renders a React tree to an HTML string.

    const html = renderToString(reactNode)

*   [Reference](#reference)
    *   [`renderToString(reactNode)`](#rendertostring)
*   [Usage](#usage)
    *   [Rendering a React tree as HTML to a string](#rendering-a-react-tree-as-html-to-a-string)
*   [Alternatives](#alternatives)
    *   [Migrating from `renderToString` to a streaming method on the server](#migrating-from-rendertostring-to-a-streaming-method-on-the-server)
    *   [Removing `renderToString` from the client code](#removing-rendertostring-from-the-client-code)
*   [Troubleshooting](#troubleshooting)
    *   [When a component suspends, the HTML always contains a fallback](#when-a-component-suspends-the-html-always-contains-a-fallback)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `renderToString(reactNode)`[](#rendertostring "Link for this heading")

On the server, call `renderToString` to render your app to HTML.

    import  from 'react-dom/server';const html = renderToString(<App />);

On the client, call [`hydrateRoot`](../client/hydrateRoot.html) to make the server-generated HTML interactive.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `reactNode`: A React node you want to render to HTML. For example, a JSX node like `<App />`.

#### Returns[](#returns "Link for Returns ")

An HTML string.

#### Caveats[](#caveats "Link for Caveats ")

*   `renderToString` has limited Suspense support. If a component suspends, `renderToString` immediately sends its fallback as HTML.
    
*   `renderToString` works in the browser, but using it in the client code is [not recommended.](#removing-rendertostring-from-the-client-code)
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering a React tree as HTML to a string[](#rendering-a-react-tree-as-html-to-a-string "Link for Rendering a React tree as HTML to a string ")

Call `renderToString` to render your app to an HTML string which you can send with your server response:

    import );

This will produce the initial non-interactive HTML output of your React components. On the client, you will need to call [`hydrateRoot`](../client/hydrateRoot.html) to _hydrate_ that server-generated HTML and make it interactive.

### Pitfall

`renderToString` does not support streaming or waiting for data. [See the alternatives.](#alternatives)

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Migrating from `renderToString` to a streaming method on the server[](#migrating-from-rendertostring-to-a-streaming-method-on-the-server "Link for this heading")

`renderToString` returns a string immediately, so it does not support streaming or waiting for data.

When possible, we recommend using these fully-featured alternatives:

*   If you use Node.js, use [`renderToPipeableStream`.](renderToPipeableStream.html)
*   If you use Deno or a modern edge runtime with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), use [`renderToReadableStream`.](renderToReadableStream.html)

You can continue using `renderToString` if your server environment does not support streams.

* * *

### Removing `renderToString` from the client code[](#removing-rendertostring-from-the-client-code "Link for this heading")

Sometimes, `renderToString` is used on the client to convert some component to HTML.

    // 🚩 Unnecessary: using renderToString on the clientimport  from 'react-dom/server';const html = renderToString(<MyIcon />);console.log(html); // For example, "<svg>...</svg>"

Importing `react-dom/server` **on the client** unnecessarily increases your bundle size and should be avoided. If you need to render some component to HTML in the browser, use [`createRoot`](../client/createRoot.html) and read HTML from the DOM:

    import );console.log(div.innerHTML); // For example, "<svg>...</svg>"

The [`flushSync`](../flushSync.html) call is necessary so that the DOM is updated before reading its [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### When a component suspends, the HTML always contains a fallback[](#when-a-component-suspends-the-html-always-contains-a-fallback "Link for When a component suspends, the HTML always contains a fallback ")

`renderToString` does not fully support Suspense.

If some component suspends (for example, because it’s defined with [`lazy`](../../react/lazy.html) or fetches data), `renderToString` will not wait for its content to resolve. Instead, `renderToString` will find the closest [`<Suspense>`](../../react/Suspense.html) boundary above it and render its `fallback` prop in the HTML. The content will not appear until the client code loads.

To solve this, use one of the [recommended streaming solutions.](#migrating-from-rendertostring-to-a-streaming-method-on-the-server) They can stream content in chunks as it resolves on the server so that the user sees the page being progressively filled in before the client code loads.

[PreviousrenderToStaticNodeStream](renderToStaticNodeStream.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../../../learn.html)

[Quick Start](../../../learn.html)

[Installation](../../../learn/installation.html)

[Describing the UI](../../../learn/describing-the-ui.html)

[Adding Interactivity](../../../learn/adding-interactivity.html)

[Managing State](../../../learn/managing-state.html)

[Escape Hatches](../../../learn/escape-hatches.html)

[API Reference](../../react.html)

[React APIs](../../react.html)

[React DOM APIs](../../react-dom.html)

[Community](../../../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../../../community/team.html)

[Docs Contributors](../../../community/docs-contributors.html)

[Acknowledgements](../../../community/acknowledgements.html)

More

[Blog](../../../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

On this page
------------

*   [Overview](#)
*   [Reference](#reference)
*   [`renderToString(reactNode)`](#rendertostring)
*   [Usage](#usage)
*   [Rendering a React tree as HTML to a string](#rendering-a-react-tree-as-html-to-a-string)
*   [Alternatives](#alternatives)
*   [Migrating from `renderToString` to a streaming method on the server](#migrating-from-rendertostring-to-a-streaming-method-on-the-server)
*   [Removing `renderToString` from the client code](#removing-rendertostring-from-the-client-code)
*   [Troubleshooting](#troubleshooting)
*   [When a component suspends, the HTML always contains a fallback](#when-a-component-suspends-the-html-always-contains-a-fallback)

