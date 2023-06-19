Passing Data Deeply with Context – React

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

Passing Data Deeply with Context[](#undefined "Link for this heading")
======================================================================

Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. _Context_ lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

### You will learn

*   What “prop drilling” is
*   How to replace repetitive prop passing with context
*   Common use cases for context
*   Common alternatives to context

The problem with passing props[](#the-problem-with-passing-props "Link for The problem with passing props ")
------------------------------------------------------------------------------------------------------------

[Passing props](passing-props-to-a-component.html) is a great way to explicitly pipe data through your UI tree to the components that use it.

But passing props can become verbose and inconvenient when you need to pass some prop deeply through the tree, or if many components need the same prop. The nearest common ancestor could be far removed from the components that need data, and [lifting state up](sharing-state-between-components.html) that high can lead to a situation called “prop drilling”.

Lifting state up

![Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in purple. The value flows down to each of the two children, both highlighted in purple.](../_next/passing_data_lifting_state.png)

![Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in purple. The value flows down to each of the two children, both highlighted in purple.](../_next/passing_data_lifting_state.png)

Prop drilling

![Diagram with a tree of ten nodes, each node with two children or less. The root node contains a bubble representing a value highlighted in purple. The value flows down through the two children, each of which pass the value but do not contain it. The left child passes the value down to two children which are both highlighted purple. The right child of the root passes the value through to one of its two children - the right one, which is highlighted purple. That child passed the value through its single child, which passes it down to both of its two children, which are highlighted purple.](../_next/passing_data_prop_drilling.png)

![Diagram with a tree of ten nodes, each node with two children or less. The root node contains a bubble representing a value highlighted in purple. The value flows down through the two children, each of which pass the value but do not contain it. The left child passes the value down to two children which are both highlighted purple. The right child of the root passes the value through to one of its two children - the right one, which is highlighted purple. That child passed the value through its single child, which passes it down to both of its two children, which are highlighted purple.](../_next/passing_data_prop_drilling.png)

Wouldn’t it be great if there were a way to “teleport” data to the components in the tree that need it without passing props? With React’s context feature, there is!

Context: an alternative to passing props[](#context-an-alternative-to-passing-props "Link for Context: an alternative to passing props ")
-----------------------------------------------------------------------------------------------------------------------------------------

Context lets a parent component provide data to the entire tree below it. There are many uses for context. Here is one example. Consider this `Heading` component that accepts a `level` for its size:

App.jsSection.jsHeading.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section\>
      <Heading level\=\>Title</Heading\>
      <Heading level\=\>Heading</Heading\>
      <Heading level\=\>Sub-heading</Heading\>
      <Heading level\=\>Sub-sub-heading</Heading\>
      <Heading level\=\>Sub-sub-sub-heading</Heading\>
      <Heading level\=\>Sub-sub-sub-sub-heading</Heading\>
    </Section\>
  );
}

Let’s say you want multiple headings within the same `Section` to always have the same size:

App.jsSection.jsHeading.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section\>
      <Heading level\=\>Title</Heading\>
      <Section\>
        <Heading level\=\>Heading</Heading\>
        <Heading level\=\>Heading</Heading\>
        <Heading level\=\>Heading</Heading\>
        <Section\>
          <Heading level\=\>Sub-heading</Heading\>
          <Heading level\=\>Sub-heading</Heading\>
          <Heading level\=\>Sub-heading</Heading\>
          <Section\>
            <Heading level\=\>Sub-sub-heading</Heading\>
            <Heading level\=\>Sub-sub-heading</Heading\>
            <Heading level\=\>Sub-sub-heading</Heading\>
          </Section\>
        </Section\>
      </Section\>
    </Section\>
  );
}

Show more

Currently, you pass the `level` prop to each `<Heading>` separately:

    <Section>  <Heading level=>Videos</Heading></Section>

It would be nice if you could pass the `level` prop to the `<Section>` component instead and remove it from the `<Heading>`. This way you could enforce that all headings in the same section have the same size:

    <Section level=>  <Heading>About</Heading>  <Heading>Photos</Heading>  <Heading>Videos</Heading></Section>

But how can the `<Heading>` component know the level of its closest `<Section>`? **That would require some way for a child to “ask” for data from somewhere above in the tree.**

You can’t do it with props alone. This is where context comes into play. You will do it in three steps:

