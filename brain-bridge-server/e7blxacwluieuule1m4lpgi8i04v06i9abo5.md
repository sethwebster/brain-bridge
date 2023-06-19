cloneElement – React

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

cloneElement[](#undefined "Link for this heading")
==================================================

### Pitfall

Using `cloneElement` is uncommon and can lead to fragile code. [See common alternatives.](#alternatives)

`cloneElement` lets you create a new React element using another element as a starting point.

    const clonedElement = cloneElement(element, props, ...children)

*   [Reference](#reference)
    *   [`cloneElement(element, props, ...children)`](#cloneelement)
*   [Usage](#usage)
    *   [Overriding props of an element](#overriding-props-of-an-element)
*   [Alternatives](#alternatives)
    *   [Passing data with a render prop](#passing-data-with-a-render-prop)
    *   [Passing data through context](#passing-data-through-context)
    *   [Extracting logic into a custom Hook](#extracting-logic-into-a-custom-hook)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `cloneElement(element, props, ...children)`[](#cloneelement "Link for this heading")

Call `cloneElement` to create a React element based on the `element`, but with different `props` and `children`:

    import ,  'Goodbye');console.log(clonedElement); // <Row title="Cabbage">Goodbye</Row>

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `element`: The `element` argument must be a valid React element. For example, it could be a JSX node like `<Something />`, the result of calling [`createElement`](createElement.html), or the result of another `cloneElement` call.
    
*   `props`: The `props` argument must either be an object or `null`. If you pass `null`, the cloned element will retain all of the original `element.props`. Otherwise, for every prop in the `props` object, the returned element will “prefer” the value from `props` over the value from `element.props`. The rest of the props will be filled from the original `element.props`. If you pass `props.key` or `props.ref`, they will replace the original ones.
    
*   **optional** `...children`: Zero or more child nodes. They can be any React nodes, including React elements, strings, numbers, [portals](../react-dom/createPortal.html), empty nodes (`null`, `undefined`, `true`, and `false`), and arrays of React nodes. If you don’t pass any `...children` arguments, the original `element.props.children` will be preserved.
    

#### Returns[](#returns "Link for Returns ")

`cloneElement` returns a React element object with a few properties:

*   `type`: Same as `element.type`.
*   `props`: The result of shallowly merging `element.props` with the overriding `props` you have passed.
*   `ref`: The original `element.ref`, unless it was overridden by `props.ref`.
*   `key`: The original `element.key`, unless it was overridden by `props.key`.

Usually, you’ll return the element from your component or make it a child of another element. Although you may read the element’s properties, it’s best to treat every element as opaque after it’s created, and only render it.

#### Caveats[](#caveats "Link for Caveats ")

*   Cloning an element **does not modify the original element.**
    
*   You should only **pass children as multiple arguments to `cloneElement` if they are all statically known,** like `cloneElement(element, null, child1, child2, child3)`. If your children are dynamic, pass the entire array as the third argument: `cloneElement(element, null, listItems)`. This ensures that React will [warn you about missing `key`s](../../learn/rendering-lists.html#keeping-list-items-in-order-with-key) for any dynamic lists. For static lists this is not necessary because they never reorder.
    
*   `cloneElement` makes it harder to trace the data flow, so **try the [alternatives](#alternatives) instead.**
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Overriding props of an element[](#overriding-props-of-an-element "Link for Overriding props of an element ")

To override the props of some React element, pass it to `cloneElement` with the props you want to override:

    import );

Here, the resulting cloned element will be `<Row title="Cabbage" isHighlighted= />`.

**Let’s walk through an example to see when it’s useful.**

Imagine a `List` component that renders its [`children`](../../learn/passing-props-to-a-component.html#passing-jsx-as-children) as a list of selectable rows with a “Next” button that changes which row is selected. The `List` component needs to render the selected `Row` differently, so it clones every `<Row>` child that it has received, and adds an extra `isHighlighted: true` or `isHighlighted: false` prop:

    export default function List(

Let’s say the original JSX received by `List` looks like this:

    <List>  <Row title="Cabbage" />  <Row title="Garlic" />  <Row title="Apple" /></List>

By cloning its children, the `List` can pass extra information to every `Row` inside. The result looks like this:

    <List>  <Row    title="Cabbage"    isHighlighted=   /></List>

Notice how pressing “Next” updates the state of the `List`, and highlights a different row:

App.jsList.jsRow.jsdata.js

List.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function List() {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {Children.map(children, (child, index) \=>
        cloneElement(child, {
          isHighlighted: index === selectedIndex 
        })
      )}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % Children.count(children)
        );
      }}\>
        Next
      </button\>
    </div\>
  );
}

Show more

To summarize, the `List` cloned the `<Row />` elements it received and added an extra prop to them.

### Pitfall

Cloning children makes it hard to tell how the data flows through your app. Try one of the [alternatives.](#alternatives)

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Passing data with a render prop[](#passing-data-with-a-render-prop "Link for Passing data with a render prop ")

Instead of using `cloneElement`, consider accepting a _render prop_ like `renderItem`. Here, `List` receives `renderItem` as a prop. `List` calls `renderItem` for every item and passes `isHighlighted` as an argument:

    export default function List(

The `renderItem` prop is called a “render prop” because it’s a prop that specifies how to render something. For example, you can pass a `renderItem` implementation that renders a `<Row>` with the given `isHighlighted` value:

    <List  items=/>

The end result is the same as with `cloneElement`:

    <List>  <Row    title="Cabbage"    isHighlighted=   /></List>

However, you can clearly trace where the `isHighlighted` value is coming from.

App.jsList.jsRow.jsdata.js

List.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function List() {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {items.map((item, index) \=> {
        const isHighlighted = index === selectedIndex;
        return renderItem(item, isHighlighted);
      })}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % items.length
        );
      }}\>
        Next
      </button\>
    </div\>
  );
}

Show more

This pattern is preferred to `cloneElement` because it is more explicit.

* * *

### Passing data through context[](#passing-data-through-context "Link for Passing data through context ")

Another alternative to `cloneElement` is to [pass data through context.](../../learn/passing-data-deeply-with-context.html)

For example, you can call [`createContext`](createContext.html) to define a `HighlightContext`:

    export const HighlightContext = createContext(false);

Your `List` component can wrap every item it renders into a `HighlightContext` provider:

    export default function List(

With this approach, `Row` does not need to receive an `isHighlighted` prop at all. Instead, it reads the context:

    export default function Row() {  const isHighlighted = useContext(HighlightContext);  // ...

This allows the calling component to not know or worry about passing `isHighlighted` to `<Row>`:

    <List  items=/>

Instead, `List` and `Row` coordinate the highlighting logic through context.

App.jsList.jsRow.jsHighlightContext.jsdata.js

List.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './HighlightContext.js';

export default function List() {
  const \[selectedIndex, setSelectedIndex\] = useState(0);
  return (
    <div className\="List"\>
      {items.map((item, index) \=> {
        const isHighlighted = index === selectedIndex;
        return (
          <HighlightContext.Provider
            key\=
            value\=
          \>
            
          </HighlightContext.Provider\>
        );
      })}
      <hr />
      <button onClick\={() \=> {
        setSelectedIndex(i \=>
          (i + 1) % items.length
        );
      }}\>
        Next
      </button\>
    </div\>
  );
}

Show more

[Learn more about passing data through context.](useContext.html#passing-data-deeply-into-the-tree)

* * *

### Extracting logic into a custom Hook[](#extracting-logic-into-a-custom-hook "Link for Extracting logic into a custom Hook ")

Another approach you can try is to extract the “non-visual” logic into your own Hook, and use the information returned by your Hook to decide what to render. For example, you could write a `useList` custom Hook like this:

    import 

Then you could use it like this:

    export default function App() 

The data flow is explicit, but the state is inside the `useList` custom Hook that you can use from any component:

App.jsuseList.jsRow.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Row from './Row.js';
import useList from './useList.js';
import  from './data.js';

export default function App() {
  const \[selected, onNext\] = useList(products);
  return (
    <div className\="List"\>
      {products.map(product \=>
        <Row
          key\=
          title\=
          isHighlighted\=
        />
      )}
      <hr />
      <button onClick\=\>
        Next
      </button\>
    </div\>
  );
}

Show more

This approach is particularly useful if you want to reuse this logic between different components.

[PreviousChildren](Children.html)[NextComponent](Component.html)

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
*   [`cloneElement(element, props, ...children)`](#cloneelement)
*   [Usage](#usage)
*   [Overriding props of an element](#overriding-props-of-an-element)
*   [Alternatives](#alternatives)
*   [Passing data with a render prop](#passing-data-with-a-render-prop)
*   [Passing data through context](#passing-data-through-context)
*   [Extracting logic into a custom Hook](#extracting-logic-into-a-custom-hook)

