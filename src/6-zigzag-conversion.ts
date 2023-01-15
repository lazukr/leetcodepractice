
/* brute force solution
    s.length -> N
    numRows -> R
*/
function convert(s: string, numRows: number): string {
    const rowSelector = [];

    let j = 0;

    // push the incrementing numbers
    // i.e. 3 => 0, 1, 2
    for (j; j < numRows; j++) {
        rowSelector.push(j);
    }

    // once you hit here, we decrement
    // i.e. j = 3
    // we want 1 so in total, we have 0, 1, 2, 1

    // minus 2 off of j for the following:
    // we want indices, so -1 for 1 less of max length (j is number of rows)
    // -1 for starting one less than the last index
    j -= 2;
    for (j; j > 0; j--) {
        rowSelector.push(j);
    }

    const rowSelectorLength = rowSelector.length;

    // row selector should have a full cycle of numbers
    const list: string[][] = [];

    // creating a list of list that will represent each row
    for (let i = 0; i < numRows; i++) {
        list.push([]);
    }

    // up to this point O( R )

    // use the row selector to find which row the next string should go to
    for (let i = 0; i < s.length; i++) {
        // modulo to wrap it around
        list[rowSelector[i % rowSelectorLength]].push(s[i]);
    }

    // up to this point O ( MAX(R, N) ) 

    let combined = "";

    // for loop -> O ( R )
    for (let i = 0; i < numRows; i++) {
        // inner for loop -> O ( N )
        for (let j = 0; j < list[i].length; j++) {
            combined += list[i][j];
        }
    }

    // total: O ( R * N )

    return combined;
};


export const code = (input: any[]) => {
    return convert(input[0], input[1]);
};
export const cases: [[string, number], string][] = [
    [["PAYPALISHIRING", 3], "PAHNAPLSIIGYIR"], // from test case,
    [["PAYPALISHIRING", 4], "PINALSIGYAHRPI"], // from test case,
    [["A", 1], "A"], // from test case
    [["AABC", 1], "AABC"], // test flat row works
    [["ABCD", 5], "ABCD"], // not enough elements to begin wrapping, so it's just one element on each row
    [["ABCDEFGHIJK", 5], "AIBHJCGKDFE"], // zig zag works
];

/*
example:
"PAYPALISHIRING", 3
P   A   H   N
A P L s I I G
Y   I   R 

read it from left to right, top to bottom
-> PAHNAPLSIIGYIR
*/


