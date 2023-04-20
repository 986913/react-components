# valtio claims to make proxy-state simple.

Let's take a look at the basic example.

```
import { proxy, useSnapshot } from 'valtio'

const state = proxy({ count: 0, text: 'hello' })

// This will re-render on `state.count` change
// but not on `state.text` change
function Counter() {
  const snap = useSnapshot(state)
  return (
    <div>
      {snap.count}
      <button onClick={() => ++state.count}>
        +1
      </button>
    </div>
  )
}

// you can mutate the state from anywhere
setInterval(() => {
  ++state.count
}, 1000)

```

Now you are asked to implement proxy() and useSnapshot() to make above code example work.

This question is NOT to re-implement valtio, rather it is to test your understanding of proxy-state. The test cases on BFE.dev only covers the basic usage of above two functions, not the full abilities of valtio.
