Scaling Up with Reducer and Context – React

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

Scaling Up with Reducer and Context[](#undefined "Link for this heading")
=========================================================================

Reducers let you consolidate a component’s state update logic. Context lets you pass information deep down to other components. You can combine reducers and context together to manage state of a complex screen.

### You will learn

*   How to combine a reducer with context
*   How to avoid passing state and dispatch through props
*   How to keep context and state logic in a separate file

Combining a reducer with context[](#combining-a-reducer-with-context "Link for Combining a reducer with context ")
------------------------------------------------------------------------------------------------------------------

In this example from [the introduction to reducers](extracting-state-logic-into-a-reducer.html), the state is managed by a reducer. The reducer function contains all of the state update logic and is declared at the bottom of this file:

App.jsAddTask.jsTaskList.js

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
      <h1\>Day off in Kyoto</h1\>
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

A reducer helps keep the event handlers short and concise. However, as your app grows, you might run into another difficulty. **Currently, the `tasks` state and the `dispatch` function are only available in the top-level `TaskApp` component.** To let other components read the list of tasks or change it, you have to explicitly [pass down](passing-props-to-a-component.html) the current state and the event handlers that change it as props.

For example, `TaskApp` passes a list of tasks and the event handlers to `TaskList`:

    <TaskList  tasks=/>

And `TaskList` passes the event handlers to `Task`:

    <Task  task=/>

In a small example like this, this works well, but if you have tens or hundreds of components in the middle, passing down all state and functions can be quite frustrating!

This is why, as an alternative to passing them through props, you might want to put both the `tasks` state and the `dispatch` function [into context.](passing-data-deeply-with-context.html) **This way, any component below `TaskApp` in the tree can read the tasks and dispatch actions without the repetitive “prop drilling”.**

Here is how you can combine a reducer with context:

1.  **Create** the context.
2.  **Put** state and dispatch into context.
3.  **Use** context anywhere in the tree.

### Step 1: Create the context[](#step-1-create-the-context "Link for Step 1: Create the context ")

The `useReducer` Hook returns the current `tasks` and the `dispatch` function that lets you update them:

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

To pass them down the tree, you will [create](passing-data-deeply-with-context.html#step-2-use-the-context) two separate contexts:

*   `TasksContext` provides the current list of tasks.
*   `TasksDispatchContext` provides the function that lets components dispatch actions.

Export them from a separate file so that you can later import them from other files:

App.jsTasksContext.jsAddTask.jsTaskList.js

TasksContext.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);

Here, you’re passing `null` as the default value to both contexts. The actual values will be provided by the `TaskApp` component.

### Step 2: Put state and dispatch into context[](#step-2-put-state-and-dispatch-into-context "Link for Step 2: Put state and dispatch into context ")

Now you can import both contexts in your `TaskApp` component. Take the `tasks` and `dispatch` returned by `useReducer()` and [provide them](passing-data-deeply-with-context.html#step-3-provide-the-context) to the entire tree below:

    import 

For now, you pass the information both via props and in context:

App.jsTasksContext.jsAddTask.jsTaskList.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import  from './TasksContext.js';

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
    <TasksContext.Provider value\=\>
      <TasksDispatchContext.Provider value\=\>
        <h1\>Day off in Kyoto</h1\>
        <AddTask
          onAddTask\=
        />
        <TaskList
          tasks\=
          onChangeTask\=
          onDeleteTask\=
        />
      </TasksDispatchContext.Provider\>
    </TasksContext.Provider\>
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

In the next step, you will remove prop passing.

### Step 3: Use context anywhere in the tree[](#step-3-use-context-anywhere-in-the-tree "Link for Step 3: Use context anywhere in the tree ")

Now you don’t need to pass the list of tasks or the event handlers down the tree:

    <TasksContext.Provider value=>    <h1>Day off in Kyoto</h1>    <AddTask />    <TaskList />  </TasksDispatchContext.Provider></TasksContext.Provider>

Instead, any component that needs the task list can read it from the `TaskContext`:

    export default function TaskList() {  const tasks = useContext(TasksContext);  // ...

To update the task list, any component can read the `dispatch` function from context and call it:

    export default function AddTask() >Add</button>    // ...

**The `TaskApp` component does not pass any event handlers down, and the `TaskList` does not pass any event handlers to the `Task` component either.** Each component reads the context that it needs:

App.jsTasksContext.jsAddTask.jsTaskList.js

TaskList.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './TasksContext.js';

export default function TaskList() {
  const tasks = useContext(TasksContext);
  return (
    <ul\>
      {tasks.map(task \=> (
        <li key\=\>
          <Task task\= />
        </li\>
      ))}
    </ul\>
  );
}

function Task() {
  const \[isEditing, setIsEditing\] = useState(false);
  const dispatch = useContext(TasksDispatchContext);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <\>
        <input
          value\=
          onChange\={e \=> {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick\=\>
          Save
        </button\>
      </\>
    );
  } else {
    taskContent = (
      <\>
        
        <button onClick\=\>
          Edit
        </button\>
      </\>
    );
  }
  return (
    <label\>
      <input
        type\="checkbox"
        checked\=
        onChange\={e \=> {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      
      <button onClick\={() \=> {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}\>
        Delete
      </button\>
    </label\>
  );
}

Show more

**The state still “lives” in the top-level `TaskApp` component, managed with `useReducer`.** But its `tasks` and `dispatch` are now available to every component below in the tree by importing and using these contexts.

Moving all wiring into a single file[](#moving-all-wiring-into-a-single-file "Link for Moving all wiring into a single file ")
------------------------------------------------------------------------------------------------------------------------------

You don’t have to do this, but you could further declutter the components by moving both reducer and context into a single file. Currently, `TasksContext.js` contains only two context declarations:

    import  from 'react';export const TasksContext = createContext(null);export const TasksDispatchContext = createContext(null);

This file is about to get crowded! You’ll move the reducer into that same file. Then you’ll declare a new `TasksProvider` component in the same file. This component will tie all the pieces together:

1.  It will manage the state with a reducer.
2.  It will provide both contexts to components below.
3.  It will [take `children` as a prop](passing-props-to-a-component.html#passing-jsx-as-children) so you can pass JSX to it.

    export function TasksProvider(

**This removes all the complexity and wiring from your `TaskApp` component:**

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

You can also export functions that _use_ the context from `TasksContext.js`:

    export function useTasks() 

When a component needs to read context, it can do it through these functions:

    const tasks = useTasks();const dispatch = useTasksDispatch();

This doesn’t change the behavior in any way, but it lets you later split these contexts further or add some logic to these functions. **Now all of the context and reducer wiring is in `TasksContext.js`. This keeps the components clean and uncluttered, focused on what they display rather than where they get the data:**

App.jsTasksContext.jsAddTask.jsTaskList.js

TaskList.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './TasksContext.js';

export default function TaskList() {
  const tasks = useTasks();
  return (
    <ul\>
      {tasks.map(task \=> (
        <li key\=\>
          <Task task\= />
        </li\>
      ))}
    </ul\>
  );
}

function Task() {
  const \[isEditing, setIsEditing\] = useState(false);
  const dispatch = useTasksDispatch();
  let taskContent;
  if (isEditing) {
    taskContent = (
      <\>
        <input
          value\=
          onChange\={e \=> {
            dispatch({
              type: 'changed',
              task: {
                ...task,
                text: e.target.value
              }
            });
          }} />
        <button onClick\=\>
          Save
        </button\>
      </\>
    );
  } else {
    taskContent = (
      <\>
        
        <button onClick\=\>
          Edit
        </button\>
      </\>
    );
  }
  return (
    <label\>
      <input
        type\="checkbox"
        checked\=
        onChange\={e \=> {
          dispatch({
            type: 'changed',
            task: {
              ...task,
              done: e.target.checked
            }
          });
        }}
      />
      
      <button onClick\={() \=> {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}\>
        Delete
      </button\>
    </label\>
  );
}

Show more

You can think of `TasksProvider` as a part of the screen that knows how to deal with tasks, `useTasks` as a way to read them, and `useTasksDispatch` as a way to update them from any component below in the tree.

### Note

Functions like `useTasks` and `useTasksDispatch` are called _[Custom Hooks.](reusing-logic-with-custom-hooks.html)_ Your function is considered a custom Hook if its name starts with `use`. This lets you use other Hooks, like `useContext`, inside it.

As your app grows, you may have many context-reducer pairs like this. This is a powerful way to scale your app and [lift state up](sharing-state-between-components.html) without too much work whenever you want to access the data deep in the tree.

Recap[](#recap "Link for Recap")
--------------------------------

*   You can combine reducer with context to let any component read and update state above it.
*   To provide state and the dispatch function to components below:
    1.  Create two contexts (for state and for dispatch functions).
    2.  Provide both contexts from the component that uses the reducer.
    3.  Use either context from components that need to read them.
*   You can further declutter the components by moving all wiring into one file.
    *   You can export a component like `TasksProvider` that provides context.
    *   You can also export custom Hooks like `useTasks` and `useTasksDispatch` to read it.
*   You can have many context-reducer pairs like this in your app.

[PreviousPassing Data Deeply with Context](passing-data-deeply-with-context.html)[NextEscape Hatches](escape-hatches.html)

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
*   [Combining a reducer with context](#combining-a-reducer-with-context)
*   [Step 1: Create the context](#step-1-create-the-context)
*   [Step 2: Put state and dispatch into context](#step-2-put-state-and-dispatch-into-context)
*   [Step 3: Use context anywhere in the tree](#step-3-use-context-anywhere-in-the-tree)
*   [Moving all wiring into a single file](#moving-all-wiring-into-a-single-file)
*   [Recap](#recap)

