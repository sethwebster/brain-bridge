<input> – React

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

<input>[](#undefined "Link for this heading")
=============================================

The [built-in browser `<input>` component](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) lets you render different kinds of form inputs.

    <input />

*   [Reference](#reference)
    *   [`<input>`](#input)
*   [Usage](#usage)
    *   [Displaying inputs of different types](#displaying-inputs-of-different-types)
    *   [Providing a label for an input](#providing-a-label-for-an-input)
    *   [Providing an initial value for an input](#providing-an-initial-value-for-an-input)
    *   [Reading the input values when submitting a form](#reading-the-input-values-when-submitting-a-form)
    *   [Controlling an input with a state variable](#controlling-an-input-with-a-state-variable)
    *   [Optimizing re-rendering on every keystroke](#optimizing-re-rendering-on-every-keystroke)
*   [Troubleshooting](#troubleshooting)
    *   [My text input doesn’t update when I type into it](#my-text-input-doesnt-update-when-i-type-into-it)
    *   [My checkbox doesn’t update when I click on it](#my-checkbox-doesnt-update-when-i-click-on-it)
    *   [My input caret jumps to the beginning on every keystroke](#my-input-caret-jumps-to-the-beginning-on-every-keystroke)
    *   [I’m getting an error: “A component is changing an uncontrolled input to be controlled”](#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

* * *

Reference[](#reference "Link for Reference ")
---------------------------------------------

### `<input>`[](#input "Link for this heading")

To display an input, render the [built-in browser `<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) component.

    <input name="myInput" />

[See more examples below.](#usage)

#### Props[](#props "Link for Props ")

`<input>` supports all [common element props.](common.html#props)

You can [make an input controlled](#controlling-an-input-with-a-state-variable) by passing one of these props:

*   [`checked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#checked): A boolean. For a checkbox input or a radio button, controls whether it is selected.
*   [`value`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#value): A string. For a text input, controls its text. (For a radio button, specifies its form data.)

When you pass either of them, you must also pass an `onChange` handler that updates the passed value.

These `<input>` props are only relevant for uncontrolled inputs:

*   [`defaultChecked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultChecked): A boolean. Specifies [the initial value](#providing-an-initial-value-for-an-input) for `type="checkbox"` and `type="radio"` inputs.
*   [`defaultValue`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#defaultValue): A string. Specifies [the initial value](#providing-an-initial-value-for-an-input) for a text input.

These `<input>` props are relevant both for uncontrolled and controlled inputs:

*   [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#accept): A string. Specifies which filetypes are accepted by a `type="file"` input.
*   [`alt`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#alt): A string. Specifies the alternative image text for a `type="image"` input.
*   [`capture`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#capture): A string. Specifies the media (microphone, video, or camera) captured by a `type="file"` input.
*   [`autoComplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocomplete): A string. Specifies one of the possible [autocomplete behaviors.](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values)
*   [`autoFocus`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autofocus): A boolean. If `true`, React will focus the element on mount.
*   [`dirname`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#dirname): A string. Specifies the form field name for the element’s directionality.
*   [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#disabled): A boolean. If `true`, the input will not be interactive and will appear dimmed.
*   `children`: `<input>` does not accept children.
*   [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#form): A string. Specifies the `id` of the `<form>` this input belongs to. If omitted, it’s the closest parent form.
*   [`formAction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formaction): A string. Overrides the parent `<form action>` for `type="submit"` and `type="image"`.
*   [`formEnctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formenctype): A string. Overrides the parent `<form enctype>` for `type="submit"` and `type="image"`.
*   [`formMethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formmethod): A string. Overrides the parent `<form method>` for `type="submit"` and `type="image"`.
*   [`formNoValidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formnovalidate): A string. Overrides the parent `<form noValidate>` for `type="submit"` and `type="image"`.
*   [`formTarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#formtarget): A string. Overrides the parent `<form target>` for `type="submit"` and `type="image"`.
*   [`height`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#height): A string. Specifies the image height for `type="image"`.
*   [`list`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#list): A string. Specifies the `id` of the `<datalist>` with the autocomplete options.
*   [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max): A number. Specifies the maximum value of numerical and datetime inputs.
*   [`maxLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength): A number. Specifies the maximum length of text and other inputs.
*   [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min): A number. Specifies the minimum value of numerical and datetime inputs.
*   [`minLength`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength): A number. Specifies the minimum length of text and other inputs.
*   [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#multiple): A boolean. Specifies whether multiple values are allowed for `<type="file"` and `type="email"`.
*   [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name): A string. Specifies the name for this input that’s [submitted with the form.](#reading-the-input-values-when-submitting-a-form)
*   `onChange`: An [`Event` handler](common.html#event-handler) function. Required for [controlled inputs.](#controlling-an-input-with-a-state-variable) Fires immediately when the input’s value is changed by the user (for example, it fires on every keystroke). Behaves like the browser [`input` event.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event)
*   `onChangeCapture`: A version of `onChange` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onInput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event): An [`Event` handler](common.html#event-handler) function. Fires immediately when the value is changed by the user. For historical reasons, in React it is idiomatic to use `onChange` instead which works similarly.
*   `onInputCapture`: A version of `onInput` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onInvalid`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event): An [`Event` handler](common.html#event-handler) function. Fires if an input fails validation on form submit. Unlike the built-in `invalid` event, the React `onInvalid` event bubbles.
*   `onInvalidCapture`: A version of `onInvalid` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): An [`Event` handler](common.html#event-handler) function. Fires after the selection inside the `<input>` changes. React extends the `onSelect` event to also fire for empty selection and on edits (which may affect the selection).
*   `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](../../../learn/responding-to-events.html#capture-phase-events)
*   [`pattern`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern): A string. Specifies the pattern that the `value` must match.
*   [`placeholder`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#placeholder): A string. Displayed in a dimmed color when the input value is empty.
*   [`readOnly`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly): A boolean. If `true`, the input is not editable by the user.
*   [`required`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#required): A boolean. If `true`, the value must be provided for the form to submit.
*   [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#size): A number. Similar to setting width, but the unit depends on the control.
*   [`src`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#src): A string. Specifies the image source for a `type="image"` input.
*   [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step): A positive number or an `'any'` string. Specifies the distance between valid values.
*   [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#type): A string. One of the [input types.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)
*   [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#width): A string. Specifies the image width for a `type="image"` input.

#### Caveats[](#caveats "Link for Caveats ")

*   Checkboxes need `checked` (or `defaultChecked`), not `value` (or `defaultValue`).
*   If a text input receives a string `value` prop, it will be [treated as controlled.](#controlling-an-input-with-a-state-variable)
*   If a checkbox or a radio button receives a boolean `checked` prop, it will be [treated as controlled.](#controlling-an-input-with-a-state-variable)
*   An input can’t be both controlled and uncontrolled at the same time.
*   An input cannot switch between being controlled or uncontrolled over its lifetime.
*   Every controlled input needs an `onChange` event handler that synchronously updates its backing value.

* * *

Usage[](#usage "Link for Usage ")
---------------------------------

### Displaying inputs of different types[](#displaying-inputs-of-different-types "Link for Displaying inputs of different types ")

To display an input, render an `<input>` component. By default, it will be a text input. You can pass `type="checkbox"` for a checkbox, `type="radio"` for a radio button, [or one of the other input types.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function MyForm() {
  return (
    <\>
      <label\>
        Text input: <input name\="myInput" />
      </label\>
      <hr />
      <label\>
        Checkbox: <input type\="checkbox" name\="myCheckbox" />
      </label\>
      <hr />
      <p\>
        Radio buttons:
        <label\>
          <input type\="radio" name\="myRadio" value\="option1" />
          Option 1
        </label\>
        <label\>
          <input type\="radio" name\="myRadio" value\="option2" />
          Option 2
        </label\>
        <label\>
          <input type\="radio" name\="myRadio" value\="option3" />
          Option 3
        </label\>
      </p\>
    </\>
  );
}

Show more

* * *

### Providing a label for an input[](#providing-a-label-for-an-input "Link for Providing a label for an input ")

Typically, you will place every `<input>` inside a [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) tag. This tells the browser that this label is associated with that input. When the user clicks the label, the browser will automatically focus the input. It’s also essential for accessibility: a screen reader will announce the label caption when the user focuses the associated input.

If you can’t nest `<input>` into a `<label>`, associate them by passing the same ID to `<input id>` and [`<label htmlFor>`.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor) To avoid conflicts between multiple instances of one component, generate such an ID with [`useId`.](../../react/useId.html)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const ageInputId = useId();
  return (
    <\>
      <label\>
        Your first name:
        <input name\="firstName" />
      </label\>
      <hr />
      <label htmlFor\=\>Your age:</label\>
      <input id\= name\="age" type\="number" />
    </\>
  );
}

Show more

* * *

### Providing an initial value for an input[](#providing-an-initial-value-for-an-input "Link for Providing an initial value for an input ")

You can optionally specify the initial value for any input. Pass it as the `defaultValue` string for text inputs. Checkboxes and radio buttons should specify the initial value with the `defaultChecked` boolean instead.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function MyForm() {
  return (
    <\>
      <label\>
        Text input: <input name\="myInput" defaultValue\="Some initial value" />
      </label\>
      <hr />
      <label\>
        Checkbox: <input type\="checkbox" name\="myCheckbox" defaultChecked\= />
      </label\>
      <hr />
      <p\>
        Radio buttons:
        <label\>
          <input type\="radio" name\="myRadio" value\="option1" />
          Option 1
        </label\>
        <label\>
          <input
            type\="radio"
            name\="myRadio"
            value\="option2"
            defaultChecked\= 
          />
          Option 2
        </label\>
        <label\>
          <input type\="radio" name\="myRadio" value\="option3" />
          Option 3
        </label\>
      </p\>
    </\>
  );
}

Show more

* * *

### Reading the input values when submitting a form[](#reading-the-input-values-when-submitting-a-form "Link for Reading the input values when submitting a form ")

Add a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) around your inputs with a [`<button type="submit">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside. It will call your `<form onSubmit>` event handler. By default, the browser will send the form data to the current URL and refresh the page. You can override that behavior by calling `e.preventDefault()`. Read the form data with [`new FormData(e.target)`](https://developer.mozilla.org/en-US/docs/Web/API/FormData).

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function MyForm() {
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', );

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }

  return (
    <form method\="post" onSubmit\=\>
      <label\>
        Text input: <input name\="myInput" defaultValue\="Some initial value" />
      </label\>
      <hr />
      <label\>
        Checkbox: <input type\="checkbox" name\="myCheckbox" defaultChecked\= />
      </label\>
      <hr />
      <p\>
        Radio buttons:
        <label\><input type\="radio" name\="myRadio" value\="option1" /> Option 1</label\>
        <label\><input type\="radio" name\="myRadio" value\="option2" defaultChecked\= /> Option 2</label\>
        <label\><input type\="radio" name\="myRadio" value\="option3" /> Option 3</label\>
      </p\>
      <hr />
      <button type\="reset"\>Reset form</button\>
      <button type\="submit"\>Submit form</button\>
    </form\>
  );
}

Show more

### Note

Give a `name` to every `<input>`, for example `<input name="firstName" defaultValue="Taylor" />`. The `name` you specified will be used as a key in the form data, for example ``.

### Pitfall

By default, _any_ `<button>` inside a `<form>` will submit it. This can be surprising! If you have your own custom `Button` React component, consider returning [`<button type="button">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/button) instead of `<button>`. Then, to be explicit, use `<button type="submit">` for buttons that _are_ supposed to submit the form.

* * *

### Controlling an input with a state variable[](#controlling-an-input-with-a-state-variable "Link for Controlling an input with a state variable ")

An input like `<input />` is _uncontrolled._ Even if you [pass an initial value](#providing-an-initial-value-for-an-input) like `<input defaultValue="Initial text" />`, your JSX only specifies the initial value. It does not control what the value should be right now.

**To render a _controlled_ input, pass the `value` prop to it (or `checked` for checkboxes and radios).** React will force the input to always have the `value` you passed. Usually, you would do this by declaring a [state variable:](../../react/useState.html)

    function Form() 

A controlled input makes sense if you needed state anyway—for example, to re-render your UI on every edit:

    function Form()       ...

It’s also useful if you want to offer multiple ways to adjust the input state (for example, by clicking a button):

    function Form() >          Add 10 years        </button>

The `value` you pass to controlled components should not be `undefined` or `null`. If you need the initial value to be empty (such as with the `firstName` field below), initialize your state variable to an empty string (`''`).

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[firstName, setFirstName\] = useState('');
  const \[age, setAge\] = useState('20');
  const ageAsNumber = Number(age);
  return (
    <\>
      <label\>
        First name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Age:
        <input
          value\=
          onChange\=
          type\="number"
        />
        <button onClick\=\>
          Add 10 years
        </button\>
      </label\>
      {firstName !== '' &&
        <p\>Your name is .</p\>
      }
      {ageAsNumber > 0 &&
        <p\>Your age is .</p\>
      }
    </\>
  );
}

Show more

### Pitfall

**If you pass `value` without `onChange`, it will be impossible to type into the input.** When you control an input by passing some `value` to it, you _force_ it to always have the value you passed. So if you pass a state variable as a `value` but forget to update that state variable synchronously during the `onChange` event handler, React will revert the input after every keystroke back to the `value` that you specified.

* * *

### Optimizing re-rendering on every keystroke[](#optimizing-re-rendering-on-every-keystroke "Link for Optimizing re-rendering on every keystroke ")

When you use a controlled input, you set the state on every keystroke. If the component containing your state re-renders a large tree, this can get slow. There’s a few ways you can optimize re-rendering performance.

For example, suppose you start with a form that re-renders all page content on every keystroke:

    function App() 

Since `<PageContent />` doesn’t rely on the input state, you can move the input state into its own component:

    function App() 

This significantly improves performance because now only `SignupForm` re-renders on every keystroke.

If there is no way to avoid re-rendering (for example, if `PageContent` depends on the search input’s value), [`useDeferredValue`](../../react/useDeferredValue.html#deferring-re-rendering-for-a-part-of-the-ui) lets you keep the controlled input responsive even in the middle of a large re-render.

* * *

Troubleshooting[](#troubleshooting "Link for Troubleshooting ")
---------------------------------------------------------------

### My text input doesn’t update when I type into it[](#my-text-input-doesnt-update-when-i-type-into-it "Link for My text input doesn’t update when I type into it ")

If you render an input with `value` but no `onChange`, you will see an error in the console:

    // 🔴 Bug: controlled text input with no onChange handler<input value= />

Console

You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.

As the error message suggests, if you only wanted to [specify the _initial_ value,](#providing-an-initial-value-for-an-input) pass `defaultValue` instead:

    // ✅ Good: uncontrolled input with an initial value<input defaultValue= />

If you want [to control this input with a state variable,](#controlling-an-input-with-a-state-variable) specify an `onChange` handler:

    // ✅ Good: controlled input with onChange<input value= />

If the value is intentionally read-only, add a `readOnly` prop to suppress the error:

    // ✅ Good: readonly controlled input without on change<input value= />

* * *

### My checkbox doesn’t update when I click on it[](#my-checkbox-doesnt-update-when-i-click-on-it "Link for My checkbox doesn’t update when I click on it ")

If you render a checkbox with `checked` but no `onChange`, you will see an error in the console:

    // 🔴 Bug: controlled checkbox with no onChange handler<input type="checkbox" checked= />

Console

You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

As the error message suggests, if you only wanted to [specify the _initial_ value,](#providing-an-initial-value-for-an-input) pass `defaultChecked` instead:

    // ✅ Good: uncontrolled checkbox with an initial value<input type="checkbox" defaultChecked= />

If you want [to control this checkbox with a state variable,](#controlling-an-input-with-a-state-variable) specify an `onChange` handler:

    // ✅ Good: controlled checkbox with onChange<input type="checkbox" checked= />

### Pitfall

You need to read `e.target.checked` rather than `e.target.value` for checkboxes.

If the checkbox is intentionally read-only, add a `readOnly` prop to suppress the error:

    // ✅ Good: readonly controlled input without on change<input type="checkbox" checked= />

* * *

### My input caret jumps to the beginning on every keystroke[](#my-input-caret-jumps-to-the-beginning-on-every-keystroke "Link for My input caret jumps to the beginning on every keystroke ")

If you [control an input,](#controlling-an-input-with-a-state-variable) you must update its state variable to the input’s value from the DOM during `onChange`.

You can’t update it to something other than `e.target.value` (or `e.target.checked` for checkboxes):

    function handleChange(e) 

You also can’t update it asynchronously:

    function handleChange(e) 

To fix your code, update it synchronously to `e.target.value`:

    function handleChange(e) 

If this doesn’t fix the problem, it’s possible that the input gets removed and re-added from the DOM on every keystroke. This can happen if you’re accidentally [resetting state](../../../learn/preserving-and-resetting-state.html) on every re-render, for example if the input or one of its parents always receives a different `key` attribute, or if you nest component function definitions (which is not supported and causes the “inner” component to always be considered a different tree).

* * *

### I’m getting an error: “A component is changing an uncontrolled input to be controlled”[](#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled "Link for I’m getting an error: “A component is changing an uncontrolled input to be controlled” ")

If you provide a `value` to the component, it must remain a string throughout its lifetime.

You cannot pass `value=` first and later pass `value="some string"` because React won’t know whether you want the component to be uncontrolled or controlled. A controlled component should always receive a string `value`, not `null` or `undefined`.

If your `value` is coming from an API or a state variable, it might be initialized to `null` or `undefined`. In that case, either set it to an empty string (`''`) initially, or pass `value=` to ensure `value` is a string.

Similarly, if you pass `checked` to a checkbox, ensure it’s always a boolean.

[PreviousCommon (e.g. <div>)](common.html)[Next<option>](option.html)

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
*   [`<input>`](#input)
*   [Usage](#usage)
*   [Displaying inputs of different types](#displaying-inputs-of-different-types)
*   [Providing a label for an input](#providing-a-label-for-an-input)
*   [Providing an initial value for an input](#providing-an-initial-value-for-an-input)
*   [Reading the input values when submitting a form](#reading-the-input-values-when-submitting-a-form)
*   [Controlling an input with a state variable](#controlling-an-input-with-a-state-variable)
*   [Optimizing re-rendering on every keystroke](#optimizing-re-rendering-on-every-keystroke)
*   [Troubleshooting](#troubleshooting)
*   [My text input doesn’t update when I type into it](#my-text-input-doesnt-update-when-i-type-into-it)
*   [My checkbox doesn’t update when I click on it](#my-checkbox-doesnt-update-when-i-click-on-it)
*   [My input caret jumps to the beginning on every keystroke](#my-input-caret-jumps-to-the-beginning-on-every-keystroke)
*   [I’m getting an error: “A component is changing an uncontrolled input to be controlled”](#im-getting-an-error-a-component-is-changing-an-uncontrolled-input-to-be-controlled)

