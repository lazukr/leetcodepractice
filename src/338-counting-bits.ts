// weak in DP so focusing some questions on that

function countBits(n: number): number[] {
    if (n === 0) {
        return [0];
    }
    else if (n === 1) {
        return [0, 1];
    }

    const result = [0, 1];
    // for loop - O (N)
    for (let i = 2; i <= n; i++) {
        result.push(result[Math.floor(i / 2)] + i % 2);
    }

    // O(N) time
    return result;
};

export const code = countBits;
export const cases: [number, number[]][] = [
    [2, [0, 1, 1]],
    [5, [0, 1, 1, 2, 1, 2]],
    [15, [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4]]
];

/*
notes

0 | 0 0 0
1 | 0 0 1
2 | 0 1 0 
3 | 0 1 1
4 | 1 0 0
5 | 1 0 1
6 | 1 1 0
7 | 1 1 1

while listing the binary representation of numbers, i realized the following:
1. you're always appending 0 or 1 based on odd or even
    this inspired the i % 2 bit
2. you seem to be adding onto the value that corresponds to 
 floor (i / 2)'s value

for example
4. is 1 0 0, it contains 1 0 in the front, which is 2, so we can take the value we calculate
from 2 and add it here. The last 0 is from i % 2.
*/