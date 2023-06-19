Importing and Exporting Components – React

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

Importing and Exporting Components[](#undefined "Link for this heading")
========================================================================

The magic of components lies in their reusability: you can create components that are composed of other components. But as you nest more and more components, it often makes sense to start splitting them into different files. This lets you keep your files easy to scan and reuse components in more places.

### You will learn

*   What a root component file is
*   How to import and export a component
*   When to use default and named imports and exports
*   How to import and export multiple components from one file
*   How to split components into multiple files

The root component file[](#the-root-component-file "Link for The root component file ")
---------------------------------------------------------------------------------------

In [Your First Component](your-first-component.html), you made a `Profile` component and a `Gallery` component that renders it:

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

These currently live in a **root component file,** named `App.js` in this example. In [Create React App](https://create-react-app.dev/), your app lives in `src/App.js`. Depending on your setup, your root component could be in another file, though. If you use a framework with file-based routing, such as Next.js, your root component will be different for every page.

Exporting and importing a component[](#exporting-and-importing-a-component "Link for Exporting and importing a component ")
---------------------------------------------------------------------------------------------------------------------------

What if you want to change the landing screen in the future and put a list of science books there? Or place all the profiles somewhere else? It makes sense to move `Gallery` and `Profile` out of the root component file. This will make them more modular and reusable in other files. You can move a component in three steps:

1.  **Make** a new JS file to put the components in.
2.  **Export** your function component from that file (using either [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_the_default_export) or [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export#using_named_exports) exports).
3.  **Import** it in the file where you’ll use the component (using the corresponding technique for importing [default](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#importing_defaults) or [named](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/import#import_a_single_export_from_a_module) exports).

Here both `Profile` and `Gallery` have been moved out of `App.js` into a new file called `Gallery.js`. Now you can change `App.js` to import `Gallery` from `Gallery.js`:

App.jsGallery.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Gallery from './Gallery.js';

export default function App() {
  return (
    <Gallery />
  );
}

Notice how this example is broken down into two component files now:

1.  `Gallery.js`:
    *   Defines the `Profile` component which is only used within the same file and is not exported.
    *   Exports the `Gallery` component as a **default export.**
2.  `App.js`:
    *   Imports `Gallery` as a **default import** from `Gallery.js`.
    *   Exports the root `App` component as a **default export.**

### Note

You may encounter files that leave off the `.js` file extension like so:

    import Gallery from './Gallery';

Either `'./Gallery.js'` or `'./Gallery'` will work with React, though the former is closer to how [native ES Modules](https://developer.mozilla.org/docs/Web/JavaScript/Guide/Modules) work.

##### Deep Dive

#### Default vs named exports[](#default-vs-named-exports "Link for Default vs named exports ")

Show Details

There are two primary ways to export values with JavaScript: default exports and named exports. So far, our examples have only used default exports. But you can use one or both of them in the same file. **A file can have no more than one _default_ export, but it can have as many _named_ exports as you like.**

![Default and named exports](../images/docs/illustrations/i_import-export.svg)

How you export your component dictates how you must import it. You will get an error if you try to import a default export the same way you would a named export! This chart can help you keep track:

Syntax

Export statement

Import statement

Default

`export default function Button() `

`import Button from './Button.js';`

Named

`export function Button() `

`import  from './Button.js';`

When you write a _default_ import, you can put any name you want after `import`. For example, you could write `import Banana from './Button.js'` instead and it would still provide you with the same default export. In contrast, with named imports, the name has to match on both sides. That’s why they are called _named_ imports!

**People often use default exports if the file exports only one component, and use named exports if it exports multiple components and values.** Regardless of which coding style you prefer, always give meaningful names to your component functions and the files that contain them. Components without names, like `export default () => `, are discouraged because they make debugging harder.

Exporting and importing multiple components from the same file[](#exporting-and-importing-multiple-components-from-the-same-file "Link for Exporting and importing multiple components from the same file ")
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

What if you want to show just one `Profile` instead of a gallery? You can export the `Profile` component, too. But `Gallery.js` already has a _default_ export, and you can’t have _two_ default exports. You could create a new file with a default export, or you could add a _named_ export for `Profile`. **A file can only have one default export, but it can have numerous named exports!**

### Note

To reduce the potential confusion between default and named exports, some teams choose to only stick to one style (default or named), or avoid mixing them in a single file. Do what works best for you!

First, **export** `Profile` from `Gallery.js` using a named export (no `default` keyword):

    export function Profile() 

Then, **import** `Profile` from `Gallery.js` to `App.js` using a named import (with the curly braces):

    import  from './Gallery.js';

Finally, **render** `<Profile />` from the `App` component:

    export default function App() 

Now `Gallery.js` contains two exports: a default `Gallery` export, and a named `Profile` export. `App.js` imports both of them. Try editing `<Profile />` to `<Gallery />` and back in this example:

App.jsGallery.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Gallery from './Gallery.js';
import  from './Gallery.js';

export default function App() {
  return (
    <Profile />
  );
}

Now you’re using a mix of default and named exports:

*   `Gallery.js`:
    *   Exports the `Profile` component as a **named export called `Profile`.**
    *   Exports the `Gallery` component as a **default export.**
*   `App.js`:
    *   Imports `Profile` as a **named import called `Profile`** from `Gallery.js`.
    *   Imports `Gallery` as a **default import** from `Gallery.js`.
    *   Exports the root `App` component as a **default export.**

Recap[](#recap "Link for Recap")
--------------------------------

On this page you learned:

*   What a root component file is
*   How to import and export a component
*   When and how to use default and named imports and exports
*   How to export multiple components from the same file

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

#### 

Challenge 1 of 1:

Split the components further[](#split-the-components-further "Link for this heading")

Currently, `Gallery.js` exports both `Profile` and `Gallery`, which is a bit confusing.

Move the `Profile` component to its own `Profile.js`, and then change the `App` component to render both `<Profile />` and `<Gallery />` one after another.

You may use either a default or a named export for `Profile`, but make sure that you use the corresponding import syntax in both `App.js` and `Gallery.js`! You can refer to the table from the deep dive above:

Syntax

Export statement

Import statement

Default

`export default function Button() `

`import Button from './Button.js';`

Named

`export function Button() `

`import  from './Button.js';`

App.jsGallery.jsProfile.js

Gallery.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

// Move me to Profile.js!
export function Profile() {
  return (
    <img
      src\="https://i.imgur.com/QIrZWGIs.jpg"
      alt\="Alan L. Hart"
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

After you get it working with one kind of exports, make it work with the other kind.

Show hint Show solution

[PreviousYour First Component](your-first-component.html)[NextWriting Markup with JSX](writing-markup-with-jsx.html)

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
*   [The root component file](#the-root-component-file)
*   [Exporting and importing a component](#exporting-and-importing-a-component)
*   [Exporting and importing multiple components from the same file](#exporting-and-importing-multiple-components-from-the-same-file)
*   [Recap](#recap)
*   [Challenges](#challenges)

