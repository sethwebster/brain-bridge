renderToStaticNodeStream – React

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

renderToStaticNodeStream[](#undefined "Link for this heading")
==============================================================

`renderToStaticNodeStream` renders a non-interactive React tree to a [Node.js Readable Stream.](https://nodejs.org/api/stream.html#readable-streams)

    const stream = renderToStaticNodeStream(reactNode)

*   [Reference](#reference)
    *   [`renderToStaticNodeStream(reactNode)`](#rendertostaticnodestream)
*   [Usage](#usage)
    *   [Rendering a React tree as static HTML to a Node.js Readable Stream](#rendering-a-react-tree-as-static-html-to-a-nodejs-readable-stream)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `renderToStaticNodeStream(reactNode)`[](#rendertostaticnodestream "Link for this heading")

On the server, call `renderToStaticNodeStream` to get a [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams).

    import  from 'react-dom/server';const stream = renderToStaticNodeStream(<Page />);stream.pipe(response);

[See more examples below.](#usage)

The stream will produce non-interactive HTML output of your React components.

#### Parameters[](#parameters "Link for Parameters ")

*   `reactNode`: A React node you want to render to HTML. For example, a JSX element like `<Page />`.

#### Returns[](#returns "Link for Returns ")

A [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams) that outputs an HTML string. The resulting HTML can’t be hydrated on the client.

#### Caveats[](#caveats "Link for Caveats ")

*   `renderToStaticNodeStream` output cannot be hydrated.
    
*   This method will wait for all [Suspense boundaries](../../react/Suspense.html) to complete before returning any output.
    
*   As of React 18, this method buffers all of its output, so it doesn’t actually provide any streaming benefits.
    
*   The returned stream is a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering a React tree as static HTML to a Node.js Readable Stream[](#rendering-a-react-tree-as-static-html-to-a-nodejs-readable-stream "Link for Rendering a React tree as static HTML to a Node.js Readable Stream ")

Call `renderToStaticNodeStream` to get a [Node.js Readable Stream](https://nodejs.org/api/stream.html#readable-streams) which you can pipe to your server response:

    import );

The stream will produce the initial non-interactive HTML output of your React components.

### Pitfall

This method renders **non-interactive HTML that cannot be hydrated.** This is useful if you want to use React as a simple static page generator, or if you’re rendering completely static content like emails.

Interactive apps should use [`renderToPipeableStream`](renderToPipeableStream.html) on the server and [`hydrateRoot`](../client/hydrateRoot.html) on the client.

[PreviousrenderToStaticMarkup](renderToStaticMarkup.html)[NextrenderToString](renderToString.html)

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
*   [`renderToStaticNodeStream(reactNode)`](#rendertostaticnodestream)
*   [Usage](#usage)
*   [Rendering a React tree as static HTML to a Node.js Readable Stream](#rendering-a-react-tree-as-static-html-to-a-nodejs-readable-stream)

