# chinese_coordinate_conversion
An open-source javascript library for coordinate conversion between WGS84 and various encrypted Chinese coordinate systems such as BD09, GCJ02.

## supported coordinate reference systems (CRS)

* [GCJ02](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China) Chinese encrypted coordinate system 
* BD09LL CRS used by http://map.baidu.com
* WGS84  common used CRS globally, aka EPSG:4326


## Usage


```javascript
    var convertor = require('./index.js');
    //convert coordinates from gcj02 to bd09ll
    var c = convertor.transform([114.68837663801743, 33.63312016454496], 'GCJ02', 'BD09LL');
    //expect [114.69490414027017,33.639096507711685]
    
    //convert a geoJSON object from gcj02 to bd09ll
    //can also be other geometry type, a Feature, even a FeatureCollection
    var geo = { "type": "Point", "coordinates": [100.0, 0.0] };
    var geo2 = convertor.transform(geo, 'GCJ02', 'BD09LL');
    //expect { "type": "Point", "coordinates": [100.0, 0.0] }
    
    //a geoJSON array
    var geos = [{ "type": "Point", "coordinates": [100.0, 0.0] }];
    var geos2 = convertor.transform(geo, 'GCJ02', 'BD09LL');
    
    //a Feature
    var feature = { "type": "Feature",
              "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
              "properties": {"prop0": "value0"}
            };
    var feature2 = convertor.transform(geo, 'GCJ02', 'BD09LL');

    //a FeatureCollection
    var featureCollection = {
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
                      }
                 ]
              };
    var featureCollection2 = convertor.transform(geo, 'GCJ02', 'BD09LL');
```
