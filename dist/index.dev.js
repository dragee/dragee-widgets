var DrageeWidgets = (function (exports, dragee) {
  'use strict';

  function setStyle(element, style) {
    style = style || {};
    let cssText = '';
    for (const key in style) {
      if (style.hasOwnProperty(key)) {
        cssText += key + ': ' + style[key] + '; ';
      }
    }
    element.style.cssText = cssText;
  }
  function appendFirstChild(element, node) {
    if (element.firstChild) {
      element.insertBefore(node, element.firstChild);
    } else {
      element.appendChild(node);
    }
  }
  function createCanvas(area, rectagle) {
    const canvas = document.createElement('canvas');
    if (window.getComputedStyle(area).position === 'static') {
      area.style.position = 'relative';
    }
    canvas.setAttribute('width', rectagle.size.x + 'px');
    canvas.setAttribute('height', rectagle.size.y + 'px');
    setStyle(canvas, {
      position: 'absolute',
      left: rectagle.position.y + 'px',
      top: rectagle.position.y + 'px',
      width: rectagle.size.x + 'px',
      height: rectagle.size.y + 'px'
    });
    appendFirstChild(area, canvas);
    return canvas;
  }

  function getAngle(p1, p2) {
    const diff = p2.sub(p1);
    return normalizeAngle(Math.atan2(diff.y, diff.x));
  }
  function toRadian(angle) {
    return angle % 360 * Math.PI / 180;
  }
  function normalizeAngle(val) {
    while (val < 0) {
      val += 2 * Math.PI;
    }
    while (val > 2 * Math.PI) {
      val -= 2 * Math.PI;
    }
    return val;
  }
  function getPointFromRadialSystem(angle, length, center) {
    center = center || new dragee.Point(0, 0);
    return center.add(new dragee.Point(length * Math.cos(angle), length * Math.sin(angle)));
  }

  class Spider {
    constructor(area, elements, options = {}) {
      const areaRectangle = dragee.Rectangle.fromElement(area, area);
      this.options = Object.assign({
        angle: 0,
        dAngle: 2 * Math.PI / elements.length,
        center: areaRectangle.getCenter(),
        startRadius: 50,
        endRadius: areaRectangle.getMinSide() / 2,
        lineWidth: 2,
        strokeStyle: '#ff5577',
        fillStyle: 'rgba(150,255,50,0.8)'
      }, options);
      this.area = area;
      this.areaRectangle = areaRectangle;
      this.init(elements);
    }
    init(elements) {
      this.canvas = createCanvas(this.area, this.areaRectangle);
      this.context = this.canvas.getContext('2d');
      this.draggables = elements.map((element, i) => {
        const angle = this.options.angle + i * this.options.dAngle;
        const halfSize = dragee.Point.elementSize(element).mult(0.5);
        const start = getPointFromRadialSystem(angle, this.options.startRadius, this.options.center).sub(halfSize);
        const end = getPointFromRadialSystem(angle, this.options.endRadius, this.options.center).sub(halfSize);
        return new dragee.Draggable(element, {
          container: this.area,
          bound: dragee.BoundToLine.bounding(start, end),
          position: start,
          on: {
            'drag:move': () => this.draw()
          }
        });
      });
      this.isInit = true;
      this.draw();
    }
    draw() {
      if (!this.isInit) {
        return;
      }
      this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
      this.context.beginPath();
      let point = this.draggables[0].getCenter();
      this.context.moveTo(point.x, point.y);
      for (let i = 0; i < this.draggables.length; i++) {
        point = this.draggables[i].getCenter();
        this.context.lineTo(point.x, point.y);
      }
      this.context.closePath();
      this.context.lineWidth = this.options.lineWidth;
      this.context.strokeStyle = this.options.strokeStyle;
      this.context.stroke();
      this.context.fillStyle = this.options.fillStyle;
      this.context.fill();
    }
  }

  class ArcSlider extends dragee.EventEmitter {
    constructor(area, element, options = {}) {
      super(options);
      const areaRectangle = dragee.Rectangle.fromElement(area, area);
      this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        startAngle: Math.PI,
        endAngle: 0,
        angles: [Math.PI, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2],
        time: 500
      }, options);
      this.shiftedCenter = this.options.center;
      this.area = area;
      this.init(element);
    }
    init(element) {
      const angle = this.options.startAngle;
      const position = getPointFromRadialSystem(angle, this.options.radius, this.shiftedCenter);
      this.angle = angle;
      this.draggable = new dragee.Draggable(element, {
        container: this.area,
        bound: dragee.BoundToArc.bounding(this.shiftedCenter, this.options.radius, this.options.startAngle, this.options.endAngle),
        position: position,
        on: {
          'drag:move': () => this.change()
        }
      });
    }
    updateAngle() {
      this.angle = getAngle(this.shiftedCenter, this.draggable.position);
    }
    change() {
      this.updateAngle();
      //      var angle = Geometry.getNearestAngle(this.options.angles, this.angle);
      //      this.setAngle(angle,this.options.time);
      this.emit('arcslider:change', {
        arcSlider: this,
        angle: this.angle
      });
    }
    setAngle(angle, time) {
      this.angle = normalizeAngle(angle);
      const position = getPointFromRadialSystem(this.angle, this.options.radius, this.shiftedCenter);
      this.draggable.pinPosition(position, {
        duration: time || 0
      });
      this.emit('arcslider:change', {
        arcSlider: this,
        angle: this.angle
      });
    }
  }

  function range(start, stop, step) {
    const result = [];
    if (typeof stop === 'undefined') {
      stop = start;
      start = 0;
    }
    if (typeof step === 'undefined') {
      step = 1;
    }
    if (step > 0 && start >= stop || step < 0 && start <= stop) {
      return [];
    }
    for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
      result.push(i);
    }
    return result;
  }

  const rnd = function () {
    return Math.round(Math.random() * 255);
  };
  const toHexString = function (digit) {
    let str = digit.toString(16);
    while (str.length < 2) {
      str = '0' + str;
    }
    return str;
  };
  function randomColor() {
    return `#${toHexString(rnd())}${toHexString(rnd())}${toHexString(rnd())}`;
  }
  function getArrayWithBoundIndexes(index, length) {
    const retIndexes = [];
    if (index !== -1) {
      retIndexes.push(index);
      retIndexes.push((index + 1) % length);
    }
    return retIndexes;
  }
  class Chart extends dragee.EventEmitter {
    constructor(area, elements, options = {}) {
      super(options);
      const areaRectangle = dragee.Rectangle.fromElement(area, area);
      this.options = Object.assign({
        center: areaRectangle.getCenter(),
        radius: areaRectangle.getMinSide() / 2,
        touchRadius: areaRectangle.getMinSide() / 2,
        boundAngle: Math.PI / 9,
        fillStyles: range(0, elements.length).map(() => randomColor()),
        initAngles: range(-90, 270, 360 / elements.length).map(angle => toRadian(angle)),
        limitImg: null,
        limitImgOffset: new dragee.Point(0, 0)
      }, options);
      this.area = area;
      this.areaRectangle = areaRectangle;
      this.init(elements);
    }
    init(elements) {
      this.canvas = createCanvas(this.area, this.areaRectangle);
      this.context = this.canvas.getContext('2d');
      this.draggables = elements.map((element, i) => {
        const angle = this.options.initAngles[i];
        const halfSize = dragee.Point.elementSize(element).mult(0.5);
        const position = getPointFromRadialSystem(angle, this.options.touchRadius, this.options.center.sub(halfSize));
        return new dragee.Draggable(element, {
          container: this.area,
          bound: dragee.BoundToArc.bounding(this.options.center.sub(halfSize), this.options.touchRadius, this.getBoundAngle(i, false), this.getBoundAngle(i, true)),
          position: position,
          on: {
            'drag:move': () => this.draw()
          }
        });
      });
      this.isInit = true;
      this.draw();
    }
    updateAngles() {
      this.angles = this.draggables.map(draggable => {
        const halfSize = draggable.getSize().mult(0.5);
        return getAngle(this.options.center.sub(halfSize), draggable.position);
      });
    }
    getBoundAngle(index, isClossing) {
      const sign = isClossing ? 1 : -1;
      return () => {
        let i = (index + sign) % this.angles.length;
        if (i < 0) {
          i += this.angles.length;
        }
        return normalizeAngle(this.angles[i] - sign * this.options.boundAngle);
      };
    }
    draw() {
      if (!this.isInit) {
        return;
      }
      this.updateAngles();
      this.context.clearRect(0, 0, this.areaRectangle.size.x, this.areaRectangle.size.y);
      this.draggables.forEach((_draggable, index) => {
        this.drawArc(this.context, this.options.center, this.options.radius, index);
      });
      this.draggables.forEach((_draggable, index) => {
        this.drawLimitImg(index);
      });
      this.emit('chart:draw', {
        chart: this
      });
    }
    createClone(element, options = {}) {
      if (!this.isInit) {
        return;
      }
      const rectangle = dragee.Rectangle.fromElement(element, element);
      const opts = Object.assign({
        center: rectangle.getCenter(),
        radius: rectangle.getMinSide() / 2,
        fillStyles: this.options.fillStyles
      }, options);
      const canvas = createCanvas(element, rectangle);
      const context = canvas.getContext('2d');
      const cloneObj = {
        draw: () => {
          context.clearRect(0, 0, rectangle.size.x, rectangle.size.y);
          this.draggables.forEach((_draggable, index) => {
            this.drawArc(context, opts.center, opts.radius, index);
          });
        }
      };
      cloneObj.draw();
      return cloneObj;
    }
    getFillStyle(index) {
      if (typeof this.options.fillStyles[index] === 'function') {
        this.options.fillStyles[index] = this.options.fillStyles[index].call(this);
      }
      return this.options.fillStyles[index];
    }
    drawArc(context, center, radius, index) {
      const startAngle = this.angles[index];
      const endAngle = this.angles[(index + 1) % this.angles.length];
      const color = this.getFillStyle(index);
      context.beginPath();
      context.moveTo(center.x, center.y);
      context.arc(center.x, center.y, radius, startAngle, endAngle, false);
      context.lineTo(center.x, center.y);
      context.closePath();
      context.fillStyle = color;
      context.fill();
    }
    drawLimitImg(index) {
      let point, img;
      if (this.options.limitImg) {
        img = this.options.limitImg instanceof Array ? this.options.limitImg[index] : this.options.limitImg;
      }
      if (img) {
        const angle = normalizeAngle(this.angles[index]);
        point = new dragee.Point(0, -img.height / 2);
        point = point.add(this.options.limitImgOffset);
        this.context.translate(this.areaRectangle.size.x / 2, this.areaRectangle.size.y / 2);
        this.context.rotate(angle);
        this.context.drawImage(img, point.x, point.y);
        this.context.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
    getAnglesDiff() {
      const angles = this.angles.slice(1);
      let baseAngle = this.angles[0];
      angles.push(baseAngle);
      return angles.map(angle => {
        const diffAngle = normalizeAngle(angle - baseAngle);
        baseAngle = angle;
        return diffAngle;
      });
    }
    getPercent() {
      return this.getAnglesDiff().map(diffAngle => diffAngle / (2 * Math.PI));
    }
    getArcBisectrixs() {
      return this.getAnglesDiff().map((diffAngle, i) => {
        return normalizeAngle(this.angles[i] + diffAngle / 2);
      });
    }
    getArcOnPoint(point) {
      const angle = getAngle(this.options.center, point);
      const radius = dragee.getDistance(this.options.center, point);
      if (radius > this.options.radius) {
        return -1;
      }
      let offset = -1,
        i,
        j;
      for (i = 0; i < this.angles.length; i++) {
        if (offset === -1 || this.angles[offset] > this.angles[i]) {
          offset = i;
        }
      }
      for (i = 0, j = offset; i < this.angles.length; i++, j = (i + offset) % this.angles.length) {
        if (angle < this.angles[j]) {
          break;
        }
      }
      if (--j < 0) {
        j += this.angles.length;
      }
      return j;
    }
    setAngles(angles) {
      this.angles = angles;
      this.draggables.forEach((draggable, i) => {
        const angle = this.angles[i];
        const halfSize = draggable.getSize().mult(0.5);
        const position = getPointFromRadialSystem(angle, this.options.touchRadius, this.options.center.sub(halfSize));
        draggable.pinPosition(position);
      });
      this.draw();
    }
    setActiveArc(index) {
      const enableIndexes = getArrayWithBoundIndexes(index, this.draggables.length);
      this.activeArcIndex = index;
      this.draggables.forEach((draggable, i) => {
        draggable.enable = enableIndexes.indexOf(i) !== -1;
      });
      this.draw();
    }
  }

  exports.ArcSlider = ArcSlider;
  exports.Chart = Chart;
  exports.Spider = Spider;

  return exports;

})({}, Dragee);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL3NyYy9nZW9tZXRyeS9hbmdsZXMuanMiLCIuLi9zcmMvc3BpZGVyLmpzIiwiLi4vc3JjL2FyY3NsaWRlci5qcyIsIi4uL3NyYy91dGlscy9yYW5nZS5qcyIsIi4uL3NyYy9jaGFydC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSkge1xuICBzdHlsZSA9IHN0eWxlIHx8IHt9XG4gIGxldCBjc3NUZXh0ID0gJydcbiAgZm9yIChjb25zdCBrZXkgaW4gc3R5bGUpIHtcbiAgICBpZiAoc3R5bGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY3NzVGV4dCArPSBrZXkgKyAnOiAnICsgc3R5bGVba2V5XSArICc7ICdcbiAgICB9XG4gIH1cblxuICBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSBjc3NUZXh0XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZpcnN0Q2hpbGQoZWxlbWVudCwgbm9kZSkge1xuICBpZiAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUobm9kZSwgZWxlbWVudC5maXJzdENoaWxkKVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQobm9kZSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoYXJlYSwgcmVjdGFnbGUpIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFyZWEpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIGFyZWEuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gIH1cblxuICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHJlY3RhZ2xlLnNpemUueCArICdweCcpXG4gIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHJlY3RhZ2xlLnNpemUueSArICdweCcpXG4gIHNldFN0eWxlKGNhbnZhcywge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGxlZnQ6IHJlY3RhZ2xlLnBvc2l0aW9uLnkgKyAncHgnLFxuICAgIHRvcDogcmVjdGFnbGUucG9zaXRpb24ueSArICdweCcsXG4gICAgd2lkdGg6IHJlY3RhZ2xlLnNpemUueCArICdweCcsXG4gICAgaGVpZ2h0OiByZWN0YWdsZS5zaXplLnkgKyAncHgnXG4gIH0pXG4gIGFwcGVuZEZpcnN0Q2hpbGQoYXJlYSwgY2FudmFzKVxuICByZXR1cm4gY2FudmFzXG59XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2RyYWdlZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICBjb25zdCBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKVxuICBjb25zdCBtYXhBbmdsZSA9ICBNYXRoLm1heChhbHBoYSwgYmV0YSlcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSoyIC0gbWF4QW5nbGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgY29uc3QgZGlmZiA9IHAyLnN1YihwMSlcbiAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKE1hdGguYXRhbjIoZGlmZi55LCBkaWZmLngpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYW5nbGUpIHtcbiAgcmV0dXJuICgoYW5nbGUgJSAzNjApICogTWF0aC5QSSAvIDE4MClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlKGFuZ2xlKSB7XG4gIHJldHVybiAoYW5nbGUgKiAxODAgLyBNYXRoLlBJKSAlIDM2MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbmdsZShtaW4sIG1heCwgdmFsKSB7XG4gIGxldCBkbWluLCBkbWF4XG4gIGlmIChtaW4gPCBtYXggJiYgdmFsID4gbWluICYmIHZhbCA8IG1heCkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIGlmIChtYXggPCBtaW4gJiYgKHZhbCA8IG1heCB8fCB2YWwgPiBtaW4pKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpXG4gICAgZG1heCA9IGdldEFuZ2xlRGlmZihtYXgsIHZhbClcbiAgICBpZiAoZG1pbiA8IGRtYXgpIHtcbiAgICAgIHJldHVybiBtaW5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVhcmVzdEFuZ2xlKGFyciwgYW5nbGUpIHtcbiAgbGV0IGksIHRlbXAsIGRpZmYgPSBNYXRoLlBJICogMiwgdmFsdWVcbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7aSsrKSB7XG4gICAgdGVtcCA9IGdldEFuZ2xlRGlmZihhcnJbaV0sIGFuZ2xlKVxuICAgIGlmIChkaWZmIDwgdGVtcCkge1xuICAgICAgZGlmZiA9IHRlbXBcbiAgICAgIHZhbHVlID0gYXJyW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJXG4gIH1cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBsZW5ndGgsIGNlbnRlcikge1xuICBjZW50ZXIgPSBjZW50ZXIgfHwgbmV3IFBvaW50KDAsIDApXG4gIHJldHVybiBjZW50ZXIuYWRkKG5ldyBQb2ludChsZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksIGxlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkpXG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgQm91bmRUb0xpbmVcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQgeyBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0gfSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpZGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBjb25zdCBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbmdsZTogMCxcbiAgICAgIGRBbmdsZTogMiAqIE1hdGguUEkgLyBlbGVtZW50cy5sZW5ndGgsXG4gICAgICBjZW50ZXI6IGFyZWFSZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICBzdGFydFJhZGl1czogNTAsXG4gICAgICBlbmRSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgIHN0cm9rZVN0eWxlOiAnI2ZmNTU3NycsXG4gICAgICBmaWxsU3R5bGU6ICdyZ2JhKDE1MCwyNTUsNTAsMC44KSdcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgdGhpcy5kcmFnZ2FibGVzID0gZWxlbWVudHMubWFwKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5hbmdsZSArIGkgKiB0aGlzLm9wdGlvbnMuZEFuZ2xlXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQpLm11bHQoMC41KVxuICAgICAgY29uc3Qgc3RhcnQgPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuICAgICAgY29uc3QgZW5kID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuZW5kUmFkaXVzLCB0aGlzLm9wdGlvbnMuY2VudGVyKS5zdWIoaGFsZlNpemUpXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvTGluZS5ib3VuZGluZyhzdGFydCwgZW5kKSxcbiAgICAgICAgcG9zaXRpb246IHN0YXJ0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKVxuXG4gICAgbGV0IHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzWzBdLmdldENlbnRlcigpXG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzW2ldLmdldENlbnRlcigpXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKVxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLm9wdGlvbnMubGluZVdpZHRoXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5vcHRpb25zLnN0cm9rZVN0eWxlXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUmVjdGFuZ2xlLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQge1xuICBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0sXG4gIGdldEFuZ2xlLFxuICBub3JtYWxpemVBbmdsZVxufSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJjU2xpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudCwgb3B0aW9ucz17fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBzdGFydEFuZ2xlOiBNYXRoLlBJLFxuICAgICAgZW5kQW5nbGU6IDAsXG4gICAgICBhbmdsZXM6IFtNYXRoLlBJLCAtTWF0aC5QSSAvIDQsIDAsIE1hdGguUEkgLyA0LCBNYXRoLlBJIC8gMl0sXG4gICAgICB0aW1lOiA1MDBcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5zaGlmdGVkQ2VudGVyID0gdGhpcy5vcHRpb25zLmNlbnRlclxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmluaXQoZWxlbWVudClcbiAgfVxuXG4gIGluaXQoZWxlbWVudCkge1xuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLnN0YXJ0QW5nbGVcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgIGFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcblxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICBjb250YWluZXI6IHRoaXMuYXJlYSxcbiAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXIsXG4gICAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICAgIHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlLFxuICAgICAgICB0aGlzLm9wdGlvbnMuZW5kQW5nbGVcbiAgICAgICksXG4gICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICBvbjoge1xuICAgICAgICAnZHJhZzptb3ZlJzogKCkgPT4gdGhpcy5jaGFuZ2UoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBbmdsZSgpIHtcbiAgICB0aGlzLmFuZ2xlID0gZ2V0QW5nbGUodGhpcy5zaGlmdGVkQ2VudGVyLCB0aGlzLmRyYWdnYWJsZS5wb3NpdGlvbilcbiAgfVxuXG4gIGNoYW5nZSgpIHtcbiAgICB0aGlzLnVwZGF0ZUFuZ2xlKClcbiAgICAvLyAgICAgIHZhciBhbmdsZSA9IEdlb21ldHJ5LmdldE5lYXJlc3RBbmdsZSh0aGlzLm9wdGlvbnMuYW5nbGVzLCB0aGlzLmFuZ2xlKTtcbiAgICAvLyAgICAgIHRoaXMuc2V0QW5nbGUoYW5nbGUsdGhpcy5vcHRpb25zLnRpbWUpO1xuICAgIHRoaXMuZW1pdCgnYXJjc2xpZGVyOmNoYW5nZScsIHsgYXJjU2xpZGVyOiB0aGlzLCBhbmdsZTogdGhpcy5hbmdsZSB9KVxuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGUsIHRpbWUpIHtcbiAgICB0aGlzLmFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUpXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oXG4gICAgICB0aGlzLmFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcbiAgICB0aGlzLmRyYWdnYWJsZS5waW5Qb3NpdGlvbihwb3NpdGlvbiwgeyBkdXJhdGlvbjogdGltZSB8fCAwIH0pXG4gICAgdGhpcy5lbWl0KCdhcmNzbGlkZXI6Y2hhbmdlJywgeyBhcmNTbGlkZXI6IHRoaXMsIGFuZ2xlOiB0aGlzLmFuZ2xlIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdG9wID0gc3RhcnRcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAodHlwZW9mIHN0ZXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RlcCA9IDFcbiAgfVxuICBpZiAoKHN0ZXAgPiAwICYmIHN0YXJ0ID49IHN0b3ApIHx8IChzdGVwIDwgMCAmJiBzdGFydCA8PSBzdG9wKSkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIGZvciAobGV0IGkgPSBzdGFydDsgc3RlcCA+IDAgPyBpIDwgc3RvcCA6IGkgPiBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICByZXN1bHQucHVzaChpKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cbiIsImltcG9ydCBjcmVhdGVDYW52YXMgZnJvbSAnLi91dGlscy9jcmVhdGUtY2FudmFzJ1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vdXRpbHMvcmFuZ2UnXG5pbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIEJvdW5kVG9BcmMsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZ2V0RGlzdGFuY2Vcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQge1xuICB0b1JhZGlhbixcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmNvbnN0IHJuZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSlcbn1cblxuY29uc3QgdG9IZXhTdHJpbmcgPSBmdW5jdGlvbihkaWdpdCkge1xuICBsZXQgc3RyID0gZGlnaXQudG9TdHJpbmcoMTYpXG4gIHdoaWxlIChzdHIubGVuZ3RoIDwgMikge1xuICAgIHN0ciA9ICcwJyArIHN0clxuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gcmFuZG9tQ29sb3IoKSB7XG4gIHJldHVybiBgIyR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfWBcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzKGluZGV4LCBsZW5ndGgpIHtcbiAgY29uc3QgcmV0SW5kZXhlcyA9IFtdXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZXRJbmRleGVzLnB1c2goaW5kZXgpXG4gICAgcmV0SW5kZXhlcy5wdXNoKChpbmRleCArIDEpICUgbGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHJldEluZGV4ZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgdG91Y2hSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGJvdW5kQW5nbGU6IE1hdGguUEkgLyA5LFxuICAgICAgZmlsbFN0eWxlczogcmFuZ2UoMCwgZWxlbWVudHMubGVuZ3RoKS5tYXAoKCkgPT4gcmFuZG9tQ29sb3IoKSksXG4gICAgICBpbml0QW5nbGVzOiByYW5nZSgtOTAsIDI3MCwgMzYwIC8gZWxlbWVudHMubGVuZ3RoKS5tYXAoKGFuZ2xlKSA9PiB0b1JhZGlhbihhbmdsZSkpLFxuICAgICAgbGltaXRJbWc6IG51bGwsXG4gICAgICBsaW1pdEltZ09mZnNldDogbmV3IFBvaW50KDAsIDApXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLmluaXRBbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudG91Y2hSYWRpdXMsXG4gICAgICAgICAgdGhpcy5nZXRCb3VuZEFuZ2xlKGksIGZhbHNlKSxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgdHJ1ZSlcbiAgICAgICAgKSxcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgdXBkYXRlQW5nbGVzKCkge1xuICAgIHRoaXMuYW5nbGVzID0gdGhpcy5kcmFnZ2FibGVzLm1hcCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICByZXR1cm4gZ2V0QW5nbGUodGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLCBkcmFnZ2FibGUucG9zaXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGdldEJvdW5kQW5nbGUoaW5kZXgsIGlzQ2xvc3NpbmcpIHtcbiAgICBjb25zdCBzaWduID0gaXNDbG9zc2luZyA/IDEgOiAtMVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpID0gKGluZGV4ICsgc2lnbikgJSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpICs9IHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKHRoaXMuYW5nbGVzW2ldIC0gc2lnbiAqIHRoaXMub3B0aW9ucy5ib3VuZEFuZ2xlKVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBbmdsZXMoKVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0FyYyh0aGlzLmNvbnRleHQsIHRoaXMub3B0aW9ucy5jZW50ZXIsIHRoaXMub3B0aW9ucy5yYWRpdXMsIGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbWl0SW1nKGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmVtaXQoJ2NoYXJ0OmRyYXcnLCB7IGNoYXJ0OiB0aGlzIH0pXG4gIH1cblxuICBjcmVhdGVDbG9uZShlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQpXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiByZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICByYWRpdXM6IHJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgZmlsbFN0eWxlczogdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKGVsZW1lbnQsIHJlY3RhbmdsZSlcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb25zdCBjbG9uZU9iaiA9IHtcbiAgICAgIGRyYXc6ICgpID0+IHtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgcmVjdGFuZ2xlLnNpemUueCwgcmVjdGFuZ2xlLnNpemUueSlcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKF9kcmFnZ2FibGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmF3QXJjKGNvbnRleHQsIG9wdHMuY2VudGVyLCBvcHRzLnJhZGl1cywgaW5kZXgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGNsb25lT2JqLmRyYXcoKVxuICAgIHJldHVybiBjbG9uZU9ialxuICB9XG5cbiAgZ2V0RmlsbFN0eWxlKGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XS5jYWxsKHRoaXMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF1cbiAgfVxuXG4gIGRyYXdBcmMoY29udGV4dCwgY2VudGVyLCByYWRpdXMsIGluZGV4KSB7XG4gICAgY29uc3Qgc3RhcnRBbmdsZSA9IHRoaXMuYW5nbGVzW2luZGV4XVxuICAgIGNvbnN0IGVuZEFuZ2xlID0gdGhpcy5hbmdsZXNbKGluZGV4KzEpICUgdGhpcy5hbmdsZXMubGVuZ3RoXVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRGaWxsU3R5bGUoaW5kZXgpXG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgY29udGV4dC5tb3ZlVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpXG4gICAgY29udGV4dC5saW5lVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgY29udGV4dC5maWxsKClcbiAgfVxuXG4gIGRyYXdMaW1pdEltZyhpbmRleCkge1xuICAgIGxldCBwb2ludCwgaW1nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEltZykge1xuICAgICAgaW1nID0gdGhpcy5vcHRpb25zLmxpbWl0SW1nIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLm9wdGlvbnMubGltaXRJbWdbaW5kZXhdIDogdGhpcy5vcHRpb25zLmxpbWl0SW1nXG4gICAgfVxuXG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYW5nbGUgPSBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpbmRleF0pXG4gICAgICBwb2ludCA9IG5ldyBQb2ludCgwLCAtaW1nLmhlaWdodCAvIDIpXG4gICAgICBwb2ludCA9IHBvaW50LmFkZCh0aGlzLm9wdGlvbnMubGltaXRJbWdPZmZzZXQpXG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHRoaXMuYXJlYVJlY3RhbmdsZS5zaXplLnggLyAyLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55IC8gMilcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltZywgcG9pbnQueCwgcG9pbnQueSlcbiAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMClcbiAgICB9XG4gIH1cblxuICBnZXRBbmdsZXNEaWZmKCkge1xuICAgIGNvbnN0IGFuZ2xlcyA9IHRoaXMuYW5nbGVzLnNsaWNlKDEpXG4gICAgbGV0IGJhc2VBbmdsZSA9IHRoaXMuYW5nbGVzWzBdXG5cbiAgICBhbmdsZXMucHVzaChiYXNlQW5nbGUpXG4gICAgcmV0dXJuIGFuZ2xlcy5tYXAoKGFuZ2xlKSA9PiB7XG4gICAgICBjb25zdCBkaWZmQW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSAtIGJhc2VBbmdsZSlcbiAgICAgIGJhc2VBbmdsZSA9IGFuZ2xlXG4gICAgICByZXR1cm4gZGlmZkFuZ2xlXG4gICAgfSlcbiAgfVxuXG4gIGdldFBlcmNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlKSA9PiBkaWZmQW5nbGUgLyAoMiAqIE1hdGguUEkpKVxuICB9XG5cbiAgZ2V0QXJjQmlzZWN0cml4cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbmdsZXNEaWZmKCkubWFwKChkaWZmQW5nbGUsIGkpID0+IHtcbiAgICAgIHJldHVybiBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpXSArIGRpZmZBbmdsZSAvIDIpXG4gICAgfSlcbiAgfVxuXG4gIGdldEFyY09uUG9pbnQocG9pbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IGdldEFuZ2xlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuICAgIGNvbnN0IHJhZGl1cyA9IGdldERpc3RhbmNlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuXG4gICAgaWYgKHJhZGl1cyA+IHRoaXMub3B0aW9ucy5yYWRpdXMpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAtMSwgaSwgalxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9mZnNldCA9PT0gLTEgfHwgdGhpcy5hbmdsZXNbb2Zmc2V0XSA+IHRoaXMuYW5nbGVzW2ldKSB7XG4gICAgICAgIG9mZnNldCA9IGlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IG9mZnNldDsgaSA8IHRoaXMuYW5nbGVzLmxlbmd0aDsgaSsrLCBqID0gKGkgKyBvZmZzZXQpICUgdGhpcy5hbmdsZXMubGVuZ3RoKSB7XG4gICAgICBpZiAoYW5nbGUgPCB0aGlzLmFuZ2xlc1tqXSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoLS1qIDwgMCkge1xuICAgICAgaiArPSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIGpcbiAgfVxuXG4gIHNldEFuZ2xlcyhhbmdsZXMpIHtcbiAgICB0aGlzLmFuZ2xlcyA9IGFuZ2xlc1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHBvc2l0aW9uKVxuICAgIH0pXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIHNldEFjdGl2ZUFyYyhpbmRleCkge1xuICAgIGNvbnN0IGVuYWJsZUluZGV4ZXMgPSBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGgpXG4gICAgdGhpcy5hY3RpdmVBcmNJbmRleCA9IGluZGV4XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZUluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTFcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJQb2ludCIsIlJlY3RhbmdsZSIsIkRyYWdnYWJsZSIsIkJvdW5kVG9MaW5lIiwiZHJhZzptb3ZlIiwiRXZlbnRFbWl0dGVyIiwiQm91bmRUb0FyYyIsImdldERpc3RhbmNlIl0sIm1hcHBpbmdzIjoiOzs7RUFBQSxTQUFTLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO0VBQ2hDLEVBQUEsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFO0lBQ25CLElBQUksT0FBTyxHQUFHLEVBQUU7RUFDaEIsRUFBQSxLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtFQUN2QixJQUFBLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUM3QixPQUFPLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSTtFQUMzQyxJQUFBO0VBQ0YsRUFBQTtFQUVBLEVBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTztFQUNqQztFQUVBLFNBQVMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtJQUN2QyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUU7TUFDdEIsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQztFQUNoRCxFQUFBLENBQUMsTUFBTTtFQUNMLElBQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7RUFDM0IsRUFBQTtFQUNGO0VBRWUsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtFQUNuRCxFQUFBLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBQy9DLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7RUFDdkQsSUFBQSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVO0VBQ2xDLEVBQUE7RUFFQSxFQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztFQUNwRCxFQUFBLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNyRCxRQUFRLENBQUMsTUFBTSxFQUFFO0VBQ2YsSUFBQSxRQUFRLEVBQUUsVUFBVTtFQUNwQixJQUFBLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJO0VBQ2hDLElBQUEsR0FBRyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUk7RUFDL0IsSUFBQSxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSTtFQUM3QixJQUFBLE1BQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRztFQUM1QixHQUFDLENBQUM7RUFDRixFQUFBLGdCQUFnQixDQUFDLElBQUksRUFBRSxNQUFNLENBQUM7RUFDOUIsRUFBQSxPQUFPLE1BQU07RUFDZjs7RUM3Qk8sU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUMvQixFQUFBLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ3ZCLEVBQUEsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRDtFQUVPLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRTtJQUM5QixPQUFTLEtBQUssR0FBRyxHQUFHLEdBQUksSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHO0VBQ3ZDO0VBbUNPLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRTtJQUNsQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUU7RUFDZCxJQUFBLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDcEIsRUFBQTtFQUNBLEVBQUEsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUU7RUFDeEIsSUFBQSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0VBQ3BCLEVBQUE7RUFDQSxFQUFBLE9BQU8sR0FBRztFQUNaO0VBRU8sU0FBUyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtJQUM5RCxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUlBLFlBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJQSxZQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNsRjs7RUNyRGUsTUFBTSxNQUFNLENBQUM7SUFDMUIsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxHQUFDLEVBQUUsRUFBRTtNQUN0QyxNQUFNLGFBQWEsR0FBR0MsZ0JBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztFQUN2RCxJQUFBLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUMzQixNQUFBLEtBQUssRUFBRSxDQUFDO1FBQ1IsTUFBTSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxNQUFNO0VBQ3JDLE1BQUEsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUU7RUFDakMsTUFBQSxXQUFXLEVBQUUsRUFBRTtFQUNmLE1BQUEsU0FBUyxFQUFFLGFBQWEsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDO0VBQ3pDLE1BQUEsU0FBUyxFQUFFLENBQUM7RUFDWixNQUFBLFdBQVcsRUFBRSxTQUFTO0VBQ3RCLE1BQUEsU0FBUyxFQUFFO09BQ1osRUFBRSxPQUFPLENBQUM7TUFFWCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUk7TUFDaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhO0VBQ2xDLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDckIsRUFBQTtJQUVBLElBQUksQ0FBQyxRQUFRLEVBQUU7RUFDYixJQUFBLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQztNQUN6RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztNQUUzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLO0VBQzdDLE1BQUEsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTtFQUMxRCxNQUFBLE1BQU0sUUFBUSxHQUFHRCxZQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckQsTUFBTSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUMxRyxNQUFNLEdBQUcsR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBRXRHLE1BQUEsT0FBTyxJQUFJRSxnQkFBUyxDQUFDLE9BQU8sRUFBRTtVQUM1QixTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUk7VUFDcEIsS0FBSyxFQUFFQyxrQkFBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO0VBQ3ZDLFFBQUEsUUFBUSxFQUFFLEtBQUs7RUFDZixRQUFBLEVBQUUsRUFBRTtFQUNGLFVBQUEsV0FBVyxFQUFFQyxNQUFNLElBQUksQ0FBQyxJQUFJO0VBQzlCO0VBQ0YsT0FBQyxDQUFDO0VBQ0osSUFBQSxDQUFDLENBQUM7TUFFRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUk7TUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRTtFQUNiLEVBQUE7RUFFQSxFQUFBLElBQUksR0FBRztFQUNMLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7RUFDaEIsTUFBQTtFQUNGLElBQUE7TUFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDbEYsSUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtNQUV4QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtFQUMxQyxJQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUVyQyxJQUFBLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7RUFDdEMsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDdkMsSUFBQTtFQUNBLElBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7TUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTO01BQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVztFQUNuRCxJQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO01BQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUztFQUMvQyxJQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0VBQ3JCLEVBQUE7RUFDRjs7RUM3RGUsTUFBTSxTQUFTLFNBQVNDLG1CQUFZLENBQUM7SUFDbEQsV0FBVyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxHQUFDLEVBQUUsRUFBRTtNQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDO01BQ2QsTUFBTSxhQUFhLEdBQUdKLGdCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7RUFDdkQsSUFBQSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDM0IsTUFBQSxNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRTtFQUNqQyxNQUFBLE1BQU0sRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztRQUN0QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUU7RUFDbkIsTUFBQSxRQUFRLEVBQUUsQ0FBQztRQUNYLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7RUFDNUQsTUFBQSxJQUFJLEVBQUU7T0FDUCxFQUFFLE9BQU8sQ0FBQztFQUVYLElBQUEsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07TUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJO0VBQ2hCLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7RUFDcEIsRUFBQTtJQUVBLElBQUksQ0FBQyxPQUFPLEVBQUU7RUFDWixJQUFBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVTtFQUNyQyxJQUFBLE1BQU0sUUFBUSxHQUFHLHdCQUF3QixDQUN2QyxLQUFLLEVBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ25CLElBQUksQ0FBQyxhQUNQLENBQUM7TUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUs7RUFDbEIsSUFBQSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUlDLGdCQUFTLENBQUMsT0FBTyxFQUFFO1FBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNwQixLQUFLLEVBQUVJLGlCQUFVLENBQUMsUUFBUSxDQUN4QixJQUFJLENBQUMsYUFBYSxFQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsUUFDZixDQUFDO0VBQ0QsTUFBQSxRQUFRLEVBQUUsUUFBUTtFQUNsQixNQUFBLEVBQUUsRUFBRTtFQUNGLFFBQUEsV0FBVyxFQUFFRixNQUFNLElBQUksQ0FBQyxNQUFNO0VBQ2hDO0VBQ0YsS0FBQyxDQUFDO0VBQ0osRUFBQTtFQUVBLEVBQUEsV0FBVyxHQUFHO0VBQ1osSUFBQSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO0VBQ3BFLEVBQUE7RUFFQSxFQUFBLE1BQU0sR0FBRztNQUNQLElBQUksQ0FBQyxXQUFXLEVBQUU7RUFDbEI7RUFDQTtFQUNBLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtFQUFFLE1BQUEsU0FBUyxFQUFFLElBQUk7UUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0VBQU0sS0FBQyxDQUFDO0VBQ3ZFLEVBQUE7RUFFQSxFQUFBLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFO0VBQ3BCLElBQUEsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDO0VBQ2xDLElBQUEsTUFBTSxRQUFRLEdBQUcsd0JBQXdCLENBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ25CLElBQUksQ0FBQyxhQUNQLENBQUM7RUFDRCxJQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUFFLFFBQVEsRUFBRSxJQUFJLElBQUk7RUFBRSxLQUFDLENBQUM7RUFDN0QsSUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFO0VBQUUsTUFBQSxTQUFTLEVBQUUsSUFBSTtRQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7RUFBTSxLQUFDLENBQUM7RUFDdkUsRUFBQTtFQUNGOztFQzVFZSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtJQUMvQyxNQUFNLE1BQU0sR0FBRyxFQUFFO0VBQ2pCLEVBQUEsSUFBSSxPQUFPLElBQUksS0FBSyxXQUFXLEVBQUU7RUFDL0IsSUFBQSxJQUFJLEdBQUcsS0FBSztFQUNaLElBQUEsS0FBSyxHQUFHLENBQUM7RUFDWCxFQUFBO0VBQ0EsRUFBQSxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsRUFBRTtFQUMvQixJQUFBLElBQUksR0FBRyxDQUFDO0VBQ1YsRUFBQTtFQUNBLEVBQUEsSUFBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSyxFQUFFO0VBQzlELElBQUEsT0FBTyxFQUFFO0VBQ1gsRUFBQTtJQUNBLEtBQUssSUFBSSxDQUFDLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7RUFDN0QsSUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoQixFQUFBO0VBQ0EsRUFBQSxPQUFPLE1BQU07RUFDZjs7RUNFQSxNQUFNLEdBQUcsR0FBRyxZQUFXO0lBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO0VBQ3RDLENBQUM7RUFFRCxNQUFNLFdBQVcsR0FBRyxVQUFTLEtBQUssRUFBRTtFQUNsQyxFQUFBLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0VBQzVCLEVBQUEsT0FBTyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUNyQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7RUFDakIsRUFBQTtFQUNBLEVBQUEsT0FBTyxHQUFHO0VBQ1osQ0FBQztFQUVELFNBQVMsV0FBVyxHQUFHO0lBQ3JCLE9BQU8sQ0FBQSxDQUFBLEVBQUksV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUEsRUFBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQSxDQUFFO0VBQzNFO0VBRUEsU0FBUyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFO0lBQy9DLE1BQU0sVUFBVSxHQUFHLEVBQUU7RUFDckIsRUFBQSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7RUFDaEIsSUFBQSxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztNQUN0QixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUM7RUFDdkMsRUFBQTtFQUVBLEVBQUEsT0FBTyxVQUFVO0VBQ25CO0VBRWUsTUFBTSxLQUFLLFNBQVNDLG1CQUFZLENBQUM7SUFDOUMsV0FBVyxDQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxHQUFDLEVBQUUsRUFBRTtNQUN2QyxLQUFLLENBQUMsT0FBTyxDQUFDO01BQ2QsTUFBTSxhQUFhLEdBQUdKLGdCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7RUFDdkQsSUFBQSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7RUFDM0IsTUFBQSxNQUFNLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRTtFQUNqQyxNQUFBLE1BQU0sRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztFQUN0QyxNQUFBLFdBQVcsRUFBRSxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQztFQUMzQyxNQUFBLFVBQVUsRUFBRSxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDdkIsTUFBQSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sV0FBVyxFQUFFLENBQUM7UUFDOUQsVUFBVSxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFFLEtBQUssSUFBSyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDbEYsTUFBQSxRQUFRLEVBQUUsSUFBSTtFQUNkLE1BQUEsY0FBYyxFQUFFLElBQUlELFlBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztPQUMvQixFQUFFLE9BQU8sQ0FBQztNQUVYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSTtNQUNoQixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWE7RUFDbEMsSUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztFQUNyQixFQUFBO0lBRUEsSUFBSSxDQUFDLFFBQVEsRUFBRTtFQUNiLElBQUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDO01BQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO01BQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUs7UUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLE1BQUEsTUFBTSxRQUFRLEdBQUdBLFlBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUNyRCxNQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FDdkMsS0FBSyxFQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNsQyxDQUFDO0VBRUQsTUFBQSxPQUFPLElBQUlFLGdCQUFTLENBQUMsT0FBTyxFQUFFO1VBQzVCLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSTtFQUNwQixRQUFBLEtBQUssRUFBRUksaUJBQVUsQ0FBQyxRQUFRLENBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQ3hCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQzVCLENBQUM7RUFDRCxRQUFBLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLFFBQUEsRUFBRSxFQUFFO0VBQ0YsVUFBQSxXQUFXLEVBQUVGLE1BQU0sSUFBSSxDQUFDLElBQUk7RUFDOUI7RUFDRixPQUFDLENBQUM7RUFDSixJQUFBLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSTtNQUNsQixJQUFJLENBQUMsSUFBSSxFQUFFO0VBQ2IsRUFBQTtFQUVBLEVBQUEsWUFBWSxHQUFHO01BQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBRSxTQUFTLElBQUs7UUFDL0MsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7RUFDOUMsTUFBQSxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQztFQUN4RSxJQUFBLENBQUMsQ0FBQztFQUNKLEVBQUE7RUFFQSxFQUFBLGFBQWEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFO0VBQy9CLElBQUEsTUFBTSxJQUFJLEdBQUcsVUFBVSxHQUFHLENBQUMsR0FBRyxFQUFFO0VBRWhDLElBQUEsT0FBTyxNQUFNO1FBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtRQUMzQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDVCxRQUFBLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07RUFDekIsTUFBQTtFQUNBLE1BQUEsT0FBTyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7TUFDeEUsQ0FBQztFQUNILEVBQUE7RUFFQSxFQUFBLElBQUksR0FBRztFQUNMLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7RUFDaEIsTUFBQTtFQUNGLElBQUE7TUFFQSxJQUFJLENBQUMsWUFBWSxFQUFFO01BQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztNQUNsRixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxLQUFLLEtBQUs7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztFQUM3RSxJQUFBLENBQUMsQ0FBQztNQUVGLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssS0FBSztFQUM3QyxNQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO0VBQzFCLElBQUEsQ0FBQyxDQUFDO0VBRUYsSUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtFQUFFLE1BQUEsS0FBSyxFQUFFO0VBQUssS0FBQyxDQUFDO0VBQzFDLEVBQUE7RUFFQSxFQUFBLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRTtFQUNqQyxJQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0VBQ2hCLE1BQUE7RUFDRixJQUFBO01BQ0EsTUFBTSxTQUFTLEdBQUdILGdCQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDekQsSUFBQSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0VBQ3pCLE1BQUEsTUFBTSxFQUFFLFNBQVMsQ0FBQyxTQUFTLEVBQUU7RUFDN0IsTUFBQSxNQUFNLEVBQUUsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUM7RUFDbEMsTUFBQSxVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztPQUMxQixFQUFFLE9BQU8sQ0FBQztFQUVYLElBQUEsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7RUFDL0MsSUFBQSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztFQUN2QyxJQUFBLE1BQU0sUUFBUSxHQUFHO0VBQ2YsTUFBQSxJQUFJLEVBQUUsTUFBTTtFQUNWLFFBQUEsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEtBQUssS0FBSztFQUM3QyxVQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7RUFDeEQsUUFBQSxDQUFDLENBQUM7RUFDSixNQUFBO09BQ0Q7TUFDRCxRQUFRLENBQUMsSUFBSSxFQUFFO0VBQ2YsSUFBQSxPQUFPLFFBQVE7RUFDakIsRUFBQTtJQUVBLFlBQVksQ0FBQyxLQUFLLEVBQUU7TUFDbEIsSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQzVFLElBQUE7RUFDQSxJQUFBLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO0VBQ3ZDLEVBQUE7SUFFQSxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO0VBQ3RDLElBQUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7RUFDckMsSUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztFQUM1RCxJQUFBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO01BRXRDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7TUFDbkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDbEMsSUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7TUFDcEUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7TUFDbEMsT0FBTyxDQUFDLFNBQVMsRUFBRTtNQUNuQixPQUFPLENBQUMsU0FBUyxHQUFHLEtBQUs7TUFDekIsT0FBTyxDQUFDLElBQUksRUFBRTtFQUNoQixFQUFBO0lBRUEsWUFBWSxDQUFDLEtBQUssRUFBRTtNQUNsQixJQUFJLEtBQUssRUFBRSxHQUFHO0VBQ2QsSUFBQSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsWUFBWSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRO0VBQ3JHLElBQUE7RUFFQSxJQUFBLElBQUksR0FBRyxFQUFFO1FBQ1AsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDaEQsTUFBQSxLQUFLLEdBQUcsSUFBSUQsWUFBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1FBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNwRixNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztFQUMxQixNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDN0MsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM3QyxJQUFBO0VBQ0YsRUFBQTtFQUVBLEVBQUEsYUFBYSxHQUFHO01BQ2QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0VBQ25DLElBQUEsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFFOUIsSUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztFQUN0QixJQUFBLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBRSxLQUFLLElBQUs7RUFDM0IsTUFBQSxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztFQUNuRCxNQUFBLFNBQVMsR0FBRyxLQUFLO0VBQ2pCLE1BQUEsT0FBTyxTQUFTO0VBQ2xCLElBQUEsQ0FBQyxDQUFDO0VBQ0osRUFBQTtFQUVBLEVBQUEsVUFBVSxHQUFHO0VBQ1gsSUFBQSxPQUFPLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLENBQUUsU0FBUyxJQUFLLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzNFLEVBQUE7RUFFQSxFQUFBLGdCQUFnQixHQUFHO0VBQ2pCLElBQUEsT0FBTyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSztFQUNoRCxNQUFBLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztFQUN2RCxJQUFBLENBQUMsQ0FBQztFQUNKLEVBQUE7SUFFQSxhQUFhLENBQUMsS0FBSyxFQUFFO01BQ25CLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7TUFDbEQsTUFBTSxNQUFNLEdBQUdPLGtCQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0VBRXRELElBQUEsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7RUFDaEMsTUFBQSxPQUFPLEVBQUU7RUFDWCxJQUFBO01BRUEsSUFBSSxNQUFNLEdBQUcsRUFBRTtRQUFFLENBQUM7UUFBRSxDQUFDO0VBQ3JCLElBQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUN2QyxNQUFBLElBQUksTUFBTSxLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7RUFDekQsUUFBQSxNQUFNLEdBQUcsQ0FBQztFQUNaLE1BQUE7RUFDRixJQUFBO0VBQ0EsSUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUMxRixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0VBQzFCLFFBQUE7RUFDRixNQUFBO0VBQ0YsSUFBQTtFQUNBLElBQUEsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDWCxNQUFBLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07RUFDekIsSUFBQTtFQUNBLElBQUEsT0FBTyxDQUFDO0VBQ1YsRUFBQTtJQUVBLFNBQVMsQ0FBQyxNQUFNLEVBQUU7TUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO01BQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSztFQUN4QyxNQUFBLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzlDLE1BQU0sUUFBUSxHQUFHLHdCQUF3QixDQUN2QyxLQUFLLEVBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2xDLENBQUM7RUFFRCxNQUFBLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO0VBQ2pDLElBQUEsQ0FBQyxDQUFDO01BQ0YsSUFBSSxDQUFDLElBQUksRUFBRTtFQUNiLEVBQUE7SUFFQSxZQUFZLENBQUMsS0FBSyxFQUFFO01BQ2xCLE1BQU0sYUFBYSxHQUFHLHdCQUF3QixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztNQUM3RSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUs7TUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxLQUFLO1FBQ3hDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3BELElBQUEsQ0FBQyxDQUFDO01BQ0YsSUFBSSxDQUFDLElBQUksRUFBRTtFQUNiLEVBQUE7RUFDRjs7Ozs7Ozs7In0=
