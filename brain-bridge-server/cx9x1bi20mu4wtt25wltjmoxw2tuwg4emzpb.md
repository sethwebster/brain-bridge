Updating Objects in State – React

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

Updating Objects in State[](#undefined "Link for this heading")
===============================================================

State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to create a new one (or make a copy of an existing one), and then set the state to use that copy.

### You will learn

*   How to correctly update an object in React state
*   How to update a nested object without mutating it
*   What immutability is, and how not to break it
*   How to make object copying less repetitive with Immer

What’s a mutation?[](#whats-a-mutation "Link for What’s a mutation? ")
----------------------------------------------------------------------

You can store any kind of JavaScript value in state.

    const [x, setX] = useState(0);

So far you’ve been working with numbers, strings, and booleans. These kinds of JavaScript values are “immutable”, meaning unchangeable or “read-only”. You can trigger a re-render to _replace_ a value:

    setX(5);

The `x` state changed from `0` to `5`, but the _number `0` itself_ did not change. It’s not possible to make any changes to the built-in primitive values like numbers, strings, and booleans in JavaScript.

Now consider an object in state:

    const [position, setPosition] = useState();

Technically, it is possible to change the contents of _the object itself_. **This is called a mutation:**

    position.x = 5;

However, although objects in React state are technically mutable, you should treat them **as if** they were immutable—like numbers, booleans, and strings. Instead of mutating them, you should always replace them.

Treat state as read-only[](#treat-state-as-read-only "Link for Treat state as read-only ")
------------------------------------------------------------------------------------------

In other words, you should **treat any JavaScript object that you put into state as read-only.**

This example holds an object in state to represent the current pointer position. The red dot is supposed to move when you touch or move the cursor over the preview area. But the dot stays in the initial position:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
export default function MovingDot() {
  const \[position, setPosition\] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove\={e \=> {
        position.x = e.clientX;
        position.y = e.clientY;
      }}
      style\={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}\>
      <div style\={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: \`translate($px)\`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div\>
  );
}

Show more

The problem is with this bit of code.

    onPointerMove=

This code modifies the object assigned to `position` from [the previous render.](state-as-a-snapshot.html#rendering-takes-a-snapshot-in-time) But without using the state setting function, React has no idea that object has changed. So React does not do anything in response. It’s like trying to change the order after you’ve already eaten the meal. While mutating state can work in some cases, we don’t recommend it. You should treat the state value you have access to in a render as read-only.

To actually [trigger a re-render](state-as-a-snapshot.html#setting-state-triggers-renders) in this case, **create a _new_ object and pass it to the state setting function:**

    onPointerMove=

With `setPosition`, you’re telling React:

*   Replace `position` with this new object
*   And render this component again

Notice how the red dot now follows your pointer when you touch or hover over the preview area:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
export default function MovingDot() {
  const \[position, setPosition\] = useState({
    x: 0,
    y: 0
  });
  return (
    <div
      onPointerMove\={e \=> {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}
      style\={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}\>
      <div style\={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: \`translate($px)\`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div\>
  );
}

Show more

##### Deep Dive

#### Local mutation is fine[](#local-mutation-is-fine "Link for Local mutation is fine ")

Show Details

Code like this is a problem because it modifies an _existing_ object in state:

    position.x = e.clientX;position.y = e.clientY;

But code like this is **absolutely fine** because you’re mutating a fresh object you have _just created_:

    const nextPosition = ;nextPosition.x = e.clientX;nextPosition.y = e.clientY;setPosition(nextPosition);

In fact, it is completely equivalent to writing this:

    setPosition();

Mutation is only a problem when you change _existing_ objects that are already in state. Mutating an object you’ve just created is okay because _no other code references it yet._ Changing it isn’t going to accidentally impact something that depends on it. This is called a “local mutation”. You can even do local mutation [while rendering.](keeping-components-pure.html#local-mutation-your-components-little-secret) Very convenient and completely okay!

Copying objects with the spread syntax[](#copying-objects-with-the-spread-syntax "Link for Copying objects with the spread syntax ")
------------------------------------------------------------------------------------------------------------------------------------

In the previous example, the `position` object is always created fresh from the current cursor position. But often, you will want to include _existing_ data as a part of the new object you’re creating. For example, you may want to update _only one_ field in a form, but keep the previous values for all other fields.

These input fields don’t work because the `onChange` handlers mutate the state:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[person, setPerson\] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    person.firstName = e.target.value;
  }

  function handleLastNameChange(e) {
    person.lastName = e.target.value;
  }

  function handleEmailChange(e) {
    person.email = e.target.value;
  }

  return (
    <\>
      <label\>
        First name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Last name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Email:
        <input
          value\=
          onChange\=
        />
      </label\>
      <p\>
        
        
        ()
      </p\>
    </\>
  );
}

Show more

For example, this line mutates the state from a past render:

    person.firstName = e.target.value;

The reliable way to get the behavior you’re looking for is to create a new object and pass it to `setPerson`. But here, you want to also **copy the existing data into it** because only one of the fields has changed:

    setPerson();

You can use the `...` [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals) syntax so that you don’t need to copy every property separately.

    setPerson();

Now the form works!

Notice how you didn’t declare a separate state variable for each input field. For large forms, keeping all data grouped in an object is very convenient—as long as you update it correctly!

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[person, setPerson\] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleFirstNameChange(e) {
    setPerson({
      ...person,
      firstName: e.target.value
    });
  }

  function handleLastNameChange(e) {
    setPerson({
      ...person,
      lastName: e.target.value
    });
  }

  function handleEmailChange(e) {
    setPerson({
      ...person,
      email: e.target.value
    });
  }

  return (
    <\>
      <label\>
        First name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Last name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Email:
        <input
          value\=
          onChange\=
        />
      </label\>
      <p\>
        
        
        ()
      </p\>
    </\>
  );
}

Show more

Note that the `...` spread syntax is “shallow”—it only copies things one level deep. This makes it fast, but it also means that if you want to update a nested property, you’ll have to use it more than once.

##### Deep Dive

#### Using a single event handler for multiple fields[](#using-a-single-event-handler-for-multiple-fields "Link for Using a single event handler for multiple fields ")

Show Details

You can also use the `[` and `]` braces inside your object definition to specify a property with dynamic name. Here is the same example, but with a single event handler instead of three different ones:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[person, setPerson\] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com'
  });

  function handleChange(e) {
    setPerson({
      ...person,
      \[e.target.name\]: e.target.value
    });
  }

  return (
    <\>
      <label\>
        First name:
        <input
          name\="firstName"
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Last name:
        <input
          name\="lastName"
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Email:
        <input
          name\="email"
          value\=
          onChange\=
        />
      </label\>
      <p\>
        
        
        ()
      </p\>
    </\>
  );
}

Show more

Here, `e.target.name` refers to the `name` property given to the `<input>` DOM element.

Updating a nested object[](#updating-a-nested-object "Link for Updating a nested object ")
------------------------------------------------------------------------------------------

Consider a nested object structure like this:

    const [person, setPerson] = useState();

If you wanted to update `person.artwork.city`, it’s clear how to do it with mutation:

    person.artwork.city = 'New Delhi';

But in React, you treat state as immutable! In order to change `city`, you would first need to produce the new `artwork` object (pre-populated with data from the previous one), and then produce the new `person` object which points at the new `artwork`:

    const nextArtwork = ;setPerson(nextPerson);

Or, written as a single function call:

    setPerson();

This gets a bit wordy, but it works fine for many cases:

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

##### Deep Dive

#### Objects are not really nested[](#objects-are-not-really-nested "Link for Objects are not really nested ")

Show Details

An object like this appears “nested” in code:

    let obj = ;

However, “nesting” is an inaccurate way to think about how objects behave. When the code executes, there is no such thing as a “nested” object. You are really looking at two different objects:

    let obj1 = ;

The `obj1` object is not “inside” `obj2`. For example, `obj3` could “point” at `obj1` too:

    let obj1 = ;

If you were to mutate `obj3.artwork.city`, it would affect both `obj2.artwork.city` and `obj1.city`. This is because `obj3.artwork`, `obj2.artwork`, and `obj1` are the same object. This is difficult to see when you think of objects as “nested”. Instead, they are separate objects “pointing” at each other with properties.

### Write concise update logic with Immer[](#write-concise-update-logic-with-immer "Link for Write concise update logic with Immer ")

If your state is deeply nested, you might want to consider [flattening it.](choosing-the-state-structure.html#avoid-deeply-nested-state) But, if you don’t want to change your state structure, you might prefer a shortcut to nested spreads. [Immer](https://github.com/immerjs/use-immer) is a popular library that lets you write using the convenient but mutating syntax and takes care of producing the copies for you. With Immer, the code you write looks like you are “breaking the rules” and mutating an object:

    updatePerson(draft => );

But unlike a regular mutation, it doesn’t overwrite the past state!

##### Deep Dive

#### How does Immer work?[](#how-does-immer-work "Link for How does Immer work? ")

Show Details

The `draft` provided by Immer is a special type of object, called a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), that “records” what you do with it. This is why you can mutate it freely as much as you like! Under the hood, Immer figures out which parts of the `draft` have been changed, and produces a completely new object that contains your edits.

To try Immer:

1.  Run `npm install use-immer` to add Immer as a dependency
2.  Then replace `import  from 'use-immer'`

Here is the above example converted to Immer:

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

Notice how much more concise the event handlers have become. You can mix and match `useState` and `useImmer` in a single component as much as you like. Immer is a great way to keep the update handlers concise, especially if there’s nesting in your state, and copying objects leads to repetitive code.

##### Deep Dive

#### Why is mutating state not recommended in React?[](#why-is-mutating-state-not-recommended-in-react "Link for Why is mutating state not recommended in React? ")

Show Details

There are a few reasons:

*   **Debugging:** If you use `console.log` and don’t mutate state, your past logs won’t get clobbered by the more recent state changes. So you can clearly see how state has changed between renders.
*   **Optimizations:** Common React [optimization strategies](../reference/react/memo.html) rely on skipping work if previous props or state are the same as the next ones. If you never mutate state, it is very fast to check whether there were any changes. If `prevObj === obj`, you can be sure that nothing could have changed inside of it.
*   **New Features:** The new React features we’re building rely on state being [treated like a snapshot.](state-as-a-snapshot.html) If you’re mutating past versions of state, that may prevent you from using the new features.
*   **Requirement Changes:** Some application features, like implementing Undo/Redo, showing a history of changes, or letting the user reset a form to earlier values, are easier to do when nothing is mutated. This is because you can keep past copies of state in memory, and reuse them when appropriate. If you start with a mutative approach, features like this can be difficult to add later on.
*   **Simpler Implementation:** Because React does not rely on mutation, it does not need to do anything special with your objects. It does not need to hijack their properties, always wrap them into Proxies, or do other work at initialization as many “reactive” solutions do. This is also why React lets you put any object into state—no matter how large—without additional performance or correctness pitfalls.

In practice, you can often “get away” with mutating state in React, but we strongly advise you not to do that so that you can use new React features developed with this approach in mind. Future contributors and perhaps even your future self will thank you!

Recap[](#recap "Link for Recap")
--------------------------------

*   Treat all state in React as immutable.
*   When you store objects in state, mutating them will not trigger renders and will change the state in previous render “snapshots”.
*   Instead of mutating an object, create a _new_ version of it, and trigger a re-render by setting state to it.
*   You can use the `` object spread syntax to create copies of objects.
*   Spread syntax is shallow: it only copies one level deep.
*   To update a nested object, you need to create copies all the way up from the place you’re updating.
*   To reduce repetitive copying code, use Immer.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix incorrect state updates 2. Find and fix the mutation 3. Update an object with Immer

#### 

Challenge 1 of 3:

Fix incorrect state updates[](#fix-incorrect-state-updates "Link for this heading")

This form has a few bugs. Click the button that increases the score a few times. Notice that it does not increase. Then edit the first name, and notice that the score has suddenly “caught up” with your changes. Finally, edit the last name, and notice that the score has disappeared completely.

Your task is to fix all of these bugs. As you fix them, explain why each of them happens.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Scoreboard() {
  const \[player, setPlayer\] = useState({
    firstName: 'Ranjani',
    lastName: 'Shettar',
    score: 10,
  });

  function handlePlusClick() {
    player.score++;
  }

  function handleFirstNameChange(e) {
    setPlayer({
      ...player,
      firstName: e.target.value,
    });
  }

  function handleLastNameChange(e) {
    setPlayer({
      lastName: e.target.value
    });
  }

  return (
    <\>
      <label\>
        Score: <b\></b\>
        
        <button onClick\=\>
          +1
        </button\>
      </label\>
      <label\>
        First name:
        <input
          value\=
          onChange\=
        />
      </label\>
      <label\>
        Last name:
        <input
          value\=
          onChange\=
        />
      </label\>
    </\>
  );
}

Show more

Show solutionNext Challenge

[PreviousQueueing a Series of State Updates](queueing-a-series-of-state-updates.html)[NextUpdating Arrays in State](updating-arrays-in-state.html)

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
*   [What’s a mutation?](#whats-a-mutation)
*   [Treat state as read-only](#treat-state-as-read-only)
*   [Copying objects with the spread syntax](#copying-objects-with-the-spread-syntax)
*   [Updating a nested object](#updating-a-nested-object)
*   [Write concise update logic with Immer](#write-concise-update-logic-with-immer)
*   [Recap](#recap)
*   [Challenges](#challenges)

