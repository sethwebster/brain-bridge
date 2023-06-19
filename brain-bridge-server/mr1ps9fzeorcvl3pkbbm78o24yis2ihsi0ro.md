useRef – React

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

useRef[](#undefined "Link for this heading")
============================================

`useRef` is a React Hook that lets you reference a value that’s not needed for rendering.

    const ref = useRef(initialValue)

*   [Reference](#reference)
    *   [`useRef(initialValue)`](#useref)
*   [Usage](#usage)
    *   [Referencing a value with a ref](#referencing-a-value-with-a-ref)
    *   [Manipulating the DOM with a ref](#manipulating-the-dom-with-a-ref)
    *   [Avoiding recreating the ref contents](#avoiding-recreating-the-ref-contents)
*   [Troubleshooting](#troubleshooting)
    *   [I can’t get a ref to a custom component](#i-cant-get-a-ref-to-a-custom-component)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useRef(initialValue)`[](#useref "Link for this heading")

Call `useRef` at the top level of your component to declare a [ref.](../../learn/referencing-values-with-refs.html)

    import  from 'react';function MyComponent() {  const intervalRef = useRef(0);  const inputRef = useRef(null);  // ...

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `initialValue`: The value you want the ref object’s `current` property to be initially. It can be a value of any type. This argument is ignored after the initial render.

#### Returns[](#returns "Link for Returns ")

`useRef` returns an object with a single property:

*   `current`: Initially, it’s set to the `initialValue` you have passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.

On the next renders, `useRef` will return the same object.

#### Caveats[](#caveats "Link for Caveats ")

*   You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn’t mutate that object.
*   When you change the `ref.current` property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.
*   Do not write _or read_ `ref.current` during rendering, except for [initialization.](#avoiding-recreating-the-ref-contents) This makes your component’s behavior unpredictable.
*   In Strict Mode, React will **call your component function twice** in order to [help you find accidental impurities.](#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. Each ref object will be created twice, but one of the versions will be discarded. If your component function is pure (as it should be), this should not affect the behavior.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Referencing a value with a ref[](#referencing-a-value-with-a-ref "Link for Referencing a value with a ref ")

Call `useRef` at the top level of your component to declare one or more [refs.](../../learn/referencing-values-with-refs.html)

    import  from 'react';function Stopwatch() {  const intervalRef = useRef(0);  // ...

`useRef` returns a ref object with a single `current` property initially set to the initial value you provided.

On the next renders, `useRef` will return the same object. You can change its `current` property to store information and read it later. This might remind you of [state](useState.html), but there is an important difference.

**Changing a ref does not trigger a re-render.** This means refs are perfect for storing information that doesn’t affect the visual output of your component. For example, if you need to store an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its `current` property:

    function handleStartClick() 

Later, you can read that interval ID from the ref so that you can call [clear that interval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):

    function handleStopClick() 

By using a ref, you ensure that:

*   You can **store information** between re-renders (unlike regular variables, which reset on every render).
*   Changing it **does not trigger a re-render** (unlike state variables, which trigger a re-render).
*   The **information is local** to each copy of your component (unlike the variables outside, which are shared).

Changing a ref does not trigger a re-render, so refs are not appropriate for storing information you want to display on the screen. Use state for that instead. Read more about [choosing between `useRef` and `useState`.](../../learn/referencing-values-with-refs.html#differences-between-refs-and-state)

#### Examples of referencing a value with useRef[](#examples-value "Link for Examples of referencing a value with useRef")

1. Click counter 2. A stopwatch

#### 

Example 1 of 2:

Click counter[](#click-counter "Link for this heading")

This component uses a ref to keep track of how many times the button was clicked. Note that it’s okay to use a ref instead of state here because the click count is only read and written in an event handler.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick\=\>
      Click me!
    </button\>
  );
}

Show more

If you show `` in the JSX, the number won’t update on click. This is because setting `ref.current` does not trigger a re-render. Information that’s used for rendering should be state instead.

Next Example

### Pitfall

**Do not write _or read_ `ref.current` during rendering.**

React expects that the body of your component [behaves like a pure function](../../learn/keeping-components-pure.html):

*   If the inputs ([props](../../learn/passing-props-to-a-component.html), [state](../../learn/state-a-components-memory.html), and [context](../../learn/passing-data-deeply-with-context.html)) are the same, it should return exactly the same JSX.
*   Calling it in a different order or with different arguments should not affect the results of other calls.

Reading or writing a ref **during rendering** breaks these expectations.

    function MyComponent() 

You can read or write refs **from event handlers or effects instead**.

    function MyComponent() 

If you _have to_ read [or write](useState.html#storing-information-from-previous-renders) something during rendering, [use state](useState.html) instead.

When you break these rules, your component might still work, but most of the newer features we’re adding to React will rely on these expectations. Read more about [keeping your components pure.](../../learn/keeping-components-pure.html#where-you-can-cause-side-effects)

* * *

### Manipulating the DOM with a ref[](#manipulating-the-dom-with-a-ref "Link for Manipulating the DOM with a ref ")

It’s particularly common to use a ref to manipulate the [DOM.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) React has built-in support for this.

First, declare a ref object with an initial value of `null`:

    import  from 'react';function MyComponent() {  const inputRef = useRef(null);  // ...

Then pass your ref object as the `ref` attribute to the JSX of the DOM node you want to manipulate:

      // ...  return <input ref= />;

After React creates the DOM node and puts it on the screen, React will set the `current` property of your ref object to that DOM node. Now you can access the `<input>`’s DOM node and call methods like [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):

      function handleClick() 

React will set the `current` property back to `null` when the node is removed from the screen.

Read more about [manipulating the DOM with refs.](../../learn/manipulating-the-dom-with-refs.html)

#### Examples of manipulating the DOM with useRef[](#examples-dom "Link for Examples of manipulating the DOM with useRef")

1. Focusing a text input 2. Scrolling an image into view 3. Playing and pausing a video 4. Exposing a ref to your own component

#### 

Example 1 of 4:

Focusing a text input[](#focusing-a-text-input "Link for this heading")

In this example, clicking the button will focus the input:

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

Next Example

* * *

### Avoiding recreating the ref contents[](#avoiding-recreating-the-ref-contents "Link for Avoiding recreating the ref contents ")

React saves the initial ref value once and ignores it on the next renders.

    function Video() {  const playerRef = useRef(new VideoPlayer());  // ...

Although the result of `new VideoPlayer()` is only used for the initial render, you’re still calling this function on every render. This can be wasteful if it’s creating expensive objects.

To solve it, you may initialize the ref like this instead:

    function Video()   // ...

Normally, writing or reading `ref.current` during render is not allowed. However, it’s fine in this case because the result is always the same, and the condition only executes during initialization so it’s fully predictable.

##### Deep Dive

#### How to avoid null checks when initializing useRef later[](#how-to-avoid-null-checks-when-initializing-use-ref-later "Link for How to avoid null checks when initializing useRef later ")

Show Details

If you use a type checker and don’t want to always check for `null`, you can try a pattern like this instead:

    function Video()   // ...

Here, the `playerRef` itself is nullable. However, you should be able to convince your type checker that there is no case in which `getPlayer()` returns `null`. Then use `getPlayer()` in your event handlers.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I can’t get a ref to a custom component[](#i-cant-get-a-ref-to-a-custom-component "Link for I can’t get a ref to a custom component ")

If you try to pass a `ref` to your own component like this:

    const inputRef = useRef(null);return <MyInput ref= />;

You might get an error in the console:

Console

Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

By default, your own components don’t expose refs to the DOM nodes inside them.

To fix this, find the component that you want to get a ref to:

    export default function MyInput(

And then wrap it in [`forwardRef`](forwardRef.html) like this:

    import );export default MyInput;

Then the parent component can get a ref to it.

Read more about [accessing another component’s DOM nodes.](../../learn/manipulating-the-dom-with-refs.html#accessing-another-components-dom-nodes)

[PrevioususeReducer](useReducer.html)[NextuseState](useState.html)

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
*   [`useRef(initialValue)`](#useref)
*   [Usage](#usage)
*   [Referencing a value with a ref](#referencing-a-value-with-a-ref)
*   [Manipulating the DOM with a ref](#manipulating-the-dom-with-a-ref)
*   [Avoiding recreating the ref contents](#avoiding-recreating-the-ref-contents)
*   [Troubleshooting](#troubleshooting)
*   [I can’t get a ref to a custom component](#i-cant-get-a-ref-to-a-custom-component)

