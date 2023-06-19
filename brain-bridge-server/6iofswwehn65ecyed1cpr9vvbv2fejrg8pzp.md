Sharing State Between Components – React

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

[Managing State](managing-state.html)

Sharing State Between Components[](#undefined "Link for this heading")
======================================================================

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as _lifting state up,_ and it’s one of the most common things you will do writing React code.

### You will learn

*   How to share state between components by lifting it up
*   What are controlled and uncontrolled components

Lifting state up by example[](#lifting-state-up-by-example "Link for Lifting state up by example ")
---------------------------------------------------------------------------------------------------

In this example, a parent `Accordion` component renders two separate `Panel`s:

*   `Accordion`
    *   `Panel`
    *   `Panel`

Each `Panel` component has a boolean `isActive` state that determines whether its content is visible.

Press the Show button for both panels:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function Panel() {
  const \[isActive, setIsActive\] = useState(false);
  return (
    <section className\="panel"\>
      <h3\></h3\>
      {isActive ? (
        <p\></p\>
      ) : (
        <button onClick\=\>
          Show
        </button\>
      )}
    </section\>
  );
}

export default function Accordion() {
  return (
    <\>
      <h2\>Almaty, Kazakhstan</h2\>
      <Panel title\="About"\>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel\>
      <Panel title\="Etymology"\>
        The name comes from <span lang\="kk-KZ"\>алма</span\>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang\="la"\>Malus sieversii</i\> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel\>
    </\>
  );
}

Show more

Notice how pressing one panel’s button does not affect the other panel—they are independent.

![Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Both Panel components contain isActive with value false.](../_next/sharing_state_child.png)

![Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Both Panel components contain isActive with value false.](../_next/sharing_state_child.png)

Initially, each `Panel`’s `isActive` state is `false`, so they both appear collapsed

![The same diagram as the previous, with the isActive of the first child Panel component highlighted indicating a click with the isActive value set to true. The second Panel component still contains value false.](../_next/sharing_state_child_clicked.png)

![The same diagram as the previous, with the isActive of the first child Panel component highlighted indicating a click with the isActive value set to true. The second Panel component still contains value false.](../_next/sharing_state_child_clicked.png)

Clicking either `Panel`’s button will only update that `Panel`’s `isActive` state alone

**But now let’s say you want to change it so that only one panel is expanded at any given time.** With that design, expanding the second panel should collapse the first one. How would you do that?

To coordinate these two panels, you need to “lift their state up” to a parent component in three steps:

1.  **Remove** state from the child components.
2.  **Pass** hardcoded data from the common parent.
3.  **Add** state to the common parent and pass it down together with the event handlers.

This will allow the `Accordion` component to coordinate both `Panel`s and only expand one at a time.

### Step 1: Remove state from the child components[](#step-1-remove-state-from-the-child-components "Link for Step 1: Remove state from the child components ")

You will give control of the `Panel`’s `isActive` to its parent component. This means that the parent component will pass `isActive` to `Panel` as a prop instead. Start by **removing this line** from the `Panel` component:

    const [isActive, setIsActive] = useState(false);

And instead, add `isActive` to the `Panel`’s list of props:

    function Panel() {

Now the `Panel`’s parent component can _control_ `isActive` by [passing it down as a prop.](passing-props-to-a-component.html) Conversely, the `Panel` component now has _no control_ over the value of `isActive`—it’s now up to the parent component!

### Step 2: Pass hardcoded data from the common parent[](#step-2-pass-hardcoded-data-from-the-common-parent "Link for Step 2: Pass hardcoded data from the common parent ")

To lift state up, you must locate the closest common parent component of _both_ of the child components that you want to coordinate:

*   `Accordion` _(closest common parent)_
    *   `Panel`
    *   `Panel`

In this example, it’s the `Accordion` component. Since it’s above both panels and can control their props, it will become the “source of truth” for which panel is currently active. Make the `Accordion` component pass a hardcoded value of `isActive` (for example, `true`) to both panels:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Accordion() {
  return (
    <\>
      <h2\>Almaty, Kazakhstan</h2\>
      <Panel title\="About" isActive\=\>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel\>
      <Panel title\="Etymology" isActive\=\>
        The name comes from <span lang\="kk-KZ"\>алма</span\>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang\="la"\>Malus sieversii</i\> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel\>
    </\>
  );
}

function Panel() {
  return (
    <section className\="panel"\>
      <h3\></h3\>
      {isActive ? (
        <p\></p\>
      ) : (
        <button onClick\=\>
          Show
        </button\>
      )}
    </section\>
  );
}

Show more

Try editing the hardcoded `isActive` values in the `Accordion` component and see the result on the screen.

### Step 3: Add state to the common parent[](#step-3-add-state-to-the-common-parent "Link for Step 3: Add state to the common parent ")

Lifting state up often changes the nature of what you’re storing as state.

In this case, only one panel should be active at a time. This means that the `Accordion` common parent component needs to keep track of _which_ panel is the active one. Instead of a `boolean` value, it could use a number as the index of the active `Panel` for the state variable:

    const [activeIndex, setActiveIndex] = useState(0);

When the `activeIndex` is `0`, the first panel is active, and when it’s `1`, it’s the second one.

Clicking the “Show” button in either `Panel` needs to change the active index in `Accordion`. A `Panel` can’t set the `activeIndex` state directly because it’s defined inside the `Accordion`. The `Accordion` component needs to _explicitly allow_ the `Panel` component to change its state by [passing an event handler down as a prop](responding-to-events.html#passing-event-handlers-as-props):

    <>  <Panel    isActive=  >    ...  </Panel></>

The `<button>` inside the `Panel` will now use the `onShow` prop as its click event handler:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Accordion() {
  const \[activeIndex, setActiveIndex\] = useState(0);
  return (
    <\>
      <h2\>Almaty, Kazakhstan</h2\>
      <Panel
        title\="About"
        isActive\=
        onShow\=
      \>
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
      </Panel\>
      <Panel
        title\="Etymology"
        isActive\=
        onShow\=
      \>
        The name comes from <span lang\="kk-KZ"\>алма</span\>, the Kazakh word for "apple" and is often translated as "full of apples". In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang\="la"\>Malus sieversii</i\> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel\>
    </\>
  );
}

function Panel({
  title,
  children,
  isActive,
  onShow
}) {
  return (
    <section className\="panel"\>
      <h3\></h3\>
      {isActive ? (
        <p\></p\>
      ) : (
        <button onClick\=\>
          Show
        </button\>
      )}
    </section\>
  );
}

Show more

This completes lifting state up! Moving state into the common parent component allowed you to coordinate the two panels. Using the active index instead of two “is shown” flags ensured that only one panel is active at a given time. And passing down the event handler to the child allowed the child to change the parent’s state.

![Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Accordion contains an activeIndex value of zero which turns into isActive value of true passed to the first Panel, and isActive value of false passed to the second Panel.](../_next/sharing_state_parent.png)

![Diagram showing a tree of three components, one parent labeled Accordion and two children labeled Panel. Accordion contains an activeIndex value of zero which turns into isActive value of true passed to the first Panel, and isActive value of false passed to the second Panel.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_state_parent.png&w=1080&q=75)

Initially, `Accordion`’s `activeIndex` is `0`, so the first `Panel` receives `isActive = true`

![The same diagram as the previous, with the activeIndex value of the parent Accordion component highlighted indicating a click with the value changed to one. The flow to both of the children Panel components is also highlighted, and the isActive value passed to each child is set to the opposite: false for the first Panel and true for the second one.](../_next/sharing_state_parent_clicked.png)

![The same diagram as the previous, with the activeIndex value of the parent Accordion component highlighted indicating a click with the value changed to one. The flow to both of the children Panel components is also highlighted, and the isActive value passed to each child is set to the opposite: false for the first Panel and true for the second one.](../_next/sharing_state_parent_clicked.png)

When `Accordion`’s `activeIndex` state changes to `1`, the second `Panel` receives `isActive = true` instead

##### Deep Dive

#### Controlled and uncontrolled components[](#controlled-and-uncontrolled-components "Link for Controlled and uncontrolled components ")

Show Details

It is common to call a component with some local state “uncontrolled”. For example, the original `Panel` component with an `isActive` state variable is uncontrolled because its parent cannot influence whether the panel is active or not.

In contrast, you might say a component is “controlled” when the important information in it is driven by props rather than its own local state. This lets the parent component fully specify its behavior. The final `Panel` component with the `isActive` prop is controlled by the `Accordion` component.

Uncontrolled components are easier to use within their parents because they require less configuration. But they’re less flexible when you want to coordinate them together. Controlled components are maximally flexible, but they require the parent components to fully configure them with props.

In practice, “controlled” and “uncontrolled” aren’t strict technical terms—each component usually has some mix of both local state and props. However, this is a useful way to talk about how components are designed and what capabilities they offer.

When writing a component, consider which information in it should be controlled (via props), and which information should be uncontrolled (via state). But you can always change your mind and refactor later.

A single source of truth for each state[](#a-single-source-of-truth-for-each-state "Link for A single source of truth for each state ")
---------------------------------------------------------------------------------------------------------------------------------------

In a React application, many components will have their own state. Some state may “live” close to the leaf components (components at the bottom of the tree) like inputs. Other state may “live” closer to the top of the app. For example, even client-side routing libraries are usually implemented by storing the current route in the React state, and passing it down by props!

**For each unique piece of state, you will choose the component that “owns” it.** This principle is also known as having a [“single source of truth”.](https://en.wikipedia.org/wiki/Single_source_of_truth) It doesn’t mean that all state lives in one place—but that for _each_ piece of state, there is a _specific_ component that holds that piece of information. Instead of duplicating shared state between components, _lift it up_ to their common shared parent, and _pass it down_ to the children that need it.

Your app will change as you work on it. It is common that you will move state down or back up while you’re still figuring out where each piece of the state “lives”. This is all part of the process!

To see what this feels like in practice with a few more components, read [Thinking in React.](thinking-in-react.html)

Recap[](#recap "Link for Recap")
--------------------------------

*   When you want to coordinate two components, move their state to their common parent.
*   Then pass the information down through props from their common parent.
*   Finally, pass the event handlers down so that the children can change the parent’s state.
*   It’s useful to consider components as “controlled” (driven by props) or “uncontrolled” (driven by state).

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Synced inputs 2. Filtering a list

#### 

Challenge 1 of 2:

Synced inputs[](#synced-inputs "Link for this heading")

These two inputs are independent. Make them stay in sync: editing one input should update the other input with the same text, and vice versa.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function SyncedInputs() {
  return (
    <\>
      <Input label\="First input" />
      <Input label\="Second input" />
    </\>
  );
}

function Input() {
  const \[text, setText\] = useState('');

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <label\>
      
      
      <input
        value\=
        onChange\=
      />
    </label\>
  );
}

Show more

Show hint Show solution

Next Challenge

[PreviousChoosing the State Structure](choosing-the-state-structure.html)[NextPreserving and Resetting State](preserving-and-resetting-state.html)

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
*   [Lifting state up by example](#lifting-state-up-by-example)
*   [Step 1: Remove state from the child components](#step-1-remove-state-from-the-child-components)
*   [Step 2: Pass hardcoded data from the common parent](#step-2-pass-hardcoded-data-from-the-common-parent)
*   [Step 3: Add state to the common parent](#step-3-add-state-to-the-common-parent)
*   [A single source of truth for each state](#a-single-source-of-truth-for-each-state)
*   [Recap](#recap)
*   [Challenges](#challenges)

