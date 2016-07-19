import {Mongo} from "meteor/mongo";
import { assert } from 'meteor/practicalmeteor:chai';

class Book {

    constructor() {
        this.constructorWasCalled = true;
    }

    author() {
        return Authors.findOne(this.authorId);
    }

    collectionClassOnInit() {
        // all fields from the monogo document is on this
        this.initWasCalled = true;
    }
}

class Author {
    fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    books() {
        return Books.find({authorId: this._id});
    }

    get testGetter() {
        return "testing";
    }

    documentFieldOverwritten() {
        return 'oh noes this will be overwritten!';
    }
}

describe('tuxbear:collection-class', function () {
    if (Meteor.isClient) {
        return;
    }

    let test = {};

    beforeEach(function() {
        test.id = new Date().getTime();
        Books = new Meteor.Collection('books' + test.id);
        Authors = new Meteor.Collection('authors' + test.id);
    });

    afterEach(function () {
        Books.rawCollection().drop();
        Authors.rawCollection().drop();
    });

    it('should transform collection documents', function () {

        var authorWithGetterSaved = Authors.insert(new Author());

        var author1 = Authors.insert({
            firstName: 'Charles',
            lastName: 'Darwin',
            test: function() {return "test"}
        });

        var author2 = Authors.insert({
            firstName: 'Carl',
            lastName: 'Sagan'
        });

        var book1 = Books.insert({
            authorId: author1,
            name: 'On the Origin of Species'
        });

        var book2 = Books.insert({
            authorId: author2,
            name: 'Contact'
        });

        Books.setClass(Book);
        Authors.setClass(Author);

        var book = Books.findOne(book1);
        var author = book.author();
        assert.equal(author.firstName, 'Charles');

        book = Books.findOne(book2);
        author = book.author();
        assert.equal(author.fullName(), 'Carl Sagan');

        author = Authors.findOne(author1);
        books = author.books();

        book = books.fetch()[0];

        assert.equal(books.count(), 1);
        assert.isTrue(book.constructorWasCalled);
        assert.isTrue(book.initWasCalled);
    });

    it("BEWARE: document fields overwrites properties from the class without warning", function () {
        Authors.setClass(Author);

        var author1 = Authors.insert({
            firstName: 'Charles',
            lastName: 'Darwin',
            documentFieldOverwritten: 'this is what you get'
        });

        var author = Authors.findOne(author1);
        assert.equal(author.documentFieldOverwritten, 'this is what you get');
    });
});


