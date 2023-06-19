createRoot – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../../../index.html)

Search⌘CtrlK

[Learn](../../../learn.html)

[Reference](../../react.html)

[Community](../../../community.html)

[Blog](../../../blog.html)

[](https://github.com/facebook/react/releases)

### react@18.2.0

*   [Hooks](../../react.html "Hooks")
    
    *   [useCallback](../../react/useCallback.html "useCallback")
    *   [useContext](../../react/useContext.html "useContext")
    *   [useDebugValue](../../react/useDebugValue.html "useDebugValue")
    *   [useDeferredValue](../../react/useDeferredValue.html "useDeferredValue")
    *   [useEffect](../../react/useEffect.html "useEffect")
    *   [useId](../../react/useId.html "useId")
    *   [useImperativeHandle](../../react/useImperativeHandle.html "useImperativeHandle")
    *   [useInsertionEffect](../../react/useInsertionEffect.html "useInsertionEffect")
    *   [useLayoutEffect](../../react/useLayoutEffect.html "useLayoutEffect")
    *   [useMemo](../../react/useMemo.html "useMemo")
    *   [useReducer](../../react/useReducer.html "useReducer")
    *   [useRef](../../react/useRef.html "useRef")
    *   [useState](../../react/useState.html "useState")
    *   [useSyncExternalStore](../../react/useSyncExternalStore.html "useSyncExternalStore")
    *   [useTransition](../../react/useTransition.html "useTransition")
    
*   [Components](../../react/components.html "Components")
    
    *   [<Fragment> (<>)](../../react/Fragment.html "<Fragment> (<>)")
    *   [<Profiler>](../../react/Profiler.html "<Profiler>")
    *   [<StrictMode>](../../react/StrictMode.html "<StrictMode>")
    *   [<Suspense>](../../react/Suspense.html "<Suspense>")
    
*   [APIs](../../react/apis.html "APIs")
    
    *   [createContext](../../react/createContext.html "createContext")
    *   [forwardRef](../../react/forwardRef.html "forwardRef")
    *   [lazy](../../react/lazy.html "lazy")
    *   [memo](../../react/memo.html "memo")
    *   [startTransition](../../react/startTransition.html "startTransition")
    

### react-dom@18.2.0

*   [Components](../components.html "Components")
    
    *   [Common (e.g. <div>)](../components/common.html "Common (e.g. <div>)")
    *   [<input>](../components/input.html "<input>")
    *   [<option>](../components/option.html "<option>")
    *   [<progress>](../components/progress.html "<progress>")
    *   [<select>](../components/select.html "<select>")
    *   [<textarea>](../components/textarea.html "<textarea>")
    
*   [APIs](../../react-dom.html "APIs")
    
    *   [createPortal](../createPortal.html "createPortal")
    *   [flushSync](../flushSync.html "flushSync")
    *   [findDOMNode](../findDOMNode.html "findDOMNode")
    *   [hydrate](../hydrate.html "hydrate")
    *   [render](../render.html "render")
    *   [unmountComponentAtNode](../unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](../client.html "Client APIs")
    
    *   [createRoot](createRoot.html "createRoot")
    *   [hydrateRoot](hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](../server.html "Server APIs")
    
    *   [renderToNodeStream](../server/renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](../server/renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](../server/renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](../server/renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](../server/renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](../server/renderToString.html "renderToString")
    

### Legacy APIs

*   [Legacy React APIs](../../react/legacy.html "Legacy React APIs")
    
    *   [Children](../../react/Children.html "Children")
    *   [cloneElement](../../react/cloneElement.html "cloneElement")
    *   [Component](../../react/Component.html "Component")
    *   [createElement](../../react/createElement.html "createElement")
    *   [createFactory](../../react/createFactory.html "createFactory")
    *   [createRef](../../react/createRef.html "createRef")
    *   [isValidElement](../../react/isValidElement.html "isValidElement")
    *   [PureComponent](../../react/PureComponent.html "PureComponent")
    

Is this page useful?

[API Reference](../../react.html)

[Client APIs](../client.html)

createRoot[](#undefined "Link for this heading")
================================================

`createRoot` lets you create a root to display React components inside a browser DOM node.

    const root = createRoot(domNode, options?)

*   [Reference](#reference)
    *   [`createRoot(domNode, options?)`](#createroot)
    *   [`root.render(reactNode)`](#root-render)
    *   [`root.unmount()`](#root-unmount)
*   [Usage](#usage)
    *   [Rendering an app fully built with React](#rendering-an-app-fully-built-with-react)
    *   [Rendering a page partially built with React](#rendering-a-page-partially-built-with-react)
    *   [Updating a root component](#updating-a-root-component)
*   [Troubleshooting](#troubleshooting)
    *   [I’ve created a root, but nothing is displayed](#ive-created-a-root-but-nothing-is-displayed)
    *   [I’m getting an error: “Target container is not a DOM element”](#im-getting-an-error-target-container-is-not-a-dom-element)
    *   [I’m getting an error: “Functions are not valid as a React child.”](#im-getting-an-error-functions-are-not-valid-as-a-react-child)
    *   [My server-rendered HTML gets re-created from scratch](#my-server-rendered-html-gets-re-created-from-scratch)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `createRoot(domNode, options?)`[](#createroot "Link for this heading")

Call `createRoot` to create a React root for displaying content inside a browser DOM element.

    import  from 'react-dom/client';const domNode = document.getElementById('root');const root = createRoot(domNode);

React will create a root for the `domNode`, and take over managing the DOM inside it. After you’ve created a root, you need to call [`root.render`](#root-render) to display a React component inside of it:

    root.render(<App />);

An app fully built with React will usually only have one `createRoot` call for its root component. A page that uses “sprinkles” of React for parts of the page may have as many separate roots as needed.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `domNode`: A [DOM element.](https://developer.mozilla.org/en-US/docs/Web/API/Element) React will create a root for this DOM element and allow you to call functions on the root, such as `render` to display rendered React content.
    
*   **optional** `options`: An object with options for this React root.
    
    *   **optional** `onRecoverableError`: Callback called when React automatically recovers from errors.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](../../react/useId.html) Useful to avoid conflicts when using multiple roots on the same page.

#### Returns[](#returns "Link for Returns ")

`createRoot` returns an object with two methods: [`render`](#root-render) and [`unmount`.](#root-unmount)

#### Caveats[](#caveats "Link for Caveats ")

*   If your app is server-rendered, using `createRoot()` is not supported. Use [`hydrateRoot()`](hydrateRoot.html) instead.
*   You’ll likely have only one `createRoot` call in your app. If you use a framework, it might do this call for you.
*   When you want to render a piece of JSX in a different part of the DOM tree that isn’t a child of your component (for example, a modal or a tooltip), use [`createPortal`](../createPortal.html) instead of `createRoot`.

* * *

### `root.render(reactNode)`[](#root-render "Link for this heading")

Call `root.render` to display a piece of [JSX](../../../learn/writing-markup-with-jsx.html) (“React node”) into the React root’s browser DOM node.

    root.render(<App />);

React will display `<App />` in the `root`, and take over managing the DOM inside it.

[See more examples below.](#usage)

#### Parameters[](#root-render-parameters "Link for Parameters ")

*   `reactNode`: A _React node_ that you want to display. This will usually be a piece of JSX like `<App />`, but you can also pass a React element constructed with [`createElement()`](../../react/createElement.html), a string, a number, `null`, or `undefined`.

#### Returns[](#root-render-returns "Link for Returns ")

`root.render` returns `undefined`.

#### Caveats[](#root-render-caveats "Link for Caveats ")

*   The first time you call `root.render`, React will clear all the existing HTML content inside the React root before rendering the React component into it.
    
*   If your root’s DOM node contains HTML generated by React on the server or during the build, use [`hydrateRoot()`](hydrateRoot.html) instead, which attaches the event handlers to the existing HTML.
    
*   If you call `render` on the same root more than once, React will update the DOM as necessary to reflect the latest JSX you passed. React will decide which parts of the DOM can be reused and which need to be recreated by [“matching it up”](../../../learn/preserving-and-resetting-state.html) with the previously rendered tree. Calling `render` on the same root again is similar to calling the [`set` function](../../react/useState.html#setstate) on the root component: React avoids unnecessary DOM updates.
    

* * *

### `root.unmount()`[](#root-unmount "Link for this heading")

Call `root.unmount` to destroy a rendered tree inside a React root.

    root.unmount();

An app fully built with React will usually not have any calls to `root.unmount`.

This is mostly useful if your React root’s DOM node (or any of its ancestors) may get removed from the DOM by some other code. For example, imagine a jQuery tab panel that removes inactive tabs from the DOM. If a tab gets removed, everything inside it (including the React roots inside) would get removed from the DOM as well. In that case, you need to tell React to “stop” managing the removed root’s content by calling `root.unmount`. Otherwise, the components inside the removed root won’t know to clean up and free up global resources like subscriptions.

Calling `root.unmount` will unmount all the components in the root and “detach” React from the root DOM node, including removing any event handlers or state in the tree.

#### Parameters[](#root-unmount-parameters "Link for Parameters ")

`root.unmount` does not accept any parameters.

#### Returns[](#root-unmount-returns "Link for Returns ")

`root.unmount` returns `undefined`.

#### Caveats[](#root-unmount-caveats "Link for Caveats ")

*   Calling `root.unmount` will unmount all the components in the tree and “detach” React from the root DOM node.
    
*   Once you call `root.unmount` you cannot call `root.render` again on the same root. Attempting to call `root.render` on an unmounted root will throw a “Cannot update an unmounted root” error. However, you can create a new root for the same DOM node after the previous root for that node has been unmounted.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering an app fully built with React[](#rendering-an-app-fully-built-with-react "Link for Rendering an app fully built with React ")

If your app is fully built with React, create a single root for your entire app.

    import  from 'react-dom/client';const root = createRoot(document.getElementById('root'));root.render(<App />);

Usually, you only need to run this code once at startup. It will:

1.  Find the browser DOM node defined in your HTML.
2.  Display the React component for your app inside.

index.htmlindex.jsApp.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom/client';
import App from './App.js';
import './styles.css';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

**If your app is fully built with React, you shouldn’t need to create any more roots, or to call [`root.render`](#root-render) again.**

From this point on, React will manage the DOM of your entire app. To add more components, [nest them inside the `App` component.](../../../learn/importing-and-exporting-components.html) When you need to update the UI, each of your components can do this by [using state.](../../react/useState.html) When you need to display extra content like a modal or a tooltip outside the DOM node, [render it with a portal.](../createPortal.html)

### Note

When your HTML is empty, the user sees a blank page until the app’s JavaScript code loads and runs:

    <div id="root"></div>

This can feel very slow! To solve this, you can generate the initial HTML from your components [on the server or during the build.](../server.html) Then your visitors can read text, see images, and click links before any of the JavaScript code loads. We recommend [using a framework](../../../learn/start-a-new-react-project.html#production-grade-react-frameworks) that does this optimization out of the box. Depending on when it runs, this is called _server-side rendering (SSR)_ or _static site generation (SSG)._

### Pitfall

**Apps using server rendering or static generation must call [`hydrateRoot`](hydrateRoot.html) instead of `createRoot`.** React will then _hydrate_ (reuse) the DOM nodes from your HTML instead of destroying and re-creating them.

* * *

### Rendering a page partially built with React[](#rendering-a-page-partially-built-with-react "Link for Rendering a page partially built with React ")

If your page [isn’t fully built with React](../../../learn/add-react-to-an-existing-project.html#using-react-for-a-part-of-your-existing-page), you can call `createRoot` multiple times to create a root for each top-level piece of UI managed by React. You can display different content in each root by calling [`root.render`.](#root-render)

Here, two different React components are rendered into two DOM nodes defined in the `index.html` file:

index.htmlindex.jsComponents.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import './styles.css';
import  from 'react-dom/client';
import  from './Components.js';

const navDomNode = document.getElementById('navigation');
const navRoot = createRoot(navDomNode); 
navRoot.render(<Navigation />);

const commentDomNode = document.getElementById('comments');
const commentRoot = createRoot(commentDomNode); 
commentRoot.render(<Comments />);

You could also create a new DOM node with [`document.createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) and add it to the document manually.

    const domNode = document.createElement('div');const root = createRoot(domNode); root.render(<Comment />);document.body.appendChild(domNode); // You can add it anywhere in the document

To remove the React tree from the DOM node and clean up all the resources used by it, call [`root.unmount`.](#root-unmount)

    root.unmount();

This is mostly useful if your React components are inside an app written in a different framework.

* * *

### Updating a root component[](#updating-a-root-component "Link for Updating a root component ")

You can call `render` more than once on the same root. As long as the component tree structure matches up with what was previously rendered, React will [preserve the state.](../../../learn/preserving-and-resetting-state.html) Notice how you can type in the input, which means that the updates from repeated `render` calls every second in this example are not destructive:

index.jsApp.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom/client';
import './styles.css';
import App from './App.js';

const root = createRoot(document.getElementById('root'));

let i = 0;
setInterval(() \=> {
  root.render(<App counter\= />);
  i++;
}, 1000);

It is uncommon to call `render` multiple times. Usually, your components will [update state](../../react/useState.html) instead.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I’ve created a root, but nothing is displayed[](#ive-created-a-root-but-nothing-is-displayed "Link for I’ve created a root, but nothing is displayed ")

Make sure you haven’t forgotten to actually _render_ your app into the root:

    import  from 'react-dom/client';import App from './App.js';const root = createRoot(document.getElementById('root'));root.render(<App />);

Until you do that, nothing is displayed.

* * *

### I’m getting an error: “Target container is not a DOM element”[](#im-getting-an-error-target-container-is-not-a-dom-element "Link for I’m getting an error: “Target container is not a DOM element” ")

This error means that whatever you’re passing to `createRoot` is not a DOM node.

If you’re not sure what’s happening, try logging it:

    const domNode = document.getElementById('root');console.log(domNode); // ???const root = createRoot(domNode);root.render(<App />);

For example, if `domNode` is `null`, it means that [`getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) returned `null`. This will happen if there is no node in the document with the given ID at the time of your call. There may be a few reasons for it:

1.  The ID you’re looking for might differ from the ID you used in the HTML file. Check for typos!
2.  Your bundle’s `<script>` tag cannot “see” any DOM nodes that appear _after_ it in the HTML.

Another common way to get this error is to write `createRoot(<App />)` instead of `createRoot(domNode)`.

* * *

### I’m getting an error: “Functions are not valid as a React child.”[](#im-getting-an-error-functions-are-not-valid-as-a-react-child "Link for I’m getting an error: “Functions are not valid as a React child.” ")

This error means that whatever you’re passing to `root.render` is not a React component.

This may happen if you call `root.render` with `Component` instead of `<Component />`:

    // 🚩 Wrong: App is a function, not a Component.root.render(App);// ✅ Correct: <App /> is a component.root.render(<App />);

Or if you pass a function to `root.render`, instead of the result of calling it:

    // 🚩 Wrong: createApp is a function, not a component.root.render(createApp);// ✅ Correct: call createApp to return a component.root.render(createApp());

* * *

### My server-rendered HTML gets re-created from scratch[](#my-server-rendered-html-gets-re-created-from-scratch "Link for My server-rendered HTML gets re-created from scratch ")

If your app is server-rendered and includes the initial HTML generated by React, you might notice that creating a root and calling `root.render` deletes all that HTML, and then re-creates all the DOM nodes from scratch. This can be slower, resets focus and scroll positions, and may lose other user input.

Server-rendered apps must use [`hydrateRoot`](hydrateRoot.html) instead of `createRoot`:

    import  from 'react-dom/client';import App from './App.js';hydrateRoot(  document.getElementById('root'),  <App />);

Note that its API is different. In particular, usually there will be no further `root.render` call.

[PreviousClient APIs](../client.html)[NexthydrateRoot](hydrateRoot.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../../../learn.html)

[Quick Start](../../../learn.html)

[Installation](../../../learn/installation.html)

[Describing the UI](../../../learn/describing-the-ui.html)

[Adding Interactivity](../../../learn/adding-interactivity.html)

[Managing State](../../../learn/managing-state.html)

[Escape Hatches](../../../learn/escape-hatches.html)

[API Reference](../../react.html)

[React APIs](../../react.html)

[React DOM APIs](../../react-dom.html)

[Community](../../../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../../../community/team.html)

[Docs Contributors](../../../community/docs-contributors.html)

[Acknowledgements](../../../community/acknowledgements.html)

More

[Blog](../../../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

On this page
------------

*   [Overview](#)
*   [Reference](#reference)
*   [`createRoot(domNode, options?)`](#createroot)
*   [`root.render(reactNode)`](#root-render)
*   [`root.unmount()`](#root-unmount)
*   [Usage](#usage)
*   [Rendering an app fully built with React](#rendering-an-app-fully-built-with-react)
*   [Rendering a page partially built with React](#rendering-a-page-partially-built-with-react)
*   [Updating a root component](#updating-a-root-component)
*   [Troubleshooting](#troubleshooting)
*   [I’ve created a root, but nothing is displayed](#ive-created-a-root-but-nothing-is-displayed)
*   [I’m getting an error: “Target container is not a DOM element”](#im-getting-an-error-target-container-is-not-a-dom-element)
*   [I’m getting an error: “Functions are not valid as a React child.”](#im-getting-an-error-functions-are-not-valid-as-a-react-child)
*   [My server-rendered HTML gets re-created from scratch](#my-server-rendered-html-gets-re-created-from-scratch)

