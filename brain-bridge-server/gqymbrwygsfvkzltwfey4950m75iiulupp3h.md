Conditional Rendering – React

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

Conditional Rendering[](#undefined "Link for this heading")
===========================================================

Your components will often need to display different things depending on different conditions. In React, you can conditionally render JSX using JavaScript syntax like `if` statements, `&&`, and `? :` operators.

### You will learn

*   How to return different JSX depending on a condition
*   How to conditionally include or exclude a piece of JSX
*   Common conditional syntax shortcuts you’ll encounter in React codebases

Conditionally returning JSX[](#conditionally-returning-jsx "Link for Conditionally returning JSX ")
---------------------------------------------------------------------------------------------------

Let’s say you have a `PackingList` component rendering several `Item`s, which can be marked as packed or not:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  return <li className\="item"\></li\>;
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

Notice that some of the `Item` components have their `isPacked` prop set to `true` instead of `false`. You want to add a checkmark (✔) to packed items if `isPacked=`.

You can write this as an [`if`/`else` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) like so:

    if (isPacked) </li>;

If the `isPacked` prop is `true`, this code **returns a different JSX tree.** With this change, some of the items get a checkmark at the end:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  if (isPacked) {
    return <li className\="item"\> ✔</li\>;
  }
  return <li className\="item"\></li\>;
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

Try editing what gets returned in either case, and see how the result changes!

Notice how you’re creating branching logic with JavaScript’s `if` and `return` statements. In React, control flow (like conditions) is handled by JavaScript.

### Conditionally returning nothing with `null`[](#conditionally-returning-nothing-with-null "Link for this heading")

In some situations, you won’t want to render anything at all. For example, say you don’t want to show packed items at all. A component must return something. In this case, you can return `null`:

    if (isPacked) </li>;

If `isPacked` is true, the component will return nothing, `null`. Otherwise, it will return JSX to render.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  if (isPacked) {
    return null;
  }
  return <li className\="item"\></li\>;
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

In practice, returning `null` from a component isn’t common because it might surprise a developer trying to render it. More often, you would conditionally include or exclude the component in the parent component’s JSX. Here’s how to do that!

Conditionally including JSX[](#conditionally-including-jsx "Link for Conditionally including JSX ")
---------------------------------------------------------------------------------------------------

In the previous example, you controlled which (if any!) JSX tree would be returned by the component. You may already have noticed some duplication in the render output:

    <li className="item"> ✔</li>

is very similar to

    <li className="item"></li>

Both of the conditional branches return `<li className="item">...</li>`:

    if (isPacked) </li>;

While this duplication isn’t harmful, it could make your code harder to maintain. What if you want to change the `className`? You’d have to do it in two places in your code! In such a situation, you could conditionally include a little JSX to make your code more [DRY.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

### Conditional (ternary) operator (`? :`)[](#conditional-ternary-operator-- "Link for this heading")

JavaScript has a compact syntax for writing a conditional expression — the [conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) or “ternary operator”.

Instead of this:

    if (isPacked) </li>;

You can write this:

    return (  <li className="item">      </li>);

You can read it as _“if `isPacked` is true, then (`?`) render `name + ' ✔'`, otherwise (`:`) render `name`”_.

##### Deep Dive

#### Are these two examples fully equivalent?[](#are-these-two-examples-fully-equivalent "Link for Are these two examples fully equivalent? ")

Show Details

If you’re coming from an object-oriented programming background, you might assume that the two examples above are subtly different because one of them may create two different “instances” of `<li>`. But JSX elements aren’t “instances” because they don’t hold any internal state and aren’t real DOM nodes. They’re lightweight descriptions, like blueprints. So these two examples, in fact, _are_ completely equivalent. [Preserving and Resetting State](preserving-and-resetting-state.html) goes into detail about how this works.

Now let’s say you want to wrap the completed item’s text into another HTML tag, like `<del>` to strike it out. You can add even more newlines and parentheses so that it’s easier to nest more JSX in each of the cases:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  return (
    <li className\="item"\>
      {isPacked ? (
        <del\>
          
        </del\>
      ) : (
        name
      )}
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

This style works well for simple conditions, but use it in moderation. If your components get messy with too much nested conditional markup, consider extracting child components to clean things up. In React, markup is a part of your code, so you can use tools like variables and functions to tidy up complex expressions.

### Logical AND operator (`&&`)[](#logical-and-operator- "Link for this heading")

Another common shortcut you’ll encounter is the [JavaScript logical AND (`&&`) operator.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#:~:text=The%20logical%20AND%20(%20%26%26%20)%20operator,it%20returns%20a%20Boolean%20value.) Inside React components, it often comes up when you want to render some JSX when the condition is true, **or render nothing otherwise.** With `&&`, you could conditionally render the checkmark only if `isPacked` is `true`:

    return (  <li className="item">      </li>);

You can read this as _“if `isPacked`, then (`&&`) render the checkmark, otherwise, render nothing”_.

Here it is in action:

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

A [JavaScript && expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND) returns the value of its right side (in our case, the checkmark) if the left side (our condition) is `true`. But if the condition is `false`, the whole expression becomes `false`. React considers `false` as a “hole” in the JSX tree, just like `null` or `undefined`, and doesn’t render anything in its place.

### Pitfall

**Don’t put numbers on the left side of `&&`.**

To test the condition, JavaScript converts the left side to a boolean automatically. However, if the left side is `0`, then the whole expression gets that value (`0`), and React will happily render `0` rather than nothing.

For example, a common mistake is to write code like `messageCount && <p>New messages</p>`. It’s easy to assume that it renders nothing when `messageCount` is `0`, but it really renders the `0` itself!

To fix it, make the left side a boolean: `messageCount > 0 && <p>New messages</p>`.

### Conditionally assigning JSX to a variable[](#conditionally-assigning-jsx-to-a-variable "Link for Conditionally assigning JSX to a variable ")

When the shortcuts get in the way of writing plain code, try using an `if` statement and a variable. You can reassign variables defined with [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), so start by providing the default content you want to display, the name:

    let itemContent = name;

Use an `if` statement to reassign a JSX expression to `itemContent` if `isPacked` is `true`:

    if (isPacked) 

[Curly braces open the “window into JavaScript”.](javascript-in-jsx-with-curly-braces.html#using-curly-braces-a-window-into-the-javascript-world) Embed the variable with curly braces in the returned JSX tree, nesting the previously calculated expression inside of JSX:

    <li className="item">  </li>

This style is the most verbose, but it’s also the most flexible. Here it is in action:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  let itemContent = name;
  if (isPacked) {
    itemContent = name + " ✔";
  }
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

Like before, this works not only for text, but for arbitrary JSX too:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  let itemContent = name;
  if (isPacked) {
    itemContent = (
      <del\>
        
      </del\>
    );
  }
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

If you’re not familiar with JavaScript, this variety of styles might seem overwhelming at first. However, learning them will help you read and write any JavaScript code — and not just React components! Pick the one you prefer for a start, and then consult this reference again if you forget how the other ones work.

Recap[](#recap "Link for Recap")
--------------------------------

*   In React, you control branching logic with JavaScript.
*   You can return a JSX expression conditionally with an `if` statement.
*   You can conditionally save some JSX to a variable and then include it inside other JSX by using the curly braces.
*   In JSX, `` means _“if `cond`, render `<A />`, otherwise `<B />`”_.
*   In JSX, `` means _“if `cond`, render `<A />`, otherwise nothing”_.
*   The shortcuts are common, but you don’t have to use them if you prefer plain `if`.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Show an icon for incomplete items with `? :` 2. Show the item importance with `&&` 3. Refactor a series of `? :` to `if` and variables

#### 

Challenge 1 of 3:

Show an icon for incomplete items with `? :`[](#show-an-icon-for-incomplete-items-with-- "Link for this heading")

Use the conditional operator (`cond ? a : b`) to render a ❌ if `isPacked` isn’t `true`.

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

Show solutionNext Challenge

[PreviousPassing Props to a Component](passing-props-to-a-component.html)[NextRendering Lists](rendering-lists.html)

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
*   [Conditionally returning JSX](#conditionally-returning-jsx)
*   [Conditionally returning nothing with `null`](#conditionally-returning-nothing-with-null)
*   [Conditionally including JSX](#conditionally-including-jsx)
*   [Conditional (ternary) operator (`? :`)](#conditional-ternary-operator--)
*   [Logical AND operator (`&&`)](#logical-and-operator-)
*   [Conditionally assigning JSX to a variable](#conditionally-assigning-jsx-to-a-variable)
*   [Recap](#recap)
*   [Challenges](#challenges)

