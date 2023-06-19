forwardRef – React

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

forwardRef[](#undefined "Link for this heading")
================================================

`forwardRef` lets your component expose a DOM node to parent component with a [ref.](../../learn/manipulating-the-dom-with-refs.html)

    const SomeComponent = forwardRef(render)

*   [Reference](#reference)
    *   [`forwardRef(render)`](#forwardref)
    *   [`render` function](#render-function)
*   [Usage](#usage)
    *   [Exposing a DOM node to the parent component](#exposing-a-dom-node-to-the-parent-component)
    *   [Forwarding a ref through multiple components](#forwarding-a-ref-through-multiple-components)
    *   [Exposing an imperative handle instead of a DOM node](#exposing-an-imperative-handle-instead-of-a-dom-node)
*   [Troubleshooting](#troubleshooting)
    *   [My component is wrapped in `forwardRef`, but the `ref` to it is always `null`](#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `forwardRef(render)`[](#forwardref "Link for this heading")

Call `forwardRef()` to let your component receive a ref and forward it to a child component:

    import );

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `render`: The render function for your component. React calls this function with the props and `ref` that your component received from its parent. The JSX you return will be the output of your component.

#### Returns[](#returns "Link for Returns ")

`forwardRef` returns a React component that you can render in JSX. Unlike React components defined as plain functions, a component returned by `forwardRef` is also able to receive a `ref` prop.

#### Caveats[](#caveats "Link for Caveats ")

*   In Strict Mode, React will **call your render function twice** in order to [help you find accidental impurities.](#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. If your render function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.

* * *

### `render` function[](#render-function "Link for this heading")

`forwardRef` accepts a render function as an argument. React calls this function with `props` and `ref`:

    const MyInput = forwardRef(function MyInput(props, ref) );

#### Parameters[](#render-parameters "Link for Parameters ")

*   `props`: The props passed by the parent component.
    
*   `ref`: The `ref` attribute passed by the parent component. The `ref` can be an object or a function. If the parent component has not passed a ref, it will be `null`. You should either pass the `ref` you receive to another component, or pass it to [`useImperativeHandle`.](useImperativeHandle.html)
    

#### Returns[](#render-returns "Link for Returns ")

`forwardRef` returns a React component that you can render in JSX. Unlike React components defined as plain functions, the component returned by `forwardRef` is able to take a `ref` prop.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Exposing a DOM node to the parent component[](#exposing-a-dom-node-to-the-parent-component "Link for Exposing a DOM node to the parent component ")

By default, each component’s DOM nodes are private. However, sometimes it’s useful to expose a DOM node to the parent—for example, to allow focusing it. To opt in, wrap your component definition into `forwardRef()`:

    import );

You will receive a ref as the second argument after props. Pass it to the DOM node that you want to expose:

    import );

This lets the parent `Form` component access the `<input>` DOM node exposed by `MyInput`:

    function Form() 

This `Form` component [passes a ref](useRef.html#manipulating-the-dom-with-a-ref) to `MyInput`. The `MyInput` component _forwards_ that ref to the `<input>` browser tag. As a result, the `Form` component can access that `<input>` DOM node and call [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on it.

Keep in mind that exposing a ref to the DOM node inside your component makes it harder to change your component’s internals later. You will typically expose DOM nodes from reusable low-level components like buttons or text inputs, but you won’t do it for application-level components like an avatar or a comment.

#### Try out some examples[](#examples "Link for Try out some examples")

1. Focusing a text input 2. Playing and pausing a video

#### 

Example 1 of 2:

Focusing a text input[](#focusing-a-text-input "Link for this heading")

Clicking the button will focus the input. The `Form` component defines a ref and passes it to the `MyInput` component. The `MyInput` component forwards that ref to the browser `<input>`. This lets the `Form` component focus the `<input>`.

App.jsMyInput.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form\>
      <MyInput label\="Enter your name:" ref\= />
      <button type\="button" onClick\=\>
        Edit
      </button\>
    </form\>
  );
}

Show more

Next Example

* * *

### Forwarding a ref through multiple components[](#forwarding-a-ref-through-multiple-components "Link for Forwarding a ref through multiple components ")

Instead of forwarding a `ref` to a DOM node, you can forward it to your own component like `MyInput`:

    const FormField = forwardRef(function FormField(props, ref) );

If that `MyInput` component forwards a ref to its `<input>`, a ref to `FormField` will give you that `<input>`:

    function Form() 

The `Form` component defines a ref and passes it to `FormField`. The `FormField` component forwards that ref to `MyInput`, which forwards it to a browser `<input>` DOM node. This is how `Form` accesses that DOM node.

App.jsFormField.jsMyInput.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import FormField from './FormField.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
  }

  return (
    <form\>
      <FormField label\="Enter your name:" ref\= />
      <button type\="button" onClick\=\>
        Edit
      </button\>
    </form\>
  );
}

Show more

* * *

### Exposing an imperative handle instead of a DOM node[](#exposing-an-imperative-handle-instead-of-a-dom-node "Link for Exposing an imperative handle instead of a DOM node ")

Instead of exposing an entire DOM node, you can expose a custom object, called an _imperative handle,_ with a more constrained set of methods. To do this, you’d need to define a separate ref to hold the DOM node:

    const MyInput = forwardRef(function MyInput(props, ref) );

Pass the `ref` you received to [`useImperativeHandle`](useImperativeHandle.html) and specify the value you want to expose to the `ref`:

    import );

If some component gets a ref to `MyInput`, it will only receive your `` object instead of the DOM node. This lets you limit the information you expose about your DOM node to the minimum.

App.jsMyInput.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import MyInput from './MyInput.js';

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <form\>
      <MyInput label\="Enter your name:" ref\= />
      <button type\="button" onClick\=\>
        Edit
      </button\>
    </form\>
  );
}

Show more

[Read more about using imperative handles.](useImperativeHandle.html)

### Pitfall

**Do not overuse refs.** You should only use refs for _imperative_ behaviors that you can’t express as props: for example, scrolling to a node, focusing a node, triggering an animation, selecting text, and so on.

**If you can express something as a prop, you should not use a ref.** For example, instead of exposing an imperative handle like ` />`. [Effects](../../learn/synchronizing-with-effects.html) can help you expose imperative behaviors via props.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My component is wrapped in `forwardRef`, but the `ref` to it is always `null`[](#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null "Link for this heading")

This usually means that you forgot to actually use the `ref` that you received.

For example, this component doesn’t do anything with its `ref`:

    const MyInput = forwardRef(function MyInput();

To fix it, pass the `ref` down to a DOM node or another component that can accept a ref:

    const MyInput = forwardRef(function MyInput();

The `ref` to `MyInput` could also be `null` if some of the logic is conditional:

    const MyInput = forwardRef(function MyInput();

If `showInput` is `false`, then the ref won’t be forwarded to any node, and a ref to `MyInput` will remain empty. This is particularly easy to miss if the condition is hidden inside another component, like `Panel` in this example:

    const MyInput = forwardRef(function MyInput();

[PreviouscreateContext](createContext.html)[Nextlazy](lazy.html)

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
*   [`forwardRef(render)`](#forwardref)
*   [`render` function](#render-function)
*   [Usage](#usage)
*   [Exposing a DOM node to the parent component](#exposing-a-dom-node-to-the-parent-component)
*   [Forwarding a ref through multiple components](#forwarding-a-ref-through-multiple-components)
*   [Exposing an imperative handle instead of a DOM node](#exposing-an-imperative-handle-instead-of-a-dom-node)
*   [Troubleshooting](#troubleshooting)
*   [My component is wrapped in `forwardRef`, but the `ref` to it is always `null`](#my-component-is-wrapped-in-forwardref-but-the-ref-to-it-is-always-null)

