// first solution
function longestCommonPrefix(strs: string[]): string {
    // strs.legth = N
    // smallest length of word in list = M

    // strs.map -> O(N)
    // str.length -> O(1), doesn't calculate it each time
    // Math.min is just input of strs -> O(N)
    // = O(N)
    const minLength = Math.min(...strs.map(str => str.length));

    // while loop -> O(M), only that long and we decrement each time
    // strs.every -> O(N)
    // item.startsWith -> grows as length of common grows
    //   max it will be is M, but it grows over time
    //   M (M + 1) / 2
    // total -> O(N * M ^ 2)

    // grab the minimum length prefix of first word in list
    // doesn't matter which one as we only care if prefix match
    // reason to use the smallest length is there wouldn't be a prefix match greater
    // than the smallest word in the list
    let common = strs[0].slice(0, minLength);

    while (common.length > 0) {
        if (strs.every(item => item.startsWith(common))) {
            return common;
        } else {
            // O(M) time
            common = common.slice(0, -1);
        }
    }
    return common;
};


export const code = longestCommonPrefix;
export const cases: [string[], string][] = [
    [["flower","flow","flight"], "fl"],
    [["dog","racecar","car"], ""],
    [["hello"], "hello"],
    [["george", "geode", "gene"], "ge"],
    [["test", "testing"], "test"],
    [["hello", ""], ""],
];