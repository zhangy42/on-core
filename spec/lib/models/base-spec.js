// Copyright 2015, EMC, Inc.


'use strict';

module.exports = {
    before: function (callback) {
        before(function () {
            callback(this);
        });
    },
    examples: function () {
        before(function () {
            expect(this.model).to.be.ok;
            expect(this.attributes).to.be.ok;
        });

        describe('Attributes', function () {
            describe('id', function () {
                before(function () {
                    this.subject = this.attributes.id;
                });

                it('should be the correct type', function () {
                    if (this.model.connection[0] === 'disk') {
                        expect(this.subject.type).to.equal('integer');
                    } else {
                        expect(this.subject.type).to.equal('string');
                    }
                });

                it('should be a primary key', function () {
                    expect(this.subject.primaryKey).to.equal(true);
                });

                it('should auto generate an id', function () {
                    if(this.subject.autoIncrement) {
                        expect(this.subject.autoIncrement).to.equal(true);
                    } else {
                        var Constants = helper.injector.get('Constants');
                        expect(this.subject.defaultsTo).to.be.a.function;
                        var data = this.subject.defaultsTo();
                        expect(Constants.Regex.uuid.test(data)).to.be.ok;
                    }
                });

                it('should be unique', function () {
                    expect(this.subject.unique).to.equal(true);
                });
            });

            describe('createdAt', function () {
                before(function () {
                    this.subject = this.attributes.createdAt;
                });

                it('should be a datetime', function () {
                    expect(this.subject.type).to.equal('datetime');
                });
            });

            describe('updatedAt', function () {
                before(function () {
                    this.subject = this.attributes.updatedAt;
                });

                it('should be a datetime', function () {
                    expect(this.subject.type).to.equal('datetime');
                });
            });

            describe('$indexes', function () {
                before(function () {
                    this.subject = this.$indexes;
                });

                it('should be an array of valid object', function () {
                    if (!this.subject) { //$indexes is optional
                        return;
                    }

                    expect(this.subject).to.be.instanceof(Array);
                    _.forEach(this.subject, function(item) {
                        expect(item).to.be.an('Object');
                        expect(item).to.have.any.keys('keys', 'options'); //not allow others keys
                        expect(item).to.have.all.keys('keys'); //keys is must-have
                        expect(item.keys).to.be.an('Object');
                        expect(item.keys).to.not.deep.equal({}); //cannot be empty object
                        if (item.options) {
                            expect(item.options).to.be.an('Object');
                        }
                    });
                });
            });
        });

        describe('Class Methods', function () {
            describe('findByIdentifier', function () {
                it('should exist', function () {
                    expect(this.model.findByIdentifier).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('findByIdentifier');
                });
            });

            describe('updateByIdentifier', function () {
                it('should exist', function () {
                    expect(this.model.findByIdentifier).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('updateByIdentifier');
                });
            });

            describe('destroyByIdentifier', function () {
                it('should exist', function () {
                    expect(this.model.findByIdentifier).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('destroyByIdentifier');
                });
            });

            describe('findOrCreateByIdentifier', function () {
                it('should exist', function () {
                    expect(this.model.findByIdentifier).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('findOrCreateByIdentifier');
                });
            });

            describe('findMostRecent', function () {
                it('should exist', function () {
                    expect(this.model.findByIdentifier).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('findMostRecent');
                });
            });

            describe('createIndexes', function () {
                it('should exist', function () {
                    expect(this.model.createIndexes).to.exist;
                });

                it('should be a function', function () {
                    expect(this.model).to.respondTo('createIndexes');
                });
            });
        });
    }
};
