var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LunaJam;
(function (LunaJam) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 900, 369, Phaser.AUTO, 'content', null);
            this.state.add('Boot', LunaJam.Boot, false);
            this.state.add('Preloader', LunaJam.Preloader, false);
            this.state.add('MainMenu', LunaJam.MainMenu, false);
            this.state.add('GamePlay', LunaJam.GamePlay, false);
            this.state.add('PostGame', LunaJam.PostGame, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    LunaJam.Game = Game;
})(LunaJam || (LunaJam = {}));
window.onload = function () {
    var game = new LunaJam.Game();
};
var LunaJam;
(function (LunaJam) {
    var MasterGroup = (function (_super) {
        __extends(MasterGroup, _super);
        function MasterGroup(game) {
            _super.call(this, game, null, "Master Group");
            this.bg = new Phaser.Group(game, this, "Background");
            this.notes = new Phaser.Group(game, this, "Notes");
            this.notePress = new Phaser.Group(game, this, "NotePress");
            this.ui = new Phaser.Group(game, this, "UI");
        }
        return MasterGroup;
    })(Phaser.Group);
    LunaJam.MasterGroup = MasterGroup;
})(LunaJam || (LunaJam = {}));
// Copyright 2013 Basarat Ali Syed. All Rights Reserved.
//
// Licensed under MIT open source license http://opensource.org/licenses/MIT
//
// Orginal javascript code was by Mauricio Santos
/**
 * @namespace Top level namespace for collections, a TypeScript data structure library.
 */
