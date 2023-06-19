renderToPipeableStream – React

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
    
    *   [createRoot](../client/createRoot.html "createRoot")
    *   [hydrateRoot](../client/hydrateRoot.html "hydrateRoot")
    
*   [Server APIs](../server.html "Server APIs")
    
    *   [renderToNodeStream](renderToNodeStream.html "renderToNodeStream")
    *   [renderToPipeableStream](renderToPipeableStream.html "renderToPipeableStream")
    *   [renderToReadableStream](renderToReadableStream.html "renderToReadableStream")
    *   [renderToStaticMarkup](renderToStaticMarkup.html "renderToStaticMarkup")
    *   [renderToStaticNodeStream](renderToStaticNodeStream.html "renderToStaticNodeStream")
    *   [renderToString](renderToString.html "renderToString")
    

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

[Server APIs](../server.html)

renderToPipeableStream[](#undefined "Link for this heading")
============================================================

`renderToPipeableStream` renders a React tree to a pipeable [Node.js Stream.](https://nodejs.org/api/stream.html)

    const  = renderToPipeableStream(reactNode, options?)

*   [Reference](#reference)
    *   [`renderToPipeableStream(reactNode, options?)`](#rendertopipeablestream)
*   [Usage](#usage)
    *   [Rendering a React tree as HTML to a Node.js Stream](#rendering-a-react-tree-as-html-to-a-nodejs-stream)
    *   [Streaming more content as it loads](#streaming-more-content-as-it-loads)
    *   [Specifying what goes into the shell](#specifying-what-goes-into-the-shell)
    *   [Logging crashes on the server](#logging-crashes-on-the-server)
    *   [Recovering from errors inside the shell](#recovering-from-errors-inside-the-shell)
    *   [Recovering from errors outside the shell](#recovering-from-errors-outside-the-shell)
    *   [Setting the status code](#setting-the-status-code)
    *   [Handling different errors in different ways](#handling-different-errors-in-different-ways)
    *   [Waiting for all content to load for crawlers and static generation](#waiting-for-all-content-to-load-for-crawlers-and-static-generation)
    *   [Aborting server rendering](#aborting-server-rendering)

### Note

This API is specific to Node.js. Environments with [Web Streams,](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) like Deno and modern edge runtimes, should use [`renderToReadableStream`](renderToReadableStream.html) instead.

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `renderToPipeableStream(reactNode, options?)`[](#rendertopipeablestream "Link for this heading")

Call `renderToPipeableStream` to render your React tree as HTML into a [Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams)

    import );

On the client, call [`hydrateRoot`](../client/hydrateRoot.html) to make the server-generated HTML interactive.

[See more examples below.](#usage)

#### Parameters[](#parameters "Link for Parameters ")

*   `reactNode`: A React node you want to render to HTML. For example, a JSX element like `<App />`. It is expected to represent the entire document, so the `App` component should render the `<html>` tag.
    
*   **optional** `options`: An object with streaming options.
    
    *   **optional** `bootstrapScriptContent`: If specified, this string will be placed in an inline `<script>` tag.
    *   **optional** `bootstrapScripts`: An array of string URLs for the `<script>` tags to emit on the page. Use this to include the `<script>` that calls [`hydrateRoot`.](../client/hydrateRoot.html) Omit it if you don’t want to run React on the client at all.
    *   **optional** `bootstrapModules`: Like `bootstrapScripts`, but emits [`<script type="module">`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) instead.
    *   **optional** `identifierPrefix`: A string prefix React uses for IDs generated by [`useId`.](../../react/useId.html) Useful to avoid conflicts when using multiple roots on the same page. Must be the same prefix as passed to [`hydrateRoot`.](../client/hydrateRoot.html#parameters)
    *   **optional** `namespaceURI`: A string with the root [namespace URI](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS#important_namespace_uris) for the stream. Defaults to regular HTML. Pass `'http://www.w3.org/2000/svg'` for SVG or `'http://www.w3.org/1998/Math/MathML'` for MathML.
    *   **optional** `nonce`: A [`nonce`](http://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#nonce) string to allow scripts for [`script-src` Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src).
    *   **optional** `onAllReady`: A callback that fires when all rendering is complete, including both the [shell](#specifying-what-goes-into-the-shell) and all additional [content.](#streaming-more-content-as-it-loads) You can use this instead of `onShellReady` [for crawlers and static generation.](#waiting-for-all-content-to-load-for-crawlers-and-static-generation) If you start streaming here, you won’t get any progressive loading. The stream will contain the final HTML.
    *   **optional** `onError`: A callback that fires whenever there is a server error, whether [recoverable](#recovering-from-errors-outside-the-shell) or [not.](#recovering-from-errors-inside-the-shell) By default, this only calls `console.error`. If you override it to [log crash reports,](#logging-crashes-on-the-server) make sure that you still call `console.error`. You can also use it to [adjust the status code](#setting-the-status-code) before the shell is emitted.
    *   **optional** `onShellReady`: A callback that fires right after the [initial shell](#specifying-what-goes-into-the-shell) has been rendered. You can [set the status code](#setting-the-status-code) and call `pipe` here to start streaming. React will [stream the additional content](#streaming-more-content-as-it-loads) after the shell along with the inline `<script>` tags that place that replace the HTML loading fallbacks with the content.
    *   **optional** `onShellError`: A callback that fires if there was an error rendering the initial shell. It receives the error as an argument. No bytes were emitted from the stream yet, and neither `onShellReady` nor `onAllReady` will get called, so you can [output a fallback HTML shell.](#recovering-from-errors-inside-the-shell)
    *   **optional** `progressiveChunkSize`: The number of bytes in a chunk. [Read more about the default heuristic.](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-server/src/ReactFizzServer.js#L210-L225)

#### Returns[](#returns "Link for Returns ")

`renderToPipeableStream` returns an object with two methods:

*   `pipe` outputs the HTML into the provided [Writable Node.js Stream.](https://nodejs.org/api/stream.html#writable-streams) Call `pipe` in `onShellReady` if you want to enable streaming, or in `onAllReady` for crawlers and static generation.
*   `abort` lets you [abort server rendering](#aborting-server-rendering) and render the rest on the client.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Rendering a React tree as HTML to a Node.js Stream[](#rendering-a-react-tree-as-html-to-a-nodejs-stream "Link for Rendering a React tree as HTML to a Node.js Stream ")

Call `renderToPipeableStream` to render your React tree as HTML into a [Node.js Stream:](https://nodejs.org/api/stream.html#writable-streams)

    import );

Along with the root component, you need to provide a list of bootstrap `<script>` paths. Your root component should return **the entire document including the root `<html>` tag.**

For example, it might look like this:

    export default function App() 

React will inject the [doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype) and your bootstrap `<script>` tags into the resulting HTML stream:

    <!DOCTYPE html><html>  <!-- ... HTML from your components ... --></html><script src="/main.js" async=""></script>

On the client, your bootstrap script should [hydrate the entire `document` with a call to `hydrateRoot`:](../client/hydrateRoot.html#hydrating-an-entire-document)

    import  from 'react-dom/client';import App from './App.js';hydrateRoot(document, <App />);

This will attach event listeners to the server-generated HTML and make it interactive.

##### Deep Dive

#### Reading CSS and JS asset paths from the build output[](#reading-css-and-js-asset-paths-from-the-build-output "Link for Reading CSS and JS asset paths from the build output ")

Show Details

The final asset URLs (like JavaScript and CSS files) are often hashed after the build. For example, instead of `styles.css` you might end up with `styles.123456.css`. Hashing static asset filenames guarantees that every distinct build of the same asset will have a different filename. This is useful because it lets you safely enable long-term caching for static assets: a file with a certain name would never change content.

However, if you don’t know the asset URLs until after the build, there’s no way for you to put them in the source code. For example, hardcoding `"/styles.css"` into JSX like earlier wouldn’t work. To keep them out of your source code, your root component can read the real filenames from a map passed as a prop:

    export default function App(

On the server, render `<App assetMap= />` and pass your `assetMap` with the asset URLs:

    // You'd need to get this JSON from your build tooling, e.g. read it from the build output.const assetMap = );

Since your server is now rendering `<App assetMap= />`, you need to render it with `assetMap` on the client too to avoid hydration errors. You can serialize and pass `assetMap` to the client like this:

    // You'd need to get this JSON from your build tooling.const assetMap = );

In the example above, the `bootstrapScriptContent` option adds an extra inline `<script>` tag that sets the global `window.assetMap` variable on the client. This lets the client code read the same `assetMap`:

    import  />);

Both client and server render `App` with the same `assetMap` prop, so there are no hydration errors.

* * *

### Streaming more content as it loads[](#streaming-more-content-as-it-loads "Link for Streaming more content as it loads ")

Streaming allows the user to start seeing the content even before all the data has loaded on the server. For example, consider a profile page that shows a cover, a sidebar with friends and photos, and a list of posts:

    function ProfilePage() 

Imagine that loading data for `<Posts />` takes some time. Ideally, you’d want to show the rest of the profile page content to the user without waiting for the posts. To do this, [wrap `Posts` in a `<Suspense>` boundary:](../../react/Suspense.html#displaying-a-fallback-while-content-is-loading)

    function ProfilePage() 

This tells React to start streaming the HTML before `Posts` loads its data. React will send the HTML for the loading fallback (`PostsGlimmer`) first, and then, when `Posts` finishes loading its data, React will send the remaining HTML along with an inline `<script>` tag that replaces the loading fallback with that HTML. From the user’s perspective, the page will first appear with the `PostsGlimmer`, later replaced by the `Posts`.

You can further [nest `<Suspense>` boundaries](../../react/Suspense.html#revealing-nested-content-as-it-loads) to create a more granular loading sequence:

    function ProfilePage() 

In this example, React can start streaming the page even earlier. Only `ProfileLayout` and `ProfileCover` must finish rendering first because they are not wrapped in any `<Suspense>` boundary. However, if `Sidebar`, `Friends`, or `Photos` need to load some data, React will send the HTML for the `BigSpinner` fallback instead. Then, as more data becomes available, more content will continue to be revealed until all of it becomes visible.

Streaming does not need to wait for React itself to load in the browser, or for your app to become interactive. The HTML content from the server will get progressively revealed before any of the `<script>` tags load.

[Read more about how streaming HTML works.](https://github.com/reactwg/react-18/discussions/37)

### Note

**Only Suspense-enabled data sources will activate the Suspense component.** They include:

*   Data fetching with Suspense-enabled frameworks like [Relay](https://relay.dev/docs/guided-tour/rendering/loading-states/) and [Next.js](https://nextjs.org/docs/advanced-features/react-18)
*   Lazy-loading component code with [`lazy`](../../react/lazy.html)

Suspense **does not** detect when data is fetched inside an Effect or event handler.

The exact way you would load data in the `Posts` component above depends on your framework. If you use a Suspense-enabled framework, you’ll find the details in its data fetching documentation.

Suspense-enabled data fetching without the use of an opinionated framework is not yet supported. The requirements for implementing a Suspense-enabled data source are unstable and undocumented. An official API for integrating data sources with Suspense will be released in a future version of React.

* * *

### Specifying what goes into the shell[](#specifying-what-goes-into-the-shell "Link for Specifying what goes into the shell ")

The part of your app outside of any `<Suspense>` boundaries is called _the shell:_

    function ProfilePage() 

It determines the earliest loading state that the user may see:

    <ProfileLayout>  <ProfileCover />  <BigSpinner /></ProfileLayout>

If you wrap the whole app into a `<Suspense>` boundary at the root, the shell will only contain that spinner. However, that’s not a pleasant user experience because seeing a big spinner on the screen can feel slower and more annoying than waiting a bit more and seeing the real layout. This is why usually you’ll want to place the `<Suspense>` boundaries so that the shell feels _minimal but complete_—like a skeleton of the entire page layout.

The `onShellReady` callback fires when the entire shell has been rendered. Usually, you’ll start streaming then:

    const );

By the time `onShellReady` fires, components in nested `<Suspense>` boundaries might still be loading data.

* * *

### Logging crashes on the server[](#logging-crashes-on-the-server "Link for Logging crashes on the server ")

By default, all errors on the server are logged to console. You can override this behavior to log crash reports:

    const );

If you provide a custom `onError` implementation, don’t forget to also log errors to the console like above.

* * *

### Recovering from errors inside the shell[](#recovering-from-errors-inside-the-shell "Link for Recovering from errors inside the shell ")

In this example, the shell contains `ProfileLayout`, `ProfileCover`, and `PostsGlimmer`:

    function ProfilePage() 

If an error occurs while rendering those components, React won’t have any meaningful HTML to send to the client. Override `onShellError` to send a fallback HTML that doesn’t rely on server rendering as the last resort:

    const );

If there is an error while generating the shell, both `onError` and `onShellError` will fire. Use `onError` for error reporting and use `onShellError` to send the fallback HTML document. Your fallback HTML does not have to be an error page. Instead, you may include an alternative shell that renders your app on the client only.

* * *

### Recovering from errors outside the shell[](#recovering-from-errors-outside-the-shell "Link for Recovering from errors outside the shell ")

In this example, the `<Posts />` component is wrapped in `<Suspense>` so it is _not_ a part of the shell:

    function ProfilePage() 

If an error happens in the `Posts` component or somewhere inside it, React will [try to recover from it:](../../react/Suspense.html#providing-a-fallback-for-server-errors-and-server-only-content)

1.  It will emit the loading fallback for the closest `<Suspense>` boundary (`PostsGlimmer`) into the HTML.
2.  It will “give up” on trying to render the `Posts` content on the server anymore.
3.  When the JavaScript code loads on the client, React will _retry_ rendering `Posts` on the client.

If retrying rendering `Posts` on the client _also_ fails, React will throw the error on the client. As with all the errors thrown during rendering, the [closest parent error boundary](../../react/Component.html#static-getderivedstatefromerror) determines how to present the error to the user. In practice, this means that the user will see a loading indicator until it is certain that the error is not recoverable.

If retrying rendering `Posts` on the client succeeds, the loading fallback from the server will be replaced with the client rendering output. The user will not know that there was a server error. However, the server `onError` callback and the client [`onRecoverableError`](../client/hydrateRoot.html#hydrateroot) callbacks will fire so that you can get notified about the error.

* * *

### Setting the status code[](#setting-the-status-code "Link for Setting the status code ")

Streaming introduces a tradeoff. You want to start streaming the page as early as possible so that the user can see the content sooner. However, once you start streaming, you can no longer set the response status code.

By [dividing your app](#specifying-what-goes-into-the-shell) into the shell (above all `<Suspense>` boundaries) and the rest of the content, you’ve already solved a part of this problem. If the shell errors, you’ll get the `onShellError` callback which lets you set the error status code. Otherwise, you know that the app may recover on the client, so you can send “OK”.

    const );

If a component _outside_ the shell (i.e. inside a `<Suspense>` boundary) throws an error, React will not stop rendering. This means that the `onError` callback will fire, but you will still get `onShellReady` instead of `onShellError`. This is because React will try to recover from that error on the client, [as described above.](#recovering-from-errors-outside-the-shell)

However, if you’d like, you can use the fact that something has errored to set the status code:

    let didError = false;const );

This will only catch errors outside the shell that happened while generating the initial shell content, so it’s not exhaustive. If knowing whether an error occurred for some content is critical, you can move it up into the shell.

* * *

### Handling different errors in different ways[](#handling-different-errors-in-different-ways "Link for Handling different errors in different ways ")

You can [create your own `Error` subclasses](https://javascript.info/custom-errors) and use the [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) operator to check which error is thrown. For example, you can define a custom `NotFoundError` and throw it from your component. Then your `onError`, `onShellReady`, and `onShellError` callbacks can do something different depending on the error type:

    let didError = false;let caughtError = null;function getStatusCode() );

Keep in mind that once you emit the shell and start streaming, you can’t change the status code.

* * *

### Waiting for all content to load for crawlers and static generation[](#waiting-for-all-content-to-load-for-crawlers-and-static-generation "Link for Waiting for all content to load for crawlers and static generation ")

Streaming offers a better user experience because the user can see the content as it becomes available.

However, when a crawler visits your page, or if you’re generating the pages at the build time, you might want to let all of the content load first and then produce the final HTML output instead of revealing it progressively.

You can wait for all the content to load using the `onAllReady` callback:

    let didError = false;let isCrawler = // ... depends on your bot detection strategy ...const );

A regular visitor will get a stream of progressively loaded content. A crawler will receive the final HTML output after all the data loads. However, this also means that the crawler will have to wait for _all_ data, some of which might be slow to load or error. Depending on your app, you could choose to send the shell to the crawlers too.

* * *

### Aborting server rendering[](#aborting-server-rendering "Link for Aborting server rendering ")

You can force the server rendering to “give up” after a timeout:

    const , 10000);

React will flush the remaining loading fallbacks as HTML, and will attempt to render the rest on the client.

[PreviousrenderToNodeStream](renderToNodeStream.html)[NextrenderToReadableStream](renderToReadableStream.html)

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
*   [`renderToPipeableStream(reactNode, options?)`](#rendertopipeablestream)
*   [Usage](#usage)
*   [Rendering a React tree as HTML to a Node.js Stream](#rendering-a-react-tree-as-html-to-a-nodejs-stream)
*   [Streaming more content as it loads](#streaming-more-content-as-it-loads)
*   [Specifying what goes into the shell](#specifying-what-goes-into-the-shell)
*   [Logging crashes on the server](#logging-crashes-on-the-server)
*   [Recovering from errors inside the shell](#recovering-from-errors-inside-the-shell)
*   [Recovering from errors outside the shell](#recovering-from-errors-outside-the-shell)
*   [Setting the status code](#setting-the-status-code)
*   [Handling different errors in different ways](#handling-different-errors-in-different-ways)
*   [Waiting for all content to load for crawlers and static generation](#waiting-for-all-content-to-load-for-crawlers-and-static-generation)
*   [Aborting server rendering](#aborting-server-rendering)

