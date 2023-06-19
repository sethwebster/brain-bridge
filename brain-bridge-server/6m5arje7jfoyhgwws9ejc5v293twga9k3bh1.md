You Might Not Need an Effect – React

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

You Might Not Need an Effect[](#undefined "Link for this heading")
==================================================================

Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system like a non-React widget, network, or the browser DOM. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.

### You will learn

*   Why and how to remove unnecessary Effects from your components
*   How to cache expensive computations without Effects
*   How to reset and adjust component state without Effects
*   How to share logic between event handlers
*   Which logic should be moved to event handlers
*   How to notify parent components about changes

How to remove unnecessary Effects[](#how-to-remove-unnecessary-effects "Link for How to remove unnecessary Effects ")
---------------------------------------------------------------------------------------------------------------------

There are two common cases in which you don’t need Effects:

*   **You don’t need Effects to transform data for rendering.** For example, let’s say you want to filter a list before displaying it. You might feel tempted to write an Effect that updates a state variable when the list changes. However, this is inefficient. When you update the state, React will first call your component functions to calculate what should be on the screen. Then React will [“commit”](render-and-commit.html) these changes to the DOM, updating the screen. Then React will run your Effects. If your Effect _also_ immediately updates the state, this restarts the whole process from scratch! To avoid the unnecessary render passes, transform all the data at the top level of your components. That code will automatically re-run whenever your props or state change.
*   **You don’t need Effects to handle user events.** For example, let’s say you want to send an `/api/buy` POST request and show a notification when the user buys a product. In the Buy button click event handler, you know exactly what happened. By the time an Effect runs, you don’t know _what_ the user did (for example, which button was clicked). This is why you’ll usually handle user events in the corresponding event handlers.

You _do_ need Effects to [synchronize](synchronizing-with-effects.html#what-are-effects-and-how-are-they-different-from-events) with external systems. For example, you can write an Effect that keeps a jQuery widget synchronized with the React state. You can also fetch data with Effects: for example, you can synchronize the search results with the current search query. Keep in mind that modern [frameworks](start-a-new-react-project.html#production-grade-react-frameworks) provide more efficient built-in data fetching mechanisms than writing Effects directly in your components.

To help you gain the right intuition, let’s look at some common concrete examples!

### Updating state based on props or state[](#updating-state-based-on-props-or-state "Link for Updating state based on props or state ")

Suppose you have a component with two state variables: `firstName` and `lastName`. You want to calculate a `fullName` from them by concatenating them. Moreover, you’d like `fullName` to update whenever `firstName` or `lastName` change. Your first instinct might be to add a `fullName` state variable and update it in an Effect:

    function Form() 

This is more complicated than necessary. It is inefficient too: it does an entire render pass with a stale value for `fullName`, then immediately re-renders with the updated value. Remove the state variable and the Effect:

    function Form() 

**When something can be calculated from the existing props or state, [don’t put it in state.](choosing-the-state-structure.html#avoid-redundant-state) Instead, calculate it during rendering.** This makes your code faster (you avoid the extra “cascading” updates), simpler (you remove some code), and less error-prone (you avoid bugs caused by different state variables getting out of sync with each other). If this approach feels new to you, [Thinking in React](thinking-in-react.html#step-3-find-the-minimal-but-complete-representation-of-ui-state) explains what should go into state.

### Caching expensive calculations[](#caching-expensive-calculations "Link for Caching expensive calculations ")

This component computes `visibleTodos` by taking the `todos` it receives by props and filtering them according to the `filter` prop. You might feel tempted to store the result in state and update it from an Effect:

    function TodoList(

Like in the earlier example, this is both unnecessary and inefficient. First, remove the state and the Effect:

    function TodoList(

Usually, this code is fine! But maybe `getFilteredTodos()` is slow or you have a lot of `todos`. In that case you don’t want to recalculate `getFilteredTodos()` if some unrelated state variable like `newTodo` has changed.

You can cache (or [“memoize”](https://en.wikipedia.org/wiki/Memoization)) an expensive calculation by wrapping it in a [`useMemo`](../reference/react/useMemo.html) Hook:

    import 

Or, written as a single line:

    import 

**This tells React that you don’t want the inner function to re-run unless either `todos` or `filter` have changed.** React will remember the return value of `getFilteredTodos()` during the initial render. During the next renders, it will check if `todos` or `filter` are different. If they’re the same as last time, `useMemo` will return the last result it has stored. But if they are different, React will call the inner function again (and store its result).

The function you wrap in [`useMemo`](../reference/react/useMemo.html) runs during rendering, so this only works for [pure calculations.](keeping-components-pure.html)

##### Deep Dive

#### How to tell if a calculation is expensive?[](#how-to-tell-if-a-calculation-is-expensive "Link for How to tell if a calculation is expensive? ")

Show Details

In general, unless you’re creating or looping over thousands of objects, it’s probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:

    console.time('filter array');const visibleTodos = getFilteredTodos(todos, filter);console.timeEnd('filter array');

Perform the interaction you’re measuring (for example, typing into the input). You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation. As an experiment, you can then wrap the calculation in `useMemo` to verify whether the total logged time has decreased for that interaction or not:

    console.time('filter array');const visibleTodos = useMemo(() => , [todos, filter]);console.timeEnd('filter array');

`useMemo` won’t make the _first_ render faster. It only helps you skip unnecessary work on updates.

Keep in mind that your machine is probably faster than your users’ so it’s a good idea to test the performance with an artificial slowdown. For example, Chrome offers a [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) option for this.

Also note that measuring performance in development will not give you the most accurate results. (For example, when [Strict Mode](../reference/react/StrictMode.html) is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.

### Resetting all state when a prop changes[](#resetting-all-state-when-a-prop-changes "Link for Resetting all state when a prop changes ")

This `ProfilePage` component receives a `userId` prop. The page contains a comment input, and you use a `comment` state variable to hold its value. One day, you notice a problem: when you navigate from one profile to another, the `comment` state does not get reset. As a result, it’s easy to accidentally post a comment on a wrong user’s profile. To fix the issue, you want to clear out the `comment` state variable whenever the `userId` changes:

    export default function ProfilePage(

This is inefficient because `ProfilePage` and its children will first render with the stale value, and then render again. It is also complicated because you’d need to do this in _every_ component that has some state inside `ProfilePage`. For example, if the comment UI is nested, you’d want to clear out nested comment state too.

Instead, you can tell React that each user’s profile is conceptually a _different_ profile by giving it an explicit key. Split your component in two and pass a `key` attribute from the outer component to the inner one:

    export default function ProfilePage(

Normally, React preserves the state when the same component is rendered in the same spot. **By passing `userId` as a `key` to the `Profile` component, you’re asking React to treat two `Profile` components with different `userId` as two different components that should not share any state.** Whenever the key (which you’ve set to `userId`) changes, React will recreate the DOM and [reset the state](preserving-and-resetting-state.html#option-2-resetting-state-with-a-key) of the `Profile` component and all of its children. Now the `comment` field will clear out automatically when navigating between profiles.

Note that in this example, only the outer `ProfilePage` component is exported and visible to other files in the project. Components rendering `ProfilePage` don’t need to pass the key to it: they pass `userId` as a regular prop. The fact `ProfilePage` passes it as a `key` to the inner `Profile` component is an implementation detail.

### Adjusting some state when a prop changes[](#adjusting-some-state-when-a-prop-changes "Link for Adjusting some state when a prop changes ")

Sometimes, you might want to reset or adjust a part of the state on a prop change, but not all of it.

This `List` component receives a list of `items` as a prop, and maintains the selected item in the `selection` state variable. You want to reset the `selection` to `null` whenever the `items` prop receives a different array:

    function List(

This, too, is not ideal. Every time the `items` change, the `List` and its child components will render with a stale `selection` value at first. Then React will update the DOM and run the Effects. Finally, the `setSelection(null)` call will cause another re-render of the `List` and its child components, restarting this whole process again.

Start by deleting the Effect. Instead, adjust the state directly during rendering:

    function List(

[Storing information from previous renders](../reference/react/useState.html#storing-information-from-previous-renders) like this can be hard to understand, but it’s better than updating the same state in an Effect. In the above example, `setSelection` is called directly during a render. React will re-render the `List` _immediately_ after it exits with a `return` statement. React has not rendered the `List` children or updated the DOM yet, so this lets the `List` children skip rendering the stale `selection` value.

When you update a component during rendering, React throws away the returned JSX and immediately retries rendering. To avoid very slow cascading retries, React only lets you update the _same_ component’s state during a render. If you update another component’s state during a render, you’ll see an error. A condition like `items !== prevItems` is necessary to avoid loops. You may adjust state like this, but any other side effects (like changing the DOM or setting timeouts) should stay in event handlers or Effects to [keep components pure.](keeping-components-pure.html)

**Although this pattern is more efficient than an Effect, most components shouldn’t need it either.** No matter how you do it, adjusting state based on props or other state makes your data flow more difficult to understand and debug. Always check whether you can [reset all state with a key](#resetting-all-state-when-a-prop-changes) or [calculate everything during rendering](#updating-state-based-on-props-or-state) instead. For example, instead of storing (and resetting) the selected _item_, you can store the selected _item ID:_

    function List(

Now there is no need to “adjust” the state at all. If the item with the selected ID is in the list, it remains selected. If it’s not, the `selection` calculated during rendering will be `null` because no matching item was found. This behavior is different, but arguably better because most changes to `items` preserve the selection.

### Sharing logic between event handlers[](#sharing-logic-between-event-handlers "Link for Sharing logic between event handlers ")

Let’s say you have a product page with two buttons (Buy and Checkout) that both let you buy that product. You want to show a notification whenever the user puts the product in the cart. Calling `showNotification()` in both buttons’ click handlers feels repetitive so you might be tempted to place this logic in an Effect:

    function ProductPage(

This Effect is unnecessary. It will also most likely cause bugs. For example, let’s say that your app “remembers” the shopping cart between the page reloads. If you add a product to the cart once and refresh the page, the notification will appear again. It will keep appearing every time you refresh that product’s page. This is because `product.isInCart` will already be `true` on the page load, so the Effect above will call `showNotification()`.

**When you’re not sure whether some code should be in an Effect or in an event handler, ask yourself _why_ this code needs to run. Use Effects only for code that should run _because_ the component was displayed to the user.** In this example, the notification should appear because the user _pressed the button_, not because the page was displayed! Delete the Effect and put the shared logic into a function called from both event handlers:

    function ProductPage(

This both removes the unnecessary Effect and fixes the bug.

### Sending a POST request[](#sending-a-post-request "Link for Sending a POST request ")

This `Form` component sends two kinds of POST requests. It sends an analytics event when it mounts. When you fill in the form and click the Submit button, it will send a POST request to the `/api/register` endpoint:

    function Form() 

Let’s apply the same criteria as in the example before.

The analytics POST request should remain in an Effect. This is because the _reason_ to send the analytics event is that the form was displayed. (It would fire twice in development, but [see here](synchronizing-with-effects.html#sending-analytics) for how to deal with that.)

However, the `/api/register` POST request is not caused by the form being _displayed_. You only want to send the request at one specific moment in time: when the user presses the button. It should only ever happen _on that particular interaction_. Delete the second Effect and move that POST request into the event handler:

    function Form() 

When you choose whether to put some logic into an event handler or an Effect, the main question you need to answer is _what kind of logic_ it is from the user’s perspective. If this logic is caused by a particular interaction, keep it in the event handler. If it’s caused by the user _seeing_ the component on the screen, keep it in the Effect.

### Chains of computations[](#chains-of-computations "Link for Chains of computations ")

Sometimes you might feel tempted to chain Effects that each adjust a piece of state based on other state:

    function Game()   // ...

There are two problems with this code.

One problem is that it is very inefficient: the component (and its children) have to re-render between each `set` call in the chain. In the example above, in the worst case (`setCard` → render → `setGoldCardCount` → render → `setRound` → render → `setIsGameOver` → render) there are three unnecessary re-renders of the tree below.

Even if it weren’t slow, as your code evolves, you will run into cases where the “chain” you wrote doesn’t fit the new requirements. Imagine you are adding a way to step through the history of the game moves. You’d do it by updating each state variable to a value from the past. However, setting the `card` state to a value from the past would trigger the Effect chain again and change the data you’re showing. Such code is often rigid and fragile.

In this case, it’s better to calculate what you can during rendering, and adjust the state in the event handler:

    function Game()   // ...

This is a lot more efficient. Also, if you implement a way to view game history, now you will be able to set each state variable to a move from the past without triggering the Effect chain that adjusts every other value. If you need to reuse logic between several event handlers, you can [extract a function](#sharing-logic-between-event-handlers) and call it from those handlers.

Remember that inside event handlers, [state behaves like a snapshot.](state-as-a-snapshot.html) For example, even after you call `setRound(round + 1)`, the `round` variable will reflect the value at the time the user clicked the button. If you need to use the next value for calculations, define it manually like `const nextRound = round + 1`.

In some cases, you _can’t_ calculate the next state directly in the event handler. For example, imagine a form with multiple dropdowns where the options of the next dropdown depend on the selected value of the previous dropdown. Then, a chain of Effects is appropriate because you are synchronizing with network.

### Initializing the application[](#initializing-the-application "Link for Initializing the application ")

Some logic should only run once when the app loads.

You might be tempted to place it in an Effect in the top-level component:

    function App() 

However, you’ll quickly discover that it [runs twice in development.](synchronizing-with-effects.html#how-to-handle-the-effect-firing-twice-in-development) This can cause issues—for example, maybe it invalidates the authentication token because the function wasn’t designed to be called twice. In general, your components should be resilient to being remounted. This includes your top-level `App` component.

Although it may not ever get remounted in practice in production, following the same constraints in all components makes it easier to move and reuse code. If some logic must run _once per app load_ rather than _once per component mount_, add a top-level variable to track whether it has already executed:

    let didInit = false;function App() 

You can also run it during module initialization and before the app renders:

    if (typeof window !== 'undefined') 

Code at the top level runs once when your component is imported—even if it doesn’t end up being rendered. To avoid slowdown or surprising behavior when importing arbitrary components, don’t overuse this pattern. Keep app-wide initialization logic to root component modules like `App.js` or in your application’s entry point.

### Notifying parent components about state changes[](#notifying-parent-components-about-state-changes "Link for Notifying parent components about state changes ")

Let’s say you’re writing a `Toggle` component with an internal `isOn` state which can be either `true` or `false`. There are a few different ways to toggle it (by clicking or dragging). You want to notify the parent component whenever the `Toggle` internal state changes, so you expose an `onChange` event and call it from an Effect:

    function Toggle(

Like earlier, this is not ideal. The `Toggle` updates its state first, and React updates the screen. Then React runs the Effect, which calls the `onChange` function passed from a parent component. Now the parent component will update its own state, starting another render pass. It would be better to do everything in a single pass.

Delete the Effect and instead update the state of _both_ components within the same event handler:

    function Toggle(

With this approach, both the `Toggle` component and its parent component update their state during the event. React [batches updates](queueing-a-series-of-state-updates.html) from different components together, so there will only be one render pass.

You might also be able to remove the state altogether, and instead receive `isOn` from the parent component:

    // ✅ Also good: the component is fully controlled by its parentfunction Toggle(

[“Lifting state up”](sharing-state-between-components.html) lets the parent component fully control the `Toggle` by toggling the parent’s own state. This means the parent component will have to contain more logic, but there will be less state overall to worry about. Whenever you try to keep two different state variables synchronized, try lifting state up instead!

### Passing data to the parent[](#passing-data-to-the-parent "Link for Passing data to the parent ")

This `Child` component fetches some data and then passes it to the `Parent` component in an Effect:

    function Parent() 

In React, data flows from the parent components to their children. When you see something wrong on the screen, you can trace where the information comes from by going up the component chain until you find which component passes the wrong prop or has the wrong state. When child components update the state of their parent components in Effects, the data flow becomes very difficult to trace. Since both the child and the parent need the same data, let the parent component fetch that data, and _pass it down_ to the child instead:

    function Parent() 

This is simpler and keeps the data flow predictable: the data flows down from the parent to the child.

### Subscribing to an external store[](#subscribing-to-an-external-store "Link for Subscribing to an external store ")

Sometimes, your components may need to subscribe to some data outside of the React state. This data could be from a third-party library or a built-in browser API. Since this data can change without React’s knowledge, you need to manually subscribe your components to it. This is often done with an Effect, for example:

    function useOnlineStatus() 

Here, the component subscribes to an external data store (in this case, the browser `navigator.onLine` API). Since this API does not exist on the server (so it can’t be used for the initial HTML), initially the state is set to `true`. Whenever the value of that data store changes in the browser, the component updates its state.

Although it’s common to use Effects for this, React has a purpose-built Hook for subscribing to an external store that is preferred instead. Delete the Effect and replace it with a call to [`useSyncExternalStore`](../reference/react/useSyncExternalStore.html):

    function subscribe(callback) 

This approach is less error-prone than manually syncing mutable data to React state with an Effect. Typically, you’ll write a custom Hook like `useOnlineStatus()` above so that you don’t need to repeat this code in the individual components. [Read more about subscribing to external stores from React components.](../reference/react/useSyncExternalStore.html)

### Fetching data[](#fetching-data "Link for Fetching data ")

Many apps use Effects to kick off data fetching. It is quite common to write a data fetching Effect like this:

    function SearchResults(

You _don’t_ need to move this fetch to an event handler.

This might seem like a contradiction with the earlier examples where you needed to put the logic into the event handlers! However, consider that it’s not _the typing event_ that’s the main reason to fetch. Search inputs are often prepopulated from the URL, and the user might navigate Back and Forward without touching the input.

It doesn’t matter where `page` and `query` come from. While this component is visible, you want to keep `results` [synchronized](synchronizing-with-effects.html) with data from the network for the current `page` and `query`. This is why it’s an Effect.

However, the code above has a bug. Imagine you type `"hello"` fast. Then the `query` will change from `"h"`, to `"he"`, `"hel"`, `"hell"`, and `"hello"`. This will kick off separate fetches, but there is no guarantee about which order the responses will arrive in. For example, the `"hell"` response may arrive _after_ the `"hello"` response. Since it will call `setResults()` last, you will be displaying the wrong search results. This is called a [“race condition”](https://en.wikipedia.org/wiki/Race_condition): two different requests “raced” against each other and came in a different order than you expected.

**To fix the race condition, you need to [add a cleanup function](synchronizing-with-effects.html#fetching-data) to ignore stale responses:**

    function SearchResults(

This ensures that when your Effect fetches data, all responses except the last requested one will be ignored.

Handling race conditions is not the only difficulty with implementing data fetching. You might also want to think about caching responses (so that the user can click Back and see the previous screen instantly), how to fetch data on the server (so that the initial server-rendered HTML contains the fetched content instead of a spinner), and how to avoid network waterfalls (so that a child can fetch data without waiting for every parent).

**These issues apply to any UI library, not just React. Solving them is not trivial, which is why modern [frameworks](start-a-new-react-project.html#production-grade-react-frameworks) provide more efficient built-in data fetching mechanisms than fetching data in Effects.**

If you don’t use a framework (and don’t want to build your own) but would like to make data fetching from Effects more ergonomic, consider extracting your fetching logic into a custom Hook like in this example:

    function SearchResults(

You’ll likely also want to add some logic for error handling and to track whether the content is loading. You can build a Hook like this yourself or use one of the many solutions already available in the React ecosystem. **Although this alone won’t be as efficient as using a framework’s built-in data fetching mechanism, moving the data fetching logic into a custom Hook will make it easier to adopt an efficient data fetching strategy later.**

In general, whenever you have to resort to writing Effects, keep an eye out for when you can extract a piece of functionality into a custom Hook with a more declarative and purpose-built API like `useData` above. The fewer raw `useEffect` calls you have in your components, the easier you will find to maintain your application.

Recap[](#recap "Link for Recap")
--------------------------------

*   If you can calculate something during render, you don’t need an Effect.
*   To cache expensive calculations, add `useMemo` instead of `useEffect`.
*   To reset the state of an entire component tree, pass a different `key` to it.
*   To reset a particular bit of state in response to a prop change, set it during rendering.
*   Code that runs because a component was _displayed_ should be in Effects, the rest should be in events.
*   If you need to update the state of several components, it’s better to do it during a single event.
*   Whenever you try to synchronize state variables in different components, consider lifting state up.
*   You can fetch data with Effects, but you need to implement cleanup to avoid race conditions.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Transform data without Effects 2. Cache a calculation without Effects 3. Reset state without Effects 4. Submit a form without Effects

#### 

Challenge 1 of 4:

Transform data without Effects[](#transform-data-without-effects "Link for this heading")

The `TodoList` below displays a list of todos. When the “Show only active todos” checkbox is ticked, completed todos are not displayed in the list. Regardless of which todos are visible, the footer displays the count of todos that are not yet completed.

Simplify this component by removing all the unnecessary state and Effects.

App.jstodos.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './todos.js';

export default function TodoList() {
  const \[todos, setTodos\] = useState(initialTodos);
  const \[showActive, setShowActive\] = useState(false);
  const \[activeTodos, setActiveTodos\] = useState(\[\]);
  const \[visibleTodos, setVisibleTodos\] = useState(\[\]);
  const \[footer, setFooter\] = useState(null);

  useEffect(() \=> {
    setActiveTodos(todos.filter(todo \=> !todo.completed));
  }, \[todos\]);

  useEffect(() \=> {
    setVisibleTodos(showActive ? activeTodos : todos);
  }, \[showActive, todos, activeTodos\]);

  useEffect(() \=> {
    setFooter(
      <footer\>
         todos left
      </footer\>
    );
  }, \[activeTodos\]);

  return (
    <\>
      <label\>
        <input
          type\="checkbox"
          checked\=
          onChange\=
        />
        Show only active todos
      </label\>
      <NewTodo onAdd\= />
      <ul\>
        {visibleTodos.map(todo \=> (
          <li key\=\>
            
          </li\>
        ))}
      </ul\>
      
    </\>
  );
}

function NewTodo() {
  const \[text, setText\] = useState('');

  function handleAddClick() {
    setText('');
    onAdd(createTodo(text));
  }

  return (
    <\>
      <input value\= />
      <button onClick\=\>
        Add
      </button\>
    </\>
  );
}

Show more

Show hint Show solution

Next Challenge

[PreviousSynchronizing with Effects](synchronizing-with-effects.html)[NextLifecycle of Reactive Effects](lifecycle-of-reactive-effects.html)

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
*   [How to remove unnecessary Effects](#how-to-remove-unnecessary-effects)
*   [Updating state based on props or state](#updating-state-based-on-props-or-state)
*   [Caching expensive calculations](#caching-expensive-calculations)
*   [Resetting all state when a prop changes](#resetting-all-state-when-a-prop-changes)
*   [Adjusting some state when a prop changes](#adjusting-some-state-when-a-prop-changes)
*   [Sharing logic between event handlers](#sharing-logic-between-event-handlers)
*   [Sending a POST request](#sending-a-post-request)
*   [Chains of computations](#chains-of-computations)
*   [Initializing the application](#initializing-the-application)
*   [Notifying parent components about state changes](#notifying-parent-components-about-state-changes)
*   [Passing data to the parent](#passing-data-to-the-parent)
*   [Subscribing to an external store](#subscribing-to-an-external-store)
*   [Fetching data](#fetching-data)
*   [Recap](#recap)
*   [Challenges](#challenges)

