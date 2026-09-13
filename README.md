# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Vue learnings
Coming from React, the way events and props flow through components was very different than in Vue. I had to wrap my head around this quite a lot.
Events get emit from child components and flow up to change state in the parent, and then flows back with update state to the child again.

### Mental model for leaning Vue
When a user clicks a genre the following happens:

1. User clicks button
2. GenreFilter emits event
3. Dashboard receives event
4. selectedGenre changes
5. Vue notices reactive state changed
6. filteredShows recomputes
7. visibleShows recomputes
8. ShowGrid receives new array
9. Vue updates the DOM

Really imponrtant to understand: Vue tracks dependencies between reactive state and computed values.

### `ref` vs `computed`
You use `ref` when something is a state(s) you own and want to change.
e.g.: `const selectedGenre = ref('All')`

And `computed` is used when something is DERIVED from other state(s).
e.g.: `const genres = computed(...)`

I had to ask myself this: "is it possible to (re)calculate this value from other state(s)?"
If it was 'yes', then `computed` was prefered. With computed there is only one source of truth.

### Composables are not hooks
From the Vue docs: a composable as a function using Vue's composition api to encapsulate reusable stateful logic.
A component doesn't need to know most of this logic. E.g.: how the request works, or how the errors are being handled, etc. Or how the raw data is being transformed into more usable data for the view.

If you had to compare a component with a composable: 
- UI responsibillity -> component
- state/logic behaviour -> composable

Basically reusable stateful logic!

### Most important architectual concept
What is really important to understand when using Vue:
1. state -> 2. computed state -> 3. UI changes

### watch() vs computed
`computed` are good when (re)calculating state without side effects.
then we use watch(): if state changed and you want to perform a side effect
- state changed -> 1 api request
- state changed -> 2 localStorage update
- state changed -> 3 analytics event

### v-model
usefull for two-way interaction

### Lifecycle hooks 
for the cleanup of code with `onBeforeMount()` or `onMounted()`

## Current app architecture

1. TVMaze API
2. api/client.ts
3. tvmaze.api.ts
4. validator/typeguard + raw data transformer
5. type Show

then we either go -> useShows -> useShowFilters -> DashboardPage: 
1. filter
2. sort 
3. ShowGrid -> ShowCard

or from 5. we go -> useShowSearch -> SearchBar

all stateful logic seperated in reusable composables that handle state, api requests in small reusable "wrappers" with error handling, validation, data transformation.
Then our components/pages/view stay "stupid".
