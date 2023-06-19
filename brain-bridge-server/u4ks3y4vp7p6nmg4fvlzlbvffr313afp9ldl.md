Common components (e.g. <div>) – React

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

Common components (e.g. <div>)[](#undefined "Link for this heading")
====================================================================

All built-in browser components, such as [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div), support some common props and events.

*   [Reference](#reference)
    *   [Common components (e.g. `<div>`)](#common)
    *   [`ref` callback function](#ref-callback)
    *   [React event object](#react-event-object)
    *   [`AnimationEvent` handler function](#animationevent-handler)
    *   [`ClipboardEvent` handler function](#clipboadevent-handler)
    *   [`CompositionEvent` handler function](#compositionevent-handler)
    *   [`DragEvent` handler function](#dragevent-handler)
    *   [`FocusEvent` handler function](#focusevent-handler)
    *   [`Event` handler function](#event-handler)
    *   [`InputEvent` handler function](#inputevent-handler)
    *   [`KeyboardEvent` handler function](#keyboardevent-handler)
    *   [`MouseEvent` handler function](#mouseevent-handler)
    *   [`PointerEvent` handler function](#pointerevent-handler)
    *   [`TouchEvent` handler function](#touchevent-handler)
    *   [`TransitionEvent` handler function](#transitionevent-handler)
    *   [`UIEvent` handler function](#uievent-handler)
    *   [`WheelEvent` handler function](#wheelevent-handler)
*   [Usage](#usage)
    *   [Applying CSS styles](#applying-css-styles)
    *   [Manipulating a DOM node with a ref](#manipulating-a-dom-node-with-a-ref)
    *   [Dangerously setting the inner HTML](#dangerously-setting-the-inner-html)
    *   [Handling mouse events](#handling-mouse-events)
    *   [Handling pointer events](#handling-pointer-events)
    *   [Handling focus events](#handling-focus-events)
    *   [Handling keyboard events](#handling-keyboard-events)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### Common components (e.g. `<div>`)[](#common "Link for this heading")

    <div className="wrapper">Some content</div>

[See more examples below.](#usage)

#### Props[](#common-props "Link for Props ")

These special React props are supported for all built-in components:

*   `children`: A React node (an element, a string, a number, [a portal,](../createPortal.html) an empty node like `null`, `undefined` and booleans, or an array of other React nodes). Specifies the content inside the component. When you use JSX, you will usually specify the `children` prop implicitly by nesting tags like `<div><span /></div>`.
    
*   `dangerouslySetInnerHTML`: An object of the form `` with a raw HTML string inside. Overrides the [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property of the DOM node and displays the passed HTML inside. This should be used with extreme caution! If the HTML inside isn’t trusted (for example, if it’s based on user data), you risk introducing an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability. [Read more about using `dangerouslySetInnerHTML`.](#dangerously-setting-the-inner-html)
    
*   `ref`: A ref object from [`useRef`](../../react/useRef.html) or [`createRef`](../../react/createRef.html), or a [`ref` callback function,](#ref-callback) or a string for [legacy refs.](https://reactjs.org/docs/refs-and-the-dom.html#legacy-api-string-refs) Your ref will be filled with the DOM element for this node. [Read more about manipulating the DOM with refs.](#manipulating-a-dom-node-with-a-ref)
    
*   `suppressContentEditableWarning`: A boolean. If `true`, suppresses the warning that React shows for elements that both have `children` and `contentEditable=` (which normally do not work together). Use this if you’re building a text input library that manages the `contentEditable` content manually.
    
*   `suppressHydrationWarning`: A boolean. If you use [server rendering,](../server.html) normally there is a warning when the server and the client render different content. In some rare cases (like timestamps), it is very hard or impossible to guarantee an exact match. If you set `suppressHydrationWarning` to `true`, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don’t overuse it. [Read about suppressing hydration errors.](../client/hydrateRoot.html#suppressing-unavoidable-hydration-mismatch-errors)
    
*   `style`: An object with CSS styles, for example ``. Similarly to the DOM [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property, the CSS property names need to be written as `camelCase`, for example `fontWeight` instead of `font-weight`. You can pass strings or numbers as values. If you pass a number, like `width: 100`, React will automatically append `px` (“pixels”) to the value unless it’s a [unitless property.](https://github.com/facebook/react/blob/81d4ee9ca5c405dce62f64e61506b8e155f38d8d/packages/react-dom-bindings/src/shared/CSSProperty.js#L8-L57) We recommend using `style` only for dynamic styles where you don’t know the style values ahead of time. In other cases, applying plain CSS classes with `className` is more efficient. [Read more about `className` and `style`.](#applying-css-styles)
    

These standard DOM props are also supported for all built-in components:

*   [`accessKey`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey): A string. Specifies a keyboard shortcut for the element. [Not generally recommended.](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey#accessibility_concerns)
*   [`aria-*`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes): ARIA attributes let you specify the accessibility tree information for this element. See [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes) for a complete reference. In React, all ARIA attribute names are exactly the same as in HTML.
*   [`autoCapitalize`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize): A string. Specifies whether and how the user input should be capitalized.
*   [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className): A string. Specifies the element’s CSS class name. [Read more about applying CSS styles.](#applying-css-styles)
*   [`contentEditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable): A boolean. If `true`, the browser lets the user edit the rendered element directly. This is used to implement rich text input libraries like [Lexical.](https://lexical.dev/) React warns if you try to pass React children to an element with `contentEditable=` because React will not be able to update its content after user edits.
*   [`data-*`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*): Data attributes let you attach some string data to the element, for example `data-fruit="banana"`. In React, they are not commonly used because you would usually read data from props or state instead.
*   [`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir): Either `'ltr'` or `'rtl'`. Specifies the text direction of the element.
*   [`draggable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/draggable): A boolean. Specifies whether the element is draggable. Part of [HTML Drag and Drop API.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
*   [`enterKeyHint`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/enterKeyHint): A string. Specifies which action to present for the enter key on virtual keyboards.
*   [`htmlFor`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor): A string. For [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) and [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output), lets you [associate the label with some control.](input.html#providing-a-label-for-an-input) Same as [`for` HTML attribute.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) React uses the standard DOM property names (`htmlFor`) instead of HTML attribute names.
*   [`hidden`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/hidden): A boolean or a string. Specifies whether the element should be hidden.
*   [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id): A string. Specifies a unique identifier for this element, which can be used to find it later or connect it with other elements. Generate it with [`useId`](../../react/useId.html) to avoid clashes between multiple instances of the same component.
*   [`is`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/is): A string. If specified, the component will behave like a [custom element.](../components.html#custom-html-elements)
*   [`inputMode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode): A string. Specifies what kind of keyboard to display (for example, text, number or telephone).
*   [`itemProp`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemprop): A string. Specifies which property the element represents for structured data crawlers.
*   [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang): A string. Specifies the language of the element.
*   [`onAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event): An [`AnimationEvent` handler](#animationevent-handler) function. Fires when a CSS animation completes.
*   `onAnimationEndCapture`: A version of `onAnimationEnd` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event): An [`AnimationEvent` handler](#animationevent-handler) function. Fires when an iteration of a CSS animation ends, and another one begins.
*   `onAnimationIterationCapture`: A version of `onAnimationIteration` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event): An [`AnimationEvent` handler](#animationevent-handler) function. Fires when a CSS animation starts.
*   `onAnimationStartCapture`: `onAnimationStart`, but fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onAuxClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when a non-primary pointer button was clicked.
*   `onAuxClickCapture`: A version of `onAuxClick` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   `onBeforeInput`: An [`InputEvent` handler](#inputevent-handler) function. Fires before the value of an editable element is modified. React does _not_ yet use the native [`beforeinput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event) event, and instead attempts to polyfill it using other events.
*   `onBeforeInputCapture`: A version of `onBeforeInput` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   `onBlur`: A [`FocusEvent` handler](#focusevent-handler) function. Fires when an element lost focus. Unlike the built-in browser [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event, in React the `onBlur` event bubbles.
*   `onBlurCapture`: A version of `onBlur` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the primary button was clicked on the pointing device.
*   `onClickCapture`: A version of `onClick` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCompositionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event): A [`CompositionEvent` handler](#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) starts a new composition session.
*   `onCompositionStartCapture`: A version of `onCompositionStart` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCompositionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event): A [`CompositionEvent` handler](#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) completes or cancels a composition session.
*   `onCompositionEndCapture`: A version of `onCompositionEnd` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCompositionUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event): A [`CompositionEvent` handler](#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) receives a new character.
*   `onCompositionUpdateCapture`: A version of `onCompositionUpdate` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onContextMenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the user tries to open a context menu.
*   `onContextMenuCapture`: A version of `onContextMenu` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCopy`](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event): A [`ClipboardEvent` handler](#clipboardevent-handler) function. Fires when the user tries to copy something into the clipboard.
*   `onCopyCapture`: A version of `onCopy` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/cut_event): A [`ClipboardEvent` handler](#clipboardevent-handler) function. Fires when the user tries to cut something into the clipboard.
*   `onCutCapture`: A version of `onCut` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   `onDoubleClick`: A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the user clicks twice. Corresponds to the browser [`dblclick` event.](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)
*   `onDoubleClickCapture`: A version of `onDoubleClick` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDrag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event): A [`DragEvent` handler](#dragevent-handler) function. Fires while the user is dragging something.
*   `onDragCapture`: A version of `onDrag` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDragEnd`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event): A [`DragEvent` handler](#dragevent-handler) function. Fires when the user stops dragging something.
*   `onDragEndCapture`: A version of `onDragEnd` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDragEnter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event): A [`DragEvent` handler](#dragevent-handler) function. Fires when the dragged content enters a valid drop target.
*   `onDragEnterCapture`: A version of `onDragEnter` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDragOver`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event): A [`DragEvent` handler](#dragevent-handler) function. Fires on a valid drop target while the dragged content is dragged over it. You must call `e.preventDefault()` here to allow dropping.
*   `onDragOverCapture`: A version of `onDragOver` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDragStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event): A [`DragEvent` handler](#dragevent-handler) function. Fires when the user starts dragging an element.
*   `onDragStartCapture`: A version of `onDragStart` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDrop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event): A [`DragEvent` handler](#dragevent-handler) function. Fires when something is dropped on a valid drop target.
*   `onDropCapture`: A version of `onDrop` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   `onFocus`: A [`FocusEvent` handler](#focusevent-handler) function. Fires when an element lost focus. Unlike the built-in browser [`focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event) event, in React the `onFocus` event bubbles.
*   `onFocusCapture`: A version of `onFocus` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onGotPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when an element programmatically captures a pointer.
*   `onGotPointerCaptureCapture`: A version of `onGotPointerCapture` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onKeyDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event): A [`KeyboardEvent` handler](#pointerevent-handler) function. Fires when a key is pressed.
*   `onKeyDownCapture`: A version of `onKeyDown` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onKeyPress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event): A [`KeyboardEvent` handler](#pointerevent-handler) function. Deprecated. Use `onKeyDown` or `onBeforeInput` instead.
*   `onKeyPressCapture`: A version of `onKeyPress` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onKeyUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event): A [`KeyboardEvent` handler](#pointerevent-handler) function. Fires when a key is released.
*   `onKeyUpCapture`: A version of `onKeyUp` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onLostPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when an element stops capturing a pointer.
*   `onLostPointerCaptureCapture`: A version of `onLostPointerCapture` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onMouseDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer is pressed down.
*   `onMouseDownCapture`: A version of `onMouseDown` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onMouseEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer moves inside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
*   [`onMouseLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer moves outside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
*   [`onMouseMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer changes coordinates.
*   `onMouseMoveCapture`: A version of `onMouseMove` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onMouseOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer moves outside an element, or if it moves into a child element.
*   `onMouseOutCapture`: A version of `onMouseOut` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onMouseUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event): A [`MouseEvent` handler](#mouseevent-handler) function. Fires when the pointer is released.
*   `onMouseUpCapture`: A version of `onMouseUp` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPointerCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when the browser cancels a pointer interaction.
*   `onPointerCancelCapture`: A version of `onPointerCancel` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPointerDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer becomes active.
*   `onPointerDownCapture`: A version of `onPointerDown` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPointerEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer moves inside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
*   [`onPointerLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer moves outside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
*   [`onPointerMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer changes coordinates.
*   `onPointerMoveCapture`: A version of `onPointerMove` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPointerOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer moves outside an element, if the pointer interaction is cancelled, and [a few other reasons.](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event)
*   `onPointerOutCapture`: A version of `onPointerOut` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPointerUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event): A [`PointerEvent` handler](#pointerevent-handler) function. Fires when a pointer is no longer active.
*   `onPointerUpCapture`: A version of `onPointerUp` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPaste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event): A [`ClipboardEvent` handler](#clipboardevent-handler) function. Fires when the user tries to paste something from the clipboard.
*   `onPasteCapture`: A version of `onPaste` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onScroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event): An [`Event` handler](#event-handler) function. Fires when an element has been scrolled. This event does not bubble.
*   `onScrollCapture`: A version of `onScroll` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): An [`Event` handler](#event-handler) function. Fires after the selection inside an editable element like an input changes. React extends the `onSelect` event to work for `contentEditable=` elements as well. In addition, React extends it to fire for empty selection and on edits (which may affect the selection).
*   `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTouchCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event): A [`TouchEvent` handler](#touchevent-handler) function. Fires when the browser cancels a touch interaction.
*   `onTouchCancelCapture`: A version of `onTouchCancel` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTouchEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event): A [`TouchEvent` handler](#touchevent-handler) function. Fires when one or more touch points are removed.
*   `onTouchEndCapture`: A version of `onTouchEnd` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTouchMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event): A [`TouchEvent` handler](#touchevent-handler) function. Fires one or more touch points are moved.
*   `onTouchMoveCapture`: A version of `onTouchMove` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTouchStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event): A [`TouchEvent` handler](#touchevent-handler) function. Fires when one or more touch points are placed.
*   `onTouchStartCapture`: A version of `onTouchStart` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event): A [`TransitionEvent` handler](#transitionevent-handler) function. Fires when a CSS transition completes.
*   `onTransitionEndCapture`: A version of `onTransitionEnd` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onWheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event): A [`WheelEvent` handler](#wheelevent-handler) function. Fires when the user rotates a wheel button.
*   `onWheelCapture`: A version of `onWheel` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`role`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): A string. Specifies the element role explicitly for assistive technologies. nt.
*   [`slot`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles): A string. Specifies the slot name when using shadow DOM. In React, an equivalent pattern is typically achieved by passing JSX as props, for example `<Layout left= />`.
*   [`spellCheck`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck): A boolean or null. If explicitly set to `true` or `false`, enables or disables spellchecking.
*   [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex): A number. Overrides the default Tab button behavior. [Avoid using values other than `-1` and `0`.](https://www.tpgi.com/using-the-tabindex-attribute/)
*   [`title`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title): A string. Specifies the tooltip text for the element.
*   [`translate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/translate): Either `'yes'` or `'no'`. Passing `'no'` excludes the element content from being translated.

You can also pass custom attributes as props, for example `mycustomprop="someValue"`. This can be useful when integrating with third-party libraries. The custom attribute name must be lowercase and must not start with `on`. The value will be converted to a string. If you pass `null` or `undefined`, the custom attribute will be removed.

These events fire only for the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) elements:

*   [`onReset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event): An [`Event` handler](#event-handler) function. Fires when a form gets reset.
*   `onResetCapture`: A version of `onReset` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSubmit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event): An [`Event` handler](#event-handler) function. Fires when a form gets submitted.
*   `onSubmitCapture`: A version of `onSubmit` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)

These events fire only for the [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) elements. Unlike browser events, they bubble in React:

*   [`onCancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event): An [`Event` handler](#event-handler) function. Fires when the user tries to dismiss the dialog.
*   `onCancelCapture`: A version of `onCancel` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events) capture-phase-events)
*   [`onClose`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event): An [`Event` handler](#event-handler) function. Fires when a dialog has been closed.
*   `onCloseCapture`: A version of `onClose` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)

These events fire only for the [`<details>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) elements. Unlike browser events, they bubble in React:

*   [`onToggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement/toggle_event): An [`Event` handler](#event-handler) function. Fires when the user toggles the details.
*   `onToggleCapture`: A version of `onToggle` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events) capture-phase-events)

These events fire for [`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img), [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), [`<object>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object), [`<embed>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed), [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link), and [SVG `<image>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/SVG_Image_Tag) elements. Unlike browser events, they bubble in React:

*   `onLoad`: An [`Event` handler](#event-handler) function. Fires when the resource has loaded.
*   `onLoadCapture`: A version of `onLoad` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): An [`Event` handler](#event-handler) function. Fires when the resource could not be loaded.
*   `onErrorCapture`: A version of `onError` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)

These events fire for resources like [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video). Unlike browser events, they bubble in React:

*   [`onAbort`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event): An [`Event` handler](#event-handler) function. Fires when the resource has not fully loaded, but not due to an error.
*   `onAbortCapture`: A version of `onAbort` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCanPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event): An [`Event` handler](#event-handler) function. Fires when there’s enough data to start playing, but not enough to play to the end without buffering.
*   `onCanPlayCapture`: A version of `onCanPlay` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onCanPlayThrough`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event): An [`Event` handler](#event-handler) function. Fires when there’s enough data that it’s likely possible to start playing without buffering until the end.
*   `onCanPlayThroughCapture`: A version of `onCanPlayThrough` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onDurationChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event): An [`Event` handler](#event-handler) function. Fires when the media duration has updated.
*   `onDurationChangeCapture`: A version of `onDurationChange` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onEmptied`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event): An [`Event` handler](#event-handler) function. Fires when the media has become empty.
*   `onEmptiedCapture`: A version of `onEmptied` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onEncrypted`](https://w3c.github.io/encrypted-media/#dom-evt-encrypted): An [`Event` handler](#event-handler) function. Fires when the browser encounters encrypted media.
*   `onEncryptedCapture`: A version of `onEncrypted` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onEnded`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event): An [`Event` handler](#event-handler) function. Fires when the playback stops because there’s nothing left to play.
*   `onEndedCapture`: A version of `onEnded` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): An [`Event` handler](#event-handler) function. Fires when the resource could not be loaded.
*   `onErrorCapture`: A version of `onError` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onLoadedData`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event): An [`Event` handler](#event-handler) function. Fires when the current playback frame has loaded.
*   `onLoadedDataCapture`: A version of `onLoadedData` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onLoadedMetadata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event): An [`Event` handler](#event-handler) function. Fires when metadata has loaded.
*   `onLoadedMetadataCapture`: A version of `onLoadedMetadata` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onLoadStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event): An [`Event` handler](#event-handler) function. Fires when the browser started loading the resource.
*   `onLoadStartCapture`: A version of `onLoadStart` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPause`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event): An [`Event` handler](#event-handler) function. Fires when the media was paused.
*   `onPauseCapture`: A version of `onPause` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event): An [`Event` handler](#event-handler) function. Fires when the media is no longer paused.
*   `onPlayCapture`: A version of `onPlay` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onPlaying`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event): An [`Event` handler](#event-handler) function. Fires when the media starts or restarts playing.
*   `onPlayingCapture`: A version of `onPlaying` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onProgress`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event): An [`Event` handler](#event-handler) function. Fires periodically while the resource is loading.
*   `onProgressCapture`: A version of `onProgress` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onRateChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event): An [`Event` handler](#event-handler) function. Fires when playback rate changes.
*   `onRateChangeCapture`: A version of `onRateChange` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   `onResize`: An [`Event` handler](#event-handler) function. Fires when video changes size.
*   `onResizeCapture`: A version of `onResize` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSeeked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event): An [`Event` handler](#event-handler) function. Fires when a seek operation completes.
*   `onSeekedCapture`: A version of `onSeeked` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSeeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event): An [`Event` handler](#event-handler) function. Fires when a seek operation starts.
*   `onSeekingCapture`: A version of `onSeeking` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onStalled`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event): An [`Event` handler](#event-handler) function. Fires when the browser is waiting for data but it keeps not loading.
*   `onStalledCapture`: A version of `onStalled` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSuspend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event): An [`Event` handler](#event-handler) function. Fires when loading the resource was suspended.
*   `onSuspendCapture`: A version of `onSuspend` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onTimeUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event): An [`Event` handler](#event-handler) function. Fires when the current playback time updates.
*   `onTimeUpdateCapture`: A version of `onTimeUpdate` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onVolumeChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event): An [`Event` handler](#event-handler) function. Fires when the volume has changed.
*   `onVolumeChangeCapture`: A version of `onVolumeChange` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event): An [`Event` handler](#event-handler) function. Fires when the playback stopped due to temporary lack of data.
*   `onWaitingCapture`: A version of `onWaiting` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)

#### Caveats[](#common-caveats "Link for Caveats ")

*   You cannot pass both `children` and `dangerouslySetInnerHTML` at the same time.
*   Some events (like `onAbort` and `onLoad`) don’t bubble in the browser, but bubble in React.

* * *

### `ref` callback function[](#ref-callback "Link for this heading")

Instead of a ref object (like the one returned by [`useRef`](../../react/useRef.html#manipulating-the-dom-with-a-ref)), you may pass a function to the `ref` attribute.

    <div ref= />

[See an example of using the `ref` callback.](../../../learn/manipulating-the-dom-with-refs.html#how-to-manage-a-list-of-refs-using-a-ref-callback)

When the `<div>` DOM node is added to the screen, React will call your `ref` callback with the DOM `node` as the argument. When that `<div>` DOM node is removed, React will call your `ref` callback with `null`.

React will also call your `ref` callback whenever you pass a _different_ `ref` callback. In the above example, `(node) => ` is a different function on every render. When your component re-renders, the _previous_ function will be called with `null` as the argument, and the _next_ function will be called with the DOM node.

#### Parameters[](#ref-callback-parameters "Link for Parameters ")

*   `node`: A DOM node or `null`. React will pass you the DOM node when the ref gets attached, and `null` when the ref gets detached. Unless you pass the same function reference for the `ref` callback on every render, the callback will get temporarily detached and re-attached during every re-render of the component.

#### Returns[](#returns "Link for Returns ")

Do not return anything from the `ref` callback.

* * *

### React event object[](#react-event-object "Link for React event object ")

Your event handlers will receive a _React event object._ It is also sometimes known as a “synthetic event”.

    <button onClick= />

It conforms to the same standard as the underlying DOM events, but fixes some browser inconsistencies.

Some React events do not map directly to the browser’s native events. For example in `onMouseLeave`, `e.nativeEvent` will point to a `mouseout` event. The specific mapping is not part of the public API and may change in the future. If you need the underlying browser event for some reason, read it from `e.nativeEvent`.

#### Properties[](#react-event-object-properties "Link for Properties ")

React event objects implement some of the standard [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) properties:

*   [`bubbles`](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles): A boolean. Returns whether the event bubbles through the DOM.
*   [`cancelable`](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable): A boolean. Returns whether the event can be canceled.
*   [`currentTarget`](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget): A DOM node. Returns the node to which the current handler is attached in the React tree.
*   [`defaultPrevented`](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented): A boolean. Returns whether `preventDefault` was called.
*   [`eventPhase`](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase): A number. Returns which phase the event is currently in.
*   [`isTrusted`](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted): A boolean. Returns whether the event was initiated by user.
*   [`target`](https://developer.mozilla.org/en-US/docs/Web/API/Event/target): A DOM node. Returns the node on which the event has occurred (which could be a distant child).
*   [`timeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/Event/timeStamp): A number. Returns the time when the event occurred.

Additionally, React event objects provide these properties:

*   `nativeEvent`: A DOM [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event). The original browser event object.

#### Methods[](#react-event-object-methods "Link for Methods ")

React event objects implement some of the standard [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) methods:

*   [`preventDefault()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault): Prevents the default browser action for the event.
*   [`stopPropagation()`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation): Stops the event propagation through the React tree.

Additionally, React event objects provide these methods:

*   `isDefaultPrevented()`: Returns a boolean value indicating whether `preventDefault` was called.
*   `isPropagationStopped()`: Returns a boolean value indicating whether `stopPropagation` was called.
*   `persist()`: Not used with React DOM. With React Native, call this to read event’s properties after the event.
*   `isPersistent()`: Not used with React DOM. With React Native, returns whether `persist` has been called.

#### Caveats[](#react-event-object-caveats "Link for Caveats ")

*   The values of `currentTarget`, `eventPhase`, `target`, and `type` reflect the values your React code expects. Under the hood, React attaches event handlers at the root, but this is not reflected in React event objects. For example, `e.currentTarget` may not be the same as the underlying `e.nativeEvent.currentTarget`. For polyfilled events, `e.type` (React event type) may differ from `e.nativeEvent.type` (underlying type).

* * *

### `AnimationEvent` handler function[](#animationevent-handler "Link for this heading")

An event handler type for the [CSS animation](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations) events.

    <div  onAnimationStart=/>

#### Parameters[](#animationevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`AnimationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent) properties:
    *   [`animationName`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/animationName)
    *   [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent/elapsedTime)
    *   [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent)

* * *

### `ClipboardEvent` handler function[](#clipboadevent-handler "Link for this heading")

An event handler type for the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) events.

    <input  onCopy=/>

#### Parameters[](#clipboadevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`ClipboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent) properties:
    
    *   [`clipboardData`](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent/clipboardData)

* * *

### `CompositionEvent` handler function[](#compositionevent-handler "Link for this heading")

An event handler type for the [input method editor (IME)](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) events.

    <input  onCompositionStart=/>

#### Parameters[](#compositionevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`CompositionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent) properties:
    *   [`data`](https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent/data)

* * *

### `DragEvent` handler function[](#dragevent-handler "Link for this heading")

An event handler type for the [HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) events.

    <>  <div    draggable=  >    Drop target  </div></>

#### Parameters[](#dragevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`DragEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent) properties:
    
    *   [`dataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/dataTransfer)
    
    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    *   [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    *   [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    *   [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    *   [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    *   [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    *   [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    *   [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    *   [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    *   [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    *   [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    *   [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `FocusEvent` handler function[](#focusevent-handler "Link for this heading")

An event handler type for the focus events.

    <input  onFocus=/>

[See an example.](#handling-focus-events)

#### Parameters[](#focusevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`FocusEvent`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent) properties:
    
    *   [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `Event` handler function[](#event-handler "Link for this heading")

An event handler type for generic events.

#### Parameters[](#event-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with no additional properties.

* * *

### `InputEvent` handler function[](#inputevent-handler "Link for this heading")

An event handler type for the `onBeforeInput` event.

    <input onBeforeInput= />

#### Parameters[](#inputevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`InputEvent`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent) properties:
    *   [`data`](https://developer.mozilla.org/en-US/docs/Web/API/InputEvent/data)

* * *

### `KeyboardEvent` handler function[](#keyboardevent-handler "Link for this heading")

An event handler type for keyboard events.

    <input  onKeyDown=/>

[See an example.](#handling-keyboard-events)

#### Parameters[](#keyboardevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/altKey)
    *   [`charCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/charCode)
    *   [`code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/ctrlKey)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)
    *   [`key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)
    *   [`keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
    *   [`locale`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/locale)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/metaKey)
    *   [`location`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location)
    *   [`repeat`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey)
    *   [`which`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/which)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `MouseEvent` handler function[](#mouseevent-handler "Link for this heading")

An event handler type for mouse events.

    <div  onClick=/>

[See an example.](#handling-mouse-events)

#### Parameters[](#mouseevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    *   [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    *   [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    *   [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    *   [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    *   [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    *   [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    *   [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    *   [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    *   [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    *   [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    *   [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `PointerEvent` handler function[](#pointerevent-handler "Link for this heading")

An event handler type for [pointer events.](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)

    <div  onPointerEnter=/>

[See an example.](#handling-pointer-events)

#### Parameters[](#pointerevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent) properties:
    
    *   [`height`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/height)
    *   [`isPrimary`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/isPrimary)
    *   [`pointerId`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId)
    *   [`pointerType`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerType)
    *   [`pressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pressure)
    *   [`tangentialPressure`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tangentialPressure)
    *   [`tiltX`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltX)
    *   [`tiltY`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/tiltY)
    *   [`twist`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/twist)
    *   [`width`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/width)
    
    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    *   [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    *   [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    *   [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    *   [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    *   [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    *   [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    *   [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    *   [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    *   [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    *   [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    *   [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `TouchEvent` handler function[](#touchevent-handler "Link for this heading")

An event handler type for [touch events.](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

    <div  onTouchStart=/>

#### Parameters[](#touchevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`TouchEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/altKey)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/ctrlKey)
    *   [`changedTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/changedTouches)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/getModifierState)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/metaKey)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/shiftKey)
    *   [`touches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/touches)
    *   [`targetTouches`](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/targetTouches)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `TransitionEvent` handler function[](#transitionevent-handler "Link for this heading")

An event handler type for the CSS transition events.

    <div  onTransitionEnd=/>

#### Parameters[](#transitionevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`TransitionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent) properties:
    *   [`elapsedTime`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/elapsedTime)
    *   [`propertyName`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/propertyName)
    *   [`pseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent/pseudoElement)

* * *

### `UIEvent` handler function[](#uievent-handler "Link for this heading")

An event handler type for generic UI events.

    <div  onScroll=/>

#### Parameters[](#uievent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

### `WheelEvent` handler function[](#wheelevent-handler "Link for this heading")

An event handler type for the `onWheel` event.

    <div  onScroll=/>

#### Parameters[](#wheelevent-handler-parameters "Link for Parameters ")

*   `e`: A [React event object](#react-event-object) with these extra [`WheelEvent`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent) properties:
    
    *   [`deltaMode`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode)
    *   [`deltaX`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaX)
    *   [`deltaY`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaY)
    *   [`deltaZ`](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaZ)
    
    It also includes the inherited [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) properties:
    
    *   [`altKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/altKey)
    *   [`button`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button)
    *   [`buttons`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons)
    *   [`ctrlKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/ctrlKey)
    *   [`clientX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX)
    *   [`clientY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientY)
    *   [`getModifierState(key)`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/getModifierState)
    *   [`metaKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/metaKey)
    *   [`movementX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementX)
    *   [`movementY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/movementY)
    *   [`pageX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageX)
    *   [`pageY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/pageY)
    *   [`relatedTarget`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
    *   [`screenX`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenX)
    *   [`screenY`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/screenY)
    *   [`shiftKey`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/shiftKey)
    
    It also includes the inherited [`UIEvent`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent) properties:
    
    *   [`detail`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
    *   [`view`](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Applying CSS styles[](#applying-css-styles "Link for Applying CSS styles ")

In React, you specify a CSS class with [`className`.](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) It works like the `class` attribute in HTML:

    <img className="avatar" />

Then you write the CSS rules for it in a separate CSS file:

    /* In your CSS */.avatar 

React does not prescribe how you add CSS files. In the simplest case, you’ll add a [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

Sometimes, the style values depend on data. Use the `style` attribute to pass some styles dynamically:

    <img  className="avatar"  style=/>

In the above example, `style=` [JSX curly braces.](../../../learn/javascript-in-jsx-with-curly-braces.html) We recommend only using the `style` attribute when your styles depend on JavaScript variables.

App.jsAvatar.js

Avatar.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Avatar() {
  return (
    <img
      src\=
      alt\=
      className\="avatar"
      style\={{
        width: user.imageSize,
        height: user.imageSize
      }}
    />
  );
}

##### Deep Dive

#### How to apply multiple CSS classes conditionally?[](#how-to-apply-multiple-css-classes-conditionally "Link for How to apply multiple CSS classes conditionally? ")

Show Details

To apply CSS classes conditionally, you need to produce the `className` string yourself using JavaScript.

For example, `className=` will produce either `className="row"` or `className="row selected"` depending on whether `isSelected` is `true`.

To make this more readable, you can use a tiny helper library like [`classnames`:](https://github.com/JedWatson/classnames)

    import cn from 'classnames';function Row(

It is especially convenient if you have multiple conditional classes:

    import cn from 'classnames';function Row(

* * *

### Manipulating a DOM node with a ref[](#manipulating-a-dom-node-with-a-ref "Link for Manipulating a DOM node with a ref ")

Sometimes, you’ll need to get the browser DOM node associated with a tag in JSX. For example, if you want to focus an `<input>` when a button is clicked, you need to call [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the browser `<input>` DOM node.

To obtain the browser DOM node for a tag, [declare a ref](../../react/useRef.html) and pass it as the `ref` attribute to that tag:

    import  />    // ...

React will put the DOM node into `inputRef.current` after it’s been rendered to the screen.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <\>
      <input ref\= />
      <button onClick\=\>
        Focus the input
      </button\>
    </\>
  );
}

Show more

Read more about [manipulating DOM with refs](../../../learn/manipulating-the-dom-with-refs.html) and [check out more examples.](../../react/useRef.html#examples-dom)

For more advanced use cases, the `ref` attribute also accepts a [callback function.](#ref-callback)

* * *

### Dangerously setting the inner HTML[](#dangerously-setting-the-inner-html "Link for Dangerously setting the inner HTML ")

You can pass a raw HTML string to an element like so:

    const markup =  />;

**This is dangerous. As with the underlying DOM [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property, you must exercise extreme caution! Unless the markup is coming from a completely trusted source, it is trivial to introduce an [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) vulnerability this way.**

For example, if you use a Markdown library that converts Markdown to HTML, you trust that its parser doesn’t contain bugs, and the user only sees their own input, you can display the resulting HTML like this:

App.jsMarkdownPreview.jspackage.json

MarkdownPreview.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'remarkable';

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return ;
}

export default function MarkdownPreview() {
  const markup = renderMarkdownToHTML(markdown);
  return <div dangerouslySetInnerHTML\= />;
}

Show more

To see why rendering arbitrary HTML is dangerous, replace the code above with this:

    const post = 

The code embedded in the HTML will run. A hacker could use this security hole to steal user information or to perform actions on their behalf. **Only use `dangerouslySetInnerHTML` with trusted and sanitized data.**

* * *

### Handling mouse events[](#handling-mouse-events "Link for Handling mouse events ")

This example shows some common [mouse events](#mouseevent-handler) and when they fire.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function MouseExample() {
  return (
    <div
      onMouseEnter\=
      onMouseLeave\=
    \>
      <button
        onClick\=
        onMouseDown\=
        onMouseEnter\=
        onMouseLeave\=
        onMouseOver\=
        onMouseUp\=
      \>
        First button
      </button\>
      <button
        onClick\=
        onMouseDown\=
        onMouseEnter\=
        onMouseLeave\=
        onMouseOver\=
        onMouseUp\=
      \>
        Second button
      </button\>
    </div\>
  );
}

Show more

* * *

### Handling pointer events[](#handling-pointer-events "Link for Handling pointer events ")

This example shows some common [pointer events](#pointerevent-handler) and when they fire.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function PointerExample() {
  return (
    <div
      onPointerEnter\=
      onPointerLeave\=
      style\=
    \>
      <div
        onPointerDown\=
        onPointerEnter\=
        onPointerLeave\=
        onPointerMove\=
        onPointerUp\=
        style\=
      \>
        First child
      </div\>
      <div
        onPointerDown\=
        onPointerEnter\=
        onPointerLeave\=
        onPointerMove\=
        onPointerUp\=
        style\=
      \>
        Second child
      </div\>
    </div\>
  );
}

Show more

* * *

### Handling focus events[](#handling-focus-events "Link for Handling focus events ")

In React, [focus events](#focusevent-handler) bubble. You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from outside of the parent element. The example shows how to detect focusing a child, focusing the parent element, and how to detect focus entering or leaving the whole subtree.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function FocusExample() {
  return (
    <div
      tabIndex\=
      onFocus\={(e) \=> {
        if (e.currentTarget === e.target) {
          console.log('focused parent');
        } else {
          console.log('focused child', e.target.name);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered parent');
        }
      }}
      onBlur\={(e) \=> {
        if (e.currentTarget === e.target) {
          console.log('unfocused parent');
        } else {
          console.log('unfocused child', e.target.name);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left parent');
        }
      }}
    \>
      <label\>
        First name:
        <input name\="firstName" />
      </label\>
      <label\>
        Last name:
        <input name\="lastName" />
      </label\>
    </div\>
  );
}

Show more

* * *

### Handling keyboard events[](#handling-keyboard-events "Link for Handling keyboard events ")

This example shows some common [keyboard events](#keyboardevent-handler) and when they fire.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function KeyboardExample() {
  return (
    <label\>
      First name:
      <input
        name\="firstName"
        onKeyDown\=
        onKeyUp\=
      />
    </label\>
  );
}

[PreviousComponents](../components.html)[Next<input>](input.html)

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
*   [Common components (e.g. `<div>`)](#common)
*   [`ref` callback function](#ref-callback)
*   [React event object](#react-event-object)
*   [`AnimationEvent` handler function](#animationevent-handler)
*   [`ClipboardEvent` handler function](#clipboadevent-handler)
*   [`CompositionEvent` handler function](#compositionevent-handler)
*   [`DragEvent` handler function](#dragevent-handler)
*   [`FocusEvent` handler function](#focusevent-handler)
*   [`Event` handler function](#event-handler)
*   [`InputEvent` handler function](#inputevent-handler)
*   [`KeyboardEvent` handler function](#keyboardevent-handler)
*   [`MouseEvent` handler function](#mouseevent-handler)
*   [`PointerEvent` handler function](#pointerevent-handler)
*   [`TouchEvent` handler function](#touchevent-handler)
*   [`TransitionEvent` handler function](#transitionevent-handler)
*   [`UIEvent` handler function](#uievent-handler)
*   [`WheelEvent` handler function](#wheelevent-handler)
*   [Usage](#usage)
*   [Applying CSS styles](#applying-css-styles)
*   [Manipulating a DOM node with a ref](#manipulating-a-dom-node-with-a-ref)
*   [Dangerously setting the inner HTML](#dangerously-setting-the-inner-html)
*   [Handling mouse events](#handling-mouse-events)
*   [Handling pointer events](#handling-pointer-events)
*   [Handling focus events](#handling-focus-events)
*   [Handling keyboard events](#handling-keyboard-events)

