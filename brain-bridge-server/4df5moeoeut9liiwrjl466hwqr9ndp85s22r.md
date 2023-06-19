Preserving and Resetting State – React

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

Preserving and Resetting State[](#undefined "Link for this heading")
====================================================================

State is isolated between components. React keeps track of which state belongs to which component based on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.

### You will learn

*   How React “sees” component structures
*   When React chooses to preserve or reset the state
*   How to force React to reset component’s state
*   How keys and types affect whether the state is preserved

The UI tree[](#the-ui-tree "Link for The UI tree ")
---------------------------------------------------

Browsers use many tree structures to model UI. The [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction) represents HTML elements, the [CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model) does the same for CSS. There’s even an [Accessibility tree](https://developer.mozilla.org/docs/Glossary/Accessibility_tree)!

React also uses tree structures to manage and model the UI you make. React makes **UI trees** from your JSX. Then React DOM updates the browser DOM elements to match that UI tree. (React Native translates these trees into elements specific to mobile platforms.)

![Diagram with three sections arranged horizontally. In the first section, there are three rectangles stacked vertically, with labels 'Component A', 'Component B', and 'Component C'. Transitioning to the next pane is an arrow with the React logo on top labeled 'React'. The middle section contains a tree of components, with the root labeled 'A' and two children labeled 'B' and 'C'. The next section is again transitioned using an arrow with the React logo on top labeled 'React'. The third and final section is a wireframe of a browser, containing a tree of 8 nodes, which has only a subset highlighted (indicating the subtree from the middle section).](../_next/preserving_state_dom_tree.png)

![Diagram with three sections arranged horizontally. In the first section, there are three rectangles stacked vertically, with labels 'Component A', 'Component B', and 'Component C'. Transitioning to the next pane is an arrow with the React logo on top labeled 'React'. The middle section contains a tree of components, with the root labeled 'A' and two children labeled 'B' and 'C'. The next section is again transitioned using an arrow with the React logo on top labeled 'React'. The third and final section is a wireframe of a browser, containing a tree of 8 nodes, which has only a subset highlighted (indicating the subtree from the middle section).](../_next/preserving_state_dom_tree.png)

From components, React creates a UI tree which React DOM uses to render the DOM

State is tied to a position in the tree[](#state-is-tied-to-a-position-in-the-tree "Link for State is tied to a position in the tree ")
---------------------------------------------------------------------------------------------------------------------------------------

When you give a component state, you might think the state “lives” inside the component. But the state is actually held inside React. React associates each piece of state it’s holding with the correct component by where that component sits in the UI tree.

Here, there is only one `<Counter />` JSX tag, but it’s rendered at two different positions:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const counter = <Counter />;
  return (
    <div\>
      
      
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

Here’s how these look as a tree:

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. Each of the children are labeled 'Counter' and both contain a state bubble labeled 'count' with value 0.](../_next/preserving_state_tree.png)

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. Each of the children are labeled 'Counter' and both contain a state bubble labeled 'count' with value 0.](../_next/preserving_state_tree.png)

React tree

**These are two separate counters because each is rendered at its own position in the tree.** You don’t usually have to think about these positions to use React, but it can be useful to understand how it works.

In React, each component on the screen has fully isolated state. For example, if you render two `Counter` components side by side, each of them will get its own, independent, `score` and `hover` states.

Try clicking both counters and notice they don’t affect each other:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  return (
    <div\>
      <Counter />
      <Counter />
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

As you can see, when one counter is updated, only the state for that component is updated:

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 1. The state bubble of the right child is highlighted in yellow to indicate its value has updated.](../_next/preserving_state_increment.png)

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 1. The state bubble of the right child is highlighted in yellow to indicate its value has updated.](../_next/preserving_state_increment.png)

Updating state

React will keep the state around for as long as you render the same component at the same position. To see this, increment both counters, then remove the second component by unchecking “Render the second counter” checkbox, and then add it back by ticking it again:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[showB, setShowB\] = useState(true);
  return (
    <div\>
      <Counter />
       
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

Notice how the moment you stop rendering the second counter, its state disappears completely. That’s because when React removes a component, it destroys its state.

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is missing, and in its place is a yellow 'poof' image, highlighting the component being deleted from the tree.](../_next/preserving_state_remove_component.png)

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is missing, and in its place is a yellow 'poof' image, highlighting the component being deleted from the tree.](../_next/preserving_state_remove_component.png)

Deleting a component

When you tick “Render the second counter”, a second `Counter` and its state are initialized from scratch (`score = 0`) and added to the DOM.

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The entire right child node is highlighted in yellow, indicating that it was just added to the tree.](../_next/preserving_state_add_component.png)

