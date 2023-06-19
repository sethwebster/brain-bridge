Built-in React Hooks – React

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

Built-in React Hooks[](#undefined "Link for this heading")
==========================================================

_Hooks_ let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React.

* * *

State Hooks[](#state-hooks "Link for State Hooks ")
---------------------------------------------------

_State_ lets a component [“remember” information like user input.](../learn/state-a-components-memory.html) For example, a form component can use state to store the input value, while an image gallery component can use state to store the selected image index.

To add state to a component, use one of these Hooks:

*   [`useState`](react/useState.html) declares a state variable that you can update directly.
*   [`useReducer`](react/useReducer.html) declares a state variable with the update logic inside a [reducer function.](../learn/extracting-state-logic-into-a-reducer.html)

    function ImageGallery() {  const [index, setIndex] = useState(0);  // ...

* * *

Context Hooks[](#context-hooks "Link for Context Hooks ")
---------------------------------------------------------

_Context_ lets a component [receive information from distant parents without passing it as props.](../learn/passing-props-to-a-component.html) For example, your app’s top-level component can pass the current UI theme to all components below, no matter how deep.

*   [`useContext`](react/useContext.html) reads and subscribes to a context.

    function Button() {  const theme = useContext(ThemeContext);  // ...

* * *

Ref Hooks[](#ref-hooks "Link for Ref Hooks ")
---------------------------------------------

_Refs_ let a component [hold some information that isn’t used for rendering,](../learn/referencing-values-with-refs.html) like a DOM node or a timeout ID. Unlike with state, updating a ref does not re-render your component. Refs are an “escape hatch” from the React paradigm. They are useful when you need to work with non-React systems, such as the built-in browser APIs.

*   [`useRef`](react/useRef.html) declares a ref. You can hold any value in it, but most often it’s used to hold a DOM node.
*   [`useImperativeHandle`](react/useImperativeHandle.html) lets you customize the ref exposed by your component. This is rarely used.

    function Form() {  const inputRef = useRef(null);  // ...

* * *

Effect Hooks[](#effect-hooks "Link for Effect Hooks ")
------------------------------------------------------

_Effects_ let a component [connect to and synchronize with external systems.](../learn/synchronizing-with-effects.html) This includes dealing with network, browser DOM, animations, widgets written using a different UI library, and other non-React code.

*   [`useEffect`](react/useEffect.html) connects a component to an external system.

    function ChatRoom(, [roomId]);  // ...

Effects are an “escape hatch” from the React paradigm. Don’t use Effects to orchestrate the data flow of your application. If you’re not interacting with an external system, [you might not need an Effect.](../learn/you-might-not-need-an-effect.html)

There are two rarely used variations of `useEffect` with differences in timing:

*   [`useLayoutEffect`](react/useLayoutEffect.html) fires before the browser repaints the screen. You can measure layout here.
*   [`useInsertionEffect`](react/useInsertionEffect.html) fires before React makes changes to the DOM. Libraries can insert dynamic CSS here.

* * *

Performance Hooks[](#performance-hooks "Link for Performance Hooks ")
---------------------------------------------------------------------

A common way to optimize re-rendering performance is to skip unnecessary work. For example, you can tell React to reuse a cached calculation or to skip a re-render if the data has not changed since the previous render.

To skip calculations and unnecessary re-rendering, use one of these Hooks:

*   [`useMemo`](react/useMemo.html) lets you cache the result of an expensive calculation.
*   [`useCallback`](react/useCallback.html) lets you cache a function definition before passing it down to an optimized component.

    function TodoList(

Sometimes, you can’t skip re-rendering because the screen actually needs to update. In that case, you can improve performance by separating blocking updates that must be synchronous (like typing into an input) from non-blocking updates which don’t need to block the user interface (like updating a chart).

To prioritize rendering, use one of these Hooks:

*   [`useTransition`](react/useTransition.html) lets you mark a state transition as non-blocking and allow other updates to interrupt it.
*   [`useDeferredValue`](react/useDeferredValue.html) lets you defer updating a non-critical part of the UI and let other parts update first.

* * *

Other Hooks[](#other-hooks "Link for Other Hooks ")
---------------------------------------------------

These Hooks are mostly useful to library authors and aren’t commonly used in the application code.

*   [`useDebugValue`](react/useDebugValue.html) lets you customize the label React DevTools displays for your custom Hook.
*   [`useId`](react/useId.html) lets a component associate a unique ID with itself. Typically used with accessibility APIs.
*   [`useSyncExternalStore`](react/useSyncExternalStore.html) lets a component subscribe to an external store.

* * *

Your own Hooks[](#your-own-hooks "Link for Your own Hooks ")
------------------------------------------------------------

You can also [define your own custom Hooks](../learn/reusing-logic-with-custom-hooks.html#extracting-your-own-custom-hook-from-a-component) as JavaScript functions.

[NextuseCallback](react/useCallback.html)

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
*   [State Hooks](#state-hooks)
*   [Context Hooks](#context-hooks)
*   [Ref Hooks](#ref-hooks)
*   [Effect Hooks](#effect-hooks)
*   [Performance Hooks](#performance-hooks)
*   [Other Hooks](#other-hooks)
*   [Your own Hooks](#your-own-hooks)

