// initial solution
function reverse(x: number): number {
    const isNegative = x < 0;
    // get rid of the negative for now
    if (isNegative) {
        x *= -1;
    }

    let result = 0;

    let i = 0;
    // since this while loop goes until x is not greater than 0
    // and is being divided by 10 each time
    // this is effectively a log10(N)
    // as this process is only dependent on the digits of the number N
    // O(LOG(N))
    while (x > 0) {
        result *= 10;
        result += (x % 10);
        x = Math.floor(x / 10);
        i++;
    }

    if (isNegative) {
        result *= -1;
    }

    // boundary checks
    if (result < -(2 ** 31) || result > (2 ** 31) - 1) {
        return 0;
    }

    return result;
};


export const code = reverse;
export const cases: [number, number][] = [
    [123, 321], // test if it works
    [-123, -321], // test negative case
    [120, 21], // make sure 0s are handled correctly
    [1201, 1021], // make sure 0s between digits are handled correctly
];