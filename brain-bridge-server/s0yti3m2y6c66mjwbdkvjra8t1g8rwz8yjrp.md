Managing State – React

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

Managing State[](#undefined "Link for this heading")
====================================================

Intermediate

As your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components. Redundant or duplicate state is a common source of bugs. In this chapter, you’ll learn how to structure your state well, how to keep your state update logic maintainable, and how to share state between distant components.

### In this chapter

*   [How to think about UI changes as state changes](reacting-to-input-with-state.html)
*   [How to structure state well](choosing-the-state-structure.html)
*   [How to “lift state up” to share it between components](sharing-state-between-components.html)
*   [How to control whether the state gets preserved or reset](preserving-and-resetting-state.html)
*   [How to consolidate complex state logic in a function](extracting-state-logic-into-a-reducer.html)
*   [How to pass information without “prop drilling”](passing-data-deeply-with-context.html)
*   [How to scale state management as your app grows](scaling-up-with-reducer-and-context.html)

Reacting to input with state[](#reacting-to-input-with-state "Link for Reacting to input with state ")
------------------------------------------------------------------------------------------------------

With React, you won’t modify the UI from code directly. For example, you won’t write commands like “disable the button”, “enable the button”, “show the success message”, etc. Instead, you will describe the UI you want to see for the different visual states of your component (“initial state”, “typing state”, “success state”), and then trigger the state changes in response to user input. This is similar to how designers think about UI.

Here is a quiz form built using React. Note how it uses the `status` state variable to determine whether to enable or disable the submit button, and whether to show the success message instead.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Form() {
  const \[answer, setAnswer\] = useState('');
  const \[error, setError\] = useState(null);
  const \[status, setStatus\] = useState('typing');

  if (status === 'success') {
    return <h1\>That's right!</h1\>
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  return (
    <\>
      <h2\>City quiz</h2\>
      <p\>
        In which city is there a billboard that turns air into drinkable water?
      </p\>
      <form onSubmit\=\>
        <textarea
          value\=
          onChange\=
          disabled\=
        />
        <br />
        <button disabled\={
          answer.length === 0 ||
          status === 'submitting'
        }\>
          Submit
        </button\>
        {error !== null &&
          <p className\="Error"\>
            
          </p\>
        }
      </form\>
    </\>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) \=> {
    setTimeout(() \=> {
      let shouldError = answer.toLowerCase() !== 'lima'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}

Show more

Ready to learn this topic?
--------------------------

Read **[Reacting to Input with State](reacting-to-input-with-state.html)** to learn how to approach interactions with a state-driven mindset.

[Read More](reacting-to-input-with-state.html)

* * *

Choosing the state structure[](#choosing-the-state-structure "Link for Choosing the state structure ")
------------------------------------------------------------------------------------------------------

Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. The most important principle is that state shouldn’t contain redundant or duplicated information. If there’s unnecessary state, it’s easy to forget to update it, and introduce bugs!

For example, this form has a **redundant** `fullName` state variable:

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

You can remove it and simplify the code by calculating `fullName` while the component is rendering:

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

This might seem like a small change, but many bugs in React apps are fixed this way.

Ready to learn this topic?
--------------------------

Read **[Choosing the State Structure](choosing-the-state-structure.html)** to learn how to design the state shape to avoid bugs.

[Read More](choosing-the-state-structure.html)

* * *

Sharing state between components[](#sharing-state-between-components "Link for Sharing state between components ")
------------------------------------------------------------------------------------------------------------------

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as “lifting state up”, and it’s one of the most common things you will do writing React code.

In this example, only one panel should be active at a time. To achieve this, instead of keeping the active state inside each individual panel, the parent component holds the state and specifies the props for its children.

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

Ready to learn this topic?
--------------------------

Read **[Sharing State Between Components](sharing-state-between-components.html)** to learn how to lift state up and keep components in sync.

[Read More](sharing-state-between-components.html)

* * *

Preserving and resetting state[](#preserving-and-resetting-state "Link for Preserving and resetting state ")
------------------------------------------------------------------------------------------------------------

When you re-render a component, React needs to decide which parts of the tree to keep (and update), and which parts to discard or re-create from scratch. In most cases, React’s automatic behavior works well enough. By default, React preserves the parts of the tree that “match up” with the previously rendered component tree.

However, sometimes this is not what you want. In this chat app, typing a message and then switching the recipient does not reset the input. This can make the user accidentally send a message to the wrong person:

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

React lets you override the default behavior, and _force_ a component to reset its state by passing it a different `key`, like `<Chat key= />`. This tells React that if the recipient is different, it should be considered a _different_ `Chat` component that needs to be re-created from scratch with the new data (and UI like inputs). Now switching between the recipients resets the input field—even though you render the same component.

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

Ready to learn this topic?
--------------------------

Read **[Preserving and Resetting State](preserving-and-resetting-state.html)** to learn the lifetime of state and how to control it.

[Read More](preserving-and-resetting-state.html)

* * *

Extracting state logic into a reducer[](#extracting-state-logic-into-a-reducer "Link for Extracting state logic into a reducer ")
---------------------------------------------------------------------------------------------------------------------------------

Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called “reducer”. Your event handlers become concise because they only specify the user “actions”. At the bottom of the file, the reducer function specifies how the state should update in response to each action!

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

export default function TaskApp() {
  const \[tasks, dispatch\] = useReducer(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <\>
      <h1\>Prague itinerary</h1\>
      <AddTask
        onAddTask\=
      />
      <TaskList
        tasks\=
        onChangeTask\=
        onDeleteTask\=
      />
    </\>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return \[...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }\];
    }
    case 'changed': {
      return tasks.map(t \=> {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t \=> t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

let nextId = 3;
const initialTasks = \[
  ,
  ,
  
\];

Show more

Ready to learn this topic?
--------------------------

Read **[Extracting State Logic into a Reducer](extracting-state-logic-into-a-reducer.html)** to learn how to consolidate logic in the reducer function.

[Read More](extracting-state-logic-into-a-reducer.html)

* * *

Passing data deeply with context[](#passing-data-deeply-with-context "Link for Passing data deeply with context ")
------------------------------------------------------------------------------------------------------------------

Usually, you will pass information from a parent component to a child component via props. But passing props can become inconvenient if you need to pass some prop through many components, or if many components need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep it is—without passing it explicitly through props.

Here, the `Heading` component determines its heading level by “asking” the closest `Section` for its level. Each `Section` tracks its own level by asking the parent `Section` and adding one to it. Every `Section` provides information to all components below it without passing props—it does that through context.

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

Ready to learn this topic?
--------------------------

Read **[Passing Data Deeply with Context](passing-data-deeply-with-context.html)** to learn about using context as an alternative to passing props.

[Read More](passing-data-deeply-with-context.html)

* * *

Scaling up with reducer and context[](#scaling-up-with-reducer-and-context "Link for Scaling up with reducer and context ")
---------------------------------------------------------------------------------------------------------------------------

Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

With this approach, a parent component with complex state manages it with a reducer. Other components anywhere deep in the tree can read its state via context. They can also dispatch actions to update that state.

App.jsTasksContext.jsAddTask.jsTaskList.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import  from './TasksContext.js';

export default function TaskApp() {
  return (
    <TasksProvider\>
      <h1\>Day off in Kyoto</h1\>
      <AddTask />
      <TaskList />
    </TasksProvider\>
  );
}

Ready to learn this topic?
--------------------------

Read **[Scaling Up with Reducer and Context](scaling-up-with-reducer-and-context.html)** to learn how state management scales in a growing app.

[Read More](scaling-up-with-reducer-and-context.html)

* * *

What’s next?[](#whats-next "Link for What’s next? ")
----------------------------------------------------

Head over to [Reacting to Input with State](reacting-to-input-with-state.html) to start reading this chapter page by page!

Or, if you’re already familiar with these topics, why not read about [Escape Hatches](escape-hatches.html)?

[PreviousUpdating Arrays in State](updating-arrays-in-state.html)[NextReacting to Input with State](reacting-to-input-with-state.html)

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
*   [Reacting to input with state](#reacting-to-input-with-state)
*   [Choosing the state structure](#choosing-the-state-structure)
*   [Sharing state between components](#sharing-state-between-components)
*   [Preserving and resetting state](#preserving-and-resetting-state)
*   [Extracting state logic into a reducer](#extracting-state-logic-into-a-reducer)
*   [Passing data deeply with context](#passing-data-deeply-with-context)
*   [Scaling up with reducer and context](#scaling-up-with-reducer-and-context)
*   [What’s next?](#whats-next)

