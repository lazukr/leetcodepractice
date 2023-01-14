// initial solution
// O( N ^ 2 )
function longestPalindrome(s: string): string {
    let palindrome = "";

    // given S is length N
    // for loop on s -> O(N)
    for (let start = 0; start < s.length; start++) {
        // inner for loop on s -> O(N)
        for (let end = start; end < s.length; end++) {
            const ss = s.substring(start, end + 1);
            if (checkPalindrome(ss) && ss.length > palindrome.length) {
                palindrome = ss;
            }
        }
    }

    // total O( N ^ 2 )
    return palindrome;
};

function checkPalindrome(s: string) {
    const length = s.length;
    let i = 0;
    let j = length - 1;

    while (i <= j) {
        if (s[i] === s[j]) {
            i++;
            j--;
        }
        else {
            return false;
        }
    }
    return true;
}

export const code = longestPalindrome;

export const cases: [string, string][] = [
    ["abba", "abba"],
    ["babad", "bab"],
    ["cbbd", "bb"],
    ["ab", "a"],
    ["aba", "aba"],
    ["dbabc", "bab"],
    ["kcabbac", "cabbac"]
];