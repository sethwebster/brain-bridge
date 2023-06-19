Passing Props to a Component – React

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

Passing Props to a Component[](#undefined "Link for this heading")
==================================================================

React components use _props_ to communicate with each other. Every parent component can pass some information to its child components by giving them props. Props might remind you of HTML attributes, but you can pass any JavaScript value through them, including objects, arrays, and functions.

### You will learn

*   How to pass props to a component
*   How to read props from a component
*   How to specify default values for props
*   How to pass some JSX to a component
*   How props change over time

Familiar props[](#familiar-props "Link for Familiar props ")
------------------------------------------------------------

Props are the information that you pass to a JSX tag. For example, `className`, `src`, `alt`, `width`, and `height` are some of the props you can pass to an `<img>`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Avatar() {
  return (
    <img
      className\="avatar"
      src\="https://i.imgur.com/1bX5QH6.jpg"
      alt\="Lin Lanying"
      width\=
      height\=
    />
  );
}

export default function Profile() {
  return (
    <Avatar />
  );
}

Show more

The props you can pass to an `<img>` tag are predefined (ReactDOM conforms to [the HTML standard](https://www.w3.org/TR/html52/semantics-embedded-content.html#the-img-element)). But you can pass any props to _your own_ components, such as `<Avatar>`, to customize them. Here’s how!

Passing props to a component[](#passing-props-to-a-component "Link for Passing props to a component ")
------------------------------------------------------------------------------------------------------

In this code, the `Profile` component isn’t passing any props to its child component, `Avatar`:

    export default function Profile() 

You can give `Avatar` some props in two steps.

### Step 1: Pass props to the child component[](#step-1-pass-props-to-the-child-component "Link for Step 1: Pass props to the child component ")

First, pass some props to `Avatar`. For example, let’s pass two props: `person` (an object), and `size` (a number):

    export default function Profile() 

### Note

If double curly braces after `person=` confuse you, recall [they’re merely an object](javascript-in-jsx-with-curly-braces.html#using-double-curlies-css-and-other-objects-in-jsx) inside the JSX curlies.

Now you can read these props inside the `Avatar` component.

### Step 2: Read props inside the child component[](#step-2-read-props-inside-the-child-component "Link for Step 2: Read props inside the child component ")

You can read these props by listing their names `person, size` separated by the commas inside `()` directly after `function Avatar`. This lets you use them inside the `Avatar` code, like you would with a variable.

    function Avatar(

Add some logic to `Avatar` that uses the `person` and `size` props for rendering, and you’re done.

Now you can configure `Avatar` to render in many different ways with different props. Try tweaking the values!

App.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './utils.js';

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

export default function Profile() {
  return (
    <div\>
      <Avatar
        size\=
        person\={{ 
          name: 'Katsuko Saruhashi', 
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size\=
        person\={{
          name: 'Aklilu Lemma', 
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size\=
        person\={{ 
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div\>
  );
}

Show more

Props let you think about parent and child components independently. For example, you can change the `person` or the `size` props inside `Profile` without having to think about how `Avatar` uses them. Similarly, you can change how the `Avatar` uses these props, without looking at the `Profile`.

You can think of props like “knobs” that you can adjust. They serve the same role as arguments serve for functions—in fact, props _are_ the only argument to your component! React component functions accept a single argument, a `props` object:

    function Avatar(props) 

Usually you don’t need the whole `props` object itself, so you destructure it into individual props.

### Pitfall

**Don’t miss the pair of `` curlies** inside of `(` and `)` when declaring props:

    function Avatar(

This syntax is called [“destructuring”](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_fields_from_objects_passed_as_a_function_parameter) and is equivalent to reading properties from a function parameter:

    function Avatar(props) 

Specifying a default value for a prop[](#specifying-a-default-value-for-a-prop "Link for Specifying a default value for a prop ")
---------------------------------------------------------------------------------------------------------------------------------

If you want to give a prop a default value to fall back on when no value is specified, you can do it with the destructuring by putting `=` and the default value right after the parameter:

    function Avatar(

Now, if `<Avatar person= />` is rendered with no `size` prop, the `size` will be set to `100`.

The default value is only used if the `size` prop is missing or if you pass `size=`, the default value will **not** be used.

Forwarding props with the JSX spread syntax[](#forwarding-props-with-the-jsx-spread-syntax "Link for Forwarding props with the JSX spread syntax ")
---------------------------------------------------------------------------------------------------------------------------------------------------

Sometimes, passing props gets very repetitive:

    function Profile(

There’s nothing wrong with repetitive code—it can be more legible. But at times you may value conciseness. Some components forward all of their props to their children, like how this `Profile` does with `Avatar`. Because they don’t use any of their props directly, it can make sense to use a more concise “spread” syntax:

    function Profile(props) 

This forwards all of `Profile`’s props to the `Avatar` without listing each of their names.

**Use spread syntax with restraint.** If you’re using it in every other component, something is wrong. Often, it indicates that you should split your components and pass children as JSX. More on that next!

Passing JSX as children[](#passing-jsx-as-children "Link for Passing JSX as children ")
---------------------------------------------------------------------------------------

It is common to nest built-in browser tags:

    <div>  <img /></div>

Sometimes you’ll want to nest your own components the same way:

    <Card>  <Avatar /></Card>

When you nest content inside a JSX tag, the parent component will receive that content in a prop called `children`. For example, the `Card` component below will receive a `children` prop set to `<Avatar />` and render it in a wrapper div:

App.jsAvatar.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Avatar from './Avatar.js';

function Card() {
  return (
    <div className\="card"\>
      
    </div\>
  );
}

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

Show more

Try replacing the `<Avatar>` inside `<Card>` with some text to see how the `Card` component can wrap any nested content. It doesn’t need to “know” what’s being rendered inside of it. You will see this flexible pattern in many places.

You can think of a component with a `children` prop as having a “hole” that can be “filled in” by its parent components with arbitrary JSX. You will often use the `children` prop for visual wrappers: panels, grids, etc.

![A puzzle-like Card tile with a slot for "children" pieces like text and Avatar](../images/docs/illustrations/i_children-prop.png)

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

How props change over time[](#how-props-change-over-time "Link for How props change over time ")
------------------------------------------------------------------------------------------------

The `Clock` component below receives two props from its parent component: `color` and `time`. (The parent component’s code is omitted because it uses [state](state-a-components-memory.html), which we won’t dive into just yet.)

Try changing the color in the select box below:

Clock.js

Clock.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function Clock() {
  return (
    <h1 style\=\>
      
    </h1\>
  );
}

This example illustrates that **a component may receive different props over time.** Props are not always static! Here, the `time` prop changes every second, and the `color` prop changes when you select another color. Props reflect a component’s data at any point in time, rather than only in the beginning.

However, props are [immutable](https://en.wikipedia.org/wiki/Immutable_object)—a term from computer science meaning “unchangeable”. When a component needs to change its props (for example, in response to a user interaction or new data), it will have to “ask” its parent component to pass it _different props_—a new object! Its old props will then be cast aside, and eventually the JavaScript engine will reclaim the memory taken by them.

**Don’t try to “change props”.** When you need to respond to the user input (like changing the selected color), you will need to “set state”, which you can learn about in [State: A Component’s Memory.](state-a-components-memory.html)

Recap[](#recap "Link for Recap")
--------------------------------

*   To pass props, add them to the JSX, just like you would with HTML attributes.
*   To read props, use the `function Avatar()` destructuring syntax.
*   You can specify a default value like `size = 100`, which is used for missing and `undefined` props.
*   You can forward all props with `<Avatar  />` JSX spread syntax, but don’t overuse it!
*   Nested JSX like `<Card><Avatar /></Card>` will appear as `Card` component’s `children` prop.
*   Props are read-only snapshots in time: every render receives a new version of props.
*   You can’t change props. When you need interactivity, you’ll need to set state.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Extract a component 2. Adjust the image size based on a prop 3. Passing JSX in a `children` prop

#### 

Challenge 1 of 3:

Extract a component[](#extract-a-component "Link for this heading")

This `Gallery` component contains some very similar markup for two profiles. Extract a `Profile` component out of it to reduce the duplication. You’ll need to choose what props to pass to it.

App.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './utils.js';

export default function Gallery() {
  return (
    <div\>
      <h1\>Notable Scientists</h1\>
      <section className\="profile"\>
        <h2\>Maria Skłodowska-Curie</h2\>
        <img
          className\="avatar"
          src\=
          alt\="Maria Skłodowska-Curie"
          width\=
          height\=
        />
        <ul\>
          <li\>
            <b\>Profession: </b\> 
            physicist and chemist
          </li\>
          <li\>
            <b\>Awards: 4 </b\> 
            (Nobel Prize in Physics, Nobel Prize in Chemistry, Davy Medal, Matteucci Medal)
          </li\>
          <li\>
            <b\>Discovered: </b\>
            polonium (element)
          </li\>
        </ul\>
      </section\>
      <section className\="profile"\>
        <h2\>Katsuko Saruhashi</h2\>
        <img
          className\="avatar"
          src\=
          alt\="Katsuko Saruhashi"
          width\=
          height\=
        />
        <ul\>
          <li\>
            <b\>Profession: </b\> 
            geochemist
          </li\>
          <li\>
            <b\>Awards: 2 </b\> 
            (Miyake Prize for geochemistry, Tanaka Prize)
          </li\>
          <li\>
            <b\>Discovered: </b\>
            a method for measuring carbon dioxide in seawater
          </li\>
        </ul\>
      </section\>
    </div\>
  );
}

Show more

Show hint Show solution

Next Challenge

[PreviousJavaScript in JSX with Curly Braces](javascript-in-jsx-with-curly-braces.html)[NextConditional Rendering](conditional-rendering.html)

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
*   [Familiar props](#familiar-props)
*   [Passing props to a component](#passing-props-to-a-component)
*   [Step 1: Pass props to the child component](#step-1-pass-props-to-the-child-component)
*   [Step 2: Read props inside the child component](#step-2-read-props-inside-the-child-component)
*   [Specifying a default value for a prop](#specifying-a-default-value-for-a-prop)
*   [Forwarding props with the JSX spread syntax](#forwarding-props-with-the-jsx-spread-syntax)
*   [Passing JSX as children](#passing-jsx-as-children)
*   [How props change over time](#how-props-change-over-time)
*   [Recap](#recap)
*   [Challenges](#challenges)