![Diagram of a tree of React components. The root node is labeled 'div' and has two children. The left child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The entire right child node is highlighted in yellow, indicating that it was just added to the tree.](../_next/preserving_state_add_component.png)

Adding a component

**React preserves a component’s state for as long as it’s being rendered at its position in the UI tree.** If it gets removed, or a different component gets rendered at the same position, React discards its state.

Same component at the same position preserves state[](#same-component-at-the-same-position-preserves-state "Link for Same component at the same position preserves state ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

In this example, there are two different `<Counter />` tags:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[isFancy, setIsFancy\] = useState(false);
  return (
    <div\>
      {isFancy ? (
        <Counter isFancy\= /> 
      ) : (
        <Counter isFancy\= /> 
      )}
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

When you tick or clear the checkbox, the counter state does not get reset. Whether `isFancy` is `true` or `false`, you always have a `<Counter />` as the first child of the `div` returned from the root `App` component:

![Diagram with two sections separated by an arrow transitioning between them. Each section contains a layout of components with a parent labeled 'App' containing a state bubble labeled isFancy. This component has one child labeled 'div', which leads to a prop bubble containing isFancy (highlighted in purple) passed down to the only child. The last child is labeled 'Counter' and contains a state bubble with label 'count' and value 3 in both diagrams. In the left section of the diagram, nothing is highlighted and the isFancy parent state value is false. In the right section of the diagram, the isFancy parent state value has changed to true and it is highlighted in yellow, and so is the props bubble below, which has also changed its isFancy value to true.](../_next/preserving_state_same_component.png)

![Diagram with two sections separated by an arrow transitioning between them. Each section contains a layout of components with a parent labeled 'App' containing a state bubble labeled isFancy. This component has one child labeled 'div', which leads to a prop bubble containing isFancy (highlighted in purple) passed down to the only child. The last child is labeled 'Counter' and contains a state bubble with label 'count' and value 3 in both diagrams. In the left section of the diagram, nothing is highlighted and the isFancy parent state value is false. In the right section of the diagram, the isFancy parent state value has changed to true and it is highlighted in yellow, and so is the props bubble below, which has also changed its isFancy value to true.](../_next/preserving_state_same_component.png)

Updating the `App` state does not reset the `Counter` because `Counter` stays in the same position

It’s the same component at the same position, so from React’s perspective, it’s the same counter.

### Pitfall

Remember that **it’s the position in the UI tree—not in the JSX markup—that matters to React!** This component has two `return` clauses with different `<Counter />` JSX tags inside and outside the `if`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[isFancy, setIsFancy\] = useState(false);
  if (isFancy) {
    return (
      <div\>
        <Counter isFancy\= />
        <label\>
          <input
            type\="checkbox"
            checked\=
            onChange\={e \=> {
              setIsFancy(e.target.checked)
            }}
          />
          Use fancy styling
        </label\>
      </div\>
    );
  }
  return (
    <div\>
      <Counter isFancy\= />
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

You might expect the state to reset when you tick checkbox, but it doesn’t! This is because **both of these `<Counter />` tags are rendered at the same position.** React doesn’t know where you place the conditions in your function. All it “sees” is the tree you return.

In both cases, the `App` component returns a `<div>` with `<Counter />` as a first child. To React, these two counters have the same “address”: the first child of the first child of the root. This is how React matches them up between the previous and next renders, regardless of how you structure your logic.

Different components at the same position reset state[](#different-components-at-the-same-position-reset-state "Link for Different components at the same position reset state ")
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

In this example, ticking the checkbox will replace `<Counter>` with a `<p>`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[isPaused, setIsPaused\] = useState(false);
  return (
    <div\>
      {isPaused ? (
        <p\>See you later!</p\> 
      ) : (
        <Counter /> 
      )}
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setIsPaused(e.target.checked)
          }}
        />
        Take a break
      </label\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

Here, you switch between _different_ component types at the same position. Initially, the first child of the `<div>` contained a `Counter`. But when you swapped in a `p`, React removed the `Counter` from the UI tree and destroyed its state.

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'p', highlighted in yellow.](../_next/preserving_state_diff_pt1.png)

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'p', highlighted in yellow.](../_next/preserving_state_diff_pt1.png)

When `Counter` changes to `p`, the `Counter` is deleted and the `p` is added

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'p'. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, highlighted in yellow.](../_next/preserving_state_diff_pt2.png)

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'p'. The middle section has the same 'div' parent, but the child component has now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, highlighted in yellow.](../_next/preserving_state_diff_pt2.png)

