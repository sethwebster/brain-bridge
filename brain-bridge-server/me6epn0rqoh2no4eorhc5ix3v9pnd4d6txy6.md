createRef – React

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

createRef[](#undefined "Link for this heading")
===============================================

### Pitfall

`createRef` is mostly used for [class components.](Component.html) Function components typically rely on [`useRef`](useRef.html) instead.

`createRef` creates a [ref](../../learn/referencing-values-with-refs.html) object which can contain arbitrary value.

    class MyInput extends Component 

*   [Reference](#reference)
    *   [`createRef()`](#createref)
*   [Usage](#usage)
    *   [Declaring a ref in a class component](#declaring-a-ref-in-a-class-component)
*   [Alternatives](#alternatives)
    *   [Migrating from a class with `createRef` to a function with `useRef`](#migrating-from-a-class-with-createref-to-a-function-with-useref)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `createRef()`[](#createref "Link for this heading")

Call `createRef` to declare a [ref](../../learn/referencing-values-with-refs.html) inside a [class component.](Component.html)

    import  from 'react';class MyComponent extends Component {  intervalRef = createRef();  inputRef = createRef();  // ...

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

`createRef` takes no parameters.

#### Returns[](#returns "Link for Returns ")

`createRef` returns an object with a single property:

*   `current`: Initially, it’s set to the `null`. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

#### Caveats[](#caveats "Link for Caveats ")

*   `createRef` always returns a _different_ object. It’s equivalent to writing `` yourself.
*   In a function component, you probably want [`useRef`](useRef.html) instead which always returns the same object.
*   `const ref = useRef()` is equivalent to `const [ref, _] = useState(() => createRef(null))`.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Declaring a ref in a class component[](#declaring-a-ref-in-a-class-component "Link for Declaring a ref in a class component ")

To declare a ref inside a [class component,](Component.html) call `createRef` and assign its result to a class field:

    import 

If you now pass `ref=` to an `<input>` in your JSX, React will populate `this.inputRef.current` with the input DOM node. For example, here is how you make a button that focuses the input:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default class Form extends Component {
  inputRef = createRef();

  handleClick = () \=> {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <\>
        <input ref\= />
        <button onClick\=\>
          Focus the input
        </button\>
      </\>
    );
  }
}

Show more

### Pitfall

`createRef` is mostly used for [class components.](Component.html) Function components typically rely on [`useRef`](useRef.html) instead.

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Migrating from a class with `createRef` to a function with `useRef`[](#migrating-from-a-class-with-createref-to-a-function-with-useref "Link for this heading")

We recommend using function components instead of [class components](Component.html) in new code. If you have some existing class components using `createRef`, here is how you can convert them. This is the original code:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default class Form extends Component {
  inputRef = createRef();

  handleClick = () \=> {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <\>
        <input ref\= />
        <button onClick\=\>
          Focus the input
        </button\>
      </\>
    );
  }
}

Show more

When you [convert this component from a class to a function,](Component.html#alternatives) replace calls to `createRef` with calls to [`useRef`:](useRef.html)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <input ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

[PreviouscreateFactory](createFactory.html)[NextisValidElement](isValidElement.html)

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
*   [`createRef()`](#createref)
*   [Usage](#usage)
*   [Declaring a ref in a class component](#declaring-a-ref-in-a-class-component)
*   [Alternatives](#alternatives)
*   [Migrating from a class with `createRef` to a function with `useRef`](#migrating-from-a-class-with-createref-to-a-function-with-useref)

