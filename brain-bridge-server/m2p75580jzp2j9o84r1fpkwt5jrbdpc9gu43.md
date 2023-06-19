Responding to Events – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../index.html)

Search⌘CtrlK

[Learn](../learn.html)

[Reference](../reference/react.html)

[Community](../community.html)

[Blog](../blog.html)

[](https://github.com/facebook/react/releases)

### GET STARTED

*   [Quick Start](../learn.html "Quick Start")
    
    *   [Tutorial: Tic-Tac-Toe](tutorial-tic-tac-toe.html "Tutorial: Tic-Tac-Toe")
    *   [Thinking in React](thinking-in-react.html "Thinking in React")
    
*   [Installation](installation.html "Installation")
    
    *   [Start a New React Project](start-a-new-react-project.html "Start a New React Project")
    *   [Add React to an Existing Project](add-react-to-an-existing-project.html "Add React to an Existing Project")
    *   [Editor Setup](editor-setup.html "Editor Setup")
    *   [React Developer Tools](react-developer-tools.html "React Developer Tools")
    

### LEARN REACT

*   [Describing the UI](describing-the-ui.html "Describing the UI")
    
    *   [Your First Component](your-first-component.html "Your First Component")
    *   [Importing and Exporting Components](importing-and-exporting-components.html "Importing and Exporting Components")
    *   [Writing Markup with JSX](writing-markup-with-jsx.html "Writing Markup with JSX")
    *   [JavaScript in JSX with Curly Braces](javascript-in-jsx-with-curly-braces.html "JavaScript in JSX with Curly Braces")
    *   [Passing Props to a Component](passing-props-to-a-component.html "Passing Props to a Component")
    *   [Conditional Rendering](conditional-rendering.html "Conditional Rendering")
    *   [Rendering Lists](rendering-lists.html "Rendering Lists")
    *   [Keeping Components Pure](keeping-components-pure.html "Keeping Components Pure")
    
*   [Adding Interactivity](adding-interactivity.html "Adding Interactivity")
    
    *   [Responding to Events](responding-to-events.html "Responding to Events")
    *   [State: A Component's Memory](state-a-components-memory.html "State: A Component's Memory")
    *   [Render and Commit](render-and-commit.html "Render and Commit")
    *   [State as a Snapshot](state-as-a-snapshot.html "State as a Snapshot")
    *   [Queueing a Series of State Updates](queueing-a-series-of-state-updates.html "Queueing a Series of State Updates")
    *   [Updating Objects in State](updating-objects-in-state.html "Updating Objects in State")
    *   [Updating Arrays in State](updating-arrays-in-state.html "Updating Arrays in State")
    
*   [Managing State](managing-state.html "Managing State")
    
    *   [Reacting to Input with State](reacting-to-input-with-state.html "Reacting to Input with State")
    *   [Choosing the State Structure](choosing-the-state-structure.html "Choosing the State Structure")
    *   [Sharing State Between Components](sharing-state-between-components.html "Sharing State Between Components")
    *   [Preserving and Resetting State](preserving-and-resetting-state.html "Preserving and Resetting State")
    *   [Extracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.html "Extracting State Logic into a Reducer")
    *   [Passing Data Deeply with Context](passing-data-deeply-with-context.html "Passing Data Deeply with Context")
    *   [Scaling Up with Reducer and Context](scaling-up-with-reducer-and-context.html "Scaling Up with Reducer and Context")
    
*   [Escape Hatches](escape-hatches.html "Escape Hatches")
    
    *   [Referencing Values with Refs](referencing-values-with-refs.html "Referencing Values with Refs")
    *   [Manipulating the DOM with Refs](manipulating-the-dom-with-refs.html "Manipulating the DOM with Refs")
    *   [Synchronizing with Effects](synchronizing-with-effects.html "Synchronizing with Effects")
    *   [You Might Not Need an Effect](you-might-not-need-an-effect.html "You Might Not Need an Effect")
    *   [Lifecycle of Reactive Effects](lifecycle-of-reactive-effects.html "Lifecycle of Reactive Effects")
    *   [Separating Events from Effects](separating-events-from-effects.html "Separating Events from Effects")
    *   [Removing Effect Dependencies](removing-effect-dependencies.html "Removing Effect Dependencies")
    *   [Reusing Logic with Custom Hooks](reusing-logic-with-custom-hooks.html "Reusing Logic with Custom Hooks")
    

Is this page useful?

[Learn React](../learn.html)

[Adding Interactivity](adding-interactivity.html)

Responding to Events[](#undefined "Link for this heading")
==========================================================

React lets you add _event handlers_ to your JSX. Event handlers are your own functions that will be triggered in response to interactions like clicking, hovering, focusing form inputs, and so on.

### You will learn

*   Different ways to write an event handler
*   How to pass event handling logic from a parent component
*   How events propagate and how to stop them

Adding event handlers[](#adding-event-handlers "Link for Adding event handlers ")
---------------------------------------------------------------------------------

To add an event handler, you will first define a function and then [pass it as a prop](passing-props-to-a-component.html) to the appropriate JSX tag. For example, here is a button that doesn’t do anything yet:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Button() {
  return (
    <button\>
      I don't do anything
    </button\>
  );
}

You can make it show a message when a user clicks by following these three steps:

1.  Declare a function called `handleClick` _inside_ your `Button` component.
2.  Implement the logic inside that function (use `alert` to show the message).
3.  Add `onClick=` to the `<button>` JSX.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Button() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick\=\>
      Click me
    </button\>
  );
}

You defined the `handleClick` function and then [passed it as a prop](passing-props-to-a-component.html) to `<button>`. `handleClick` is an **event handler.** Event handler functions:

*   Are usually defined _inside_ your components.
*   Have names that start with `handle`, followed by the name of the event.

By convention, it is common to name event handlers as `handle` followed by the event name. You’ll often see `onClick=`, and so on.

Alternatively, you can define an event handler inline in the JSX:

    <button onClick=>

Or, more concisely, using an arrow function:

    <button onClick=>

All of these styles are equivalent. Inline event handlers are convenient for short functions.

### Pitfall

Functions passed to event handlers must be passed, not called. For example:

passing a function (correct)

calling a function (incorrect)

`<button onClick=>`

`<button onClick=>`

The difference is subtle. In the first example, the `handleClick` function is passed as an `onClick` event handler. This tells React to remember it and only call your function when the user clicks the button.

In the second example, the `()` at the end of `handleClick()` fires the function _immediately_ during [rendering](render-and-commit.html), without any clicks. This is because JavaScript inside the [JSX ``](javascript-in-jsx-with-curly-braces.html) executes right away.

When you write code inline, the same pitfall presents itself in a different way:

passing a function (correct)

calling a function (incorrect)

`<button onClick=>`

`<button onClick=>`

Passing inline code like this won’t fire on click—it fires every time the component renders:

    // This alert fires when the component renders, not when clicked!<button onClick=>

If you want to define your event handler inline, wrap it in an anonymous function like so:

    <button onClick=>

Rather than executing the code inside with every render, this creates a function to be called later.

In both cases, what you want to pass is a function:

*   `<button onClick=>` passes the `handleClick` function.
*   `<button onClick=>` passes the `() => alert('...')` function.

[Read more about arrow functions.](https://javascript.info/arrow-functions-basics)

### Reading props in event handlers[](#reading-props-in-event-handlers "Link for Reading props in event handlers ")

Because event handlers are declared inside of a component, they have access to the component’s props. Here is a button that, when clicked, shows an alert with its `message` prop:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function AlertButton() {
  return (
    <button onClick\=\>
      
    </button\>
  );
}

export default function Toolbar() {
  return (
    <div\>
      <AlertButton message\="Playing!"\>
        Play Movie
      </AlertButton\>
      <AlertButton message\="Uploading!"\>
        Upload Image
      </AlertButton\>
    </div\>
  );
}

Show more

This lets these two buttons show different messages. Try changing the messages passed to them.

### Passing event handlers as props[](#passing-event-handlers-as-props "Link for Passing event handlers as props ")

Often you’ll want the parent component to specify a child’s event handler. Consider buttons: depending on where you’re using a `Button` component, you might want to execute a different function—perhaps one plays a movie and another uploads an image.

To do this, pass a prop the component receives from its parent as the event handler like so:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Button() {
  return (
    <button onClick\=\>
      
    </button\>
  );
}

function PlayButton() {
  function handlePlayClick() {
    alert(\`Playing $!\`);
  }

  return (
    <Button onClick\=\>
      Play ""
    </Button\>
  );
}

function UploadButton() {
  return (
    <Button onClick\=\>
      Upload Image
    </Button\>
  );
}

export default function Toolbar() {
  return (
    <div\>
      <PlayButton movieName\="Kiki's Delivery Service" />
      <UploadButton />
    </div\>
  );
}

Show more

Here, the `Toolbar` component renders a `PlayButton` and an `UploadButton`:

*   `PlayButton` passes `handlePlayClick` as the `onClick` prop to the `Button` inside.
*   `UploadButton` passes `() => alert('Uploading!')` as the `onClick` prop to the `Button` inside.

Finally, your `Button` component accepts a prop called `onClick`. It passes that prop directly to the built-in browser `<button>` with `onClick=`. This tells React to call the passed function on click.

If you use a [design system](https://uxdesign.cc/everything-you-need-to-know-about-design-systems-54b109851969), it’s common for components like buttons to contain styling but not specify behavior. Instead, components like `PlayButton` and `UploadButton` will pass event handlers down.

### Naming event handler props[](#naming-event-handler-props "Link for Naming event handler props ")

Built-in components like `<button>` and `<div>` only support [browser event names](../reference/react-dom/components/common.html#common-props) like `onClick`. However, when you’re building your own components, you can name their event handler props any way that you like.

By convention, event handler props should start with `on`, followed by a capital letter.

For example, the `Button` component’s `onClick` prop could have been called `onSmash`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Button() {
  return (
    <button onClick\=\>
      
    </button\>
  );
}

export default function App() {
  return (
    <div\>
      <Button onSmash\=\>
        Play Movie
      </Button\>
      <Button onSmash\=\>
        Upload Image
      </Button\>
    </div\>
  );
}

Show more

In this example, `<button onClick=>` shows that the browser `<button>` (lowercase) still needs a prop called `onClick`, but the prop name received by your custom `Button` component is up to you!

When your component supports multiple interactions, you might name event handler props for app-specific concepts. For example, this `Toolbar` component receives `onPlayMovie` and `onUploadImage` event handlers:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function App() {
  return (
    <Toolbar
      onPlayMovie\=
      onUploadImage\=
    />
  );
}

function Toolbar() {
  return (
    <div\>
      <Button onClick\=\>
        Play Movie
      </Button\>
      <Button onClick\=\>
        Upload Image
      </Button\>
    </div\>
  );
}

function Button() {
  return (
    <button onClick\=\>
      
    </button\>
  );
}

Show more

Notice how the `App` component does not need to know _what_ `Toolbar` will do with `onPlayMovie` or `onUploadImage`. That’s an implementation detail of the `Toolbar`. Here, `Toolbar` passes them down as `onClick` handlers to its `Button`s, but it could later also trigger them on a keyboard shortcut. Naming props after app-specific interactions like `onPlayMovie` gives you the flexibility to change how they’re used later.

### Note

Make sure that you use the appropriate HTML tags for your event handlers. For example, to handle clicks, use [`<button onClick=>`. Using a real browser `<button>` enables built-in browser behaviors like keyboard navigation. If you don’t like the default browser styling of a button and want to make it look more like a link or a different UI element, you can achieve it with CSS. [Learn more about writing accessible markup.](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

Event propagation[](#event-propagation "Link for Event propagation ")
---------------------------------------------------------------------

Event handlers will also catch events from any children your component might have. We say that an event “bubbles” or “propagates” up the tree: it starts with where the event happened, and then goes up the tree.

This `<div>` contains two buttons. Both the `<div>` _and_ each button have their own `onClick` handlers. Which handlers do you think will fire when you click a button?

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Toolbar() {
  return (
    <div className\="Toolbar" onClick\={() \=> {
      alert('You clicked on the toolbar!');
    }}\>
      <button onClick\=\>
        Play Movie
      </button\>
      <button onClick\=\>
        Upload Image
      </button\>
    </div\>
  );
}

If you click on either button, its `onClick` will run first, followed by the parent `<div>`’s `onClick`. So two messages will appear. If you click the toolbar itself, only the parent `<div>`’s `onClick` will run.

### Pitfall

All events propagate in React except `onScroll`, which only works on the JSX tag you attach it to.

### Stopping propagation[](#stopping-propagation "Link for Stopping propagation ")

Event handlers receive an **event object** as their only argument. By convention, it’s usually called `e`, which stands for “event”. You can use this object to read information about the event.

That event object also lets you stop the propagation. If you want to prevent an event from reaching parent components, you need to call `e.stopPropagation()` like this `Button` component does:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Button() {
  return (
    <button onClick\={e \=> {
      e.stopPropagation();
      onClick();
    }}\>
      
    </button\>
  );
}

export default function Toolbar() {
  return (
    <div className\="Toolbar" onClick\={() \=> {
      alert('You clicked on the toolbar!');
    }}\>
      <Button onClick\=\>
        Play Movie
      </Button\>
      <Button onClick\=\>
        Upload Image
      </Button\>
    </div\>
  );
}

Show more

When you click on a button:

1.  React calls the `onClick` handler passed to `<button>`.
2.  That handler, defined in `Button`, does the following:
    *   Calls `e.stopPropagation()`, preventing the event from bubbling further.
    *   Calls the `onClick` function, which is a prop passed from the `Toolbar` component.
3.  That function, defined in the `Toolbar` component, displays the button’s own alert.
4.  Since the propagation was stopped, the parent `<div>`’s `onClick` handler does _not_ run.

As a result of `e.stopPropagation()`, clicking on the buttons now only shows a single alert (from the `<button>`) rather than the two of them (from the `<button>` and the parent toolbar `<div>`). Clicking a button is not the same thing as clicking the surrounding toolbar, so stopping the propagation makes sense for this UI.

##### Deep Dive

#### Capture phase events[](#capture-phase-events "Link for Capture phase events ")

Show Details

In rare cases, you might need to catch all events on child elements, _even if they stopped propagation_. For example, maybe you want to log every click to analytics, regardless of the propagation logic. You can do this by adding `Capture` at the end of the event name:

    <div onClickCapture= /></div>

Each event propagates in three phases:

1.  It travels down, calling all `onClickCapture` handlers.
2.  It runs the clicked element’s `onClick` handler.
3.  It travels upwards, calling all `onClick` handlers.

Capture events are useful for code like routers or analytics, but you probably won’t use them in app code.

### Passing handlers as alternative to propagation[](#passing-handlers-as-alternative-to-propagation "Link for Passing handlers as alternative to propagation ")

Notice how this click handler runs a line of code _and then_ calls the `onClick` prop passed by the parent:

    function Button(

You could add more code to this handler before calling the parent `onClick` event handler, too. This pattern provides an _alternative_ to propagation. It lets the child component handle the event, while also letting the parent component specify some additional behavior. Unlike propagation, it’s not automatic. But the benefit of this pattern is that you can clearly follow the whole chain of code that executes as a result of some event.

If you rely on propagation and it’s difficult to trace which handlers execute and why, try this approach instead.

### Preventing default behavior[](#preventing-default-behavior "Link for Preventing default behavior ")

Some browser events have default behavior associated with them. For example, a `<form>` submit event, which happens when a button inside of it is clicked, will reload the whole page by default:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Signup() {
  return (
    <form onSubmit\=\>
      <input />
      <button\>Send</button\>
    </form\>
  );
}

You can call `e.preventDefault()` on the event object to stop this from happening:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Signup() {
  return (
    <form onSubmit\={e \=> {
      e.preventDefault();
      alert('Submitting!');
    }}\>
      <input />
      <button\>Send</button\>
    </form\>
  );
}

Don’t confuse `e.stopPropagation()` and `e.preventDefault()`. They are both useful, but are unrelated:

*   [`e.stopPropagation()`](https://developer.mozilla.org/docs/Web/API/Event/stopPropagation) stops the event handlers attached to the tags above from firing.
*   [`e.preventDefault()`](https://developer.mozilla.org/docs/Web/API/Event/preventDefault) prevents the default browser behavior for the few events that have it.

Can event handlers have side effects?[](#can-event-handlers-have-side-effects "Link for Can event handlers have side effects? ")
--------------------------------------------------------------------------------------------------------------------------------

Absolutely! Event handlers are the best place for side effects.

Unlike rendering functions, event handlers don’t need to be [pure](keeping-components-pure.html), so it’s a great place to _change_ something—for example, change an input’s value in response to typing, or change a list in response to a button press. However, in order to change some information, you first need some way to store it. In React, this is done by using [state, a component’s memory.](state-a-components-memory.html) You will learn all about it on the next page.

Recap[](#recap "Link for Recap")
--------------------------------

*   You can handle events by passing a function as a prop to an element like `<button>`.
*   Event handlers must be passed, **not called!** `onClick=`.
*   You can define an event handler function separately or inline.
*   Event handlers are defined inside a component, so they can access props.
*   You can declare an event handler in a parent and pass it as a prop to a child.
*   You can define your own event handler props with application-specific names.
*   Events propagate upwards. Call `e.stopPropagation()` on the first argument to prevent that.
*   Events may have unwanted default browser behavior. Call `e.preventDefault()` to prevent that.
*   Explicitly calling an event handler prop from a child handler is a good alternative to propagation.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix an event handler 2. Wire up the events

#### 

Challenge 1 of 2:

Fix an event handler[](#fix-an-event-handler "Link for this heading")

Clicking this button is supposed to switch the page background between white and black. However, nothing happens when you click it. Fix the problem. (Don’t worry about the logic inside `handleClick`—that part is fine.)

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function LightSwitch() {
  function handleClick() {
    let bodyStyle = document.body.style;
    if (bodyStyle.backgroundColor === 'black') {
      bodyStyle.backgroundColor = 'white';
    } else {
      bodyStyle.backgroundColor = 'black';
    }
  }

  return (
    <button onClick\=\>
      Toggle the lights
    </button\>
  );
}

Show more

Show solutionNext Challenge

[PreviousAdding Interactivity](adding-interactivity.html)[NextState: A Component's Memory](state-a-components-memory.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../learn.html)

[Quick Start](../learn.html)

[Installation](installation.html)

[Describing the UI](describing-the-ui.html)

[Adding Interactivity](adding-interactivity.html)

[Managing State](managing-state.html)

[Escape Hatches](escape-hatches.html)

[API Reference](../reference/react.html)

[React APIs](../reference/react.html)

[React DOM APIs](../reference/react-dom.html)

[Community](../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../community/team.html)

[Docs Contributors](../community/docs-contributors.html)

[Acknowledgements](../community/acknowledgements.html)

More

[Blog](../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

On this page
------------

*   [Overview](#)
*   [Adding event handlers](#adding-event-handlers)
*   [Reading props in event handlers](#reading-props-in-event-handlers)
*   [Passing event handlers as props](#passing-event-handlers-as-props)
*   [Naming event handler props](#naming-event-handler-props)
*   [Event propagation](#event-propagation)
*   [Stopping propagation](#stopping-propagation)
*   [Passing handlers as alternative to propagation](#passing-handlers-as-alternative-to-propagation)
*   [Preventing default behavior](#preventing-default-behavior)
*   [Can event handlers have side effects?](#can-event-handlers-have-side-effects)
*   [Recap](#recap)
*   [Challenges](#challenges)

