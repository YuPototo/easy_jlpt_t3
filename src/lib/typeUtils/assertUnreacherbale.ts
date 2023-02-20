/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * https://javascript.plainenglish.io/never-miss-a-switch-case-with-typescript-684bf5d0e1d1
 */
export function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get here. arg: ${x}`);
}
