<select> – React

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

<select>[](#undefined "Link for this heading")
==============================================

The [built-in browser `<select>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) lets you render a select box with options.

    <select>  <option value="someOption">Some option</option>  <option value="otherOption">Other option</option></select>

*   [Reference](#reference)
    *   [`<select>`](#select)
*   [Usage](#usage)
    *   [Displaying a select box with options](#displaying-a-select-box-with-options)
    *   [Providing a label for a select box](#providing-a-label-for-a-select-box)
    *   [Providing an initially selected option](#providing-an-initially-selected-option)
    *   [Enabling multiple selection](#enabling-multiple-selection)
    *   [Reading the select box value when submitting a form](#reading-the-select-box-value-when-submitting-a-form)
    *   [Controlling a select box with a state variable](#controlling-a-select-box-with-a-state-variable)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<select>`[](#select "Link for this heading")

To display a select box, render the [built-in browser `<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) component.

    <select>  <option value="someOption">Some option</option>  <option value="otherOption">Other option</option></select>

[See more examples below.](#usage)

#### Props[](#props "Link for Props ")

`<select>` supports all [common element props.](common.html#props)

You can [make a select box controlled](#controlling-a-select-box-with-a-state-variable) by passing a `value` prop:

*   `value`: A string (or an array of strings for [`multiple=`](#enabling-multiple-selection)). Controls which option is selected. Every value string match the `value` of some `<option>` nested inside the `<select>`.

When you pass `value`, you must also pass an `onChange` handler that updates the passed value.

If your `<select>` is uncontrolled, you may pass the `defaultValue` prop instead:

*   `defaultValue`: A string (or an array of strings for [`multiple=`](#enabling-multiple-selection)). Specifies [the initially selected option.](#providing-an-initially-selected-option)

These `<select>` props are relevant both for uncontrolled and controlled select boxes:

*   [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-autocomplete): A string. Specifies one of the possible [autocomplete behaviors.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
*   [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-autofocus): A boolean. If `true`, React will focus the element on mount.
*   `children`: `<select>` accepts [`<option>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option), [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup), and [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup) components as children. You can also pass your own components as long as they eventually render one of the allowed components. If you pass your own components that eventually render `<option>` tags, each `<option>` you render must have a `value`.
*   [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-disabled): A boolean. If `true`, the select box will not be interactive and will appear dimmed.
*   [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-form): A string. Specifies the `id` of the `<form>` this select box belongs to. If omitted, it’s the closest parent form.
*   [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple): A boolean. If `true`, the browser allows [multiple selection.](#enabling-multiple-selection)
*   [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-name): A string. Specifies the name for this select box that’s [submitted with the form.](#reading-the-select-box-value-when-submitting-a-form)
*   `onChange`: An [`Event` handler](common.html#event-handler) function. Required for [controlled select boxes.](#controlling-a-select-box-with-a-state-variable) Fires immediately when the user picks a different option. Behaves like the browser [`input` event.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
*   `onChangeCapture`: A version of `onChange` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): An [`Event` handler](common.html#event-handler) function. Fires immediately when the value is changed by the user. For historical reasons, in React it is idiomatic to use `onChange` instead which works similarly.
*   `onInputCapture`: A version of `onInput` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): An [`Event` handler](common.html#event-handler) function. Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles.
*   `onInvalidCapture`: A version of `onInvalid` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-required): A boolean. If `true`, the value must be provided for the form to submit.
*   [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-size): A number. For `multiple=` selects, specifies the preferred number of initially visible items.

#### Caveats[](#caveats "Link for Caveats ")

*   Unlike in HTML, passing a `selected` attribute to `<option>` is not supported. Instead, use [`<select defaultValue>`](#providing-an-initially-selected-option) for uncontrolled select boxes and [`<select value>`](#controlling-a-select-box-with-a-state-variable) for controlled select boxes.
*   If a select box receives a `value` prop, it will be [treated as controlled.](#controlling-a-select-box-with-a-state-variable)
*   A select box can’t be both controlled and uncontrolled at the same time.
*   A select box cannot switch between being controlled or uncontrolled over its lifetime.
*   Every controlled select box needs an `onChange` event handler that synchronously updates its backing value.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Displaying a select box with options[](#displaying-a-select-box-with-options "Link for Displaying a select box with options ")

Render a `<select>` with a list of `<option>` components inside to display a select box. Give each `<option>` a `value` representing the data to be submitted with the form.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function FruitPicker() {
  return (
    <label\>
      Pick a fruit:
      <select name\="selectedFruit"\>
        <option value\="apple"\>Apple</option\>
        <option value\="banana"\>Banana</option\>
        <option value\="orange"\>Orange</option\>
      </select\>
    </label\>
  );
}

* * *

### Providing a label for a select box[](#providing-a-label-for-a-select-box "Link for Providing a label for a select box ")

Typically, you will place every `<select>` inside a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) tag. This tells the browser that this label is associated with that select box. When the user clicks the label, the browser will automatically focus the select box. It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the select box.

If you can’t nest `<select>` into a `<label>`, associate them by passing the same ID to `<select id>` and [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) To avoid conflicts between multiple instances of one component, generate such an ID with [`useId`.](../../react/useId.html)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const vegetableSelectId = useId();
  return (
    <\>
      <label\>
        Pick a fruit:
        <select name\="selectedFruit"\>
          <option value\="apple"\>Apple</option\>
          <option value\="banana"\>Banana</option\>
          <option value\="orange"\>Orange</option\>
        </select\>
      </label\>
      <hr />
      <label htmlFor\=\>
        Pick a vegetable:
      </label\>
      <select id\= name\="selectedVegetable"\>
        <option value\="cucumber"\>Cucumber</option\>
        <option value\="corn"\>Corn</option\>
        <option value\="tomato"\>Tomato</option\>
      </select\>
    </\>
  );
}

Show more

* * *

### Providing an initially selected option[](#providing-an-initially-selected-option "Link for Providing an initially selected option ")

By default, the browser will select the first `<option>` in the list. To select a different option by default, pass that `<option>`’s `value` as the `defaultValue` to the `<select>` element.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function FruitPicker() {
  return (
    <label\>
      Pick a fruit:
      <select name\="selectedFruit" defaultValue\="orange"\>
        <option value\="apple"\>Apple</option\>
        <option value\="banana"\>Banana</option\>
        <option value\="orange"\>Orange</option\>
      </select\>
    </label\>
  );
}

### Pitfall

Unlike in HTML, passing a `selected` attribute to an individual `<option>` is not supported.

* * *

### Enabling multiple selection[](#enabling-multiple-selection "Link for Enabling multiple selection ")

Pass `multiple=` to the `<select>` to let the user select multiple options. In that case, if you also specify `defaultValue` to choose the initially selected options, it must be an array.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function FruitPicker() {
  return (
    <label\>
      Pick some fruits:
      <select
        name\="selectedFruit"
        defaultValue\=
        multiple\=
      \>
        <option value\="apple"\>Apple</option\>
        <option value\="banana"\>Banana</option\>
        <option value\="orange"\>Orange</option\>
      </select\>
    </label\>
  );
}

Show more

* * *

### Reading the select box value when submitting a form[](#reading-the-select-box-value-when-submitting-a-form "Link for Reading the select box value when submitting a form ")

Add a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) around your select box with a [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function EditPost() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    fetch('/some-api', );
    // You can generate a URL out of it, as the browser does by default:
    console.log(new URLSearchParams(formData).toString());
    // You can work with it as a plain object.
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson); // (!) This doesn't include multiple select values
    // Or you can get an array of name-value pairs.
    console.log(\[...formData.entries()\]);
  }

  return (
    <form method\="post" onSubmit\=\>
      <label\>
        Pick your favorite fruit:
        <select name\="selectedFruit" defaultValue\="orange"\>
          <option value\="apple"\>Apple</option\>
          <option value\="banana"\>Banana</option\>
          <option value\="orange"\>Orange</option\>
        </select\>
      </label\>
      <label\>
        Pick all your favorite vegetables:
        <select
          name\="selectedVegetables"
          multiple\=
          defaultValue\=
        \>
          <option value\="cucumber"\>Cucumber</option\>
          <option value\="corn"\>Corn</option\>
          <option value\="tomato"\>Tomato</option\>
        </select\>
      </label\>
      <hr />
      <button type\="reset"\>Reset</button\>
      <button type\="submit"\>Submit</button\>
    </form\>
  );
}

Show more

### Note

Give a `name` to your `<select>`, for example `<select name="selectedFruit" />`. The `name` you specified will be used as a key in the form data, for example ``.

If you use `<select multiple=>`, the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) you’ll read from the form will include each selected value as a separate name-value pair. Look closely at the console logs in the example above.

### Pitfall

By default, _any_ `<button>` inside a `<form>` will submit it. This can be surprising! If you have your own custom `Button` React component, consider returning [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) instead of `<button>`. Then, to be explicit, use `<button type="submit">` for buttons that _are_ supposed to submit the form.

* * *

### Controlling a select box with a state variable[](#controlling-a-select-box-with-a-state-variable "Link for Controlling a select box with a state variable ")

A select box like `<select />` is _uncontrolled._ Even if you [pass an initially selected value](#providing-an-initially-selected-option) like `<select defaultValue="orange" />`, your JSX only specifies the initial value, not the value right now.

**To render a _controlled_ select box, pass the `value` prop to it.** React will force the select box to always have the `value` you passed. Typically, you will control a select box by declaring a [state variable:](../../react/useState.html)

    function FruitPicker() 

This is useful if you want to re-render some part of the UI in response to every selection.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function FruitPicker() {
  const \[selectedFruit, setSelectedFruit\] = useState('orange');
  const \[selectedVegs, setSelectedVegs\] = useState(\['corn', 'tomato'\]);
  return (
    <\>
      <label\>
        Pick a fruit:
        <select
          value\=
          onChange\=
        \>
          <option value\="apple"\>Apple</option\>
          <option value\="banana"\>Banana</option\>
          <option value\="orange"\>Orange</option\>
        </select\>
      </label\>
      <hr />
      <label\>
        Pick all your favorite vegetables:
        <select
          multiple\=
          value\=
          onChange\={e \=> {
            const options = \[...e.target.selectedOptions\];
            const values = options.map(option \=> option.value);
            setSelectedVegs(values);
          }}
        \>
          <option value\="cucumber"\>Cucumber</option\>
          <option value\="corn"\>Corn</option\>
          <option value\="tomato"\>Tomato</option\>
        </select\>
      </label\>
      <hr />
      <p\>Your favorite fruit: </p\>
      <p\>Your favorite vegetables: </p\>
    </\>
  );
}

Show more

### Pitfall

**If you pass `value` without `onChange`, it will be impossible to select an option.** When you control a select box by passing some `value` to it, you _force_ it to always have the value you passed. So if you pass a state variable as a `value` but forget to update that state variable synchronously during the `onChange` event handler, React will revert the select box after every keystroke back to the `value` that you specified.

Unlike in HTML, passing a `selected` attribute to an individual `<option>` is not supported.

[Previous<progress>](progress.html)[Next<textarea>](textarea.html)

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
*   [`<select>`](#select)
*   [Usage](#usage)
*   [Displaying a select box with options](#displaying-a-select-box-with-options)
*   [Providing a label for a select box](#providing-a-label-for-a-select-box)
*   [Providing an initially selected option](#providing-an-initially-selected-option)
*   [Enabling multiple selection](#enabling-multiple-selection)
*   [Reading the select box value when submitting a form](#reading-the-select-box-value-when-submitting-a-form)
*   [Controlling a select box with a state variable](#controlling-a-select-box-with-a-state-variable)

