// initial solution
function twoSum(nums: number[], target: number): number[] {
    // wants answer in index of nums array
    // let N be number of elements in array

    // i for loop -> O(N)
    // j for loop -> decreases as N increases, but still O(N)
    // thus total -> O(N ^ 2)
    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }

    // safety, just return the index of the last two elements
    return [nums.length - 2, nums.length - 1];
};

export const code = (input: any[]) => {
    return twoSum(input[0], input[1]);
};
export const cases: [[number[], number], number[]][] = [
    [[[2,7,11,15], 9], [0, 1]],     // first two = sum
    [[[3,2,4], 6], [1, 2]],         // last two = sum
    [[[3,3], 6], [0, 1]],           // the only two = sum
    [[[5, 6, 8, 12], 13], [0, 2]],  // first and third = sum
    [[[4, 3, 7, 5], 8], [1, 3]],    // second and fourth = sum
];