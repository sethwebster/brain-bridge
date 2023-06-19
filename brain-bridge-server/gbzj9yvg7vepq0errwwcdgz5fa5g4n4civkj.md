createContext – React

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

[APIs](apis.html)

createContext[](#undefined "Link for this heading")
===================================================

`createContext` lets you create a [context](../../learn/passing-data-deeply-with-context.html) that components can provide or read.

    const SomeContext = createContext(defaultValue)

*   [Reference](#reference)
    *   [`createContext(defaultValue)`](#createcontext)
    *   [`SomeContext.Provider`](#provider)
    *   [`SomeContext.Consumer`](#consumer)
*   [Usage](#usage)
    *   [Creating context](#creating-context)
    *   [Importing and exporting context from a file](#importing-and-exporting-context-from-a-file)
*   [Troubleshooting](#troubleshooting)
    *   [I can’t find a way to change the context value](#i-cant-find-a-way-to-change-the-context-value)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `createContext(defaultValue)`[](#createcontext "Link for this heading")

Call `createContext` outside of any components to create a context.

    import  from 'react';const ThemeContext = createContext('light');

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `defaultValue`: The value that you want the context to have when there is no matching context provider in the tree above the component that reads context. If you don’t have any meaningful default value, specify `null`. The default value is meant as a “last resort” fallback. It is static and never changes over time.

#### Returns[](#returns "Link for Returns ")

`createContext` returns a context object.

**The context object itself does not hold any information.** It represents _which_ context other components read or provide. Typically, you will use [`SomeContext.Provider`](#provider) in components above to specify the context value, and call [`useContext(SomeContext)`](useContext.html) in components below to read it. The context object has a few properties:

*   `SomeContext.Provider` lets you provide the context value to components.
*   `SomeContext.Consumer` is an alternative and rarely used way to read the context value.

* * *

### `SomeContext.Provider`[](#provider "Link for this heading")

Wrap your components into a context provider to specify the value of this context for all components inside:

    function App() 

#### Props[](#provider-props "Link for Props ")

*   `value`: The value that you want to pass to all the components reading this context inside this provider, no matter how deep. The context value can be of any type. A component calling [`useContext(SomeContext)`](useContext.html) inside of the provider receives the `value` of the innermost corresponding context provider above it.

* * *

### `SomeContext.Consumer`[](#consumer "Link for this heading")

Before `useContext` existed, there was an older way to read context:

    function Button() 

Although this older way still works, but **newly written code should read context with [`useContext()`](useContext.html) instead:**

    function Button() 

#### Props[](#consumer-props "Link for Props ")

*   `children`: A function. React will call the function you pass with the current context value determined by the same algorithm as [`useContext()`](useContext.html) does, and render the result you return from this function. React will also re-run this function and update the UI whenever the context from the parent components changes.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Creating context[](#creating-context "Link for Creating context ")

Context lets components [pass information deep down](../../learn/passing-data-deeply-with-context.html) without explicitly passing props.

Call `createContext` outside any components to create one or more contexts.

    import  from 'react';const ThemeContext = createContext('light');const AuthContext = createContext(null);

`createContext` returns a context object. Components can read context by passing it to [`useContext()`](useContext.html):

    function Button() 

By default, the values they receive will be the default values you have specified when creating the contexts. However, by itself this isn’t useful because the default values never change.

Context is useful because you can **provide other, dynamic values from your components:**

    function App() 

Now the `Page` component and any components inside it, no matter how deep, will “see” the passed context values. If the passed context values change, React will re-render the components reading the context as well.

[Read more about reading and providing context and see examples.](useContext.html)

* * *

### Importing and exporting context from a file[](#importing-and-exporting-context-from-a-file "Link for Importing and exporting context from a file ")

Often, components in different files will need access to the same context. This is why it’s common to declare contexts in a separate file. Then you can use the [`export` statement](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) to make context available for other files:

    // Contexts.jsimport  from 'react';export const ThemeContext = createContext('light');export const AuthContext = createContext(null);

Components declared in other files can then use the [`import`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement to read or provide this context:

    // Button.jsimport 

    // App.jsimport 

This works similar to [importing and exporting components.](../../learn/importing-and-exporting-components.html)

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I can’t find a way to change the context value[](#i-cant-find-a-way-to-change-the-context-value "Link for I can’t find a way to change the context value ")

Code like this specifies the _default_ context value:

    const ThemeContext = createContext('light');

This value never changes. React only uses this value as a fallback if it can’t find a matching provider above.

To make context change over time, [add state and wrap components in a context provider.](useContext.html#updating-data-passed-via-context)

[PreviousAPIs](apis.html)[NextforwardRef](forwardRef.html)

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
*   [`createContext(defaultValue)`](#createcontext)
*   [`SomeContext.Provider`](#provider)
*   [`SomeContext.Consumer`](#consumer)
*   [Usage](#usage)
*   [Creating context](#creating-context)
*   [Importing and exporting context from a file](#importing-and-exporting-context-from-a-file)
*   [Troubleshooting](#troubleshooting)
*   [I can’t find a way to change the context value](#i-cant-find-a-way-to-change-the-context-value)

