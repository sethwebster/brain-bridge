Add React to an Existing Project – React

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

[Installation](installation.html)

Add React to an Existing Project[](#undefined "Link for this heading")
======================================================================

If you want to add some interactivity to your existing project, you don’t have to rewrite it in React. Add React to your existing stack, and render interactive React components anywhere.

### Note

**You need to install [Node.js](https://nodejs.org/en/) for local development.** Although you can [try React](installation.html#try-react) online or with a simple HTML page, realistically most JavaScript tooling you’ll want to use for development requires Node.js.

Using React for an entire subroute of your existing website[](#using-react-for-an-entire-subroute-of-your-existing-website "Link for Using React for an entire subroute of your existing website ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Let’s say you have an existing web app at `example.com` built with another server technology (like Rails), and you want to implement all routes starting with `example.com/some-app/` fully with React.

Here’s how we recommend to set it up:

1.  **Build the React part of your app** using one of the [React-based frameworks](start-a-new-react-project.html).
2.  **Specify `/some-app` as the _base path_** in your framework’s configuration (here’s how: [Next.js](https://nextjs.org/docs/api-reference/next.config.js/basepath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3.  **Configure your server or a proxy** so that all requests under `/some-app/` are handled by your React app.

This ensures the React part of your app can [benefit from the best practices](start-a-new-react-project.html#can-i-use-react-without-a-framework) baked into those frameworks.

Many React-based frameworks are full-stack and let your React app take advantage of the server. However, you can use the same approach even if you can’t or don’t want to run JavaScript on the server. In that case, serve the HTML/CSS/JS export ([`next export` output](https://nextjs.org/docs/advanced-features/static-html-export) for Next.js, default for Gatsby) at `/some-app/` instead.

Using React for a part of your existing page[](#using-react-for-a-part-of-your-existing-page "Link for Using React for a part of your existing page ")
------------------------------------------------------------------------------------------------------------------------------------------------------

Let’s say you have an existing page built with another technology (either a server one like Rails, or a client one like Backbone), and you want to render interactive React components somewhere on that page. That’s a common way to integrate React—in fact, it’s how most React usage looked at Meta for many years!

You can do this in two steps:

1.  **Set up a JavaScript environment** that lets you use the [JSX syntax](writing-markup-with-jsx.html), split your code into modules with the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax, and use packages (for example, React) from the [npm](https://www.npmjs.com/) package registry.
2.  **Render your React components** where you want to see them on the page.

The exact approach depends on your existing page setup, so let’s walk through some details.

### Step 1: Set up a modular JavaScript environment[](#step-1-set-up-a-modular-javascript-environment "Link for Step 1: Set up a modular JavaScript environment ")

A modular JavaScript environment lets you write your React components in individual files, as opposed to writing all of your code in a single file. It also lets you use all the wonderful packages published by other developers on the [npm](https://www.npmjs.com/) registry—including React itself! How you do this depends on your existing setup:

*   **If your app is already split into files that use `import` statements,** try to use the setup you already have. Check whether writing `<div />` in your JS code causes a syntax error. If it causes a syntax error, you might need to [transform your JavaScript code with Babel](https://babeljs.io/setup), and enable the [Babel React preset](https://babeljs.io/docs/babel-preset-react) to use JSX.
    
*   **If your app doesn’t have an existing setup for compiling JavaScript modules,** set it up with [Vite](https://vitejs.dev/). The Vite community maintains [many integrations with backend frameworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), including Rails, Django, and Laravel. If your backend framework is not listed, [follow this guide](https://vitejs.dev/guide/backend-integration.html) to manually integrate Vite builds with your backend.
    

To check whether your setup works, run this command in your project folder:

Terminal

Copy

npm install react react-dom

Then add these lines of code at the top of your main JavaScript file (it might be called `index.js` or `main.js`):

index.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<h1\>Hello, world</h1\>);

If the entire content of your page was replaced by a “Hello, world!”, everything worked! Keep reading.

### Note

Integrating a modular JavaScript environment into an existing project for the first time can feel intimidating, but it’s worth it! If you get stuck, try our [community resources](../community.html) or the [Vite Chat](https://chat.vitejs.dev/).

### Step 2: Render React components anywhere on the page[](#step-2-render-react-components-anywhere-on-the-page "Link for Step 2: Render React components anywhere on the page ")

In the previous step, you put this code at the top of your main file:

    import  from 'react-dom/client';// Clear the existing HTML contentdocument.body.innerHTML = '<div id="app"></div>';// Render your React component insteadconst root = createRoot(document.getElementById('app'));root.render(<h1>Hello, world</h1>);

Of course, you don’t actually want to clear the existing HTML content!

Delete this code.

Instead, you probably want to render your React components in specific places in your HTML. Open your HTML page (or the server templates that generate it) and add a unique [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) attribute to any tag, for example:

    <!-- ... somewhere in your html ... --><nav id="navigation"></nav><!-- ... more html ... -->

This lets you find that HTML element with [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) and pass it to [`createRoot`](../reference/react-dom/client/createRoot.html) so that you can render your own React component inside:

index.htmlindex.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1\>Hello from React!</h1\>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);

Notice how the original HTML content from `index.html` is preserved, but your own `NavigationBar` React component now appears inside the `<nav id="navigation">` from your HTML. Read the [`createRoot` usage documentation](../reference/react-dom/client/createRoot.html#rendering-a-page-partially-built-with-react) to learn more about rendering React components inside an existing HTML page.

When you adopt React in an existing project, it’s common to start with small interactive components (like buttons), and then gradually keep “moving upwards” until eventually your entire page is built with React. If you ever reach that point, we recommend migrating to [a React framework](start-a-new-react-project.html) right after to get the most out of React.

Using React Native in an existing native mobile app[](#using-react-native-in-an-existing-native-mobile-app "Link for Using React Native in an existing native mobile app ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[React Native](https://reactnative.dev/) can also be integrated into existing native apps incrementally. If you have an existing native app for Android (Java or Kotlin) or iOS (Objective-C or Swift), [follow this guide](https://reactnative.dev/docs/integration-with-existing-apps) to add a React Native screen to it.

[PreviousStart a New React Project](start-a-new-react-project.html)[NextEditor Setup](editor-setup.html)

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
*   [Using React for an entire subroute of your existing website](#using-react-for-an-entire-subroute-of-your-existing-website)
*   [Using React for a part of your existing page](#using-react-for-a-part-of-your-existing-page)
*   [Step 1: Set up a modular JavaScript environment](#step-1-set-up-a-modular-javascript-environment)
*   [Step 2: Render React components anywhere on the page](#step-2-render-react-components-anywhere-on-the-page)
*   [Using React Native in an existing native mobile app](#using-react-native-in-an-existing-native-mobile-app)

