# Meteor Collection Class

Based on https://github.com/dburles/meteor-collection-helpers

Meteor Collection Class returns ES6 class instances from Meteor Collections. This allows you to create domain models with business logic in ES6 classes and tie them to collections.
This acts like a lightweight document-to-object mapper

Supports property getters and setters and functions. Class instances can be saved directly.

## Installation

```sh
$ meteor add tuxbear:collection-class
```

## Usage

Keep your domain classes somewhere seen by both client and server.

```javascript

class Book {

    constructor() {
        // constructor is invoked with no arguments
        // NOTE: fields or functions in the class will be overwritten if names conflict with the collection document
        this.title = 'this will be overwritten'
    }

    author() {
        return Authors.findOne(this.authorId);
    }

    collectionClassOnInit() {
        // all fields from the monogo document is on this. Use for init setup of object state if needed
        this.someState = 'hello';
    }
}

class Author {
    fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    books() {
        return Books.find({authorId: this._id});
    }
}

// in collection modules:
 
Books = new Mongo.Collection('books');
Books.setClass(Book);

Authors = new Mongo.Collection('authors');
Authors.setClass(Author);

```

This will then allow you to do:

```javascript
Books.findOne().author().firstName; // Charles
Books.findOne().someState; // hello
Books.findOne().author().fullName(); // Charles Darwin
Authors.findOne().books()
```

Polimorphism is supported via discriminator field values, by supplying a definition object instead of the constructor function to setClass:


```javascript

class Animal {

    static get TYPE() { return "Animal"; }

    constructor() {
        this.type = Animal.TYPE;
        // constructor is invoked with no arguments
        // NOTE: fields or functions in the class will be overwritten if names conflict with the collection document
        this.name = 'this will be overwritten'
    }

    speak() {
        return "Animal speak";
    }

    collectionClassOnInit() {
        // all fields from the monogo document is on this. Use for init setup of object state if needed
    }
}

class Dog extends Animal {
    static get TYPE() { return "DOG"; }

    constructor() {
        this.type = Dog.TYPE;
        // constructor is invoked with no arguments
        // NOTE: fields or functions in the class will be overwritten if names conflict with the collection document
        this.name = 'this will be overwritten'
    }

    speak() {
        return "Dog speak";
    }

    collectionClassOnInit() {
        // all fields from the monogo document is on this. Use for init setup of object state if needed
    }
    

}

// in collection modules:
 
Animals = new Mongo.Collection('animals');
Animals.setClass({
    discriminatorField: 'type',
    types: {
        [Animal.TYPE]: Animal,
        [Dog.TYPE]: Dog
    }
});


```

### License

MIT