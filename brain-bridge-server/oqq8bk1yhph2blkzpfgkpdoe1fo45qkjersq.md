PureComponent – React

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

PureComponent[](#undefined "Link for this heading")
===================================================

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#alternatives)

`PureComponent` is similar to [`Component`](Component.html) but it skips re-renders for same props and state. Class components are still supported by React, but we don’t recommend using them in new code.

    class Greeting extends PureComponent 

*   [Reference](#reference)
    *   [`PureComponent`](#purecomponent)
*   [Usage](#usage)
    *   [Skipping unnecessary re-renders for class components](#skipping-unnecessary-re-renders-for-class-components)
*   [Alternatives](#alternatives)
    *   [Migrating from a `PureComponent` class component to a function](#migrating-from-a-purecomponent-class-component-to-a-function)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `PureComponent`[](#purecomponent "Link for this heading")

To skip re-rendering a class component for same props and state, extend `PureComponent` instead of [`Component`:](Component.html)

    import 

`PureComponent` is a subclass of `Component` and supports [all the `Component` APIs.](Component.html#reference) Extending `PureComponent` is equivalent to defining a custom [`shouldComponentUpdate`](Component.html#shouldcomponentupdate) method that shallowly compares props and state.

[See more examples below.](#usage)

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Skipping unnecessary re-renders for class components[](#skipping-unnecessary-re-renders-for-class-components "Link for Skipping unnecessary re-renders for class components ")

React normally re-renders a component whenever its parent re-renders. As an optimization, you can create a component that React will not re-render when its parent re-renders so long as its new props and state are the same as the old props and state. [Class components](Component.html) can opt into this behavior by extending `PureComponent`:

    class Greeting extends PureComponent 

A React component should always have [pure rendering logic.](../../learn/keeping-components-pure.html) This means that it must return the same output if its props, state, and context haven’t changed. By using `PureComponent`, you are telling React that your component complies with this requirement, so React doesn’t need to re-render as long as its props and state haven’t changed. However, your component will still re-render if a context that it’s using changes.

In this example, notice that the `Greeting` component re-renders whenever `name` is changed (because that’s one of its props), but not when `address` is changed (because it’s not passed to `Greeting` as a prop):

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3\>Hello!</h3\>;
  }
}

export default function MyApp() {
  const \[name, setName\] = useState('');
  const \[address, setAddress\] = useState('');
  return (
    <\>
      <label\>
        Name
        <input value\= />
      </label\>
      <label\>
        Address
        <input value\= />
      </label\>
      <Greeting name\= />
    </\>
  );
}

Show more

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#alternatives)

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Migrating from a `PureComponent` class component to a function[](#migrating-from-a-purecomponent-class-component-to-a-function "Link for this heading")

We recommend using function components instead of [class components](Component.html) in new code. If you have some existing class components using `PureComponent`, here is how you can convert them. This is the original code:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

class Greeting extends PureComponent {
  render() {
    console.log("Greeting was rendered at", new Date().toLocaleTimeString());
    return <h3\>Hello!</h3\>;
  }
}

export default function MyApp() {
  const \[name, setName\] = useState('');
  const \[address, setAddress\] = useState('');
  return (
    <\>
      <label\>
        Name
        <input value\= />
      </label\>
      <label\>
        Address
        <input value\= />
      </label\>
      <Greeting name\= />
    </\>
  );
}

Show more

When you [convert this component from a class to a function,](Component.html#alternatives) wrap it in [`memo`:](memo.html)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const Greeting = memo(function Greeting() {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3\>Hello!</h3\>;
});

export default function MyApp() {
  const \[name, setName\] = useState('');
  const \[address, setAddress\] = useState('');
  return (
    <\>
      <label\>
        Name
        <input value\= />
      </label\>
      <label\>
        Address
        <input value\= />
      </label\>
      <Greeting name\= />
    </\>
  );
}

Show more

### Note

Unlike `PureComponent`, [`memo`](memo.html) does not compare the new and the old state. In function components, calling the [`set` function](useState.html#setstate) with the same state [already prevents re-renders by default,](memo.html#updating-a-memoized-component-using-state) even without `memo`.

[PreviousisValidElement](isValidElement.html)

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
*   [`PureComponent`](#purecomponent)
*   [Usage](#usage)
*   [Skipping unnecessary re-renders for class components](#skipping-unnecessary-re-renders-for-class-components)
*   [Alternatives](#alternatives)
*   [Migrating from a `PureComponent` class component to a function](#migrating-from-a-purecomponent-class-component-to-a-function)

