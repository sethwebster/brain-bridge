useMemo – React

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

useMemo[](#undefined "Link for this heading")
=============================================

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.

    const cachedValue = useMemo(calculateValue, dependencies)

*   [Reference](#reference)
    *   [`useMemo(calculateValue, dependencies)`](#usememo)
*   [Usage](#usage)
    *   [Skipping expensive recalculations](#skipping-expensive-recalculations)
    *   [Skipping re-rendering of components](#skipping-re-rendering-of-components)
    *   [Memoizing a dependency of another Hook](#memoizing-a-dependency-of-another-hook)
    *   [Memoizing a function](#memoizing-a-function)
*   [Troubleshooting](#troubleshooting)
    *   [My calculation runs twice on every re-render](#my-calculation-runs-twice-on-every-re-render)
    *   [My `useMemo` call is supposed to return an object, but returns undefined](#my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined)
    *   [Every time my component renders, the calculation in `useMemo` re-runs](#every-time-my-component-renders-the-calculation-in-usememo-re-runs)
    *   [I need to call `useMemo` for each list item in a loop, but it’s not allowed](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useMemo(calculateValue, dependencies)`[](#usememo "Link for this heading")

Call `useMemo` at the top level of your component to cache a calculation between re-renders:

    import 

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `calculateValue`: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On next renders, React will return the same value again if the `dependencies` have not changed since the last render. Otherwise, it will call `calculateValue`, return its result, and store it so it can be reused later.
    
*   `dependencies`: The list of all reactive values referenced inside of the `calculateValue` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](../../learn/editor-setup.html#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison.
    

#### Returns[](#returns "Link for Returns ")

On the initial render, `useMemo` returns the result of calling `calculateValue` with no arguments.

During next renders, it will either return an already stored value from the last render (if the dependencies haven’t changed), or call `calculateValue` again, and return the result that `calculateValue` has returned.

#### Caveats[](#caveats "Link for Caveats ")

*   `useMemo` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a new component and move the state into it.
*   In Strict Mode, React will **call your calculation function twice** in order to [help you find accidental impurities.](#my-calculation-runs-twice-on-every-re-render) This is development-only behavior and does not affect production. If your calculation function is pure (as it should be), this should not affect your logic. The result from one of the calls will be ignored.
*   React **will not throw away the cached value unless there is a specific reason to do that.** For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache—for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should be fine if you rely on `useMemo` solely as a performance optimization. Otherwise, a [state variable](useState.html#avoiding-recreating-the-initial-state) or a [ref](useRef.html#avoiding-recreating-the-ref-contents) may be more appropriate.

### Note

Caching return values like this is also known as [_memoization_,](https://en.wikipedia.org/wiki/Memoization) which is why this Hook is called `useMemo`.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Skipping expensive recalculations[](#skipping-expensive-recalculations "Link for Skipping expensive recalculations ")

To cache a calculation between re-renders, wrap it in a `useMemo` call at the top level of your component:

    import 

You need to pass two things to `useMemo`:

1.  A calculation function that takes no arguments, like `() =>`, and returns what you wanted to calculate.
2.  A list of dependencies including every value within your component that’s used inside your calculation.

On the initial render, the value you’ll get from `useMemo` will be the result of calling your calculation.

On every subsequent render, React will compare the dependencies with the dependencies you passed during the last render. If none of the dependencies have changed (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useMemo` will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.

In other words, `useMemo` caches a calculation result between re-renders until its dependencies change.

**Let’s walk through an example to see when this is useful.**

By default, React will re-run the entire body of your component every time that it re-renders. For example, if this `TodoList` updates its state or receives new props from its parent, the `filterTodos` function will re-run:

    function TodoList(

Usually, this isn’t a problem because most calculations are very fast. However, if you’re filtering or transforming a large array, or doing some expensive computation, you might want to skip doing it again if data hasn’t changed. If both `todos` and `tab` are the same as they were during the last render, wrapping the calculation in `useMemo` like earlier lets you reuse `visibleTodos` you’ve already calculated before.

This type of caching is called _[memoization.](https://en.wikipedia.org/wiki/Memoization)_

### Note

**You should only rely on `useMemo` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `useMemo` to improve performance.

##### Deep Dive

#### How to tell if a calculation is expensive?[](#how-to-tell-if-a-calculation-is-expensive "Link for How to tell if a calculation is expensive? ")

Show Details

In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:

    console.time('filter array');const visibleTodos = filterTodos(todos, tab);console.timeEnd('filter array');

Perform the interaction you’re measuring (for example, typing into the input). You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation. As an experiment, you can then wrap the calculation in `useMemo` to verify whether the total logged time has decreased for that interaction or not:

    console.time('filter array');const visibleTodos = useMemo(() => , [todos, tab]);console.timeEnd('filter array');

`useMemo` won’t make the _first_ render faster. It only helps you skip unnecessary work on updates.

Keep in mind that your machine is probably faster than your users’ so it’s a good idea to test the performance with an artificial slowdown. For example, Chrome offers a [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) option for this.

Also note that measuring performance in development will not give you the most accurate results. (For example, when [Strict Mode](StrictMode.html) is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.

##### Deep Dive

#### Should you add useMemo everywhere?[](#should-you-add-usememo-everywhere "Link for Should you add useMemo everywhere? ")

Show Details

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Optimizing with `useMemo` is only valuable in a few cases:

*   The calculation you’re putting in `useMemo` is noticeably slow, and its dependencies rarely change.
*   You pass it as a prop to a component wrapped in [`memo`.](memo.html) You want to skip re-rendering if the value hasn’t changed. Memoization lets your component re-render only when dependencies aren’t the same.
*   The value you’re passing is later used as a dependency of some Hook. For example, maybe another `useMemo` calculation value depends on it. Or maybe you are depending on this value from [`useEffect.`](useEffect.html)

There is no benefit to wrapping a calculation in `useMemo` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside of this approach is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](../../learn/passing-props-to-a-component.html#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](../../learn/sharing-state-between-components.html) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](../../learn/keeping-components-pure.html) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](../../learn/you-might-not-need-an-effect.html) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](../../learn/removing-effect-dependencies.html) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components would benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In the long term, we’re researching [doing granular memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

#### The difference between useMemo and calculating a value directly[](#examples-recalculation "Link for The difference between useMemo and calculating a value directly")

1. Skipping recalculation with `useMemo` 2. Always recalculating a value

#### 

Example 1 of 2:

Skipping recalculation with `useMemo`[](#skipping-recalculation-with-usememo "Link for this heading")

In this example, the `filterTodos` implementation is **artificially slowed down** so that you can see what happens when some JavaScript function you’re calling during rendering is genuinely slow. Try switching the tabs and toggling the theme.

Switching the tabs feels slow because it forces the slowed down `filterTodos` to re-execute. That’s expected because the `tab` has changed, and so the entire calculation _needs_ to re-run. (If you’re curious why it runs twice, it’s explained [here.](#my-calculation-runs-twice-on-every-re-render))

Toggle the theme. **Thanks to `useMemo`, it’s fast despite the artificial slowdown!** The slow `filterTodos` call was skipped because both `todos` and `tab` (which you pass as dependencies to `useMemo`) haven’t changed since the last render.

App.jsTodoList.jsutils.js

TodoList.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './utils.js'

export default function TodoList() {
  const visibleTodos = useMemo(
    () \=> filterTodos(todos, tab),
    \[todos, tab\]
  );
  return (
    <div className\=\>
      <p\><b\>Note: <code\>filterTodos</code\> is artificially slowed down!</b\></p\>
      <ul\>
        {visibleTodos.map(todo \=> (
          <li key\=\>
            {todo.completed ?
              <s\></s\> :
              todo.text
            }
          </li\>
        ))}
      </ul\>
    </div\>
  );
}

Show more

Next Example

* * *

### Skipping re-rendering of components[](#skipping-re-rendering-of-components "Link for Skipping re-rendering of components ")

In some cases, `useMemo` can also help you optimize performance of re-rendering child components. To illustrate this, let’s say this `TodoList` component passes the `visibleTodos` as a prop to the child `List` component:

    export default function TodoList(

You’ve noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<List />` from your JSX, it feels fast. This tells you that it’s worth trying to optimize the `List` component.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `TodoList` re-renders with a different `theme`, the `List` component _also_ re-renders. This is fine for components that don’t require much calculation to re-render. But if you’ve verified that a re-render is slow, you can tell `List` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](memo.html)

    import );

**With this change, `List` will skip re-rendering if all of its props are the _same_ as on the last render.** This is where caching the calculation becomes important! Imagine that you calculated `visibleTodos` without `useMemo`:

    export default function TodoList(

**In the above example, the `filterTodos` function always creates a _different_ array,** similar to how the `` object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that `List` props will never be the same, and your [`memo`](memo.html) optimization won’t work. This is where `useMemo` comes in handy:

    export default function TodoList(

**By wrapping the `visibleTodos` calculation in `useMemo`, you ensure that it has the _same_ value between the re-renders** (until dependencies change). You don’t _have to_ wrap a calculation in `useMemo` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](memo.html) and this lets it skip re-rendering. There are a few other reasons to add `useMemo` which are described further on this page.

##### Deep Dive

#### Memoizing individual JSX nodes[](#memoizing-individual-jsx-nodes "Link for Memoizing individual JSX nodes ")

Show Details

Instead of wrapping `List` in [`memo`](memo.html), you could wrap the `<List />` JSX node itself in `useMemo`:

    export default function TodoList(

The behavior would be the same. If the `visibleTodos` haven’t changed, `List` won’t be re-rendered.

A JSX node like `<List items=`. Creating this object is very cheap, but React doesn’t know whether its contents is the same as last time or not. This is why by default, React will re-render the `List` component.

However, if React sees the same exact JSX as during the previous render, it won’t try to re-render your component. This is because JSX nodes are [immutable.](https://en.wikipedia.org/wiki/Immutable_object) A JSX node object could not have changed over time, so React knows it’s safe to skip a re-render. However, for this to work, the node has to _actually be the same object_, not merely look the same in code. This is what `useMemo` does in this example.

Manually wrapping JSX nodes into `useMemo` is not convenient. For example, you can’t do this conditionally. This is usually why you would wrap components with [`memo`](memo.html) instead of wrapping JSX nodes.

#### The difference between skipping re-renders and always re-rendering[](#examples-rerendering "Link for The difference between skipping re-renders and always re-rendering")

1. Skipping re-rendering with `useMemo` and `memo` 2. Always re-rendering a component

#### 

Example 1 of 2:

Skipping re-rendering with `useMemo` and `memo`[](#skipping-re-rendering-with-usememo-and-memo "Link for this heading")

In this example, the `List` component is **artificially slowed down** so that you can see what happens when a React component you’re rendering is genuinely slow. Try switching the tabs and toggling the theme.

Switching the tabs feels slow because it forces the slowed down `List` to re-render. That’s expected because the `tab` has changed, and so you need to reflect the user’s new choice on the screen.

Next, try toggling the theme. **Thanks to `useMemo` together with [`memo`](memo.html), it’s fast despite the artificial slowdown!** The `List` skipped re-rendering because the `visibleItems` array has not changed since the last render. The `visibleItems` array has not changed because both `todos` and `tab` (which you pass as dependencies to `useMemo`) haven’t changed since the last render.

App.jsTodoList.jsList.jsutils.js

TodoList.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import List from './List.js';
import  from './utils.js'

export default function TodoList() {
  const visibleTodos = useMemo(
    () \=> filterTodos(todos, tab),
    \[todos, tab\]
  );
  return (
    <div className\=\>
      <p\><b\>Note: <code\>List</code\> is artificially slowed down!</b\></p\>
      <List items\= />
    </div\>
  );
}

Show more

Next Example

* * *

### Memoizing a dependency of another Hook[](#memoizing-a-dependency-of-another-hook "Link for Memoizing a dependency of another Hook ")

Suppose you have a calculation that depends on an object created directly in the component body:

    function Dropdown(, [allItems, searchOptions]); // 🚩 Caution: Dependency on an object created in the component body  // ...

Depending on an object like this defeats the point of memoization. When a component re-renders, all of the code directly inside the component body runs again. **The lines of code creating the `searchOptions` object will also run on every re-render.** Since `searchOptions` is a dependency of your `useMemo` call, and it’s different every time, React knows the dependencies are different, and recalculate `searchItems` every time.

To fix this, you could memoize the `searchOptions` object _itself_ before passing it as a dependency:

    function Dropdown(, [allItems, searchOptions]); // ✅ Only changes when allItems or searchOptions changes  // ...

In the example above, if the `text` did not change, the `searchOptions` object also won’t change. However, an even better fix is to move the `searchOptions` object declaration _inside_ of the `useMemo` calculation function:

    function Dropdown(, [allItems, text]); // ✅ Only changes when allItems or text changes  // ...

Now your calculation depends on `text` directly (which is a string and can’t “accidentally” become different).

* * *

### Memoizing a function[](#memoizing-a-function "Link for Memoizing a function ")

Suppose the `Form` component is wrapped in [`memo`.](memo.html) You want to pass a function to it as a prop:

    export default function ProductPage(

Just as `` produce a _different_ function on every re-render. By itself, creating a new function is not a problem. This is not something to avoid! However, if the `Form` component is memoized, presumably you want to skip re-rendering it when no props have changed. A prop that is _always_ different would defeat the point of memoization.

To memoize a function with `useMemo`, your calculation function would have to return another function:

    export default function Page(

This looks clunky! **Memoizing functions is common enough that React has a built-in Hook specifically for that. Wrap your functions into [`useCallback`](useCallback.html) instead of `useMemo`** to avoid having to write an extra nested function:

    export default function Page(

The two examples above are completely equivalent. The only benefit to `useCallback` is that it lets you avoid writing an extra nested function inside. It doesn’t do anything else. [Read more about `useCallback`.](useCallback.html)

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My calculation runs twice on every re-render[](#my-calculation-runs-twice-on-every-re-render "Link for My calculation runs twice on every re-render ")

In [Strict Mode](StrictMode.html), React will call some of your functions twice instead of once:

    function TodoList(, [todos, tab]);  // ...

This is expected and shouldn’t break your code.

This **development-only** behavior helps you [keep components pure.](../../learn/keeping-components-pure.html) React uses the result of one of the calls, and ignores the result of the other call. As long as your component and calculation functions are pure, this shouldn’t affect your logic. However, if they are accidentally impure, this helps you notice and fix the mistake.

For example, this impure calculation function mutates an array you received as a prop:

      const visibleTodos = useMemo(() => , [todos, tab]);

React calls your function twice, so you’d notice the todo is added twice. Your calculation shouldn’t change any existing objects, but it’s okay to change any _new_ objects you created during the calculation. For example, if the `filterTodos` function always returns a _different_ array, you can mutate _that_ array instead:

      const visibleTodos = useMemo(() => , [todos, tab]);

Read [keeping components pure](../../learn/keeping-components-pure.html) to learn more about purity.

Also, check out the guides on [updating objects](../../learn/updating-objects-in-state.html) and [updating arrays](../../learn/updating-arrays-in-state.html) without mutation.

* * *

### My `useMemo` call is supposed to return an object, but returns undefined[](#my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined "Link for this heading")

This code doesn’t work:

      // 🔴 You can't return an object from an arrow function with () => , [text]);

In JavaScript, `() => )`:

      // This works, but is easy for someone to break again  const searchOptions = useMemo(() => (), [text]);

However, this is still confusing and too easy for someone to break by removing the parentheses.

To avoid this mistake, write a `return` statement explicitly:

      // ✅ This works and is explicit  const searchOptions = useMemo(() => , [text]);

* * *

### Every time my component renders, the calculation in `useMemo` re-runs[](#every-time-my-component-renders-the-calculation-in-usememo-re-runs "Link for this heading")

Make sure you’ve specified the dependency array as a second argument!

If you forget the dependency array, `useMemo` will re-run the calculation every time:

    function TodoList() {  // 🔴 Recalculates every time: no dependency array  const visibleTodos = useMemo(() => filterTodos(todos, tab));  // ...

This is the corrected version passing the dependency array as a second argument:

    function TodoList() {  // ✅ Does not recalculate unnecessarily  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);  // ...

If this doesn’t help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:

      const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);  console.log([todos, tab]);

You can then right-click on the arrays from different re-renders in the console and select “Store as a global variable” for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same:

    Object.is(temp1[0], temp2[0]); // Is the first dependency the same between the arrays?Object.is(temp1[1], temp2[1]); // Is the second dependency the same between the arrays?Object.is(temp1[2], temp2[2]); // ... and so on for every dependency ...

When you find which dependency breaks memoization, either find a way to remove it, or [memoize it as well.](#memoizing-a-dependency-of-another-hook)

* * *

### I need to call `useMemo` for each list item in a loop, but it’s not allowed[](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed "Link for this heading")

Suppose the `Chart` component is wrapped in [`memo`](memo.html). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can’t call `useMemo` in a loop:

    function ReportList(

Instead, extract a component for each item and memoize data for individual items:

    function ReportList(

Alternatively, you could remove `useMemo` and instead wrap `Report` itself in [`memo`.](memo.html) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:

    function ReportList();

[PrevioususeLayoutEffect](useLayoutEffect.html)[NextuseReducer](useReducer.html)

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
*   [`useMemo(calculateValue, dependencies)`](#usememo)
*   [Usage](#usage)
*   [Skipping expensive recalculations](#skipping-expensive-recalculations)
*   [Skipping re-rendering of components](#skipping-re-rendering-of-components)
*   [Memoizing a dependency of another Hook](#memoizing-a-dependency-of-another-hook)
*   [Memoizing a function](#memoizing-a-function)
*   [Troubleshooting](#troubleshooting)
*   [My calculation runs twice on every re-render](#my-calculation-runs-twice-on-every-re-render)
*   [My `useMemo` call is supposed to return an object, but returns undefined](#my-usememo-call-is-supposed-to-return-an-object-but-returns-undefined)
*   [Every time my component renders, the calculation in `useMemo` re-runs](#every-time-my-component-renders-the-calculation-in-usememo-re-runs)
*   [I need to call `useMemo` for each list item in a loop, but it’s not allowed](#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)

