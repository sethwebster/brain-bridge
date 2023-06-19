<progress> – React

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
    
    *   [Common (e.g. <div>)](common.html "Common (e.g. <div>)")
    *   [<input>](input.html "<input>")
    *   [<option>](option.html "<option>")
    *   [<progress>](progress.html "<progress>")
    *   [<select>](select.html "<select>")
    *   [<textarea>](textarea.html "<textarea>")
    
*   [APIs](../../react-dom.html "APIs")
    
    *   [createPortal](../createPortal.html "createPortal")
    *   [flushSync](../flushSync.html "flushSync")
    *   [findDOMNode](../findDOMNode.html "findDOMNode")
    *   [hydrate](../hydrate.html "hydrate")
    *   [render](../render.html "render")
    *   [unmountComponentAtNode](../unmountComponentAtNode.html "unmountComponentAtNode")
    
*   [Client APIs](../client.html "Client APIs")
    
    *   [createRoot](../client/createRoot.html "createRoot")
    *   [hydrateRoot](../client/hydrateRoot.html "hydrateRoot")
    
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

[Components](../components.html)

<progress>[](#undefined "Link for this heading")
================================================

The [built-in browser `<progress>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) lets you render a progress indicator.

    <progress value= />

*   [Reference](#reference)
    *   [`<progress>`](#progress)
*   [Usage](#usage)
    *   [Controlling a progress indicator](#controlling-a-progress-indicator)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<progress>`[](#progress "Link for this heading")

To display a progress indicator, render the [built-in browser `<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) component.

    <progress value= />

[See more examples below.](#usage)

#### Props[](#props "Link for Props ")

`<progress>` supports all [common element props.](common.html#props)

Additionally, `<progress>` supports these props:

*   [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-max): A number. Specifies the maximum `value`. Defaults to `1`.
*   [`value`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress#attr-value): A number between `0` and `max`, or `null` for intermedinate progress. Specifies how much was done.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Controlling a progress indicator[](#controlling-a-progress-indicator "Link for Controlling a progress indicator ")

To display a progress indicator, render a `<progress>` component. You can pass a number `value` between `0` and the `max` value you specify. If you don’t pass a `max` value, it will assumed to be `1` by default.

If the operation is not ongoing, pass `value=` to put the progress indicator into an indeterminate state.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function App() {
  return (
    <\>
      <progress value\= />
      <progress value\= />
      <progress value\= />
      <progress value\= />
      <progress value\= />
      <progress value\= />
    </\>
  );
}

[Previous<option>](option.html)[Next<select>](select.html)

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
*   [`<progress>`](#progress)
*   [Usage](#usage)
*   [Controlling a progress indicator](#controlling-a-progress-indicator)

