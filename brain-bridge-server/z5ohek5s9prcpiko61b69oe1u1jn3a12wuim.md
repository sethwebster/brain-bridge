Choosing the State Structure – React

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

Choosing the State Structure[](#undefined "Link for this heading")
==================================================================

Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. Here are some tips you should consider when structuring state.

### You will learn

*   When to use a single vs multiple state variables
*   What to avoid when organizing state
*   How to fix common issues with the state structure

Principles for structuring state[](#principles-for-structuring-state "Link for Principles for structuring state ")
------------------------------------------------------------------------------------------------------------------

When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:

1.  **Group related state.** If you always update two or more state variables at the same time, consider merging them into a single state variable.
2.  **Avoid contradictions in state.** When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this.
3.  **Avoid redundant state.** If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state.
4.  **Avoid duplication in state.** When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.
5.  **Avoid deeply nested state.** Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way.

The goal behind these principles is to _make state easy to update without introducing mistakes_. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync. This is similar to how a database engineer might want to [“normalize” the database structure](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description) to reduce the chance of bugs. To paraphrase Albert Einstein, **“Make your state as simple as it can be—but no simpler.”**

Now let’s see how these principles apply in action.

Group related state[](#group-related-state "Link for Group related state ")
---------------------------------------------------------------------------

You might sometimes be unsure between using a single or multiple state variables.

Should you do this?

    const [x, setX] = useState(0);const [y, setY] = useState(0);

Or this?

    const [position, setPosition] = useState();

Technically, you can use either of these approaches. But **if some two state variables always change together, it might be a good idea to unify them into a single state variable.** Then you won’t forget to always keep them in sync, like in this example where moving the cursor updates both coordinates of the red dot:

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
  )
}

Show more

Another case where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need. For example, it’s helpful when you have a form where the user can add custom fields.

### Pitfall

If your state variable is an object, remember that [you can’t update only one field in it](updating-objects-in-state.html) without explicitly copying the other fields. For example, you can’t do `setPosition()`, or split them into two state variables and do `setX(100)`.

Avoid contradictions in state[](#avoid-contradictions-in-state "Link for Avoid contradictions in state ")
---------------------------------------------------------------------------------------------------------

Here is a hotel feedback form with `isSending` and `isSent` state variables:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function FeedbackForm() {
  const \[text, setText\] = useState('');
  const \[isSending, setIsSending\] = useState(false);
  const \[isSent, setIsSent\] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSending(true);
    await sendMessage(text);
    setIsSending(false);
    setIsSent(true);
  }

  if (isSent) {
    return <h1\>Thanks for feedback!</h1\>
  }

  return (
    <form onSubmit\=\>
      <p\>How was your stay at The Prancing Pony?</p\>
      <textarea
        disabled\=
        value\=
        onChange\=
      />
      <br />
      <button
        disabled\=
        type\="submit"
      \>
        Send
      </button\>
      
    </form\>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve \=> {
    setTimeout(resolve, 2000);
  });
}

Show more

While this code works, it leaves the door open for “impossible” states. For example, if you forget to call `setIsSent` and `setIsSending` together, you may end up in a situation where both `isSending` and `isSent` are `true` at the same time. The more complex your component is, the harder it is to understand what happened.

**Since `isSending` and `isSent` should never be `true` at the same time, it is better to replace them with one `status` state variable that may take one of _three_ valid states:** `'typing'` (initial), `'sending'`, and `'sent'`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function FeedbackForm() {
  const \[text, setText\] = useState('');
  const \[status, setStatus\] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    await sendMessage(text);
    setStatus('sent');
  }

  const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1\>Thanks for feedback!</h1\>
  }

  return (
    <form onSubmit\=\>
      <p\>How was your stay at The Prancing Pony?</p\>
      <textarea
        disabled\=
        value\=
        onChange\=
      />
      <br />
      <button
        disabled\=
        type\="submit"
      \>
        Send
      </button\>
      
    </form\>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve \=> {
    setTimeout(resolve, 2000);
  });
}

Show more

You can still declare some constants for readability:

    const isSending = status === 'sending';const isSent = status === 'sent';

But they’re not state variables, so you don’t need to worry about them getting out of sync with each other.