When switching back, the `p` is deleted and the `Counter` is added

Also, **when you render a different component in the same position, it resets the state of its entire subtree.** To see how this works, increment the counter and then tick the checkbox:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[isFancy, setIsFancy\] = useState(false);
  return (
    <div\>
      {isFancy ? (
        <div\>
          <Counter isFancy\= /> 
        </div\>
      ) : (
        <section\>
          <Counter isFancy\= />
        </section\>
      )}
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\={e \=> {
            setIsFancy(e.target.checked)
          }}
        />
        Use fancy styling
      </label\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }
  if (isFancy) {
    className += ' fancy';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

The counter state gets reset when you click the checkbox. Although you render a `Counter`, the first child of the `div` changes from a `div` to a `section`. When the child `div` was removed from the DOM, the whole tree below it (including the `Counter` and its state) was destroyed as well.

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../_next/preserving_state_diff_same_pt1.png)

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../_next/preserving_state_diff_same_pt1.png)

When `section` changes to `div`, the `section` is deleted and the new `div` is added

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'div', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 0. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'section', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../_next/preserving_state_diff_same_pt2.png)

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'div', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 0. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'section', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../_next/preserving_state_diff_same_pt2.png)

When switching back, the `div` is deleted and the new `section` is added

As a rule of thumb, **if you want to preserve the state between re-renders, the structure of your tree needs to “match up”** from one render to another. If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree.

### Pitfall

This is why you should not nest component function definitions.

Here, the `MyTextField` component function is defined _inside_ `MyComponent`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function MyComponent() {
  const \[counter, setCounter\] = useState(0);

  function MyTextField() {
    const \[text, setText\] = useState('');

    return (
      <input
        value\=
        onChange\=
      />
    );
  }

  return (
    <\>
      <MyTextField />
      <button onClick\={() \=> {
        setCounter(counter + 1)
      }}\>Clicked  times</button\>
    </\>
  );
}

Show more

Every time you click the button, the input state disappears! This is because a _different_ `MyTextField` function is created for every render of `MyComponent`. You’re rendering a _different_ component in the same position, so React resets all state below. This leads to bugs and performance problems. To avoid this problem, **always declare component functions at the top level, and don’t nest their definitions.**

Resetting state at the same position[](#resetting-state-at-the-same-position "Link for Resetting state at the same position ")
------------------------------------------------------------------------------------------------------------------------------

By default, React preserves state of a component while it stays at the same position. Usually, this is exactly what you want, so it makes sense as the default behavior. But sometimes, you may want to reset a component’s state. Consider this app that lets two players keep track of their scores during each turn:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Scoreboard() {
  const \[isPlayerA, setIsPlayerA\] = useState(true);
  return (
    <div\>
      {isPlayerA ? (
        <Counter person\="Taylor" />
      ) : (
        <Counter person\="Sarah" />
      )}
      <button onClick\={() \=> {
        setIsPlayerA(!isPlayerA);
      }}\>
        Next player!
      </button\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

Currently, when you change the player, the score is preserved. The two `Counter`s appear in the same position, so React sees them as _the same_ `Counter` whose `person` prop has changed.

But conceptually, in this app they should be two separate counters. They might appear in the same place in the UI, but one is a counter for Taylor, and another is a counter for Sarah.

There are two ways to reset state when switching between them:

1.  Render components in different positions
2.  Give each component an explicit identity with `key`

### Option 1: Rendering a component in different positions[](#option-1-rendering-a-component-in-different-positions "Link for Option 1: Rendering a component in different positions ")

If you want these two `Counter`s to be independent, you can render them in two different positions:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Scoreboard() {
  const \[isPlayerA, setIsPlayerA\] = useState(true);
  return (
    <div\>
      {isPlayerA &&
        <Counter person\="Taylor" />
      }
      {!isPlayerA &&
        <Counter person\="Sarah" />
      }
      <button onClick\={() \=> {
        setIsPlayerA(!isPlayerA);
      }}\>
        Next player!
      </button\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

*   Initially, `isPlayerA` is `true`. So the first position contains `Counter` state, and the second one is empty.
*   When you click the “Next player” button the first position clears but the second one now contains a `Counter`.

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The only child, arranged to the left, is labeled Counter with a state bubble labeled 'count' and value 0. All of the left child is highlighted in yellow, indicating it was added.](../_next/preserving_state_diff_position_p1.png)

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The only child, arranged to the left, is labeled Counter with a state bubble labeled 'count' and value 0. All of the left child is highlighted in yellow, indicating it was added.](../_next/preserving_state_diff_position_p1.png)

Initial state

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'false'. The state bubble is highlighted in yellow, indicating that it has changed. The left child is replaced with a yellow 'poof' image indicating that it has been deleted and there is a new child on the right, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0.](../_next/preserving_state_diff_position_p2.png)

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'false'. The state bubble is highlighted in yellow, indicating that it has changed. The left child is replaced with a yellow 'poof' image indicating that it has been deleted and there is a new child on the right, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0.](../_next/preserving_state_diff_position_p2.png)

Clicking “next”

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The state bubble is highlighted in yellow, indicating that it has changed. There is a new child on the left, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is replaced with a yellow 'poof' image indicating that it has been deleted.](../_next/preserving_state_diff_position_p3.png)

