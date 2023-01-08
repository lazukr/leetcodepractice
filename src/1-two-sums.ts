// initial solution
// O(N ^ 2)
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

    // not suppose to hit this
    throw Error("A solution is not found.");
};


// O(N)
function twoSumButFaster(nums: number[], target: number): number[] {
    // key is the number
    // value is the index in the array
    const solution: {[key: number]: number} = {};

    // for loop -> O(N)
    for (let i = 0; i < nums.length; i++) {
        // if the current value exist in the dictionary
        // then we know its complementary index
        // so return it

        // O(1)
        if (solution[nums[i]] !== undefined) {
            return [solution[nums[i]], i];
        }

        // if not in the solution
        // add the index of the complement value that would correspond to a solution
        // for example, [2, 7] looking for 9
        // in index 0, nums[0] = 2
        // we store solution[7] = 0
        // because the solution for 7 would be the value in index 0 (2) as 7 + 2 = 9

        // O(1)
        solution[target - nums[i]] = i;
    }
    
    // not suppose to hit this
    throw Error("A solution is not found.");
};

export const code = (input: any[]) => {
    return twoSumButFaster(input[0], input[1]);
};
export const cases: [[number[], number], number[]][] = [
    [[[2,7,11,15], 9], [0, 1]],     // first two = sum
    [[[3,2,4], 6], [1, 2]],         // last two = sum
    [[[3,3], 6], [0, 1]],           // the only two = sum
    [[[5, 6, 8, 12], 13], [0, 2]],  // first and third = sum
    [[[4, 3, 7, 5], 8], [1, 3]],    // second and fourth = sum
];