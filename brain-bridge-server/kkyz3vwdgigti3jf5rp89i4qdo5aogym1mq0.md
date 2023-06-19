unmountComponentAtNode – React

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

unmountComponentAtNode[](#undefined "Link for this heading")
============================================================

### Deprecated

This API will be removed in a future major version of React.

In React 18, `unmountComponentAtNode` was replaced by [`root.unmount()`](client/createRoot.html#root-unmount).

`unmountComponentAtNode` removes a mounted React component from the DOM.

    unmountComponentAtNode(domNode)

*   [Reference](#reference)
    *   [`unmountComponentAtNode(domNode)`](#unmountcomponentatnode)
*   [Usage](#usage)
    *   [Removing a React app from a DOM element](#removing-a-react-app-from-a-dom-element)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `unmountComponentAtNode(domNode)`[](#unmountcomponentatnode "Link for this heading")

Call `unmountComponentAtNode` to remove a mounted React component from the DOM and clean up its event handlers and state.

    import  from 'react-dom';const domNode = document.getElementById('root');render(<App />, domNode);unmountComponentAtNode(domNode);

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `domNode`: A [DOM element.](https://developer.mozilla.org/en-US/docs/Web/API/Element) React will remove a mounted React component from this element.

#### Returns[](#returns "Link for Returns ")

`unmountComponentAtNode` returns `true` if a component was unmounted and `false` otherwise.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

Call `unmountComponentAtNode` to remove a mounted React component from a browser DOM node and clean up its event handlers and state.

    import  from 'react-dom';import App from './App.js';const rootNode = document.getElementById('root');render(<App />, rootNode);// ...unmountComponentAtNode(rootNode);

### Removing a React app from a DOM element[](#removing-a-react-app-from-a-dom-element "Link for Removing a React app from a DOM element ")

Occasionally, you may want to “sprinkle” React on an existing page, or a page that is not fully written in React. In those cases, you may need to “stop” the React app, by removing all of the UI, state, and listeners from the DOM node it was rendered to.

In this example, clicking “Render React App” will render a React app. Click “Unmount React App” to destroy it:

index.htmlindex.jsApp.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import './styles.css';
import  from 'react-dom';
import App from './App.js';

const domNode = document.getElementById('root');

document.getElementById('render').addEventListener('click', () \=> {
  render(<App />, domNode);
});

document.getElementById('unmount').addEventListener('click', () \=> {
  unmountComponentAtNode(domNode);
});

[Previousrender](render.html)[NextClient APIs](client.html)

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
*   [`unmountComponentAtNode(domNode)`](#unmountcomponentatnode)
*   [Usage](#usage)
*   [Removing a React app from a DOM element](#removing-a-react-app-from-a-dom-element)

