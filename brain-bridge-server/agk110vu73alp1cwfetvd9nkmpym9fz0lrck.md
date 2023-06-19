Writing Markup with JSX – React

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

Writing Markup with JSX[](#undefined "Link for this heading")
=============================================================

_JSX_ is a syntax extension for JavaScript that lets you write HTML-like markup inside a JavaScript file. Although there are other ways to write components, most React developers prefer the conciseness of JSX, and most codebases use it.

### You will learn

*   Why React mixes markup with rendering logic
*   How JSX is different from HTML
*   How to display information with JSX

JSX: Putting markup into JavaScript[](#jsx-putting-markup-into-javascript "Link for JSX: Putting markup into JavaScript ")
--------------------------------------------------------------------------------------------------------------------------

The Web has been built on HTML, CSS, and JavaScript. For many years, web developers kept content in HTML, design in CSS, and logic in JavaScript—often in separate files! Content was marked up inside HTML while the page’s logic lived separately in JavaScript:

![HTML markup with purple background and a div with two child tags: p and form. ](../_next/writing_jsx_html.png)

![HTML markup with purple background and a div with two child tags: p and form. ](../_next/writing_jsx_html.png)

HTML

![Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.](../_next/writing_jsx_js.png)

![Three JavaScript handlers with yellow background: onSubmit, onLogin, and onClick.](../_next/writing_jsx_js.png)

JavaScript

But as the Web became more interactive, logic increasingly determined content. JavaScript was in charge of the HTML! This is why **in React, rendering logic and markup live together in the same place—components.**

![React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.](../_next/writing_jsx_sidebar.png)

![React component with HTML and JavaScript from previous examples mixed. Function name is Sidebar which calls the function isLoggedIn, highlighted in yellow. Nested inside the function highlighted in purple is the p tag from before, and a Form tag referencing the component shown in the next diagram.](../_next/writing_jsx_sidebar.png)

`Sidebar.js` React component

![React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.](../_next/writing_jsx_form.png)

![React component with HTML and JavaScript from previous examples mixed. Function name is Form containing two handlers onClick and onSubmit highlighted in yellow. Following the handlers is HTML highlighted in purple. The HTML contains a form element with a nested input element, each with an onClick prop.](../_next/writing_jsx_form.png)

`Form.js` React component

Keeping a button’s rendering logic and markup together ensures that they stay in sync with each other on every edit. Conversely, details that are unrelated, such as the button’s markup and a sidebar’s markup, are isolated from each other, making it safer to change either of them on their own.

Each React component is a JavaScript function that may contain some markup that React renders into the browser. React components use a syntax extension called JSX to represent that markup. JSX looks a lot like HTML, but it is a bit stricter and can display dynamic information. The best way to understand this is to convert some HTML markup to JSX markup.

### Note

JSX and React are two separate things. They’re often used together, but you _can_ [use them independently](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#whats-a-jsx-transform) of each other. JSX is a syntax extension, while React is a JavaScript library.

Converting HTML to JSX[](#converting-html-to-jsx "Link for Converting HTML to JSX ")
------------------------------------------------------------------------------------

Suppose that you have some (perfectly valid) HTML:

    <h1>Hedy Lamarr's Todos</h1><img   src="https://i.imgur.com/yXOvdOSs.jpg"   alt="Hedy Lamarr"   class="photo"><ul>    <li>Invent new traffic lights    <li>Rehearse a movie scene    <li>Improve the spectrum technology</ul>

And you want to put it into your component:

    export default function TodoList() 

If you copy and paste it as is, it will not work:

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
      <li\>Improve the spectrum technology
    </ul\>

Show more

This is because JSX is stricter and has a few more rules than HTML! If you read the error messages above, they’ll guide you to fix the markup, or you can follow the guide below.

### Note

Most of the time, React’s on-screen error messages will help you find where the problem is. Give them a read if you get stuck!

The Rules of JSX[](#the-rules-of-jsx "Link for The Rules of JSX ")
------------------------------------------------------------------

### 1\. Return a single root element[](#1-return-a-single-root-element "Link for 1. Return a single root element ")

To return multiple elements from a component, **wrap them with a single parent tag.**

For example, you can use a `<div>`:

    <div>  <h1>Hedy Lamarr's Todos</h1>  <img     src="https://i.imgur.com/yXOvdOSs.jpg"     alt="Hedy Lamarr"     class="photo"  >  <ul>    ...  </ul></div>

If you don’t want to add an extra `<div>` to your markup, you can write `<>` and `</>` instead:

    <>  <h1>Hedy Lamarr's Todos</h1>  <img     src="https://i.imgur.com/yXOvdOSs.jpg"     alt="Hedy Lamarr"     class="photo"  >  <ul>    ...  </ul></>

This empty tag is called a _[Fragment.](../reference/react/Fragment.html)_ Fragments let you group things without leaving any trace in the browser HTML tree.

##### Deep Dive

#### Why do multiple JSX tags need to be wrapped?[](#why-do-multiple-jsx-tags-need-to-be-wrapped "Link for Why do multiple JSX tags need to be wrapped? ")

Show Details

JSX looks like HTML, but under the hood it is transformed into plain JavaScript objects. You can’t return two objects from a function without wrapping them into an array. This explains why you also can’t return two JSX tags without wrapping them into another tag or a Fragment.

### 2\. Close all the tags[](#2-close-all-the-tags "Link for 2. Close all the tags ")

JSX requires tags to be explicitly closed: self-closing tags like `<img>` must become `<img />`, and wrapping tags like `<li>oranges` must be written as `<li>oranges</li>`.

This is how Hedy Lamarr’s image and list items look closed:

    <>  <img     src="https://i.imgur.com/yXOvdOSs.jpg"     alt="Hedy Lamarr"     class="photo"   />  <ul>    <li>Invent new traffic lights</li>    <li>Rehearse a movie scene</li>    <li>Improve the spectrum technology</li>  </ul></>

### 3\. camelCase all most of the things![](#3-camelcase-salls-most-of-the-things "Link for this heading")

JSX turns into JavaScript and attributes written in JSX become keys of JavaScript objects. In your own components, you will often want to read those attributes into variables. But JavaScript has limitations on variable names. For example, their names can’t contain dashes or be reserved words like `class`.

This is why, in React, many HTML and SVG attributes are written in camelCase. For example, instead of `stroke-width` you use `strokeWidth`. Since `class` is a reserved word, in React you write `className` instead, named after the [corresponding DOM property](https://developer.mozilla.org/en-US/docs/Web/API/Element/className):

    <img   src="https://i.imgur.com/yXOvdOSs.jpg"   alt="Hedy Lamarr"   className="photo"/>

You can [find all these attributes in the list of DOM component props.](../reference/react-dom/components/common.html) If you get one wrong, don’t worry—React will print a message with a possible correction to the [browser console.](https://developer.mozilla.org/docs/Tools/Browser_Console)

### Pitfall

For historical reasons, [`aria-*`](https://developer.mozilla.org/docs/Web/Accessibility/ARIA) and [`data-*`](https://developer.mozilla.org/docs/Learn/HTML/Howto/Use_data_attributes) attributes are written as in HTML with dashes.

### Pro-tip: Use a JSX Converter[](#pro-tip-use-a-jsx-converter "Link for Pro-tip: Use a JSX Converter ")

Converting all these attributes in existing markup can be tedious! We recommend using a [converter](https://transform.tools/html-to-jsx) to translate your existing HTML and SVG to JSX. Converters are very useful in practice, but it’s still worth understanding what is going on so that you can comfortably write JSX on your own.

Here is your final result:

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
        <li\>Improve the spectrum technology</li\>
      </ul\>
    </\>
  );
}

Show more

Recap[](#recap "Link for Recap")
--------------------------------

Now you know why JSX exists and how to use it in components:

*   React components group rendering logic together with markup because they are related.
*   JSX is similar to HTML, with a few differences. You can use a [converter](https://transform.tools/html-to-jsx) if you need to.
*   Error messages will often point you in the right direction to fixing your markup.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

#### 

Challenge 1 of 1:

Convert some HTML to JSX[](#convert-some-html-to-jsx "Link for this heading")

This HTML was pasted into a component, but it’s not valid JSX. Fix it:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Bio() {
  return (
    <div class\="intro"\>
      <h1\>Welcome to my website!</h1\>
    </div\>
    <p class\="summary"\>
      You can find my thoughts here.
      <br\><br\>
      <b\>And <i\>pictures</b\></i\> of scientists!
    </p\>
  );
}

Whether to do it by hand or using the converter is up to you!

Show solution

[PreviousImporting and Exporting Components](importing-and-exporting-components.html)[NextJavaScript in JSX with Curly Braces](javascript-in-jsx-with-curly-braces.html)

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
*   [JSX: Putting markup into JavaScript](#jsx-putting-markup-into-javascript)
*   [Converting HTML to JSX](#converting-html-to-jsx)
*   [The Rules of JSX](#the-rules-of-jsx)
*   [1\. Return a single root element](#1-return-a-single-root-element)
*   [2\. Close all the tags](#2-close-all-the-tags)
*   [3\. camelCase all most of the things!](#3-camelcase-salls-most-of-the-things)
*   [Pro-tip: Use a JSX Converter](#pro-tip-use-a-jsx-converter)
*   [Recap](#recap)
*   [Challenges](#challenges)

