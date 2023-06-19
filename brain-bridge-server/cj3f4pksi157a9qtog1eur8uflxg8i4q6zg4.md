React DOM APIs – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../index.html)

Search⌘CtrlK

[Learn](../learn.html)

[Reference](react.html)

[Community](../community.html)

[Blog](../blog.html)

[](https://github.com/facebook/react/releases)

### react@18.2.0

*   [Hooks](react.html "Hooks")
    
    *   [useCallback](react/useCallback.html "useCallback")
    *   [useContext](react/useContext.html "useContext")
    *   [useDebugValue](react/useDebugValue.html "useDebugValue")
    *   [useDeferredValue](react/useDeferredValue.html "useDeferredValue")
    *   [useEffect](react/useEffect.html "useEffect")
    *   [useId](react/useId.html "useId")
    *   [useImperativeHandle](react/useImperativeHandle.html "useImperativeHandle")
    *   [useInsertionEffect](react/useInsertionEffect.html "useInsertionEffect")
    *   [useLayoutEffect](react/useLayoutEffect.html "useLayoutEffect")
    *   [useMemo](react/useMemo.html "useMemo")
    *   [useReducer](react/useReducer.html "useReducer")
    *   [useRef](react/useRef.html "useRef")
    *   [useState](react/useState.html "useState")
    *   [useSyncExternalStore](react/useSyncExternalStore.html "useSyncExternalStore")
    *   [useTransition](react/useTransition.html "useTransition")
    
*   [Components](react/components.html "Components")
    
    *   [<Fragment> (<>)](react/Fragment.html "<Fragment> (<>)")
    *   [<Profiler>](react/Profiler.html "<Profiler>")
    *   [<StrictMode>](react/StrictMode.html "<StrictMode>")
    *   [<Suspense>](react/Suspense.html "<Suspense>")
    
*   [APIs](react/apis.html "APIs")
    
    *   [createContext](react/createContext.html "createContext")
    *   [forwardRef](react/forwardRef.html "forwardRef")
    *   [lazy](react/lazy.html "lazy")
    *   [memo](react/memo.html "memo")
    *   [startTransition](react/startTransition.html "startTransition")
    

### react-dom@18.2.0

*   [Components](react-dom/components.html "Components")
    
    *   [Common (e.g. <div>)](react-dom/components/common.html "Common (e.g. <div>)")
    *   [<input>](react-dom/components/input.html "<input>")
    *   [<option>](react-dom/components/option.html "<option>")
    *   [<progress>](react-dom/components/progress.html "<progress>")
    *   [<select>](react-dom/components/select.html "<select>")
    *   [<textarea>](react-dom/components/textarea.html "<textarea>")
    
*   [APIs](react-dom.html "APIs")
    
    *   [createPortal](react-dom/createPortal.html "createPortal")
    *   [flushSync](react-dom/flushSync.html "flushSync")
    *   [findDOMNode](react-dom/findDOMNode.html "findDOMNode")
    *   [hydrate](react-dom/hydrate.html "hydrate")
    *   [render](react-dom/render.html "render")
    *   [unmountComponentAtNode](react-dom/unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](react-dom/client.html "Client APIs")
    
    *   [createRoot](react-dom/client/createRoot.html "createRoot")
    *   [hydrateRoot](react-dom/client/hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](react-dom/server.html "Server APIs")
    
    *   [renderToNodeStream](react-dom/server/renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](react-dom/server/renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](react-dom/server/renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](react-dom/server/renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](react-dom/server/renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](react-dom/server/renderToString.html "renderToString")
    

### Legacy APIs

*   [Legacy React APIs](react/legacy.html "Legacy React APIs")
    
    *   [Children](react/Children.html "Children")
    *   [cloneElement](react/cloneElement.html "cloneElement")
    *   [Component](react/Component.html "Component")
    *   [createElement](react/createElement.html "createElement")
    *   [createFactory](react/createFactory.html "createFactory")
    *   [createRef](react/createRef.html "createRef")
    *   [isValidElement](react/isValidElement.html "isValidElement")
    *   [PureComponent](react/PureComponent.html "PureComponent")
    

Is this page useful?

[API Reference](react.html)

React DOM APIs[](#undefined "Link for this heading")
====================================================

The `react-dom` package contains methods that are only supported for the web applications (which run in the browser DOM environment). They are not supported for React Native.

* * *

APIs[](#apis "Link for APIs ")
------------------------------

These APIs can be imported from your components. They are rarely used:

*   [`createPortal`](react-dom/createPortal.html) lets you render child components in a different part of the DOM tree.
*   [`flushSync`](react-dom/flushSync.html) lets you force React to flush a state update and update the DOM synchronously.

* * *

Entry points[](#entry-points "Link for Entry points ")
------------------------------------------------------

The `react-dom` package provides two additional entry points:

*   [`react-dom/client`](react-dom/client.html) contains APIs to render React components on the client (in the browser).
*   [`react-dom/server`](react-dom/server.html) contains APIs to render React components on the server.

* * *

Deprecated APIs[](#deprecated-apis "Link for Deprecated APIs ")
---------------------------------------------------------------

### Deprecated

These APIs will be removed in a future major version of React.

*   [`findDOMNode`](react-dom/findDOMNode.html) finds the closest DOM node corresponding to a class component instance.
*   [`hydrate`](react-dom/hydrate.html) mounts a tree into the DOM created from server HTML. Deprecated in favor of [`hydrateRoot`](react-dom/client/hydrateRoot.html).
*   [`render`](react-dom/render.html) mounts a tree into the DOM. Deprecated in favor of [`createRoot`](react-dom/client/createRoot.html).
*   [`unmountComponentAtNode`](react-dom/unmountComponentAtNode.html) unmounts a tree from the DOM. Deprecated in favor of [`root.unmount()`.](react-dom/client/createRoot.html#root-unmount)

[Previous<textarea>](react-dom/components/textarea.html)[NextcreatePortal](react-dom/createPortal.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../learn.html)

[Quick Start](../learn.html)

[Installation](../learn/installation.html)

[Describing the UI](../learn/describing-the-ui.html)

[Adding Interactivity](../learn/adding-interactivity.html)

[Managing State](../learn/managing-state.html)

[Escape Hatches](../learn/escape-hatches.html)

[API Reference](react.html)

[React APIs](react.html)

[React DOM APIs](react-dom.html)

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
*   [APIs](#apis)
*   [Entry points](#entry-points)
*   [Deprecated APIs](#deprecated-apis)

