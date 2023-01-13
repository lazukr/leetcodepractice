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
// idea

given two sorted arrays
[x1, x2, x3, x4,... xn]
[y1, y2, y3, y4,... yn]

we want to partition this vertically into two equal parts 
such that everything to the left of the partitial
is less than everything on the right

to do this, we take everything below the midpoint of the first array as our left partition
in order to balance this out, the left partition of the second array must be
arr1 length + arr2 length - midpoint

this ensures that the resulting "vertical" divider splits the two arrays into equal parts
e.g.

x1, x2, | x3, x4, x5
y1, y2, y3, | y4, y5

now the reason why we do this is because we already know x2 < x3 and y3 < y4
if we can show x2 < y4 and y3 < x3, then we've shown everything in the left is strictly less
than everything to the right

this effectively means that one of the edges is the median (avg of two in case of even)

Specific details
- we choose the smaller array to be at the top because we use it as our basis for doing partition
    - this limits the time complexity to be dependent on the smaller array
- a good starting place to divide is the middle of the smaller array
- in the case of a combined list with odd elements
    notice that when we partition the arrays, the second array will have more elements
    e.g. x list has length of 4, y list has length of 5
    if we take the mid point of x as 2, then y will be 3
    this means that if this is the solution, the median must be the max of the left partitions
    as it contains more elements

- in the case of a combined list with even elements
    since we are splitting the two partitions into strictly left < right
    one must be on the left side and one must be on the right side
    thus it's the max of the partition on left and min of the partition of right

- if we find that x2 > y4, this means we partition too much to the right
e.g. x1 maybe < y4. Thus reduce from the end to current x partition

- if we find that y3 > x3, this means we partition too much to the left
e.g. y3 maybe < x4. so we reduce from the start to current x partition

- these limit will be used to help determine where our midpoint will be
*/

function findMedianSortedArraysInLogTime(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        return findMedianSortedArraysInLogTime(nums2, nums1);
    }

    const num1Length = nums1.length;
    const num2Length = nums2.length;
    const mergedMidpoint = Math.floor((num1Length + num2Length + 1) / 2);

    let start = 0;
    let end = num1Length;

    while (start <= end) {
        const leftPartitionX = Math.floor((start + end) / 2);
        const leftPartitionY = mergedMidpoint - leftPartitionX;

        const leftX = leftPartitionX > 0 ? nums1[leftPartitionX - 1] : Number.MIN_SAFE_INTEGER;
        const leftY = leftPartitionY > 0 ? nums2[leftPartitionY - 1] : Number.MIN_SAFE_INTEGER;
        const rightX = leftPartitionX < num1Length ? nums1[leftPartitionX] : Number.MAX_SAFE_INTEGER;
        const rightY = leftPartitionY < num2Length ? nums2[leftPartitionY] : Number.MAX_SAFE_INTEGER;

        console.log(nums1);
        console.log(leftX, leftY);
        console.log(nums2);
        console.log(rightX, rightY);

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
export const cases: [[number[], number[]], number][] = [
    
    [[[0,0], [0,0]], 0],
    [[[1,3], [2]], 2], // element of second inserts into middle of first
    [[[1,2], [3,4]], 2.5], // two list where smallest from one list is larger than all from the other
    [[[1,2,3],[]], 2], // empty set for one
    [[[1,3],[2,4]], 2.5], // two elements that are not strictly larger or smaller than each other
    [[[1,3,5,7,9,11,13,15], [2,4,6,8,10,12,14,16]], 8.5],
    [[[1,7,12,22], [4, 9, 15]], 9],
];
