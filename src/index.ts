type Fn<Params extends any[], Return> = (...params: Params) => Return;
/**
 * Testify till take an internal function that should not be imported
 * and wraps it with a conditional so that it can be imported for testing purposes
 * but throws and error if it is used in production
 *
 * @param fn Any function
 * @returns a function with the same signatre as fn
 */
export const testify = <P extends any[], R>(fn: Fn<P, R>): Fn<P, R> =>
  process?.env?.NODE_ENV === "test"
    ? fn
    : ((() => {
        throw new Error("You cannot call a private function outside of test");
      }) as (...args: P) => R);
