# dragee
https://github.com/dragee/dragee

# dragee-widgets
Widgets that are based on top of Dragee drag&amp;drop library

## Install

`dragee` is a peer dependency, so the widgets use the same copy of it as your app:

```sh
npm install dragee dragee-widgets
```

```javascript
import { Spider, ArcSlider, Chart } from 'dragee-widgets'
```

Without a bundler, load `dragee` before the widgets. They use the global `Dragee` and add `DrageeWidgets`:

```html
<script src="node_modules/dragee/dist/index.min.js"></script>
<script src="node_modules/dragee-widgets/dist/index.min.js"></script>
```

<img width="1199" alt="Знімок екрана 2019-11-27 16 10 54" src="https://user-images.githubusercontent.com/244409/69730367-95599580-1130-11ea-9f0f-d1d9e3d846d2.png">
