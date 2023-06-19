isValidElement – React

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

[Legacy React APIs](legacy.html)

isValidElement[](#undefined "Link for this heading")
====================================================

`isValidElement` checks whether a value is a React element.

    const isElement = isValidElement(value)

*   [Reference](#reference)
    *   [`isValidElement(value)`](#isvalidelement)
*   [Usage](#usage)
    *   [Checking if something is a React element](#checking-if-something-is-a-react-element)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `isValidElement(value)`[](#isvalidelement "Link for this heading")

Call `isValidElement(value)` to check whether `value` is a React element.

    import )); // false

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `value`: The `value` you want to check. It can be any a value of any type.

#### Returns[](#returns "Link for Returns ")

`isValidElement` returns `true` if the `value` is a React element. Otherwise, it returns `false`.

#### Caveats[](#caveats "Link for Caveats ")

*   **Only [JSX tags](../../learn/writing-markup-with-jsx.html) and objects returned by [`createElement`](createElement.html) are considered to be React elements.** For example, even though a number like `42` is a valid React _node_ (and can be returned from a component), it is not a valid React element. Arrays and portals created with [`createPortal`](../react-dom/createPortal.html) are also _not_ considered to be React elements.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Checking if something is a React element[](#checking-if-something-is-a-react-element "Link for Checking if something is a React element ")

Call `isValidElement` to check if some value is a _React element._

React elements are:

*   Values produced by writing a [JSX tag](../../learn/writing-markup-with-jsx.html)
*   Values produced by calling [`createElement`](createElement.html)

For React elements, `isValidElement` returns `true`:

    import  from 'react';// ✅ JSX tags are React elementsconsole.log(isValidElement(<p />)); // trueconsole.log(isValidElement(<MyComponent />)); // true// ✅ Values returned by createElement are React elementsconsole.log(isValidElement(createElement('p'))); // trueconsole.log(isValidElement(createElement(MyComponent))); // true

Any other values, such as strings, numbers, or arbitrary objects and arrays, are not React elements.

For them, `isValidElement` returns `false`:

    // ❌ These are *not* React elementsconsole.log(isValidElement(null)); // falseconsole.log(isValidElement(25)); // falseconsole.log(isValidElement('Hello')); // falseconsole.log(isValidElement()); // falseconsole.log(isValidElement([<div />, <div />])); // falseconsole.log(isValidElement(MyComponent)); // false

It is very uncommon to need `isValidElement`. It’s mostly useful if you’re calling another API that _only_ accepts elements (like [`cloneElement`](cloneElement.html) does) and you want to avoid an error when your argument is not a React element.

Unless you have some very specific reason to add an `isValidElement` check, you probably don’t need it.

##### Deep Dive

#### React elements vs React nodes[](#react-elements-vs-react-nodes "Link for React elements vs React nodes ")

Show Details

When you write a component, you can return any kind of _React node_ from it:

    function MyComponent() 

A React node can be:

*   A React element created like `<div />` or `createElement('div')`
*   A portal created with [`createPortal`](../react-dom/createPortal.html)
*   A string
*   A number
*   `true`, `false`, `null`, or `undefined` (which are not displayed)
*   An array of other React nodes

**Note `isValidElement` checks whether the argument is a _React element,_ not whether it’s a React node.** For example, `42` is not a valid React element. However, it is a perfectly valid React node:

    function MyComponent() 

This is why you shouldn’t use `isValidElement` as a way to check whether something can be rendered.

[PreviouscreateRef](createRef.html)[NextPureComponent](PureComponent.html)

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
*   [`isValidElement(value)`](#isvalidelement)
*   [Usage](#usage)
*   [Checking if something is a React element](#checking-if-something-is-a-react-element)

