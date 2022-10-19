# testify

Sometimes you have a function in a file that is private, but needs to be tested.

Exporting it into a production environment can result in pierced abstractions, which defeats the purpose of abstraction.

`testify` allows you to export a wrapped version of a private function. While the function is still exported, attempts to use
it in production will result in a thrown Error.

## Example

```typescript
// library.ts
const privateFunction = () => {
    // Something happens here
};

const _testableFunction = testify(privateFunction);

export {_testableFunction};
```

`_testableFunction` can be used in your tests (i.e. when `process.env.NODE_ENV === 'test'`), but will throw in production.

## Why not use `rewire`?

The [rewire package](https://www.npmjs.com/package/rewire) approaches this problem via monkey-patching. The problem with that is 
that you lose visibility of code coverage on your rewired functions.

This approach allows you to get the coverage data you need.
