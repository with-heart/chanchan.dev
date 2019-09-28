---
title: Prop Naming
date: '2015-05-01T22:12:03.284Z'
description: "When passing data between components, it's easy to fall into the habit of using the same name for a piece of data in the parent and the prop passed to the child. But does that always make sense? In this post, we'll take a quick look at prop naming."
---

When passing data between components, it's easy to fall into the habit of using the same name for a piece of data in the parent and the prop passed to the child. But does that always make sense? In this post, we'll take a quick look at prop naming.

# A simple example

Let's consider a `Bookshelf` component that takes `books`--each with a `title` and `description`--that are rendered by mapping them to `ListItem` components inside of a `List` component. Imagine that we're creating these components at the same time.

```jsx
const Bookshelf = ({books}) => (
  <div>
    <h1>Your bookshelf</h1>

    <List>
      {books.map(book => (
        <ListItem key={book.title} book={book} />
      ))}
    </List>
  </div>
)

const List = ({children}) => <ul>{children}</ul>

const ListItem = ({book}) => (
  <li>
    <strong>{book.title}</strong>: {book.description}
  </li>
)
```

`ListItem` takes a `book` and uses the `title` and `description` values to render them in an `li`. Everything is fine and dandy.

# Adding some reuse

Now let's say we also want to list out the items in our `MusicCollection`. We have `cds` and `records`, which also have a `title` and `description`.

What happens if we want to reuse the `ListItem` component for this new purpose?

```js
const MusicCollection = ({cds, records}) => (
  <div>
    <h1>Your music collection</h1>

    <h2>Your CDs</h2>
    <List>
      {cds.map(cd => (
        <ListItem key={cd.title} book={cd} />
      ))}
    </List>

    <h2>Your records</h2>
    <List>
      {records.map(record => (
        <ListItem key={record.title} book={record} />
      ))}
    </List>
  </div>
)
```

Awkward! Our `ListItem` expects a `book`, but these are CDs and records, not books!

We've made our `ListItem` too specific to serve the purpose we need it for, even though it technically works fine.

# Go generic

Let's fix this by making the `ListItem` api more generic!

```jsx
const ListItem = ({item}) => (
  <li>
    <strong>{item.title}</strong>: {item.description}
  </li>
)
```

We modified `ListItem` to take an `item`, suggesting that it doesn't care what the item is. Now let's change our other components to use `item`:

```jsx
const Bookshelf = ({books}) => (
  <div>
    <h1>Your bookshelf</h1>

    <List>
      {books.map(book => (
        <ListItem key={book.title} item={book} />
      ))}
    </List>
  </div>
)

const MusicCollection = ({cds, records}) => (
  <div>
    <h1>Your music collection</h1>

    <h2>Your CDs</h2>
    <List>
      {cds.map(cd => (
        <ListItem key={cd.title} item={cd} />
      ))}
    </List>

    <h2>Your records</h2>
    <List>
      {records.map(record => (
        <ListItem key={record.title} item={record} />
      ))}
    </List>
  </div>
)
```

Much better! Our `ListItem` is now generic enough to expect any item that has a `title` and `description`, and as long as that data matches up, we can pass it anything without losing the generic context of that naming.

# Working with other types of data

Now we want to get more fancy with our collections and allow people to check them out. To do that, we'll need to add some people to our application! Our people have a `name` and a `relationship` (friend, family, etc.).

```jsx
const People = ({people}) => (
  <div>
    <h1>Your peeps</h1>

    <List>
      {people.map(person => (
        <ListItem key={person.name} item={person} />
      ))}
    </List>
  </div>
)
```

Uh-oh! Something clearly isn't right with this.

![List of people with no text](./peeps-broken.png)

We've got no text! What happened?

As we said before, our people have a `name` and `relationship`, but our `ListItem` expects `items` with `title` and `description`. Clearly something has to change if we're going to reuse `ListItem` for all of these situations.

We could try mapping our `people` to fit the new data structure:

```jsx
const People = ({people}) => (
  <div>
    <h1>Your peeps</h1>

    <List>
      {people.map(person => (
        <ListItem
          key={person.name}
          item={{title: person.name, description: person.relationship}}
        />
      ))}
    </List>
  </div>
)
```

This change works!

![List of people with text](./peeps-working.png)

However, if we wanted to reuse `ListItem` for many different types of data, this requires a lot of knowledge about `ListItem` and the data types to use it. We'd have to map in too many places for this to be useful.

# Getting even more generic

Instead, we could modify the api of `ListItem` to take only the data it needs, making `ListItem` truly specific to its purpose:

```jsx
const ListItem = ({title, description}) => (
  <li>
    <strong>{title}</strong>: {description}
  </li>
)
```

With this change, we require a bit more knowledge about `ListItem` at its use sites, but we enable the component to work with any type of data.

```jsx
const Bookshelf = ({books}) => (
  <div>
    <h1>Your bookshelf</h1>

    <List>
      {books.map(({title, description}) => (
        <ListItem key={title} title={title} description={description} />
      ))}
    </List>
  </div>
)

const MusicCollection = ({cds, records}) => (
  <div>
    <h1>Your music collection</h1>

    <h2>Your CDs</h2>
    <List>
      {cds.map(({title, description}) => (
        <ListItem key={title} title={title} description={description} />
      ))}
    </List>

    <h2>Your records</h2>
    <List>
      {records.map(({title, description}) => (
        <ListItem key={title} title={title} description={description} />
      ))}
    </List>
  </div>
)

const People = ({people}) => (
  <div>
    <h1>Your peeps</h1>

    <List>
      {people.map(({name, relationship}) => (
        <ListItem key={name} title={name} description={relationship} />
      ))}
    </List>
  </div>
)
```

# Summary

It's important when creating reusable components to consider a few things:

- The context of the component's usage

What data does it need? Could we potentially use this component with data types that don't fit the shape we're expecting?

- The shape of data in our application

If we have many types of data that can be rendered in a similar manner but have different shapes, we need to build our components with that in mind.

- The api of the component

If we're going to reuse the component for many different things, name the prop appropriately (`item` vs. `book` or `record`).

If we only need two specific pieces of data, it might be preferable for reusability purposes to ask for those as separate props, rather than taking any object that needs to have those pieces of data for the component to work.
