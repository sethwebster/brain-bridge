useContext – React

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

useContext[](#undefined "Link for this heading")
================================================

`useContext` is a React Hook that lets you read and subscribe to [context](../../learn/passing-data-deeply-with-context.html) from your component.

    const value = useContext(SomeContext)

*   [Reference](#reference)
    *   [`useContext(SomeContext)`](#usecontext)
*   [Usage](#usage)
    *   [Passing data deeply into the tree](#passing-data-deeply-into-the-tree)
    *   [Updating data passed via context](#updating-data-passed-via-context)
    *   [Specifying a fallback default value](#specifying-a-fallback-default-value)
    *   [Overriding context for a part of the tree](#overriding-context-for-a-part-of-the-tree)
    *   [Optimizing re-renders when passing objects and functions](#optimizing-re-renders-when-passing-objects-and-functions)
*   [Troubleshooting](#troubleshooting)
    *   [My component doesn’t see the value from my provider](#my-component-doesnt-see-the-value-from-my-provider)
    *   [I am always getting `undefined` from my context although the default value is different](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useContext(SomeContext)`[](#usecontext "Link for this heading")

Call `useContext` at the top level of your component to read and subscribe to [context.](../../learn/passing-data-deeply-with-context.html)

    import  from 'react';function MyComponent() {  const theme = useContext(ThemeContext);  // ...

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `SomeContext`: The context that you’ve previously created with [`createContext`](createContext.html). The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

#### Returns[](#returns "Link for Returns ")

`useContext` returns the context value for the calling component. It is determined as the `value` passed to the closest `SomeContext.Provider` above the calling component in the tree. If there is no such provider, then the returned value will be the `defaultValue` you have passed to [`createContext`](createContext.html) for that context. The returned value is always up-to-date. React automatically re-renders components that read some context if it changes.

#### Caveats[](#caveats "Link for Caveats ")

*   `useContext()` call in a component is not affected by providers returned from the _same_ component. The corresponding `<Context.Provider>` **needs to be _above_** the component doing the `useContext()` call.
*   React **automatically re-renders** all the children that use a particular context starting from the provider that receives a different `value`. The previous and the next values are compared with the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Skipping re-renders with [`memo`](memo.html) does not prevent the children receiving fresh context values.
*   If your build system produces duplicates modules in the output (which can happen with symlinks), this can break context. Passing something via context only works if `SomeContext` that you use to provide context and `SomeContext` that you use to read it are **_exactly_ the same object**, as determined by a `===` comparison.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Passing data deeply into the tree[](#passing-data-deeply-into-the-tree "Link for Passing data deeply into the tree ")

Call `useContext` at the top level of your component to read and subscribe to [context.](../../learn/passing-data-deeply-with-context.html)

    import  from 'react';function Button() {  const theme = useContext(ThemeContext);  // ...

`useContext` returns the context value for the context you passed. To determine the context value, React searches the component tree and finds **the closest context provider above** for that particular context.

To pass context to a `Button`, wrap it or one of its parent components into the corresponding context provider:

    function MyPage() 

It doesn’t matter how many layers of components there are between the provider and the `Button`. When a `Button` _anywhere_ inside of `Form` calls `useContext(ThemeContext)`, it will receive `"dark"` as the value.

### Pitfall

`useContext()` always looks for the closest provider _above_ the component that calls it. It searches upwards and **does not** consider providers in the component from which you’re calling `useContext()`.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
    </Panel\>
  );
}

function Panel() {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\=\>
      <h1\></h1\>
      
    </section\>
  )
}

function Button() {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\=\>
      
    </button\>
  );
}

Show more

* * *

### Updating data passed via context[](#updating-data-passed-via-context "Link for Updating data passed via context ")

Often, you’ll want the context to change over time. To update context, combine it with [state.](useState.html) Declare a state variable in the parent component, and pass the current state down as the context value to the provider.

    function MyPage() 

Now any `Button` inside of the provider will receive the current `theme` value. If you call `setTheme` to update the `theme` value that you pass to the provider, all `Button` components will re-render with the new `'light'` value.

#### Examples of updating context[](#examples-basic "Link for Examples of updating context")

1. Updating a value via context 2. Updating an object via context 3. Multiple contexts 4. Extracting providers to a component 5. Scaling up with context and a reducer

#### 

Example 1 of 5:

Updating a value via context[](#updating-a-value-via-context "Link for this heading")

In this example, the `MyApp` component holds a state variable which is then passed to the `ThemeContext` provider. Checking the “Dark mode” checkbox updates the state. Changing the provided value re-renders all the components using that context.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  const \[theme, setTheme\] = useState('light');
  return (
    <ThemeContext.Provider value\=\>
      <Form />
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={(e) \=> {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label\>
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
    </Panel\>
  );
}

function Panel() {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\=\>
      <h1\></h1\>
      
    </section\>
  )
}

function Button() {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\=\>
      
    </button\>
  );
}

Show more

Note that `value="dark"` passes the `"dark"` string, but `value=` passes the value of the JavaScript `theme` variable with [JSX curly braces.](../../learn/javascript-in-jsx-with-curly-braces.html) Curly braces also let you pass context values that aren’t strings.

Next Example

* * *

### Specifying a fallback default value[](#specifying-a-fallback-default-value "Link for Specifying a fallback default value ")

If React can’t find any providers of that particular context in the parent tree, the context value returned by `useContext()` will be equal to the default value that you specified when you [created that context](createContext.html):

    const ThemeContext = createContext(null);

The default value **never changes**. If you want to update context, use it with state as [described above.](#updating-data-passed-via-context)

Often, instead of `null`, there is some more meaningful value you can use as a default, for example:

    const ThemeContext = createContext('light');

This way, if you accidentally render some component without a corresponding provider, it won’t break. This also helps your components work well in a test environment without setting up a lot of providers in the tests.

In the example below, the “Toggle theme” button is always light because it’s **outside any theme context provider** and the default context theme value is `'light'`. Try editing the default theme to be `'dark'`.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext('light');

export default function MyApp() {
  const \[theme, setTheme\] = useState('light');
  return (
    <\>
      <ThemeContext.Provider value\=\>
        <Form />
      </ThemeContext.Provider\>
      <Button onClick\={() \=> {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}\>
        Toggle theme
      </Button\>
    </\>
  )
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
    </Panel\>
  );
}

function Panel() {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\=\>
      <h1\></h1\>
      
    </section\>
  )
}

function Button() {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\=\>
      
    </button\>
  );
}

Show more

* * *

### Overriding context for a part of the tree[](#overriding-context-for-a-part-of-the-tree "Link for Overriding context for a part of the tree ")

You can override the context for a part of the tree by wrapping that part in a provider with a different value.

    <ThemeContext.Provider value="dark">  ...  <ThemeContext.Provider value="light">    <Footer />  </ThemeContext.Provider>  ...</ThemeContext.Provider>

You can nest and override providers as many times as you need.

#### Try out some examples[](#examples "Link for Try out some examples")

1. Overriding a theme 2. Automatically nested headings

#### 

Example 1 of 2:

Overriding a theme[](#overriding-a-theme "Link for this heading")

Here, the button _inside_ the `Footer` receives a different context value (`"light"`) than the buttons outside (`"dark"`).

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
      <ThemeContext.Provider value\="light"\>
        <Footer />
      </ThemeContext.Provider\>
    </Panel\>
  );
}

function Footer() {
  return (
    <footer\>
      <Button\>Settings</Button\>
    </footer\>
  );
}

function Panel() {
  const theme = useContext(ThemeContext);
  const className = 'panel-' + theme;
  return (
    <section className\=\>
      
      
    </section\>
  )
}

function Button() {
  const theme = useContext(ThemeContext);
  const className = 'button-' + theme;
  return (
    <button className\=\>
      
    </button\>
  );
}

Show more

Next Example

* * *

### Optimizing re-renders when passing objects and functions[](#optimizing-re-renders-when-passing-objects-and-functions "Link for Optimizing re-renders when passing objects and functions ")

You can pass any values via context, including objects and functions.

    function MyApp() 

Here, the context value is a JavaScript object with two properties, one of which is a function. Whenever `MyApp` re-renders (for example, on a route update), this will be a _different_ object pointing at a _different_ function, so React will also have to re-render all components deep in the tree that call `useContext(AuthContext)`.

In smaller apps, this is not a problem. However, there is no need to re-render them if the underlying data, like `currentUser`, has not changed. To help React take advantage of that fact, you may wrap the `login` function with [`useCallback`](useCallback.html) and wrap the object creation into [`useMemo`](useMemo.html). This is a performance optimization:

    import 

As a result of this change, even if `MyApp` needs to re-render, the components calling `useContext(AuthContext)` won’t need to re-render unless `currentUser` has changed.

Read more about [`useMemo`](useMemo.html#skipping-re-rendering-of-components) and [`useCallback`.](useCallback.html#skipping-re-rendering-of-components)

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My component doesn’t see the value from my provider[](#my-component-doesnt-see-the-value-from-my-provider "Link for My component doesn’t see the value from my provider ")

There are a few common ways that this can happen:

1.  You’re rendering `<SomeContext.Provider>` in the same component (or below) as where you’re calling `useContext()`. Move `<SomeContext.Provider>` _above and outside_ the component calling `useContext()`.
2.  You may have forgotten to wrap your component with `<SomeContext.Provider>`, or you might have put it in a different part of the tree than you thought. Check whether the hierarchy is right using [React DevTools.](../../learn/react-developer-tools.html)
3.  You might be running into some build issue with your tooling that causes `SomeContext` as seen from the providing component and `SomeContext` as seen by the reading component to be two different objects. This can happen if you use symlinks, for example. You can verify this by assigning them to globals like `window.SomeContext1` and `window.SomeContext2` and then checking whether `window.SomeContext1 === window.SomeContext2` in the console. If they’re not the same, fix that issue on the build tool level.

### I am always getting `undefined` from my context although the default value is different[](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different "Link for this heading")

You might have a provider without a `value` in the tree:

    // 🚩 Doesn't work: no value prop<ThemeContext.Provider>   <Button /></ThemeContext.Provider>

If you forget to specify `value`, it’s like passing `value=`.

You may have also mistakingly used a different prop name by mistake:

    // 🚩 Doesn't work: prop should be called "value"<ThemeContext.Provider theme=>   <Button /></ThemeContext.Provider>

In both of these cases you should see a warning from React in the console. To fix them, call the prop `value`:

    // ✅ Passing the value prop<ThemeContext.Provider value=>   <Button /></ThemeContext.Provider>

Note that the [default value from your `createContext(defaultValue)` call](#specifying-a-fallback-default-value) is only used **if there is no matching provider above at all.** If there is a `<SomeContext.Provider value=>` component somewhere in the parent tree, the component calling `useContext(SomeContext)` _will_ receive `undefined` as the context value.

[PrevioususeCallback](useCallback.html)[NextuseDebugValue](useDebugValue.html)

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
*   [`useContext(SomeContext)`](#usecontext)
*   [Usage](#usage)
*   [Passing data deeply into the tree](#passing-data-deeply-into-the-tree)
*   [Updating data passed via context](#updating-data-passed-via-context)
*   [Specifying a fallback default value](#specifying-a-fallback-default-value)
*   [Overriding context for a part of the tree](#overriding-context-for-a-part-of-the-tree)
*   [Optimizing re-renders when passing objects and functions](#optimizing-re-renders-when-passing-objects-and-functions)
*   [Troubleshooting](#troubleshooting)
*   [My component doesn’t see the value from my provider](#my-component-doesnt-see-the-value-from-my-provider)
*   [I am always getting `undefined` from my context although the default value is different](#i-am-always-getting-undefined-from-my-context-although-the-default-value-is-different)

