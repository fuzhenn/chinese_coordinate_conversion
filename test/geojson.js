var geoJSONs = [

        { "type": "Point", "coordinates": [100.0, 0.0] },
        {
            "type": "LineString",
            "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
        },
        //Polygon without Holes
        {
            "type": "Polygon",
            "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
            ]
        },
        //Polygon with Holes
        {
            "type": "Polygon",
            "coordinates": [
                [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ],
                [ [100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2] ]
            ]
        },
        {
            "type": "MultiPoint",
            "coordinates": [ [100.0, 0.0], [101.0, 1.0] ]
        },
        {
            "type": "MultiLineString",
            "coordinates": [
                [ [100.0, 0.0], [101.0, 1.0] ],
                [ [102.0, 2.0], [103.0, 3.0] ]
            ]
        },
        {
            "type": "MultiPolygon",
            "coordinates": [
                [
                    [[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]
                ],
                [
                    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
                    [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]
                ]
            ]
        },
        {
            "type": "GeometryCollection",
            "geometries": [
                { "type": "Point",
                  "coordinates": [100.0, 0.0]
                },
                { "type": "LineString",
                  "coordinates": [ [101.0, 0.0], [102.0, 1.0] ]
                }
            ]
        },
        {
            "type":"Circle",
            "coordinates":[100.0,0.0],
            "radius":100
        },
        {
            "type":"Ellipse",
            "coordinates":[100.0,0.0],
            "width":100,
            "height":50
        },
        {
            "type":"Rectangle",
            "coordinates":[100.0,0.0],
            "width":100,
            "height":50
        },
        {
            "type":"Sector",
            "coordinates":[100.0,0.0],
            "radius":1000,
            "startAngle":50,
            "endAngle":120
        }
    ];

    var featureCollectionGeoJSON = {
        "type": "FeatureCollection",
        "features": [
            { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
              "properties": {"prop0": "value0"}
            },
            { "type": "Feature",
              "geometry": {
                  "type": "LineString",
                  "coordinates": [
                      [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
                  ]
              },
              "properties": {
                  "prop0": "value0",
                  "prop1": 0.0
              }
            },
            { "type": "Feature",
              "geometry": {
                  "type": "Polygon",
                  "coordinates": [
                      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
                        [100.0, 1.0], [100.0, 0.0] ]
                  ]
              },
              "properties": {
                  "prop0": "value0",
                  "prop1": {"this": "that"}
              }
            }
        ]
    };
exports = module.exports = {
  geometries :geoJSONs,
  featureCollection : featureCollectionGeoJSON
};