![Diagram with a tree of React components. The parent is labeled 'Scoreboard' with a state bubble labeled isPlayerA with value 'true'. The state bubble is highlighted in yellow, indicating that it has changed. There is a new child on the left, highlighted in yellow indicating that it was added. The new child is labeled 'Counter' and contains a state bubble labeled 'count' with value 0. The right child is replaced with a yellow 'poof' image indicating that it has been deleted.](../_next/preserving_state_diff_position_p3.png)

Clicking “next” again

Each `Counter`’s state gets destroyed each time its removed from the DOM. This is why they reset every time you click the button.

This solution is convenient when you only have a few independent components rendered in the same place. In this example, you only have two, so it’s not a hassle to render both separately in the JSX.

### Option 2: Resetting state with a key[](#option-2-resetting-state-with-a-key "Link for Option 2: Resetting state with a key ")

There is also another, more generic, way to reset a component’s state.

You might have seen `key`s when [rendering lists.](rendering-lists.html#keeping-list-items-in-order-with-key) Keys aren’t just for lists! You can use keys to make React distinguish between any components. By default, React uses order within the parent (“first counter”, “second counter”) to discern between components. But keys let you tell React that this is not just a _first_ counter, or a _second_ counter, but a specific counter—for example, _Taylor’s_ counter. This way, React will know _Taylor’s_ counter wherever it appears in the tree!

In this example, the two `<Counter />`s don’t share state even though they appear in the same place in JSX:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Scoreboard() {
  const \[isPlayerA, setIsPlayerA\] = useState(true);
  return (
    <div\>
      {isPlayerA ? (
        <Counter key\="Taylor" person\="Taylor" />
      ) : (
        <Counter key\="Sarah" person\="Sarah" />
      )}
      <button onClick\={() \=> {
        setIsPlayerA(!isPlayerA);
      }}\>
        Next player!
      </button\>
    </div\>
  );
}

function Counter() {
  const \[score, setScore\] = useState(0);
  const \[hover, setHover\] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className\=
      onPointerEnter\=
      onPointerLeave\=
    \>
      <h1\></h1\>
      <button onClick\=\>
        Add one
      </button\>
    </div\>
  );
}

Show more

Switching between Taylor and Sarah does not preserve the state. This is because **you gave them different `key`s:**

    

Specifying a `key` tells React to use the `key` itself as part of the position, instead of their order within the parent. This is why, even though you render them in the same place in JSX, React sees them as two different counters, and so they will never share state. Every time a counter appears on the screen, its state is created. Every time it is removed, its state is destroyed. Toggling between them resets their state over and over.

### Note

Remember that keys are not globally unique. They only specify the position _within the parent_.

### Resetting a form with a key[](#resetting-a-form-with-a-key "Link for Resetting a form with a key ")

Resetting state with a key is particularly useful when dealing with forms.

In this chat app, the `<Chat>` component contains the text input state:

App.jsContactList.jsChat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const \[to, setTo\] = useState(contacts\[0\]);
  return (
    <div\>
      <ContactList
        contacts\=
        selectedContact\=
        onSelect\=
      />
      <Chat contact\= />
    </div\>
  )
}

