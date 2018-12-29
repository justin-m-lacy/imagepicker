# pickimages
HTML javascript for picking and loading images.
Focus is on versatile capabilities rather than a bare minimum image picker.

Single or multiple image picks are supported.

ImagePicker can be instantiated with an existing HTML element, an options object,
or no parameters.

```javascript
import ImagePicker from 'pickfiles';

let picker = new ImagePicker( element, (picked)=>{

});

```

`ImagePicker.readAs` must be set to `'dataurl'` to allow default Image creation. This is the default.

The following events can be subscribed:
```javascript

let picker = new ImagePicker();

picker.on( 'pick', (picked)=>{});
picker.on( 'abort', (picker)=>{});
// called once for each file loaded.
picker.on( 'load', (data)=>{});
// called after all files have loaded.
picker.on('loadend', (datas)=>{});

// single image is ready.
picker.on('ready', (image)=>{});
// all picked images are ready.
picker.on('allready', (images)=>{});

```