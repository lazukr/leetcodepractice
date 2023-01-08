// first solution
function isPalindrome(x: number): boolean {

    // n being number of digits in x (n = log10(x))
    // O(n) for toString
    const value = x.toString();
    let i = 0;
    let j = value.length - 1;
    
    // O(n) for this loop in when true
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

    // n being the number of digits in x (n = log10(x))
    // O(n)
    while (x > 0) {
        reverse *= base;
        reverse += (x % base);
        x = Math.floor(x / base);
    }

    return compare === reverse;
}

export const code = isPalindromeWithoutConverting;
export const cases: [number, boolean][] = [
    [-121, false],  // negative 3 number "palindrome"
    [-11, false],   // negative 2 number "palindrome"
    [-1, false],    // negative 1 number "palindrome"
    [0, true],      // ensure 0 works
    [11, true],     // positive palindrome
    [12, false],    // positive non palindrome
    [121, true],    // positive palindrome with different numbers
    [111, true],    // positive palindrome with all same numbers
    [122, false],   // positive non palindrome
];