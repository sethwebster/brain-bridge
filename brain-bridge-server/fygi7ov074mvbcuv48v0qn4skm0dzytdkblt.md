render – React

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
    
    *   [useCallback](../react/useCallback.html "useCallback")
    *   [useContext](../react/useContext.html "useContext")
    *   [useDebugValue](../react/useDebugValue.html "useDebugValue")
    *   [useDeferredValue](../react/useDeferredValue.html "useDeferredValue")
    *   [useEffect](../react/useEffect.html "useEffect")
    *   [useId](../react/useId.html "useId")
    *   [useImperativeHandle](../react/useImperativeHandle.html "useImperativeHandle")
    *   [useInsertionEffect](../react/useInsertionEffect.html "useInsertionEffect")
    *   [useLayoutEffect](../react/useLayoutEffect.html "useLayoutEffect")
    *   [useMemo](../react/useMemo.html "useMemo")
    *   [useReducer](../react/useReducer.html "useReducer")
    *   [useRef](../react/useRef.html "useRef")
    *   [useState](../react/useState.html "useState")
    *   [useSyncExternalStore](../react/useSyncExternalStore.html "useSyncExternalStore")
    *   [useTransition](../react/useTransition.html "useTransition")
    
*   [Components](../react/components.html "Components")
    
    *   [<Fragment> (<>)](../react/Fragment.html "<Fragment> (<>)")
    *   [<Profiler>](../react/Profiler.html "<Profiler>")
    *   [<StrictMode>](../react/StrictMode.html "<StrictMode>")
    *   [<Suspense>](../react/Suspense.html "<Suspense>")
    
*   [APIs](../react/apis.html "APIs")
    
    *   [createContext](../react/createContext.html "createContext")
    *   [forwardRef](../react/forwardRef.html "forwardRef")
    *   [lazy](../react/lazy.html "lazy")
    *   [memo](../react/memo.html "memo")
    *   [startTransition](../react/startTransition.html "startTransition")
    

### react-dom@18.2.0

*   [Components](components.html "Components")
    
    *   [Common (e.g. <div>)](components/common.html "Common (e.g. <div>)")
    *   [<input>](components/input.html "<input>")
    *   [<option>](components/option.html "<option>")
    *   [<progress>](components/progress.html "<progress>")
    *   [<select>](components/select.html "<select>")
    *   [<textarea>](components/textarea.html "<textarea>")
    
*   [APIs](../react-dom.html "APIs")
    
    *   [createPortal](createPortal.html "createPortal")
    *   [flushSync](flushSync.html "flushSync")
    *   [findDOMNode](findDOMNode.html "findDOMNode")
    *   [hydrate](hydrate.html "hydrate")
    *   [render](render.html "render")
    *   [unmountComponentAtNode](unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](client.html "Client APIs")
    
    *   [createRoot](client/createRoot.html "createRoot")
    *   [hydrateRoot](client/hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](server.html "Server APIs")
    
    *   [renderToNodeStream](server/renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](server/renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](server/renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](server/renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](server/renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](server/renderToString.html "renderToString")
    

### Legacy APIs

*   [Legacy React APIs](../react/legacy.html "Legacy React APIs")
    
    *   [Children](../react/Children.html "Children")
    *   [cloneElement](../react/cloneElement.html "cloneElement")
    *   [Component](../react/Component.html "Component")
    *   [createElement](../react/createElement.html "createElement")
    *   [createFactory](../react/createFactory.html "createFactory")
    *   [createRef](../react/createRef.html "createRef")
    *   [isValidElement](../react/isValidElement.html "isValidElement")
    *   [PureComponent](../react/PureComponent.html "PureComponent")
    

Is this page useful?

[API Reference](../react.html)

[APIs](../react-dom.html)

