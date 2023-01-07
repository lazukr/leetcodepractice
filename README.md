# leetcodepractice
Repo for solutions to leetcode problems

## Usage
This runs off of `jest` so it relies on:
```
yarn jest
```

In order to avoid creating a lot of `*.test.ts` files that would all run with `yarn jest`, I opted for just having a standardized export output for each problem (`code` and `cases`) and replacing the imports in the `tester.test.ts`.