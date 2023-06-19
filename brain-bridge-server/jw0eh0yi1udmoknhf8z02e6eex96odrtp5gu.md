useInsertionEffect – React

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

useInsertionEffect[](#undefined "Link for this heading")
========================================================

### Pitfall

`useInsertionEffect` is for CSS-in-JS library authors. Unless you are working on a CSS-in-JS library and need a place to inject the styles, you probably want [`useEffect`](useEffect.html) or [`useLayoutEffect`](useLayoutEffect.html) instead.

`useInsertionEffect` is a version of [`useEffect`](useEffect.html) that fires before any DOM mutations.

    useInsertionEffect(setup, dependencies?)

*   [Reference](#reference)
    *   [`useInsertionEffect(setup, dependencies?)`](#useinsertioneffect)
*   [Usage](#usage)
    *   [Injecting dynamic styles from CSS-in-JS libraries](#injecting-dynamic-styles-from-css-in-js-libraries)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useInsertionEffect(setup, dependencies?)`[](#useinsertioneffect "Link for this heading")

Call `useInsertionEffect` to insert the styles before any DOM mutations:

    import 

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `setup`: The function with your Effect’s logic. Your setup function may also optionally return a _cleanup_ function. Before your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function.
    
*   **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](../../learn/editor-setup.html#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm. If you don’t specify the dependencies at all, your Effect will re-run after every re-render of the component.
    

#### Returns[](#returns "Link for Returns ")

`useInsertionEffect` returns `undefined`.

#### Caveats[](#caveats "Link for Caveats ")

*   Effects only run on the client. They don’t run during server rendering.
*   You can’t update state from inside `useInsertionEffect`.
*   By the time `useInsertionEffect` runs, refs are not attached yet, and DOM is not yet updated.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Injecting dynamic styles from CSS-in-JS libraries[](#injecting-dynamic-styles-from-css-in-js-libraries "Link for Injecting dynamic styles from CSS-in-JS libraries ")

Traditionally, you would style React components using plain CSS.

    // In your JS file:<button className="success" />// In your CSS file:.success 

Some teams prefer to author styles directly in JavaScript code instead of writing CSS files. This usually requires using a CSS-in-JS library or a tool. There are three common approaches to CSS-in-JS:

1.  Static extraction to CSS files with a compiler
2.  Inline styles, e.g. `<div style=>`
3.  Runtime injection of `<style>` tags

If you use CSS-in-JS, we recommend a combination of the first two approaches (CSS files for static styles, inline styles for dynamic styles). **We don’t recommend runtime `<style>` tag injection for two reasons:**

1.  Runtime injection forces the browser to recalculate the styles a lot more often.
2.  Runtime injection can be very slow if it happens at the wrong time in the React lifecycle.

The first problem is not solvable, but `useInsertionEffect` helps you solve the second problem.

Call `useInsertionEffect` to insert the styles before any DOM mutations:

    // Inside your CSS-in-JS librarylet isInserted = new Set();function useCSS(rule) 

Similarly to `useEffect`, `useInsertionEffect` does not run on the server. If you need to collect which CSS rules have been used on the server, you can do it during rendering:

    let collectedRulesSet = new Set();function useCSS(rule) 

[Read more about upgrading CSS-in-JS libraries with runtime injection to `useInsertionEffect`.](https://github.com/reactwg/react-18/discussions/110)

##### Deep Dive

#### How is this better than injecting styles during rendering or useLayoutEffect?[](#how-is-this-better-than-injecting-styles-during-rendering-or-uselayouteffect "Link for How is this better than injecting styles during rendering or useLayoutEffect? ")

Show Details

If you insert styles during rendering and React is processing a [non-blocking update,](useTransition.html#marking-a-state-update-as-a-non-blocking-transition) the browser will recalculate the styles every single frame while rendering a component tree, which can be **extremely slow.**

`useInsertionEffect` is better than inserting styles during [`useLayoutEffect`](useLayoutEffect.html) or [`useEffect`](useEffect.html) because it ensures that by the time other Effects run in your components, the `<style>` tags have already been inserted. Otherwise, layout calculations in regular Effects would be wrong due to outdated styles.

[PrevioususeImperativeHandle](useImperativeHandle.html)[NextuseLayoutEffect](useLayoutEffect.html)

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
*   [`useInsertionEffect(setup, dependencies?)`](#useinsertioneffect)
*   [Usage](#usage)
*   [Injecting dynamic styles from CSS-in-JS libraries](#injecting-dynamic-styles-from-css-in-js-libraries)

