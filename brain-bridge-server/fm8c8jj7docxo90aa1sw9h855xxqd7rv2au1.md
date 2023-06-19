Introducing react.dev – React

(function () )();

Support Ukraine 🇺🇦

[

🇺🇦

Help Provide Humanitarian Aid to Ukraine.](https://opensource.fb.com/support-ukraine)

[React](../../../../index.html)

Search⌘CtrlK

[Learn](../../../../learn.html)

[Reference](../../../../reference/react.html)

[Community](../../../../community.html)

[Blog](../../../../blog.html)

[](https://github.com/facebook/react/releases)

[Blog](../../../../blog.html)

Introducing react.dev[](#undefined "Link for this heading")
===========================================================

March 16, 2023 by [Dan Abramov](https://twitter.com/dan_abramov) and [Rachel Nabors](https://twitter.com/rachelnabors)

* * *

Today we are thrilled to launch [react.dev](../../../../index.html), the new home for React and its documentation. In this post, we would like to give you a tour of the new site.

* * *

tl;dr[](#tldr "Link for tl;dr ")
--------------------------------

*   The new React site ([react.dev](../../../../index.html)) teaches modern React with function components and Hooks.
*   We’ve included diagrams, illustrations, challenges, and over 600 new interactive examples.
*   The previous React documentation site has now moved to [legacy.reactjs.org](https://legacy.reactjs.org).

New site, new domain, new homepage[](#new-site-new-domain-new-homepage "Link for New site, new domain, new homepage ")
----------------------------------------------------------------------------------------------------------------------

First, a little bit of housekeeping.

To celebrate the launch of the new docs and, more importantly, to clearly separate the old and the new content, we’ve moved to the shorter [react.dev](../../../../index.html) domain. The old [reactjs.org](https://reactjs.org) domain will now redirect here.

The old React docs are now archived at [legacy.reactjs.org](https://legacy.reactjs.org). All existing links to the old content will automatically redirect there to avoid “breaking the web”, but the legacy site will not get many more updates.

Believe it or not, React will soon be ten years old. In JavaScript years, it’s like a whole century! We’ve [refreshed the React homepage](../../../../index.html) to reflect why we think React is a great way to create user interfaces today, and updated the getting started guides to more prominently mention modern React-based frameworks.

If you haven’t seen the new homepage yet, check it out!

Going all-in on modern React with Hooks[](#going-all-in-on-modern-react-with-hooks "Link for Going all-in on modern React with Hooks ")
---------------------------------------------------------------------------------------------------------------------------------------

When we released React Hooks in 2018, the Hooks docs assumed the reader is familiar with class components. This helped the community adopt Hooks very swiftly, but after a while the old docs failed to serve the new readers. New readers had to learn React twice: once with class components and then once again with Hooks.

**The new docs teach React with Hooks from the beginning.** The docs are divided in two main sections:

*   **[Learn React](../../../../learn.html)** is a self-paced course that teaches React from scratch.
*   **[API Reference](../../../../reference/react.html)** provides the details and usage examples for every React API.

Let’s have a closer look at what you can find in each section.

### Note

There are still a few rare class component use cases that do not yet have a Hook-based equivalent. Class components remain supported, and are documented in the [Legacy API](../../../../reference/react/legacy.html) section of the new site.

Quick start[](#quick-start "Link for Quick start ")
---------------------------------------------------

The Learn section begins with the [Quick Start](../../../../learn.html) page. It is a short introductory tour of React. It introduces the syntax for concepts like components, props, and state, but doesn’t go into much detail on how to use them.

If you like to learn by doing, we recommend checking out the [Tic-Tac-Toe Tutorial](../../../../learn/tutorial-tic-tac-toe.html) next. It walks you through building a little game with React, while teaching the skills you’ll use every day. Here’s what you’ll build:

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

function Square() {
  return (
    <button className\="square" onClick\=\>
      
    </button\>
  );
}

function Board() {
  function handleClick(i) {
    if (calculateWinner(squares) || squares\[i\]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares\[i\] = 'X';
    } else {
      nextSquares\[i\] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <\>
      <div className\="status"\></div\>
      <div className\="board-row"\>
        <Square value\= />
        <Square value\= />
        <Square value\= />
      </div\>
      <div className\="board-row"\>
        <Square value\= />
        <Square value\= />
        <Square value\= />
      </div\>
      <div className\="board-row"\>
        <Square value\= />
        <Square value\= />
        <Square value\= />
      </div\>
    </\>
  );
}

export default function Game() {
  const \[history, setHistory\] = useState(\[Array(9).fill(null)\]);
  const \[currentMove, setCurrentMove\] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history\[currentMove\];

  function handlePlay(nextSquares) {
    const nextHistory = \[...history.slice(0, currentMove + 1), nextSquares\];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) \=> {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key\=\>
        <button onClick\=</button\>
      </li\>
    );
  });

  return (
    <div className\="game"\>
      <div className\="game-board"\>
        <Board xIsNext\= />
      </div\>
      <div className\="game-info"\>
        <ol\></ol\>
      </div\>
    </div\>
  );
}

function calculateWinner(squares) {
  const lines = \[
    \[0, 1, 2\],
    \[3, 4, 5\],
    \[6, 7, 8\],
    \[0, 3, 6\],
    \[1, 4, 7\],
    \[2, 5, 8\],
    \[0, 4, 8\],
    \[2, 4, 6\],
  \];
  for (let i = 0; i < lines.length; i++) {
    const \[a, b, c\] = lines\[i\];
    if (squares\[a\] && squares\[a\] === squares\[b\] && squares\[a\] === squares\[c\]) {
      return squares\[a\];
    }
  }
  return null;
}

Show more

We’d also like to highlight [Thinking in React](../../../../learn/thinking-in-react.html)—that’s the tutorial that made React “click” for many of us. **We’ve updated both of these classic tutorials to use function components and Hooks,** so they’re as good as new.

### Note

The example above is a _sandbox_. We’ve added a lot of sandboxes—over 600!—everywhere throughout the site. You can edit any sandbox, or press “Fork” in the upper right corner to open it in a separate tab. Sandboxes let you quickly play with the React APIs, explore your ideas, and check your understanding.

Learn React step by step[](#learn-react-step-by-step "Link for Learn React step by step ")
------------------------------------------------------------------------------------------

We’d like everyone in the world to have an equal opportunity to learn React for free on their own.

This is why the Learn section is organized like a self-paced course split into chapters. The first two chapters describe the fundamentals of React. If you’re new to React, or want to refresh it in your memory, start here:

*   **[Describing the UI](../../../../learn/describing-the-ui.html)** teaches how to display information with components.
*   **[Adding Interactivity](../../../../learn/adding-interactivity.html)** teaches how to update the screen in response to user input.

The next two chapters are more advanced, and will give you a deeper insight into the trickier parts:

*   **[Managing State](../../../../learn/managing-state.html)** teaches how to organize your logic as your app grows in complexity.
*   **[Escape Hatches](../../../../learn/escape-hatches.html)** teaches how you can “step outside” React, and when it makes most sense to do so.

Every chapter consists of several related pages. Most of these pages teach a specific skill or a technique—for example, [Writing Markup with JSX](../../../../learn/writing-markup-with-jsx.html), [Updating Objects in State](../../../../learn/updating-objects-in-state.html), or [Sharing State Between Components](../../../../learn/sharing-state-between-components.html). Some of the pages focus on explaining an idea—like [Render and Commit](../../../../learn/render-and-commit.html), or [State as a Snapshot](../../../../learn/state-as-a-snapshot.html). And there are a few, like [You Might Not Need an Effect](../../../../learn/you-might-not-need-an-effect.html), that share our suggestions based on what we’ve learned over these years.

You don’t have to read these chapters as a sequence. Who has the time for this?! But you could. Pages in the Learn section only rely on concepts introduced by the earlier pages. If you want to read it like a book, go for it!

### Check your understanding with challenges[](#check-your-understanding-with-challenges "Link for Check your understanding with challenges ")

Most pages in the Learn section end with a few challenges to check your understanding. For example, here are a few challenges from the page about [Conditional Rendering](../../../../learn/conditional-rendering.html#challenges).

You don’t have to solve them right now! Unless you _really_ want to.

1. Show an icon for incomplete items with `? :` 2. Show the item importance with `&&`

#### 

Challenge 1 of 2:

Show an icon for incomplete items with `? :`[](#show-an-icon-for-incomplete-items-with-- "Link for this heading")

Use the conditional operator (`cond ? a : b`) to render a ❌ if `isPacked` isn’t `true`.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

function Item() {
  return (
    <li className\="item"\>
      
    </li\>
  );
}

export default function PackingList() {
  return (
    <section\>
      <h1\>Sally Ride's Packing List</h1\>
      <ul\>
        <Item 
          isPacked\= 
          name\="Space suit" 
        />
        <Item 
          isPacked\= 
          name\="Helmet with a golden leaf" 
        />
        <Item 
          isPacked\= 
          name\="Photo of Tam" 
        />
      </ul\>
    </section\>
  );
}

Show more

Show solutionNext Challenge

Notice the “Show solution” button in the left bottom corner. It’s handy if you want to check yourself!

### Build an intuition with diagrams and illustrations[](#build-an-intuition-with-diagrams-and-illustrations "Link for Build an intuition with diagrams and illustrations ")

When we couldn’t figure out how to explain something with code and words alone, we’ve added diagrams that help provide some intuition. For example, here is one of the diagrams from [Preserving and Resetting State](../../../../learn/preserving-and-resetting-state.html):

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../../../../_next/preserving_state_diff_same_pt1.png)

![Diagram with three sections, with an arrow transitioning each section in between. The first section contains a React component labeled 'div' with a single child labeled 'section', which has a single child labeled 'Counter' containing a state bubble labeled 'count' with value 3. The middle section has the same 'div' parent, but the child components have now been deleted, indicated by a yellow 'proof' image. The third section has the same 'div' parent again, now with a new child labeled 'div', highlighted in yellow, also with a new child labeled 'Counter' containing a state bubble labeled 'count' with value 0, all highlighted in yellow.](../../../../_next/preserving_state_diff_same_pt1.png)

When `section` changes to `div`, the `section` is deleted and the new `div` is added

You’ll also see some illustrations throughout the docs—here’s one of the [browser painting the screen](../../../../learn/render-and-commit.html#epilogue-browser-paint):

![A browser painting 'still life with card element'.](../../../../images/docs/illustrations/i_browser-paint.png)

Illustrated by [Rachel Lee Nabors](http://rachelnabors.com/)

We’ve confirmed with the browser vendors that this depiction is 100% scientifically accurate.

A new, detailed API Reference[](#a-new-detailed-api-reference "Link for A new, detailed API Reference ")
--------------------------------------------------------------------------------------------------------

In the [API Reference](../../../../reference/react.html), every React API now has a dedicated page. This includes all kinds of APIs:

*   Built-in Hooks like [`useState`](../../../../reference/react/useState.html).
*   Built-in components like [`<Suspense>`](../../../../reference/react/Suspense.html).
*   Built-in browser components like [`<input>`](../../../../reference/react-dom/components/input.html).
*   Framework-oriented APIs like [`renderToPipeableStream`](../../../../reference/react-dom/server/renderToReadableStream.html).
*   Other React APIs like [`memo`](../../../../reference/react/memo.html).

You’ll notice that every API page is split into at least two segments: _Reference_ and _Usage_.

[Reference](../../../../reference/react/useState.html#reference) describes the formal API signature by listing its arguments and return values. It’s concise, but it can feel a bit abstract if you’re not familiar with that API. It describes what an API does, but not how to use it.

[Usage](../../../../reference/react/useState.html#usage) shows why and how you would use this API in practice, like a colleague or a friend might explain. It shows the **canonical scenarios for how each API was meant to be used by the React team.** We’ve added color-coded snippets, examples of using different APIs together, and recipes that you can copy and paste from:

#### Basic useState examples[](#examples-basic "Link for Basic useState examples")

1. Counter (number) 2. Text field (string) 3. Checkbox (boolean) 4. Form (two variables)

#### 

Example 1 of 4:

Counter (number)[](#counter-number "Link for this heading")

In this example, the `count` state variable holds a number. Clicking the button increments it.

App.js

App.js

Reset[Fork](https://codesandbox.io/api/v1/sandboxes/define?undefined "Open in CodeSandbox")

import  from 'react';

export default function Counter() {
  const \[count, setCount\] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick\=\>
      You pressed me  times
    </button\>
  );
}

Next Example

Some API pages also include [Troubleshooting](../../../../reference/react/useEffect.html#troubleshooting) (for common problems) and [Alternatives](../../../../reference/react-dom/findDOMNode.html#alternatives) (for deprecated APIs).

We hope that this approach will make the API reference useful not only as a way to look up an argument, but as a way to see all the different things you can do with any given API—and how it connects to the other ones.

What’s next?[](#whats-next "Link for What’s next? ")
----------------------------------------------------

That’s a wrap for our little tour! Have a look around the new website, see what you like or don’t like, and keep the feedback coming in the [anonymous survey](https://www.surveymonkey.co.uk/r/PYRPF3X) or in our [issue tracker](https://github.com/reactjs/reactjs.org/issues).

We acknowledge this project has taken a long time to ship. We wanted to maintain a high quality bar that the React community deserves. While writing these docs and creating all of the examples, we found mistakes in some of our own explanations, bugs in React, and even gaps in the React design that we are now working to address. We hope that the new documentation will help us hold React itself to a higher bar in the future.

We’ve heard many of your requests to expand the content and functionality of the website, for example:

*   Providing a TypeScript version for all examples;
*   Creating the updated performance, testing, and accessibility guides;
*   Documenting React Server Components independently from the frameworks that support them;
*   Working with our international community to get the new docs translated;
*   Adding missing features to the new website (for example, RSS for this blog).

Now that [react.dev](../../../../index.html) is out, we will be able to shift our focus from “catching up” with the third-party React educational resources to adding new information and further improving our new website.

We think there’s never been a better time to learn React.

Who worked on this?[](#who-worked-on-this "Link for Who worked on this? ")
--------------------------------------------------------------------------

On the React team, [Rachel Nabors](https://twitter.com/rachelnabors/) led the project (and provided the illustrations), and [Dan Abramov](https://twitter.com/dan_abramov) designed the curriculum. They co-authored most of the content together as well.

Of course, no project this large happens in isolation. We have a lot of people to thank!

[Sylwia Vargas](https://twitter.com/SylwiaVargas) overhauled our examples to go beyond “foo/bar/baz” and kittens, and feature scientists, artists and cities from around the world. [Maggie Appleton](https://twitter.com/Mappletons) turned our doodles into a clear diagram system.

Thanks to [David McCabe](https://twitter.com/mcc_abe), [Sophie Alpert](https://twitter.com/sophiebits), [Rick Hanlon](https://twitter.com/rickhanlonii), [Andrew Clark](https://twitter.com/acdlite), and [Matt Carroll](https://twitter.com/mattcarrollcode) for additional writing contributions. We’d also like to thank [Natalia Tepluhina](https://twitter.com/n_tepluhina) and [Sebastian Markbåge](https://twitter.com/sebmarkbage) for their ideas and feedback.

Thanks to [Dan Lebowitz](https://twitter.com/lebo) for the site design and [Razvan Gradinar](https://dribbble.com/GradinarRazvan) for the sandbox design.

On the development front, thanks to [Jared Palmer](https://twitter.com/jaredpalmer) for prototype development. Thanks to [Dane Grant](https://twitter.com/danecando) and [Dustin Goodman](https://twitter.com/dustinsgoodman) from [ThisDotLabs](https://www.thisdot.co/) for their support on UI development. Thanks to [Ives van Hoorne](https://twitter.com/CompuIves), [Alex Moldovan](https://twitter.com/alexnmoldovan), [Jasper De Moor](https://twitter.com/JasperDeMoor), and [Danilo Woznica](https://twitter.com/danilowoz) from [CodeSandbox](https://codesandbox.io/) for their work with sandbox integration. Thanks to [Rick Hanlon](https://twitter.com/rickhanlonii) for spot development and design work, finessing our colors and finer details. Thanks to [Harish Kumar](https://www.strek.in/) and [Luna Ruan](https://twitter.com/lunaruan) for adding new features to the site and helping maintain it.

Huge thanks to the folks who volunteered their time to participate in the alpha and beta testing program. Your enthusiasm and invaluable feedback helped us shape these docs. A special shout out to our beta tester, [Debbie O’Brien](https://twitter.com/debs_obrien), who gave a talk about her experience using the React docs at React Conf 2021.

Finally, thanks to the React community for being the inspiration behind this effort. You are the reason we do this, and we hope that the new docs will help you use React to build any user interface that you want.

[PreviousReact Labs: What We've Been Working On – March 2023](../22/react-labs-what-we-have-been-working-on-march-2023.html)[NextReact Labs: What We've Been Working On – June 2022](../../../2022/06/15/react-labs-what-we-have-been-working-on-june-2022.html)

* * *

How do you like these docs?

[Take our survey!](https://www.surveymonkey.co.uk/r/PYRPF3X)

* * *

[

](https://opensource.fb.com/)

©2023

[Learn React](../../../../learn.html)

[Quick Start](../../../../learn.html)

[Installation](../../../../learn/installation.html)

[Describing the UI](../../../../learn/describing-the-ui.html)

[Adding Interactivity](../../../../learn/adding-interactivity.html)

[Managing State](../../../../learn/managing-state.html)

[Escape Hatches](../../../../learn/escape-hatches.html)

[API Reference](../../../../reference/react.html)

[React APIs](../../../../reference/react.html)

[React DOM APIs](../../../../reference/react-dom.html)

[Community](../../../../community.html)

[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

[Meet the Team](../../../../community/team.html)

[Docs Contributors](../../../../community/docs-contributors.html)

[Acknowledgements](../../../../community/acknowledgements.html)

More

[Blog](../../../../blog.html)

[React Native](https://reactnative.dev/)

[Privacy](https://opensource.facebook.com/legal/privacy)

[Terms](https://opensource.fb.com/legal/terms/)

[](https://www.facebook.com/react)[](https://twitter.com/reactjs)[](https://github.com/facebook/react)

