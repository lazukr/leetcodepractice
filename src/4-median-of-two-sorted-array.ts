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

// leet code is saying it should be O(LOG(N + M))
// will need to try
function findMedianSortedArraysInLogTime(nums1: number[], nums2: number[]): number {
    return 0;
}

export const code = (input: any) => {
    return findMedianSortedArrays(input[0], input[1]);
}; 
export const cases: [[number[], number[]], number][] = [
    [[[0,0], [0,0]], 0],
    [[[1,3], [2]], 2], // element of second inserts into middle of first
    [[[1,2], [3,4]], 2.5], // two list where smallest from one list is larger than all from the other
    [[[1,2,3],[]], 2], // empty set for one
    [[[1,3],[2,4]], 2.5], // two elements that are not strictly larger or smaller than each other
];