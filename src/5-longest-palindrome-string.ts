// initial solution
// O( N ^ 3 )
function longestPalindrome(s: string): string {
    let palindrome = "";

    // given S is length N
    // for loop on s -> O(N)
    for (let start = 0; start < s.length; start++) {
        // inner for loop on s -> O(N)
        for (let end = start; end < s.length; end++) {
            const ss = s.substring(start, end + 1);
            // the check is O(N)
            // this is essentially a 3rd loop, thus cubic
            if (checkPalindrome(ss) && ss.length > palindrome.length) {
                palindrome = ss;
            }
        }
    }

    // total O( N ^ 3 )
    return palindrome;
};

// this is O(N) for given n-element array s
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

// attempted to find a faster method but could not 
// consulted google and stumbled across this
// O (N^2)
function fasterLongestPalindrome(s: string): string {
    if (s === null || s === undefined || s.length < 1) {
        return "";
    }

    let start = 0;
    let end = 0;

    // for loop -> O (N)
    for (let i = 0; i < s.length; i++) {
        // palindrome expand is a max of O(N)
        const oddLength = palindromeExpand(s, i, i); // checks same character
        const evenLength = palindromeExpand(s, i, i + 1); // checks side by side character
        const length = Math.max(oddLength, evenLength);
        if (length > (end - start)) {
            // 0123456
            // abcdedc
            // i = 4
            // length = 5

            // 4 - (5 - 1) / 2 = 2
            // 4 + 5 / 2 = 6

            // 012346
            // cdakka
            // i = 3; i + 1 = 4
            // length = 4
            // since we are rounding down for these
            // having the - 1 makes it so that in the even case
            // it will result in the correct start points
            // e.g. 3 - floor((4 - 1) / 2)
            // = 3 - floor(3/2) 
            // = 3 - 1 = 2
            // as oppose to 3 - floor(4/2) -> 3 - 2 = 1
            // we could do an + 1 for this but this ruins it for the odd case
            // as the - 1 does not affect the result of the division
            // 3 - (4 - 1) / 2 = 2
            // 3 + 4 / 2 = 5

            start = i - Math.floor((length - 1) / 2);
            end = i + Math.floor(length / 2);
        }
    }
    // O( N^2 )
    
    // end + 1 to include the letter at s[end]
    return s.substring(start, end + 1);
}

// at most O(N), i.e. you look through all the characters in the string
function palindromeExpand(s: string, left: number, right: number): number {
    if (s === null || s === undefined || left > right) {
        return 0;
    }

    // expand left and right if it still matches
    // this is the crux of reducing the time complexity
    // instead making the sub strings and checking palindrome independently
    // this effectively does them together
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }

    // once we get out here, our left and right edges will be 1 over the limit
    // i.e.
    // 012345
    // cdakka
    // it will be:
    // i = 3, i + 1 = 4
    // end result:
    // left = 1
    // right = 6
    // thus if we take the differnce, 6 - 1 = 5
    // we will still be longer than the expected string by 1 due to adding on both sides
    // thus - 1
    // right - left - 1 => 6 - 1 -1 = 4

    // for the odd case
    // 01234567
    // abcdedck
    // it will be 
    // i = 4
    // end result
    // left = 1
    // right = 7
    // 7 - 1 - 1 = 5, which is the length of the expected string
    return right - left - 1;
}



export const code = fasterLongestPalindrome;

export const cases: [string, string][] = [
    ["cbbd", "bb"],
    
    ["abba", "abba"], // even palindrome
    // this solution fails as there are multiple solutions
    ["babad", "bab"], // can find palindrome in the beginning
    ["babad", "aba"], // can find palindrome in the beginning
    ["cbbd", "bb"], // can find palindrome in the middle
    // this solution fails aas there are mutliple solutions
    ["ab", "a"], // one letter palindrome
    ["ab", "b"], // one letter palindrome
    ["aba", "aba"], // whole word palindrome / odd palindrome
    ["dbabc", "bab"], // mid odd palindrome
    ["kcabbac", "cabbac"] // longer palindrome  
];