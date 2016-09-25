import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

/**
 *
 * @param classDef a constructor function, or an object that defines the type discriminator and corresponding constructors on the form
 * {
 *  discriminatorField: 'fieldName',
 *  types: {
 *      "type1": TypeOneConstructor,
 *      "type2": TypeTwoConstructor
 *  }
 * }
 */


Mongo.Collection.prototype.setClass = function(classDef) {
    var self = this;

    if (self._transform)
        throw new Meteor.Error("Can't setClass on '" +
            self._name + "' a transform function already exists!");

    self._transform = function(doc) {
        var constructorFn = _.isFunction(classDef)
            ? classDef
            : classDef.types[doc[classDef.discriminatorField]];

        const extendedDoc = Object.assign(new constructorFn(), doc);
        if (_.isFunction(extendedDoc.collectionClassOnInit)) {
            extendedDoc.collectionClassOnInit();
        }
        return extendedDoc;
    };
};


