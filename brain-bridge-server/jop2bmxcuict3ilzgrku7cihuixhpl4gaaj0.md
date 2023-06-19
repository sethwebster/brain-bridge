JavaScript in JSX with Curly Braces – React

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

[Describing the UI](describing-the-ui.html)

JavaScript in JSX with Curly Braces[](#undefined "Link for this heading")
=========================================================================

JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to open a window to JavaScript.

### You will learn

*   How to pass strings with quotes
*   How to reference a JavaScript variable inside JSX with curly braces
*   How to call a JavaScript function inside JSX with curly braces
*   How to use a JavaScript object inside JSX with curly braces

Passing strings with quotes[](#passing-strings-with-quotes "Link for Passing strings with quotes ")
---------------------------------------------------------------------------------------------------

When you want to pass a string attribute to JSX, you put it in single or double quotes:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Avatar() {
  return (
    <img
      className\="avatar"
      src\="https://i.imgur.com/7vQD0fPs.jpg"
      alt\="Gregorio Y. Zara"
    />
  );
}

Here, `"https://i.imgur.com/7vQD0fPs.jpg"` and `"Gregorio Y. Zara"` are being passed as strings.

But what if you want to dynamically specify the `src` or `alt` text? You could **use a value from JavaScript by replacing `"` and `"` with ``**:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className\="avatar"
      src\=
      alt\=
    />
  );
}

Notice the difference between `className="avatar"`, which specifies an `"avatar"` CSS class name that makes the image round, and `src=` that reads the value of the JavaScript variable called `avatar`. That’s because curly braces let you work with JavaScript right there in your markup!

Using curly braces: A window into the JavaScript world[](#using-curly-braces-a-window-into-the-javascript-world "Link for Using curly braces: A window into the JavaScript world ")
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

JSX is a special way of writing JavaScript. That means it’s possible to use JavaScript inside it—with curly braces ``. The example below first declares a name for the scientist, `name`, then embeds it with curly braces inside the `<h1>`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1\>'s To Do List</h1\>
  );
}

Try changing the `name`’s value from `'Gregorio Y. Zara'` to `'Hedy Lamarr'`. See how the list title changes?

Any JavaScript expression will work between curly braces, including function calls like `formatDate()`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    
  ).format(date);
}

export default function TodoList() {
  return (
    <h1\>To Do List for </h1\>
  );
}

### Where to use curly braces[](#where-to-use-curly-braces "Link for Where to use curly braces ")

You can only use curly braces in two ways inside JSX:

1.  **As text** directly inside a JSX tag: `<h1>>` will not.
2.  **As attributes** immediately following the `=` sign: `src="`.

Using “double curlies”: CSS and other objects in JSX[](#using-double-curlies-css-and-other-objects-in-jsx "Link for Using “double curlies”: CSS and other objects in JSX ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

In addition to strings, numbers, and other JavaScript expressions, you can even pass objects in JSX. Objects are also denoted with curly braces, like ``.

You may see this with inline CSS styles in JSX. React does not require you to use inline styles (CSS classes work great for most cases). But when you need an inline style, you pass an object to the `style` attribute:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function TodoList() {
  return (
    <ul style\={{
      backgroundColor: 'black',
      color: 'pink'
    }}\>
      <li\>Improve the videophone</li\>
      <li\>Prepare aeronautics lectures</li\>
      <li\>Work on the alcohol-fuelled engine</li\>
    </ul\>
  );
}

Try changing the values of `backgroundColor` and `color`.

You can really see the JavaScript object inside the curly braces when you write it like this:

    <ul style=>

The next time you see `` in JSX, know that it’s nothing more than an object inside the JSX curlies!

### Pitfall

Inline `style` properties are written in camelCase. For example, HTML `<ul style="background-color: black">` would be written as `<ul style=>` in your component.

More fun with JavaScript objects and curly braces[](#more-fun-with-javascript-objects-and-curly-braces "Link for More fun with JavaScript objects and curly braces ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

You can move several expressions into one object, and reference them in your JSX inside curly braces:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style\=\>
      <h1\>'s Todos</h1\>
      <img
        className\="avatar"
        src\="https://i.imgur.com/7vQD0fPs.jpg"
        alt\="Gregorio Y. Zara"
      />
      <ul\>
        <li\>Improve the videophone</li\>
        <li\>Prepare aeronautics lectures</li\>
        <li\>Work on the alcohol-fuelled engine</li\>
      </ul\>
    </div\>
  );
}

Show more

In this example, the `person` JavaScript object contains a `name` string and a `theme` object:

    const person = ;

The component can use these values from `person` like so:

    <div style='s Todos</h1>

JSX is very minimal as a templating language because it lets you organize data and logic using JavaScript.

Recap[](#recap "Link for Recap")
--------------------------------

Now you know almost everything about JSX:

*   JSX attributes inside quotes are passed as strings.
*   Curly braces let you bring JavaScript logic and variables into your markup.
*   They work inside the JSX tag content or immediately after `=` in attributes.
*   `` is not special syntax: it’s a JavaScript object tucked inside JSX curly braces.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix the mistake 2. Extract information into an object 3. Write an expression inside JSX curly braces

#### 

Challenge 1 of 3:

Fix the mistake[](#fix-the-mistake "Link for this heading")

This code crashes with an error saying `Objects are not valid as a React child`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  return (
    <div style\=\>
      <h1\>'s Todos</h1\>
      <img
        className\="avatar"
        src\="https://i.imgur.com/7vQD0fPs.jpg"
        alt\="Gregorio Y. Zara"
      />
      <ul\>
        <li\>Improve the videophone</li\>
        <li\>Prepare aeronautics lectures</li\>
        <li\>Work on the alcohol-fuelled engine</li\>
      </ul\>
    </div\>
  );
}

Show more

Can you find the problem?

Show hint Show solution

Next Challenge

[PreviousWriting Markup with JSX](writing-markup-with-jsx.html)[NextPassing Props to a Component](passing-props-to-a-component.html)

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
*   [Passing strings with quotes](#passing-strings-with-quotes)
*   [Using curly braces: A window into the JavaScript world](#using-curly-braces-a-window-into-the-javascript-world)
*   [Where to use curly braces](#where-to-use-curly-braces)
*   [Using “double curlies”: CSS and other objects in JSX](#using-double-curlies-css-and-other-objects-in-jsx)
*   [More fun with JavaScript objects and curly braces](#more-fun-with-javascript-objects-and-curly-braces)
*   [Recap](#recap)
*   [Challenges](#challenges)

