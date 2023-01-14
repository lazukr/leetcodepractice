// first (trivial, i say this because leetcode suggests a log solution exists) solution
// O(N + M)
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    // O(N + M)
    const merged = mergeTwoSortedArrays(nums1, nums2);
    // O(1)
    const median = getMedianOfArray(merged);
    return median;
};

function mergeTwoSortedArrays(nums1: number[], nums2: number[]): number[] {
    let i = 0;
    let j = 0;
    
    // N is elements in num1
    // M is elements in num2

    // we iterate through the whole thing and merge it
    // -> O (N + M)
    const merged = [];
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] < nums2[j]) {
            merged.push(nums1[i]);
            i++;
        }
        else {
            merged.push(nums2[j]);
            j++;
        }
    }

    // we've reached the end of one of these arrays
    // that means the other is strictly larger
    // so now we can just push the remaining items to the merged list

    while (i < nums1.length) {
        merged.push(nums1[i]);
        i++;
    }

    while (j < nums2.length) {
        merged.push(nums2[j]);
        j++;
    }

    return merged;
}

// this whole function is not dependent on the size of the input array
// O(1)
function getMedianOfArray(arr: number[]): number {
    const midpoint = Math.floor(arr.length / 2);
    // even, so grab the two middle elements
    if (arr.length % 2 === 0) {
        return (arr[midpoint] + arr[midpoint - 1]) / 2;
    // odd, only need to grab the midpoint
    } else {
        return arr[midpoint];
    }
}

/* leet code is saying it should be O(LOG(N + M))
// will need to try
// had to use google to understand this solution

general approach 
given two sorted arrays
[x1, x2, x3, x4,... xn]
[y1, y2, y3, y4,... yn]

we want to split these into two EQUAL partitions down both arrays
such that everything on the left is strictly less than the right

we can achieve this by looking at the values before and afther the split
if we can show that the left side is strictly less than the right side
then the median must be one of the values we selected to compare 
(since they're in the middle due to it being equal partitions)

thus we can imagine a scenario

x1, x2, ..., x_left, x_right, .... xn
y1, y2, ..., y_left, y_right, .... yn

we know that x_left <= x_right and y_left <= y_right
thus if x_left <= y_right AND y_left <= x_right, 
then everything in the left (x1 to x_left, y1 to y_left)
is less than everything in the right (x_right to xn, y_right to yn)

[A] if x_left > y_right, this means that our median value is towards the left for x
this also means that all values after x_left can no longer be a candidate
as a median value, thus they no longer need to be considered

[B] if y_left > x_right, this means that our median value is towards the right for x
this also mean that all values up to x_right can no longer be a candidate
as aa median value, thus they no longer need to be considered

Now we need aa good place to start splitting
the easiest option is to just use the midpoint of the range of x
e.g. start = 0, end = length of x, midpoint = (start + length) / 2

And from what we outlined in [A] and [B], it follows that on every iteration,
we constraint our range to find the midpoint by updating the start or end values to be
whatever x_left / x_right would have been, this effectively means each iteration
we are reducing our search items by half, which gives rise to the log time.

as for choosing the split for y,
we can find the total number of items in the combine x and y
then find the mid point value for it
then use this value to subtract whatever midpoint we set for x
thus this will always be a complementary number of y to ensure lhs items = rhs items
for most cases (lhs will have more if odd)



*/

function findMedianSortedArraysInLogTime(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        return findMedianSortedArraysInLogTime(nums2, nums1);
    }

    const num1Length = nums1.length;
    const num2Length = nums2.length;
    const mergedMidpoint = Math.floor((num1Length + num2Length + 1) / 2);
    // the reasion for adding 1 is due to the fact that this puts more items
    // onto the left side, thus in the case of odd total,
    // we can guarantee that the value is on the left side

    let start = 0;
    let end = num1Length;

    while (start <= end) {
        const leftPartitionX = Math.floor((start + end) / 2);
        const leftPartitionY = mergedMidpoint - leftPartitionX;

        const leftX = leftPartitionX > 0 ? nums1[leftPartitionX - 1] : Number.MIN_SAFE_INTEGER;
        const leftY = leftPartitionY > 0 ? nums2[leftPartitionY - 1] : Number.MIN_SAFE_INTEGER;
        const rightX = leftPartitionX < num1Length ? nums1[leftPartitionX] : Number.MAX_SAFE_INTEGER;
        const rightY = leftPartitionY < num2Length ? nums2[leftPartitionY] : Number.MAX_SAFE_INTEGER;

        // left partition strictly less than or equal right partition
        if (leftX <= rightY &&
            leftY <= rightX)
            {
                // even
                if ((num1Length + num2Length) % 2 === 0) {
                    return (Math.max(leftX, leftY) + Math.min(rightX, rightY)) / 2;
                }                

                return Math.max(leftX, leftY);
            }
        else if (leftX > rightY) {
            end = leftPartitionX - 1;
        }
        else {
            start = leftPartitionX + 1;
        }
    }

    // should never reach here
    return 0;
}

export const code = (input: any) => {
    return findMedianSortedArraysInLogTime(input[0], input[1]);
}; 

const BigNumber = 50000;
export const cases: [[number[], number[]], number][] = [
    
    [[[0,0], [0,0]], 0],
    [[[1,3], [2]], 2], // element of second inserts into middle of first
    [[[1,2], [3,4]], 2.5], // two list where smallest from one list is larger than all from the other
    [[[1,2,3],[]], 2], // empty set for one
    [[[1,3],[2,4]], 2.5], // two elements that are not strictly larger or smaller than each other
    [[[1,3,5,7,9,11,13,15], [2,4,6,8,10,12,14,16]], 8.5],
    [[[1,7,12,22], [4, 9, 15]], 9],
    [[[...Array(BigNumber).keys()],[...Array(BigNumber).keys()].map(i => i + BigNumber + 1)],BigNumber]
    // leetcode test cases aren't sufficient to notice to difference between linear vs log time experimentally
    // thus made super large number of array with worse case possible for the log case (median is at the end)
    // difference locally is 12 ms on linear time, 2 ms on log time.
];