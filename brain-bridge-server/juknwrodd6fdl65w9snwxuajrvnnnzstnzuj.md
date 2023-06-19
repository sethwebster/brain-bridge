createFactory – React

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

createFactory[](#undefined "Link for this heading")
===================================================

### Deprecated

This API will be removed in a future major version of React. [See the alternatives.](#alternatives)

`createFactory` lets you create a function that produces React elements of a given type.

    const factory = createFactory(type)

*   [Reference](#reference)
    *   [`createFactory(type)`](#createfactory)
*   [Usage](#usage)
    *   [Creating React elements with a factory](#creating-react-elements-with-a-factory)
*   [Alternatives](#alternatives)
    *   [Copying `createFactory` into your project](#copying-createfactory-into-your-project)
    *   [Replacing `createFactory` with `createElement`](#replacing-createfactory-with-createelement)
    *   [Replacing `createFactory` with JSX](#replacing-createfactory-with-jsx)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `createFactory(type)`[](#createfactory "Link for this heading")

Call `createFactory(type)` to create a factory function which produces React elements of a given `type`.

    import  from 'react';const button = createFactory('button');

Then you can use it to create React elements without JSX:

    export default function App() 

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `type`: The `type` argument must be a valid React component type. For example, it could be a tag name string (such as `'div'` or `'span'`), or a React component (a function, a class, or a special component like [`Fragment`](Fragment.html)).

#### Returns[](#returns "Link for Returns ")

Returns a factory function. That factory function receives a `props` object as the first argument, followed by a list of `...children` arguments, and returns a React element with the given `type`, `props` and `children`.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Creating React elements with a factory[](#creating-react-elements-with-a-factory "Link for Creating React elements with a factory ")

Although most React projects use [JSX](../../learn/writing-markup-with-jsx.html) to describe the user interface, JSX is not required. In the past, `createFactory` used to be one of the ways you could describe the user interface without JSX.

Call `createFactory` to create a _factory function_ for a specific element type like `'button'`:

    import  from 'react';const button = createFactory('button');

Calling that factory function will produce React elements with the props and children you have provided:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const button = createFactory('button');

export default function App() {
  return button({
    onClick: () \=> {
      alert('Clicked!')
    }
  }, 'Click me');
}

This is how `createFactory` was used as an alternative to JSX. However, `createFactory` is deprecated, and you should not call `createFactory` in any new code. See how to migrate away from `createFactory` below.

* * *

Alternatives[](#alternatives "Link for Alternatives ")
------------------------------------------------------

### Copying `createFactory` into your project[](#copying-createfactory-into-your-project "Link for this heading")

If your project has many `createFactory` calls, copy this `createFactory.js` implementation into your project:

App.jscreateFactory.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './createFactory.js';

const button = createFactory('button');

export default function App() {
  return button({
    onClick: () \=> {
      alert('Clicked!')
    }
  }, 'Click me');
}

This lets you keep all of your code unchanged except the imports.

* * *

### Replacing `createFactory` with `createElement`[](#replacing-createfactory-with-createelement "Link for this heading")

If you have a few `createFactory` calls that you don’t mind porting manually, and you don’t want to use JSX, you can replace every call a factory function with a [`createElement`](createElement.html) call. For example, you can replace this code:

    import 

with this code:

    import 

Here is a complete example of using React without JSX:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  return createElement('button', {
    onClick: () \=> {
      alert('Clicked!')
    }
  }, 'Click me');
}

* * *

### Replacing `createFactory` with JSX[](#replacing-createfactory-with-jsx "Link for this heading")

Finally, you can use JSX instead of `createFactory`. This is the most common way to use React:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function App() {
  return (
    <button onClick\={() \=> {
      alert('Clicked!');
    }}\>
      Click me
    </button\>
  );
};

### Pitfall

Sometimes, your existing code might pass some variable as a `type` instead of a constant like `'button'`:

    function Heading(

To do the same in JSX, you need to rename your variable to start with an uppercase letter like `Type`:

    function Heading(

Otherwise React will interpret `<type>` as a built-in HTML tag because it is lowercase.

[PreviouscreateElement](createElement.html)[NextcreateRef](createRef.html)

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
*   [`createFactory(type)`](#createfactory)
*   [Usage](#usage)
*   [Creating React elements with a factory](#creating-react-elements-with-a-factory)
*   [Alternatives](#alternatives)
*   [Copying `createFactory` into your project](#copying-createfactory-into-your-project)
*   [Replacing `createFactory` with `createElement`](#replacing-createfactory-with-createelement)
*   [Replacing `createFactory` with JSX](#replacing-createfactory-with-jsx)

