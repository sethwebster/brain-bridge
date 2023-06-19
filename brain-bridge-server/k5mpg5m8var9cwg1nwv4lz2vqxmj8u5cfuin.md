Render and Commit – React

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

Render and Commit[](#undefined "Link for this heading")
=======================================================

Before your components are displayed on screen, they must be rendered by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

### You will learn

*   What rendering means in React
*   When and why React renders a component
*   The steps involved in displaying a component on screen
*   Why rendering does not always produce a DOM update

Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients. In this scenario, React is the waiter who puts in requests from customers and brings them their orders. This process of requesting and serving UI has three steps:

1.  **Triggering** a render (delivering the guest’s order to the kitchen)
2.  **Rendering** the component (preparing the order in the kitchen)
3.  **Committing** to the DOM (placing the order on the table)

1.  ![React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen.](../images/docs/illustrations/i_render-and-commit1.png)
    
    Trigger
    
2.  ![The Card Chef gives React a fresh Card component.](../images/docs/illustrations/i_render-and-commit2.png)
    
    Render
    
3.  ![React delivers the Card to the user at their table.](../images/docs/illustrations/i_render-and-commit3.png)
    
    Commit
    

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

Step 1: Trigger a render[](#step-1-trigger-a-render "Link for Step 1: Trigger a render ")
-----------------------------------------------------------------------------------------

There are two reasons for a component to render:

1.  It’s the component’s **initial render.**
2.  The component’s (or one of its ancestors’) **state has been updated.**

### Initial render[](#initial-render "Link for Initial render ")

When your app starts, you need to trigger the initial render. Frameworks and sandboxes sometimes hide this code, but it’s done by calling [`createRoot`](../reference/react-dom/client/createRoot.html) with the target DOM node, and then calling its `render` method with your component:

index.jsImage.js

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Image from './Image.js';
import  from 'react-dom/client';

const root = createRoot(document.getElementById('root'))
root.render(<Image />);

Try commenting out the `root.render()` call and see the component disappear!

### Re-renders when state updates[](#re-renders-when-state-updates "Link for Re-renders when state updates ")

Once the component has been initially rendered, you can trigger further renders by updating its state with the [`set` function.](../reference/react/useState.html#setstate) Updating your component’s state automatically queues a render. (You can imagine these as a restaurant guest ordering tea, dessert, and all sorts of things after putting in their first order, depending on the state of their thirst or hunger.)

1.  ![React as a server in a restaurant, serving a Card UI to the user, represented as a patron with a cursor for their head. They patron expresses they want a pink card, not a black one!](../images/docs/illustrations/i_rerender1.png)
    
    State update...
    
2.  ![React returns to the Component Kitchen and tells the Card Chef they need a pink Card.](../images/docs/illustrations/i_rerender2.png)
    
    ...triggers...
    
3.  ![The Card Chef gives React the pink Card.](../images/docs/illustrations/i_rerender3.png)
    
    ...render!
    

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

Step 2: React renders your components[](#step-2-react-renders-your-components "Link for Step 2: React renders your components ")
--------------------------------------------------------------------------------------------------------------------------------

After you trigger a render, React calls your components to figure out what to display on screen. **“Rendering” is React calling your components.**

*   **On initial render,** React will call the root component.
*   **For subsequent renders,** React will call the function component whose state update triggered the render.

This process is recursive: if the updated component returns some other component, React will render _that_ component next, and if that component also returns something, it will render _that_ component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen.

In the following example, React will call `Gallery()` and `Image()` several times:

Gallery.jsindex.js

Gallery.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Gallery() {
  return (
    <section\>
      <h1\>Inspiring Sculptures</h1\>
      <Image />
      <Image />
      <Image />
    </section\>
  );
}

function Image() {
  return (
    <img
      src\="https://i.imgur.com/ZF6s192.jpg"
      alt\="'Floralis Genérica' by Eduardo Catalano: a gigantic metallic flower sculpture with reflective petals"
    />
  );
}

Show more

*   **During the initial render,** React will [create the DOM nodes](https://developer.mozilla.org/docs/Web/API/Document/createElement) for `<section>`, `<h1>`, and three `<img>` tags.
*   **During a re-render,** React will calculate which of their properties, if any, have changed since the previous render. It won’t do anything with that information until the next step, the commit phase.

### Pitfall

Rendering must always be a [pure calculation](keeping-components-pure.html):

*   **Same inputs, same output.** Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
*   **It minds its own business.** It should not change any objects or variables that existed before rendering. (One order should not change anyone else’s order.)

Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in “Strict Mode”, React calls each component’s function twice, which can help surface mistakes caused by impure functions.

##### Deep Dive

#### Optimizing performance[](#optimizing-performance "Link for Optimizing performance ")

Show Details

The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the [Performance](https://reactjs.org/docs/optimizing-performance.html) section. **Don’t optimize prematurely!**

Step 3: React commits changes to the DOM[](#step-3-react-commits-changes-to-the-dom "Link for Step 3: React commits changes to the DOM ")
-----------------------------------------------------------------------------------------------------------------------------------------

After rendering (calling) your components, React will modify the DOM.

*   **For the initial render,** React will use the [`appendChild()`](https://developer.mozilla.org/docs/Web/API/Node/appendChild) DOM API to put all the DOM nodes it has created on screen.
*   **For re-renders,** React will apply the minimal necessary operations (calculated while rendering!) to make the DOM match the latest rendering output.

**React only changes the DOM nodes if there’s a difference between renders.** For example, here is a component that re-renders with different props passed from its parent every second. Notice how you can add some text into the `<input>`, updating its `value`, but the text doesn’t disappear when the component re-renders:

Clock.js

Clock.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Clock() {
  return (
    <\>
      <h1\></h1\>
      <input />
    </\>
  );
}

This works because during this last step, React only updates the content of `<h1>` with the new `time`. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn’t touch the `<input>`—or its `value`!

Epilogue: Browser paint[](#epilogue-browser-paint "Link for Epilogue: Browser paint ")
--------------------------------------------------------------------------------------

After rendering is done and React updated the DOM, the browser will repaint the screen. Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion throughout the docs.

![A browser painting 'still life with card element'.](../images/docs/illustrations/i_browser-paint.png)

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

Recap[](#recap "Link for Recap")
--------------------------------

*   Any screen update in a React app happens in three steps:
    1.  Trigger
    2.  Render
    3.  Commit
*   You can use Strict Mode to find mistakes in your components
*   React does not touch the DOM if the rendering result is the same as last time

[PreviousState: A Component's Memory](state-a-components-memory.html)[NextState as a Snapshot](state-as-a-snapshot.html)

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
*   [Step 1: Trigger a render](#step-1-trigger-a-render)
*   [Initial render](#initial-render)
*   [Re-renders when state updates](#re-renders-when-state-updates)
*   [Step 2: React renders your components](#step-2-react-renders-your-components)
*   [Step 3: React commits changes to the DOM](#step-3-react-commits-changes-to-the-dom)
*   [Epilogue: Browser paint](#epilogue-browser-paint)
*   [Recap](#recap)

