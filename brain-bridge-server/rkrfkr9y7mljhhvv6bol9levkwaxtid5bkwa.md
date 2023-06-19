Updating Arrays in State – React

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

Updating Arrays in State[](#undefined "Link for this heading")
==============================================================

Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array.

### You will learn

*   How to add, remove, or change items in an array in React state
*   How to update an object inside of an array
*   How to make array copying less repetitive with Immer

Updating arrays without mutation[](#updating-arrays-without-mutation "Link for Updating arrays without mutation ")
------------------------------------------------------------------------------------------------------------------

In JavaScript, arrays are just another kind of object. [Like with objects](updating-objects-in-state.html), **you should treat arrays in React state as read-only.** This means that you shouldn’t reassign items inside an array like `arr[0] = 'bird'`, and you also shouldn’t use methods that mutate the array, such as `push()` and `pop()`.

Instead, every time you want to update an array, you’ll want to pass a _new_ array to your state setting function. To do that, you can create a new array from the original array in your state by calling its non-mutating methods like `filter()` and `map()`. Then you can set your state to the resulting new array.

Here is a reference table of common array operations. When dealing with arrays inside React state, you will need to avoid the methods in the left column, and instead prefer the methods in the right column:

avoid (mutates the array)

prefer (returns a new array)

adding

`push`, `unshift`

`concat`, `[...arr]` spread syntax ([example](#adding-to-an-array))

removing

`pop`, `shift`, `splice`

`filter`, `slice` ([example](#removing-from-an-array))

replacing

`splice`, `arr[i] = ...` assignment

`map` ([example](#replacing-items-in-an-array))

sorting

`reverse`, `sort`

copy the array first ([example](#making-other-changes-to-an-array))

Alternatively, you can [use Immer](#write-concise-update-logic-with-immer) which lets you use methods from both columns.

### Pitfall

Unfortunately, [`slice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) and [`splice`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) are named similarly but are very different:

*   `slice` lets you copy an array or a part of it.
*   `splice` **mutates** the array (to insert or delete items).

In React, you will be using `slice` (no `p`!) a lot more often because you don’t want to mutate objects or arrays in state. [Updating Objects](updating-objects-in-state.html) explains what mutation is and why it’s not recommended for state.

### Adding to an array[](#adding-to-an-array "Link for Adding to an array ")

`push()` will mutate an array, which you don’t want:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let nextId = 0;

export default function List() {
  const \[name, setName\] = useState('');
  const \[artists, setArtists\] = useState(\[\]);

  return (
    <\>
      <h1\>Inspiring sculptors:</h1\>
      <input
        value\=
        onChange\=
      />
      <button onClick\={() \=> {
        artists.push({
          id: nextId++,
          name: name,
        });
      }}\>Add</button\>
      <ul\>
        {artists.map(artist \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

Instead, create a _new_ array which contains the existing items _and_ a new item at the end. There are multiple ways to do this, but the easiest one is to use the `...` [array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) syntax:

    setArtists( // Replace the state  [ // with a new array    ...artists, // that contains all the old items     // and one new item at the end  ]);

Now it works correctly:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let nextId = 0;

export default function List() {
  const \[name, setName\] = useState('');
  const \[artists, setArtists\] = useState(\[\]);

  return (
    <\>
      <h1\>Inspiring sculptors:</h1\>
      <input
        value\=
        onChange\=
      />
      <button onClick\={() \=> {
        setArtists(\[
          ...artists,
          
        \]);
      }}\>Add</button\>
      <ul\>
        {artists.map(artist \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

The array spread syntax also lets you prepend an item by placing it _before_ the original `...artists`:

    setArtists([  ,  ...artists // Put old items at the end]);

In this way, spread can do the job of both `push()` by adding to the end of an array and `unshift()` by adding to the beginning of an array. Try it in the sandbox above!

### Removing from an array[](#removing-from-an-array "Link for Removing from an array ")

The easiest way to remove an item from an array is to _filter it out_. In other words, you will produce a new array that will not contain that item. To do this, use the `filter` method, for example:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let initialArtists = \[
  ,
  ,
  ,
\];

export default function List() {
  const \[artists, setArtists\] = useState(
    initialArtists
  );

  return (
    <\>
      <h1\>Inspiring sculptors:</h1\>
      <ul\>
        {artists.map(artist \=> (
          <li key\=\>
            
            <button onClick\={() \=> {
              setArtists(
                artists.filter(a \=>
                  a.id !== artist.id
                )
              );
            }}\>
              Delete
            </button\>
          </li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

Click the “Delete” button a few times, and look at its click handler.

    setArtists(  artists.filter(a => a.id !== artist.id));

Here, `artists.filter(a => a.id !== artist.id)` means “create an array that consists of those `artists` whose IDs are different from `artist.id`”. In other words, each artist’s “Delete” button will filter _that_ artist out of the array, and then request a re-render with the resulting array. Note that `filter` does not modify the original array.

### Transforming an array[](#transforming-an-array "Link for Transforming an array ")

If you want to change some or all items of the array, you can use `map()` to create a **new** array. The function you will pass to `map` can decide what to do with each item, based on its data or its index (or both).

In this example, an array holds coordinates of two circles and a square. When you press the button, it moves only the circles down by 50 pixels. It does this by producing a new array of data using `map()`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let initialShapes = \[
  ,
  ,
  ,
\];

export default function ShapeEditor() {
  const \[shapes, setShapes\] = useState(
    initialShapes
  );

  function handleClick() {
    const nextShapes = shapes.map(shape \=> {
      if (shape.type === 'square') {
        // No change
        return shape;
      } else {
        // Return a new circle 50px below
        return {
          ...shape,
          y: shape.y + 50,
        };
      }
    });
    // Re-render with the new array
    setShapes(nextShapes);
  }

  return (
    <\>
      <button onClick\=\>
        Move circles down!
      </button\>
      {shapes.map(shape \=> (
        <div
          key\=
          style\={{
          background: 'purple',
          position: 'absolute',
          left: shape.x,
          top: shape.y,
          borderRadius:
            shape.type === 'circle'
              ? '50%' : '',
          width: 20,
          height: 20,
        }} />
      ))}
    </\>
  );
}

Show more

### Replacing items in an array[](#replacing-items-in-an-array "Link for Replacing items in an array ")

It is particularly common to want to replace one or more items in an array. Assignments like `arr[0] = 'bird'` are mutating the original array, so instead you’ll want to use `map` for this as well.

To replace an item, create a new array with `map`. Inside your `map` call, you will receive the item index as the second argument. Use it to decide whether to return the original item (the first argument) or something else:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let initialCounters = \[
  0, 0, 0
\];

export default function CounterList() {
  const \[counters, setCounters\] = useState(
    initialCounters
  );

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) \=> {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }

  return (
    <ul\>
      {counters.map((counter, i) \=> (
        <li key\=\>
          
          <button onClick\={() \=> {
            handleIncrementClick(i);
          }}\>+1</button\>
        </li\>
      ))}
    </ul\>
  );
}

Show more

### Inserting into an array[](#inserting-into-an-array "Link for Inserting into an array ")

Sometimes, you may want to insert an item at a particular position that’s neither at the beginning nor at the end. To do this, you can use the `...` array spread syntax together with the `slice()` method. The `slice()` method lets you cut a “slice” of the array. To insert an item, you will create an array that spreads the slice _before_ the insertion point, then the new item, and then the rest of the original array.

In this example, the Insert button always inserts at the index `1`:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

let nextId = 3;
const initialArtists = \[
  ,
  ,
  ,
\];

export default function List() {
  const \[name, setName\] = useState('');
  const \[artists, setArtists\] = useState(
    initialArtists
  );

  function handleClick() {
    const insertAt = 1; // Could be any index
    const nextArtists = \[
      // Items before the insertion point:
      ...artists.slice(0, insertAt),
      // New item:
      ,
      // Items after the insertion point:
      ...artists.slice(insertAt)
    \];
    setArtists(nextArtists);
    setName('');
  }

  return (
    <\>
      <h1\>Inspiring sculptors:</h1\>
      <input
        value\=
        onChange\=
      />
      <button onClick\=\>
        Insert
      </button\>
      <ul\>
        {artists.map(artist \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

### Making other changes to an array[](#making-other-changes-to-an-array "Link for Making other changes to an array ")

There are some things you can’t do with the spread syntax and non-mutating methods like `map()` and `filter()` alone. For example, you may want to reverse or sort an array. The JavaScript `reverse()` and `sort()` methods are mutating the original array, so you can’t use them directly.

**However, you can copy the array first, and then make changes to it.**

For example:

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

export default function List() {
  const \[list, setList\] = useState(initialList);

  function handleClick() {
    const nextList = \[...list\];
    nextList.reverse();
    setList(nextList);
  }

  return (
    <\>
      <button onClick\=\>
        Reverse
      </button\>
      <ul\>
        {list.map(artwork \=> (
          <li key\=</li\>
        ))}
      </ul\>
    </\>
  );
}

Show more

Here, you use the `[...list]` spread syntax to create a copy of the original array first. Now that you have a copy, you can use mutating methods like `nextList.reverse()` or `nextList.sort()`, or even assign individual items with `nextList[0] = "something"`.

However, **even if you copy an array, you can’t mutate existing items _inside_ of it directly.** This is because copying is shallow—the new array will contain the same items as the original one. So if you modify an object inside the copied array, you are mutating the existing state. For example, code like this is a problem.

    const nextList = [...list];nextList[0].seen = true; // Problem: mutates list[0]setList(nextList);

Although `nextList` and `list` are two different arrays, **`nextList[0]` and `list[0]` point to the same object.** So by changing `nextList[0].seen`, you are also changing `list[0].seen`. This is a state mutation, which you should avoid! You can solve this issue in a similar way to [updating nested JavaScript objects](updating-objects-in-state.html#updating-a-nested-object)—by copying individual items you want to change instead of mutating them. Here’s how.

Updating objects inside arrays[](#updating-objects-inside-arrays "Link for Updating objects inside arrays ")
------------------------------------------------------------------------------------------------------------

Objects are not _really_ located “inside” arrays. They might appear to be “inside” in code, but each object in an array is a separate value, to which the array “points”. This is why you need to be careful when changing nested fields like `list[0]`. Another person’s artwork list may point to the same element of the array!

**When updating nested state, you need to create copies from the point where you want to update, and all the way up to the top level.** Let’s see how this works.

In this example, two separate artwork lists have the same initial state. They are supposed to be isolated, but because of a mutation, their state is accidentally shared, and checking a box in one list affects the other list:

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
  const \[myList, setMyList\] = useState(initialList);
  const \[yourList, setYourList\] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    const myNextList = \[...myList\];
    const artwork = myNextList.find(
      a \=> a.id === artworkId
    );
    artwork.seen = nextSeen;
    setMyList(myNextList);
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = \[...yourList\];
    const artwork = yourNextList.find(
      a \=> a.id === artworkId
    );
    artwork.seen = nextSeen;
    setYourList(yourNextList);
  }

  return (
    <\>
      <h1\>Art Bucket List</h1\>
      <h2\>My list of art to see:</h2\>
      <ItemList
        artworks\=
        onToggle\= />
      <h2\>Your list of art to see:</h2\>
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

The problem is in code like this:

    const myNextList = [...myList];const artwork = myNextList.find(a => a.id === artworkId);artwork.seen = nextSeen; // Problem: mutates an existing itemsetMyList(myNextList);

Although the `myNextList` array itself is new, the _items themselves_ are the same as in the original `myList` array. So changing `artwork.seen` changes the _original_ artwork item. That artwork item is also in `yourList`, which causes the bug. Bugs like this can be difficult to think about, but thankfully they disappear if you avoid mutating state.

**You can use `map` to substitute an old item with its updated version without mutation.**

    setMyList(myList.map(artwork => ));

Here, `...` is the object spread syntax used to [create a copy of an object.](updating-objects-in-state.html#copying-objects-with-the-spread-syntax)

With this approach, none of the existing state items are being mutated, and the bug is fixed:

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
  const \[myList, setMyList\] = useState(initialList);
  const \[yourList, setYourList\] = useState(
    initialList
  );

  function handleToggleMyList(artworkId, nextSeen) {
    setMyList(myList.map(artwork \=> {
      if (artwork.id === artworkId) {
        // Create a \*new\* object with changes
        return ;
      } else {
        // No changes
        return artwork;
      }
    }));
  }

  function handleToggleYourList(artworkId, nextSeen) {
    setYourList(yourList.map(artwork \=> {
      if (artwork.id === artworkId) {
        // Create a \*new\* object with changes
        return ;
      } else {
        // No changes
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
      <h2\>Your list of art to see:</h2\>
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

In general, **you should only mutate objects that you have just created.** If you were inserting a _new_ artwork, you could mutate it, but if you’re dealing with something that’s already in state, you need to make a copy.

### Write concise update logic with Immer[](#write-concise-update-logic-with-immer "Link for Write concise update logic with Immer ")

Updating nested arrays without mutation can get a little bit repetitive. [Just as with objects](updating-objects-in-state.html#write-concise-update-logic-with-immer):

*   Generally, you shouldn’t need to update state more than a couple of levels deep. If your state objects are very deep, you might want to [restructure them differently](choosing-the-state-structure.html#avoid-deeply-nested-state) so that they are flat.
*   If you don’t want to change your state structure, you might prefer to use [Immer](https://github.com/immerjs/use-immer), which lets you write using the convenient but mutating syntax and takes care of producing the copies for you.

Here is the Art Bucket List example rewritten with Immer:

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
  const \[myList, updateMyList\] = useImmer(
    initialList
  );
  const \[yourList, updateYourList\] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft \=> {
      const artwork = draft.find(a \=>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft \=> {
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
      <h2\>Your list of art to see:</h2\>
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

Note how with Immer, **mutation like `artwork.seen = nextSeen` is now okay:**

    updateMyTodos(draft => );

This is because you’re not mutating the _original_ state, but you’re mutating a special `draft` object provided by Immer. Similarly, you can apply mutating methods like `push()` and `pop()` to the content of the `draft`.

Behind the scenes, Immer always constructs the next state from scratch according to the changes that you’ve done to the `draft`. This keeps your event handlers very concise without ever mutating state.

Recap[](#recap "Link for Recap")
--------------------------------

*   You can put arrays into state, but you can’t change them.
*   Instead of mutating an array, create a _new_ version of it, and update the state to it.
*   You can use the `[...arr, newItem]` array spread syntax to create arrays with new items.
*   You can use `filter()` and `map()` to create new arrays with filtered or transformed items.
*   You can use Immer to keep your code concise.

Try out some challenges[](#challenges "Link for Try out some challenges")
-------------------------------------------------------------------------

1. Update an item in the shopping cart 2. Remove an item from the shopping cart 3. Fix the mutations using non-mutative methods 4. Fix the mutations using Immer

#### 

Challenge 1 of 4:

Update an item in the shopping cart[](#update-an-item-in-the-shopping-cart "Link for this heading")

Fill in the `handleIncreaseClick` logic so that pressing ”+” increases the corresponding number:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

const initialProducts = \[{
  id: 0,
  name: 'Baklava',
  count: 1,
}, {
  id: 1,
  name: 'Cheese',
  count: 5,
}, {
  id: 2,
  name: 'Spaghetti',
  count: 2,
}\];

export default function ShoppingCart() {
  const \[
    products,
    setProducts
  \] = useState(initialProducts)

  function handleIncreaseClick(productId) {

  }

  return (
    <ul\>
      {products.map(product \=> (
        <li key\=\>
          
          
          (<b\></b\>)
          <button onClick\={() \=> {
            handleIncreaseClick(product.id);
          }}\>
            +
          </button\>
        </li\>
      ))}
    </ul\>
  );
}

Show more

Show solutionNext Challenge

[PreviousUpdating Objects in State](updating-objects-in-state.html)[NextManaging State](managing-state.html)

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
*   [Updating arrays without mutation](#updating-arrays-without-mutation)
*   [Adding to an array](#adding-to-an-array)
*   [Removing from an array](#removing-from-an-array)
*   [Transforming an array](#transforming-an-array)
*   [Replacing items in an array](#replacing-items-in-an-array)
*   [Inserting into an array](#inserting-into-an-array)
*   [Making other changes to an array](#making-other-changes-to-an-array)
*   [Updating objects inside arrays](#updating-objects-inside-arrays)
*   [Write concise update logic with Immer](#write-concise-update-logic-with-immer)
*   [Recap](#recap)
*   [Challenges](#challenges)

