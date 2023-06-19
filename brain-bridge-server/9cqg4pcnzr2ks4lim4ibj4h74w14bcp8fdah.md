useLayoutEffect – React

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

useLayoutEffect[](#undefined "Link for this heading")
=====================================================

### Pitfall

`useLayoutEffect` can hurt performance. Prefer [`useEffect`](useEffect.html) when possible.

`useLayoutEffect` is a version of [`useEffect`](useEffect.html) that fires before the browser repaints the screen.

    useLayoutEffect(setup, dependencies?)

*   [Reference](#reference)
    *   [`useLayoutEffect(setup, dependencies?)`](#useinsertioneffect)
*   [Usage](#usage)
    *   [Measuring layout before the browser repaints the screen](#measuring-layout-before-the-browser-repaints-the-screen)
*   [Troubleshooting](#troubleshooting)
    *   [I’m getting an error: ”`useLayoutEffect` does nothing on the server”](#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `useLayoutEffect(setup, dependencies?)`[](#useinsertioneffect "Link for this heading")

Call `useLayoutEffect` perform the layout measurements before the browser repaints the screen:

    import , []);  // ...

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `setup`: The function with your Effect’s logic. Your setup function may also optionally return a _cleanup_ function. Before your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function.
    
*   **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](../../learn/editor-setup.html#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If you omit this argument, your Effect will re-run after every re-render of the component.
    

#### Returns[](#returns "Link for Returns ")

`useLayoutEffect` returns `undefined`.

#### Caveats[](#caveats "Link for Caveats ")

*   `useLayoutEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a component and move the Effect there.
    
*   When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, [implement the cleanup function.](../../learn/synchronizing-with-effects.html#how-to-handle-the-effect-firing-twice-in-development)
    
*   If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary [object](useEffect.html#removing-unnecessary-object-dependencies) and [function](useEffect.html#removing-unnecessary-function-dependencies) dependencies. You can also [extract state updates](useEffect.html#updating-state-based-on-previous-state-from-an-effect) and [non-reactive logic](useEffect.html#reading-the-latest-props-and-state-from-an-effect) outside of your Effect.
    
*   Effects **only run on the client.** They don’t run during server rendering.
    
*   The code inside `useLayoutEffect` and all state updates scheduled from it **block the browser from repainting the screen.** When used excessively, this makes your app slow. When possible, prefer [`useEffect`.](useEffect.html)
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Measuring layout before the browser repaints the screen[](#measuring-layout-before-the-browser-repaints-the-screen "Link for Measuring layout before the browser repaints the screen ")

Most components don’t need to know their position and size on the screen to decide what to render. They only return some JSX. Then the browser calculates their _layout_ (position and size) and repaints the screen.

Sometimes, that’s not enough. Imagine a tooltip that appears next to some element on hover. If there’s enough space, the tooltip should appear above the element, but if it doesn’t fit, it should appear below. In order to render the tooltip at the right final position, you need to know its height (i.e. whether it fits at the top).

To do this, you need to render in two passes:

1.  Render the tooltip anywhere (even with a wrong position).
2.  Measure its height and decide where to place the tooltip.
3.  Render the tooltip _again_ in the correct place.

**All of this needs to happen before the browser repaints the screen.** You don’t want the user to see the tooltip moving. Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen:

    function Tooltip() 

Here’s how this works step by step:

1.  `Tooltip` renders with the initial `tooltipHeight = 0` (so the tooltip may be wrongly positioned).
2.  React places it in the DOM and runs the code in `useLayoutEffect`.
3.  Your `useLayoutEffect` [measures the height](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the tooltip content and triggers an immediate re-render.
4.  `Tooltip` renders again with the real `tooltipHeight` (so the tooltip is correctly positioned).
5.  React updates it in the DOM, and the browser finally displays the tooltip.

Hover over the buttons below and see how the tooltip adjusts its position depending on whether it fits:

App.jsButtonWithTooltip.jsTooltip.jsTooltipContainer.js

Tooltip.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip() {
  const ref = useRef(null);
  const \[tooltipHeight, setTooltipHeight\] = useState(0);

  useLayoutEffect(() \=> {
    const  = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
    console.log('Measured tooltip height: ' + height);
  }, \[\]);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x\=\>
      
    </TooltipContainer\>,
    document.body
  );
}

Show more

Notice that even though the `Tooltip` component has to render in two passes (first, with `tooltipHeight` initialized to `0` and then with the real measured height), you only see the final result. This is why you need `useLayoutEffect` instead of [`useEffect`](useEffect.html) for this example. Let’s look at the difference in detail below.

#### useLayoutEffect vs useEffect[](#examples "Link for useLayoutEffect vs useEffect")

1. `useLayoutEffect` blocks the browser from repainting 2. `useEffect` does not block the browser

#### 

Example 1 of 2:

`useLayoutEffect` blocks the browser from repainting[](#uselayouteffect-blocks-the-browser-from-repainting "Link for this heading")

React guarantees that the code inside `useLayoutEffect` and any state updates scheduled inside it will be processed **before the browser repaints the screen.** This lets you render the tooltip, measure it, and re-render the tooltip again without the user noticing the first extra render. In other words, `useLayoutEffect` blocks the browser from painting.

App.jsButtonWithTooltip.jsTooltip.jsTooltipContainer.js

Tooltip.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';
import TooltipContainer from './TooltipContainer.js';

export default function Tooltip() {
  const ref = useRef(null);
  const \[tooltipHeight, setTooltipHeight\] = useState(0);

  useLayoutEffect(() \=> {
    const  = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, \[\]);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  return createPortal(
    <TooltipContainer x\=\>
      
    </TooltipContainer\>,
    document.body
  );
}

Show more

Next Example

### Note

Rendering in two passes and blocking the browser hurts performance. Try to avoid this when you can.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### I’m getting an error: ”`useLayoutEffect` does nothing on the server”[](#im-getting-an-error-uselayouteffect-does-nothing-on-the-server "Link for this heading")

The purpose of `useLayoutEffect` is to let your component [use layout information for rendering:](#measuring-layout-before-the-browser-repaints-the-screen)

1.  Render the initial content.
2.  Measure the layout _before the browser repaints the screen._
3.  Render the final content using the layout information you’ve read.

When you or your framework uses [server rendering](../react-dom/server.html), your React app renders to HTML on the server for the initial render. This lets you show the initial HTML before the JavaScript code loads.

The problem is that on the server, there is no layout information.

In the [earlier example](#measuring-layout-before-the-browser-repaints-the-screen), the `useLayoutEffect` call in the `Tooltip` component lets it position itself correctly (either above or below content) depending on the content height. If you tried to render `Tooltip` as a part of the initial server HTML, this would be impossible to determine. On the server, there is no layout yet! So, even if you rendered it on the server, its position would “jump” on the client after the JavaScript loads and runs.

Usually, components that rely on layout information don’t need to render on the server anyway. For example, it probably doesn’t make sense to show a `Tooltip` during the initial render. It is triggered by a client interaction.

However, if you’re running into this problem, you have a few different options:

*   Replace `useLayoutEffect` with [`useEffect`.](useEffect.html) This tells React that it’s okay to display the initial render result without blocking the paint (because the original HTML will become visible before your Effect runs).
    
*   Alternatively, [mark your component as client-only.](Suspense.html#providing-a-fallback-for-server-errors-and-server-only-content) This tells React to replace its content up to the closest [`<Suspense>`](Suspense.html) boundary with a loading fallback (for example, a spinner or a glimmer) during server rendering.
    
*   Alternatively, you can render a component with `useLayoutEffect` only after hydration. Keep a boolean `isMounted` state that’s initialized to `false`, and set it to `true` inside a `useEffect` call. Your rendering logic can then be like `return isMounted ? <RealContent /> : <FallbackContent />`. On the server and during the hydration, the user will see `FallbackContent` which should not call `useLayoutEffect`. Then React will replace it with `RealContent` which runs on the client only and can include `useLayoutEffect` calls.
    
*   If you synchronize your component with an external data store and rely on `useLayoutEffect` for different reasons than measuring layout, consider [`useSyncExternalStore`](useSyncExternalStore.html) instead which [supports server rendering.](useSyncExternalStore.html#adding-support-for-server-rendering)
    

[PrevioususeInsertionEffect](useInsertionEffect.html)[NextuseMemo](useMemo.html)

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
*   [`useLayoutEffect(setup, dependencies?)`](#useinsertioneffect)
*   [Usage](#usage)
*   [Measuring layout before the browser repaints the screen](#measuring-layout-before-the-browser-repaints-the-screen)
*   [Troubleshooting](#troubleshooting)
*   [I’m getting an error: ”`useLayoutEffect` does nothing on the server”](#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)

