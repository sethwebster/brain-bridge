State: A Component's Memory – React

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

State: A Component's Memory[](#undefined "Link for this heading")
=================================================================

Components often need to change what’s on the screen as a result of an interaction. Typing into the form should update the input field, clicking “next” on an image carousel should change which image is displayed, clicking “buy” should put a product in the shopping cart. Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called _state_.

### You will learn

*   How to add a state variable with the [`useState`](../reference/react/useState.html) Hook
*   What pair of values the `useState` Hook returns
*   How to add more than one state variable
*   Why state is called local

When a regular variable isn’t enough[](#when-a-regular-variable-isnt-enough "Link for When a regular variable isn’t enough ")
-----------------------------------------------------------------------------------------------------------------------------

Here’s a component that renders a sculpture image. Clicking the “Next” button should show the next sculpture by changing the `index` to `1`, then `2`, and so on. However, this **won’t work** (you can try it!):

App.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from './data.js';

export default function Gallery() {
  let index = 0;

  function handleClick() {
    index = index + 1;
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
      <img 
        src\= 
        alt\=
      />
      <p\>
        
      </p\>
    </\>
  );
}

Show more

The `handleClick` event handler is updating a local variable, `index`. But two things prevent that change from being visible:

1.  **Local variables don’t persist between renders.** When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
2.  **Changes to local variables won’t trigger renders.** React doesn’t realize it needs to render the component again with the new data.

To update a component with new data, two things need to happen:

1.  **Retain** the data between renders.
2.  **Trigger** React to render the component with new data (re-rendering).

The [`useState`](../reference/react/useState.html) Hook provides those two things:

1.  A **state variable** to retain the data between renders.
2.  A **state setter function** to update the variable and trigger React to render the component again.

Adding a state variable[](#adding-a-state-variable "Link for Adding a state variable ")
---------------------------------------------------------------------------------------

To add a state variable, import `useState` from React at the top of the file:

    import  from 'react';

Then, replace this line:

    let index = 0;

with

    const [index, setIndex] = useState(0);

`index` is a state variable and `setIndex` is the setter function.

> The `[` and `]` syntax here is called [array destructuring](https://javascript.info/destructuring-assignment) and it lets you read values from an array. The array returned by `useState` always has exactly two items.

This is how they work together in `handleClick`:

    function handleClick() 

Now clicking the “Next” button switches the current sculpture:

App.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './data.js';

export default function Gallery() {
  const \[index, setIndex\] = useState(0);

  function handleClick() {
    setIndex(index + 1);
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
      <img 
        src\= 
        alt\=
      />
      <p\>
        
      </p\>
    </\>
  );
}

Show more

### Meet your first Hook[](#meet-your-first-hook "Link for Meet your first Hook ")

In React, `useState`, as well as any other function starting with ”`use`”, is called a Hook.

_Hooks_ are special functions that are only available while React is [rendering](render-and-commit.html#step-1-trigger-a-render) (which we’ll get into in more detail on the next page). They let you “hook into” different React features.

State is just one of those features, but you will meet the other Hooks later.

### Pitfall

**Hooks—functions starting with `use`—can only be called at the top level of your components or [your own Hooks.](reusing-logic-with-custom-hooks.html)** You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions, but it’s helpful to think of them as unconditional declarations about your component’s needs. You “use” React features at the top of your component similar to how you “import” modules at the top of your file.

### Anatomy of `useState`[](#anatomy-of-usestate "Link for this heading")

When you call [`useState`](../reference/react/useState.html), you are telling React that you want this component to remember something:

    const [index, setIndex] = useState(0);

In this case, you want React to remember `index`.

### Note

The convention is to name this pair like `const [something, setSomething]`. You could name it anything you like, but conventions make things easier to understand across projects.

The only argument to `useState` is the **initial value** of your state variable. In this example, the `index`’s initial value is set to `0` with `useState(0)`.

Every time your component renders, `useState` gives you an array containing two values:

1.  The **state variable** (`index`) with the value you stored.
2.  The **state setter function** (`setIndex`) which can update the state variable and trigger React to render the component again.

Here’s how that happens in action:

    const [index, setIndex] = useState(0);

1.  **Your component renders the first time.** Because you passed `0` to `useState` as the initial value for `index`, it will return `[0, setIndex]`. React remembers `0` is the latest state value.
2.  **You update the state.** When a user clicks the button, it calls `setIndex(index + 1)`. `index` is `0`, so it’s `setIndex(1)`. This tells React to remember `index` is `1` now and triggers another render.
3.  **Your component’s second render.** React still sees `useState(0)`, but because React _remembers_ that you set `index` to `1`, it returns `[1, setIndex]` instead.
4.  And so on!

Giving a component multiple state variables[](#giving-a-component-multiple-state-variables "Link for Giving a component multiple state variables ")
---------------------------------------------------------------------------------------------------------------------------------------------------

You can have as many state variables of as many types as you like in one component. This component has two state variables, a number `index` and a boolean `showMore` that’s toggled when you click “Show details”:

App.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './data.js';

export default function Gallery() {
  const \[index, setIndex\] = useState(0);
  const \[showMore, setShowMore\] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
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

It is a good idea to have multiple state variables if their state is unrelated, like `index` and `showMore` in this example. But if you find that you often change two state variables together, it might be easier to combine them into one. For example, if you have a form with many fields, it’s more convenient to have a single state variable that holds an object than state variable per field. Read [Choosing the State Structure](choosing-the-state-structure.html) for more tips.

##### Deep Dive

#### How does React know which state to return?[](#how-does-react-know-which-state-to-return "Link for How does React know which state to return? ")

Show Details

You might have noticed that the `useState` call does not receive any information about _which_ state variable it refers to. There is no “identifier” that is passed to `useState`, so how does it know which of the state variables to return? Does it rely on some magic like parsing your functions? The answer is no.

Instead, to enable their concise syntax, Hooks **rely on a stable call order on every render of the same component.** This works well in practice because if you follow the rule above (“only call Hooks at the top level”), Hooks will always be called in the same order. Additionally, a [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) catches most mistakes.

Internally, React holds an array of state pairs for every component. It also maintains the current pair index, which is set to `0` before rendering. Each time you call `useState`, React gives you the next state pair and increments the index. You can read more about this mechanism in [React Hooks: Not Magic, Just Arrays.](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)

This example **doesn’t use React** but it gives you an idea of how `useState` works internally:

index.jsindex.html

index.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

let componentHooks = \[\];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks\[currentHookIndex\];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = \[initialState, setState\];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair\[0\] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks\[currentHookIndex\] = pair;
  currentHookIndex++;
  return pair;
}

function Gallery() {
  // Each useState() call will get the next pair.
  const \[index, setIndex\] = useState(0);
  const \[showMore, setShowMore\] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  let sculpture = sculptureList\[index\];
  // This example doesn't use React, so
  // return an output object instead of JSX.
  return {
    onNextClick: handleNextClick,
    onMoreClick: handleMoreClick,
    header: \`$\`,
    counter: \`$\`,
    more: \`$ details\`,
    description: showMore ? sculpture.description : null,
    imageSrc: sculpture.url,
    imageAlt: sculpture.alt
  };
}

function updateDOM() {
  // Reset the current Hook index
  // before rendering the component.
  currentHookIndex = 0;
  let output = Gallery();

  // Update the DOM to match the output.
  // This is the part React does for you.
  nextButton.onclick = output.onNextClick;
  header.textContent = output.header;
  moreButton.onclick = output.onMoreClick;
  moreButton.textContent = output.more;
  image.src = output.imageSrc;
  image.alt = output.imageAlt;
  if (output.description !== null) {
    description.textContent = output.description;
    description.style.display = '';
  } else {
    description.style.display = 'none';
  }
}

let nextButton = document.getElementById('nextButton');
let header = document.getElementById('header');
let moreButton = document.getElementById('moreButton');
let description = document.getElementById('description');
let image = document.getElementById('image');
let sculptureList = \[{
  name: 'Homenaje a la Neurocirugía',
  artist: 'Marta Colvin Andrade',
  description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
  url: 'https://i.imgur.com/Mx7dA2Y.jpg',
  alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
}, {
  name: 'Floralis Genérica',
  artist: 'Eduardo Catalano',
  description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
  url: 'https://i.imgur.com/ZF6s192m.jpg',
  alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
}, {
  name: 'Eternal Presence',
  artist: 'John Woodrow Wilson',
  description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
  url: 'https://i.imgur.com/aTtVpES.jpg',
  alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}, {
  name: 'Moai',
  artist: 'Unknown Artist',
  description: 'Located on the Easter Island, there are 1,000 moai, or extant monumental statues, created by the early Rapa Nui people, which some believe represented deified ancestors.',
  url: 'https://i.imgur.com/RCwLEoQm.jpg',
  alt: 'Three monumental stone busts with the heads that are disproportionately large with somber faces.'
}, {
  name: 'Blue Nana',
  artist: 'Niki de Saint Phalle',
  description: 'The Nanas are triumphant creatures, symbols of femininity and maternity. Initially, Saint Phalle used fabric and found objects for the Nanas, and later on introduced polyester to achieve a more vibrant effect.',
  url: 'https://i.imgur.com/Sd1AgUOm.jpg',
  alt: 'A large mosaic sculpture of a whimsical dancing female figure in a colorful costume emanating joy.'
}, {
  name: 'Ultimate Form',
  artist: 'Barbara Hepworth',
  description: 'This abstract bronze sculpture is a part of The Family of Man series located at Yorkshire Sculpture Park. Hepworth chose not to create literal representations of the world but developed abstract forms inspired by people and landscapes.',
  url: 'https://i.imgur.com/2heNQDcm.jpg',
  alt: 'A tall sculpture made of three elements stacked on each other reminding of a human figure.'
}, {
  name: 'Cavaliere',
  artist: 'Lamidi Olonade Fakeye',
  description: "Descended from four generations of woodcarvers, Fakeye's work blended traditional and contemporary Yoruba themes.",
  url: 'https://i.imgur.com/wIdGuZwm.png',
  alt: 'An intricate wood sculpture of a warrior with a focused face on a horse adorned with patterns.'
}, {
  name: 'Big Bellies',
  artist: 'Alina Szapocznikow',
  description: "Szapocznikow is known for her sculptures of the fragmented body as a metaphor for the fragility and impermanence of youth and beauty. This sculpture depicts two very realistic large bellies stacked on top of each other, each around five feet (1,5m) tall.",
  url: 'https://i.imgur.com/AlHTAdDm.jpg',
  alt: 'The sculpture reminds a cascade of folds, quite different from bellies in classical sculptures.'
}, {
  name: 'Terracotta Army',
  artist: 'Unknown Artist',
  description: 'The Terracotta Army is a collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China. The army consisted of more than 8,000 soldiers, 130 chariots with 520 horses, and 150 cavalry horses.',
  url: 'https://i.imgur.com/HMFmH6m.jpg',
  alt: '12 terracotta sculptures of solemn warriors, each with a unique facial expression and armor.'
}, {
  name: 'Lunar Landscape',
  artist: 'Louise Nevelson',
  description: 'Nevelson was known for scavenging objects from New York City debris, which she would later assemble into monumental constructions. In this one, she used disparate parts like a bedpost, juggling pin, and seat fragment, nailing and gluing them into boxes that reflect the influence of Cubism’s geometric abstraction of space and form.',
  url: 'https://i.imgur.com/rN7hY6om.jpg',
  alt: 'A black matte sculpture where the individual elements are initially indistinguishable.'
}, {
  name: 'Aureole',
  artist: 'Ranjani Shettar',
  description: 'Shettar merges the traditional and the modern, the natural and the industrial. Her art focuses on the relationship between man and nature. Her work was described as compelling both abstractly and figuratively, gravity defying, and a "fine synthesis of unlikely materials."',
  url: 'https://i.imgur.com/okTpbHhm.jpg',
  alt: 'A pale wire-like sculpture mounted on concrete wall and descending on the floor. It appears light.'
}, {
  name: 'Hippos',
  artist: 'Taipei Zoo',
  description: 'The Taipei Zoo commissioned a Hippo Square featuring submerged hippos at play.',
  url: 'https://i.imgur.com/6o5Vuyu.jpg',
  alt: 'A group of bronze hippo sculptures emerging from the sett sidewalk as if they were swimming.'
}\];

// Make UI match the initial state.
updateDOM();

Show more

You don’t have to understand it to use React, but you might find this a helpful mental model.

State is isolated and private[](#state-is-isolated-and-private "Link for State is isolated and private ")
---------------------------------------------------------------------------------------------------------

State is local to a component instance on the screen. In other words, **if you render the same component twice, each copy will have completely isolated state!** Changing one of them will not affect the other.

In this example, the `Gallery` component from earlier is rendered twice with no changes to its logic. Try clicking the buttons inside each of the galleries. Notice that their state is independent:

App.jsGallery.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import Gallery from './Gallery.js';

export default function Page() {
  return (
    <div className\="Page"\>
      <Gallery />
      <Gallery />
    </div\>
  );
}

This is what makes state different from regular variables that you might declare at the top of your module. State is not tied to a particular function call or a place in the code, but it’s “local” to the specific place on the screen. You rendered two `<Gallery />` components, so their state is stored separately.

Also notice how the `Page` component doesn’t “know” anything about the `Gallery` state or even whether it has any. Unlike props, **state is fully private to the component declaring it.** The parent component can’t change it. This lets you add state to any component or remove it without impacting the rest of the components.

What if you wanted both galleries to keep their states in sync? The right way to do it in React is to _remove_ state from child components and add it to their closest shared parent. The next few pages will focus on organizing state of a single component, but we will return to this topic in [Sharing State Between Components.](sharing-state-between-components.html)

Recap[](#recap "Link for Recap")
--------------------------------

*   Use a state variable when a component needs to “remember” some information between renders.
*   State variables are declared by calling the `useState` Hook.
*   Hooks are special functions that start with `use`. They let you “hook into” React features like state.
*   Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including `useState`, is only valid at the top level of a component or another Hook.
*   The `useState` Hook returns a pair of values: the current state and the function to update it.
*   You can have more than one state variable. Internally, React matches them up by their order.
*   State is private to the component. If you render it in two places, each copy gets its own state.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Complete the gallery 2. Fix stuck form inputs 3. Fix a crash 4. Remove unnecessary state

#### 

Challenge 1 of 4:

Complete the gallery[](#complete-the-gallery "Link for this heading")

When you press “Next” on the last sculpture, the code crashes. Fix the logic to prevent the crash. You may do this by adding extra logic to event handler or by disabling the button when the action is not possible.

After fixing the crash, add a “Previous” button that shows the previous sculpture. It shouldn’t crash on the first sculpture.

App.jsdata.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';
import  from './data.js';

export default function Gallery() {
  const \[index, setIndex\] = useState(0);
  const \[showMore, setShowMore\] = useState(false);

  function handleNextClick() {
    setIndex(index + 1);
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

Show solutionNext Challenge

[PreviousResponding to Events](responding-to-events.html)[NextRender and Commit](render-and-commit.html)

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
*   [When a regular variable isn’t enough](#when-a-regular-variable-isnt-enough)
*   [Adding a state variable](#adding-a-state-variable)
*   [Meet your first Hook](#meet-your-first-hook)
*   [Anatomy of `useState`](#anatomy-of-usestate)
*   [Giving a component multiple state variables](#giving-a-component-multiple-state-variables)
*   [State is isolated and private](#state-is-isolated-and-private)
*   [Recap](#recap)
*   [Challenges](#challenges)

