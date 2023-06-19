findDOMNode – React

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

findDOMNode[](#undefined "Link for this heading")
=================================================

### Deprecated

This API will be removed in a future major version of React. [See the alternatives.](#alternatives)

`findDOMNode` finds the browser DOM node for a React [class component](../react/Component.html) instance.

    const domNode = findDOMNode(componentInstance)

*   [Reference](#reference)
    *   [`findDOMNode(componentInstance)`](#finddomnode)
*   [Usage](#usage)
    *   [Finding the root DOM node of a class component](#finding-the-root-dom-node-of-a-class-component)
*   [Alternatives](#alternatives)
    *   [Reading component’s own DOM node from a ref](#reading-components-own-dom-node-from-a-ref)
    *   [Reading a child component’s DOM node from a forwarded ref](#reading-a-child-components-dom-node-from-a-forwarded-ref)
    *   [Adding a wrapper `<div>` element](#adding-a-wrapper-div-element)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `findDOMNode(componentInstance)`[](#finddomnode "Link for this heading")

Call `findDOMNode` to find the browser DOM node for a given React [class component](../react/Component.html) instance.

    import  from 'react-dom';const domNode = findDOMNode(componentInstance);

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `componentInstance`: An instance of the [`Component`](../react/Component.html) subclass. For example, `this` inside a class component.

#### Returns[](#returns "Link for Returns ")

`findDOMNode` returns the first closest browser DOM node within the given `componentInstance`. When a component renders to `null`, or renders `false`, `findDOMNode` returns `null`. When a component renders to a string, `findDOMNode` returns a text DOM node containing that value.

#### Caveats[](#caveats "Link for Caveats ")

*   A component may return an array or a [Fragment](../react/Fragment.html) with multiple children. In that case `findDOMNode`, will return the DOM node corresponding to the first non-empty child.
    
*   `findDOMNode` only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling `findDOMNode()` in `render()` on a component that has yet to be created), an exception will be thrown.
    
*   `findDOMNode` only returns the result at the time of your call. If a child component renders a different node later, there is no way for you to be notified of this change.
    
*   `findDOMNode` accepts a class component instance, so it can’t be used with function components.
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Finding the root DOM node of a class component[](#finding-the-root-dom-node-of-a-class-component "Link for Finding the root DOM node of a class component ")

Call `findDOMNode` with a [class component](../react/Component.html) instance (usually, `this`) to find the DOM node it has rendered.

    class AutoselectingInput extends Component 

Here, the `input` variable will be set to the `<input>` DOM element. This lets you do something with it. For example, when clicking “Show example” below mounts the input, [`input.select()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select) selects all text in the input:

App.jsAutoselectingInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';

class AutoselectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    input.select()
  }

  render() {
    return <input defaultValue\="Hello" />
  }
}

export default AutoselectingInput;

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Reading component’s own DOM node from a ref[](#reading-components-own-dom-node-from-a-ref "Link for Reading component’s own DOM node from a ref ")

Code using `findDOMNode` is fragile because the connection between the JSX node and the code manipulating the corresponding DOM node is not explicit. For example, try wrapping this `<input />` into a `<div>`:

App.jsAutoselectingInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';

class AutoselectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    input.select()
  }
  render() {
    return <input defaultValue\="Hello" />
  }
}

export default AutoselectingInput;

This will break the code because now, `findDOMNode(this)` finds the `<div>` DOM node, but the code expects an `<input>` DOM node. To avoid these kinds of problems, use [`createRef`](../react/createRef.html) to manage a specific DOM node.

In this example, `findDOMNode` is no longer used. Instead, `inputRef = createRef(null)` is defined as an instance field on the class. To read the DOM node from it, you can use `this.inputRef.current`. To attach it to the JSX, you render `<input ref= />`. This connects the code using the DOM node to its JSX:

App.jsAutoselectingInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

class AutoselectingInput extends Component {
  inputRef = createRef(null);

  componentDidMount() {
    const input = this.inputRef.current;
    input.select()
  }

  render() {
    return (
      <input ref\= defaultValue\="Hello" />
    );
  }
}

export default AutoselectingInput;

Show more

In modern React without class components, the equivalent code would call [`useRef`](../react/useRef.html) instead:

App.jsAutoselectingInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function AutoselectingInput() {
  const inputRef = useRef(null);

  useEffect(() \=> {
    const input = inputRef.current;
    input.select();
  }, \[\]);

  return <input ref\= defaultValue\="Hello" />
}

[Read more about manipulating the DOM with refs.](../../learn/manipulating-the-dom-with-refs.html)

* * *

### Reading a child component’s DOM node from a forwarded ref[](#reading-a-child-components-dom-node-from-a-forwarded-ref "Link for Reading a child component’s DOM node from a forwarded ref ")

In this example, `findDOMNode(this)` finds a DOM node that belongs to another component. The `AutoselectingInput` renders `MyInput`, which is your own component that renders a browser `<input>`.

App.jsAutoselectingInput.jsMyInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'react-dom';
import MyInput from './MyInput.js';

class AutoselectingInput extends Component {
  componentDidMount() {
    const input = findDOMNode(this);
    input.select()
  }
  render() {
    return <MyInput />;
  }
}

export default AutoselectingInput;

Notice that calling `findDOMNode(this)` inside `AutoselectingInput` still gives you the DOM `<input>`—even though the JSX for this `<input>` is hidden inside the `MyInput` component. This seems convenient for the above example, but it leads to fragile code. Imagine that you wanted to edit `MyInput` later and add a wrapper `<div>` around it. This would break the code of `AutoselectingInput` (which expects to find an `<input>`).

To replace `findDOMNode` in this example, the two components need to coordinate:

1.  `AutoSelectingInput` should declare a ref, like [in the earlier example](#reading-components-own-dom-node-from-a-ref), and pass it to `<MyInput>`.
2.  `MyInput` should be declared with [`forwardRef`](../react/forwardRef.html) to take that ref and forward it down to the `<input>` node.

This version does that, so it no longer needs `findDOMNode`:

App.jsAutoselectingInput.jsMyInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import MyInput from './MyInput.js';

class AutoselectingInput extends Component {
  inputRef = createRef(null);

  componentDidMount() {
    const input = this.inputRef.current;
    input.select()
  }

  render() {
    return (
      <MyInput ref\= />
    );
  }
}

export default AutoselectingInput;

Show more

Here is how this code would look like with function components instead of classes:

App.jsAutoselectingInput.jsMyInput.js

AutoselectingInput.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import MyInput from './MyInput.js';

export default function AutoselectingInput() {
  const inputRef = useRef(null);

  useEffect(() \=> {
    const input = inputRef.current;
    input.select();
  }, \[\]);

  return <MyInput ref\= defaultValue\="Hello" />
}

* * *

### Adding a wrapper `<div>` element[](#adding-a-wrapper-div-element "Link for this heading")

Sometimes a component needs to know the position and size of its children. This makes it tempting to find the children with `findDOMNode(this)`, and then use DOM methods like [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) for measurements.

There is currently no direct equivalent for this use case, which is why `findDOMNode` is deprecated but is not yet removed completely from React. In the meantime, you can try rendering a wrapper `<div>` node around the content as a workaround, and getting a ref to that node. However, extra wrappers can break styling.

    <div ref=</div>

This also applies to focusing and scrolling to arbitrary children.

[PreviousflushSync](flushSync.html)[Nexthydrate](hydrate.html)

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
*   [`findDOMNode(componentInstance)`](#finddomnode)
*   [Usage](#usage)
*   [Finding the root DOM node of a class component](#finding-the-root-dom-node-of-a-class-component)
*   [Alternatives](#alternatives)
*   [Reading component’s own DOM node from a ref](#reading-components-own-dom-node-from-a-ref)
*   [Reading a child component’s DOM node from a forwarded ref](#reading-a-child-components-dom-node-from-a-forwarded-ref)
*   [Adding a wrapper `<div>` element](#adding-a-wrapper-div-element)

