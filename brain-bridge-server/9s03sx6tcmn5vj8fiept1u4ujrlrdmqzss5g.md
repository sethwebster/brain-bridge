useCallback – React

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

useCallback[](#undefined "Link for this heading")
=================================================

`useCallback` is a React Hook that lets you cache a function definition between re-renders.

    const cachedFn = useCallback(fn, dependencies)

*   [Reference](#reference)
    *   [`useCallback(fn, dependencies)`](#usecallback)
*   [Usage](#usage)
    *   [Skipping re-rendering of components](#skipping-re-rendering-of-components)
    *   [Updating state from a memoized callback](#updating-state-from-a-memoized-callback)
    *   [Preventing an Effect from firing too often](#preventing-an-effect-from-firing-too-often)
    *   [Optimizing a custom Hook](#optimizing-a-custom-hook)
*   [Troubleshooting](#troubleshooting)
    *   [Every time my component renders, `useCallback` returns a different function](#every-time-my-component-renders-usecallback-returns-a-different-function)
    *   [I need to call `useCallback` for each list item in a loop, but it’s not allowed](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useCallback(fn, dependencies)`[](#usecallback "Link for this heading")

Call `useCallback` at the top level of your component to cache a function definition between re-renders:

    import , [productId, referrer]);

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `fn`: The function value that you want to cache. It can take any arguments and return any values. React will return (not call!) your function back to you during the initial render. On next renders, React will give you the same function again if the `dependencies` have not changed since the last render. Otherwise, it will give you the function that you have passed during the current render, and store it in case it can be reused later. React will not call your function. The function is returned to you so you can decide when and whether to call it.
    
*   `dependencies`: The list of all reactive values referenced inside of the `fn` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](../../learn/editor-setup.html#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm.
    

#### Returns[](#returns "Link for Returns ")

On the initial render, `useCallback` returns the `fn` function you have passed.

During subsequent renders, it will either return an already stored `fn` function from the last render (if the dependencies haven’t changed), or return the `fn` function you have passed during this render.

#### Caveats[](#caveats "Link for Caveats ")

*   `useCallback` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   React **will not throw away the cached function unless there is a specific reason to do that.** For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache—for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should match your expectations if you rely on `useCallback` as a performance optimization. Otherwise, a [state variable](useState.html#im-trying-to-set-state-to-a-function-but-it-gets-called-instead) or a [ref](useRef.html#avoiding-recreating-the-ref-contents) may be more appropriate.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Skipping re-rendering of components[](#skipping-re-rendering-of-components "Link for Skipping re-rendering of components ")

When you optimize rendering performance, you will sometimes need to cache the functions that you pass to child components. Let’s first look at the syntax for how to do this, and then see in which cases it’s useful.

To cache a function between re-renders of your component, wrap its definition into the `useCallback` Hook:

    import , [productId, referrer]);  // ...

You need to pass two things to `useCallback`:

1.  A function definition that you want to cache between re-renders.
2.  A list of dependencies including every value within your component that’s used inside your function.

On the initial render, the returned function you’ll get from `useCallback` will be the function you passed.

On the following renders, React will compare the dependencies with the dependencies you passed during the previous render. If none of the dependencies have changed (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useCallback` will return the same function as before. Otherwise, `useCallback` will return the function you passed on _this_ render.

In other words, `useCallback` caches a function between re-renders until its dependencies change.

**Let’s walk through an example to see when this is useful.**

Say you’re passing a `handleSubmit` function down from the `ProductPage` to the `ShippingForm` component:

    function ProductPage( />    </div>  );

You’ve noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<ShippingForm />` from your JSX, it feels fast. This tells you that it’s worth trying to optimize the `ShippingForm` component.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `ProductPage` re-renders with a different `theme`, the `ShippingForm` component _also_ re-renders. This is fine for components that don’t require much calculation to re-render. But if you verified a re-render is slow, you can tell `ShippingForm` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](memo.html)

    import );

**With this change, `ShippingForm` will skip re-rendering if all of its props are the _same_ as on the last render.** This is when caching a function becomes important! Let’s say you defined `handleSubmit` without `useCallback`:

    function ProductPage(

**In JavaScript, a `function () ` object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that `ShippingForm` props will never be the same, and your [`memo`](memo.html) optimization won’t work. This is where `useCallback` comes in handy:

    function ProductPage(

**By wrapping `handleSubmit` in `useCallback`, you ensure that it’s the _same_ function between the re-renders** (until dependencies change). You don’t _have to_ wrap a function in `useCallback` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](memo.html) and this lets it skip re-rendering. There are other reasons you might need `useCallback` which are described further on this page.

### Note

**You should only rely on `useCallback` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `useCallback` back.

##### Deep Dive

#### How is useCallback related to useMemo?[](#how-is-usecallback-related-to-usememo "Link for How is useCallback related to useMemo? ")

Show Details

You will often see [`useMemo`](useMemo.html) alongside `useCallback`. They are both useful when you’re trying to optimize a child component. They let you [memoize](https://en.wikipedia.org/wiki/Memoization) (or, in other words, cache) something you’re passing down:

    import 

The difference is in _what_ they’re letting you cache:

*   **[`useMemo`](useMemo.html) caches the _result_ of calling your function.** In this example, it caches the result of calling `computeRequirements(product)` so that it doesn’t change unless `product` has changed. This lets you pass the `requirements` object down without unnecessarily re-rendering `ShippingForm`. When necessary, React will call the function you’ve passed during rendering to calculate the result.
*   **`useCallback` caches _the function itself._** Unlike `useMemo`, it does not call the function you provide. Instead, it caches the function you provided so that `handleSubmit` _itself_ doesn’t change unless `productId` or `referrer` has changed. This lets you pass the `handleSubmit` function down without unnecessarily re-rendering `ShippingForm`. Your code won’t run until the user submits the form.

If you’re already familiar with [`useMemo`,](useMemo.html) you might find it helpful to think of `useCallback` as this:

    // Simplified implementation (inside React)function useCallback(fn, dependencies) 

[Read more about the difference between `useMemo` and `useCallback`.](useMemo.html#memoizing-a-function)

##### Deep Dive

#### Should you add useCallback everywhere?[](#should-you-add-usecallback-everywhere "Link for Should you add useCallback everywhere? ")

Show Details

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Caching a function with `useCallback` is only valuable in a few cases:

*   You pass it as a prop to a component wrapped in [`memo`.](memo.html) You want to skip re-rendering if the value hasn’t changed. Memoization lets your component re-render only if dependencies changed.
*   The function you’re passing is later used as a dependency of some Hook. For example, another function wrapped in `useCallback` depends on it, or you depend on this function from [`useEffect.`](useEffect.html)

There is no benefit to wrapping a function in `useCallback` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

Note that `useCallback` does not prevent _creating_ the function. You’re always creating a function (and that’s fine!), but React ignores it and gives you back a cached function if nothing changed.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](../../learn/passing-props-to-a-component.html#passing-jsx-as-children) Then, if the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](../../learn/sharing-state-between-components.html) any further than necessary. Don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](../../learn/keeping-components-pure.html) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](../../learn/you-might-not-need-an-effect.html) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](../../learn/removing-effect-dependencies.html) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In long term, we’re researching [doing memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

#### The difference between useCallback and declaring a function directly[](#examples-rerendering "Link for The difference between useCallback and declaring a function directly")

1. Skipping re-rendering with `useCallback` and `memo` 2. Always re-rendering a component

#### 

Example 1 of 2:

Skipping re-rendering with `useCallback` and `memo`[](#skipping-re-rendering-with-usecallback-and-memo "Link for this heading")

In this example, the `ShippingForm` component is **artificially slowed down** so that you can see what happens when a React component you’re rendering is genuinely slow. Try incrementing the counter and toggling the theme.

Incrementing the counter feels slow because it forces the slowed down `ShippingForm` to re-render. That’s expected because the counter has changed, and so you need to reflect the user’s new choice on the screen.

Next, try toggling the theme. **Thanks to `useCallback` together with [`memo`](memo.html), it’s fast despite the artificial slowdown!** `ShippingForm` skipped re-rendering because the `handleSubmit` function has not changed. The `handleSubmit` function has not changed because both `productId` and `referrer` (your `useCallback` dependencies) haven’t changed since last render.

App.jsProductPage.jsShippingForm.js

ProductPage.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import ShippingForm from './ShippingForm.js';

export default function ProductPage() {
  const handleSubmit = useCallback((orderDetails) \=> {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, \[productId, referrer\]);

  return (
    <div className\=\>
      <ShippingForm onSubmit\= />
    </div\>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}

Show more

Next Example

* * *

### Updating state from a memoized callback[](#updating-state-from-a-memoized-callback "Link for Updating state from a memoized callback ")

Sometimes, you might need to update state based on previous state from a memoized callback.

This `handleAddTodo` function specifies `todos` as a dependency because it computes the next todos from it:

    function TodoList() , [todos]);  // ...

You’ll usually want memoized functions to have as few dependencies as possible. When you read some state only to calculate the next state, you can remove that dependency by passing an [updater function](useState.html#updating-state-based-on-the-previous-state) instead:

    function TodoList() , []); // ✅ No need for the todos dependency  // ...

Here, instead of making `todos` a dependency and reading it inside, you pass an instruction about _how_ to update the state (`todos => [...todos, newTodo]`) to React. [Read more about updater functions.](useState.html#updating-state-based-on-the-previous-state)

* * *

### Preventing an Effect from firing too often[](#preventing-an-effect-from-firing-too-often "Link for Preventing an Effect from firing too often ")

Sometimes, you might want to call a function from inside an [Effect:](../../learn/synchronizing-with-effects.html)

    function ChatRoom(  useEffect(() => {    const options = createOptions();    const connection = createConnection();    connection.connect();    // ...

This creates a problem. [Every reactive value must be declared as a dependency of your Effect.](../../learn/lifecycle-of-reactive-effects.html#react-verifies-that-you-specified-every-reactive-value-as-a-dependency) However, if you declare `createOptions` as a dependency, it will cause your Effect to constantly reconnect to the chat room:

      useEffect(() => , [createOptions]); // 🔴 Problem: This dependency changes on every render  // ...

To solve this, you can wrap the function you need to call from an Effect into `useCallback`:

    function ChatRoom(, [createOptions]); // ✅ Only changes when createOptions changes  // ...

This ensures that the `createOptions` function is the same between re-renders if the `roomId` is the same. **However, it’s even better to remove the need for a function dependency.** Move your function _inside_ the Effect:

    function ChatRoom(, [roomId]); // ✅ Only changes when roomId changes  // ...

Now your code is simpler and doesn’t need `useCallback`. [Learn more about removing Effect dependencies.](../../learn/removing-effect-dependencies.html#move-dynamic-objects-and-functions-inside-your-effect)

* * *

### Optimizing a custom Hook[](#optimizing-a-custom-hook "Link for Optimizing a custom Hook ")

If you’re writing a [custom Hook,](../../learn/reusing-logic-with-custom-hooks.html) it’s recommended to wrap any functions that it returns into `useCallback`:

    function useRouter() 

This ensures that the consumers of your Hook can optimize their own code when needed.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### Every time my component renders, `useCallback` returns a different function[](#every-time-my-component-renders-usecallback-returns-a-different-function "Link for this heading")

Make sure you’ve specified the dependency array as a second argument!

If you forget the dependency array, `useCallback` will return a new function every time:

    function ProductPage(); // 🔴 Returns a new function every time: no dependency array  // ...

This is the corrected version passing the dependency array as a second argument:

    function ProductPage(, [productId, referrer]); // ✅ Does not return a new function unnecessarily  // ...

If this doesn’t help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:

      const handleSubmit = useCallback((orderDetails) => , [productId, referrer]);  console.log([productId, referrer]);

You can then right-click on the arrays from different re-renders in the console and select “Store as a global variable” for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:

    Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...

When you find which dependency is breaking memoization, either find a way to remove it, or [memoize it as well.](useMemo.html#memoizing-a-dependency-of-another-hook)

* * *

### I need to call `useCallback` for each list item in a loop, but it’s not allowed[](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed "Link for this heading")

Suppose the `Chart` component is wrapped in [`memo`](memo.html). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can’t call `useCallback` in a loop:

    function ReportList(

Instead, extract a component for an individual item, and put `useCallback` there:

    function ReportList(

Alternatively, you could remove `useCallback` in the last snippet and instead wrap `Report` itself in [`memo`.](memo.html) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:

    function ReportList();

[PreviousHooks](../react.html)[NextuseContext](useContext.html)

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
*   [`useCallback(fn, dependencies)`](#usecallback)
*   [Usage](#usage)
*   [Skipping re-rendering of components](#skipping-re-rendering-of-components)
*   [Updating state from a memoized callback](#updating-state-from-a-memoized-callback)
*   [Preventing an Effect from firing too often](#preventing-an-effect-from-firing-too-often)
*   [Optimizing a custom Hook](#optimizing-a-custom-hook)
*   [Troubleshooting](#troubleshooting)
*   [Every time my component renders, `useCallback` returns a different function](#every-time-my-component-renders-usecallback-returns-a-different-function)
*   [I need to call `useCallback` for each list item in a loop, but it’s not allowed](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

