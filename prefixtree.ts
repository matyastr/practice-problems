// Implement a "prefix tree" or "trie" datastructure.

// A prefix tree is a specialized tree data
// structure that has applications in search engines, spell checkers, autocomplete etc.
// In a prefix tree, the nodes represent adjacent letters and words are stored within the
// tree starting with their first letter, which has a child node that stores the second letter,
// which has a child node that stores the third letter and so on.  Example:  to store three words
// in the prefix tree, [hello, help, helix], the structure would look like so.
//                         i - x
//                       /
//   (start) - h - e - l - l - o
//           \           \
//            p            p

// This prefix tree implements the 3 operations:

// void insert(String word):  Inserts the given word into the trie

// boolean search(String word):  Searches the tree for the given word.  Returns true ONLY if 'word' was
// inserted previously using insert.  Returns false otherwise.

// boolean startsWith(String word): Searches the tree if there is a previously inserted word that has the
// given prefix.  Returns false otherwise.

// Run with tsx prefixtree.ts

class PrefixElement {
  char: string;
  list: PrefixElement[];

  constructor(char: string) {
    this.char = char;
    this.list = [];
  }

  getPrefixElement(char: string) {
    for (let pElem of this.list) {
      if (pElem.char === char) {
        return pElem;
      }
    }

    return new PrefixElement("");
  }

  hasPrefixElement(char: string) {
    for (let pElem of this.list) {
      if (pElem.char === char) {
        return true;
      }
    }

    return false;
  }

  addPrefixElement(char: string): PrefixElement {
    const newElem = new PrefixElement(char);
    this.list.push(newElem);

    return newElem;
  }
}

class PrefixList {
  rootElement: PrefixElement;

  constructor() {
    this.rootElement = new PrefixElement("");
  }

  #searchElement(
    element: PrefixElement,
    searchTerm: string,
    foundIndex: number
  ) {
    if (foundIndex >= searchTerm.length) {
      return true;
    }

    let hasBeenFound = false;

    for (let pElem of element.list) {
      if (!hasBeenFound) {
        if (pElem.char === searchTerm[foundIndex]) {
          const tempResult = this.#searchElement(
            pElem,
            searchTerm,
            foundIndex + 1
          );

          if (tempResult) {
            hasBeenFound = tempResult;
          }
        } else {
          const tempResult = this.#searchElement(pElem, searchTerm, 0);

          if (tempResult) {
            hasBeenFound = tempResult;
          }
        }
      }
    }

    return hasBeenFound;
  }

  #printElement(element: PrefixElement, indent: string) {
    for (let pElem of element.list) {
      this.#printElement(pElem, indent + "  ");
    }
  }

  insert(word: string) {
    let tempElement: PrefixElement = this.rootElement;

    for (let i = 0; i < word.length; i++) {
      if (tempElement.hasPrefixElement(word[i])) {
        tempElement = tempElement.getPrefixElement(word[i]);
      } else {
        tempElement = tempElement.addPrefixElement(word[i]);
      }
    }
  }

  startsWith(searchTerm: string): boolean {
    let tempElement: PrefixElement = this.rootElement;

    for (let i = 0; i < searchTerm.length; i++) {
      if (tempElement.hasPrefixElement(searchTerm[i])) {
        tempElement = tempElement.getPrefixElement(searchTerm[i]);
      } else {
        return false;
      }
    }

    return true;
  }

  search(searchTerm: string): boolean {
    return this.#searchElement(this.rootElement, searchTerm, 0);
  }

  printTree(indent: string = "") {
    this.#printElement(this.rootElement, indent);
  }
}

const prefixList = new PrefixList();

prefixList.insert("testers");
prefixList.insert("teams");
prefixList.insert("help");
prefixList.insert("automated test");

prefixList.printTree();

console.log("----- startsWith -----");
console.log(prefixList.startsWith("tea")); // true
console.log(prefixList.startsWith("asdf")); // false
console.log(prefixList.startsWith("tom")); // false
console.log(prefixList.startsWith("automated test")); // true
console.log(prefixList.startsWith(" ")); // false

console.log("----- search -----");
console.log(prefixList.search("te")); // true
console.log(prefixList.search("am")); // true
console.log(prefixList.search("asdf")); // false
console.log(prefixList.search("tea")); // true
console.log(prefixList.search(" ")); // true