Avoid redundant state[](#avoid-redundant-state "Link for Avoid redundant state ")
---------------------------------------------------------------------------------

If you can calculate some information from the component’s props or its existing state variables during rendering, you **should not** put that information into that component’s state.

For example, take this form. It works, but can you find any redundant state in it?

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[firstName, setFirstName\] = useState('');
  const \[lastName, setLastName\] = useState('');
  const \[fullName, setFullName\] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <\>
      <h2\>Let’s check you in</h2\>
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
      <p\>
        Your ticket will be issued to: <b\></b\>
      </p\>
    </\>
  );
}

Show more

This form has three state variables: `firstName`, `lastName`, and `fullName`. However, `fullName` is redundant. **You can always calculate `fullName` from `firstName` and `lastName` during render, so remove it from state.**

This is how you can do it:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[firstName, setFirstName\] = useState('');
  const \[lastName, setLastName\] = useState('');

  const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  return (
    <\>
      <h2\>Let’s check you in</h2\>
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
      <p\>
        Your ticket will be issued to: <b\></b\>
      </p\>
    </\>
  );
}

Show more

Here, `fullName` is _not_ a state variable. Instead, it’s calculated during render:

    const fullName = firstName + ' ' + lastName;

As a result, the change handlers don’t need to do anything special to update it. When you call `setFirstName` or `setLastName`, you trigger a re-render, and then the next `fullName` will be calculated from the fresh data.

##### Deep Dive

#### Don’t mirror props in state[](#don-t-mirror-props-in-state "Link for Don’t mirror props in state ")

Show Details