1.  **Create** a context. (You can call it `LevelContext`, since it’s for the heading level.)
2.  **Use** that context from the component that needs the data. (`Heading` will use `LevelContext`.)
3.  **Provide** that context from the component that specifies the data. (`Section` will provide `LevelContext`.)

Context lets a parent—even a distant one!—provide some data to the entire tree inside of it.

Using context in close children

![Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in orange which projects down to the two children, each highlighted in orange.](../_next/passing_data_context_close.png)

![Diagram with a tree of three components. The parent contains a bubble representing a value highlighted in orange which projects down to the two children, each highlighted in orange.](../_next/passing_data_context_close.png)

Using context in distant children

![Diagram with a tree of ten nodes, each node with two children or less. The root parent node contains a bubble representing a value highlighted in orange. The value projects down directly to four leaves and one intermediate component in the tree, which are all highlighted in orange. None of the other intermediate components are highlighted.](../_next/passing_data_context_far.png)

![Diagram with a tree of ten nodes, each node with two children or less. The root parent node contains a bubble representing a value highlighted in orange. The value projects down directly to four leaves and one intermediate component in the tree, which are all highlighted in orange. None of the other intermediate components are highlighted.](../_next/passing_data_context_far.png)

### Step 1: Create the context[](#step-1-create-the-context "Link for Step 1: Create the context ")

First, you need to create the context. You’ll need to **export it from a file** so that your components can use it:

App.jsSection.jsHeading.jsLevelContext.js

LevelContext.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export const LevelContext = createContext(1);

The only argument to `createContext` is the _default_ value. Here, `1` refers to the biggest heading level, but you could pass any kind of value (even an object). You will see the significance of the default value in the next step.

### Step 2: Use the context[](#step-2-use-the-context "Link for Step 2: Use the context ")

Import the `useContext` Hook from React and your context:

    import  from './LevelContext.js';

Currently, the `Heading` component reads `level` from props:

    export default function Heading(

Instead, remove the `level` prop and read the value from the context you just imported, `LevelContext`:

    export default function Heading(

`useContext` is a Hook. Just like `useState` and `useReducer`, you can only call a Hook immediately inside a React component (not inside loops or conditions). **`useContext` tells React that the `Heading` component wants to read the `LevelContext`.**

Now that the `Heading` component doesn’t have a `level` prop, you don’t need to pass the level prop to `Heading` in your JSX like this anymore:

    <Section>  <Heading level=>Sub-sub-heading</Heading></Section>

Update the JSX so that it’s the `Section` that receives it instead:

    <Section level=>  <Heading>Sub-sub-heading</Heading>  <Heading>Sub-sub-heading</Heading>  <Heading>Sub-sub-heading</Heading></Section>

As a reminder, this is the markup that you were trying to get working:

App.jsSection.jsHeading.jsLevelContext.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level\=\>
      <Heading\>Title</Heading\>
      <Section level\=\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Section level\=\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Section level\=\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
          </Section\>
        </Section\>
      </Section\>
    </Section\>
  );
}

Show more

Notice this example doesn’t quite work, yet! All the headings have the same size because **even though you’re _using_ the context, you have not _provided_ it yet.** React doesn’t know where to get it!

If you don’t provide the context, React will use the default value you’ve specified in the previous step. In this example, you specified `1` as the argument to `createContext`, so `useContext(LevelContext)` returns `1`, setting all those headings to `<h1>`. Let’s fix this problem by having each `Section` provide its own context.

### Step 3: Provide the context[](#step-3-provide-the-context "Link for Step 3: Provide the context ")

The `Section` component currently renders its children:

    export default function Section(

**Wrap them with a context provider** to provide the `LevelContext` to them:

    import 

This tells React: “if any component inside this `<Section>` asks for `LevelContext`, give them this `level`.” The component will use the value of the nearest `<LevelContext.Provider>` in the UI tree above it.

App.jsSection.jsHeading.jsLevelContext.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section level\=\>
      <Heading\>Title</Heading\>
      <Section level\=\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Section level\=\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Section level\=\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
          </Section\>
        </Section\>
      </Section\>
    </Section\>
  );
}

Show more

It’s the same result as the original code, but you did not need to pass the `level` prop to each `Heading` component! Instead, it “figures out” its heading level by asking the closest `Section` above:

1.  You pass a `level` prop to the `<Section>`.
2.  `Section` wraps its children into `<LevelContext.Provider value=>`.
3.  `Heading` asks the closest value of `LevelContext` above with `useContext(LevelContext)`.

