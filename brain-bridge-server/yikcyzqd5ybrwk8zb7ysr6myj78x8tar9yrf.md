Describing the UI – React

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

Describing the UI[](#undefined "Link for this heading")
=======================================================

React is a JavaScript library for rendering user interfaces (UI). UI is built from small units like buttons, text, and images. React lets you combine them into reusable, nestable _components._ From web sites to phone apps, everything on the screen can be broken down into components. In this chapter, you’ll learn to create, customize, and conditionally display React components.

### In this chapter

*   [How to write your first React component](your-first-component.html)
*   [When and how to create multi-component files](importing-and-exporting-components.html)
*   [How to add markup to JavaScript with JSX](writing-markup-with-jsx.html)
*   [How to use curly braces with JSX to access JavaScript functionality from your components](javascript-in-jsx-with-curly-braces.html)
*   [How to configure components with props](passing-props-to-a-component.html)
*   [How to conditionally render components](conditional-rendering.html)
*   [How to render multiple components at a time](rendering-lists.html)
*   [How to avoid confusing bugs by keeping components pure](keeping-components-pure.html)

Your first component[](#your-first-component "Link for Your first component ")
------------------------------------------------------------------------------

React applications are built from isolated pieces of UI called _components_. A React component is a JavaScript function that you can sprinkle with markup. Components can be as small as a button, or as large as an entire page. Here is a `Gallery` component rendering three `Profile` components:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Profile() {
  return (
    <img
      src\="https://i.imgur.com/MK3eW3As.jpg"
      alt\="Katherine Johnson"
    />
  );
}

export default function Gallery() {
  return (
    <section\>
      <h1\>Amazing scientists</h1\>
      <Profile />
      <Profile />
      <Profile />
    </section\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Your First Component](your-first-component.html)** to learn how to declare and use React components.

[Read More](your-first-component.html)

* * *

Importing and exporting components[](#importing-and-exporting-components "Link for Importing and exporting components ")
------------------------------------------------------------------------------------------------------------------------

You can declare many components in one file, but large files can get difficult to navigate. To solve this, you can _export_ a component into its own file, and then _import_ that component from another file:

Gallery.jsProfile.js

Gallery.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Profile from './Profile.js';

export default function Gallery() {
  return (
    <section\>
      <h1\>Amazing scientists</h1\>
      <Profile />
      <Profile />
      <Profile />
    </section\>
  );
}

Ready to learn this topic?
--------------------------

Read **[Importing and Exporting Components](importing-and-exporting-components.html)** to learn how to split components into their own files.

[Read More](importing-and-exporting-components.html)

* * *

Writing markup with JSX[](#writing-markup-with-jsx "Link for Writing markup with JSX ")
---------------------------------------------------------------------------------------

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information.

If we paste existing HTML markup into a React component, it won’t always work:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function TodoList() {
  return (
    // This doesn't quite work!
    <h1\>Hedy Lamarr's Todos</h1\>
    <img
      src\="https://i.imgur.com/yXOvdOSs.jpg"
      alt\="Hedy Lamarr"
      class\="photo"
    >
    <ul\>
      <li\>Invent new traffic lights
      <li\>Rehearse a movie scene
      <li\>Improve spectrum technology
    </ul\>

Show more

If you have existing HTML like this, you can fix it using a [converter](https://transform.tools/html-to-jsx):

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function TodoList() {
  return (
    <\>
      <h1\>Hedy Lamarr's Todos</h1\>
      <img
        src\="https://i.imgur.com/yXOvdOSs.jpg"
        alt\="Hedy Lamarr"
        className\="photo"
      />
      <ul\>
        <li\>Invent new traffic lights</li\>
        <li\>Rehearse a movie scene</li\>
        <li\>Improve spectrum technology</li\>
      </ul\>
    </\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Writing Markup with JSX](writing-markup-with-jsx.html)** to learn how to write valid JSX.

[Read More](writing-markup-with-jsx.html)

* * *

JavaScript in JSX with curly braces[](#javascript-in-jsx-with-curly-braces "Link for JavaScript in JSX with curly braces ")
---------------------------------------------------------------------------------------------------------------------------

JSX lets you write HTML-like markup inside a JavaScript file, keeping rendering logic and content in the same place. Sometimes you will want to add a little JavaScript logic or reference a dynamic property inside that markup. In this situation, you can use curly braces in your JSX to “open a window” to JavaScript:

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

Ready to learn this topic?
--------------------------

Read **[JavaScript in JSX with Curly Braces](javascript-in-jsx-with-curly-braces.html)** to learn how to access JavaScript data from JSX.

[Read More](javascript-in-jsx-with-curly-braces.html)

* * *

Passing props to a component[](#passing-props-to-a-component "Link for Passing props to a component ")
------------------------------------------------------------------------------------------------------

React components use _props_ to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, functions, and even JSX!

App.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './utils.js'

export default function Profile() {
  return (
    <Card\>
      <Avatar
        size\=
        person\={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
    </Card\>
  );
}

function Avatar() {
  return (
    <img
      className\="avatar"
      src\=
      alt\=
      width\=
      height\=
    />
  );
}

function Card() {
  return (
    <div className\="card"\>
      
    </div\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Passing Props to a Component](passing-props-to-a-component.html)** to learn how to pass and read props.

[Read More](passing-props-to-a-component.html)

* * *

Conditional rendering[](#conditional-rendering "Link for Conditional rendering ")
---------------------------------------------------------------------------------

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

In this example, the JavaScript `&&` operator is used to conditionally render a checkmark:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  return (
    <li className\="item"\>
      
    </li\>
  );
}

export default function PackingList() {
  return (
    <section\>
      <h1\>Sally Ride's Packing List</h1\>
      <ul\>
        <Item
          isPacked\=
          name\="Space suit"
        />
        <Item
          isPacked\=
          name\="Helmet with a golden leaf"
        />
        <Item
          isPacked\=
          name\="Photo of Tam"
        />
      </ul\>
    </section\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Conditional Rendering](conditional-rendering.html)** to learn the different ways to render content conditionally.

[Read More](conditional-rendering.html)

* * *

Rendering lists[](#rendering-lists "Link for Rendering lists ")
---------------------------------------------------------------

You will often want to display multiple similar components from a collection of data. You can use JavaScript’s `filter()` and `map()` with React to filter and transform your array of data into an array of components.

For each array item, you will need to specify a `key`. Usually, you will want to use an ID from the database as a `key`. Keys let React keep track of each item’s place in the list even if the list changes.

App.jsdata.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './data.js';
import  from './utils.js';

export default function List() {
  const listItems = people.map(person \=>
    <li key\=\>
      <img
        src\=
        alt\=
      />
      <p\>
        <b\>:</b\>
        
        known for 
      </p\>
    </li\>
  );
  return (
    <article\>
      <h1\>Scientists</h1\>
      <ul\></ul\>
    </article\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Rendering Lists](rendering-lists.html)** to learn how to render a list of components, and how to choose a key.

[Read More](rendering-lists.html)

* * *

Keeping components pure[](#keeping-components-pure "Link for Keeping components pure ")
---------------------------------------------------------------------------------------

Some JavaScript functions are _pure._ A pure function:

*   **Minds its own business.** It does not change any objects or variables that existed before it was called.
*   **Same inputs, same output.** Given the same inputs, a pure function should always return the same result.

By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows. Here is an example of an impure component:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

let guest = 0;

function Cup() {
  // Bad: changing a preexisting variable!
  guest = guest + 1;
  return <h2\>Tea cup for guest #</h2\>;
}

export default function TeaSet() {
  return (
    <\>
      <Cup />
      <Cup />
      <Cup />
    </\>
  );
}

Show more

You can make this component pure by passing a prop instead of modifying a preexisting variable:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Cup() {
  return <h2\>Tea cup for guest #</h2\>;
}

export default function TeaSet() {
  return (
    <\>
      <Cup guest\= />
      <Cup guest\= />
      <Cup guest\= />
    </\>
  );
}

Ready to learn this topic?
--------------------------

Read **[Keeping Components Pure](keeping-components-pure.html)** to learn how to write components as pure, predictable functions.

[Read More](keeping-components-pure.html)

* * *

What’s next?[](#whats-next "Link for What’s next? ")
----------------------------------------------------

Head over to [Your First Component](your-first-component.html) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Adding Interactivity](adding-interactivity.html)?

[NextYour First Component](your-first-component.html)

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
*   [Your first component](#your-first-component)
*   [Importing and exporting components](#importing-and-exporting-components)
*   [Writing markup with JSX](#writing-markup-with-jsx)
*   [JavaScript in JSX with curly braces](#javascript-in-jsx-with-curly-braces)
*   [Passing props to a component](#passing-props-to-a-component)
*   [Conditional rendering](#conditional-rendering)
*   [Rendering lists](#rendering-lists)
*   [Keeping components pure](#keeping-components-pure)
*   [What’s next?](#whats-next)

