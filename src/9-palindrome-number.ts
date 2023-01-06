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

export const code = isPalindrome;
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