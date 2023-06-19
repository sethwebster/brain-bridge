memo – React

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

memo[](#undefined "Link for this heading")
==========================================

`memo` lets you skip re-rendering a component when its props are unchanged.

    const MemoizedComponent = memo(SomeComponent, arePropsEqual?)

*   [Reference](#reference)
    *   [`memo(Component, arePropsEqual?)`](#memo)
*   [Usage](#usage)
    *   [Skipping re-rendering when props are unchanged](#skipping-re-rendering-when-props-are-unchanged)
    *   [Updating a memoized component using state](#updating-a-memoized-component-using-state)
    *   [Updating a memoized component using a context](#updating-a-memoized-component-using-a-context)
    *   [Minimizing props changes](#minimizing-props-changes)
    *   [Specifying a custom comparison function](#specifying-a-custom-comparison-function)
*   [Troubleshooting](#troubleshooting)
    *   [My component re-renders when a prop is an object, array, or function](#my-component-rerenders-when-a-prop-is-an-object-or-array)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `memo(Component, arePropsEqual?)`[](#memo "Link for this heading")

Wrap a component in `memo` to get a _memoized_ version of that component. This memoized version of your component will usually not be re-rendered when its parent component is re-rendered as long as its props have not changed. But React may still re-render it: memoization is a performance optimization, not a guarantee.

    import );

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `Component`: The component that you want to memoize. The `memo` does not modify this component, but returns a new, memoized component instead. Any valid React component, including functions and [`forwardRef`](forwardRef.html) components, is accepted.
    
*   **optional** `arePropsEqual`: A function that accepts two arguments: the component’s previous props, and its new props. It should return `true` if the old and new props are equal: that is, if the component will render the same output and behave in the same way with the new props as with the old. Otherwise it should return `false`. Usually, you will not specify this function. By default, React will compare each prop with [`Object.is`.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
    

#### Returns[](#returns "Link for Returns ")

`memo` returns a new React component. It behaves the same as the component provided to `memo` except that React will not always re-render it when its parent is being re-rendered unless its props have changed.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Skipping re-rendering when props are unchanged[](#skipping-re-rendering-when-props-are-unchanged "Link for Skipping re-rendering when props are unchanged ")

React normally re-renders a component whenever its parent re-renders. With `memo`, you can create a component that React will not re-render when its parent re-renders so long as its new props are the same as the old props. Such a component is said to be _memoized_.

To memoize a component, wrap it in `memo` and use the value that it returns in place of your original component:

    const Greeting = memo(function Greeting();export default Greeting;

A React component should always have [pure rendering logic.](../../learn/keeping-components-pure.html) This means that it must return the same output if its props, state, and context haven’t changed. By using `memo`, you are telling React that your component complies with this requirement, so React doesn’t need to re-render as long as its props haven’t changed. Even with `memo`, your component will re-render if its own state changes or if a context that it’s using changes.

In this example, notice that the `Greeting` component re-renders whenever `name` is changed (because that’s one of its props), but not when `address` is changed (because it’s not passed to `Greeting` as a prop):

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

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

const Greeting = memo(function Greeting() {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  return <h3\>Hello!</h3\>;
});

Show more

### Note

**You should only rely on `memo` as a performance optimization.** If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add `memo` to improve performance.

##### Deep Dive

#### Should you add memo everywhere?[](#should-you-add-memo-everywhere "Link for Should you add memo everywhere? ")

Show Details

If your app is like this site, and most interactions are coarse (like replacing a page or an entire section), memoization is usually unnecessary. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful.

Optimizing with `memo` is only valuable when your component re-renders often with the same exact props, and its re-rendering logic is expensive. If there is no perceptible lag when your component re-renders, `memo` is unnecessary. Keep in mind that `memo` is completely useless if the props passed to your component are _always different,_ such as if you pass an object or a plain function defined during rendering. This is why you will often need [`useMemo`](useMemo.html#skipping-re-rendering-of-components) and [`useCallback`](useCallback.html#skipping-re-rendering-of-components) together with `memo`.

There is no benefit to wrapping a component in `memo` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside of this approach is that code becomes less readable. Also, not all memoization is effective: a single value that’s “always new” is enough to break memoization for an entire component.

**In practice, you can make a lot of memoization unnecessary by following a few principles:**

1.  When a component visually wraps other components, let it [accept JSX as children.](../../learn/passing-props-to-a-component.html#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don’t need to re-render.
2.  Prefer local state and don’t [lift state up](../../learn/sharing-state-between-components.html) any further than necessary. For example, don’t keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3.  Keep your [rendering logic pure.](../../learn/keeping-components-pure.html) If re-rendering a component causes a problem or produces some noticeable visual artifact, it’s a bug in your component! Fix the bug instead of adding memoization.
4.  Avoid [unnecessary Effects that update state.](../../learn/you-might-not-need-an-effect.html) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5.  Try to [remove unnecessary dependencies from your Effects.](../../learn/removing-effect-dependencies.html) For example, instead of memoization, it’s often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) to see which components would benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it’s good to follow them in any case. In the long term, we’re researching [doing granular memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.

* * *

### Updating a memoized component using state[](#updating-a-memoized-component-using-state "Link for Updating a memoized component using state ")

Even when a component is memoized, it will still re-render when its own state changes. Memoization only has to do with props that are passed to the component from its parent.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

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

const Greeting = memo(function Greeting() {
  console.log('Greeting was rendered at', new Date().toLocaleTimeString());
  const \[greeting, setGreeting\] = useState('Hello');
  return (
    <\>
      <h3\>!</h3\>
      <GreetingSelector value\= />
    </\>
  );
});

function GreetingSelector() {
  return (
    <\>
      <label\>
        <input
          type\="radio"
          checked\=
          onChange\=
        />
        Regular greeting
      </label\>
      <label\>
        <input
          type\="radio"
          checked\=
          onChange\=
        />
        Enthusiastic greeting
      </label\>
    </\>
  );
}

Show more

If you set a state variable to its current value, React will skip re-rendering your component even without `memo`. You may still see your component function being called an extra time, but the result will be discarded.

* * *

### Updating a memoized component using a context[](#updating-a-memoized-component-using-a-context "Link for Updating a memoized component using a context ")

Even when a component is memoized, it will still re-render when a context that it’s using changes. Memoization only has to do with props that are passed to the component from its parent.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const \[theme, setTheme\] = useState('dark');

  function handleClick() {
    setTheme(theme === 'dark' ? 'light' : 'dark'); 
  }

  return (
    <ThemeContext.Provider value\=\>
      <button onClick\=\>
        Switch theme
      </button\>
      <Greeting name\="Taylor" />
    </ThemeContext.Provider\>
  );
}

const Greeting = memo(function Greeting() {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  const theme = useContext(ThemeContext);
  return (
    <h3 className\=!</h3\>
  );
});

Show more

To make your component re-render only when a _part_ of some context changes, split your component in two. Read what you need from the context in the outer component, and pass it down to a memoized child as a prop.

* * *

### Minimizing props changes[](#minimizing-props-changes "Link for Minimizing props changes ")

When you use `memo`, your component re-renders whenever any prop is not _shallowly equal_ to what it was previously. This means that React compares every prop in your component with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Note that `Object.is(3, 3)` is `true`, but `Object.is()` is `false`.

To get the most out of `memo`, minimize the times that the props change. For example, if the prop is an object, prevent the parent component from re-creating that object every time by using [`useMemo`:](useMemo.html)

    function Page() );

A better way to minimize props changes is to make sure the component accepts the minimum necessary information in its props. For example, it could accept individual values instead of a whole object:

    function Page() );

Even individual values can sometimes be projected to ones that change less frequently. For example, here a component accepts a boolean indicating the presence of a value rather than the value itself:

    function GroupsLanding();

When you need to pass a function to memoized component, either declare it outside your component so that it never changes, or [`useCallback`](useCallback.html#skipping-re-rendering-of-components) to cache its definition between re-renders.

* * *

### Specifying a custom comparison function[](#specifying-a-custom-comparison-function "Link for Specifying a custom comparison function ")

In rare cases it may be infeasible to minimize the props changes of a memoized component. In that case, you can provide a custom comparison function, which React will use to compare the old and new props instead of using shallow equality. This function is passed as a second argument to `memo`. It should return `true` only if the new props would result in the same output as the old props; otherwise it should return `false`.

    const Chart = memo(function Chart(

If you do this, use the Performance panel in your browser developer tools to make sure that your comparison function is actually faster than re-rendering the component. You might be surprised.

When you do performance measurements, make sure that React is running in the production mode.

### Pitfall

If you provide a custom `arePropsEqual` implementation, **you must compare every prop, including functions.** Functions often [close over](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) the props and state of parent components. If you return `true` when `oldProps.onClick !== newProps.onClick`, your component will keep “seeing” the props and state from a previous render inside its `onClick` handler, leading to very confusing bugs.

Avoid doing deep equality checks inside `arePropsEqual` unless you are 100% sure that the data structure you’re working with has a known limited depth. **Deep equality checks can become incredibly slow** and can freeze your app for many seconds if someone changes the data structure later.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My component re-renders when a prop is an object, array, or function[](#my-component-rerenders-when-a-prop-is-an-object-or-array "Link for My component re-renders when a prop is an object, array, or function ")

React compares old and new props by shallow equality: that is, it considers whether each new prop is reference-equal to the old prop. If you create a new object or array each time the parent is re-rendered, even if the individual elements are each the same, React will still consider it to be changed. Similarly, if you create a new function when rendering the parent component, React will consider it to have changed even if the function has the same definition. To avoid this, [simplify props or memoize props in the parent component](#minimizing-props-changes).

[Previouslazy](lazy.html)[NextstartTransition](startTransition.html)

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
*   [`memo(Component, arePropsEqual?)`](#memo)
*   [Usage](#usage)
*   [Skipping re-rendering when props are unchanged](#skipping-re-rendering-when-props-are-unchanged)
*   [Updating a memoized component using state](#updating-a-memoized-component-using-state)
*   [Updating a memoized component using a context](#updating-a-memoized-component-using-a-context)
*   [Minimizing props changes](#minimizing-props-changes)
*   [Specifying a custom comparison function](#specifying-a-custom-comparison-function)
*   [Troubleshooting](#troubleshooting)
*   [My component re-renders when a prop is an object, array, or function](#my-component-rerenders-when-a-prop-is-an-object-or-array)

