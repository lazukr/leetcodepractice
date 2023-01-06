// first solution
function isPalindrome(x: number): boolean {
    const value = x.toString();
    let i = 0;
    let j = value.length - 1;
    
    while (i <= j) {
        if (value[i] !== value[j]) {
            return false;
        }

        i++;
        j--;
    }

    return true;
}

function isPalindromeWithoutConverting(x: number): boolean {
    const base = 10;
    let reverse = 0;
    let compare = x;
    while (x > 0) {
        reverse *= base;
        reverse += (x % base);
        x = Math.floor(x / base);
    }

    return compare === reverse;
}

export const code = isPalindromeWithoutConverting;
export const cases: [number, boolean][] = [
    [-121, false],
    [-11, false],
    [-1, false],
    [0, true],
    [11, true],
    [12, false],
    [121, true],
    [111, true],
    [122, false],
];