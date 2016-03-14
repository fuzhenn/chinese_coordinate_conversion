# Chinese Coordinate Transform
Coordinate or [GeoJSON](http://www.geojson.org) trasnforming from WGS84 to various encrypted Chinese coordinate systems such as BD09LL, GCJ02 and vice versa.

## Supported coordinate reference systems (CRS)

* [GCJ02](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China) : Chinese encrypted coordinate system 
* BD09LL : CRS used by http://map.baidu.com
* WGS84 : well-known CRS, aka EPSG:4326

## Definition
```javascript
convertor.transform(source, fromCRS, toCRS);
```

* **source** : a coordinate, array of coordinates, a GeoJSON or a array of GeoJSON to transform, possible values:
     - a coordinate: [x, y]
     - coordinate arrays: [[x1,y1], [x2, y2]]
        or more dimensions: [[[x1,y1], [x2, y2], [x3, y3]]]
     - a geoJSON object: { "type": "Point", "coordinates": [100.0, 0.0] }
     - a array of geoJSON objects: 
        [{ "type": "Point", "coordinates": [100.0, 0.0] } ,
                { "type": "Point", "coordinates": [101.0, 1.0] }]
* **fromCRS** : CRS transform from, possble values:
    - 'gcj02'
    - 'bd09ll'
    - 'wgs84' | 'EPSG:4326'
* **toCRS** : CRS transform to, same possible values with fromCRS

## How to use

### Node

```Bash
    npm install chncrs
```

### Browser

```html
    <script src="chncrs.js"></script>
    <script type="text/javascript">
        var c = maptalks.CRSTransform.transform([114.68837663801743, 33.63312016454496], 'GCJ02', 'BD09LL');
    </script>
```

## Example

```javascript
    var convertor = require('chncrs');
    //convert coordinates from gcj02 to bd09ll
    var c = convertor.transform([114.68837663801743, 33.63312016454496], 'GCJ02', 'BD09LL');
    
    //convert a geoJSON object from gcj02 to bd09ll
    //can also be other geometry type, a Feature, even a FeatureCollection
    var geo = { "type": "Point", "coordinates": [100.0, 0.0] };
    var geo2 = convertor.transform(geo, 'GCJ02', 'BD09LL');

    
    //a geoJSON array
    var geos = [{ "type": "Point", "coordinates": [100.0, 0.0] } ,
                { "type": "Point", "coordinates": [101.0, 1.0] }];
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
