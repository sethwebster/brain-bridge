createPortal – React

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

createPortal[](#undefined "Link for this heading")
==================================================

`createPortal` lets you render some children into a different part of the DOM.

    <div>  <SomeComponent />  </div>

*   [Reference](#reference)
    *   [`createPortal(children, domNode, key?)`](#createportal)
*   [Usage](#usage)
    *   [Rendering to a different part of the DOM](#rendering-to-a-different-part-of-the-dom)
    *   [Rendering a modal dialog with a portal](#rendering-a-modal-dialog-with-a-portal)
    *   [Rendering React components into non-React server markup](#rendering-react-components-into-non-react-server-markup)
    *   [Rendering React components into non-React DOM nodes](#rendering-react-components-into-non-react-dom-nodes)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `createPortal(children, domNode, key?)`[](#createportal "Link for this heading")

To create a portal, call `createPortal`, passing some JSX, and the DOM node where it should be rendered:

    import </div>

[See more examples below.](#usage)

A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events bubble up from children to parents according to the React tree.

#### Parameters[](#parameters "Link for Parameters ")

*   `children`: Anything that can be rendered with React, such as a piece of JSX (e.g. `<div />` or `<SomeComponent />`), a [Fragment](../react/Fragment.html) (`<>...</>`), a string or a number, or an array of these.
    
*   `domNode`: Some DOM node, such as those returned by `document.getElementById()`. The node must already exist. Passing a different DOM node during an update will cause the portal content to be recreated.
    
*   **optional** `key`: A unique string or number to be used as the portal’s [key.](../../learn/rendering-lists.html#keeping-list-items-in-order-with-key)
    

#### Returns[](#returns "Link for Returns ")

`createPortal` returns a React node that can be included into JSX or returned from a React component. If React encounters it in the render output, it will place the provided `children` inside the provided `domNode`.

#### Caveats[](#caveats "Link for Caveats ")

*   Events from portals propagate according to the React tree rather than the DOM tree. For example, if you click inside a portal, and the portal is wrapped in `<div onClick>`, that `onClick` handler will fire. If this causes issues, either stop the event propagation from inside the portal, or move the portal itself up in the React tree.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering to a different part of the DOM[](#rendering-to-a-different-part-of-the-dom "Link for Rendering to a different part of the DOM ")

_Portals_ let your components render some of their children into a different place in the DOM. This lets a part of your component “escape” from whatever containers it may be in. For example, a component can display a modal dialog or a tooltip that appears above and outside of the rest of the page.

To create a portal, render the result of `createPortal` with some JSX and the DOM node where it should go:

    import 

React will put the DOM nodes for the JSX you passed inside of the DOM node you provided.

Without a portal, the second `<p>` would be placed inside the parent `<div>`, but the portal “teleported” it into the [`document.body`:](https://developer.mozilla.org/en-US/docs/Web/API/Document/body)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom';

export default function MyComponent() {
  return (
    <div style\=\>
      <p\>This child is placed in the parent div.</p\>
      {createPortal(
        <p\>This child is placed in the document body.</p\>,
        document.body
      )}
    </div\>
  );
}

Notice how the second paragraph visually appears outside the parent `<div>` with the border. If you inspect the DOM structure with developer tools, you’ll see that the second `<p>` got placed directly into the `<body>`:

    <body>  <div id="root">    ...      <div style="border: 2px solid black">        <p>This child is placed inside the parent div.</p>      </div>    ...  </div>  <p>This child is placed in the document body.</p></body>

A portal only changes the physical placement of the DOM node. In every other way, the JSX you render into a portal acts as a child node of the React component that renders it. For example, the child can access the context provided by the parent tree, and events still bubble up from children to parents according to the React tree.

* * *

### Rendering a modal dialog with a portal[](#rendering-a-modal-dialog-with-a-portal "Link for Rendering a modal dialog with a portal ")

You can use a portal to create a modal dialog that floats above the rest of the page, even if the component that summons the dialog is inside a container with `overflow: hidden` or other styles that interfere with the dialog.

In this example, the two containers have styles that disrupt the modal dialog, but the one rendered into a portal is unaffected because, in the DOM, the modal is not contained within the parent JSX elements.

App.jsNoPortalExample.jsPortalExample.jsModalContent.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import NoPortalExample from './NoPortalExample';
import PortalExample from './PortalExample';

export default function App() {
  return (
    <\>
      <div className\="clipping-container"\>
        <NoPortalExample  />
      </div\>
      <div className\="clipping-container"\>
        <PortalExample />
      </div\>
    </\>
  );
}

### Pitfall

It’s important to make sure that your app is accessible when using portals. For instance, you may need to manage keyboard focus so that the user can move the focus in and out of the portal in a natural way.

Follow the [WAI-ARIA Modal Authoring Practices](https://www.w3.org/WAI/ARIA/apg/#dialog_modal) when creating modals. If you use a community package, ensure that it is accessible and follows these guidelines.

* * *

### Rendering React components into non-React server markup[](#rendering-react-components-into-non-react-server-markup "Link for Rendering React components into non-React server markup ")

Portals can be useful if your React root is only part of a static or server-rendered page that isn’t built with React. For example, if your page is built with a server framework like Rails, you can create areas of interactivity within static areas such as sidebars. Compared with having [multiple separate React roots,](client/createRoot.html#rendering-a-page-partially-built-with-react) portals let you treat the app as a single React tree with shared state even though its parts render to different parts of the DOM.

index.htmlindex.jsApp.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom';

const sidebarContentEl = document.getElementById('sidebar-content');

export default function App() {
  return (
    <\>
      <MainContent />
      {createPortal(
        <SidebarContent />,
        sidebarContentEl
      )}
    </\>
  );
}

function MainContent() {
  return <p\>This part is rendered by React</p\>;
}

function SidebarContent() {
  return <p\>This part is also rendered by React!</p\>;
}

Show more

* * *

### Rendering React components into non-React DOM nodes[](#rendering-react-components-into-non-react-dom-nodes "Link for Rendering React components into non-React DOM nodes ")

You can also use a portal to manage the content of a DOM node that’s managed outside of React. For example, suppose you’re integrating with a non-React map widget and you want to render React content inside a popup. To do this, declare a `popupContainer` state variable to store the DOM node you’re going to render into:

    const [popupContainer, setPopupContainer] = useState(null);

When you create the third-party widget, store the DOM node returned by the widget so you can render into it:

    useEffect(() => , []);

This lets you use `createPortal` to render React content into `popupContainer` once it becomes available:

    return (  <div style=  </div>);

Here is a complete example you can play with:

App.jsmap-widget.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';
import  from './map-widget.js';

export default function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const \[popupContainer, setPopupContainer\] = useState(null);

  useEffect(() \=> {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, \[\]);

  return (
    <div style\=\>
      {popupContainer !== null && createPortal(
        <p\>Hello from React!</p\>,
        popupContainer
      )}
    </div\>
  );
}

Show more

[PreviousAPIs](../react-dom.html)[NextflushSync](flushSync.html)

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
*   [`createPortal(children, domNode, key?)`](#createportal)
*   [Usage](#usage)
*   [Rendering to a different part of the DOM](#rendering-to-a-different-part-of-the-dom)
*   [Rendering a modal dialog with a portal](#rendering-a-modal-dialog-with-a-portal)
*   [Rendering React components into non-React server markup](#rendering-react-components-into-non-react-server-markup)
*   [Rendering React components into non-React DOM nodes](#rendering-react-components-into-non-react-dom-nodes)

