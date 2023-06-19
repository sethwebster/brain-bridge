Your First Component – React

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

Your First Component[](#undefined "Link for this heading")
==========================================================

_Components_ are one of the core concepts of React. They are the foundation upon which you build user interfaces (UI), which makes them the perfect place to start your React journey!

### You will learn

*   What a component is
*   What role components play in a React application
*   How to write your first React component

Components: UI building blocks[](#components-ui-building-blocks "Link for Components: UI building blocks ")
-----------------------------------------------------------------------------------------------------------

On the Web, HTML lets us create rich structured documents with its built-in set of tags like `<h1>` and `<li>`:

    <article>  <h1>My First Component</h1>  <ol>    <li>Components: UI Building Blocks</li>    <li>Defining a Component</li>    <li>Using a Component</li>  </ol></article>

This markup represents this article `<article>`, its heading `<h1>`, and an (abbreviated) table of contents as an ordered list `<ol>`. Markup like this, combined with CSS for style, and JavaScript for interactivity, lies behind every sidebar, avatar, modal, dropdown—every piece of UI you see on the Web.

React lets you combine your markup, CSS, and JavaScript into custom “components”, **reusable UI elements for your app.** The table of contents code you saw above could be turned into a `<TableOfContents />` component you could render on every page. Under the hood, it still uses the same HTML tags like `<article>`, `<h1>`, etc.

Just like with HTML tags, you can compose, order and nest components to design whole pages. For example, the documentation page you’re reading is made out of React components:

    <PageLayout>  <NavigationHeader>    <SearchBar />    <Link to="/docs">Docs</Link>  </NavigationHeader>  <Sidebar />  <PageContent>    <TableOfContents />    <DocumentationText />  </PageContent></PageLayout>

As your project grows, you will notice that many of your designs can be composed by reusing components you already wrote, speeding up your development. Our table of contents above could be added to any screen with `<TableOfContents />`! You can even jumpstart your project with the thousands of components shared by the React open source community like [Chakra UI](https://chakra-ui.com/) and [Material UI.](https://material-ui.com/)

Defining a component[](#defining-a-component "Link for Defining a component ")
------------------------------------------------------------------------------

Traditionally when creating web pages, web developers marked up their content and then added interaction by sprinkling on some JavaScript. This worked great when interaction was a nice-to-have on the web. Now it is expected for many sites and all apps. React puts interactivity first while still using the same technology: **a React component is a JavaScript function that you can _sprinkle with markup_.** Here’s what that looks like (you can edit the example below):

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Profile() {
  return (
    <img
      src\="https://i.imgur.com/MK3eW3Am.jpg"
      alt\="Katherine Johnson"
    />
  )
}

And here’s how to build a component:

### Step 1: Export the component[](#step-1-export-the-component "Link for Step 1: Export the component ")

The `export default` prefix is a [standard JavaScript syntax](https://developer.mozilla.org/docs/web/javascript/reference/statements/export) (not specific to React). It lets you mark the main function in a file so that you can later import it from other files. (More on importing in [Importing and Exporting Components](importing-and-exporting-components.html)!)

### Step 2: Define the function[](#step-2-define-the-function "Link for Step 2: Define the function ")

With `function Profile() ` you define a JavaScript function with the name `Profile`.

### Pitfall

React components are regular JavaScript functions, but **their names must start with a capital letter** or they won’t work!

### Step 3: Add markup[](#step-3-add-markup "Link for Step 3: Add markup ")

The component returns an `<img />` tag with `src` and `alt` attributes. `<img />` is written like HTML, but it is actually JavaScript under the hood! This syntax is called [JSX](writing-markup-with-jsx.html), and it lets you embed markup inside JavaScript.

Return statements can be written all on one line, as in this component:

    return <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />;

But if your markup isn’t all on the same line as the `return` keyword, you must wrap it in a pair of parentheses:

    return (  <div>    <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />  </div>);

### Pitfall

Without parentheses, any code on the lines after `return` [will be ignored](https://stackoverflow.com/questions/2846283/what-are-the-rules-for-javascripts-automatic-semicolon-insertion-asi)!

Using a component[](#using-a-component "Link for Using a component ")
---------------------------------------------------------------------

Now that you’ve defined your `Profile` component, you can nest it inside other components. For example, you can export a `Gallery` component that uses multiple `Profile` components:

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

### What the browser sees[](#what-the-browser-sees "Link for What the browser sees ")

Notice the difference in casing:

*   `<section>` is lowercase, so React knows we refer to an HTML tag.
*   `<Profile />` starts with a capital `P`, so React knows that we want to use our component called `Profile`.

And `Profile` contains even more HTML: `<img />`. In the end, this is what the browser sees:

    <section>  <h1>Amazing scientists</h1>  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" />  <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Katherine Johnson" /></section>

### Nesting and organizing components[](#nesting-and-organizing-components "Link for Nesting and organizing components ")

Components are regular JavaScript functions, so you can keep multiple components in the same file. This is convenient when components are relatively small or tightly related to each other. If this file gets crowded, you can always move `Profile` to a separate file. You will learn how to do this shortly on the [page about imports.](importing-and-exporting-components.html)

Because the `Profile` components are rendered inside `Gallery`—even several times!—we can say that `Gallery` is a **parent component,** rendering each `Profile` as a “child”. This is part of the magic of React: you can define a component once, and then use it in as many places and as many times as you like.

### Pitfall

Components can render other components, but **you must never nest their definitions:**

    export default function Gallery() 

The snippet above is [very slow and causes bugs.](preserving-and-resetting-state.html#different-components-at-the-same-position-reset-state) Instead, define every component at the top level:

    export default function Gallery() 

When a child component needs some data from a parent, [pass it by props](passing-props-to-a-component.html) instead of nesting definitions.

##### Deep Dive

#### Components all the way down[](#components-all-the-way-down "Link for Components all the way down ")

Show Details

Your React application begins at a “root” component. Usually, it is created automatically when you start a new project. For example, if you use [CodeSandbox](https://codesandbox.io/) or [Create React App](https://create-react-app.dev/), the root component is defined in `src/App.js`. If you use the framework [Next.js](https://nextjs.org/), the root component is defined in `pages/index.js`. In these examples, you’ve been exporting root components.

Most React apps use components all the way down. This means that you won’t only use components for reusable pieces like buttons, but also for larger pieces like sidebars, lists, and ultimately, complete pages! Components are a handy way to organize UI code and markup, even if some of them are only used once.

[React-based frameworks](start-a-new-react-project.html) take this a step further. Instead of using an empty HTML file and letting React “take over” managing the page with JavaScript, they _also_ generate the HTML automatically from your React components. This allows your app to show some content before the JavaScript code loads.

Still, many websites only use React to [add interactivity to existing HTML pages.](add-react-to-an-existing-project.html#using-react-for-a-part-of-your-existing-page) They have many root components instead of a single one for the entire page. You can use as much—or as little—React as you need.

Recap[](#recap "Link for Recap")
--------------------------------

You’ve just gotten your first taste of React! Let’s recap some key points.

*   React lets you create components, **reusable UI elements for your app.**
    
*   In a React app, every piece of UI is a component.
    
*   React components are regular JavaScript functions except:
    
    1.  Their names always begin with a capital letter.
    2.  They return JSX markup.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Export the component 2. Fix the return statement 3. Spot the mistake 4. Your own component

#### 

Challenge 1 of 4:

Export the component[](#export-the-component "Link for this heading")

This sandbox doesn’t work because the root component is not exported:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Profile() {
  return (
    <img
      src\="https://i.imgur.com/lICfvbD.jpg"
      alt\="Aklilu Lemma"
    />
  );
}

Try to fix it yourself before looking at the solution!

Show solutionNext Challenge

[PreviousDescribing the UI](describing-the-ui.html)[NextImporting and Exporting Components](importing-and-exporting-components.html)

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
*   [Components: UI building blocks](#components-ui-building-blocks)
*   [Defining a component](#defining-a-component)
*   [Step 1: Export the component](#step-1-export-the-component)
*   [Step 2: Define the function](#step-2-define-the-function)
*   [Step 3: Add markup](#step-3-add-markup)
*   [Using a component](#using-a-component)
*   [What the browser sees](#what-the-browser-sees)
*   [Nesting and organizing components](#nesting-and-organizing-components)
*   [Recap](#recap)
*   [Challenges](#challenges)

