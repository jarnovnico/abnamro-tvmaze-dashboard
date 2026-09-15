# ABN AMRO TVMaze API Show Dashboard
A "budget IMDB" dashboard for browsing shows, filtering by genre, sorting by rating/title, searching by show name, and viewing individual show details.

- Vue 3
- TypeScript
- Vite
- Vue Router
- Vitest
- PrimeVue (select)
- fetch()
- CSS

## app setup
- node.js 22+
- npm

## run the project:
- `npm install`
- `npm run dev`

Then go to: `http://localhost:5173`

Run unit tests (once) with: `npm run test:run`
Create production build: `npm run build`

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

## vue-router
1. Declarative. Meaing when we have a visible link use
```
<RouterLink
  :to="{
    name: 'show-detail',
    params: { id: show.id },
  }"
>
```
In React it was this: `<Link to={`/shows/${show.id}`}>`.
In Vue you don't need to manually build the url. Vue Router does that for us.
2. Programmatic: `router.push(...)` e.g.: action causes navigation -> router.push() That can but a user submits a form, and after success it naivates to a specific page.

### Our apps flows like this:
1. Router
- DashboardPage
- ShowDetailPage

2. DashboardPage
- useShows
- Filters
- Search

3. ShowDetailPage
- useShow

4. all connects through: API service/client
5. TVMaze API

### route loading and components loading
`component: () => import('../components/pages/ShowDetailPage.vue'),` is lazy-loading. Then inside the page, the data loads async. So this happens in order:
1. browser
2. load JS
3. ShowDetailPage.vue exists
4. fetch show data
5. render show
Different loading states. Therefor we can use route loading and data loading in big apps. Vue Router support [dynamic imports](https://router.vuejs.org/guide/advanced/lazy-loading.html?#Lazy-Loading-Routes)

## Lifecycle hooks 
for the cleanup of code with `onBeforeMount()` or `onMounted()`

In React we are used to use useEffect() hook, and at first glance it looks similar, but in React it does more then `onMounted()`. It is used more broader and used for many side effects.
But for Vue we use `onMounted()` for things to run after componted has been mounted in the DOM (we don't have the dependency array here).
Then (in Vue) we can use a combination of lifecycle hooks:
1. `onMounted()`
2. `watch()`
3. `watchEffect()`
4. `onBeforeUnmount()`
Instead of expecting one hook to do it all (like `useEffect()` can do).

### Vue's `watch()` vs React's `useEffect()`
In React you would write:
```
useEffect(() => {
  doSomething()
}, [userId])
```
And in Vue you would write:
```
watch(
  () => userId.value, 
  () => doSomething()
)
```
In Vue it means: watch for this reactive source `userId.value`, and when it change fire the `doSomething()` callback.

But don't chain `watch()` lifecyclehooks when state change. Instead do:
1. state A
2. computed B
3. computed C
Like our `selectedGenre` -> `filteredShows` -> `visibleShows`.
No chain of events required!

## Unit tests
Currently only parts of our app that are critial:
- validator
- transformer
- filtering
- HTTP errors
Goal is not 100% coverage, but 100% confident our app works

Nice to have: testing search composable, but it would require more complicated setup.
Watch, timers, AbortController, lifescyle, async behaviour, etc

After this we could also add DOM validation test, but those are low prio if you ask me.

### testing pyramid
But our perfered testing would look like:

Top: E2E with Playwright (or cypress)
- open dashboard
- use search
- select a show
- open the detail page

Middel part: Component testing
- SearchBar
- ShowCard
- GenreFilter
- ShowDetailPage

Bottom: Unit tests
- transformers
- validators
- filters
- utils
- api client
- composables

### most important thing to test
1. external data
2. validator
3. raw data transformer
4. our apps type model
5. composable
6. component

### nices to haves
- Tailwind (for theming configuration to easily main styles, and switch styles in the future)
- More PrimeVue (I love making my own components but when you work in a big team or organization is makes more sense to use a design system)
- More CSC variables and other design tokens stored in central place (now it's all other the place but because of lack of time I choose regular CSS)
- sanitize HTML in ShowDetailPage.vue
Currently we are not rendering HTML directly in the DOM from the API because thats safer
But it would be normal to then sanatize the HTML before rendering it!
- E2E testing with Playwright
- Component testing
- Animations?