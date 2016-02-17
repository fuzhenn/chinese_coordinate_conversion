var convertor = require('../index'),
    expect = require('expect.js');
describe('ProjectionTransform', function () {
    it('convert coordinates from gcj02 to bd09ll',function() {
        var expected = [
            [114.69490414027017,33.639096507711685],
            [114.69488614273101,33.63804850387785],
            [114.69500713986416,33.63794251496537],
            [114.69578412001135,33.63793958798685],
            [114.6959281162725,33.637965601694006],
            [114.69751307493384,33.63795775348675]
        ];

        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        var c = convertor.transform(lonlats, 'GCJ02', 'bd09ll');
        expect(c.length).to.be.eql(expected.length);
        for (var i = 0; i < c.length; i++) {
            expect(expected[i]).to.be.eql(c[i]);
        }
    });

    it('convert coordinates from bd09 to gcj02',function() {
        var expected = [
            [114.68181603717892,33.62725656403868],
            [114.6817979013556,33.626209199874246],
            [114.68192013578027,33.62609903302379],
            [114.68270503735356,33.62606909947837],
            [114.68285050678315,33.62609007990741],
            [114.68445184453674,33.62602638957822]
        ];

        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        var c = convertor.transform(lonlats, 'bd09ll', 'gcj02');
        expect(c.length).to.be.eql(expected.length);
        for (var i = 0; i < c.length; i++) {
            expect(expected[i]).to.be.eql(c[i]);
        }
    });

    it('same crses',function() {
        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        var c = convertor.transform(lonlats, 'GCJ02', 'gcj02');
        expect(c.length).to.be.eql(lonlats.length);
        for (var i = 0; i < c.length; i++) {
            expect(lonlats[i]).to.be.eql(c[i]);
        }
    });

    it('throws error if fromCRS or toCRS is null',function() {
        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        expect(function () {
                var c = convertor.transform(lonlats, 'GCJ02', null);
        }).to.throwException();
        expect(function () {
                var c = convertor.transform(lonlats, null, 'GCJ02');
        }).to.throwException();
    });

    it('returns null if input object is null', function() {
        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        var c = convertor.transform(null, 'GCJ02', 'bd09ll');
        expect(c).not.to.be.ok();
    });

    describe('convert geoJSON', function() {
        function compare(a, b) {
            expect(a.coordinates).not.to.be.eql(b.coordinates);
            var ac = a.coordinates,
                bc = b.coordinates;
            delete a.coordinates;
            delete b.coordinates;
            expect(a).to.be.eql(b);
            a.coordinates = ac;
            b.coordinates = bc;
        }
        it('same crses',function() {
            var data = require('./geojson');
            var geos = data.geometries;
            for (var i = 0; i < geos.length; i++) {
                var converted = convertor.transform(geos[i], 'gcj02', 'gcj02');
                expect(converted).to.be.eql(geos[i]);
            }
            var featureCollection = data.featureCollection;
            for (var i = 0; i < featureCollection.length; i++) {
                var converted = convertor.transform(featureCollection[i], 'gcj02', 'gcj02');
                expect(converted).to.be.eql(featureCollection[i]);
            }
        });

        it('convert geometries from gcj02 to bd09ll',function() {
            var geos = require('./geojson').geometries;
            for (var i = 0; i < geos.length; i++) {
                var converted = convertor.transform(geos[i], 'gcj02', 'bd09ll');
                expect(converted).not.to.be.eql(geos[i]);
                if (converted.coordinates) {
                    compare(converted, geos[i]);
                } else if (geos[i].geometries) {
                    var geometries = geos[i].geometries;
                    expect(converted.geometries).to.have.length(geometries.length);
                    for (var ii = 0; ii < geometries.length; ii++) {
                        compare(converted.geometries[ii], geometries[ii]);
                    }
                }
            }
        });

        it('convert Feature from gcj02 to bd09ll',function() {
            var features = require('./geojson').featureCollection.features;
            for (var i = 0; i < features.length; i++) {
                var converted = convertor.transform(features[i], 'gcj02', 'bd09ll');
                expect(converted).not.to.be.eql(features[i]);
                compare(converted.geometry, features[i].geometry);
            }
        });

        it('convert a feature array from gcj02 to bd09ll',function() {
            var features = require('./geojson').featureCollection.features;
            var converted = convertor.transform(features, 'gcj02', 'bd09ll');
            for (var i = 0; i < features.length; i++) {
                expect(converted[i]).not.to.be.eql(features[i]);
                compare(converted[i].geometry, features[i].geometry);
            }
        });

        it('convert FeatureCollection from gcj02 to bd09ll',function() {
            var featureCollection = require('./geojson').featureCollection;
            var converted = convertor.transform(featureCollection, 'gcj02', 'bd09ll');
            var features = featureCollection.features;
            for (var i = 0; i < features.length; i++) {
                expect(converted.features[i]).not.to.be.eql(features[i]);
                compare(converted.features[i].geometry, features[i].geometry);
            }
        });
    });

    it('crs can be a proj4 style',function() {
        var lonlats = [
            [114.68837663801743, 33.63312016454496],
            [114.68835840204522, 33.632072446353945],
            [114.68848002806972, 33.63196427051657],
            [114.68926112541861, 33.63194729708501],
            [114.68940588838505, 33.6319707051534],
            [114.69099925796665, 33.63193416046613]
        ];
        var c = convertor.transform(lonlats, 'bd09ll', 'gcj02');
        var c2 = convertor.transform(lonlats,
            //proj4 style crs representing BD09LL
            {'type':'proj4', 'properties':{'proj': '+proj=longlat +datum=BD09'}},
            //proj4 style crs representing GCJ02
            {'type':'proj4', 'properties':{'proj': '+proj=longlat +datum=GCJ02'}}
            );
        expect(c2).to.have.length(c.length);
        for (var i = 0; i < c.length; i++) {
            expect(c[i]).to.be.eql(c2[i]);
        }
    });
});