const contacts = \[
  ,
  ,
  
\];

Show more

Try entering something into the input, and then press “Alice” or “Bob” to choose a different recipient. You will notice that the input state is preserved because the `<Chat>` is rendered at the same position in the tree.

**In many apps, this may be the desired behavior, but not in a chat app!** You don’t want to let the user send a message they already typed to a wrong person due to an accidental click. To fix it, add a `key`:

    <Chat key= />

This ensures that when you select a different recipient, the `Chat` component will be recreated from scratch, including any state in the tree below it. React will also re-create the DOM elements instead of reusing them.

Now switching the recipient always clears the text field:

App.jsContactList.jsChat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import Chat from './Chat.js';
import ContactList from './ContactList.js';

export default function Messenger() {
  const \[to, setTo\] = useState(contacts\[0\]);
  return (
    <div\>
      <ContactList
        contacts\=
        selectedContact\=
        onSelect\=
      />
      <Chat key\= />
    </div\>
  )
}

const contacts = \[
  ,
  ,
  
\];

Show more

##### Deep Dive

#### Preserving state for removed components[](#preserving-state-for-removed-components "Link for Preserving state for removed components ")

Show Details

In a real chat app, you’d probably want to recover the input state when the user selects the previous recipient again. There are a few ways to keep the state “alive” for a component that’s no longer visible:

*   You could render _all_ chats instead of just the current one, but hide all the others with CSS. The chats would not get removed from the tree, so their local state would be preserved. This solution works great for simple UIs. But it can get very slow if the hidden trees are large and contain a lot of DOM nodes.
*   You could [lift the state up](sharing-state-between-components.html) and hold the pending message for each recipient in the parent component. This way, when the child components get removed, it doesn’t matter, because it’s the parent that keeps the important information. This is the most common solution.
*   You might also use a different source in addition to React state. For example, you probably want a message draft to persist even if the user accidentally closes the page. To implement this, you could have the `Chat` component initialize its state by reading from the [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), and save the drafts there too.

No matter which strategy you pick, a chat _with Alice_ is conceptually distinct from a chat _with Bob_, so it makes sense to give a `key` to the `<Chat>` tree based on the current recipient.

Recap[](#recap "Link for Recap")
--------------------------------

*   React keeps state for as long as the same component is rendered at the same position.
*   State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
*   You can force a subtree to reset its state by giving it a different key.
*   Don’t nest component definitions, or you’ll reset state by accident.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix disappearing input text 2. Swap two form fields 3. Reset a detail form 4. Clear an image while it’s loading 5. Fix misplaced state in the list

#### 

Challenge 1 of 5:

Fix disappearing input text[](#fix-disappearing-input-text "Link for this heading")

This example shows a message when you press the button. However, pressing the button also accidentally resets the input. Why does this happen? Fix it so that pressing the button does not reset the input text.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function App() {
  const \[showHint, setShowHint\] = useState(false);
  if (showHint) {
    return (
      <div\>
        <p\><i\>Hint: Your favorite city?</i\></p\>
        <Form />
        <button onClick\={() \=> {
          setShowHint(false);
        }}\>Hide hint</button\>
      </div\>
    );
  }
  return (
    <div\>
      <Form />
      <button onClick\={() \=> {
        setShowHint(true);
      }}\>Show hint</button\>
    </div\>
  );
}

function Form() {
  const \[text, setText\] = useState('');
  return (
    <textarea
      value\=
      onChange\=
    />
  );
}

Show more

Show solutionNext Challenge

[PreviousSharing State Between Components](sharing-state-between-components.html)[NextExtracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.html)

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
*   [The UI tree](#the-ui-tree)
*   [State is tied to a position in the tree](#state-is-tied-to-a-position-in-the-tree)
*   [Same component at the same position preserves state](#same-component-at-the-same-position-preserves-state)
*   [Different components at the same position reset state](#different-components-at-the-same-position-reset-state)
*   [Resetting state at the same position](#resetting-state-at-the-same-position)
*   [Option 1: Rendering a component in different positions](#option-1-rendering-a-component-in-different-positions)
*   [Option 2: Resetting state with a key](#option-2-resetting-state-with-a-key)
*   [Resetting a form with a key](#resetting-a-form-with-a-key)
*   [Recap](#recap)
*   [Challenges](#challenges)

