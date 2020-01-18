function mergeSort(array) {
    // console.log(array)
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    console.log(left, right)
    left = mergeSort(left);
    right = mergeSort(right);
    return merge(left, right, array);
};

function merge(left, right, array) {
    
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i = leftIndex; i < left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i = rightIndex; i < right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};

// let arr = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]

// console.log(mergeSort(arr))

// What is the resulting list that will be sorted after 3 recursive calls to mergesort?
// [21, 1]

// What is the resulting list that will be sorted after 16 recursive calls to mergesort?
// [16, 49, 39, 27, 43, 34, 46, 40]

// What are the first 2 lists to be merged?
// [21, 1, 26, 45, 29, 28, 2, 9]  [16, 49, 39, 27, 43, 34, 46, 40]

// Which two lists would be merged on the 7th merge?
// [29] [28]


function quickSort(array, start = 0, end = array.length) {
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i = start; i < end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    // console.log(array)
    swap(array, end-1, j);
    return j;
};

function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};

let arr = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]

// console.log(quickSort(arr))

// The pivot could have been either 14 or 17

// When using the last item on the list as a pivot
// [3, 10, 9, 12, 19, 14, 17, 16, 13, 15]

// When using the first item on the list as a pivot
// [14, 13, 10, 3, 9, 12, 15, 16, 19, 17]

const sortStr = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5'
const sortArr = sortStr.split(' ')
let numberArr = []
for (let i = 0;i<sortArr.length;i++) {
  numberArr.push(parseInt(sortArr[i]))
}

// console.log(quickSort(numberArr))

class _Node {
    constructor(value, next) {
      this.value = value;
      this.next = next;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
    insertFirst(item) {
      this.head = new _Node(item, this.head)
    }
    insertLast(item) {
      if (this.head === null) {
        this.insertFirst(item)
      } else {
        let tempNode = this.head;
        while (tempNode.next !== null) {
          tempNode = tempNode.next;
        }
        tempNode.next = new _Node(item, null);
      }
    }
    find(item) { 
      // Start at the head
      let currNode = this.head;
      // If the list is empty
      if (!this.head) {
          return null;
      }
      // Check for the item 
      while (currNode.value !== item) {
        /* Return null if it's the end of the list 
            and the item is not on the list */
        if (currNode.next === null) {
            return null;
        }
        else {
            // Otherwise, keep looking 
            currNode = currNode.next;
        }
      }
      // Found it
      return currNode;
    }
    remove(item){ 
      // If the list is empty
      if (!this.head) {
        return null;
      }
      // If the node to be removed is head, make the next node head
      if (this.head.value === item) {
        this.head = this.head.next;
        return;
      }
      // Start at the head
      let currNode = this.head;
      // Keep track of previous
      let previousNode = this.head;
  
      while ((currNode !== null) && (currNode.value !== item)) {
        // Save the previous node 
        previousNode = currNode;
        currNode = currNode.next;
      }
      if (currNode === null) {
        console.log('Item not found');
        return;
      }
      previousNode.next = currNode.next;
    }
    mergeSort(head = this.head) {
        if (head === null || head.next === null) {
            return head;
        }
        let prev = null;
        let slow = head;
        let fast = head;
        while (fast !== null && fast.next !== null) {
            fast = fast.next.next;
            prev = slow;
            slow = slow.next;
        }
        prev.next = null;
        const l1 = this.mergeSort(head);
        const l2 = this.mergeSort(slow);
        return this.merge(l1, l2);
    };
    merge(l1, l2) {
        const head = new LinkedList();
        let current = head;
        while (l1 !== null && l2 !== null) {
            if (l1.value < l2.value) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        current.next = (l1 === null) ? l2 : l1;
        return head.next;
    }
    printList() { 
        let currNode = this.head; 
        let arr = []; 
        while (currNode) { 
            arr.push(currNode.value);
            currNode = currNode.next; 
        } 
        console.log(arr); 
    }
  }
  
  function main() {
    let SLL = new LinkedList();
    SLL.insertLast(3)
    SLL.insertLast(5)
    SLL.insertLast(8)
    SLL.insertLast(1)
    SLL.insertLast(2)
    SLL.insertLast(7)
    return SLL;
  }
  
  let SLL = main()

// SLL.mergeSort()
// SLL.printList()

let arr2 = [4,7,3,8,1,6]

// [1]

function bucketSort(array, high, low) {
    let newArr = [low]
    console.log(newArr)
    for (let i = 0; i < array.length; i++) {
        console.log(array[i])
        if (array[i] === low || array[i] === high) {
            continue
        }

        if (array[i] > low) {
            newArr.push(array[i])
        }
    }
    newArr.push(high)
    console.log(newArr)
}


bucketSort(arr2, 8, 1)













  
  
//   function splitList(node, count) {
//     let root = Object.assign({},node)
//     while (node != null) {
//       node = node.next
//       count++
//     }
//     let half = Math.floor(count/2)
//     let previous = root;
//     while (half > 1) {
//       previous = previous.next;
//       half-- 
//     }
//     newNode = previous.next;
//     previous.next = null
//     return {root, newNode}
//   }
  
//   function mergeSort(node) {
//       if (node.next === null) {
//           return node;
//       }
  
//       let count = 0
//       let lists = splitList(node,count)
//       let left = lists.root
//       let right = lists.newNode
  
//       left = mergeSort(left);
//       right = mergeSort(right);
//       return merge(left, right, node);
//   };
  
//   function merge(left, right, node) {
//       let leftIndex = 0;
//       let rightIndex = 0;
//       let outputIndex = 0;
//       while (leftIndex < left.length && rightIndex < right.length) {
//           if (left[leftIndex] < right[rightIndex]) {
//               array[outputIndex++] = left[leftIndex++];
//           }
//           else {
//               array[outputIndex++] = right[rightIndex++];
//           }
//       }
  
//       for (let i = leftIndex; i < left.length; i++) {
//           array[outputIndex++] = left[i];
//       }
  
//       for (let i = rightIndex; i < right.length; i++) {
//           array[outputIndex++] = right[i];
//       }
//       return array;
//   };