A common example of redundant state is code like this:

    function Message() {  const [color, setColor] = useState(messageColor);

Here, a `color` state variable is initialized to the `messageColor` prop. The problem is that **if the parent component passes a different value of `messageColor` later (for example, `'red'` instead of `'blue'`), the `color` _state variable_ would not be updated!** The state is only initialized during the first render.

This is why “mirroring” some prop in a state variable can lead to confusion. Instead, use the `messageColor` prop directly in your code. If you want to give it a shorter name, use a constant:

    function Message() {  const color = messageColor;

This way it won’t get out of sync with the prop passed from the parent component.

“Mirroring” props into state only makes sense when you _want_ to ignore all updates for a specific prop. By convention, start the prop name with `initial` or `default` to clarify that its new values are ignored:

    function Message() {  // The `color` state variable holds the *first* value of `initialColor`.  // Further changes to the `initialColor` prop are ignored.  const [color, setColor] = useState(initialColor);

Avoid duplication in state[](#avoid-duplication-in-state "Link for Avoid duplication in state ")
------------------------------------------------------------------------------------------------

This menu list component lets you choose a single travel snack out of several:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const initialItems = \[
  ,
  ,
  ,
\];

export default function Menu() {
  const \[items, setItems\] = useState(initialItems);
  const \[selectedItem, setSelectedItem\] = useState(
    items\[0\]
  );

  return (
    <\>
      <h2\>What's your travel snack?</h2\>
      <ul\>
        {items.map(item \=> (
          <li key\=\>
            
            
            <button onClick\={() \=> {
              setSelectedItem(item);
            }}\>Choose</button\>
          </li\>
        ))}
      </ul\>
      <p\>You picked .</p\>
    </\>
  );
}

Show more

Currently, it stores the selected item as an object in the `selectedItem` state variable. However, this is not great: **the contents of the `selectedItem` is the same object as one of the items inside the `items` list.** This means that the information about the item itself is duplicated in two places.

Why is this a problem? Let’s make each item editable:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const initialItems = \[
  ,
  ,
  ,
\];

export default function Menu() {
  const \[items, setItems\] = useState(initialItems);
  const \[selectedItem, setSelectedItem\] = useState(
    items\[0\]
  );

  function handleItemChange(id, e) {
    setItems(items.map(item \=> {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <\>
      <h2\>What's your travel snack?</h2\> 
      <ul\>
        {items.map((item, index) \=> (
          <li key\=\>
            <input
              value\=
              onChange\={e \=> {
                handleItemChange(item.id, e)
              }}
            />
            
            <button onClick\={() \=> {
              setSelectedItem(item);
            }}\>Choose</button\>
          </li\>
        ))}
      </ul\>
      <p\>You picked .</p\>
    </\>
  );
}

Show more

Notice how if you first click “Choose” on an item and _then_ edit it, **the input updates but the label at the bottom does not reflect the edits.** This is because you have duplicated state, and you forgot to update `selectedItem`.

Although you could update `selectedItem` too, an easier fix is to remove duplication. In this example, instead of a `selectedItem` object (which creates a duplication with objects inside `items`), you hold the `selectedId` in state, and _then_ get the `selectedItem` by searching the `items` array for an item with that ID:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const initialItems = \[
  ,
  ,
  ,
\];

export default function Menu() {
  const \[items, setItems\] = useState(initialItems);
  const \[selectedId, setSelectedId\] = useState(0);

  const selectedItem = items.find(item \=>
    item.id === selectedId
  );

  function handleItemChange(id, e) {
    setItems(items.map(item \=> {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <\>
      <h2\>What's your travel snack?</h2\>
      <ul\>
        {items.map((item, index) \=> (
          <li key\=\>
            <input
              value\=
              onChange\={e \=> {
                handleItemChange(item.id, e)
              }}
            />
            
            <button onClick\={() \=> {
              setSelectedId(item.id);
            }}\>Choose</button\>
          </li\>
        ))}
      </ul\>
      <p\>You picked .</p\>
    </\>
  );
}

Show more

(Alternatively, you may hold the selected index in state.)

The state used to be duplicated like this:

*   `items = [, ...]`
*   `selectedItem = `

But after the change it’s like this:

*   `items = [, ...]`
*   `selectedId = 0`

The duplication is gone, and you only keep the essential state!

Now if you edit the _selected_ item, the message below will update immediately. This is because `setItems` triggers a re-render, and `items.find(...)` would find the item with the updated title. You didn’t need to hold _the selected item_ in state, because only the _selected ID_ is essential. The rest could be calculated during render.

Avoid deeply nested state[](#avoid-deeply-nested-state "Link for Avoid deeply nested state ")
---------------------------------------------------------------------------------------------

Imagine a travel plan consisting of planets, continents, and countries. You might be tempted to structure its state using nested objects and arrays, like in this example:

App.jsplaces.js

places.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export const initialTravelPlan = {
  id: 0,
  title: '(Root)',
  childPlaces: \[{
    id: 1,
    title: 'Earth',
    childPlaces: \[{
      id: 2,
      title: 'Africa',
      childPlaces: \[{
        id: 3,
        title: 'Botswana',
        childPlaces: \[\]
      }, {
        id: 4,
        title: 'Egypt',
        childPlaces: \[\]
      }, {
        id: 5,
        title: 'Kenya',
        childPlaces: \[\]
      }, {
        id: 6,
        title: 'Madagascar',
        childPlaces: \[\]
      }, {
        id: 7,
        title: 'Morocco',
        childPlaces: \[\]
      }, {
        id: 8,
        title: 'Nigeria',
        childPlaces: \[\]
      }, {
        id: 9,
        title: 'South Africa',
        childPlaces: \[\]
      }\]
    }, {
      id: 10,
      title: 'Americas',
      childPlaces: \[{
        id: 11,
        title: 'Argentina',
        childPlaces: \[\]
      }, {
        id: 12,
        title: 'Brazil',
        childPlaces: \[\]
      }, {
        id: 13,
        title: 'Barbados',
        childPlaces: \[\]
      }, {
        id: 14,
        title: 'Canada',
        childPlaces: \[\]
      }, {
        id: 15,
        title: 'Jamaica',
        childPlaces: \[\]
      }, {
        id: 16,
        title: 'Mexico',
        childPlaces: \[\]
      }, {
        id: 17,
        title: 'Trinidad and Tobago',
        childPlaces: \[\]
      }, {
        id: 18,
        title: 'Venezuela',
        childPlaces: \[\]
      }\]
    }, {
      id: 19,
      title: 'Asia',
      childPlaces: \[{
        id: 20,
        title: 'China',
        childPlaces: \[\]
      }, {
        id: 21,
        title: 'Hong Kong',
        childPlaces: \[\]
      }, {
        id: 22,
        title: 'India',
        childPlaces: \[\]
      }, {
        id: 23,
        title: 'Singapore',
        childPlaces: \[\]
      }, {
        id: 24,
        title: 'South Korea',
        childPlaces: \[\]
      }, {
        id: 25,
        title: 'Thailand',
        childPlaces: \[\]
      }, {
        id: 26,
        title: 'Vietnam',
        childPlaces: \[\]
      }\]
    }, {
      id: 27,
      title: 'Europe',
      childPlaces: \[{
        id: 28,
        title: 'Croatia',
        childPlaces: \[\],
      }, {
        id: 29,
        title: 'France',
        childPlaces: \[\],
      }, {
        id: 30,
        title: 'Germany',
        childPlaces: \[\],
      }, {
        id: 31,
        title: 'Italy',
        childPlaces: \[\],
      }, {
        id: 32,
        title: 'Portugal',
        childPlaces: \[\],
      }, {
        id: 33,
        title: 'Spain',
        childPlaces: \[\],
      }, {
        id: 34,
        title: 'Turkey',
        childPlaces: \[\],
      }\]
    }, {
      id: 35,
      title: 'Oceania',
      childPlaces: \[{
        id: 36,
        title: 'Australia',
        childPlaces: \[\],
      }, {
        id: 37,
        title: 'Bora Bora (French Polynesia)',
        childPlaces: \[\],
      }, {
        id: 38,
        title: 'Easter Island (Chile)',
        childPlaces: \[\],
      }, {
        id: 39,
        title: 'Fiji',
        childPlaces: \[\],
      }, {
        id: 40,
        title: 'Hawaii (the USA)',
        childPlaces: \[\],
      }, {
        id: 41,
        title: 'New Zealand',
        childPlaces: \[\],
      }, {
        id: 42,
        title: 'Vanuatu',
        childPlaces: \[\],
      }\]
    }\]
  }, {
    id: 43,
    title: 'Moon',
    childPlaces: \[{
      id: 44,
      title: 'Rheita',
      childPlaces: \[\]
    }, {
      id: 45,
      title: 'Piccolomini',
      childPlaces: \[\]
    }, {
      id: 46,
      title: 'Tycho',
      childPlaces: \[\]
    }\]
  }, {
    id: 47,
    title: 'Mars',
    childPlaces: \[{
      id: 48,
      title: 'Corn Town',
      childPlaces: \[\]
    }, {
      id: 49,
      title: 'Green Hill',
      childPlaces: \[\]      
    }\]
  }\]
};

Show more

Now let’s say you want to add a button to delete a place you’ve already visited. How would you go about it? [Updating nested state](updating-objects-in-state.html#updating-a-nested-object) involves making copies of objects all the way up from the part that changed. Deleting a deeply nested place would involve copying its entire parent place chain. Such code can be very verbose.

**If the state is too nested to update easily, consider making it “flat”.** Here is one way you can restructure this data. Instead of a tree-like structure where each `place` has an array of _its child places_, you can have each place hold an array of _its child place IDs_. Then store a mapping from each place ID to the corresponding place.

This data restructuring might remind you of seeing a database table:

App.jsplaces.js

places.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

export const initialTravelPlan = {
  0: {
    id: 0,
    title: '(Root)',
    childIds: \[1, 43, 47\],
  },
  1: {
    id: 1,
    title: 'Earth',
    childIds: \[2, 10, 19, 27, 35\]
  },
  2: {
    id: 2,
    title: 'Africa',
    childIds: \[3, 4, 5, 6 , 7, 8, 9\]
  }, 
  3: {
    id: 3,
    title: 'Botswana',
    childIds: \[\]
  },
  4: {
    id: 4,
    title: 'Egypt',
    childIds: \[\]
  },
  5: {
    id: 5,
    title: 'Kenya',
    childIds: \[\]
  },
  6: {
    id: 6,
    title: 'Madagascar',
    childIds: \[\]
  }, 
  7: {
    id: 7,
    title: 'Morocco',
    childIds: \[\]
  },
  8: {
    id: 8,
    title: 'Nigeria',
    childIds: \[\]
  },
  9: {
    id: 9,
    title: 'South Africa',
    childIds: \[\]
  },
  10: {
    id: 10,
    title: 'Americas',
    childIds: \[11, 12, 13, 14, 15, 16, 17, 18\],   
  },
  11: {
    id: 11,
    title: 'Argentina',
    childIds: \[\]
  },
  12: {
    id: 12,
    title: 'Brazil',
    childIds: \[\]
  },
  13: {
    id: 13,
    title: 'Barbados',
    childIds: \[\]
  }, 
  14: {
    id: 14,
    title: 'Canada',
    childIds: \[\]
  },
  15: {
    id: 15,
    title: 'Jamaica',
    childIds: \[\]
  },
  16: {
    id: 16,
    title: 'Mexico',
    childIds: \[\]
  },
  17: {
    id: 17,
    title: 'Trinidad and Tobago',
    childIds: \[\]
  },
  18: {
    id: 18,
    title: 'Venezuela',
    childIds: \[\]
  },
  19: {
    id: 19,
    title: 'Asia',
    childIds: \[20, 21, 22, 23, 24, 25, 26\],   
  },
  20: {
    id: 20,
    title: 'China',
    childIds: \[\]
  },
  21: {
    id: 21,
    title: 'Hong Kong',
    childIds: \[\]
  },
  22: {
    id: 22,
    title: 'India',
    childIds: \[\]
  },
  23: {
    id: 23,
    title: 'Singapore',
    childIds: \[\]
  },
  24: {
    id: 24,
    title: 'South Korea',
    childIds: \[\]
  },
  25: {
    id: 25,
    title: 'Thailand',
    childIds: \[\]
  },
  26: {
    id: 26,
    title: 'Vietnam',
    childIds: \[\]
  },
  27: {
    id: 27,
    title: 'Europe',
    childIds: \[28, 29, 30, 31, 32, 33, 34\],   
  },
  28: {
    id: 28,
    title: 'Croatia',
    childIds: \[\]
  },
  29: {
    id: 29,
    title: 'France',
    childIds: \[\]
  },
  30: {
    id: 30,
    title: 'Germany',
    childIds: \[\]
  },
  31: {
    id: 31,
    title: 'Italy',
    childIds: \[\]
  },
  32: {
    id: 32,
    title: 'Portugal',
    childIds: \[\]
  },
  33: {
    id: 33,
    title: 'Spain',
    childIds: \[\]
  },
  34: {
    id: 34,
    title: 'Turkey',
    childIds: \[\]
  },
  35: {
    id: 35,
    title: 'Oceania',
    childIds: \[36, 37, 38, 39, 40, 41, 42\],   
  },
  36: {
    id: 36,
    title: 'Australia',
    childIds: \[\]
  },
  37: {
    id: 37,
    title: 'Bora Bora (French Polynesia)',
    childIds: \[\]
  },
  38: {
    id: 38,
    title: 'Easter Island (Chile)',
    childIds: \[\]
  },
  39: {
    id: 39,
    title: 'Fiji',
    childIds: \[\]
  },
  40: {
    id: 40,
    title: 'Hawaii (the USA)',
    childIds: \[\]
  },
  41: {
    id: 41,
    title: 'New Zealand',
    childIds: \[\]
  },
  42: {
    id: 42,
    title: 'Vanuatu',
    childIds: \[\]
  },
  43: {
    id: 43,
    title: 'Moon',
    childIds: \[44, 45, 46\]
  },
  44: {
    id: 44,
    title: 'Rheita',
    childIds: \[\]
  },
  45: {
    id: 45,
    title: 'Piccolomini',
    childIds: \[\]
  },
  46: {
    id: 46,
    title: 'Tycho',
    childIds: \[\]
  },
  47: {
    id: 47,
    title: 'Mars',
    childIds: \[48, 49\]
  },
  48: {
    id: 48,
    title: 'Corn Town',
    childIds: \[\]
  },
  49: {
    id: 49,
    title: 'Green Hill',
    childIds: \[\]
  }
};

Show more

**Now that the state is “flat” (also known as “normalized”), updating nested items becomes easier.**

In order to remove a place now, you only need to update two levels of state:

*   The updated version of its _parent_ place should exclude the removed ID from its `childIds` array.
*   The updated version of the root “table” object should include the updated version of the parent place.

Here is an example of how you could go about it:

App.jsplaces.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './places.js';

export default function TravelPlan() {
  const \[plan, setPlan\] = useState(initialTravelPlan);

  function handleComplete(parentId, childId) {
    const parent = plan\[parentId\];
    // Create a new version of the parent place
    // that doesn't include this child ID.
    const nextParent = {
      ...parent,
      childIds: parent.childIds
        .filter(id \=> id !== childId)
    };
    // Update the root state object...
    setPlan({
      ...plan,
      // ...so that it has the updated parent.
      \[parentId\]: nextParent
    });
  }

  const root = plan\[0\];
  const planetIds = root.childIds;
  return (
    <\>
      <h2\>Places to visit</h2\>
      <ol\>
        {planetIds.map(id \=> (
          <PlaceTree
            key\=
            id\=
            parentId\=
            placesById\=
            onComplete\=
          />
        ))}
      </ol\>
    </\>
  );
}

function PlaceTree() {
  const place = placesById\[id\];
  const childIds = place.childIds;
  return (
    <li\>
      
      <button onClick\={() \=> {
        onComplete(parentId, id);
      }}\>
        Complete
      </button\>
      {childIds.length > 0 &&
        <ol\>
          {childIds.map(childId \=> (
            <PlaceTree
              key\=
              id\=
              parentId\=
              placesById\=
              onComplete\=
            />
          ))}
        </ol\>
      }
    </li\>
  );
}

Show more

You can nest state as much as you like, but making it “flat” can solve numerous problems. It makes state easier to update, and it helps ensure you don’t have duplication in different parts of a nested object.

##### Deep Dive

#### Improving memory usage[](#improving-memory-usage "Link for Improving memory usage ")

Show Details

Ideally, you would also remove the deleted items (and their children!) from the “table” object to improve memory usage. This version does that. It also [uses Immer](updating-objects-in-state.html#write-concise-update-logic-with-immer) to make the update logic more concise.

App.jsplaces.jspackage.json

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'use-immer';
import  from './places.js';

export default function TravelPlan() {
  const \[plan, updatePlan\] = useImmer(initialTravelPlan);

  function handleComplete(parentId, childId) {
    updatePlan(draft \=> {
      // Remove from the parent place's child IDs.
      const parent = draft\[parentId\];
      parent.childIds = parent.childIds
        .filter(id \=> id !== childId);

      // Forget this place and all its subtree.
      deleteAllChildren(childId);
      function deleteAllChildren(id) {
        const place = draft\[id\];
        place.childIds.forEach(deleteAllChildren);
        delete draft\[id\];
      }
    });
  }

  const root = plan\[0\];
  const planetIds = root.childIds;
  return (
    <\>
      <h2\>Places to visit</h2\>
      <ol\>
        {planetIds.map(id \=> (
          <PlaceTree
            key\=
            id\=
            parentId\=
            placesById\=
            onComplete\=
          />
        ))}
      </ol\>
    </\>
  );
}

function PlaceTree() {
  const place = placesById\[id\];
  const childIds = place.childIds;
  return (
    <li\>
      
      <button onClick\={() \=> {
        onComplete(parentId, id);
      }}\>
        Complete
      </button\>
      {childIds.length > 0 &&
        <ol\>
          {childIds.map(childId \=> (
            <PlaceTree
              key\=
              id\=
              parentId\=
              placesById\=
              onComplete\=
            />
          ))}
        </ol\>
      }
    </li\>
  );
}

Show more

Sometimes, you can also reduce state nesting by moving some of the nested state into the child components. This works well for ephemeral UI state that doesn’t need to be stored, like whether an item is hovered.

Recap[](#recap "Link for Recap")
--------------------------------

*   If two state variables always update together, consider merging them into one.
*   Choose your state variables carefully to avoid creating “impossible” states.
*   Structure your state in a way that reduces the chances that you’ll make a mistake updating it.
*   Avoid redundant and duplicate state so that you don’t need to keep it in sync.
*   Don’t put props _into_ state unless you specifically want to prevent updates.
*   For UI patterns like selection, keep ID or index in state instead of the object itself.
*   If updating deeply nested state is complicated, try flattening it.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix a component that’s not updating 2. Fix a broken packing list 3. Fix the disappearing selection 4. Implement multiple selection

#### 

Challenge 1 of 4:

Fix a component that’s not updating[](#fix-a-component-thats-not-updating "Link for this heading")

This `Clock` component receives two props: `color` and `time`. When you select a different color in the select box, the `Clock` component receives a different `color` prop from its parent component. However, for some reason, the displayed color doesn’t update. Why? Fix the problem.

Clock.js

Clock.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Clock(props) {
  const \[color, setColor\] = useState(props.color);
  return (
    <h1 style\=\>
      
    </h1\>
  );
}

Show solutionNext Challenge

[PreviousReacting to Input with State](reacting-to-input-with-state.html)[NextSharing State Between Components](sharing-state-between-components.html)

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
*   [Principles for structuring state](#principles-for-structuring-state)
*   [Group related state](#group-related-state)
*   [Avoid contradictions in state](#avoid-contradictions-in-state)
*   [Avoid redundant state](#avoid-redundant-state)
*   [Avoid duplication in state](#avoid-duplication-in-state)
*   [Avoid deeply nested state](#avoid-deeply-nested-state)
*   [Recap](#recap)
*   [Challenges](#challenges)

