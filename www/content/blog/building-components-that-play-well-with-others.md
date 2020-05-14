---
title: Building Components That Play Well With Others
date: '2020-05-13'
description: 'A living collection of tips, tricks, ideas, and advice for building React components that work well with other components.'
---

This post is a living collection of tips, tricks, ideas, and advice for building React components that work well with other components and work well for other developers.

I call it a living collection because it's not a static list. Heck, at the time of writing this sentence, it's not even finished—there are incomplete sections towards the end.

This is intentional, and part of my new purpose for this site. I'm [cultivating a digital garden](/cultivating-a-digital-garden) where everything is always growing, this post included. If you've ever wanted to write but find yourself constantly bogged down by perfectionism or not having enough time to ever "finish" a post, you should consider starting your own!

# Prop Naming

Naming your props suffers from the same problem as everything else in the programming world: naming things is hard.

Lucky for us, React contains an implicit standard around prop naming, and it is often helpful to follow this convention when naming your props.

Following these conventions for prop naming helps make your components feel more "natural", because they fit so well with how native elements work in React, along with other components built in the same way. This makes other developers feel right at home in using your component.

## `props.children`

> In JSX expressions that contain both an opening tag and a closing tag, the content between those tags is passed as a special prop: `props.children`.

`props.children` refers to the content rendered inside of a JSX tag. `children` can render a number of things, including strings, components, and template literals (inside of a `{}` block).

A common mistake I see developers make is to take a special prop for the content their component will render, when the `children` prop is both the standard way of handling that and easier to use.

```jsx
// custom prop name
const ColoredItem = ({color, text}) => <div style={{color}} text="This is some text">{text}</div>
<ColoredItem color="red" text="This is some text" />

// using children
const ColoredItem = ({color, children}) => <div style={{color}}>{children}</div>
<ColoredItem color="red">This is some text</Text>
```

## Event Handlers

Native elements in React establish a standard in event handler naming:

```jsx
<button onClick={props.onClick}>Click me!</button>
<input onChange={props.onChange} />
<form onSubmit={props.onSubmit} />
```

In this example, we saw some of the most common event handlers in React: `onClick`, `onChange`, and `onSubmit`.

The event handler names are self-explanatory and begin with `on<Event>`.

Components that use non-standard event handler naming (especially when there is a corresponding native handler name that fits the specific use case) can be confusing, as a user has to first learn how to interface with your special snowflake of a component.

```jsx
// non-standard naming
const Clicker = ({onClickHandler}) => (
  <button onClick={onClickHandler}>Click Me!</button>
)

// standard naming. the component prop name literally matches the element's prop
// name. how much easier could it get?
const Clicker = ({onClick}) => <button onClick={onClick}>Click Me!</button>
```

Of course, not all component events fit to a standard event. In that case, at least name your handlers using the `on<Event>` pattern.

```jsx
const ScreechingBaby = ({onScreech}) => ()
```

## Input Props

Native elements in React also establish a standard in input props naming:

```jsx
<input type="text" value={props.value} onChange={props.onChange} />
<input type="text" defaultValue="default" />
```

Controlled elements (when the state of an element is provided from an outside source) receive a `value` prop, and use the `onChange` handler to notify the source that `value` has changed.

Uncontrolled elements (when the state is managed internally, starting with a default value) receive a `defaultValue` prop.

The `type` prop informs the element which form it should take.

In cases where you are building components that behave similarly, mirror this form. Interfacing with components that use non-standard naming (especially when they're mirror the behavior of native elements) can be frustrating, as it requires the user to learn your component's life story to use it.

## Prop Naming Inspiration

A lot of heavily-used, public React libraries are excellent at prop naming (how else could they get so popular??). Some of my favorites:

- [Formik](formik)
- [Chakra UI](chakra)

# Behavior

## Controlled vs. Uncontrolled

# Layout vs. Content

# Component as API

# Generic vs. Specific

# Usage Context

[formik]: https://jaredpalmer.com/formik/docs/api/field
[chakra]: https://chakra-ui.com/accordion