Using and providing context from the same component[](#using-and-providing-context-from-the-same-component "Link for Using and providing context from the same component ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Currently, you still have to specify each section’s `level` manually:

    export default function Page() >          ...

Since context lets you read information from a component above, each `Section` could read the `level` from the `Section` above, and pass `level + 1` down automatically. Here is how you could do it:

    import 

With this change, you don’t need to pass the `level` prop _either_ to the `<Section>` or to the `<Heading>`:

App.jsSection.jsHeading.jsLevelContext.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function Page() {
  return (
    <Section\>
      <Heading\>Title</Heading\>
      <Section\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Heading\>Heading</Heading\>
        <Section\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Heading\>Sub-heading</Heading\>
          <Section\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
            <Heading\>Sub-sub-heading</Heading\>
          </Section\>
        </Section\>
      </Section\>
    </Section\>
  );
}

Show more

Now both `Heading` and `Section` read the `LevelContext` to figure out how “deep” they are. And the `Section` wraps its children into the `LevelContext` to specify that anything inside of it is at a “deeper” level.

### Note

This example uses heading levels because they show visually how nested components can override context. But context is useful for many other use cases too. You can pass down any information needed by the entire subtree: the current color theme, the currently logged in user, and so on.

Context passes through intermediate components[](#context-passes-through-intermediate-components "Link for Context passes through intermediate components ")
------------------------------------------------------------------------------------------------------------------------------------------------------------

You can insert as many components as you like between the component that provides context and the one that uses it. This includes both built-in components like `<div>` and components you might build yourself.

In this example, the same `Post` component (with a dashed border) is rendered at two different nesting levels. Notice that the `<Heading>` inside of it gets its level automatically from the closest `<Section>`:

App.jsSection.jsHeading.jsLevelContext.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Heading from './Heading.js';
import Section from './Section.js';

export default function ProfilePage() {
  return (
    <Section\>
      <Heading\>My Profile</Heading\>
      <Post
        title\="Hello traveller!"
        body\="Read about my adventures."
      />
      <AllPosts />
    </Section\>
  );
}

function AllPosts() {
  return (
    <Section\>
      <Heading\>Posts</Heading\>
      <RecentPosts />
    </Section\>
  );
}

function RecentPosts() {
  return (
    <Section\>
      <Heading\>Recent Posts</Heading\>
      <Post
        title\="Flavors of Lisbon"
        body\="...those pastéis de nata!"
      />
      <Post
        title\="Buenos Aires in the rhythm of tango"
        body\="I loved it!"
      />
    </Section\>
  );
}

function Post() {
  return (
    <Section isFancy\=\>
      <Heading\>
        
      </Heading\>
      <p\><i\></i\></p\>
    </Section\>
  );
}

Show more

You didn’t do anything special for this to work. A `Section` specifies the context for the tree inside it, so you can insert a `<Heading>` anywhere, and it will have the correct size. Try it in the sandbox above!

**Context lets you write components that “adapt to their surroundings” and display themselves differently depending on _where_ (or, in other words, _in which context_) they are being rendered.**

How context works might remind you of [CSS property inheritance.](https://developer.mozilla.org/en-US/docs/Web/CSS/inheritance) In CSS, you can specify `color: blue` for a `<div>`, and any DOM node inside of it, no matter how deep, will inherit that color unless some other DOM node in the middle overrides it with `color: green`. Similarly, in React, the only way to override some context coming from above is to wrap children into a context provider with a different value.

In CSS, different properties like `color` and `background-color` don’t override each other. You can set all `<div>`’s `color` to red without impacting `background-color`. Similarly, **different React contexts don’t override each other.** Each context that you make with `createContext()` is completely separate from other ones, and ties together components using and providing _that particular_ context. One component may use or provide many different contexts without a problem.

Before you use context[](#before-you-use-context "Link for Before you use context ")
------------------------------------------------------------------------------------

Context is very tempting to use! However, this also means it’s too easy to overuse it. **Just because you need to pass some props several levels deep doesn’t mean you should put that information into context.**

Here’s a few alternatives you should consider before using context:

1.  **Start by [passing props.](passing-props-to-a-component.html)** If your components are not trivial, it’s not unusual to pass a dozen props down through a dozen components. It may feel like a slog, but it makes it very clear which components use which data! The person maintaining your code will be glad you’ve made the data flow explicit with props.
2.  **Extract components and [pass JSX as `children`](passing-props-to-a-component.html#passing-jsx-as-children) to them.** If you pass some data through many layers of intermediate components that don’t use that data (and only pass it further down), this often means that you forgot to extract some components along the way. For example, maybe you pass data props like `posts` to visual components that don’t use them directly, like `<Layout posts= /></Layout>`. This reduces the number of layers between the component specifying the data and the one that needs it.

If neither of these approaches works well for you, consider context.

Use cases for context[](#use-cases-for-context "Link for Use cases for context ")
---------------------------------------------------------------------------------

*   **Theming:** If your app lets the user change its appearance (e.g. dark mode), you can put a context provider at the top of your app, and use that context in components that need to adjust their visual look.
*   **Current account:** Many components might need to know the currently logged in user. Putting it in context makes it convenient to read it anywhere in the tree. Some apps also let you operate multiple accounts at the same time (e.g. to leave a comment as a different user). In those cases, it can be convenient to wrap a part of the UI into a nested provider with a different current account value.
*   **Routing:** Most routing solutions use context internally to hold the current route. This is how every link “knows” whether it’s active or not. If you build your own router, you might want to do it too.
*   **Managing state:** As your app grows, you might end up with a lot of state closer to the top of your app. Many distant components below may want to change it. It is common to [use a reducer together with context](scaling-up-with-reducer-and-context.html) to manage complex state and pass it down to distant components without too much hassle.

Context is not limited to static values. If you pass a different value on the next render, React will update all the components reading it below! This is why context is often used in combination with state.

In general, if some information is needed by distant components in different parts of the tree, it’s a good indication that context will help you.

Recap[](#recap "Link for Recap")
--------------------------------

*   Context lets a component provide some information to the entire tree below it.
*   To pass context:
    1.  Create and export it with `export const MyContext = createContext(defaultValue)`.
    2.  Pass it to the `useContext(MyContext)` Hook to read it in any child component, no matter how deep.
    3.  Wrap children into `<MyContext.Provider value=>` to provide it from a parent.
*   Context passes through any components in the middle.
*   Context lets you write components that “adapt to their surroundings”.
*   Before you use context, try passing props or passing JSX as `children`.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

#### 

Challenge 1 of 1:

Replace prop drilling with context[](#replace-prop-drilling-with-context "Link for this heading")

In this example, toggling the checkbox changes the `imageSize` prop passed to each `<PlaceImage>`. The checkbox state is held in the top-level `App` component, but each `<PlaceImage>` needs to be aware of it.

Currently, `App` passes `imageSize` to `List`, which passes it to each `Place`, which passes it to the `PlaceImage`. Remove the `imageSize` prop, and instead pass it from the `App` component directly to `PlaceImage`.

You can declare context in `Context.js`.

App.jsContext.jsdata.jsutils.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './data.js';
import  from './utils.js';

export default function App() {
  const \[isLarge, setIsLarge\] = useState(false);
  const imageSize = isLarge ? 150 : 100;
  return (
    <\>
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setIsLarge(e.target.checked);
          }}
        />
        Use large images
      </label\>
      <hr />
      <List imageSize\= />
    </\>
  )
}

function List() {
  const listItems = places.map(place \=>
    <li key\=\>
      <Place
        place\=
        imageSize\=
      />
    </li\>
  );
  return <ul\></ul\>;
}

function Place() {
  return (
    <\>
      <PlaceImage
        place\=
        imageSize\=
      />
      <p\>
        <b\></b\>
        
      </p\>
    </\>
  );
}

function PlaceImage() {
  return (
    <img
      src\=
      alt\=
      width\=
      height\=
    />
  );
}

Show more

Show solution

[PreviousExtracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.html)[NextScaling Up with Reducer and Context](scaling-up-with-reducer-and-context.html)

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
*   [The problem with passing props](#the-problem-with-passing-props)
*   [Context: an alternative to passing props](#context-an-alternative-to-passing-props)
*   [Step 1: Create the context](#step-1-create-the-context)
*   [Step 2: Use the context](#step-2-use-the-context)
*   [Step 3: Provide the context](#step-3-provide-the-context)
*   [Using and providing context from the same component](#using-and-providing-context-from-the-same-component)
*   [Context passes through intermediate components](#context-passes-through-intermediate-components)
*   [Before you use context](#before-you-use-context)
*   [Use cases for context](#use-cases-for-context)
*   [Recap](#recap)
*   [Challenges](#challenges)

