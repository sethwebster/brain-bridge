renderToNodeStream – React

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

renderToNodeStream[](#undefined "Link for this heading")
========================================================

### Deprecated

This API will be removed in a future major version of React. Use [`renderToPipeableStream`](renderToPipeableStream.html) instead.

`renderToNodeStream` renders a React tree to a [Node.js Readable Stream.](https://nodejs.org/api/stream.html#readable-streams)

    const stream = renderToNodeStream(reactNode)

*   [Reference](#reference)
    *   [`renderToNodeStream(reactNode)`](#rendertonodestream)
*   [Usage](#usage)
    *   [Rendering a React tree as HTML to a Node.js Readable Stream](#rendering-a-react-tree-as-html-to-a-nodejs-readable-stream)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `renderToNodeStream(reactNode)`[](#rendertonodestream "Link for this heading")

On the server, call `renderToNodeStream` to get a [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams) which you can pipe into the response.

    import  from 'react-dom/server';const stream = renderToNodeStream(<App />);stream.pipe(response);

On the client, call [`hydrateRoot`](../client/hydrateRoot.html) to make the server-generated HTML interactive.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `reactNode`: A React node you want to render to HTML. For example, a JSX element like `<App />`.

#### Returns[](#returns "Link for Returns ")

A [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams) that outputs an HTML string.

#### Caveats[](#caveats "Link for Caveats ")

*   This method will wait for all [Suspense boundaries](../../react/Suspense.html) to complete before returning any output.
    
*   As of React 18, this method buffers all of its output, so it doesn’t actually provide any streaming benefits. This is why it’s recommended that you migrate to [`renderToPipeableStream`](renderToPipeableStream.html) instead.
    
*   The returned stream is a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering a React tree as HTML to a Node.js Readable Stream[](#rendering-a-react-tree-as-html-to-a-nodejs-readable-stream "Link for Rendering a React tree as HTML to a Node.js Readable Stream ")

Call `renderToNodeStream` to get a [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams) which you can pipe to your server response:

    import );

The stream will produce the initial non-interactive HTML output of your React components. On the client, you will need to call [`hydrateRoot`](../client/hydrateRoot.html) to _hydrate_ that server-generated HTML and make it interactive.

[PreviousServer APIs](../server.html)[NextrenderToPipeableStream](renderToPipeableStream.html)

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
*   [`renderToNodeStream(reactNode)`](#rendertonodestream)
*   [Usage](#usage)
*   [Rendering a React tree as HTML to a Node.js Readable Stream](#rendering-a-react-tree-as-html-to-a-nodejs-readable-stream)

