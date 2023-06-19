lazy – React

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

lazy[](#undefined "Link for this heading")
==========================================

`lazy` lets you defer loading component’s code until it is rendered for the first time.

    const SomeComponent = lazy(load)

*   [Reference](#reference)
    *   [`lazy(load)`](#lazy)
    *   [`load` function](#load)
*   [Usage](#usage)
    *   [Lazy-loading components with Suspense](#suspense-for-code-splitting)
*   [Troubleshooting](#troubleshooting)
    *   [My `lazy` component’s state gets reset unexpectedly](#my-lazy-components-state-gets-reset-unexpectedly)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `lazy(load)`[](#lazy "Link for this heading")

Call `lazy` outside your components to declare a lazy-loaded React component:

    import  from 'react';const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `load`: A function that returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or another _thenable_ (a Promise-like object with a `then` method). React will not call `load` until the first time you attempt to render the returned component. After React first calls `load`, it will wait for it to resolve, and then render the resolved value as a React component. Both the returned Promise and the Promise’s resolved value will be cached, so React will not call `load` more than once. If the Promise rejects, React will `throw` the rejection reason for the nearest Error Boundary to handle.

#### Returns[](#returns "Link for Returns ")

`lazy` returns a React component you can render in your tree. While the code for the lazy component is still loading, attempting to render it will _suspend._ Use [`<Suspense>`](Suspense.html) to display a loading indicator while it’s loading.

* * *

### `load` function[](#load "Link for this heading")

#### Parameters[](#load-parameters "Link for Parameters ")

`load` receives no parameters.

#### Returns[](#load-returns "Link for Returns ")

You need to return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) or some other _thenable_ (a Promise-like object with a `then` method). It needs to eventually resolve to a valid React component type, such as a function, [`memo`](memo.html), or a [`forwardRef`](forwardRef.html) component.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Lazy-loading components with Suspense[](#suspense-for-code-splitting "Link for Lazy-loading components with Suspense ")

Usually, you import components with the static [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) declaration:

    import MarkdownPreview from './MarkdownPreview.js';

To defer loading this component’s code until it’s rendered for the first time, replace this import with:

    import  from 'react';const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

This code relies on [dynamic `import()`,](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) which might require support from your bundler or framework.

Now that your component’s code loads on demand, you also need to specify what should be displayed while it is loading. You can do this by wrapping the lazy component or any of its parents into a [`<Suspense>`](Suspense.html) boundary:

    <Suspense fallback=>  <h2>Preview</h2>  <MarkdownPreview /> </Suspense>

In this example, the code for `MarkdownPreview` won’t be loaded until you attempt to render it. If `MarkdownPreview` hasn’t loaded yet, `Loading` will be shown in its place. Try ticking the checkbox:

App.jsLoading.jsMarkdownPreview.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Loading from './Loading.js';

const MarkdownPreview = lazy(() \=> delayForDemo(import('./MarkdownPreview.js')));

export default function MarkdownEditor() {
  const \[showPreview, setShowPreview\] = useState(false);
  const \[markdown, setMarkdown\] = useState('Hello, \*\*world\*\*!');
  return (
    <\>
      <textarea value\= />
      <label\>
        <input type\="checkbox" checked\= />
        Show preview
      </label\>
      <hr />
      {showPreview && (
        <Suspense fallback\=\>
          <h2\>Preview</h2\>
          <MarkdownPreview markdown\= />
        </Suspense\>
      )}
    </\>
  );
}

// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise(resolve \=> {
    setTimeout(resolve, 2000);
  }).then(() \=> promise);
}

Show more

This demo loads with an artificial delay. The next time you untick and tick the checkbox, `Preview` will be cached, so there will be no loading state. To see the loading state again, click “Reset” on the sandbox.

[Learn more about managing loading states with Suspense.](Suspense.html)

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My `lazy` component’s state gets reset unexpectedly[](#my-lazy-components-state-gets-reset-unexpectedly "Link for this heading")

Do not declare `lazy` components _inside_ other components:

    import 

Instead, always declare them at the top level of your module:

    import 

[PreviousforwardRef](forwardRef.html)[Nextmemo](memo.html)

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
*   [`lazy(load)`](#lazy)
*   [`load` function](#load)
*   [Usage](#usage)
*   [Lazy-loading components with Suspense](#suspense-for-code-splitting)
*   [Troubleshooting](#troubleshooting)
*   [My `lazy` component’s state gets reset unexpectedly](#my-lazy-components-state-gets-reset-unexpectedly)

