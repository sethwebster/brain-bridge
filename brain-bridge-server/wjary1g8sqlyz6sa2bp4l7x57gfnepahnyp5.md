Lifecycle of Reactive Effects – React

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

[Escape Hatches](escape-hatches.html)

Lifecycle of Reactive Effects[](#undefined "Link for this heading")
===================================================================

Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time. React provides a linter rule to check that you’ve specified your Effect’s dependencies correctly. This keeps your Effect synchronized to the latest props and state.

### You will learn

*   How an Effect’s lifecycle is different from a component’s lifecycle
*   How to think about each individual Effect in isolation
*   When your Effect needs to re-synchronize, and why
*   How your Effect’s dependencies are determined
*   What it means for a value to be reactive
*   What an empty dependency array means
*   How React verifies your dependencies are correct with a linter
*   What to do when you disagree with the linter

The lifecycle of an Effect[](#the-lifecycle-of-an-effect "Link for The lifecycle of an Effect ")
------------------------------------------------------------------------------------------------

Every React component goes through the same lifecycle:

*   A component _mounts_ when it’s added to the screen.
*   A component _updates_ when it receives new props or state, usually in response to an interaction.
*   A component _unmounts_ when it’s removed from the screen.

**It’s a good way to think about components, but _not_ about Effects.** Instead, try to think about each Effect independently from your component’s lifecycle. An Effect describes how to [synchronize an external system](synchronizing-with-effects.html) to the current props and state. As your code changes, synchronization will need to happen more or less often.

To illustrate this point, consider this Effect connecting your component to a chat server:

    const serverUrl = 'https://localhost:1234';function ChatRoom(

Your Effect’s body specifies how to **start synchronizing:**

        // ...    const connection = createConnection(serverUrl, roomId);    connection.connect();    return () => ;    // ...

The cleanup function returned by your Effect specifies how to **stop synchronizing:**

        // ...    const connection = createConnection(serverUrl, roomId);    connection.connect();    return () => ;    // ...

Intuitively, you might think that React would **start synchronizing** when your component mounts and **stop synchronizing** when your component unmounts. However, this is not the end of the story! Sometimes, it may also be necessary to **start and stop synchronizing multiple times** while the component remains mounted.

Let’s look at _why_ this is necessary, _when_ it happens, and _how_ you can control this behavior.

### Note

Some Effects don’t return a cleanup function at all. [More often than not,](synchronizing-with-effects.html#how-to-handle-the-effect-firing-twice-in-development) you’ll want to return one—but if you don’t, React will behave as if you returned an empty cleanup function.

### Why synchronization may need to happen more than once[](#why-synchronization-may-need-to-happen-more-than-once "Link for Why synchronization may need to happen more than once ")

Imagine this `ChatRoom` component receives a `roomId` prop that the user picks in a dropdown. Let’s say that initially the user picks the `"general"` room as the `roomId`. Your app displays the `"general"` chat room:

    const serverUrl = 'https://localhost:1234';function ChatRoom(

After the UI is displayed, React will run your Effect to **start synchronizing.** It connects to the `"general"` room:

    function ChatRoom(, [roomId]);  // ...

So far, so good.

Later, the user picks a different room in the dropdown (for example, `"travel"`). First, React will update the UI:

    function ChatRoom(

Think about what should happen next. The user sees that `"travel"` is the selected chat room in the UI. However, the Effect that ran the last time is still connected to the `"general"` room. **The `roomId` prop has changed, so what your Effect did back then (connecting to the `"general"` room) no longer matches the UI.**

At this point, you want React to do two things:

1.  Stop synchronizing with the old `roomId` (disconnect from the `"general"` room)
2.  Start synchronizing with the new `roomId` (connect to the `"travel"` room)

**Luckily, you’ve already taught React how to do both of these things!** Your Effect’s body specifies how to start synchronizing, and your cleanup function specifies how to stop synchronizing. All that React needs to do now is to call them in the correct order and with the correct props and state. Let’s see how exactly that happens.

### How React re-synchronizes your Effect[](#how-react-re-synchronizes-your-effect "Link for How React re-synchronizes your Effect ")

Recall that your `ChatRoom` component has received a new value for its `roomId` prop. It used to be `"general"`, and now it is `"travel"`. React needs to re-synchronize your Effect to re-connect you to a different room.

To **stop synchronizing,** React will call the cleanup function that your Effect returned after connecting to the `"general"` room. Since `roomId` was `"general"`, the cleanup function disconnects from the `"general"` room:

    function ChatRoom(;    // ...

Then React will run the Effect that you’ve provided during this render. This time, `roomId` is `"travel"` so it will **start synchronizing** to the `"travel"` chat room (until its cleanup function is eventually called too):

    function ChatRoom() {  useEffect(() => {    const connection = createConnection(serverUrl, roomId); // Connects to the "travel" room    connection.connect();    // ...

Thanks to this, you’re now connected to the same room that the user chose in the UI. Disaster averted!

Every time after your component re-renders with a different `roomId`, your Effect will re-synchronize. For example, let’s say the user changes `roomId` from `"travel"` to `"music"`. React will again **stop synchronizing** your Effect by calling its cleanup function (disconnecting you from the `"travel"` room). Then it will **start synchronizing** again by running its body with the new `roomId` prop (connecting you to the `"music"` room).

Finally, when the user goes to a different screen, `ChatRoom` unmounts. Now there is no need to stay connected at all. React will **stop synchronizing** your Effect one last time and disconnect you from the `"music"` chat room.

### Thinking from the Effect’s perspective[](#thinking-from-the-effects-perspective "Link for Thinking from the Effect’s perspective ")

Let’s recap everything that’s happened from the `ChatRoom` component’s perspective:

1.  `ChatRoom` mounted with `roomId` set to `"general"`
2.  `ChatRoom` updated with `roomId` set to `"travel"`
3.  `ChatRoom` updated with `roomId` set to `"music"`
4.  `ChatRoom` unmounted

During each of these points in the component’s lifecycle, your Effect did different things:

1.  Your Effect connected to the `"general"` room
2.  Your Effect disconnected from the `"general"` room and connected to the `"travel"` room
3.  Your Effect disconnected from the `"travel"` room and connected to the `"music"` room
4.  Your Effect disconnected from the `"music"` room

Now let’s think about what happened from the perspective of the Effect itself:

      useEffect(() => , [roomId]);

This code’s structure might inspire you to see what happened as a sequence of non-overlapping time periods:

1.  Your Effect connected to the `"general"` room (until it disconnected)
2.  Your Effect connected to the `"travel"` room (until it disconnected)
3.  Your Effect connected to the `"music"` room (until it disconnected)

Previously, you were thinking from the component’s perspective. When you looked from the component’s perspective, it was tempting to think of Effects as “callbacks” or “lifecycle events” that fire at a specific time like “after a render” or “before unmount”. This way of thinking gets complicated very fast, so it’s best to avoid.

**Instead, always focus on a single start/stop cycle at a time. It shouldn’t matter whether a component is mounting, updating, or unmounting. All you need to do is to describe how to start synchronization and how to stop it. If you do it well, your Effect will be resilient to being started and stopped as many times as it’s needed.**

This might remind you how you don’t think whether a component is mounting or updating when you write the rendering logic that creates JSX. You describe what should be on the screen, and React [figures out the rest.](reacting-to-input-with-state.html)

### How React verifies that your Effect can re-synchronize[](#how-react-verifies-that-your-effect-can-re-synchronize "Link for How React verifies that your Effect can re-synchronize ")

Here is a live example that you can play with. Press “Open chat” to mount the `ChatRoom` component:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId\]);
  return <h1\>Welcome to the  room!</h1\>;
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <button onClick\=\>
        
      </button\>
      
      
    </\>
  );
}

Show more

Notice that when the component mounts for the first time, you see three logs:

1.  `✅ Connecting to "general" room at https://localhost:1234...` _(development-only)_
2.  `❌ Disconnected from "general" room at https://localhost:1234.` _(development-only)_
3.  `✅ Connecting to "general" room at https://localhost:1234...`

The first two logs are development-only. In development, React always remounts each component once.

**React verifies that your Effect can re-synchronize by forcing it to do that immediately in development.** This might remind you of opening a door and closing it an extra time to check if the door lock works. React starts and stops your Effect one extra time in development to check [you’ve implemented its cleanup well.](synchronizing-with-effects.html#how-to-handle-the-effect-firing-twice-in-development)

The main reason your Effect will re-synchronize in practice is if some data it uses has changed. In the sandbox above, change the selected chat room. Notice how, when the `roomId` changes, your Effect re-synchronizes.

However, there are also more unusual cases in which re-synchronization is necessary. For example, try editing the `serverUrl` in the sandbox above while the chat is open. Notice how the Effect re-synchronizes in response to your edits to the code. In the future, React may add more features that rely on re-synchronization.

### How React knows that it needs to re-synchronize the Effect[](#how-react-knows-that-it-needs-to-re-synchronize-the-effect "Link for How React knows that it needs to re-synchronize the Effect ")

You might be wondering how React knew that your Effect needed to re-synchronize after `roomId` changes. It’s because _you told React_ that its code depends on `roomId` by including it in the [list of dependencies:](synchronizing-with-effects.html#step-2-specify-the-effect-dependencies)

    function ChatRoom(, [roomId]); // So you tell React that this Effect "depends on" roomId  // ...

Here’s how this works:

1.  You knew `roomId` is a prop, which means it can change over time.
2.  You knew that your Effect reads `roomId` (so its logic depends on a value that may change later).
3.  This is why you specified it as your Effect’s dependency (so that it re-synchronizes when `roomId` changes).

Every time after your component re-renders, React will look at the array of dependencies that you have passed. If any of the values in the array is different from the value at the same spot that you passed during the previous render, React will re-synchronize your Effect.

For example, if you passed `["general"]` during the initial render, and later you passed `["travel"]` during the next render, React will compare `"general"` and `"travel"`. These are different values (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), so React will re-synchronize your Effect. On the other hand, if your component re-renders but `roomId` has not changed, your Effect will remain connected to the same room.

### Each Effect represents a separate synchronization process[](#each-effect-represents-a-separate-synchronization-process "Link for Each Effect represents a separate synchronization process ")

Resist adding unrelated logic to your Effect only because this logic needs to run at the same time as an Effect you already wrote. For example, let’s say you want to send an analytics event when the user visits the room. You already have an Effect that depends on `roomId`, so you might feel tempted to add the analytics call there:

    function ChatRoom(

But imagine you later add another dependency to this Effect that needs to re-establish the connection. If this Effect re-synchronizes, it will also call `logVisit(roomId)` for the same room, which you did not intend. Logging the visit **is a separate process** from connecting. Write them as two separate Effects:

    function ChatRoom(

**Each Effect in your code should represent a separate and independent synchronization process.**

In the above example, deleting one Effect wouldn’t break the other Effect’s logic. This is a good indication that they synchronize different things, and so it made sense to split them up. On the other hand, if you split up a cohesive piece of logic into separate Effects, the code may look “cleaner” but will be [more difficult to maintain.](you-might-not-need-an-effect.html#chains-of-computations) This is why you should think whether the processes are same or separate, not whether the code looks cleaner.

Effects “react” to reactive values[](#effects-react-to-reactive-values "Link for Effects “react” to reactive values ")
----------------------------------------------------------------------------------------------------------------------

Your Effect reads two variables (`serverUrl` and `roomId`), but you only specified `roomId` as a dependency:

    const serverUrl = 'https://localhost:1234';function ChatRoom(

Why doesn’t `serverUrl` need to be a dependency?

This is because the `serverUrl` never changes due to a re-render. It’s always the same no matter how many times the component re-renders and why. Since `serverUrl` never changes, it wouldn’t make sense to specify it as a dependency. After all, dependencies only do something when they change over time!

On the other hand, `roomId` may be different on a re-render. **Props, state, and other values declared inside the component are _reactive_ because they’re calculated during rendering and participate in the React data flow.**

If `serverUrl` was a state variable, it would be reactive. Reactive values must be included in dependencies:

    function ChatRoom(

By including `serverUrl` as a dependency, you ensure that the Effect re-synchronizes after it changes.

Try changing the selected chat room or edit the server URL in this sandbox:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

function ChatRoom() {
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234');

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[roomId, serverUrl\]);

  return (
    <\>
      <label\>
        Server URL:
        <input
          value\=
          onChange\=
        />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

Whenever you change a reactive value like `roomId` or `serverUrl`, the Effect re-connects to the chat server.

### What an Effect with empty dependencies means[](#what-an-effect-with-empty-dependencies-means "Link for What an Effect with empty dependencies means ")

What happens if you move both `serverUrl` and `roomId` outside the component?

    const serverUrl = 'https://localhost:1234';const roomId = 'general';function ChatRoom() 

Now your Effect’s code does not use _any_ reactive values, so its dependencies can be empty (`[]`).

Thinking from the component’s perspective, the empty `[]` dependency array means this Effect connects to the chat room only when the component mounts, and disconnects only when the component unmounts. (Keep in mind that React would still [re-synchronize it an extra time](#how-react-verifies-that-your-effect-can-re-synchronize) in development to stress-test your logic.)

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';
const roomId = 'general';

function ChatRoom() {
  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[\]);
  return <h1\>Welcome to the  room!</h1\>;
}

export default function App() {
  const \[show, setShow\] = useState(false);
  return (
    <\>
      <button onClick\=\>
        
      </button\>
      
      
    </\>
  );
}

Show more

However, if you [think from the Effect’s perspective,](#thinking-from-the-effects-perspective) you don’t need to think about mounting and unmounting at all. What’s important is you’ve specified what your Effect does to start and stop synchronizing. Today, it has no reactive dependencies. But if you ever want the user to change `roomId` or `serverUrl` over time (and they would become reactive), your Effect’s code won’t change. You will only need to add them to the dependencies.

### All variables declared in the component body are reactive[](#all-variables-declared-in-the-component-body-are-reactive "Link for All variables declared in the component body are reactive ")

Props and state aren’t the only reactive values. Values that you calculate from them are also reactive. If the props or state change, your component will re-render, and the values calculated from them will also change. This is why all variables from the component body used by the Effect should be in the Effect dependency list.

Let’s say that the user can pick a chat server in the dropdown, but they can also configure a default server in settings. Suppose you’ve already put the settings state in a [context](scaling-up-with-reducer-and-context.html) so you read the `settings` from that context. Now you calculate the `serverUrl` based on the selected server from props and the default server:

    function ChatRoom(

In this example, `serverUrl` is not a prop or a state variable. It’s a regular variable that you calculate during rendering. But it’s calculated during rendering, so it can change due to a re-render. This is why it’s reactive.

**All values inside the component (including props, state, and variables in your component’s body) are reactive. Any reactive value can change on a re-render, so you need to include reactive values as Effect’s dependencies.**

In other words, Effects “react” to all values from the component body.

##### Deep Dive

#### Can global or mutable values be dependencies?[](#can-global-or-mutable-values-be-dependencies "Link for Can global or mutable values be dependencies? ")

Show Details

Mutable values (including global variables) aren’t reactive.

**A mutable value like [`location.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) can’t be a dependency.** It’s mutable, so it can change at any time completely outside of the React rendering data flow. Changing it wouldn’t trigger a re-render of your component. Therefore, even if you specified it in the dependencies, React _wouldn’t know_ to re-synchronize the Effect when it changes. This also breaks the rules of React because reading mutable data during rendering (which is when you calculate the dependencies) breaks [purity of rendering.](keeping-components-pure.html) Instead, you should read and subscribe to an external mutable value with [`useSyncExternalStore`.](you-might-not-need-an-effect.html#subscribing-to-an-external-store)

**A mutable value like [`ref.current`](../reference/react/useRef.html#reference) or things you read from it also can’t be a dependency.** The ref object returned by `useRef` itself can be a dependency, but its `current` property is intentionally mutable. It lets you [keep track of something without triggering a re-render.](referencing-values-with-refs.html) But since changing it doesn’t trigger a re-render, it’s not a reactive value, and React won’t know to re-run your Effect when it changes.

As you’ll learn below on this page, a linter will check for these issues automatically.

### React verifies that you specified every reactive value as a dependency[](#react-verifies-that-you-specified-every-reactive-value-as-a-dependency "Link for React verifies that you specified every reactive value as a dependency ")

If your linter is [configured for React,](editor-setup.html#linting) it will check that every reactive value used by your Effect’s code is declared as its dependency. For example, this is a lint error because both `roomId` and `serverUrl` are reactive:

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

function ChatRoom() { // roomId is reactive
  const \[serverUrl, setServerUrl\] = useState('https://localhost:1234'); // serverUrl is reactive

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  }, \[\]); // <-- Something's wrong here!

  return (
    <\>
      <label\>
        Server URL:
        <input
          value\=
          onChange\=
        />
      </label\>
      <h1\>Welcome to the  room!</h1\>
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

This may look like a React error, but really React is pointing out a bug in your code. Both `roomId` and `serverUrl` may change over time, but you’re forgetting to re-synchronize your Effect when they change. You will remain connected to the initial `roomId` and `serverUrl` even after the user picks different values in the UI.

To fix the bug, follow the linter’s suggestion to specify `roomId` and `serverUrl` as dependencies of your Effect:

    function ChatRoom(

Try this fix in the sandbox above. Verify that the linter error is gone, and the chat re-connects when needed.

### Note

In some cases, React _knows_ that a value never changes even though it’s declared inside the component. For example, the [`set` function](../reference/react/useState.html#setstate) returned from `useState` and the ref object returned by [`useRef`](../reference/react/useRef.html) are _stable_—they are guaranteed to not change on a re-render. Stable values aren’t reactive, so you may omit them from the list. Including them is allowed: they won’t change, so it doesn’t matter.

### What to do when you don’t want to re-synchronize[](#what-to-do-when-you-dont-want-to-re-synchronize "Link for What to do when you don’t want to re-synchronize ")

In the previous example, you’ve fixed the lint error by listing `roomId` and `serverUrl` as dependencies.

**However, you could instead “prove” to the linter that these values aren’t reactive values,** i.e. that they _can’t_ change as a result of a re-render. For example, if `serverUrl` and `roomId` don’t depend on rendering and always have the same values, you can move them outside the component. Now they don’t need to be dependencies:

    const serverUrl = 'https://localhost:1234'; // serverUrl is not reactiveconst roomId = 'general'; // roomId is not reactivefunction ChatRoom() 

You can also move them _inside the Effect._ They aren’t calculated during rendering, so they’re not reactive:

    function ChatRoom() 

**Effects are reactive blocks of code.** They re-synchronize when the values you read inside of them change. Unlike event handlers, which only run once per interaction, Effects run whenever synchronization is necessary.

**You can’t “choose” your dependencies.** Your dependencies must include every [reactive value](#all-variables-declared-in-the-component-body-are-reactive) you read in the Effect. The linter enforces this. Sometimes this may lead to problems like infinite loops and to your Effect re-synchronizing too often. Don’t fix these problems by suppressing the linter! Here’s what to try instead:

*   **Check that your Effect represents an independent synchronization process.** If your Effect doesn’t synchronize anything, [it might be unnecessary.](you-might-not-need-an-effect.html) If it synchronizes several independent things, [split it up.](#each-effect-represents-a-separate-synchronization-process)
    
*   **If you want to read the latest value of props or state without “reacting” to it and re-synchronizing the Effect,** you can split your Effect into a reactive part (which you’ll keep in the Effect) and a non-reactive part (which you’ll extract into something called an _Effect Event_). [Read about separating Events from Effects.](separating-events-from-effects.html)
    
*   **Avoid relying on objects and functions as dependencies.** If you create objects and functions during rendering and then read them from an Effect, they will be different on every render. This will cause your Effect to re-synchronize every time. [Read more about removing unnecessary dependencies from Effects.](removing-effect-dependencies.html)
    

### Pitfall

The linter is your friend, but its powers are limited. The linter only knows when the dependencies are _wrong_. It doesn’t know _the best_ way to solve each case. If the linter suggests a dependency, but adding it causes a loop, it doesn’t mean the linter should be ignored. You need to change the code inside (or outside) the Effect so that that value isn’t reactive and doesn’t _need_ to be a dependency.

If you have an existing codebase, you might have some Effects that suppress the linter like this:

    useEffect(() => , []);

On the [next](separating-events-from-effects.html) [pages](removing-effect-dependencies.html), you’ll learn how to fix this code without breaking the rules. It’s always worth fixing!

Recap[](#recap "Link for Recap")
--------------------------------

*   Components can mount, update, and unmount.
*   Each Effect has a separate lifecycle from the surrounding component.
*   Each Effect describes a separate synchronization process that can _start_ and _stop_.
*   When you write and read Effects, think from each individual Effect’s perspective (how to start and stop synchronization) rather than from the component’s perspective (how it mounts, updates, or unmounts).
*   Values declared inside the component body are “reactive”.
*   Reactive values should re-synchronize the Effect because they can change over time.
*   The linter verifies that all reactive values used inside the Effect are specified as dependencies.
*   All errors flagged by the linter are legitimate. There’s always a way to fix the code to not break the rules.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Fix reconnecting on every keystroke 2. Switch synchronization on and off 3. Investigate a stale value bug 4. Fix a connection switch 5. Populate a chain of select boxes

#### 

Challenge 1 of 5:

Fix reconnecting on every keystroke[](#fix-reconnecting-on-every-keystroke "Link for this heading")

In this example, the `ChatRoom` component connects to the chat room when the component mounts, disconnects when it unmounts, and reconnects when you select a different chat room. This behavior is correct, so you need to keep it working.

However, there is a problem. Whenever you type into the message box input at the bottom, `ChatRoom` _also_ reconnects to the chat. (You can notice this by clearing the console and typing into the input.) Fix the issue so that this doesn’t happen.

App.jschat.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './chat.js';

const serverUrl = 'https://localhost:1234';

function ChatRoom() {
  const \[message, setMessage\] = useState('');

  useEffect(() \=> {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () \=> connection.disconnect();
  });

  return (
    <\>
      <h1\>Welcome to the  room!</h1\>
      <input
        value\=
        onChange\=
      />
    </\>
  );
}

export default function App() {
  const \[roomId, setRoomId\] = useState('general');
  return (
    <\>
      <label\>
        Choose the chat room:
        <select
          value\=
          onChange\=
        \>
          <option value\="general"\>general</option\>
          <option value\="travel"\>travel</option\>
          <option value\="music"\>music</option\>
        </select\>
      </label\>
      <hr />
      <ChatRoom roomId\= />
    </\>
  );
}

Show more

Show hint Show solution

Next Challenge

[PreviousYou Might Not Need an Effect](you-might-not-need-an-effect.html)[NextSeparating Events from Effects](separating-events-from-effects.html)

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
*   [The lifecycle of an Effect](#the-lifecycle-of-an-effect)
*   [Why synchronization may need to happen more than once](#why-synchronization-may-need-to-happen-more-than-once)
*   [How React re-synchronizes your Effect](#how-react-re-synchronizes-your-effect)
*   [Thinking from the Effect’s perspective](#thinking-from-the-effects-perspective)
*   [How React verifies that your Effect can re-synchronize](#how-react-verifies-that-your-effect-can-re-synchronize)
*   [How React knows that it needs to re-synchronize the Effect](#how-react-knows-that-it-needs-to-re-synchronize-the-effect)
*   [Each Effect represents a separate synchronization process](#each-effect-represents-a-separate-synchronization-process)
*   [Effects “react” to reactive values](#effects-react-to-reactive-values)
*   [What an Effect with empty dependencies means](#what-an-effect-with-empty-dependencies-means)
*   [All variables declared in the component body are reactive](#all-variables-declared-in-the-component-body-are-reactive)
*   [React verifies that you specified every reactive value as a dependency](#react-verifies-that-you-specified-every-reactive-value-as-a-dependency)
*   [What to do when you don’t want to re-synchronize](#what-to-do-when-you-dont-want-to-re-synchronize)
*   [Recap](#recap)
*   [Challenges](#challenges)

