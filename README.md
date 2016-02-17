# chinese_coordinate_conversion
An open-source javascript library for coordinate conversion between WGS84 and various encrypted chinese coordinate systems such as BD09, GCJ02.

## supported coordinate systems

* [GCJ02](https://en.wikipedia.org/wiki/Restrictions_on_geographic_data_in_China)
* BD09LL
* WGS84


## Usagage


```javascript
    var convertor = require('./index.js');
    //convert coordinates from gcj02 to bd09ll
    var c = convertor.convert([114.68837663801743, 33.63312016454496], 'GCJ02', 'BD09LL');
    
    //convert a geoJSON object from gcj02 to bd09ll
    //can also be other geometry type or a Feature, event a FeatureCollection
    var geo = { "type": "Point", "coordinates": [100.0, 0.0] };
    var converted = convertor.transform(geo, 'GCJ02', 'BD09LL');
```