render[](#undefined "Link for this heading")
============================================

### Deprecated

This API will be removed in a future major version of React.

In React 18, `render` was replaced by [`createRoot`.](client/createRoot.html) Using `render` in React 18 will warn that your app will behave as if it’s running React 17. Learn more [here.](../../blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis)

`render` renders a piece of [JSX](../../learn/writing-markup-with-jsx.html) (“React node”) into a browser DOM node.

    render(reactNode, domNode, callback?)

*   [Reference](#reference)
    *   [`render(reactNode, domNode, callback?)`](#render)
*   [Usage](#usage)
    *   [Rendering the root component](#rendering-the-root-component)
    *   [Rendering multiple roots](#rendering-multiple-roots)
    *   [Updating the rendered tree](#updating-the-rendered-tree)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `render(reactNode, domNode, callback?)`[](#render "Link for this heading")

Call `render` to display a React component inside a browser DOM element.

    import  from 'react-dom';const domNode = document.getElementById('root');render(<App />, domNode);

React will display `<App />` in the `domNode`, and take over managing the DOM inside it.

An app fully built with React will usually only have one `render` call with its root component. A page that uses “sprinkles” of React for parts of the page may have as many `render` calls as needed.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `reactNode`: A _React node_ that you want to display. This will usually be a piece of JSX like `<App />`, but you can also pass a React element constructed with [`createElement()`](../react/createElement.html), a string, a number, `null`, or `undefined`.
    
*   `domNode`: A [DOM element.](https://developer.mozilla.org/en-US/docs/Web/API/Element) React will display the `reactNode` you pass inside this DOM element. From this moment, React will manage the DOM inside the `domNode` and update it when your React tree changes.
    
*   **optional** `callback`: A function. If passed, React will call it after your component is placed into the DOM.
    

#### Returns[](#returns "Link for Returns ")

`render` usually returns `null`. However, if the `reactNode` you pass is a _class component_, then it will return an instance of that component.

#### Caveats[](#caveats "Link for Caveats ")

*   In React 18, `render` was replaced by [`createRoot`.](client/createRoot.html) Please use `createRoot` for React 18 and beyond.
    
*   The first time you call `render`, React will clear all the existing HTML content inside the `domNode` before rendering the React component into it. If your `domNode` contains HTML generated by React on the server or during the build, use [`hydrate()`](hydrate.html) instead, which attaches the event handlers to the existing HTML.
    
*   If you call `render` on the same `domNode` more than once, React will update the DOM as necessary to reflect the latest JSX you passed. React will decide which parts of the DOM can be reused and which need to be recreated by [“matching it up”](../../learn/preserving-and-resetting-state.html) with the previously rendered tree. Calling `render` on the same `domNode` again is similar to calling the [`set` function](../react/useState.html#setstate) on the root component: React avoids unnecessary DOM updates.
    
*   If your app is fully built with React, you’ll likely have only one `render` call in your app. (If you use a framework, it might do this call for you.) When you want to render a piece of JSX in a different part of the DOM tree that isn’t a child of your component (for example, a modal or a tooltip), use [`createPortal`](createPortal.html) instead of `render`.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

Call `render` to display a React component inside a browser DOM node.

    import  from 'react-dom';import App from './App.js';render(<App />, document.getElementById('root'));

### Rendering the root component[](#rendering-the-root-component "Link for Rendering the root component ")

In apps fully built with React, **you will usually only do this once at startup**—to render the “root” component.

index.jsApp.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import './styles.css';
import  from 'react-dom';
import App from './App.js';

render(<App />, document.getElementById('root'));

Usually you shouldn’t need to call `render` again or to call it in more places. From this point on, React will be managing the DOM of your application. To update the UI, your components will [use state.](../react/useState.html)

* * *

### Rendering multiple roots[](#rendering-multiple-roots "Link for Rendering multiple roots ")

If your page [isn’t fully built with React](../../learn/add-react-to-an-existing-project.html#using-react-for-a-part-of-your-existing-page), call `render` for each top-level piece of UI managed by React.

index.htmlindex.jsComponents.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import './styles.css';
import  from 'react-dom';
import  from './Components.js';

render(
  <Navigation />,
  document.getElementById('navigation')
);

render(
  <Comments />,
  document.getElementById('comments')
);

You can destroy the rendered trees with [`unmountComponentAtNode()`.](unmountComponentAtNode.html)

* * *

### Updating the rendered tree[](#updating-the-rendered-tree "Link for Updating the rendered tree ")

You can call `render` more than once on the same DOM node. As long as the component tree structure matches up with what was previously rendered, React will [preserve the state.](../../learn/preserving-and-resetting-state.html) Notice how you can type in the input, which means that the updates from repeated `render` calls every second are not destructive:

index.jsApp.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom';
import './styles.css';
import App from './App.js';

let i = 0;
setInterval(() \=> {
  render(
    <App counter\= />,
    document.getElementById('root')
  );
  i++;
}, 1000);

It is uncommon to call `render` multiple times. Usually, you’ll [update state](../react/useState.html) inside your components instead.

[Previoushydrate](hydrate.html)[NextunmountComponentAtNode](unmountComponentAtNode.html)

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
*   [`render(reactNode, domNode, callback?)`](#render)
*   [Usage](#usage)
*   [Rendering the root component](#rendering-the-root-component)
*   [Rendering multiple roots](#rendering-multiple-roots)
*   [Updating the rendered tree](#updating-the-rendered-tree)

