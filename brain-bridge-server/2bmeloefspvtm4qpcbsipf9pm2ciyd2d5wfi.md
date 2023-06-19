Component – React

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

Component[](#undefined "Link for this heading")
===============================================

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#alternatives)

`Component` is the base class for the React components defined as [JavaScript classes.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) Class components are still supported by React, but we don’t recommend using them in new code.

    class Greeting extends Component 

*   [Reference](#reference)
    *   [`Component`](#component)
    *   [`context`](#context)
    *   [`props`](#props)
    *   [`refs`](#refs)
    *   [`state`](#state)
    *   [`constructor(props)`](#constructor)
    *   [`componentDidCatch(error, info)`](#componentdidcatch)
    *   [`componentDidMount()`](#componentdidmount)
    *   [`componentDidUpdate(prevProps, prevState, snapshot?)`](#componentdidupdate)
    *   [`componentWillMount()`](#componentwillmount)
    *   [`componentWillReceiveProps(nextProps)`](#componentwillreceiveprops)
    *   [`componentWillUpdate(nextProps, nextState)`](#componentwillupdate)
    *   [`componentWillUnmount()`](#componentwillunmount)
    *   [`forceUpdate(callback?)`](#forceupdate)
    *   [`getChildContext()`](#getchildcontext)
    *   [`getSnapshotBeforeUpdate(prevProps, prevState)`](#getsnapshotbeforeupdate)
    *   [`render()`](#render)
    *   [`setState(nextState, callback?)`](#setstate)
    *   [`shouldComponentUpdate(nextProps, nextState, nextContext)`](#shouldcomponentupdate)
    *   [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)
    *   [`UNSAFE_componentWillReceiveProps(nextProps, nextContext)`](#unsafe_componentwillreceiveprops)
    *   [`UNSAFE_componentWillUpdate(nextProps, nextState)`](#unsafe_componentwillupdate)
    *   [`static childContextTypes`](#static-childcontexttypes)
    *   [`static contextTypes`](#static-contexttypes)
    *   [`static contextType`](#static-contexttype)
    *   [`static defaultProps`](#static-defaultprops)
    *   [`static propTypes`](#static-proptypes)
    *   [`static getDerivedStateFromError(error)`](#static-getderivedstatefromerror)
    *   [`static getDerivedStateFromProps(props, state)`](#static-getderivedstatefromprops)
*   [Usage](#usage)
    *   [Defining a class component](#defining-a-class-component)
    *   [Adding state to a class component](#adding-state-to-a-class-component)
    *   [Adding lifecycle methods to a class component](#adding-lifecycle-methods-to-a-class-component)
    *   [Catching rendering errors with an error boundary](#catching-rendering-errors-with-an-error-boundary)
*   [Alternatives](#alternatives)
    *   [Migrating a simple component from a class to a function](#migrating-a-simple-component-from-a-class-to-a-function)
    *   [Migrating a component with state from a class to a function](#migrating-a-component-with-state-from-a-class-to-a-function)
    *   [Migrating a component with lifecycle methods from a class to a function](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)
    *   [Migrating a component with context from a class to a function](#migrating-a-component-with-context-from-a-class-to-a-function)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `Component`[](#component "Link for this heading")

To define a React component as a class, extend the built-in `Component` class and define a [`render` method:](#render)

    import 

Only the `render` method is required, other methods are optional.

[See more examples below.](#usage)

* * *

### `context`[](#context "Link for this heading")

The [context](../../learn/passing-data-deeply-with-context.html) of a class component is available as `this.context`. It is only available if you specify _which_ context you want to receive using [`static contextType`](#static-contexttype) (modern) or [`static contextTypes`](#static-contexttypes) (deprecated).

A class component can only read one context at a time.

    class Button extends Component 

### Note

Reading `this.context` in class components is equivalent to [`useContext`](useContext.html) in function components.

[See how to migrate.](#migrating-a-component-with-context-from-a-class-to-a-function)

* * *

### `props`[](#props "Link for this heading")

The props passed to a class component are available as `this.props`.

    class Greeting extends Component <Greeting name="Taylor" />

### Note

Reading `this.props` in class components is equivalent to [declaring props](../../learn/passing-props-to-a-component.html#step-2-read-props-inside-the-child-component) in function components.

[See how to migrate.](#migrating-a-simple-component-from-a-class-to-a-function)

* * *

### `refs`[](#refs "Link for this heading")

### Deprecated

This API will be removed in a future major version of React. [Use `createRef` instead.](createRef.html)

Lets you access [legacy string refs](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) for this component.

* * *

### `state`[](#state "Link for this heading")

The state of a class component is available as `this.state`. The `state` field must be an object. Do not mutate the state directly. If you wish to change the state, call `setState` with the new state.

    class Counter extends Component 

### Note

Defining `state` in class components is equivalent to calling [`useState`](useState.html) in function components.

[See how to migrate.](#migrating-a-component-with-state-from-a-class-to-a-function)

* * *

### `constructor(props)`[](#constructor "Link for this heading")

The [constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) runs before your class component _mounts_ (gets added to the screen). Typically, a constructor is only used for two purposes in React. It lets you declare state and [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) your class methods to the class instance:

    class Counter extends Component 

If you use modern JavaScript syntax, constructors are rarely needed. Instead, you can rewrite this code above using the [public class field syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields) which is supported both by modern browsers and tools like [Babel:](https://babeljs.io/)

    class Counter extends Component 

A constructor should not contain any side effects or subscriptions.

#### Parameters[](#constructor-parameters "Link for Parameters ")

*   `props`: The component’s initial props.

#### Returns[](#constructor-returns "Link for Returns ")

`constructor` should not return anything.

#### Caveats[](#constructor-caveats "Link for Caveats ")

*   Do not run any side effects or subscriptions in the constructor. Instead, use [`componentDidMount`](#componentdidmount) for that.
    
*   Inside a constructor, you need to call `super(props)` before any other statement. If you don’t do that, `this.props` will be `undefined` while the constructor runs, which can be confusing and cause bugs.
    
*   Constructor is the only place where you can assign [`this.state`](#state) directly. In all other methods, you need to use [`this.setState()`](#setstate) instead. Do not call `setState` in the constructor.
    
*   When you use [server rendering,](../react-dom/server.html) the constructor will run on the server too, followed by the [`render`](#render) method. However, lifecycle methods like `componentDidMount` or `componentWillUnmount` will not run on the server.
    
*   When [Strict Mode](StrictMode.html) is on, React will call `constructor` twice in development and then throw away one of the instances. This helps you notice the accidental side effects that need to be moved out of the `constructor`.
    

### Note

There is no exact equivalent for `constructor` in function components. To declare state in a function component, call [`useState`.](useState.html) To avoid recalculating the initial state, [pass a function to `useState`.](useState.html#avoiding-recreating-the-initial-state)

* * *

### `componentDidCatch(error, info)`[](#componentdidcatch "Link for this heading")

If you define `componentDidCatch`, React will call it when some child component (including distant children) throws an error during rendering. This lets you log that error to an error reporting service in production.

Typically, it is used together with [`static getDerivedStateFromError`](#static-getderivedstatefromerror) which lets you update state in response to an error and display an error message to the user. A component with these methods is called an _error boundary._

[See an example.](#catching-rendering-errors-with-an-error-boundary)

#### Parameters[](#componentdidcatch-parameters "Link for Parameters ")

*   `error`: The error that was thrown. In practice, it will usually be an instance of [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) but this is not guaranteed because JavaScript allows to [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) any value, including strings or even `null`.
    
*   `info`: An object containing additional information about the error. Its `componentStack` field contains a stack trace with the component that threw, as well as the names and source locations of all its parent components. In production, the component names will be minified. If you set up production error reporting, you can decode the component stack using sourcemaps the same way as you would do for regular JavaScript error stacks.
    

#### Returns[](#componentdidcatch-returns "Link for Returns ")

`componentDidCatch` should not return anything.

#### Caveats[](#componentdidcatch-caveats "Link for Caveats ")

*   In the past, it was common to call `setState` inside `componentDidCatch` in order to update the UI and display the fallback error message. This is deprecated in favor of defining [`static getDerivedStateFromError`.](#static-getderivedstatefromerror)
    
*   Production and development builds of React slightly differ in the way `componentDidCatch` handles errors. In development, the errors will bubble up to `window`, which means that any `window.onerror` or `window.addEventListener('error', callback)` will intercept the errors that have been caught by `componentDidCatch`. In production, instead, the errors will not bubble up, which means any ancestor error handler will only receive errors not explicitly caught by `componentDidCatch`.
    

### Note

There is no direct equivalent for `componentDidCatch` in function components yet. If you’d like to avoid creating class components, write a single `ErrorBoundary` component like above and use it throughout your app. Alternatively, you can use the [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) package which does that for you.

* * *

### `componentDidMount()`[](#componentdidmount "Link for this heading")

If you define the `componentDidMount` method, React will call it when your component is added _(mounted)_ to the screen. This is a common place to start data fetching, set up subscriptions, or manipulate the DOM nodes.

If you implement `componentDidMount`, you usually need to implement other lifecycle methods to avoid bugs. For example, if `componentDidMount` reads some state or props, you also have to implement [`componentDidUpdate`](#componentdidupdate) to handle their changes, and [`componentWillUnmount`](#componentwillunmount) to clean up whatever `componentDidMount` was doing.

    class ChatRoom extends Component 

[See more examples.](#adding-lifecycle-methods-to-a-class-component)

#### Parameters[](#componentdidmount-parameters "Link for Parameters ")

`componentDidMount` does not take any parameters.

#### Returns[](#componentdidmount-returns "Link for Returns ")

`componentDidMount` should not return anything.

#### Caveats[](#componentdidmount-caveats "Link for Caveats ")

*   When [Strict Mode](StrictMode.html) is on, in development React will call `componentDidMount`, then immediately call [`componentWillUnmount`,](#componentwillunmount) and then call `componentDidMount` again. This helps you notice if you forgot to implement `componentWillUnmount` or if its logic doesn’t fully “mirror” what `componentDidMount` does.
    
*   Although you may call [`setState`](#setstate) immediately in `componentDidMount`, it’s best to avoid that when you can. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the [`render`](#render) will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the [`constructor`](#constructor) instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.
    

### Note

For many use cases, defining `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` together in class components is equivalent to calling [`useEffect`](useEffect.html) in function components. In the rare cases where it’s important for the code to run before browser paint, [`useLayoutEffect`](useLayoutEffect.html) is a closer match.

[See how to migrate.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

* * *

### `componentDidUpdate(prevProps, prevState, snapshot?)`[](#componentdidupdate "Link for this heading")

If you define the `componentDidUpdate` method, React will call it immediately after your component has been re-rendered with updated props or state. This method is not called for the initial render.

You can use it to manipulate the DOM after an update. This is also a common place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed). Typically, you’d use it together with [`componentDidMount`](#componentdidmount) and [`componentWillUnmount`:](#componentwillunmount)

    class ChatRoom extends Component 

[See more examples.](#adding-lifecycle-methods-to-a-class-component)

#### Parameters[](#componentdidupdate-parameters "Link for Parameters ")

*   `prevProps`: Props before the update. Compare `prevProps` to [`this.props`](#props) to determine what changed.
    
*   `prevState`: State before the update. Compare `prevState` to [`this.state`](#state) to determine what changed.
    
*   `snapshot`: If you implemented [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate), `snapshot` will contain the value you returned from that method. Otherwise, it will be `undefined`.
    

#### Returns[](#componentdidupdate-returns "Link for Returns ")

`componentDidUpdate` should not return anything.

#### Caveats[](#componentdidupdate-caveats "Link for Caveats ")

*   `componentDidUpdate` will not get called if [`shouldComponentUpdate`](#shouldcomponentupdate) is defined and returns `false`.
    
*   The logic inside `componentDidUpdate` should usually be wrapped in conditions comparing `this.props` with `prevProps`, and `this.state` with `prevState`. Otherwise, there’s a risk of creating infinite loops.
    
*   Although you may call [`setState`](#setstate) immediately in `componentDidUpdate`, it’s best to avoid that when you can. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the [`render`](#render) will be called twice in this case, the user won’t see the intermediate state. This pattern often causes performance issues, but it may be necessary for rare cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.
    

### Note

For many use cases, defining `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` together in class components is equivalent to calling [`useEffect`](useEffect.html) in function components. In the rare cases where it’s important for the code to run before browser paint, [`useLayoutEffect`](useLayoutEffect.html) is a closer match.

[See how to migrate.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

* * *

### `componentWillMount()`[](#componentwillmount "Link for this heading")

### Deprecated

This API has been renamed from `componentWillMount` to [`UNSAFE_componentWillMount`.](#unsafe_componentwillmount) The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

* * *

### `componentWillReceiveProps(nextProps)`[](#componentwillreceiveprops "Link for this heading")

### Deprecated

This API has been renamed from `componentWillReceiveProps` to [`UNSAFE_componentWillReceiveProps`.](#unsafe_componentwillreceiveprops) The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

* * *

### `componentWillUpdate(nextProps, nextState)`[](#componentwillupdate "Link for this heading")

### Deprecated

This API has been renamed from `componentWillUpdate` to [`UNSAFE_componentWillUpdate`.](#unsafe_componentwillupdate) The old name has been deprecated. In a future major version of React, only the new name will work.

Run the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

* * *

### `componentWillUnmount()`[](#componentwillunmount "Link for this heading")

If you define the `componentWillUnmount` method, React will call it before your component is removed _(unmounted)_ from the screen. This is a common place to cancel data fetching or remove subscriptions.

The logic inside `componentWillUnmount` should “mirror” the logic inside [`componentDidMount`.](#componentdidmount) For example, if `componentDidMount` sets up a subscription, `componentWillUnmount` should clean up that subscription. If the cleanup logic in your `componentWillUnmount` reads some props or state, you will usually also need to implement [`componentDidUpdate`](#componentdidupdate) to clean up resources (such as subscriptions) corresponding to the old props and state.

    class ChatRoom extends Component 

[See more examples.](#adding-lifecycle-methods-to-a-class-component)

#### Parameters[](#componentwillunmount-parameters "Link for Parameters ")

`componentWillUnmount` does not take any parameters.

#### Returns[](#componentwillunmount-returns "Link for Returns ")

`componentWillUnmount` should not return anything.

#### Caveats[](#componentwillunmount-caveats "Link for Caveats ")

*   When [Strict Mode](StrictMode.html) is on, in development React will call [`componentDidMount`,](#componentdidmount) then immediately call `componentWillUnmount`, and then call `componentDidMount` again. This helps you notice if you forgot to implement `componentWillUnmount` or if its logic doesn’t fully “mirror” what `componentDidMount` does.

### Note

For many use cases, defining `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` together in class components is equivalent to calling [`useEffect`](useEffect.html) in function components. In the rare cases where it’s important for the code to run before browser paint, [`useLayoutEffect`](useLayoutEffect.html) is a closer match.

[See how to migrate.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

* * *

### `forceUpdate(callback?)`[](#forceupdate "Link for this heading")

Forces a component to re-render.

Usually, this is not necessary. If your component’s [`render`](#render) method only reads from [`this.props`](#props), [`this.state`](#state), or [`this.context`,](#context) it will re-render automatically when you call [`setState`](#setstate) inside your component or one of its parents. However, if your component’s `render` method reads directly from an external data source, you have to tell React to update the user interface when that data source changes. That’s what `forceUpdate` lets you do.

Try to avoid all uses of `forceUpdate` and only read from `this.props` and `this.state` in `render`.

#### Parameters[](#forceupdate-parameters "Link for Parameters ")

*   **optional** `callback` If specified, React will call the `callback` you’ve provided after the update is committed.

#### Returns[](#forceupdate-returns "Link for Returns ")

`forceUpdate` does not return anything.

#### Caveats[](#forceupdate-caveats "Link for Caveats ")

*   If you call `forceUpdate`, React will re-render without calling [`shouldComponentUpdate`.](#shouldcomponentupdate)

### Note

Reading an external data source and forcing class components to re-render in response to its changes with `forceUpdate` has been superseded by [`useSyncExternalStore`](useSyncExternalStore.html) in function components.

* * *

### `getChildContext()`[](#getchildcontext "Link for this heading")

### Deprecated

This API will be removed in a future major version of React. [Use `Context.Provider` instead.](createContext.html#provider)

Lets you specify the values for the [legacy context](https://reactjs.org/docs/legacy-context.html) is provided by this component.

* * *

### `getSnapshotBeforeUpdate(prevProps, prevState)`[](#getsnapshotbeforeupdate "Link for this heading")

If you implement `getSnapshotBeforeUpdate`, React will call it immediately before React updates the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to [`componentDidUpdate`.](#componentdidupdate)

For example, you can use it in a UI like a chat thread that needs to preserve its scroll position during updates:

    class ScrollingList extends React.Component 

In the above example, it is important to read the `scrollHeight` property directly in `getSnapshotBeforeUpdate`. It is not safe to read it in [`render`](#render), [`UNSAFE_componentWillReceiveProps`](#unsafe_componentwillreceiveprops), or [`UNSAFE_componentWillUpdate`](#unsafe_componentwillupdate) because there is a potential time gap between these methods getting called and React updating the DOM.

#### Parameters[](#getsnapshotbeforeupdate-parameters "Link for Parameters ")

*   `prevProps`: Props before the update. Compare `prevProps` to [`this.props`](#props) to determine what changed.
    
*   `prevState`: State before the update. Compare `prevState` to [`this.state`](#state) to determine what changed.
    

#### Returns[](#getsnapshotbeforeupdate-returns "Link for Returns ")

You should return a snapshot value of any type that you’d like, or `null`. The value you returned will be passed as the third argument to [`componentDidUpdate`.](#componentdidupdate)

#### Caveats[](#getsnapshotbeforeupdate-caveats "Link for Caveats ")

*   `getSnapshotBeforeUpdate` will not get called if [`shouldComponentUpdate`](#shouldcomponentupdate) is defined and returns `false`.

### Note

At the moment, there is no equivalent to `getSnapshotBeforeUpdate` for function components. This use case is very uncommon, but if you have the need for it, for now you’ll have to write a class component.

* * *

### `render()`[](#render "Link for this heading")

The `render` method is the only required method in a class component.

The `render` method should specify what you want to appear on the screen, for example:

    import 

React may call `render` at any moment, so you shouldn’t assume that it runs at a particular time. Usually, the `render` method should return a piece of [JSX](../../learn/writing-markup-with-jsx.html), but a few [other return types](#render-returns) (like strings) are supported. To calculate the returned JSX, the `render` method can read [`this.props`](#props), [`this.state`](#state), and [`this.context`](#context).

You should write the `render` method as a pure function, meaning that it should return the same result if props, state, and context are the same. It also shouldn’t contain side effects (like setting up subscriptions) or interact with the browser APIs. Side effects should happen either in event handlers or methods like [`componentDidMount`.](#componentdidmount)

#### Parameters[](#render-parameters "Link for Parameters ")

*   `prevProps`: Props before the update. Compare `prevProps` to [`this.props`](#props) to determine what changed.
    
*   `prevState`: State before the update. Compare `prevState` to [`this.state`](#state) to determine what changed.
    

#### Returns[](#render-returns "Link for Returns ")

`render` can return any valid React node. This includes React elements such as `<div />`, strings, numbers, [portals](../react-dom/createPortal.html), empty nodes (`null`, `undefined`, `true`, and `false`), and arrays of React nodes.

#### Caveats[](#render-caveats "Link for Caveats ")

*   `render` should be written as a pure function of props, state, and context. It should not have side effects.
    
*   `render` will not get called if [`shouldComponentUpdate`](#shouldcomponentupdate) is defined and returns `false`.
    
*   When [Strict Mode](StrictMode.html) is on, React will call `render` twice in development and then throw away one of the results. This helps you notice the accidental side effects that need to be moved out of the `render` method.
    
*   There is no one-to-one correspondence between the `render` call and the subsequent `componentDidMount` or `componentDidUpdate` call. Some of the `render` call results may be discarded by React when it’s beneficial.
    

* * *

### `setState(nextState, callback?)`[](#setstate "Link for this heading")

Call `setState` to update the state of your React component.

    class Form extends Component 

`setState` enqueues changes to the component state. It tells React that this component and its children need to re-render with the new state. This is the main way you’ll update the user interface in response to interactions.

### Pitfall

Calling `setState` **does not** change the current state in the already executing code:

    function handleClick() 

It only affects what `this.state` will return starting from the _next_ render.

You can also pass a function to `setState`. It lets you update state based on the previous state:

      handleIncreaseAge = () => 

You don’t have to do this, but it’s handy if you want to update state multiple times during the same event.

#### Parameters[](#setstate-parameters "Link for Parameters ")

*   `nextState`: Either an object or a function.
    
    *   If you pass an object as `nextState`, it will be shallowly merged into `this.state`.
    *   If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state and props as arguments, and should return the object to be shallowly merged into `this.state`. React will put your updater function in a queue and re-render your component. During the next render, React will calculate the next state by applying all of the queued updaters to the previous state.
*   **optional** `callback`: If specified, React will call the `callback` you’ve provided after the update is committed.
    

#### Returns[](#setstate-returns "Link for Returns ")

`setState` does not return anything.

#### Caveats[](#setstate-caveats "Link for Caveats ")

*   Think of `setState` as a _request_ rather than an immediate command to update the component. When multiple components update their state in response to an event, React will batch their updates and re-render them together in a single pass at the end of the event. In the rare case that you need to force a particular state update to be applied synchronously, you may wrap it in [`flushSync`,](../react-dom/flushSync.html) but this may hurt performance.
    
*   `setState` does not update `this.state` immediately. This makes reading `this.state` right after calling `setState` a potential pitfall. Instead, use [`componentDidUpdate`](#componentdidupdate) or the setState `callback` argument, either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, you can pass a function to `nextState` as described above.
    

### Note

Calling `setState` in class components is similar to calling a [`set` function](useState.html#setstate) in function components.

[See how to migrate.](#migrating-a-component-with-state-from-a-class-to-a-function)

* * *

### `shouldComponentUpdate(nextProps, nextState, nextContext)`[](#shouldcomponentupdate "Link for this heading")

If you define `shouldComponentUpdate`, React will call it to determine whether a re-render can be skipped.

If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped.

    class Rectangle extends Component 

React calls `shouldComponentUpdate` before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when [`forceUpdate`](#forceupdate) is used.

#### Parameters[](#shouldcomponentupdate-parameters "Link for Parameters ")

*   `nextProps`: The next props that the component is about to render with. Compare `nextProps` to [`this.props`](#props) to determine what changed.
*   `nextState`: The next state that the component is about to render with. Compare `nextState` to [`this.state`](#props) to determine what changed.
*   `nextContext`: The next context that the component is about to render with. Compare `nextContext` to [`this.context`](#context) to determine what changed. Only available if you specify [`static contextType`](#static-contexttype) (modern) or [`static contextTypes`](#static-contexttypes) (legacy).

#### Returns[](#shouldcomponentupdate-returns "Link for Returns ")

Return `true` if you want the component to re-render. That’s the default behavior.

Return `false` to tell React that re-rendering can be skipped.

#### Caveats[](#shouldcomponentupdate-caveats "Link for Caveats ")

*   This method _only_ exists as a performance optimization. If your component breaks without it, fix that first.
    
*   Consider using [`PureComponent`](PureComponent.html) instead of writing `shouldComponentUpdate` by hand. `PureComponent` shallowly compares props and state, and reduces the chance that you’ll skip a necessary update.
    
*   We do not recommend doing deep equality checks or using `JSON.stringify` in `shouldComponentUpdate`. It makes performance unpredictable and dependent on the data structure of every prop and state. In the best case, you risk introducing multi-second stalls to your application, and in the worst case you risk crashing it.
    
*   Returning `false` does not prevent child components from re-rendering when _their_ state changes.
    
*   Returning `false` does not _guarantee_ that the component will not re-render. React will use the return value as a hint but it may still choose to re-render your component if it makes sense to do for other reasons.
    

### Note

Optimizing class components with `shouldComponentUpdate` is similar to optimizing function components with [`memo`.](memo.html) Function components also offer more granular optimization with [`useMemo`.](useMemo.html)

* * *

### `UNSAFE_componentWillMount()`[](#unsafe_componentwillmount "Link for this heading")

If you define `UNSAFE_componentWillMount`, React will call it immediately after the [`constructor`.](#constructor) It only exists for historical reasons and should not be used in any new code. Instead, use one of the alternatives:

*   To initialize state, declare [`state`](#state) as a class field or set `this.state` inside the [`constructor`.](#constructor)
*   If you need to run a side effect or set up a subscription, move that logic to [`componentDidMount`](#componentdidmount) instead.

[See examples of migrating away from unsafe lifecycles.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples)

#### Parameters[](#unsafe_componentwillmount-parameters "Link for Parameters ")

`UNSAFE_componentWillMount` does not take any parameters.

#### Returns[](#unsafe_componentwillmount-returns "Link for Returns ")

`UNSAFE_componentWillMount` should not return anything.

#### Caveats[](#unsafe_componentwillmount-caveats "Link for Caveats ")

*   `UNSAFE_componentWillMount` will not get called if the component implements [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) or [`getSnapshotBeforeUpdate`.](#getsnapshotbeforeupdate)
    
*   Despite its naming, `UNSAFE_componentWillMount` does not guarantee that the component _will_ get mounted if your app uses modern React features like [`Suspense`.](Suspense.html) If a render attempt is suspended (for example, because the code for some child component has not loaded yet), React will throw the in-progress tree away and attempt to construct the component from scratch during the next attempt. This is why this method is “unsafe”. Code that relies on mounting (like adding a subscription) should go into [`componentDidMount`.](#componentdidmount)
    
*   `UNSAFE_componentWillMount` is the only lifecycle method that runs during [server rendering.](../react-dom/server.html) For all practical purposes, it is identical to [`constructor`,](#constructor) so you should use the `constructor` for this type of logic instead.
    

### Note

Calling [`setState`](#setstate) inside `UNSAFE_componentWillMount` in a class component to initialize state is equivalent to passing that state as the initial state to [`useState`](useState.html) in a function component.

* * *

### `UNSAFE_componentWillReceiveProps(nextProps, nextContext)`[](#unsafe_componentwillreceiveprops "Link for this heading")

If you define `UNSAFE_componentWillReceiveProps`, React will call it when the component receives new props. It only exists for historical reasons and should not be used in any new code. Instead, use one of the alternatives:

*   If you need to **run a side effect** (for example, fetch data, run an animation, or reinitialize a subscription) in response to prop changes, move that logic to [`componentDidUpdate`](#componentdidupdate) instead.
*   If you need to **avoid re-computing some data only when a prop changes,** use a [memoization helper](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) instead.
*   If you need to **“reset” some state when a prop changes,** consider either making a component [fully controlled](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a key](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
*   If you need to **“adjust” some state when a prop changes,** check whether you can compute all the necessary information from props alone during rendering. If you can’t, use [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) instead.

[See examples of migrating away from unsafe lifecycles.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#updating-state-based-on-props)

#### Parameters[](#unsafe_componentwillreceiveprops-parameters "Link for Parameters ")

*   `nextProps`: The next props that the component is about to receive from its parent component. Compare `nextProps` to [`this.props`](#props) to determine what changed.
*   `nextContext`: The next props that the component is about to receive from the closest provider. Compare `nextContext` to [`this.context`](#context) to determine what changed. Only available if you specify [`static contextType`](#static-contexttype) (modern) or [`static contextTypes`](#static-contexttypes) (legacy).

#### Returns[](#unsafe_componentwillreceiveprops-returns "Link for Returns ")

`UNSAFE_componentWillReceiveProps` should not return anything.

#### Caveats[](#unsafe_componentwillreceiveprops-caveats "Link for Caveats ")

*   `UNSAFE_componentWillReceiveProps` will not get called if the component implements [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) or [`getSnapshotBeforeUpdate`.](#getsnapshotbeforeupdate)
    
*   Despite its naming, `UNSAFE_componentWillReceiveProps` does not guarantee that the component _will_ receive those props if your app uses modern React features like [`Suspense`.](Suspense.html) If a render attempt is suspended (for example, because the code for some child component has not loaded yet), React will throw the in-progress tree away and attempt to construct the component from scratch during the next attempt. By the time of the next render attempt, the props might be different. This is why this method is “unsafe”. Code that should run only for committed updates (like resetting a subscription) should go into [`componentDidUpdate`.](#componentdidupdate)
    
*   `UNSAFE_componentWillReceiveProps` does not mean that the component has received _different_ props than the last time. You need to compare `nextProps` and `this.props` yourself to check if something changed.
    
*   React doesn’t call `UNSAFE_componentWillReceiveProps` with initial props during mounting. It only calls this method if some of component’s props are going to be updated. For example, calling [`setState`](#setstate) doesn’t generally trigger `UNSAFE_componentWillReceiveProps` inside the same component.
    

### Note

Calling [`setState`](#setstate) inside `UNSAFE_componentWillReceiveProps` in a class component to “adjust” state is equivalent to [calling the `set` function from `useState` during rendering](useState.html#storing-information-from-previous-renders) in a function component.

* * *

### `UNSAFE_componentWillUpdate(nextProps, nextState)`[](#unsafe_componentwillupdate "Link for this heading")

If you define `UNSAFE_componentWillUpdate`, React will call it before rendering with the new props or state. It only exists for historical reasons and should not be used in any new code. Instead, use one of the alternatives:

*   If you need to run a side effect (for example, fetch data, run an animation, or reinitialize a subscription) in response to prop or state changes, move that logic to [`componentDidUpdate`](#componentdidupdate) instead.
*   If you need to read some information from the DOM (for example, to save the current scroll position) so that you can use it in [`componentDidUpdate`](#componentdidupdate) later, read it inside [`getSnapshotBeforeUpdate`](#getsnapshotbeforeupdate) instead.

[See examples of migrating away from unsafe lifecycles.](https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples)

#### Parameters[](#unsafe_componentwillupdate-parameters "Link for Parameters ")

*   `nextProps`: The next props that the component is about to render with. Compare `nextProps` to [`this.props`](#props) to determine what changed.
*   `nextState`: The next state that the component is about to render with. Compare `nextState` to [`this.state`](#state) to determine what changed.

#### Returns[](#unsafe_componentwillupdate-returns "Link for Returns ")

`UNSAFE_componentWillUpdate` should not return anything.

#### Caveats[](#unsafe_componentwillupdate-caveats "Link for Caveats ")

*   `UNSAFE_componentWillUpdate` will not get called if [`shouldComponentUpdate`](#shouldcomponentupdate) is defined and returns `false`.
    
*   `UNSAFE_componentWillUpdate` will not get called if the component implements [`static getDerivedStateFromProps`](#static-getderivedstatefromprops) or [`getSnapshotBeforeUpdate`.](#getsnapshotbeforeupdate)
    
*   It’s not supported to call [`setState`](#setstate) (or any method that leads to `setState` being called, like dispatching a Redux action) during `componentWillUpdate`.
    
*   Despite its naming, `UNSAFE_componentWillUpdate` does not guarantee that the component _will_ update if your app uses modern React features like [`Suspense`.](Suspense.html) If a render attempt is suspended (for example, because the code for some child component has not loaded yet), React will throw the in-progress tree away and attempt to construct the component from scratch during the next attempt. By the time of the next render attempt, the props and state might be different. This is why this method is “unsafe”. Code that should run only for committed updates (like resetting a subscription) should go into [`componentDidUpdate`.](#componentdidupdate)
    
*   `UNSAFE_componentWillUpdate` does not mean that the component has received _different_ props or state than the last time. You need to compare `nextProps` with `this.props` and `nextState` with `this.state` yourself to check if something changed.
    
*   React doesn’t call `UNSAFE_componentWillUpdate` with initial props and state during mounting.
    

### Note

There is no direct equivalent to `UNSAFE_componentWillUpdate` in function components.

* * *

### `static childContextTypes`[](#static-childcontexttypes "Link for this heading")

### Deprecated

This API will be removed in a future major version of React. [Use `static contextType` instead.](#static-contexttype)

Lets you specify which [legacy context](https://reactjs.org/docs/legacy-context.html) is provided by this component.

* * *

### `static contextTypes`[](#static-contexttypes "Link for this heading")

### Deprecated

This API will be removed in a future major version of React. [Use `static contextType` instead.](#static-contexttype)

Lets you specify which [legacy context](https://reactjs.org/docs/legacy-context.html) is consumed by this component.

* * *

### `static contextType`[](#static-contexttype "Link for this heading")

If you want to read [`this.context`](#context-instance-field) from your class component, you must specify which context it needs to read. The context you specify as the `static contextType` must be a value previously created by [`createContext`.](createContext.html)

    class Button extends Component 

### Note

Reading `this.context` in class components is equivalent to [`useContext`](useContext.html) in function components.

[See how to migrate.](#migrating-a-component-with-context-from-a-class-to-a-function)

* * *

### `static defaultProps`[](#static-defaultprops "Link for this heading")

You can define `static defaultProps` to set the default props for the class. They will be used for `undefined` and missing props, but not for `null` props.

For example, here is how you define that the `color` prop should default to `'blue'`:

    class Button extends Component 

If the `color` prop is not provided or is `undefined`, it will be set by default to `'blue'`:

    <>    <Button color="red" /></>

### Note

Defining `defaultProps` in class components is similar to using [default values](../../learn/passing-props-to-a-component.html#specifying-a-default-value-for-a-prop) in function components.

* * *

### `static propTypes`[](#static-proptypes "Link for this heading")

You can define `static propTypes` together with the [`prop-types`](https://www.npmjs.com/package/prop-types) library to declare the types of the props accepted by your component. These types will be checked during rendering and in development only.

    import PropTypes from 'prop-types';class Greeting extends React.Component 

### Note

We recommend using [TypeScript](https://www.typescriptlang.org/) instead of checking prop types at runtime.

* * *

### `static getDerivedStateFromError(error)`[](#static-getderivedstatefromerror "Link for this heading")

If you define `static getDerivedStateFromError`, React will call it when a child component (including distant children) throws an error during rendering. This lets you display an error message instead of clearing the UI.

Typically, it is used together with [`componentDidCatch`](#componentDidCatch) which lets you send the error report to some analytics service. A component with these methods is called an _error boundary._

[See an example.](#catching-rendering-errors-with-an-error-boundary)

#### Parameters[](#static-getderivedstatefromerror-parameters "Link for Parameters ")

*   `error`: The error that was thrown. In practice, it will usually be an instance of [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) but this is not guaranteed because JavaScript allows to [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) any value, including strings or even `null`.

#### Returns[](#static-getderivedstatefromerror-returns "Link for Returns ")

`static getDerivedStateFromError` should return the state telling the component to display the error message.

#### Caveats[](#static-getderivedstatefromerror-caveats "Link for Caveats ")

*   `static getDerivedStateFromError` should be a pure function. If you want to perform a side effect (for example, to call an analytics service), you need to also implement [`componentDidCatch`.](#componentdidcatch)

### Note

There is no direct equivalent for `static getDerivedStateFromError` in function components yet. If you’d like to avoid creating class components, write a single `ErrorBoundary` component like above and use it throughout your app. Alternatively, use the [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) package which does that.

* * *

### `static getDerivedStateFromProps(props, state)`[](#static-getderivedstatefromprops "Link for this heading")

If you define `static getDerivedStateFromProps`, React will call it right before calling [`render`,](#render) both on the initial mount and on subsequent updates. It should return an object to update the state, or `null` to update nothing.

This method exists for [rare use cases](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) where the state depends on changes in props over time. For example, this `Form` component resets the `email` state when the `userID` prop changes:

    class Form extends Component 

Note that this pattern requires you to keep a previous value of the prop (like `userID`) in state (like `prevUserID`).

### Pitfall

Deriving state leads to verbose code and makes your components difficult to think about. [Make sure you’re familiar with simpler alternatives:](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html)

*   If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) method instead.
*   If you want to **re-compute some data only when a prop changes,** [use a memoization helper instead.](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)
*   If you want to **“reset” some state when a prop changes,** consider either making a component [fully controlled](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a key](https://legacy.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.

#### Parameters[](#static-getderivedstatefromprops-parameters "Link for Parameters ")

*   `props`: The next props that the component is about to render with.
*   `state`: The next state that the component is about to render with.

#### Returns[](#static-getderivedstatefromprops-returns "Link for Returns ")

`static getDerivedStateFromProps` return an object to update the state, or `null` to update nothing.

#### Caveats[](#static-getderivedstatefromprops-caveats "Link for Caveats ")

*   This method is fired on _every_ render, regardless of the cause. This is different from [`UNSAFE_componentWillReceiveProps`](#unsafe_cmoponentwillreceiveprops), which only fires when the parent causes a re-render and not as a result of a local `setState`.
    
*   This method doesn’t have access to the component instance. If you’d like, you can reuse some code between `static getDerivedStateFromProps` and the other class methods by extracting pure functions of the component props and state outside the class definition.
    

### Note

Implementing `static getDerivedStateFromProps` in a class component is equivalent to [calling the `set` function from `useState` during rendering](useState.html#storing-information-from-previous-renders) in a function component.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Defining a class component[](#defining-a-class-component "Link for Defining a class component ")

To define a React component as a class, extend the built-in `Component` class and define a [`render` method:](#render)

    import 

React will call your [`render`](#render) method whenever it needs to figure out what to display on the screen. Usually, you will return some [JSX](../../learn/writing-markup-with-jsx.html) from it. Your `render` method should be a [pure function:](https://en.wikipedia.org/wiki/Pure_function) it should only calculate the JSX.

Similarly to [function components,](../../learn/your-first-component.html#defining-a-component) a class component can [receive information by props](../../learn/your-first-component.html#defining-a-component) from its parent component. However, the syntax for reading props is different. For example, if the parent component renders `<Greeting name="Taylor" />`, then you can read the `name` prop from [`this.props`](#props), like `this.props.name`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

class Greeting extends Component {
  render() {
    return <h1\>Hello, !</h1\>;
  }
}

export default function App() {
  return (
    <\>
      <Greeting name\="Sara" />
      <Greeting name\="Cahal" />
      <Greeting name\="Edite" />
    </\>
  );
}

Show more

Note that Hooks (functions starting with `use`, like [`useState`](useState.html)) are not supported inside class components.

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#migrating-a-simple-component-from-a-class-to-a-function)

* * *

### Adding state to a class component[](#adding-state-to-a-class-component "Link for Adding state to a class component ")

To add [state](../../learn/state-a-components-memory.html) to a class, assign an object to a property called [`state`](#state). To update state, call [`this.setState`](#setstate).

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default class Counter extends Component {
  state = {
    name: 'Taylor',
    age: 42,
  };

  handleNameChange = (e) \=> {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange = () \=> {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <\>
        <input
          value\=
          onChange\=
        />
        <button onClick\=\>
          Increment age
        </button\>
        <p\>Hello, .</p\>
      </\>
    );
  }
}

Show more

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#migrating-a-component-with-state-from-a-class-to-a-function)

* * *

### Adding lifecycle methods to a class component[](#adding-lifecycle-methods-to-a-class-component "Link for Adding lifecycle methods to a class component ")

There are a few special methods you can define on your class.

If you define the [`componentDidMount`](#componentdidmount) method, React will call it when your component is added _(mounted)_ to the screen. React will call [`componentDidUpdate`](#componentdidupdate) after your component re-renders due to changed props or state. React will call [`componentWillUnmount`](#componentwillunmount) after your component has been removed _(unmounted)_ from the screen.

If you implement `componentDidMount`, you usually need to implement all three lifecycles to avoid bugs. For example, if `componentDidMount` reads some state or props, you also have to implement `componentDidUpdate` to handle their changes, and `componentWillUnmount` to clean up whatever `componentDidMount` was doing.

For example, this `ChatRoom` component keeps a chat connection synchronized with props and state:

App.jsChatRoom.jschat.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  setupConnection() {
    this.connection = createConnection(
      this.state.serverUrl,
      this.props.roomId
    );
    this.connection.connect();    
  }

  destroyConnection() {
    this.connection.disconnect();
    this.connection = null;
  }

  render() {
    return (
      <\>
        <label\>
          Server URL:
          <input
            value\=
            onChange\={e \=> {
              this.setState({
                serverUrl: e.target.value
              });
            }}
          />
        </label\>
        <h1\>Welcome to the  room!</h1\>
      </\>
    );
  }
}

Show more

Note that in development when [Strict Mode](StrictMode.html) is on, React will call `componentDidMount`, immediately call `componentWillUnmount`, and then call `componentDidMount` again. This helps you notice if you forgot to implement `componentWillUnmount` or if its logic doesn’t fully “mirror” what `componentDidMount` does.

### Pitfall

We recommend defining components as functions instead of classes. [See how to migrate.](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)

* * *

### Catching rendering errors with an error boundary[](#catching-rendering-errors-with-an-error-boundary "Link for Catching rendering errors with an error boundary ")

By default, if your application throws an error during rendering, React will remove its UI from the screen. To prevent this, you can wrap a part of your UI into an _error boundary_. An error boundary is a special component that lets you display some fallback UI instead of the part that crashed—for example, an error message.

To implement an error boundary component, you need to provide [`static getDerivedStateFromError`](#static-getderivedstatefromerror) which lets you update state in response to an error and display an error message to the user. You can also optionally implement [`componentDidCatch`](#componentdidcatch) to add some extra logic, for example, to log the error to an analytics service.

    class ErrorBoundary extends React.Component 

Then you can wrap a part of your component tree with it:

    <ErrorBoundary fallback=>  <Profile /></ErrorBoundary>

If `Profile` or its child component throws an error, `ErrorBoundary` will “catch” that error, display a fallback UI with the error message you’ve provided, and send a production error report to your error reporting service.

You don’t need to wrap every component into a separate error boundary. When you think about the [granularity of error boundaries,](https://aweary.dev/fault-tolerance-react/) consider where it makes sense to display an error message. For example, in a messaging app, it makes sense to place an error boundary around the list of conversations. It also makes sense to place one around every individual message. However, it wouldn’t make sense to place a boundary around every avatar.

### Note

There is currently no way to write an error boundary as a function component. However, you don’t have to write the error boundary class yourself. For example, you can use [`react-error-boundary`](https://github.com/bvaughn/react-error-boundary) instead.

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Migrating a simple component from a class to a function[](#migrating-a-simple-component-from-a-class-to-a-function "Link for Migrating a simple component from a class to a function ")

Typically, you will [define components as functions](../../learn/your-first-component.html#defining-a-component) instead.

For example, suppose you’re converting this `Greeting` class component to a function:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

class Greeting extends Component {
  render() {
    return <h1\>Hello, !</h1\>;
  }
}

export default function App() {
  return (
    <\>
      <Greeting name\="Sara" />
      <Greeting name\="Cahal" />
      <Greeting name\="Edite" />
    </\>
  );
}

Show more

Define a function called `Greeting`. This is where you will move the body of your `render` function.

    function Greeting() 

Instead of `this.props.name`, define the `name` prop [using the destructuring syntax](../../learn/passing-props-to-a-component.html) and read it directly:

    function Greeting(

Here is a complete example:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Greeting() {
  return <h1\>Hello, !</h1\>;
}

export default function App() {
  return (
    <\>
      <Greeting name\="Sara" />
      <Greeting name\="Cahal" />
      <Greeting name\="Edite" />
    </\>
  );
}

* * *

### Migrating a component with state from a class to a function[](#migrating-a-component-with-state-from-a-class-to-a-function "Link for Migrating a component with state from a class to a function ")

Suppose you’re converting this `Counter` class component to a function:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default class Counter extends Component {
  state = {
    name: 'Taylor',
    age: 42,
  };

  handleNameChange = (e) \=> {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange = (e) \=> {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <\>
        <input
          value\=
          onChange\=
        />
        <button onClick\=\>
          Increment age
        </button\>
        <p\>Hello, .</p\>
      </\>
    );
  }
}

Show more

Start by declaring a function with the necessary [state variables:](useState.html#adding-state-to-a-component)

    import  from 'react';function Counter() {  const [name, setName] = useState('Taylor');  const [age, setAge] = useState(42);  // ...

Next, convert the event handlers:

    function Counter()   // ...

Finally, replace all references starting with `this` with the variables and functions you defined in your component. For example, replace `this.state.age` with `age`, and replace `this.handleNameChange` with `handleNameChange`.

Here is a fully converted component:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[name, setName\] = useState('Taylor');
  const \[age, setAge\] = useState(42);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleAgeChange() {
    setAge(age + 1);
  }

  return (
    <\>
      <input
        value\=
        onChange\=
      />
      <button onClick\=\>
        Increment age
      </button\>
      <p\>Hello, .</p\>
    </\>
  )
}

Show more

* * *

### Migrating a component with lifecycle methods from a class to a function[](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function "Link for Migrating a component with lifecycle methods from a class to a function ")

Suppose you’re converting this `ChatRoom` class component with lifecycle methods to a function:

App.jsChatRoom.jschat.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  };

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.roomId !== prevProps.roomId ||
      this.state.serverUrl !== prevState.serverUrl
    ) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  setupConnection() {
    this.connection = createConnection(
      this.state.serverUrl,
      this.props.roomId
    );
    this.connection.connect();    
  }

  destroyConnection() {
    this.connection.disconnect();
    this.connection = null;
  }

  render() {
    return (
      <\>
        <label\>
          Server URL:
          <input
            value\=
            onChange\={e \=> {
              this.setState({
                serverUrl: e.target.value
              });
            }}
          />
        </label\>
        <h1\>Welcome to the  room!</h1\>
      </\>
    );
  }
}

Show more

First, verify that your [`componentWillUnmount`](#componentwillunmount) does the opposite of [`componentDidMount`.](#componentdidmount) In the above example, that’s true: it disconnects the connection that `componentDidMount` sets up. If such logic is missing, add it first.

Next, verify that your [`componentDidUpdate`](#componentdidupdate) method handles changes to any props and state you’re using in `componentDidMount`. In the above example, `componentDidMount` calls `setupConnection` which reads `this.state.serverUrl` and `this.props.roomId`. This is why `componentDidUpdate` checks whether `this.state.serverUrl` and `this.props.roomId` have changed, and resets the connection if they did. If your `componentDidUpdate` logic is missing or doesn’t handle changes to all relevant props and state, fix that first.

In the above example, the logic inside the lifecycle methods connects the component to a system outside of React (a chat server). To connect a component to an external system, [describe this logic as a single Effect:](useEffect.html#connecting-to-an-external-system)

    import 

This [`useEffect`](useEffect.html) call is equivalent to the logic in the lifecycle methods above. If your lifecycle methods do multiple unrelated things, [split them into multiple independent Effects.](../../learn/removing-effect-dependencies.html#is-your-effect-doing-several-unrelated-things) Here is a complete example you can play with:

App.jsChatRoom.jschat.js

ChatRoom.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

export default function ChatRoom() {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> {
      connection.disconnect();
    };
  }, \[roomId, serverUrl\]);

  return (
    <\>
      <label\>
        Server URL:
        <input
          value\=
          onChange\=
        />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

Show more

### Note

If your component does not synchronize with any external systems, [you might not need an Effect.](../../learn/you-might-not-need-an-effect.html)

* * *

### Migrating a component with context from a class to a function[](#migrating-a-component-with-context-from-a-class-to-a-function "Link for Migrating a component with context from a class to a function ")

In this example, the `Panel` and `Button` class components read [context](../../learn/passing-data-deeply-with-context.html) from [`this.context`:](#context)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

class Panel extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'panel-' + theme;
    return (
      <section className\=\>
        <h1\></h1\>
        
      </section\>
    );    
  }
}

class Button extends Component {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    const className = 'button-' + theme;
    return (
      <button className\=\>
        
      </button\>
    );
  }
}

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
    </Panel\>
  );
}

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

Show more

When you convert them to function components, replace `this.context` with [`useContext`](useContext.html) calls:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const ThemeContext = createContext(null);

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

function Form() {
  return (
    <Panel title\="Welcome"\>
      <Button\>Sign up</Button\>
      <Button\>Log in</Button\>
    </Panel\>
  );
}

export default function MyApp() {
  return (
    <ThemeContext.Provider value\="dark"\>
      <Form />
    </ThemeContext.Provider\>
  )
}

Show more

[PreviouscloneElement](cloneElement.html)[NextcreateElement](createElement.html)

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
*   [`Component`](#component)
*   [`context`](#context)
*   [`props`](#props)
*   [`refs`](#refs)
*   [`state`](#state)
*   [`constructor(props)`](#constructor)
*   [`componentDidCatch(error, info)`](#componentdidcatch)
*   [`componentDidMount()`](#componentdidmount)
*   [`componentDidUpdate(prevProps, prevState, snapshot?)`](#componentdidupdate)
*   [`componentWillMount()`](#componentwillmount)
*   [`componentWillReceiveProps(nextProps)`](#componentwillreceiveprops)
*   [`componentWillUpdate(nextProps, nextState)`](#componentwillupdate)
*   [`componentWillUnmount()`](#componentwillunmount)
*   [`forceUpdate(callback?)`](#forceupdate)
*   [`getChildContext()`](#getchildcontext)
*   [`getSnapshotBeforeUpdate(prevProps, prevState)`](#getsnapshotbeforeupdate)
*   [`render()`](#render)
*   [`setState(nextState, callback?)`](#setstate)
*   [`shouldComponentUpdate(nextProps, nextState, nextContext)`](#shouldcomponentupdate)
*   [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)
*   [`UNSAFE_componentWillReceiveProps(nextProps, nextContext)`](#unsafe_componentwillreceiveprops)
*   [`UNSAFE_componentWillUpdate(nextProps, nextState)`](#unsafe_componentwillupdate)
*   [`static childContextTypes`](#static-childcontexttypes)
*   [`static contextTypes`](#static-contexttypes)
*   [`static contextType`](#static-contexttype)
*   [`static defaultProps`](#static-defaultprops)
*   [`static propTypes`](#static-proptypes)
*   [`static getDerivedStateFromError(error)`](#static-getderivedstatefromerror)
*   [`static getDerivedStateFromProps(props, state)`](#static-getderivedstatefromprops)
*   [Usage](#usage)
*   [Defining a class component](#defining-a-class-component)
*   [Adding state to a class component](#adding-state-to-a-class-component)
*   [Adding lifecycle methods to a class component](#adding-lifecycle-methods-to-a-class-component)
*   [Catching rendering errors with an error boundary](#catching-rendering-errors-with-an-error-boundary)
*   [Alternatives](#alternatives)
*   [Migrating a simple component from a class to a function](#migrating-a-simple-component-from-a-class-to-a-function)
*   [Migrating a component with state from a class to a function](#migrating-a-component-with-state-from-a-class-to-a-function)
*   [Migrating a component with lifecycle methods from a class to a function](#migrating-a-component-with-lifecycle-methods-from-a-class-to-a-function)
*   [Migrating a component with context from a class to a function](#migrating-a-component-with-context-from-a-class-to-a-function)

