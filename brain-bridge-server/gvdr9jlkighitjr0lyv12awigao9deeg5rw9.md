Adding Interactivity – React

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

Adding Interactivity[](#undefined "Link for this heading")
==========================================================

Some things on the screen update in response to user input. For example, clicking an image gallery switches the active image. In React, data that changes over time is called _state._ You can add state to any component, and update it as needed. In this chapter, you’ll learn how to write components that handle interactions, update their state, and display different output over time.

### In this chapter

*   [How to handle user-initiated events](responding-to-events.html)
*   [How to make components “remember” information with state](state-a-components-memory.html)
*   [How React updates the UI in two phases](render-and-commit.html)
*   [Why state doesn’t update right after you change it](state-as-a-snapshot.html)
*   [How to queue multiple state updates](queueing-a-series-of-state-updates.html)
*   [How to update an object in state](updating-objects-in-state.html)
*   [How to update an array in state](updating-arrays-in-state.html)

Responding to events[](#responding-to-events "Link for Responding to events ")
------------------------------------------------------------------------------

React lets you add _event handlers_ to your JSX. Event handlers are your own functions that will be triggered in response to user interactions like clicking, hovering, focusing on form inputs, and so on.

Built-in components like `<button>` only support built-in browser events like `onClick`. However, you can also create your own components, and give their event handler props any application-specific names that you like.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export default function App() {
  return (
    <Toolbar
      onPlayMovie\=
      onUploadImage\=
    />
  );
}

function Toolbar() {
  return (
    <div\>
      <Button onClick\=\>
        Play Movie
      </Button\>
      <Button onClick\=\>
        Upload Image
      </Button\>
    </div\>
  );
}

function Button() {
  return (
    <button onClick\=\>
      
    </button\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Responding to Events](responding-to-events.html)** to learn how to add event handlers.

[Read More](responding-to-events.html)

* * *

State: a component’s memory[](#state-a-components-memory "Link for State: a component’s memory ")
-------------------------------------------------------------------------------------------------

Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” puts a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called _state._

You can add state to a component with a [`useState`](../reference/react/useState.html) Hook. _Hooks_ are special functions that let your components use React features (state is one of those features). The `useState` Hook lets you declare a state variable. It takes the initial state and returns a pair of values: the current state, and a state setter function that lets you update it.

    const [index, setIndex] = useState(0);const [showMore, setShowMore] = useState(false);

Here is how an image gallery uses and updates state on click:

App.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './data.js';

export default function Gallery() {
  const \[index, setIndex\] = useState(0);
  const \[showMore, setShowMore\] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList\[index\];
  return (
    <\>
      <button onClick\=\>
        Next
      </button\>
      <h2\>
        <i\> </i\>
        by 
      </h2\>
      <h3\>
        ()
      </h3\>
      <button onClick\=\>
         details
      </button\>
      
      <img
        src\=
        alt\=
      />
    </\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[State: A Component’s Memory](state-a-components-memory.html)** to learn how to remember a value and update it on interaction.

[Read More](state-a-components-memory.html)

* * *

Render and commit[](#render-and-commit "Link for Render and commit ")
---------------------------------------------------------------------

Before your components are displayed on the screen, they must be rendered by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients. In this scenario, React is the waiter who puts in requests from customers and brings them their orders. This process of requesting and serving UI has three steps:

1.  **Triggering** a render (delivering the diner’s order to the kitchen)
2.  **Rendering** the component (preparing the order in the kitchen)
3.  **Committing** to the DOM (placing the order on the table)

1.  ![React as a server in a restaurant, fetching orders from the users and delivering them to the Component Kitchen.](../images/docs/illustrations/i_render-and-commit1.png)
    
    Trigger
    
2.  ![The Card Chef gives React a fresh Card component.](../images/docs/illustrations/i_render-and-commit2.png)
    
    Render
    
3.  ![React delivers the Card to the user at their table.](../images/docs/illustrations/i_render-and-commit3.png)
    
    Commit
    

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

Ready to learn this topic?
--------------------------

Read **[Render and Commit](render-and-commit.html)** to learn the lifecycle of a UI update.

[Read More](render-and-commit.html)

* * *

State as a snapshot[](#state-as-a-snapshot "Link for State as a snapshot ")
---------------------------------------------------------------------------

Unlike regular JavaScript variables, React state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render. This can be surprising at first!

    console.log(count);  // 0setCount(count + 1); // Request a re-render with 1console.log(count);  // Still 0!

This behavior help you avoid subtle bugs. Here is a little chat app. Try to guess what happens if you press “Send” first and _then_ change the recipient to Bob. Whose name will appear in the `alert` five seconds later?

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[to, setTo\] = useState('Alice');
  const \[message, setMessage\] = useState('Hello');

  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() \=> {
      alert(\`You said $\`);
    }, 5000);
  }

  return (
    <form onSubmit\=\>
      <label\>
        To:
        <select
          value\=
          onChange\=\>
          <option value\="Alice"\>Alice</option\>
          <option value\="Bob"\>Bob</option\>
        </select\>
      </label\>
      <textarea
        placeholder\="Message"
        value\=
        onChange\=
      />
      <button type\="submit"\>Send</button\>
    </form\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[State as a Snapshot](state-as-a-snapshot.html)** to learn why state appears “fixed” and unchanging inside the event handlers.

[Read More](state-as-a-snapshot.html)

* * *

Queueing a series of state updates[](#queueing-a-series-of-state-updates "Link for Queueing a series of state updates ")
------------------------------------------------------------------------------------------------------------------------

This component is buggy: clicking “+3” increments the score only once.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[score, setScore\] = useState(0);

  function increment() {
    setScore(score + 1);
  }

  return (
    <\>
      <button onClick\=\>+1</button\>
      <button onClick\={() \=> {
        increment();
        increment();
        increment();
      }}\>+3</button\>
      <h1\>Score: </h1\>
    </\>
  )
}

Show more

[State as a Snapshot](state-as-a-snapshot.html) explains why this is happening. Setting state requests a new re-render, but does not change it in the already running code. So `score` continues to be `0` right after you call `setScore(score + 1)`.

    console.log(score);  // 0setScore(score + 1); // setScore(0 + 1);console.log(score);  // 0setScore(score + 1); // setScore(0 + 1);console.log(score);  // 0setScore(score + 1); // setScore(0 + 1);console.log(score);  // 0

You can fix this by passing an _updater function_ when setting state. Notice how replacing `setScore(score + 1)` with `setScore(s => s + 1)` fixes the “+3” button. This lets you queue multiple state updates.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[score, setScore\] = useState(0);

  function increment() {
    setScore(s \=> s + 1);
  }

  return (
    <\>
      <button onClick\=\>+1</button\>
      <button onClick\={() \=> {
        increment();
        increment();
        increment();
      }}\>+3</button\>
      <h1\>Score: </h1\>
    </\>
  )
}

Show more

Ready to learn this topic?
--------------------------

Read **[Queueing a Series of State Updates](queueing-a-series-of-state-updates.html)** to learn how to queue a sequence of state updates.

[Read More](queueing-a-series-of-state-updates.html)

* * *

Updating objects in state[](#updating-objects-in-state "Link for Updating objects in state ")
---------------------------------------------------------------------------------------------

State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects and arrays that you hold in the React state directly. Instead, when you want to update an object and array, you need to create a new one (or make a copy of an existing one), and then update the state to use that copy.

Usually, you will use the `...` spread syntax to copy objects and arrays that you want to change. For example, updating a nested object could look like this:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[person, setPerson\] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  return (
    <\>
      <label\>
        Name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Title:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        City:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Image:
        <input
          value\=
          onChange\=
        />
      </label\>
      <p\>
        <i\></i\>
        
        
        <br />
        (located in )
      </p\>
      <img
        src\=
        alt\=
      />
    </\>
  );
}

Show more

If copying objects in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code:

App.jspackage.json

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'use-immer';

export default function Form() {
  const \[person, updatePerson\] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft \=> {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft \=> {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft \=> {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft \=> {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <\>
      <label\>
        Name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Title:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        City:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Image:
        <input
          value\=
          onChange\=
        />
      </label\>
      <p\>
        <i\></i\>
        
        
        <br />
        (located in )
      </p\>
      <img
        src\=
        alt\=
      />
    </\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Updating Objects in State](updating-objects-in-state.html)** to learn how to update objects correctly.

[Read More](updating-objects-in-state.html)

* * *

Updating arrays in state[](#updating-arrays-in-state "Link for Updating arrays in state ")
------------------------------------------------------------------------------------------

Arrays are another type of mutable JavaScript objects you can store in state and should treat as read-only. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let nextId = 3;
const initialList = \[
  ,
  ,
  ,
\];

export default function BucketList() {
  const \[list, setList\] = useState(
    initialList
  );

  function handleToggle(artworkId, nextSeen) {
    setList(list.map(artwork \=> {
      if (artwork.id === artworkId) {
        return ;
      } else {
        return artwork;
      }
    }));
  }

  return (
    <\>
      <h1\>Art Bucket List</h1\>
      <h2\>My list of art to see:</h2\>
      <ItemList
        artworks\=
        onToggle\= />
    </\>
  );
}

function ItemList() {
  return (
    <ul\>
      {artworks.map(artwork \=> (
        <li key\=\>
          <label\>
            <input
              type\="checkbox"
              checked\=
              onChange\={e \=> {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            
          </label\>
        </li\>
      ))}
    </ul\>
  );
}

Show more

If copying arrays in code gets tedious, you can use a library like [Immer](https://github.com/immerjs/use-immer) to reduce repetitive code:

App.jspackage.json

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from 'use-immer';

let nextId = 3;
const initialList = \[
  ,
  ,
  ,
\];

export default function BucketList() {
  const \[list, updateList\] = useImmer(initialList);

  function handleToggle(artworkId, nextSeen) {
    updateList(draft \=> {
      const artwork = draft.find(a \=>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <\>
      <h1\>Art Bucket List</h1\>
      <h2\>My list of art to see:</h2\>
      <ItemList
        artworks\=
        onToggle\= />
    </\>
  );
}

function ItemList() {
  return (
    <ul\>
      {artworks.map(artwork \=> (
        <li key\=\>
          <label\>
            <input
              type\="checkbox"
              checked\=
              onChange\={e \=> {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            
          </label\>
        </li\>
      ))}
    </ul\>
  );
}

Show more

Ready to learn this topic?
--------------------------

Read **[Updating Arrays in State](updating-arrays-in-state.html)** to learn how to update arrays correctly.

[Read More](updating-arrays-in-state.html)

* * *

What’s next?[](#whats-next "Link for What’s next? ")
----------------------------------------------------

Head over to [Responding to Events](responding-to-events.html) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Managing State](managing-state.html)?

[PreviousKeeping Components Pure](keeping-components-pure.html)[NextResponding to Events](responding-to-events.html)

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
*   [Responding to events](#responding-to-events)
*   [State: a component’s memory](#state-a-components-memory)
*   [Render and commit](#render-and-commit)
*   [State as a snapshot](#state-as-a-snapshot)
*   [Queueing a series of state updates](#queueing-a-series-of-state-updates)
*   [Updating objects in state](#updating-objects-in-state)
*   [Updating arrays in state](#updating-arrays-in-state)
*   [What’s next?](#whats-next)