var collections;
(function (collections) {
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
    /**
     * Default function to compare element order.
     * @function
     */
    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        }
        else if (a === b) {
            return 0;
        }
        else {
            return 1;
        }
    }
    collections.defaultCompare = defaultCompare;
    /**
     * Default function to test equality.
     * @function
     */
    function defaultEquals(a, b) {
        return a === b;
    }
    collections.defaultEquals = defaultEquals;
    /**
     * Default function to convert an object to a string.
     * @function
     */
    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return '$s' + item;
        }
        else {
            return '$o' + item.toString();
        }
    }
    collections.defaultToString = defaultToString;
    /**
    * Joins all the properies of the object using the provided join string
    */
    function makeString(item, join) {
        if (join === void 0) { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (collections.isString(item)) {
            return item.toString();
        }
        else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    collections.makeString = makeString;
    /**
     * Checks if the given argument is a function.
     * @function
     */
    function isFunction(func) {
        return (typeof func) === 'function';
    }
    collections.isFunction = isFunction;
    /**
     * Checks if the given argument is undefined.
     * @function
     */
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    collections.isUndefined = isUndefined;
    /**
     * Checks if the given argument is a string.
     * @function
     */
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    collections.isString = isString;
    /**
     * Reverses a compare function.
     * @function
     */
    function reverseCompareFunction(compareFunction) {
        if (!collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                }
                else if (a === b) {
                    return 0;
                }
                else {
                    return -1;
                }
            };
        }
        else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    collections.reverseCompareFunction = reverseCompareFunction;
    /**
     * Returns an equal function given a compare function.
     * @function
     */
    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    collections.compareToEquals = compareToEquals;
    /**
     * @namespace Contains various functions for manipulating arrays.
     */
    var arrays;
    (function (arrays) {
        /**
         * Returns the position of the first occurrence of the specified item
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the first occurrence of the specified element
         * within the specified array, or -1 if not found.
         */
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;
        /**
         * Returns the position of the last occurrence of the specified element
         * within the specified array.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the position of the last occurrence of the specified element
         * within the specified array or -1 if not found.
         */
        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;
        /**
         * Returns true if the specified array contains the specified element.
         * @param {*} array the array in which to search the element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the specified array contains the specified element.
         */
        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;
        /**
         * Removes the first ocurrence of the specified element from the specified array.
         * @param {*} array the array in which to search element.
         * @param {Object} item the element to search.
         * @param {function(Object,Object):boolean=} equalsFunction optional function to
         * check equality between 2 elements.
         * @return {boolean} true if the array changed after this call.
         */
        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;
        /**
         * Returns the number of elements in the specified array equal
         * to the specified object.
         * @param {Array} array the array in which to determine the frequency of the element.
         * @param {Object} item the element whose frequency is to be determined.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between 2 elements.
         * @return {number} the number of elements in the specified array
         * equal to the specified object.
         */
        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;
        /**
         * Returns true if the two specified arrays are equal to one another.
         * Two arrays are considered equal if both arrays contain the same number
         * of elements, and all corresponding pairs of elements in the two
         * arrays are equal and are in the same order.
         * @param {Array} array1 one array to be tested for equality.
         * @param {Array} array2 the other array to be tested for equality.
         * @param {function(Object,Object):boolean=} equalsFunction optional function used to
         * check equality between elemements in the arrays.
         * @return {boolean} true if the two arrays are equal
         */
        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || collections.defaultEquals;
            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;
        /**
         * Returns shallow a copy of the specified array.
         * @param {*} array the array to copy.
         * @return {Array} a copy of the specified array
         */
        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;
        /**
         * Swaps the elements at the specified positions in the specified array.
         * @param {Array} array The array in which to swap elements.
         * @param {number} i the index of one element to be swapped.
         * @param {number} j the index of the other element to be swapped.
         * @return {boolean} true if the array is defined and the indexes are valid.
         */
        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;
        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;
        /**
         * Executes the provided function once for each element present in this array
         * starting from index 0 to length - 1.
         * @param {Array} array The array in which to iterate.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(arrays = collections.arrays || (collections.arrays = {}));
    var LinkedList = (function () {
        /**
        * Creates an empty Linked List.
        * @class A linked list is a data structure consisting of a group of nodes
        * which together represent a sequence.
        * @constructor
        */
        function LinkedList() {
            /**
            * First node in the list
            * @type {Object}
            * @private
            */
            this.firstNode = null;
            /**
            * Last node in the list
            * @type {Object}
            * @private
            */
            this.lastNode = null;
            /**
            * Number of elements in the list
            * @type {number}
            * @private
            */
            this.nElements = 0;
        }
        /**
        * Adds an element to this list.
        * @param {Object} item element to be added.
        * @param {number=} index optional index to add the element. If no index is specified
        * the element is added to the end of this list.
        * @return {boolean} true if the element was added or false if the index is invalid
        * or if the element is undefined.
        */
        LinkedList.prototype.add = function (item, index) {
            if (collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                // First node in the list.
                this.firstNode = newNode;
                this.lastNode = newNode;
            }
            else if (index === this.nElements) {
                // Insert at the end.
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            }
            else if (index === 0) {
                // Change first node.
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            }
            else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };
        /**
        * Returns the first element in this list.
        * @return {*} the first element of the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };
        /**
        * Returns the last element in this list.
        * @return {*} the last element in the list or undefined if the list is
        * empty.
        */
        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };
        /**
         * Returns the element at the specified position in this list.
         * @param {number} index desired index.
         * @return {*} the element at the given index or undefined if the index is
         * out of bounds.
         */
        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };
        /**
         * Returns the index in this list of the first occurrence of the
         * specified element, or -1 if the List does not contain this element.
         * <p>If the elements inside this list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction Optional
         * function used to check if two elements are equal.
         * @return {number} the index in this list of the first occurrence
         * of the specified element, or -1 if this list does not contain the
         * element.
         */
        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };
        /**
           * Returns true if this list contains the specified element.
           * <p>If the elements inside the list are
           * not comparable with the === operator a custom equals function should be
           * provided to perform searches, the function must receive two arguments and
           * return true if they are equal, false otherwise. Example:</p>
           *
           * <pre>
           * var petsAreEqualByName = function(pet1, pet2) {
           *  return pet1.name === pet2.name;
           * }
           * </pre>
           * @param {Object} item element to search for.
           * @param {function(Object,Object):boolean=} equalsFunction Optional
           * function used to check if two elements are equal.
           * @return {boolean} true if this list contains the specified element, false
           * otherwise.
           */
        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };
        /**
         * Removes the first occurrence of the specified element in this list.
         * <p>If the elements inside the list are
         * not comparable with the === operator a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName = function(pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} item element to be removed from this list, if present.
         * @return {boolean} true if the list contained the specified element.
         */
        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || collections.defaultEquals;
            if (this.nElements < 1 || collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    }
                    else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };
        /**
         * Removes all of the elements from this list.
         */
        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this list is equal to the given list.
         * Two lists are equal if they have the same elements in the same order.
         * @param {LinkedList} other the other list.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function used to check if two elements are equal. If the elements in the lists
         * are custom objects you should provide a function, otherwise
         * the === operator is used to check equality between elements.
         * @return {boolean} true if this list is equal to the given list.
         */
        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || collections.defaultEquals;
            if (!(other instanceof collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };
        /**
        * @private
        */
        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };
        /**
         * Removes the element at the specified position in this list.
         * @param {number} index given index.
         * @return {*} removed element or undefined if the index is out of bounds.
         */
        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                //First node in the list.
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            }
            else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                }
                else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };
        /**
         * Executes the provided function once for each element present in this list in order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };
        /**
         * Reverses the order of the elements in this linked list (makes the last
         * element first, and the first element last).
         */
        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };
        /**
         * Returns an array containing all of the elements in this list in proper
         * sequence.
         * @return {Array.<*>} an array containing all of the elements in this list,
         * in proper sequence.
         */
        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };
        /**
         * Returns the number of elements in this list.
         * @return {number} the number of elements in this list.
         */
        LinkedList.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this list contains no elements.
         * @return {boolean} true if this list contains no elements.
         */
        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        LinkedList.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        /**
         * @private
         */
        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };
        /**
         * @private
         */
        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    })();
    collections.LinkedList = LinkedList; // End of linked list 
    var Dictionary = (function () {
        /**
         * Creates an empty dictionary.
         * @class <p>Dictionaries map keys to values; each key can map to at most one value.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to unique
         * strings must be provided. Example:</p>
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         */
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || collections.defaultToString;
        }
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table['$' + this.toStr(key)];
            if (collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        Dictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var ret;
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            }
            else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        Dictionary.prototype.remove = function (key) {
            var k = '$' + this.toStr(key);
            var previousElement = this.table[k];
            if (!collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this dictionary.
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (has(this.table, name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };
        /**
         * Returns true if this dictionary contains a mapping for the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary contains a mapping for the
         * specified key.
         */
        Dictionary.prototype.containsKey = function (key) {
            return !collections.isUndefined(this.getValue(key));
        };
        /**
        * Removes all mappings from this dictionary.
        * @this {collections.Dictionary}
        */
        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        Dictionary.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };
        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    collections.Dictionary = Dictionary; // End of dictionary
    /**
     * This class is used by the LinkedDictionary Internally
     * Has to be a class, not an interface, because it needs to have
     * the 'unlink' function defined.
     */
    var LinkedDictionaryPair = (function () {
        function LinkedDictionaryPair(key, value) {
            this.key = key;
            this.value = value;
        }
        LinkedDictionaryPair.prototype.unlink = function () {
            this.prev.next = this.next;
            this.next.prev = this.prev;
        };
        return LinkedDictionaryPair;
    })();
    var LinkedDictionary = (function (_super) {
        __extends(LinkedDictionary, _super);
        function LinkedDictionary(toStrFunction) {
            _super.call(this, toStrFunction);
            this.head = new LinkedDictionaryPair(null, null);
            this.tail = new LinkedDictionaryPair(null, null);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        }
        /**
         * Inserts the new node to the 'tail' of the list, updating the
         * neighbors, and moving 'this.tail' (the End of List indicator) that
         * to the end.
         */
        LinkedDictionary.prototype.appendToTail = function (entry) {
            var lastNode = this.tail.prev;
            lastNode.next = entry;
            entry.prev = lastNode;
            entry.next = this.tail;
            this.tail.prev = entry;
        };
        /**
         * Retrieves a linked dictionary from the table internally
         */
        LinkedDictionary.prototype.getLinkedDictionaryPair = function (key) {
            if (collections.isUndefined(key)) {
                return undefined;
            }
            var k = '$' + this.toStr(key);
            var pair = (this.table[k]);
            return pair;
        };
        /**
         * Returns the value to which this dictionary maps the specified key.
         * Returns undefined if this dictionary contains no mapping for this key.
         * @param {Object} key key whose associated value is to be returned.
         * @return {*} the value to which this dictionary maps the specified key or
         * undefined if the map contains no mapping for this key.
         */
        LinkedDictionary.prototype.getValue = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                return pair.value;
            }
            return undefined;
        };
        /**
         * Removes the mapping for this key from this dictionary if it is present.
         * Also, if a value is present for this key, the entry is removed from the
         * insertion ordering.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @return {*} previous value associated with specified key, or undefined if
         * there was no mapping for key.
         */
        LinkedDictionary.prototype.remove = function (key) {
            var pair = this.getLinkedDictionaryPair(key);
            if (!collections.isUndefined(pair)) {
                _super.prototype.remove.call(this, key); // This will remove it from the table
                pair.unlink(); // This will unlink it from the chain
                return pair.value;
            }
            return undefined;
        };
        /**
        * Removes all mappings from this LinkedDictionary.
        * @this {collections.LinkedDictionary}
        */
        LinkedDictionary.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.head.next = this.tail;
            this.tail.prev = this.head;
        };
        /**
         * Internal function used when updating an existing KeyValue pair.
         * It places the new value indexed by key into the table, but maintains
         * its place in the linked ordering.
         */
        LinkedDictionary.prototype.replace = function (oldPair, newPair) {
            var k = '$' + this.toStr(newPair.key);
            // set the new Pair's links to existingPair's links
            newPair.next = oldPair.next;
            newPair.prev = oldPair.prev;
            // Delete Existing Pair from the table, unlink it from chain.
            // As a result, the nElements gets decremented by this operation
            this.remove(oldPair.key);
            // Link new Pair in place of where oldPair was,
            // by pointing the old pair's neighbors to it.
            newPair.prev.next = newPair;
            newPair.next.prev = newPair;
            this.table[k] = newPair;
            // To make up for the fact that the number of elements was decremented,
            // We need to increase it by one.
            ++this.nElements;
        };
        /**
         * Associates the specified value with the specified key in this dictionary.
         * If the dictionary previously contained a mapping for this key, the old
         * value is replaced by the specified value.
         * Updating of a key that already exists maintains its place in the
         * insertion order into the map.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value value to be associated with the specified key.
         * @return {*} previous value associated with the specified key, or undefined if
         * there was no mapping for the key or if the key/value are undefined.
         */
        LinkedDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return undefined;
            }
            var existingPair = this.getLinkedDictionaryPair(key);
            var newPair = new LinkedDictionaryPair(key, value);
            var k = '$' + this.toStr(key);
            // If there is already an element for that key, we 
            // keep it's place in the LinkedList
            if (!collections.isUndefined(existingPair)) {
                this.replace(existingPair, newPair);
                return existingPair.value;
            }
            else {
                this.appendToTail(newPair);
                this.table[k] = newPair;
                ++this.nElements;
                return undefined;
            }
        };
        /**
         * Returns an array containing all of the keys in this LinkedDictionary, ordered
         * by insertion order.
         * @return {Array} an array containing all of the keys in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.keys = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(key);
            });
            return array;
        };
        /**
         * Returns an array containing all of the values in this LinkedDictionary, ordered by
         * insertion order.
         * @return {Array} an array containing all of the values in this LinkedDictionary,
         * ordered by insertion order.
         */
        LinkedDictionary.prototype.values = function () {
            var array = [];
            this.forEach(function (key, value) {
                array.push(value);
            });
            return array;
        };
        /**
        * Executes the provided function once for each key-value pair
        * present in this LinkedDictionary. It is done in the order of insertion
        * into the LinkedDictionary
        * @param {function(Object,Object):*} callback function to execute, it is
        * invoked with two arguments: key and value. To break the iteration you can
        * optionally return false.
        */
        LinkedDictionary.prototype.forEach = function (callback) {
            var crawlNode = this.head.next;
            while (crawlNode.next != null) {
                var ret = callback(crawlNode.key, crawlNode.value);
                if (ret === false) {
                    return;
                }
                crawlNode = crawlNode.next;
            }
        };
        return LinkedDictionary;
    })(Dictionary);
    collections.LinkedDictionary = LinkedDictionary; // End of LinkedDictionary
    // /**
    //  * Returns true if this dictionary is equal to the given dictionary.
    //  * Two dictionaries are equal if they contain the same mappings.
    //  * @param {collections.Dictionary} other the other dictionary.
    //  * @param {function(Object,Object):boolean=} valuesEqualFunction optional
    //  * function used to check if two values are equal.
    //  * @return {boolean} true if this dictionary is equal to the given dictionary.
    //  */
    // collections.Dictionary.prototype.equals = function(other,valuesEqualFunction) {
    // 	var eqF = valuesEqualFunction || collections.defaultEquals;
    // 	if(!(other instanceof collections.Dictionary)){
    // 		return false;
    // 	}
    // 	if(this.size() !== other.size()){
    // 		return false;
    // 	}
    // 	return this.equalsAux(this.firstNode,other.firstNode,eqF);
    // }
    var MultiDictionary = (function () {
        /**
         * Creates an empty multi dictionary.
         * @class <p>A multi dictionary is a special kind of dictionary that holds
         * multiple values against each key. Setting a value into the dictionary will
         * add the value to an array at that key. Getting a key will return an array,
         * holding all the values set to that key.
         * You can configure to allow duplicates in the values.
         * This implementation accepts any kind of objects as keys.</p>
         *
         * <p>If the keys are custom objects a function which converts keys to strings must be
         * provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
           *  return pet.name;
           * }
         * </pre>
         * <p>If the values are custom objects a function to check equality between values
         * must be provided. Example:</p>
         *
         * <pre>
         * function petsAreEqualByAge(pet1,pet2) {
           *  return pet1.age===pet2.age;
           * }
         * </pre>
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function
         * to convert keys to strings. If the keys aren't strings or if toString()
         * is not appropriate, a custom function which receives a key and returns a
         * unique string must be provided.
         * @param {function(Object,Object):boolean=} valuesEqualsFunction optional
         * function to check if two values are equal.
         *
         * @param allowDuplicateValues
         */
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (allowDuplicateValues === void 0) { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        /**
        * Returns an array holding the values to which this dictionary maps
        * the specified key.
        * Returns an empty array if this dictionary contains no mappings for this key.
        * @param {Object} key key whose associated values are to be returned.
        * @return {Array} an array holding the values to which this dictionary maps
        * the specified key.
        */
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (collections.isUndefined(values)) {
                return [];
            }
            return collections.arrays.copy(values);
        };
        /**
         * Adds the value to the array associated with the specified key, if
         * it is not already present.
         * @param {Object} key key with which the specified value is to be
         * associated.
         * @param {Object} value the value to add to the array at the key
         * @return {boolean} true if the value was not already associated with that key.
         */
        MultiDictionary.prototype.setValue = function (key, value) {
            if (collections.isUndefined(key) || collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };
        /**
         * Removes the specified values from the array of values associated with the
         * specified key. If a value isn't given, all values associated with the specified
         * key are removed.
         * @param {Object} key key whose mapping is to be removed from the
         * dictionary.
         * @param {Object=} value optional argument to specify the value to remove
         * from the array associated with the specified key.
         * @return {*} true if the dictionary changed, false if the key doesn't exist or
         * if the specified value isn't associated with the specified key.
         */
        MultiDictionary.prototype.remove = function (key, value) {
            if (collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };
        /**
         * Returns an array containing all of the keys in this dictionary.
         * @return {Array} an array containing all of the keys in this dictionary.
         */
        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };
        /**
         * Returns an array containing all of the values in this dictionary.
         * @return {Array} an array containing all of the values in this dictionary.
         */
        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };
        /**
         * Returns true if this dictionary at least one value associatted the specified key.
         * @param {Object} key key whose presence in this dictionary is to be
         * tested.
         * @return {boolean} true if this dictionary at least one value associatted
         * the specified key.
         */
        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };
        /**
         * Removes all mappings from this dictionary.
         */
        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };
        /**
         * Returns the number of keys in this dictionary.
         * @return {number} the number of key-value mappings in this dictionary.
         */
        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };
        /**
         * Returns true if this dictionary contains no mappings.
         * @return {boolean} true if this dictionary contains no mappings.
         */
        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    })();
    collections.MultiDictionary = MultiDictionary; // end of multi dictionary 
    var Heap = (function () {
        /**
         * Creates an empty Heap.
         * @class
         * <p>A heap is a binary tree, where the nodes maintain the heap property:
         * each node is smaller than each of its children and therefore a MinHeap
         * This implementation uses an array to store elements.</p>
         * <p>If the inserted elements are custom objects a compare function must be provided,
         *  at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         *
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * <p>If a Max-Heap is wanted (greater elements on top) you can a provide a
         * reverse compare function to accomplish that behavior. Example:</p>
         *
         * <pre>
         * function reverseCompare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return 1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return -1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function Heap(compareFunction) {
            /**
             * Array used to store the elements od the heap.
             * @type {Array.<Object>}
             * @private
             */
            this.data = [];
            this.compare = compareFunction || collections.defaultCompare;
        }
        /**
         * Returns the index of the left child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the left child
         * for.
         * @return {number} The index of the left child.
         * @private
         */
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };
        /**
         * Returns the index of the right child of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the right child
         * for.
         * @return {number} The index of the right child.
         * @private
         */
        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };
        /**
         * Returns the index of the parent of the node at the given index.
         * @param {number} nodeIndex The index of the node to get the parent for.
         * @return {number} The index of the parent.
         * @private
         */
        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };
        /**
         * Returns the index of the smaller child node (if it exists).
         * @param {number} leftChild left child index.
         * @param {number} rightChild right child index.
         * @return {number} the index with the minimum value or -1 if it doesn't
         * exists.
         * @private
         */
        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                }
                else {
                    return leftChild;
                }
            }
            else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                }
                else {
                    return rightChild;
                }
            }
        };
        /**
         * Moves the node at the given index up to its proper place in the heap.
         * @param {number} index The index of the node to move up.
         * @private
         */
        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };
        /**
         * Moves the node at the given index down to its proper place in the heap.
         * @param {number} nodeIndex The index of the node to move down.
         * @private
         */
        Heap.prototype.siftDown = function (nodeIndex) {
            //smaller child index
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };
        /**
         * Retrieves but does not remove the root element of this heap.
         * @return {*} The value at the root of the heap. Returns undefined if the
         * heap is empty.
         */
        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            }
            else {
                return undefined;
            }
        };
        /**
         * Adds the given element into the heap.
         * @param {*} element the element.
         * @return true if the element was added or fals if it is undefined.
         */
        Heap.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };
        /**
         * Retrieves and removes the root element of this heap.
         * @return {*} The value removed from the root of the heap. Returns
         * undefined if the heap is empty.
         */
        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };
        /**
         * Returns true if this heap contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this Heap contains the specified element, false
         * otherwise.
         */
        Heap.prototype.contains = function (element) {
            var equF = collections.compareToEquals(this.compare);
            return collections.arrays.contains(this.data, element, equF);
        };
        /**
         * Returns the number of elements in this heap.
         * @return {number} the number of elements in this heap.
         */
        Heap.prototype.size = function () {
            return this.data.length;
        };
        /**
         * Checks if this heap is empty.
         * @return {boolean} true if and only if this heap contains no items; false
         * otherwise.
         */
        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };
        /**
         * Removes all of the elements from this heap.
         */
        Heap.prototype.clear = function () {
            this.data.length = 0;
        };
        /**
         * Executes the provided function once for each element present in this heap in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Heap.prototype.forEach = function (callback) {
            collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    })();
    collections.Heap = Heap;
    var Stack = (function () {
        /**
         * Creates an empty Stack.
         * @class A Stack is a Last-In-First-Out (LIFO) data structure, the last
         * element added to the stack will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Stack() {
            this.list = new LinkedList();
        }
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Pushes an item onto the top of this stack.
         * @param {Object} elem the element to be pushed onto this stack.
         * @return {boolean} true if the element was pushed or false if it is undefined.
         */
        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };
        /**
         * Removes the object at the top of this stack and returns that object.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };
        /**
         * Looks at the object at the top of this stack without removing it from the
         * stack.
         * @return {*} the object at the top of this stack or undefined if the
         * stack is empty.
         */
        Stack.prototype.peek = function () {
            return this.list.first();
        };
        /**
         * Returns the number of elements in this stack.
         * @return {number} the number of elements in this stack.
         */
        Stack.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this stack contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this stack contains the specified element,
         * false otherwise.
         */
        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this stack is empty.
         * @return {boolean} true if and only if this stack contains no items; false
         * otherwise.
         */
        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };
        /**
         * Removes all of the elements from this stack.
         */
        Stack.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this stack in
         * LIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Stack.prototype.forEach = function (callback, reverse) {
            reverse = reverse || false;
            if (reverse)
                this.reverse();
            this.list.forEach(callback);
        };
        /**
         * Reverses the stack
         */
        Stack.prototype.reverse = function () {
            this.list.reverse();
        };
        return Stack;
    })();
    collections.Stack = Stack; // End of stack 
    var Queue = (function () {
        /**
         * Creates an empty queue.
         * @class A queue is a First-In-First-Out (FIFO) data structure, the first
         * element added to the queue will be the first one to be removed. This
         * implementation uses a linked list as a container.
         * @constructor
         */
        function Queue() {
            this.list = new LinkedList();
        }
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Inserts the specified element into the end of this queue.
         * @param {Object} elem the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };
        /**
         * Retrieves and removes the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the head of this queue.
         * @return {*} the head of this queue, or undefined if this queue is empty.
         */
        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };
        /**
         * Returns the number of elements in this queue.
         * @return {number} the number of elements in this queue.
         */
        Queue.prototype.size = function () {
            return this.list.size();
        };
        /**
         * Returns true if this queue contains the specified element.
         * <p>If the elements inside this stack are
         * not comparable with the === operator, a custom equals function should be
         * provided to perform searches, the function must receive two arguments and
         * return true if they are equal, false otherwise. Example:</p>
         *
         * <pre>
         * var petsAreEqualByName (pet1, pet2) {
         *  return pet1.name === pet2.name;
         * }
         * </pre>
         * @param {Object} elem element to search for.
         * @param {function(Object,Object):boolean=} equalsFunction optional
         * function to check if two elements are equal.
         * @return {boolean} true if this queue contains the specified element,
         * false otherwise.
         */
        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };
        /**
         * Checks if this queue is empty.
         * @return {boolean} true if and only if this queue contains no items; false
         * otherwise.
         */
        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };
        /**
         * Removes all of the elements from this queue.
         */
        Queue.prototype.clear = function () {
            this.list.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * FIFO order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    })();
    collections.Queue = Queue; // End of queue
    var PriorityQueue = (function () {
        /**
         * Creates an empty priority queue.
         * @class <p>In a priority queue each element is associated with a "priority",
         * elements are dequeued in highest-priority-first order (the elements with the
         * highest priority are dequeued first). Priority Queues are implemented as heaps.
         * If the inserted elements are custom objects a compare function must be provided,
         * otherwise the <=, === and >= operators are used to compare object priority.</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two element priorities. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(collections.reverseCompareFunction(compareFunction));
        }
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };
        /**
         * Inserts the specified element into this priority queue.
         * @param {Object} element the element to insert.
         * @return {boolean} true if the element was inserted, or false if it is undefined.
         */
        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };
        /**
         * Retrieves and removes the highest priority element of this queue.
         * @return {*} the the highest priority element of this queue,
         *  or undefined if this queue is empty.
         */
        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };
        /**
         * Retrieves, but does not remove, the highest priority element of this queue.
         * @return {*} the highest priority element of this queue, or undefined if this queue is empty.
         */
        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };
        /**
         * Returns true if this priority queue contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this priority queue contains the specified element,
         * false otherwise.
         */
        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };
        /**
         * Checks if this priority queue is empty.
         * @return {boolean} true if and only if this priority queue contains no items; false
         * otherwise.
         */
        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };
        /**
         * Returns the number of elements in this priority queue.
         * @return {number} the number of elements in this priority queue.
         */
        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };
        /**
         * Removes all of the elements from this priority queue.
         */
        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };
        /**
         * Executes the provided function once for each element present in this queue in
         * no particular order.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    })();
    collections.PriorityQueue = PriorityQueue; // end of priority queue
    var Set = (function () {
        /**
         * Creates an empty set.
         * @class <p>A set is a data structure that contains no duplicate items.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStringFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives a onject and returns a
         * unique string must be provided.
         */
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        /**
         * Returns true if this set contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this set contains the specified element,
         * false otherwise.
         */
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
         * Adds the specified element to this set if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this set did not already contain the specified element.
         */
        Set.prototype.add = function (element) {
            if (this.contains(element) || collections.isUndefined(element)) {
                return false;
            }
            else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };
        /**
         * Performs an intersecion between this an another set.
         * Removes all values that are not present this set and the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };
        /**
         * Performs a union between this an another set.
         * Adds all values from the given set to this set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };
        /**
         * Performs a difference between this an another set.
         * Removes from this set all the values that are present in the given set.
         * @param {collections.Set} otherSet other set.
         */
        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };
        /**
         * Checks whether the given set contains all the elements in this set.
         * @param {collections.Set} otherSet other set.
         * @return {boolean} true if this set is a subset of the given set.
         */
        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }
            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };
        /**
         * Removes the specified element from this set if it is present.
         * @return {boolean} true if this set contained the specified element.
         */
        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            }
            else {
                this.dictionary.remove(element);
                return true;
            }
        };
        /**
         * Executes the provided function once for each element
         * present in this set.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one arguments: the element. To break the iteration you can
         * optionally return false.
         */
        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };
        /**
         * Returns an array containing all of the elements in this set in arbitrary order.
         * @return {Array} an array containing all of the elements in this set.
         */
        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };
        /**
         * Returns true if this set contains no elements.
         * @return {boolean} true if this set contains no elements.
         */
        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };
        /**
         * Returns the number of elements in this set.
         * @return {number} the number of elements in this set.
         */
        Set.prototype.size = function () {
            return this.dictionary.size();
        };
        /**
         * Removes all of the elements from this set.
         */
        Set.prototype.clear = function () {
            this.dictionary.clear();
        };
        /*
        * Provides a string representation for display
        */
        Set.prototype.toString = function () {
            return collections.arrays.toString(this.toArray());
        };
        return Set;
    })();
    collections.Set = Set; // end of Set
    var Bag = (function () {
        /**
         * Creates an empty bag.
         * @class <p>A bag is a special kind of set in which members are
         * allowed to appear more than once.</p>
         * <p>If the inserted elements are custom objects a function
         * which converts elements to unique strings must be provided. Example:</p>
         *
         * <pre>
         * function petToString(pet) {
         *  return pet.name;
         * }
         * </pre>
         *
         * @constructor
         * @param {function(Object):string=} toStrFunction optional function used
         * to convert elements to strings. If the elements aren't strings or if toString()
         * is not appropriate, a custom function which receives an object and returns a
         * unique string must be provided.
         */
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        /**
        * Adds nCopies of the specified object to this bag.
        * @param {Object} element element to add.
        * @param {number=} nCopies the number of copies to add, if this argument is
        * undefined 1 copy is added.
        * @return {boolean} true unless element is undefined.
        */
        Bag.prototype.add = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            }
            else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };
        /**
        * Counts the number of copies of the specified object in this bag.
        * @param {Object} element the object to search for..
        * @return {number} the number of copies of the object, 0 if not found
        */
        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            }
            else {
                return this.dictionary.getValue(element).copies;
            }
        };
        /**
         * Returns true if this bag contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this bag contains the specified element,
         * false otherwise.
         */
        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };
        /**
        * Removes nCopies of the specified object to this bag.
        * If the number of copies to remove is greater than the actual number
        * of copies in the Bag, all copies are removed.
        * @param {Object} element element to remove.
        * @param {number=} nCopies the number of copies to remove, if this argument is
        * undefined 1 copy is removed.
        * @return {boolean} true if at least 1 element was removed.
        */
        Bag.prototype.remove = function (element, nCopies) {
            if (nCopies === void 0) { nCopies = 1; }
            if (collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }
            if (!this.contains(element)) {
                return false;
            }
            else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                }
                else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };
        /**
         * Returns an array containing all of the elements in this big in arbitrary order,
         * including multiple copies.
         * @return {Array} an array containing all of the elements in this bag.
         */
        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };
        /**
         * Returns a set of unique elements in this bag.
         * @return {collections.Set<T>} a set of unique elements in this bag.
         */
        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };
        /**
         * Executes the provided function once for each element
         * present in this bag, including multiple copies.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element. To break the iteration you can
         * optionally return false.
         */
        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };
        /**
         * Returns the number of elements in this bag.
         * @return {number} the number of elements in this bag.
         */
        Bag.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this bag contains no elements.
         * @return {boolean} true if this bag contains no elements.
         */
        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Removes all of the elements from this bag.
         */
        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    })();
    collections.Bag = Bag; // End of bag 
    var BSTree = (function () {
        /**
         * Creates an empty binary search tree.
         * @class <p>A binary search tree is a binary tree in which each
         * internal node stores an element such that the elements stored in the
         * left subtree are less than it and the elements
         * stored in the right subtree are greater.</p>
         * <p>Formally, a binary search tree is a node-based binary tree data structure which
         * has the following properties:</p>
         * <ul>
         * <li>The left subtree of a node contains only nodes with elements less
         * than the node's element</li>
         * <li>The right subtree of a node contains only nodes with elements greater
         * than the node's element</li>
         * <li>Both the left and right subtrees must also be binary search trees.</li>
         * </ul>
         * <p>If the inserted elements are custom objects a compare function must
         * be provided at construction time, otherwise the <=, === and >= operators are
         * used to compare elements. Example:</p>
         * <pre>
         * function compare(a, b) {
         *  if (a is less than b by some ordering criterion) {
         *     return -1;
         *  } if (a is greater than b by the ordering criterion) {
         *     return 1;
         *  }
         *  // a must be equal to b
         *  return 0;
         * }
         * </pre>
         * @constructor
         * @param {function(Object,Object):number=} compareFunction optional
         * function used to compare two elements. Must return a negative integer,
         * zero, or a positive integer as the first argument is less than, equal to,
         * or greater than the second.
         */
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || collections.defaultCompare;
            this.nElements = 0;
        }
        /**
         * Adds the specified element to this tree if it is not already present.
         * @param {Object} element the element to insert.
         * @return {boolean} true if this tree did not already contain the specified element.
         */
        BSTree.prototype.add = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };
        /**
         * Removes all of the elements from this tree.
         */
        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };
        /**
         * Returns true if this tree contains no elements.
         * @return {boolean} true if this tree contains no elements.
         */
        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };
        /**
         * Returns the number of elements in this tree.
         * @return {number} the number of elements in this tree.
         */
        BSTree.prototype.size = function () {
            return this.nElements;
        };
        /**
         * Returns true if this tree contains the specified element.
         * @param {Object} element element to search for.
         * @return {boolean} true if this tree contains the specified element,
         * false otherwise.
         */
        BSTree.prototype.contains = function (element) {
            if (collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };
        /**
         * Removes the specified element from this tree if it is present.
         * @return {boolean} true if this tree contained the specified element.
         */
        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * in-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in pre-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in post-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };
        /**
         * Executes the provided function once for each element present in this tree in
         * level-order.
         * @param {function(Object):*} callback function to execute, it is invoked with one
         * argument: the element value, to break the iteration you can optionally return false.
         */
        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };
        /**
         * Returns the minimum element of this tree.
         * @return {*} the minimum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };
        /**
         * Returns the maximum element of this tree.
         * @return {*} the maximum element of this tree or undefined if this tree is
         * is empty.
         */
        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };
        /**
         * Executes the provided function once for each element present in this tree in inorder.
         * Equivalent to inorderTraversal.
         * @param {function(Object):*} callback function to execute, it is
         * invoked with one argument: the element value, to break the iteration you can
         * optionally return false.
         */
        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };
        /**
         * Returns an array containing all of the elements in this tree in in-order.
         * @return {Array} an array containing all of the elements in this tree in in-order.
         */
        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };
        /**
         * Returns the height of this tree.
         * @return {number} the height of this tree or -1 if is empty.
         */
        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };
        /**
        * @private
        */
        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                }
                else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            }
            else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            }
            else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            }
            else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            }
            else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };
        /**
        * @private
        */
        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };
        /**
        * @private
        */
        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };
        /**
        * @private
        */
        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };
        /**
        * @private
        */
        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };
        /**
          * @private
          */
        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };
        /*
        * @private
        */
        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                }
                else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                }
                else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                // tree is empty
                this.root = node;
            }
            else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            }
            else {
                parent.rightCh = node;
            }
            return node;
        };
        /**
        * @private
        */
        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    })();
    collections.BSTree = BSTree; // end of BSTree
})(collections || (collections = {})); // End of module 
var LunaJam;
(function (LunaJam) {
    var Notes;
    (function (Notes) {
        var NoteSequencer = (function () {
            function NoteSequencer(events, delay, mode) {
                var _this = this;
                this.notes = new collections.Dictionary();
                this.delay = delay;
                var tmpNotes = new collections.Dictionary();
                var prevNotes = [];
                for (var i in events) {
                    var event = events[i];
                    if (event.subtype == 0x9) {
                        //Create Stack
                        if (!tmpNotes.containsKey(event.param1))
                            tmpNotes.setValue(event.param1, new collections.Stack());
                        //Current note and Previous note
                        var curNote = new Notes.MIDINote(event.param1, event.playTime);
                        var prevNote = NoteSequencer.getPrevNote(prevNotes, curNote.key);
                        //Check to remove parallel notes
                        if (curNote.occursAt == prevNote.occursAt) {
                            if (curNote.key < prevNote.key && !(curNote.key == prevNote.key)) {
                                tmpNotes.getValue(prevNote.key).pop();
                                tmpNotes.getValue(event.param1).push(curNote);
                                prevNotes[NoteSequencer.getLevel(curNote.key)] = curNote;
                            }
                        }
                        else {
                            tmpNotes.getValue(event.param1).push(curNote);
                            prevNotes[NoteSequencer.getLevel(curNote.key)] = curNote;
                        }
                    }
                    else if (event.subtype == 0x8) {
                        var prevNote = NoteSequencer.getPrevNote(prevNotes, event.param1);
                        prevNote.endsAt = event.playTime;
                    }
                }
                tmpNotes.forEach(function (key, value) {
                    value.forEach(function (item) {
                        if (!_this.notes.containsKey(item.key))
                            _this.notes.setValue(item.key, new collections.Queue());
                        _this.notes.getValue(item.key).add(item);
                        //console.log(item.occursAt);
                        return true;
                    }, true);
                });
            }
            NoteSequencer.prototype.createSprites = function (context, group) {
                var _this = this;
                this.notes.forEach(function (key, value) {
                    value.forEach(function (note) {
                        note.createSprite(context, _this.delay, group);
                        return true;
                    });
                });
            };
            NoteSequencer.getPrevNote = function (prevNotes, key) {
                var level = NoteSequencer.getLevel(key);
                if (prevNotes[level] == undefined)
                    return new Notes.MIDINote(-1, key);
                return prevNotes[level];
            };
            NoteSequencer.getLevel = function (key) {
                if (key >= 60 && key <= 64)
                    return LunaJam.Settings.Difficulty.EASY;
                else if (key >= 72 && key <= 76)
                    return LunaJam.Settings.Difficulty.NORMAL;
                else if (key >= 84 && key <= 88)
                    return LunaJam.Settings.Difficulty.HARD;
                else if (key >= 96 && key <= 100)
                    return LunaJam.Settings.Difficulty.INSANE;
            };
            NoteSequencer.NOTE_DELAY_1 = 2000;
            NoteSequencer.NOTE_DELAY_2 = 1500;
            NoteSequencer.NOTE_DELAY_3 = 1500;
            NoteSequencer.NOTE_DELAY_4 = 1000;
            return NoteSequencer;
        })();
        Notes.NoteSequencer = NoteSequencer;
    })(Notes = LunaJam.Notes || (LunaJam.Notes = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Notes;
    (function (Notes) {
        var MIDINote = (function () {
            function MIDINote(key, occursAt, endsAt) {
                this.occursAt = occursAt;
                this.endsAt = endsAt || occursAt;
                this.key = key;
            }
            MIDINote.prototype.createSprite = function (context, delay, group) {
                switch (this.key % 12) {
                    case 0:
                        this.sprite = new Notes.Note(context, group, Notes.NoteType.Note_1, delay, this.getDuration());
                        break;
                    case 1:
                        this.sprite = new Notes.Note(context, group, Notes.NoteType.Note_2, delay, this.getDuration());
                        break;
                    case 2:
                        this.sprite = new Notes.Note(context, group, Notes.NoteType.Note_3, delay, this.getDuration());
                        break;
                    case 3:
                        this.sprite = new Notes.Note(context, group, Notes.NoteType.Note_4, delay, this.getDuration());
                        break;
                    case 4:
                        this.sprite = new Notes.Note(context, group, Notes.NoteType.Note_5, delay, this.getDuration());
                        break;
                }
            };
            MIDINote.prototype.getDuration = function () {
                return this.endsAt - this.occursAt;
            };
            return MIDINote;
        })();
        Notes.MIDINote = MIDINote;
    })(Notes = LunaJam.Notes || (LunaJam.Notes = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Notes;
    (function (Notes) {
        var Note = (function (_super) {
            __extends(Note, _super);
            function Note(gamePlay, group, noteType, delay, duration) {
                _super.call(this, gamePlay.game, null);
                this.delay = 1500;
                this.duration = 0;
                this.speed = 0; //px per ms
                this.timeAlive = 0;
                this.holdLength = 0;
                this.isMissed = false;
                this.gamePlay = gamePlay;
                this.group = group;
                this.noteType = noteType;
                this.delay = delay;
                this.duration = duration - 50 || 0;
                this.y = -20;
                switch (this.noteType) {
                    case Notes.NoteType.Note_1:
                        this.x = 369;
                        this.target = LunaJam.GamePlay.keyPress[0];
                        break;
                    case Notes.NoteType.Note_2:
                        this.x = 409;
                        this.target = LunaJam.GamePlay.keyPress[1];
                        break;
                    case Notes.NoteType.Note_3:
                        this.x = 449;
                        this.target = LunaJam.GamePlay.keyPress[2];
                        break;
                    case Notes.NoteType.Note_4:
                        this.x = 489;
                        this.target = LunaJam.GamePlay.keyPress[3];
                        break;
                    case Notes.NoteType.Note_5:
                        this.x = 529;
                        this.target = LunaJam.GamePlay.keyPress[4];
                        break;
                }
                var distance = this.position.distance(new Phaser.Point(this.x, LunaJam.GamePlay.targets[0].centerY - 10));
                this.speed = distance / this.delay;
                this.createHold();
                this.createNote();
            }
            Note.prototype.createNote = function () {
                this.note = new Phaser.Sprite(this.game, 0, 0);
                this.note.anchor.set(0.5, 0.5);
                this.note.loadTexture(LunaJam.Settings.Texture.getNoteTexture(this.noteType));
                this.game.physics.arcade.enable(this.note);
                this.note.body.moves = true;
                this.add(this.note);
            };
            Note.prototype.createHold = function () {
                if (this.duration < 500)
                    return;
                this.holdLength = this.duration * this.speed;
                var color = LunaJam.Settings.Colors.getNoteHoldColor(this.noteType);
                var gfx = this.game.make.graphics(0, 0);
                gfx.beginFill(color);
                gfx.lineStyle(2, color, 1);
                gfx.drawRoundedRect(0, 0, 5, this.holdLength, 2);
                this.hold = new Phaser.Sprite(this.game, 0, 0);
                this.hold.anchor.set(0.5, 1);
                this.hold.loadTexture(gfx.generateTexture());
                this.hold.crop(new Phaser.Rectangle(0, 0, gfx.width, gfx.height), false);
                this.add(this.hold);
            };
            Note.prototype.spawn = function () {
                //Show note in game
                if (this.group) {
                    this.group.add(this);
                }
                else {
                    this.game.add.existing(this);
                }
                //Move the note at calculated speed
                this.note.body.velocity = new Phaser.Point(0, this.speed * 1000);
            };
            Note.prototype.update = function () {
                //Handle Note
                if (this.hold) {
                    if (this.note.alive) {
                        this.hold.y = this.note.y + 20;
                    }
                    else if (this.hold.cropRect.height > 0 && this.game.input.keyboard.isDown(LunaJam.Settings.Controls.getNoteKey(this.noteType))) {
                        var tmp = (this.holdLength / this.duration) * this.game.time.physicsElapsedMS;
                        this.gamePlay.scoreBoard.addToScore(tmp / 100);
                        this.hold.cropRect.height -= tmp;
                        this.hold.updateCrop();
                    }
                    else {
                        this.hold.kill();
                    }
                }
                //Check for collisions
                this.checkCollision();
                //Missed
                if (!this.isMissed && this.note.top > this.target.bottom) {
                    this.isMissed = true;
                    this.gamePlay.scoreBoard.endStreak();
                }
                //Destroy after a while
                this.timeAlive += this.game.time.elapsedMS;
                if (this.timeAlive > this.delay + this.duration + 1000)
                    this.destroy();
            };
            Note.prototype.checkCollision = function () {
                if (this.note.alive && this.target.alive && this.game.physics.arcade.intersects(this.note.body, this.target.body)) {
                    if (this.target.colliderActive) {
                        this.gamePlay.scoreBoard.addToScore(10);
                        this.gamePlay.scoreBoard.addToStreak(1);
                        this.target.colliderActive = false;
                        this.note.kill();
                    }
                }
            };
            return Note;
        })(Phaser.Group);
        Notes.Note = Note;
    })(Notes = LunaJam.Notes || (LunaJam.Notes = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Notes;
    (function (Notes) {
        var NotePress = (function (_super) {
            __extends(NotePress, _super);
            function NotePress(game, noteType, group) {
                _super.call(this, game, 0, 300);
                this.colliderActive = false;
                switch (noteType) {
                    case Notes.NoteType.Note_1:
                        this.loadTexture("img_note_pressed", 0);
                        this.x = 369;
                        break;
                    case Notes.NoteType.Note_2:
                        this.loadTexture("img_note_pressed", 1);
                        this.x = 409;
                        break;
                    case Notes.NoteType.Note_3:
                        this.loadTexture("img_note_pressed", 2);
                        this.x = 449;
                        break;
                    case Notes.NoteType.Note_4:
                        this.loadTexture("img_note_pressed", 3);
                        this.x = 489;
                        break;
                    case Notes.NoteType.Note_5:
                        this.loadTexture("img_note_pressed", 4);
                        this.x = 529;
                        break;
                }
                this.noteType = noteType;
                //Set physics properties
                game.physics.arcade.enable(this);
                //Set anchor
                this.anchor.set(0.5, 0.5);
                //Kill coz yolo
                this.kill();
                //Add to game
                if (group) {
                    group.add(this);
                }
                else {
                    this.game.add.existing(this);
                }
            }
            NotePress.prototype.update = function () {
            };
            NotePress.prototype.press = function () {
                if (!this.alive) {
                    this.revive();
                    this.colliderActive = true;
                }
            };
            NotePress.prototype.release = function () {
                if (this.alive) {
                    this.kill();
                    this.colliderActive = false;
                }
            };
            NotePress.prototype.onNoteHit = function (note) {
            };
            return NotePress;
        })(Phaser.Sprite);
        Notes.NotePress = NotePress;
    })(Notes = LunaJam.Notes || (LunaJam.Notes = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Notes;
    (function (Notes) {
        (function (NoteType) {
            NoteType[NoteType["Note_1"] = 0] = "Note_1";
            NoteType[NoteType["Note_2"] = 1] = "Note_2";
            NoteType[NoteType["Note_3"] = 2] = "Note_3";
            NoteType[NoteType["Note_4"] = 3] = "Note_4";
            NoteType[NoteType["Note_5"] = 4] = "Note_5";
        })(Notes.NoteType || (Notes.NoteType = {}));
        var NoteType = Notes.NoteType;
        ;
    })(Notes = LunaJam.Notes || (LunaJam.Notes = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var ScoreBoard = (function (_super) {
        __extends(ScoreBoard, _super);
        function ScoreBoard(game) {
            _super.call(this, game, 10, 10);
            this.streak = 0;
            this.longestStreak = 0;
            this.score = 0;
            var bg = game.make.graphics(0, 0);
            bg.beginFill(0xFFFFFF, 0.7);
            bg.moveTo(0, 0);
            bg.lineTo(300, 0);
            bg.lineTo(300, 50);
            bg.lineTo(0, 50);
            bg.lineTo(0, 0);
            this.addChild(bg);
            var style_lit = {
                font: "bold 10pt Calibri"
            };
            var style_lbl = {
                font: "bold 20pt Calibri"
            };
            //Scores
            var lit_score = game.make.text(290, 30, "SCORE", style_lit);
            lit_score.addColor("#676567", 0);
            lit_score.anchor.set(1, 0);
            this.addChild(lit_score);
            this.lbl_score = game.make.text(290, 5, "0", style_lbl);
            this.lbl_score.addColor("#343434", 0);
            this.lbl_score.anchor.set(1, 0);
            this.addChild(this.lbl_score);
            //Multiplier
            var lit_multi = game.make.text(150, 30, "MULTIPLIER", style_lit);
            lit_multi.addColor("#676567", 0);
            lit_multi.anchor.set(1, 0);
            this.addChild(lit_multi);
            this.lbl_multiplier = game.make.text(150, 5, "1x", style_lbl);
            this.lbl_multiplier.addColor("#343434", 0);
            this.lbl_multiplier.anchor.set(1, 0);
            this.addChild(this.lbl_multiplier);
            //Streak
            var lit_streak = game.make.text(70, 30, "STREAK", style_lit);
            lit_streak.addColor("#676567", 0);
            lit_streak.anchor.set(1, 0);
            this.addChild(lit_streak);
            this.lbl_streak = game.make.text(70, 5, "0", style_lbl);
            this.lbl_streak.addColor("#343434", 0);
            this.lbl_streak.anchor.set(1, 0);
            this.addChild(this.lbl_streak);
        }
        ScoreBoard.prototype.addToScore = function (score) {
            if (isNaN(score))
                return;
            this.score += score;
            this.setScore(this.score);
        };
        ScoreBoard.prototype.setScore = function (score) {
            if (isNaN(score))
                return;
            this.score = score;
            this.lbl_score.setText(Math.round(score).toString());
        };
        ScoreBoard.prototype.addToStreak = function (i) {
            this.streak += i;
            this.setStreak(this.streak);
        };
        ScoreBoard.prototype.setStreak = function (i) {
            this.streak = i;
            this.lbl_streak.setText(this.streak.toString());
        };
        ScoreBoard.prototype.endStreak = function () {
            this.longestStreak = this.streak;
            this.setStreak(0);
        };
        return ScoreBoard;
    })(Phaser.Sprite);
    LunaJam.ScoreBoard = ScoreBoard;
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Settings;
    (function (Settings) {
        var Controls = (function () {
            function Controls() {
            }
            Controls.getNoteKey = function (noteType) {
                return Controls.controles[noteType];
            };
            Controls.controles = [
                Phaser.Keyboard.ONE,
                Phaser.Keyboard.TWO,
                Phaser.Keyboard.THREE,
                Phaser.Keyboard.FOUR,
                Phaser.Keyboard.FIVE,
            ];
            return Controls;
        })();
        Settings.Controls = Controls;
    })(Settings = LunaJam.Settings || (LunaJam.Settings = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Settings;
    (function (Settings) {
        var Texture = (function () {
            function Texture() {
            }
            Texture.getNoteTexture = function (noteType) {
                switch (noteType) {
                    case LunaJam.Notes.NoteType.Note_1:
                        return this.noteTexture[0][0];
                        break;
                    case LunaJam.Notes.NoteType.Note_2:
                        return this.noteTexture[1][0];
                        break;
                    case LunaJam.Notes.NoteType.Note_3:
                        return this.noteTexture[2][0];
                        break;
                    case LunaJam.Notes.NoteType.Note_4:
                        return this.noteTexture[3][0];
                        break;
                    case LunaJam.Notes.NoteType.Note_5:
                        return this.noteTexture[4][0];
                        break;
                }
            };
            Texture.noteTexture = [
                ["img_note1", "path"],
                ["img_note2", "path"],
                ["img_note3", "path"],
                ["img_note4", "path"],
                ["img_note5", "path"],
            ];
            return Texture;
        })();
        Settings.Texture = Texture;
    })(Settings = LunaJam.Settings || (LunaJam.Settings = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Settings;
    (function (Settings) {
        var Colors = (function () {
            function Colors() {
            }
            Colors.getNoteHoldColor = function (noteType) {
                return this.noteHoldColors[noteType];
            };
            Colors.noteHoldColors = [0xffe00c, 0x9823a5, 0x8aff00, 0xdd2a2d, 0x5AC6FF];
            return Colors;
        })();
        Settings.Colors = Colors;
    })(Settings = LunaJam.Settings || (LunaJam.Settings = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Settings;
    (function (Settings) {
        (function (Difficulty) {
            Difficulty[Difficulty["EASY"] = 0] = "EASY";
            Difficulty[Difficulty["NORMAL"] = 1] = "NORMAL";
            Difficulty[Difficulty["HARD"] = 2] = "HARD";
            Difficulty[Difficulty["INSANE"] = 3] = "INSANE";
        })(Settings.Difficulty || (Settings.Difficulty = {}));
        var Difficulty = Settings.Difficulty;
    })(Settings = LunaJam.Settings || (LunaJam.Settings = {}));
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image("loading_bg", "Assets/Sprites/Loading/loading_bg.png");
            this.load.image("loading_bar", "Assets/Sprites/Loading/loading_bar.png");
            //Load physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        Boot.prototype.create = function () {
            //For non multi touch input
            this.input.maxPointers = 1;
            //Pause game when focus is lost
            this.stage.disableVisibilityChange = true;
            //Device Settings
            if (this.game.device.desktop) {
                this.game.scale.pageAlignHorizontally = true;
            }
            this.game.state.start("Preloader", true, false);
        };
        return Boot;
    })(Phaser.State);
    LunaJam.Boot = Boot;
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var GamePlay = (function (_super) {
        __extends(GamePlay, _super);
        function GamePlay() {
            _super.apply(this, arguments);
            //Private
            this._songTime = 0;
            this._playbackStarted = false;
            this._startGame = false;
            this._ntIndx = 96;
        }
        GamePlay.prototype.init = function (level) {
            switch (level) {
                case LunaJam.Settings.Difficulty.EASY:
                    this._delay = LunaJam.Notes.NoteSequencer.NOTE_DELAY_1;
                    this._ntIndx = 60;
                    break;
                case LunaJam.Settings.Difficulty.NORMAL:
                    this._delay = LunaJam.Notes.NoteSequencer.NOTE_DELAY_2;
                    this._ntIndx = 72;
                    break;
                case LunaJam.Settings.Difficulty.HARD:
                    this._delay = LunaJam.Notes.NoteSequencer.NOTE_DELAY_3;
                    this._ntIndx = 84;
                    break;
                case LunaJam.Settings.Difficulty.INSANE:
                    this._delay = LunaJam.Notes.NoteSequencer.NOTE_DELAY_4;
                    this._ntIndx = 96;
                    break;
            }
        };
        GamePlay.prototype.preload = function () {
            var _this = this;
            var buffer = this.game.cache.getBinary("midi_file");
            this.midi = new MIDIFile(buffer);
            this.noteSequencer = new LunaJam.Notes.NoteSequencer(this.midi.getMidiEvents(), this._delay, 0);
            this.music = this.game.add.audio("song_file");
            this.music.onStop.add(function () {
                _this.game.state.start('PostGame', true, false, _this.scoreBoard);
            });
        };
        GamePlay.prototype.create = function () {
            var _this = this;
            var root = new LunaJam.MasterGroup(this.game);
            this.game.add.existing(root);
            //Load Background
            this.add.sprite(this.world.centerX, 0, "img_background", null, root.bg).anchor.set(0.5, 0);
            this.add.sprite(this.world.centerX, 0, "img_stage", null, root.bg).anchor.set(0.5, 0);
            //Load UI
            this.btn_start = new Phaser.Button(this.game, this.world.centerX, this.world.centerY, "img_playbtn", function () {
                _this.btn_start.destroy();
                _this._startGame = true;
            }, this, 1, 1, 1);
            this.btn_start.anchor.set(0.5, 0.5);
            root.ui.add(this.btn_start);
            //Scoreboard
            this.scoreBoard = new LunaJam.ScoreBoard(this.game);
            root.ui.add(this.scoreBoard);
            //Load Key Press controls
            GamePlay.keyPress[0] = new LunaJam.Notes.NotePress(this.game, LunaJam.Notes.NoteType.Note_1, root.notePress);
            GamePlay.keyPress[1] = new LunaJam.Notes.NotePress(this.game, LunaJam.Notes.NoteType.Note_2, root.notePress);
            GamePlay.keyPress[2] = new LunaJam.Notes.NotePress(this.game, LunaJam.Notes.NoteType.Note_3, root.notePress);
            GamePlay.keyPress[3] = new LunaJam.Notes.NotePress(this.game, LunaJam.Notes.NoteType.Note_4, root.notePress);
            GamePlay.keyPress[4] = new LunaJam.Notes.NotePress(this.game, LunaJam.Notes.NoteType.Note_5, root.notePress);
            //Load Sprites
            this.noteSequencer.createSprites(this, root.notes);
        };
        GamePlay.prototype.update = function () {
            if (this._startGame) {
                this.addNote();
                this.processInput();
            }
        };
        GamePlay.prototype.addNote = function () {
            if (this._songTime < this._delay) {
                this._songTime += this.time.physicsElapsedMS;
                ;
            }
            else {
                if (!this._playbackStarted) {
                    this.music.play();
                    this._playbackStarted = true;
                }
                this._songTime = this.music.currentTime + this._delay;
            }
            var note1 = (this.noteSequencer.notes.containsKey(this._ntIndx) && this.noteSequencer.notes.getValue(this._ntIndx).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx).peek() : null;
            var note2 = (this.noteSequencer.notes.containsKey(this._ntIndx + 1) && this.noteSequencer.notes.getValue(this._ntIndx + 1).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx + 1).peek() : null;
            var note3 = (this.noteSequencer.notes.containsKey(this._ntIndx + 2) && this.noteSequencer.notes.getValue(this._ntIndx + 2).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx + 2).peek() : null;
            var note4 = (this.noteSequencer.notes.containsKey(this._ntIndx + 3) && this.noteSequencer.notes.getValue(this._ntIndx + 3).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx + 3).peek() : null;
            var note5 = (this.noteSequencer.notes.containsKey(this._ntIndx + 4) && this.noteSequencer.notes.getValue(this._ntIndx + 4).size() > 0) ? this.noteSequencer.notes.getValue(this._ntIndx + 4).peek() : null;
            if (note1 != null && note1.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx).dequeue().sprite.spawn();
            }
            if (note2 != null && note2.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 1).dequeue().sprite.spawn();
            }
            if (note3 != null && note3.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 2).dequeue().sprite.spawn();
            }
            if (note4 != null && note4.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 3).dequeue().sprite.spawn();
            }
            if (note5 != null && note5.occursAt < this._songTime) {
                this.noteSequencer.notes.getValue(this._ntIndx + 4).dequeue().sprite.spawn();
            }
        };
        GamePlay.prototype.processInput = function () {
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.ONE)) {
                GamePlay.keyPress[0].press();
            }
            else {
                GamePlay.keyPress[0].release();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.TWO)) {
                GamePlay.keyPress[1].press();
            }
            else {
                GamePlay.keyPress[1].release();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.THREE)) {
                GamePlay.keyPress[2].press();
            }
            else {
                GamePlay.keyPress[2].release();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.FOUR)) {
                GamePlay.keyPress[3].press();
            }
            else {
                GamePlay.keyPress[3].release();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.FIVE)) {
                GamePlay.keyPress[4].press();
            }
            else {
                GamePlay.keyPress[4].release();
            }
        };
        GamePlay.prototype.render = function () {
            //this.loadDebugInfo();
            //this.game.debug.text(this.game.time.fps.toString(), this.world.width - 24, 14, "#00ff00");
        };
        GamePlay.prototype.loadDebugInfo = function () {
            this.game.debug.inputInfo(32, 32);
            this.game.debug.rectangle(GamePlay.targets[0], '#00ff00', false);
            this.game.debug.rectangle(GamePlay.targets[1], '#00ff00', false);
            this.game.debug.rectangle(GamePlay.targets[2], '#00ff00', false);
            this.game.debug.rectangle(GamePlay.targets[3], '#00ff00', false);
            this.game.debug.rectangle(GamePlay.targets[4], '#00ff00', false);
        };
        GamePlay.prototype.addNoteDebug = function () {
            this._songTime += this.time.physicsElapsedMS;
            if (this._songTime > 1000) {
                new LunaJam.Notes.Note(this, this.world, LunaJam.Notes.NoteType.Note_1, 1800).spawn();
                new LunaJam.Notes.Note(this, this.world, LunaJam.Notes.NoteType.Note_2, 1600).spawn();
                new LunaJam.Notes.Note(this, this.world, LunaJam.Notes.NoteType.Note_3, 1400).spawn();
                new LunaJam.Notes.Note(this, this.world, LunaJam.Notes.NoteType.Note_4, 1200).spawn();
                new LunaJam.Notes.Note(this, this.world, LunaJam.Notes.NoteType.Note_5, 1000).spawn();
                this._songTime = 0;
            }
        };
        GamePlay.targets = [
            new Phaser.Rectangle(360, 282, 20, 35),
            new Phaser.Rectangle(400, 282, 20, 35),
            new Phaser.Rectangle(440, 282, 20, 35),
            new Phaser.Rectangle(480, 282, 20, 35),
            new Phaser.Rectangle(520, 282, 20, 35)
        ];
        GamePlay.keyPress = {};
        return GamePlay;
    })(Phaser.State);
    LunaJam.GamePlay = GamePlay;
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
            this.btn_level = {};
        }
        MainMenu.prototype.create = function () {
            //Load Background
            this.add.sprite(this.world.centerX, 0, "img_background").anchor.set(0.5, 0);
            this.btn_mode1 = this.add.button(this.world.centerX - 215, 10, "img_modes", this.btn_mode1_onClick, this, 2, 0);
            this.btn_mode2 = this.add.button(this.world.centerX + 7, 10, "img_modes", this.btn_mode1_onClick, this, 3, 1);
            //Decode song
            //this.game.sound.setDecodedCallback(["song_file"], this.startGame, this);
        };
        MainMenu.prototype.startGame = function (level) {
            this.game.state.start('GamePlay', true, false, level);
            //this.game.state.start('PostGame');
        };
        MainMenu.prototype.btn_mode1_onClick = function () {
            var _this = this;
            this.game.add.tween(this.btn_mode1).to({ x: this.btn_mode1.x - 50 }, 1000, Phaser.Easing.Exponential.Out).start().onComplete.add(function () {
            }, this);
            this.game.add.tween(this.btn_mode2).to({ alpha: 0 }, 500, Phaser.Easing.Exponential.Out).start().onComplete.add(function () {
                _this.btn_mode2.destroy();
                for (var i = 0; i < 4; i++) {
                    _this.btn_level[i] = new Phaser.Button(_this.game, _this.world.centerX + 67, (i) * 79 + 10, "img_levels", _this.btn_level_onClick, _this, i, i);
                    _this.btn_level[i].anchor.set(0.5, 0);
                    _this.btn_level[i].alpha = 0;
                    _this.game.add.existing(_this.btn_level[i]);
                    _this.game.add.tween(_this.btn_level[i]).to({ alpha: 1 }, 250, Phaser.Easing.Exponential.In, true, i * 100);
                }
            }, this);
        };
        MainMenu.prototype.btn_level_onClick = function (btn) {
            switch (btn) {
                case this.btn_level[0]:
                    this.startGame(LunaJam.Settings.Difficulty.EASY);
                    break;
                case this.btn_level[1]:
                    this.startGame(LunaJam.Settings.Difficulty.NORMAL);
                    break;
                case this.btn_level[2]:
                    this.startGame(LunaJam.Settings.Difficulty.HARD);
                    break;
                case this.btn_level[3]:
                    this.startGame(LunaJam.Settings.Difficulty.INSANE);
                    break;
            }
        };
        return MainMenu;
    })(Phaser.State);
    LunaJam.MainMenu = MainMenu;
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var PostGame = (function (_super) {
        __extends(PostGame, _super);
        function PostGame() {
            _super.apply(this, arguments);
        }
        PostGame.prototype.init = function (scoreBoard) {
            scoreBoard;
            this.scoreBoard = scoreBoard || new LunaJam.ScoreBoard(this.game);
        };
        PostGame.prototype.preload = function () {
            var resources = [
                'Assets/Sprites/LvlComplete/panel-650x400.png',
                'Assets/Sprites/LvlComplete/lvlcomplete.png',
                'Assets/Sprites/LvlComplete/orange-btn.png'
            ];
            for (var i = 0; i < resources.length; i++) {
                this.game.load.image(resources[i], resources[i]);
            }
            this.game.load.onLoadComplete.add(EZGUI.Compatibility.fixCache, this.game.load, null, resources);
        };
        PostGame.prototype.create = function () {
            this.root = this.game.add.existing(new LunaJam.MasterGroup(this.game));
            //Load Background
            this.add.sprite(this.world.centerX, 0, "img_background", null, this.root.bg).anchor.set(0.5, 0);
            this.add.sprite(this.world.centerX, 0, "img_stage", null, this.root.bg).anchor.set(0.5, 0);
            //Add filters
            var blurX = this.game.add.filter('BlurX');
            var blurY = this.game.add.filter('BlurY');
            this.root.bg.filters = [blurX, blurY];
            this.ez();
        };
        PostGame.prototype.ez = function () {
            var _this = this;
            var lvlComplete = {
                id: 'lvlComplete',
                component: 'Window',
                image: 'Assets/Sprites/LvlComplete/panel-650x400.png',
                header: { position: { x: 0, y: -40 }, height: 100, image: 'Assets/Sprites/LvlComplete/lvlcomplete.png', },
                position: { x: 0, y: 0 },
                width: 400,
                height: 300,
                layout: [1, 4],
                children: [
                    {
                        id: 'lbl_score',
                        text: 'Score: ' + this.scoreBoard.score,
                        component: 'Label',
                        position: { x: 100, y: -40 },
                        font: {
                            size: '35px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 200,
                        height: 80
                    },
                    {
                        text: 'Streak: ' + this.scoreBoard.streak,
                        component: 'Label',
                        position: { x: 100, y: -40 },
                        font: {
                            size: '35px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 200,
                        height: 80
                    },
                    {
                        id: 'playAgain',
                        text: 'Play Again',
                        component: 'Button',
                        image: 'Assets/Sprites/LvlComplete/orange-btn.png',
                        position: { x: 100, y: 0 },
                        font: {
                            size: '30px',
                            family: 'Skranji',
                            color: 'white'
                        },
                        width: 210,
                        height: 60
                    }
                ]
            };
            EZGUI.game = this.game;
            EZGUI.Theme.load(['Assets/Engine/EzGUI/assets/kenney-theme/kenney-theme.json'], function () {
                var finishScreen = EZGUI.create(lvlComplete, 'kenney');
                finishScreen.position.x = (_this.world.width - finishScreen.settings.width) / 2;
                finishScreen.position.y = -20 - finishScreen.settings.height;
                var targetY = ((_this.world.height - finishScreen.settings.height) / 2) + 20;
                finishScreen.animatePosTo(finishScreen.position.x, targetY, 800, EZGUI.Easing.Back.Out);
            });
        };
        return PostGame;
    })(Phaser.State);
    LunaJam.PostGame = PostGame;
})(LunaJam || (LunaJam = {}));
var LunaJam;
(function (LunaJam) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //Loading Bar
            this.add.sprite(this.world.centerX, this.world.centerY, "loading_bg").anchor.set(0.5, 0.5);
            this.loadingBar = this.add.sprite(this.world.centerX, this.world.centerY, "loading_bar");
            this.loadingBar.anchor.set(0.5, 0.5);
            this.loadingBar.position.set(this.loadingBar.position.x - (this.loadingBar.width / 2), this.loadingBar.position.y - (this.loadingBar.height / 2));
            this.loadingBar.anchor.set(0, 0);
            this.load.setPreloadSprite(this.loadingBar);
            //Actual game assets
            this.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
            this.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
            this.load.image("logo", "Assets/Sprites/logo.png");
            this.load.image("img_background", "Assets/Sprites/background.jpg", true);
            this.load.image("img_stage", "Assets/Sprites/stage.jpg", true);
            this.load.image("img_note1", "Assets/Sprites/Notes/note1.png", true);
            this.load.image("img_note2", "Assets/Sprites/Notes/note2.png", true);
            this.load.image("img_note3", "Assets/Sprites/Notes/note3.png", true);
            this.load.image("img_note4", "Assets/Sprites/Notes/note4.png", true);
            this.load.image("img_note5", "Assets/Sprites/Notes/note5.png", true);
            this.load.image("img_playbtn", "Assets/Sprites/Menu/btn_play.png", true);
            this.load.spritesheet("img_note_pressed", "Assets/Sprites/Notes/note_pressed.png", 44, 44, 5);
            this.load.spritesheet("img_modes", "Assets/Sprites/Menu/modes.png", 204, 318, 4, 2);
            this.load.spritesheet("img_levels", "Assets/Sprites/Menu/levels.png", 202, 81, 4);
            this.load.audio("song_file", ["Assets/Music/song.ogg", "Assets/Music/song.mp3"], true);
            this.load.binary("midi_file", "Assets/Music/song.mid", function (key, data) {
                return data;
            });
        };
        Preloader.prototype.create = function () {
            this.startMainMenu();
        };
        Preloader.prototype.startMainMenu = function () {
            //var hold: Phaser.Graphics = this.game.make.graphics(0, 0);
            //hold.beginFill(0xffe00c);
            //hold.lineStyle(2, 0xffe00c, 1);
            //hold.drawRoundedRect(0, 0, 5, 100, 2);
            //this.sp = new Phaser.Sprite(this.game, 200, 200);
            //this.sp.anchor.set(0.5, 1);
            //this.sp.loadTexture(hold.generateTexture());
            //this.sp.crop(new Phaser.Rectangle(0, 0, hold.width, hold.height), false);
            //this.game.add.existing(this.sp);
            this.game.state.start('MainMenu', true, false);
        };
        Preloader.prototype.update = function () {
            this.sp.cropRect.height -= this.time.elapsedMS / 100;
            this.sp.updateCrop();
        };
        return Preloader;
    })(Phaser.State);
    LunaJam.Preloader = Preloader;
})(LunaJam || (LunaJam = {}));
//# sourceMappingURL=game.js.map