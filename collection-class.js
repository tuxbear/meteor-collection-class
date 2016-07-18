import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

Mongo.Collection.prototype.setClass = function(classFn) {
    var self = this;

    if (self._transform)
        throw new Meteor.Error("Can't setClass on '" +
            self._name + "' a transform function already exists!");

    self._transform = function(doc) {
        const extendedDoc = Object.assign(new classFn(), doc);
        if (_.isFunction(extendedDoc.collectionClassOnInit)) {
            extendedDoc.collectionClassOnInit();
        }
        return extendedDoc;
    };
};
