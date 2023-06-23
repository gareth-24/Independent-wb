//Friday, June 15th
//This file contains the prep for the five questions
// ------------------------------------------------------------

//Question #1: Turning Strings to URLs
// URLs cannot have spaces. Instead, all spaces in a string are replaced with %20. Write an algorithm that replaces all spaces in a string with %20.

// You may not use the replace() method or regular expressions to solve this problem. Solve the problem with and without recursion.

// Example
// Input: "Jasmine Ann Jones"
// Output: "Jasmine%20Ann%20Jones"
const inputString = "Jasmin Ann Jones";

const urlFormat = (string) => {
  const wordArray = string.split(" ");
  const outputArray = wordArray.map(e => e + "%20");
  const outputString = outputArray.join('');
  return outputString;
};

const solution1 = urlFormat(inputString);
console.log(solution1);

//with recursion:
const input = "Jasmin Ann Jones";

const urlRecursion = (string) => {

  if (string.length === 0) {
    return '';
  }
  const nextChar = string[0];
  const remainingString = string.slice(1);
  let formattedChar = nextChar;

  if (nextChar === ' ') {
    formattedChar = '%20';
  }

  return formattedChar + urlRecursion(remainingString);
}

const solutionRecursion = urlRecursion(input);
console.log(solutionRecursion);

//Question #2: Array Deduping
// Write an algorithm that removes duplicates from an array. Do not use a function like filter() to solve this. Once you have solved the problem, demonstrate how it can be solved with filter(). Solve the problem with and without recursion.

// Example
// Input: [7, 9, "hi", 12, "hi", 7, 53]
// Output: [7, 9, "hi", 12, 53]
const inputArray = [7, 9, "hi", 12, "hi", 7, 53];

const removeDupes = (array) => {
  let nonRepeatedArray = []
  array.forEach((element) => {
    if (nonRepeatedArray.includes(element)) {
      console.log("remove this element, " + element);
    } else {
      nonRepeatedArray.push(element);
    }
  });
  return nonRepeatedArray;
}

const solution2 = removeDupes(inputArray);

//with recursion:
const removeDupesRecursively = (array) => {
  const removeDuplicatesRecursively = (arr, index = 0) => {
    // Base case: If the current index is equal to the array length, return an empty array.
    if (index === arr.length) {
      return [];
    }
    
    // Recursive case:
    const currentElement = arr[index];
    const remainingArray = removeDuplicatesRecursively(arr, index + 1);
    
    // Check if the current element exists in the remaining array.
    if (remainingArray.includes(currentElement)) {
      return remainingArray;
    } else {
      return [currentElement, ...remainingArray];
    }
  };
  return removeDuplicatesRecursively(array);
};

//with filter():
// const inputArray = [7, 9, "hi", 12, "hi", 7, 53];
const filteredOutput = inputArray.filter(function(value, index, array) {
  return array.indexOf(value) === index;
});


//Question #3: Compressing Strings
// Write an algorithm that takes a string with repeated characters and compresses them, using a number to show how many times the repeated character has been compressed. For instance, aaa would be written as 3a. Solve the problem with and without recursion.

// Example
// Input: "aaabccdddda"
// Output: "3ab2c4da"

const initialString = "aaabccdddda";
const compressString = (string)=> {
  let count = 1;
  let compressedString = "";
  for (let i = 1; i<=string.length; i++) {

    if (string[i] === string[i-1]) {
      count += 1;
    }

    if (string[i] !== string[i-1]) {
      if (count > 1) {
        compressedString += (count.toString() + string[i-1]);
      } else if (count === 1) {
        compressedString += string[i-1];
      }

      count = 1; //reset the character count to 1
    }
  }

  return compressedString;
}
const solution3 = compressString(initialString);

//with recursion:
const compressStringRecursive = (string, index = 1, count = 1, compressedString = "") => {
  // Base case: reached the end of the string
  if (index === string.length) {
    // Append the last character or its compressed representation to the result
    if (count > 1) {
      compressedString += (count.toString() + string[index - 1]);
    } else {
      compressedString += string[index - 1];
    }
    return compressedString;
  }

  // Recursive case
  if (string[index] === string[index - 1]) {
    // Increment the count if the current character is the same as the previous one
    return compressStringRecursive(string, index + 1, count + 1, compressedString);
  } else {
    // Append the compressed representation of the previous character to the result
    if (count > 1) {
      compressedString += (count.toString() + string[index - 1]);
    } else {
      compressedString += string[index - 1];
    }
    // Reset the count and continue with the next character
    return compressStringRecursive(string, index + 1, 1, compressedString);
  }
};
const solution3Recursive = compressStringRecursive(initialString);

//Question #4: Checking for Uniqueness
// Write an algorithm that determines whether all the elements in a string are unique. You may not convert the string into an array or use array methods to solve this problem. The algorithm should return a boolean.

// Example
// Input: "hello"
// Output: false

// Input: "copyright"
// Output: true
const input1 = "hello";
const input2 = "copyright";

const checkUnique = (string) => {
  const characterList = {};

  for (let i=0; i<string.length; i++) {
    const char = string[i];

    if (characterList[char]) {
      return false; //the character is repeated, so the function returns false
    } else {
      characterList[char] = char; //the character is unique, so add it to the list
    }
  }

  return true;
}
const result1 = checkUnique(input1); //returns false
const result2 = checkUnique(input2); //return true

//Question #5: Array Sorting
// Write an algorithm that sorts an array without using the sort() method. There are many different sorting algorithms — take the time to read about the following:

// Quick sort
// Merge sort
// Heap sort
// Insertion sort
// Bubble sort
// Selection sort
// You may implement any of the above algorithms (or your own) to solve the problem — as long as it doesn't use sort().

// Example
// Input: [9, 2, 7, 12]
// Output: [2, 7, 9, 12]

const inputArr = [9, 2, 7, 12];
// [2, 7], 9, [12]
// [], 2, [7], 9, [12]
const quickSort = (array) => {
  if (array.length <= 1) {
    return array; //once the subarrays have a length of 1, return the array and stop the loop
  }

  let pivot = array[0];
  let leftArray = [];
  let rightArray = [];

  //start at i = 1 because we are comparing each element to the pivot element,
  //the pivot element is at index = 0
  for (let i = 1; i < array.length; i++) {
    if (array[i] < pivot) {
      leftArray.push(array[i]);
    } else {
      rightArray.push(array[i]);
    }
  }
  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)]; //spread operator to concatenate
};
const sortedOutput = quickSort(inputArr);