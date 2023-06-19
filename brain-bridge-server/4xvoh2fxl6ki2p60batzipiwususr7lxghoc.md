<Fragment> (<>...</>) – React

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

[Components](components.html)

<Fragment> (<>...</>)[](#undefined "Link for this heading")
===========================================================

`<Fragment>`, often used via `<>...</>` syntax, lets you group elements without a wrapper node.

    <>  <OneChild />  <AnotherChild /></>

*   [Reference](#reference)
    *   [`<Fragment>`](#fragment)
*   [Usage](#usage)
    *   [Returning multiple elements](#returning-multiple-elements)
    *   [Assigning multiple elements to a variable](#assigning-multiple-elements-to-a-variable)
    *   [Grouping elements with text](#grouping-elements-with-text)
    *   [Rendering a list of Fragments](#rendering-a-list-of-fragments)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<Fragment>`[](#fragment "Link for this heading")

Wrap elements in `<Fragment>` to group them together in situations where you need a single element. Grouping elements in `Fragment` has no effect on the resulting DOM; it is the same as if the elements were not grouped. The empty JSX tag `<></>` is shorthand for `<Fragment></Fragment>` in most cases.

#### Props[](#props "Link for Props ")

*   **optional** `key`: Fragments declared with the explicit `<Fragment>` syntax may have [keys.](../../learn/rendering-lists.html#keeping-list-items-in-order-with-key)

#### Caveats[](#caveats "Link for Caveats ")

*   If you want to pass `key` to a Fragment, you can’t use the `<>...</>` syntax. You have to explicitly import `Fragment` from `'react'` and render `<Fragment key=>...</Fragment>`.
    
*   React does not [reset state](../../learn/preserving-and-resetting-state.html) when you go from rendering `<><Child /></>` to `[<Child />]` or back, or when you go from rendering `<><Child /></>` to `<Child />` and back. This only works a single level deep: for example, going from `<><><Child /></></>` to `<Child />` resets the state. See the precise semantics [here.](https://gist.github.com/clemmy/b3ef00f9507909429d8aa0d3ee4f986b)
    

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Returning multiple elements[](#returning-multiple-elements "Link for Returning multiple elements ")

Use `Fragment`, or the equivalent `<>...</>` syntax, to group multiple elements together. You can use it to put multiple elements in any place where a single element can go. For example, a component can only return one element, but by using a Fragment you can group multiple elements together and then return them as a group:

    function Post() 

Fragments are useful because grouping elements with a Fragment has no effect on layout or styles, unlike if you wrapped the elements in another container like a DOM element. If you inspect this example with the browser tools, you’ll see that all `<h1>` and `<article>` DOM nodes appear as siblings without wrappers around them:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Blog() {
  return (
    <\>
      <Post title\="An update" body\="It's been a while since I posted..." />
      <Post title\="My new blog" body\="I am starting a new blog!" />
    </\>
  )
}

function Post() {
  return (
    <\>
      <PostTitle title\= />
      <PostBody body\= />
    </\>
  );
}

function PostTitle() {
  return <h1\></h1\>
}

function PostBody() {
  return (
    <article\>
      <p\></p\>
    </article\>
  );
}

Show more

##### Deep Dive

#### How to write a Fragment without the special syntax?[](#how-to-write-a-fragment-without-the-special-syntax "Link for How to write a Fragment without the special syntax? ")

Show Details

The example above is equivalent to importing `Fragment` from React:

    import 

Usually you won’t need this unless you need to [pass a `key` to your `Fragment`.](#rendering-a-list-of-fragments)

* * *

### Assigning multiple elements to a variable[](#assigning-multiple-elements-to-a-variable "Link for Assigning multiple elements to a variable ")

Like any other element, you can assign Fragment elements to variables, pass them as props, and so on:

    function CloseDialog() 

* * *

### Grouping elements with text[](#grouping-elements-with-text "Link for Grouping elements with text ")

You can use `Fragment` to group text together with components:

    function DateRangePicker(

* * *

### Rendering a list of Fragments[](#rendering-a-list-of-fragments "Link for Rendering a list of Fragments ")

Here’s a situation where you need to write `Fragment` explicitly instead of using the `<></>` syntax. When you [render multiple elements in a loop](../../learn/rendering-lists.html), you need to assign a `key` to each element. If the elements within the loop are Fragments, you need to use the normal JSX element syntax in order to provide the `key` attribute:

    function Blog() 

You can inspect the DOM to verify that there are no wrapper elements around the Fragment children:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const posts = \[
  ,
  
\];

export default function Blog() {
  return posts.map(post \=>
    <Fragment key\=\>
      <PostTitle title\= />
      <PostBody body\= />
    </Fragment\>
  );
}

function PostTitle() {
  return <h1\></h1\>
}

function PostBody() {
  return (
    <article\>
      <p\></p\>
    </article\>
  );
}

Show more

[PreviousComponents](components.html)[Next<Profiler>](Profiler.html)

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
*   [`<Fragment>`](#fragment)
*   [Usage](#usage)
*   [Returning multiple elements](#returning-multiple-elements)
*   [Assigning multiple elements to a variable](#assigning-multiple-elements-to-a-variable)
*   [Grouping elements with text](#grouping-elements-with-text)
*   [Rendering a list of Fragments](#rendering-a-list-of-fragments)

