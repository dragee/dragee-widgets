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

class DrageeEvent extends CustomEvent {
  constructor(type, detail, options = {}) {
    super(type, {
      ...options,
      detail
    });
    Object.assign(this, detail);
  }
  cancel() {
    this.preventDefault();
  }
  get canceled() {
    return this.defaultPrevented;
  }
}

function dispatchDomEvent(element, eventName, detail, {
  cancelable = false
} = {}) {
  const event = new DrageeEvent(eventName, detail, {
    bubbles: true,
    cancelable
  });
  element.dispatchEvent(event);
  return event;
}

class EventEmitter extends EventTarget {
  constructor(options = {}) {
    super();
    this.options = options;
    if (options && options.on) {
      Object.entries(options.on).forEach(([eventName, fn]) => this.on(eventName, fn));
    }
  }
  emit(eventName, detail, {
    cancelable = false
  } = {}) {
    const event = new DrageeEvent(eventName, detail, {
      cancelable
    });
    this.dispatchEvent(event);
    return event;
  }
  emitWithDomEvent(element, eventName, domEventName, detail, {
    cancelable = false
  } = {}) {
    const event = this.emit(eventName, detail, {
      cancelable
    });
    if (this.domEvents && dispatchDomEvent(element, domEventName, detail, {
      cancelable
    }).canceled) {
      event.cancel();
    }
    return event;
  }
  on(eventName, fn, options) {
    this.addEventListener(eventName, fn, options);
    return () => this.off(eventName, fn);
  }
  once(eventName, fn) {
    return this.on(eventName, fn, {
      once: true
    });
  }
  off(eventName, fn) {
    this.removeEventListener(eventName, fn);
  }
  unsubscribe(eventName, fn) {
    this.off(eventName, fn);
  }
  get domEvents() {
    return this.options?.domEvents !== false;
  }
}

/** Class representing a point. */
class Point {
  /**
  * Create a point.
  * @param {number} x - The x value.
  * @param {number} y - The y value.
  */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(p) {
    return new Point(this.x + p.x, this.y + p.y);
  }
  sub(p) {
    return new Point(this.x - p.x, this.y - p.y);
  }
  mult(k) {
    return new Point(this.x * k, this.y * k);
  }
  negative() {
    return new Point(-this.x, -this.y);
  }
  compare(p) {
    return this.x === p.x && this.y === p.y;
  }
  clone() {
    return new Point(this.x, this.y);
  }
  toString() {
    return `{x=${this.x},y=${this.y}}`;
  }
  static elementOffset(element, parent) {
    parent = parent || element.parentNode;
    return layoutPosition(element).sub(layoutPosition(parent));
  }
  static elementBoundingOffset(element, parent) {
    parent = parent || element.parentNode;
    const elementRect = element.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    return new Point(elementRect.left - parentRect.left, elementRect.top - parentRect.top);
  }
  static elementSize(element) {
    const elementRect = element.getBoundingClientRect();
    return new Point(elementRect.width, elementRect.height);
  }
}
function layoutPosition(element) {
  const position = new Point(element.offsetLeft, element.offsetTop);
  const offsetParent = element.offsetParent;
  return offsetParent ? position.add(new Point(offsetParent.clientLeft, offsetParent.clientTop)).add(layoutPosition(offsetParent)) : position;
}

class Rectangle {
  constructor(position, size) {
    this.position = position;
    this.size = size;
  }
  getP1() {
    return this.position;
  }
  getP2() {
    return new Point(this.position.x + this.size.x, this.position.y);
  }
  getP3() {
    return this.position.add(this.size);
  }
  getP4() {
    return new Point(this.position.x, this.position.y + this.size.y);
  }
  getCenter() {
    return this.position.add(this.size.mult(0.5));
  }
  or(rect) {
    const position = new Point(Math.min(this.position.x, rect.position.x), Math.min(this.position.y, rect.position.y));
    const size = new Point(Math.max(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.max(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);
    return new Rectangle(position, size);
  }
  and(rect) {
    const position = new Point(Math.max(this.position.x, rect.position.x), Math.max(this.position.y, rect.position.y));
    const size = new Point(Math.min(this.position.x + this.size.x, rect.position.x + rect.size.x), Math.min(this.position.y + this.size.y, rect.position.y + rect.size.y)).sub(position);
    if (size.x <= 0 || size.y <= 0) {
      return null;
    }
    return new Rectangle(position, size);
  }
  includePoint(p) {
    return !(this.position.x > p.x || this.position.x + this.size.x < p.x || this.position.y > p.y || this.position.y + this.size.y < p.y);
  }
  includeRectangle(rectangle) {
    return this.includePoint(rectangle.position) && this.includePoint(rectangle.getP3());
  }
  moveToBound(rect, axis) {
    let selAxis, crossRectangle;
    if (axis) {
      selAxis = axis;
    } else {
      crossRectangle = this.and(rect);
      if (!crossRectangle) {
        return rect;
      }
      selAxis = crossRectangle.size.x > crossRectangle.size.y ? 'y' : 'x';
    }
    const thisCenter = this.getCenter();
    const rectCenter = rect.getCenter();
    const sign = thisCenter[selAxis] > rectCenter[selAxis] ? -1 : 1;
    const offset = sign > 0 ? this.position[selAxis] + this.size[selAxis] - rect.position[selAxis] : this.position[selAxis] - (rect.position[selAxis] + rect.size[selAxis]);
    rect.position[selAxis] = rect.position[selAxis] + offset;
    return rect;
  }
  getSquare() {
    return this.size.x * this.size.y;
  }
  styleApply(el) {
    el = el || document.querySelector('ind');
    el.style.left = this.position.x + 'px';
    el.style.top = this.position.y + 'px';
    el.style.width = this.size.x + 'px';
    el.style.height = this.size.y + 'px';
  }
  growth(size) {
    this.size = this.size.add(size);
    this.position = this.position.add(size.mult(-0.5));
  }
  getMinSide() {
    return Math.min(this.size.x, this.size.y);
  }
  static fromElement(element, parent = element.parentNode, isConsiderTranslate = false) {
    const position = isConsiderTranslate ? Point.elementBoundingOffset(element, parent) : Point.elementOffset(element, parent);
    const size = Point.elementSize(element);
    return new Rectangle(position, size);
  }
}

function removeItem (array, val) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === val) {
      array.splice(i, 1);
      i--;
    }
  }
  return array;
}

const scopes = [];
const scopeStack = [];
class Scope extends EventEmitter {
  constructor(draggables, trays, options = {}) {
    super(options);
    scopes.forEach(scope => {
      if (draggables) {
        draggables.forEach(draggable => scope.releaseDraggable(draggable));
      }
      if (trays) {
        trays.forEach(tray => scope.releaseTray(tray));
      }
    });
    this.draggables = draggables || [];
    this.trays = trays || [];
    this.unsubscribes = new Map();
    scopes.push(this);
    this.options = {
      timeEnd: options.timeEnd || 400
    };
    this.init();
  }
  init() {
    this.draggables.forEach(draggable => this.initDraggable(draggable));
  }
  addDraggable(draggable) {
    scopes.forEach(scope => scope.releaseDraggable(draggable));
    this.draggables.push(draggable);
    this.initDraggable(draggable);
  }
  initDraggable(draggable) {
    this.unsubscribes.set(draggable, draggable.on('drag:release', event => {
      if (!event.canceled && this.onRelease(draggable)) {
        event.cancel();
      }
    }));
  }
  releaseDraggable(draggable) {
    this.unsubscribes.get(draggable)?.();
    this.unsubscribes.delete(draggable);
    removeItem(this.draggables, draggable);
  }
  addTray(tray) {
    scopes.forEach(scope => scope.releaseTray(tray));
    this.trays.push(tray);
  }
  releaseTray(tray) {
    removeItem(this.trays, tray);
  }
  onRelease(draggable) {
    if (!draggable.trays.length) return false;
    const shotTrays = this.trays.filter(tray => {
      return tray.draggables.indexOf(draggable) !== -1;
    }).filter(tray => {
      return tray.catchDraggable(draggable);
    }).sort((a, b) => {
      return a.getRectangle().getSquare() - b.getRectangle().getSquare();
    });
    const isAccepted = shotTrays.length > 0 && shotTrays[0].drop(draggable);
    if (!isAccepted) {
      draggable.pinPosition(draggable.initialPosition, {
        duration: this.options.timeEnd
      });
    }
    this.emit('scope:change', {
      scope: this,
      draggable
    });
    return true;
  }
  reset() {
    this.trays.forEach(tray => tray.reset());
  }
  refresh() {
    this.draggables.forEach(draggable => draggable.refresh());
    this.trays.forEach(tray => tray.refresh());
  }
  get positions() {
    return this.trays.map(tray => {
      return tray.innerDraggables.map(draggable => this.draggables.indexOf(draggable));
    });
  }
  set positions(positions) {
    if (positions.length === this.trays.length) {
      this.trays.forEach(tray => tray.reset());
      positions.forEach((trayIndexes, i) => {
        trayIndexes.forEach(index => {
          this.trays[i].add(this.draggables[index]);
        });
      });
    } else {
      throw new RangeError(`Expected ${this.trays.length} positions, got ${positions.length}`);
    }
  }
}
const defaultScope = new Scope();
function currentScope() {
  return scopeStack[scopeStack.length - 1] || defaultScope;
}

function throttle(func, wait) {
  let lastTime = 0;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - lastTime >= wait) {
      func.apply(context, args);
      lastTime = now;
    }
  };
}

function getParentsChain(childElement, rootElement) {
  const chain = [];
  let element = childElement;
  while (element.parentNode && element !== rootElement) {
    chain.unshift(element.parentNode);
    element = element.parentNode;
  }
  return chain;
}

const throttledDragOver = (callback, duration) => {
  const throttledCallback = throttle(event => callback(event), duration);
  return event => {
    event.preventDefault();
    throttledCallback(event);
  };
};
const formFieldSelector = 'input, textarea, select, [contenteditable]:not([contenteditable="false"])';
const isTouch = navigator.maxTouchPoints > 0;
const mouseEvents = {
  start: 'mousedown',
  move: 'mousemove',
  end: 'mouseup'
};
const touchEvents = {
  start: 'touchstart',
  move: 'touchmove',
  end: 'touchend'
};
const draggables = [];
const startEvents = new WeakSet();
const transformProperty = 'transform';
const transitionProperty = 'transition';
function getTouchByID(element, touchId) {
  for (let i = 0; i < element.changedTouches.length; i++) {
    if (element.changedTouches[i].identifier === touchId) {
      return element.changedTouches[i];
    }
  }
  return false;
}
function preventDoubleInit(draggable) {
  if (draggables.some(existing => draggable.element === existing.element)) {
    throw new Error('A Draggable already exists for this element');
  }
  draggables.push(draggable);
}
function copyStyles(source, destination) {
  const cs = window.getComputedStyle(source);
  for (let i = 0; i < cs.length; i++) {
    const key = cs[i];
    if (key.indexOf('transition') < 0 && key.indexOf('transform') < 0) {
      destination.style[key] = cs[key];
    }
  }
  for (let i = 0; i < source.children.length; i++) {
    copyStyles(source.children[i], destination.children[i]);
  }
}
class Draggable extends EventEmitter {
  constructor(element, options = {}) {
    super(options);
    this.trays = [];
    this.options = options;
    this.element = element;
    preventDoubleInit(this);
    const scope = options.scope || currentScope();
    scope.addDraggable(this);
    this._enable = true;
    this.startBounding();
    this.startPositioning();
    this.startListening();
  }
  startBounding() {
    this.bounding = this.options.bounding || {
      bound: this.options.bound || (point => point)
    };
  }
  startPositioning() {
    this._setDefaultTransition();
    this.offset = this.measureOffset();
    this.pinnedPosition = this.offset;
    this.position = this.offset;
    this.initialPosition = this.options.position || this.offset;
    this.pinPosition(this.initialPosition);
    this.refresh();
  }
  remeasure() {
    const isAtInitialPosition = this.position.compare(this.initialPosition);
    this.offset = this.measureOffset();
    this.initialPosition = this.options.position || this.offset;
    if (isAtInitialPosition) {
      this.pinPosition(this.initialPosition);
    } else {
      this.setPosition(this.position);
    }
    this.refresh();
  }
  measureOffset() {
    return this.isConsiderTransformOffset ? Point.elementBoundingOffset(this.element, this.container).sub(this._transformPosition || new Point(0, 0)) : Point.elementOffset(this.element, this.container);
  }
  startListening() {
    this.listeners = new AbortController();
    const options = {
      passive: false,
      signal: this.listeners.signal
    };
    this.handler.addEventListener(touchEvents.start, event => this.dragStart(event), options);
    this.handler.addEventListener(mouseEvents.start, event => this.dragStart(event), options);
  }
  getSize() {
    return Point.elementSize(this.element);
  }
  getPosition() {
    this.position = this.offset.add(this._transformPosition || new Point(0, 0));
    return this.position;
  }
  getCenter() {
    return this.position.add(this.getSize().mult(0.5));
  }
  _setDefaultTransition() {
    if (!this.element.style[transitionProperty]) {
      this.element.style[transitionProperty] = window.getComputedStyle(this.element)[transitionProperty];
    }
  }
  _setTransition(time) {
    let transition = this.element.style[transitionProperty];
    const transitionCss = `transform ${time}ms`;
    if (!/transform\s?\d*m?s?/.test(transition)) {
      if (transition) {
        transition += `, ${transitionCss}`;
      } else {
        transition = transitionCss;
      }
    } else {
      transition = transition.replace(/transform\s?\d*m?s?/g, transitionCss);
    }
    if (this.element.style[transitionProperty] !== transition) {
      this.element.style[transitionProperty] = transition;
    }
  }
  _setTranslate(point) {
    this._transformPosition = point;
    const translateCss = `translate3d(${point.x}px, ${point.y}px, 0px)`;
    let transform = this.element.style[transformProperty];
    if (this.shouldRemoveZeroTranslate && point.x === 0 && point.y === 0) {
      transform = transform.replace(/translate3d\([^)]+\)/, '');
    } else if (!/translate3d\([^)]+\)/.test(transform)) {
      if (transform) {
        transform += ' ';
      }
      transform += translateCss;
    } else {
      transform = transform.replace(/translate3d\([^)]+\)/, translateCss);
    }
    if (this.element.style[transformProperty] !== transform) {
      this.element.style[transformProperty] = transform;
    }
  }
  move(point, {
    duration = 0,
    silent = false
  } = {}) {
    point = point.clone();
    this.position = point;
    this._setTransition(duration);
    this._setTranslate(point.sub(this.offset));
    if (!silent) {
      this.emitDragEvent('move');
    }
  }
  pinPosition(point, {
    duration = 0,
    silent = true
  } = {}) {
    this.pinnedPosition = point.clone();
    this.move(this.pinnedPosition, {
      duration,
      silent
    });
  }
  resetPositionToInitial() {
    this.pinPosition(this.initialPosition);
  }
  refreshPosition() {
    this.setPosition(this.getPosition());
  }
  setPosition(point) {
    point = point.clone();
    this.position = point;
    this._setTransition(0);
    this._setTranslate(point.sub(this.offset));
  }
  determineDirection(point) {
    this._previousDirectionPosition ||= this._startPosition;
    this.leftDirection = this._previousDirectionPosition.x > point.x;
    this.rightDirection = this._previousDirectionPosition.x < point.x;
    this.upDirection = this._previousDirectionPosition.y > point.y;
    this.downDirection = this._previousDirectionPosition.y < point.y;
    this._previousDirectionPosition = point;
  }
  isFormField(target) {
    const field = target instanceof window.Element && target.closest(formFieldSelector);
    return Boolean(field) && this.element.contains(field);
  }
  seemsScrolling() {
    return +new Date() - this._startTouchTimestamp < this.touchDraggingThreshold;
  }
  shouldUseNativeDragAndDrop() {
    if (this.isTouchEvent) {
      return this.nativeDragAndDrop && this.emulateNativeDragAndDropOnTouch;
    } else {
      return this.nativeDragAndDrop;
    }
  }
  dragStart(event) {
    if (!this._enable || this.isFormField(event.target) || startEvents.has(event)) {
      return;
    }
    startEvents.add(event);
    if (this.stopPropagationOnDragStart) {
      event.stopPropagation();
    }
    this.isTouchEvent = isTouch && event instanceof window.TouchEvent;
    this.touchPoint = this._startTouchPoint = new Point(this.isTouchEvent ? event.changedTouches[0].pageX : event.clientX, this.isTouchEvent ? event.changedTouches[0].pageY : event.clientY);
    this._startPosition = this.getPosition();
    if (this.isTouchEvent) {
      this._touchId = event.changedTouches[0].identifier;
      this._startTouchTimestamp = +new Date();
    }
    this._startWindowScrollPoint = this.windowScrollPoint;
    this._startScrollElementsOffset = this.scrollElementsOffset;
    this.dragListeners?.abort();
    const {
      signal
    } = this.dragListeners = new AbortController();
    const options = {
      passive: false,
      signal
    };
    this._dragStartPending = !this.shouldUseNativeDragAndDrop() && this.dragStartThreshold > 0;
    if (!this._dragStartPending) {
      const startEvent = this.emitDragEvent('start', {
        cancelable: true
      });
      if (startEvent.canceled || signal.aborted) {
        return;
      }
    }
    if (this.shouldUseNativeDragAndDrop()) {
      if (this.isTouchEvent && this.emulateNativeDragAndDropOnTouch) {
        this._startParentsScrollOffset = this.parentsScrollOffset;
        const emulateOnFirstMove = event => {
          if (this.seemsScrolling()) {
            this.cancelDragging();
          } else {
            this.emulateNativeDragAndDrop(event);
          }
          cancelEmulation();
        };
        const cancelEmulation = () => {
          document.removeEventListener(touchEvents.move, emulateOnFirstMove);
          document.removeEventListener(touchEvents.end, cancelEmulation);
        };
        document.addEventListener(touchEvents.move, emulateOnFirstMove, options);
        document.addEventListener(touchEvents.end, cancelEmulation, options);
      } else {
        this.element.addEventListener('dragstart', event => this.nativeDragStart(event), {
          signal
        });
        this.element.draggable = true;
        document.addEventListener(mouseEvents.end, event => this.nativeDragEnd(event), options);
      }
    } else {
      const dragMove = event => this.dragMove(event);
      const dragEnd = event => this.dragEnd(event);
      document.addEventListener(touchEvents.move, dragMove, options);
      document.addEventListener(mouseEvents.move, dragMove, options);
      document.addEventListener(touchEvents.end, dragEnd, options);
      document.addEventListener(mouseEvents.end, dragEnd, options);
    }
    const onScroll = event => this.onScroll(event);
    window.addEventListener('scroll', onScroll, {
      signal
    });
    this.scrollElements.forEach(p => p.addEventListener('scroll', onScroll, {
      signal
    }));
  }
  dragMove(event) {
    let touch;
    this.isTouchEvent = isTouch && event instanceof window.TouchEvent;
    if (this.isTouchEvent) {
      touch = getTouchByID(event, this._touchId);
      if (!touch) {
        return;
      }
      if (this.seemsScrolling()) {
        this.cancelDragging();
        return;
      }
    }
    this.touchPoint = new Point(this.isTouchEvent ? touch.pageX : event.clientX, this.isTouchEvent ? touch.pageY : event.clientY);
    if (this._dragStartPending) {
      const dx = this.touchPoint.x - this._startTouchPoint.x;
      const dy = this.touchPoint.y - this._startTouchPoint.y;
      if (Math.sqrt(dx * dx + dy * dy) < this.dragStartThreshold) {
        return;
      }
      this._dragStartPending = false;
      const startEvent = this.emitDragEvent('start', {
        cancelable: true
      });
      if (startEvent.canceled || this.dragListeners.signal.aborted) {
        this.cancelDragging();
        return;
      }
    }
    this.isDragging = true;
    event.stopPropagation();
    event.preventDefault();
    let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
    point = this.bounding.bound(point, this.getSize());
    this.determineDirection(point);
    this.move(point);
    this.element.classList.add('dragee-active');
  }
  dragEnd(event) {
    this.isTouchEvent = isTouch && event instanceof window.TouchEvent;
    if (this.isTouchEvent && !getTouchByID(event, this._touchId)) {
      return;
    }
    if (this._dragStartPending) {
      // threshold never crossed — treat as click, clean up silently
      this._dragStartPending = false;
      this.cancelDragging();
      return;
    }
    if (this.isDragging) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.release();
    this.emitDragEvent('end');
    this.cancelDragging();
    setTimeout(() => this.element.classList.remove('dragee-active'));
  }
  onScroll(_event) {
    let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
    point = this.bounding.bound(point, this.getSize());
    if (!this.nativeDragAndDrop) {
      this.determineDirection(point);
      this.move(point);
    }
  }
  nativeDragStart(event) {
    event.stopPropagation();
    event.dataTransfer.setData('text', 'FireFox fix');
    event.dataTransfer.effectAllowed = 'move';
    const {
      signal
    } = this.dragListeners;
    document.addEventListener('dragover', throttledDragOver(event => this.nativeDragOver(event), this.dragOverThrottleDuration), {
      signal
    });
    document.addEventListener('dragend', event => this.nativeDragEnd(event), {
      signal
    });
    document.addEventListener('drop', event => this.nativeDrop(event), {
      signal
    });
  }
  nativeDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    this.element.classList.add('dragee-placeholder');
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }
    this.touchPoint = new Point(event.clientX, event.clientY);
    let point = this._startPosition.add(this.touchPoint.sub(this._startTouchPoint)).add(this.windowScrollPoint.sub(this._startWindowScrollPoint)).add(this.scrollElementsOffset.sub(this._startScrollElementsOffset));
    point = this.bounding.bound(point, this.getSize());
    this.determineDirection(point);
    this.position = point;
    this.emitDragEvent('move');
  }
  nativeDragEnd(_event) {
    this.element.classList.remove('dragee-placeholder');
    this.release();
    this.emitDragEvent('end');
    this.dragListeners.abort();
    this.isDragging = false;
    this.element.removeAttribute('draggable');
    this.element.classList.remove('dragee-active');
  }
  nativeDrop(event) {
    event.stopPropagation();
    event.preventDefault();
  }
  cancelDragging() {
    this.dragListeners?.abort();
    this.isDragging = false;
    this._previousDirectionPosition = null;
    this.element.removeAttribute('draggable');
  }
  copyStyles(source, destination) {
    if (this.options.copyStyles) {
      this.options.copyStyles(source, destination);
    } else {
      copyStyles(source, destination);
    }
  }
  emulateNativeDragAndDrop(event) {
    const containerRect = this.container.getBoundingClientRect();
    const clonedElement = this.element.cloneNode(true);
    clonedElement.style[transformProperty] = '';
    this.copyStyles(this.element, clonedElement);
    clonedElement.classList.add('dragee-native-emulation');
    clonedElement.style.position = 'absolute';
    document.body.appendChild(clonedElement);
    this.element.classList.add('dragee-placeholder');
    const emulationDraggable = new Draggable(clonedElement, {
      container: document.body,
      touchDraggingThreshold: 0,
      domEvents: false,
      bound(point) {
        return point;
      },
      on: {
        'drag:move': () => {
          const containerRectPoint = new Point(containerRect.left, containerRect.top);
          this.position = emulationDraggable.position.sub(containerRectPoint).sub(this._startWindowScrollPoint).add(this._startParentsScrollOffset);
          this.determineDirection(this.position);
          this.emitDragEvent('move');
        },
        'drag:end': () => {
          emulationDraggable.destroy();
          document.body.removeChild(clonedElement);
          this.element.classList.remove('dragee-placeholder');
          this.element.classList.remove('dragee-active');
          this.release();
          this.emitDragEvent('end');
          this.cancelDragging();
        }
      }
    });
    const containerRectPoint = new Point(containerRect.left, containerRect.top);
    emulationDraggable._startWindowScrollPoint = this._startWindowScrollPoint;
    emulationDraggable.move(this.pinnedPosition.add(containerRectPoint).add(this.windowScrollPoint).sub(this.parentsScrollOffset));
    emulationDraggable.dragStart(event);
    event.preventDefault();
  }
  emitDragEvent(type, options) {
    return this.emitWithDomEvent(this.element, `drag:${type}`, `dragee:${type}`, {
      draggable: this
    }, options);
  }
  release() {
    const releaseEvent = this.emitDragEvent('release', {
      cancelable: true
    });
    if (!releaseEvent.canceled) {
      this.pinPosition(this.position);
    }
  }
  getRectangle() {
    return new Rectangle(this.position, this.getSize());
  }
  refresh() {
    if (this.bounding.refresh) {
      this.bounding.refresh();
    }
  }
  destroy() {
    this.listeners.abort();
    this.dragListeners?.abort();
    scopes.forEach(scope => scope.releaseDraggable(this));
    this.trays.slice().forEach(tray => tray.releaseDraggable(this));
    const index = draggables.indexOf(this);
    if (index > -1) {
      draggables.splice(index, 1);
    }
  }
  get container() {
    return this._container = this._container || this.options.container || this.options.parent || this.element.offsetParent;
  }
  get handler() {
    if (!this._handler) {
      if (typeof this.options.handler === 'string') {
        this._handler = this.element.querySelector(this.options.handler) || this.element;
      } else {
        this._handler = this.options.handler || this.element;
      }
    }
    return this._handler;
  }
  get stopPropagationOnDragStart() {
    return this.options.stopPropagationOnDragStart || false;
  }
  get nativeDragAndDrop() {
    return this.options.nativeDragAndDrop || false;
  }
  get emulateNativeDragAndDropOnTouch() {
    return this.options.emulateNativeDragAndDropOnTouch || false;
  }
  get shouldRemoveZeroTranslate() {
    return this.options.shouldRemoveZeroTranslate || false;
  }
  get touchDraggingThreshold() {
    return this.options.touchDraggingThreshold || 0;
  }
  get dragStartThreshold() {
    return this.options.dragStartThreshold || 0;
  }
  get dragOverThrottleDuration() {
    return this.options.dragOverThrottleDuration || 16;
  }
  get isConsiderTransformOffset() {
    return this.options.considerTransformOffset || false;
  }
  get windowScrollPoint() {
    return new Point(window.scrollX, window.scrollY);
  }
  get scrollRootContainer() {
    return this.options.scrollRootContainer || this.container;
  }
  get scrollElements() {
    return this._cachedScrollElements ? this._cachedScrollElements : this._cachedScrollElements = getParentsChain(this.element, this.scrollRootContainer);
  }
  get scrollElementsOffset() {
    return new Point(this.scrollElements.reduce((sum, p) => sum + p.scrollLeft, 0), this.scrollElements.reduce((sum, p) => sum + p.scrollTop, 0));
  }
  get parents() {
    return this._cachedParents ? this._cachedParents : this._cachedParents = getParentsChain(this.element, this.container);
  }
  get parentsScrollOffset() {
    return new Point(this.parents.reduce((sum, p) => sum + p.scrollLeft, 0), this.parents.reduce((sum, p) => sum + p.scrollTop, 0));
  }
  get enable() {
    return this._enable;
  }
  set enable(enable) {
    if (enable) {
      this.element.classList.remove('dragee-disable');
    } else {
      this.element.classList.add('dragee-disable');
    }
    this._enable = enable;
  }
}

function getDistance(p1, p2) {
  const dx = p1.x - p2.x,
    dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

//Return crossing point of two lines
function directCrossing(L1P1, L1P2, L2P1, L2P2) {
  let temp, k1, k2, b1, b2, x, y;
  if (L2P1.x === L2P2.x) {
    temp = L2P1;
    L2P1 = L1P1;
    L1P1 = temp;
    temp = L2P2;
    L2P2 = L1P2;
    L1P2 = temp;
  }
  if (L1P1.x === L1P2.x) {
    k2 = (L2P2.y - L2P1.y) / (L2P2.x - L2P1.x);
    b2 = (L2P2.x * L2P1.y - L2P1.x * L2P2.y) / (L2P2.x - L2P1.x);
    x = L1P1.x;
    y = x * k2 + b2;
    return new Point(x, y);
  } else {
    k1 = (L1P2.y - L1P1.y) / (L1P2.x - L1P1.x);
    b1 = (L1P2.x * L1P1.y - L1P1.x * L1P2.y) / (L1P2.x - L1P1.x);
    k2 = (L2P2.y - L2P1.y) / (L2P2.x - L2P1.x);
    b2 = (L2P2.x * L2P1.y - L2P1.x * L2P2.y) / (L2P2.x - L2P1.x);
    x = (b1 - b2) / (k2 - k1);
    y = x * k1 + b1;
    return new Point(x, y);
  }
}
function boundToLine(A, B, P) {
  const AP = new Point(P.x - A.x, P.y - A.y),
    AB = new Point(B.x - A.x, B.y - A.y),
    ab2 = AB.x * AB.x + AB.y * AB.y,
    ap_ab = AP.x * AB.x + AP.y * AB.y,
    t = ap_ab / ab2;
  return new Point(A.x + AB.x * t, A.y + AB.y * t);
}
function getPointOnLineByLenght(LP1, LP2, lenght) {
  const dx = LP2.x - LP1.x;
  const dy = LP2.y - LP1.y;
  const percent = lenght / getDistance(LP1, LP2);
  return new Point(LP1.x + percent * dx, LP1.y + percent * dy);
}

function getAngleDiff(alpha, beta) {
  const minAngle = Math.min(alpha, beta);
  const maxAngle = Math.max(alpha, beta);
  return Math.min(maxAngle - minAngle, minAngle + Math.PI * 2 - maxAngle);
}
function getAngle$1(p1, p2) {
  const diff = p2.sub(p1);
  return normalizeAngle$1(Math.atan2(diff.y, diff.x));
}
function boundAngle(min, max, val) {
  let dmin, dmax;
  if (min < max && val > min && val < max) {
    return val;
  } else if (max < min && (val < max || val > min)) {
    return val;
  } else {
    dmin = getAngleDiff(min, val);
    dmax = getAngleDiff(max, val);
    if (dmin < dmax) {
      return min;
    } else {
      return max;
    }
  }
}
function normalizeAngle$1(val) {
  while (val < 0) {
    val += 2 * Math.PI;
  }
  while (val > 2 * Math.PI) {
    val -= 2 * Math.PI;
  }
  return val;
}
function getPointFromRadialSystem$1(angle, length, center) {
  center = center || new Point(0, 0);
  return center.add(new Point(length * Math.cos(angle), length * Math.sin(angle)));
}

class Bound {
  constructor() {}
  bound(point, _size) {
    return point;
  }
  refresh() {}
  static bounding() {
    const instance = new this(...arguments);
    return instance.bound.bind(instance);
  }
}
class BoundToLine extends Bound {
  constructor(startPoint, endPoint) {
    super();
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    const alpha = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);
    const beta = alpha + Math.PI / 2;
    this.someK = 10;
    this.cosBeta = Math.cos(beta);
    this.sinBeta = Math.sin(beta);
  }
  bound(point, size) {
    const point2 = new Point(point.x + this.someK * this.cosBeta, point.y + this.someK * this.sinBeta);
    const newEndPoint = getPointOnLineByLenght(this.endPoint, this.startPoint, size.x);
    const pointCrossing = directCrossing(this.startPoint, this.endPoint, point, point2);
    return boundToLine(this.startPoint, newEndPoint, pointCrossing);
  }
}
class BoundToCircle extends Bound {
  constructor(center, radius) {
    super();
    this.center = center;
    this.radius = radius;
  }
  bound(point, _size) {
    return getPointOnLineByLenght(this.center, point, this.radius);
  }
}
class BoundToArc extends BoundToCircle {
  constructor(center, radius, startAngle, endAngle) {
    super(center, radius);
    this._startAngle = startAngle;
    this._endAngle = endAngle;
  }
  startAngle() {
    return typeof this._startAngle === 'function' ? this._startAngle() : this._startAngle;
  }
  endAngle() {
    return typeof this._endAngle === 'function' ? this._endAngle() : this._endAngle;
  }
  bound(point, _size) {
    let angle = getAngle$1(this.center, point);
    angle = normalizeAngle$1(angle);
    angle = boundAngle(this.startAngle(), this.endAngle(), angle);
    return getPointFromRadialSystem$1(angle, this.radius, this.center);
  }
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
  center = center || new Point(0, 0);
  return center.add(new Point(length * Math.cos(angle), length * Math.sin(angle)));
}

class Spider {
  constructor(area, elements) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const areaRectangle = Rectangle.fromElement(area, area);
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
      const halfSize = Point.elementSize(element).mult(0.5);
      const start = getPointFromRadialSystem(angle, this.options.startRadius, this.options.center).sub(halfSize);
      const end = getPointFromRadialSystem(angle, this.options.endRadius, this.options.center).sub(halfSize);
      return new Draggable(element, {
        container: this.area,
        bound: BoundToLine.bounding(start, end),
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

class ArcSlider extends EventEmitter {
  constructor(area, element) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(options);
    const areaRectangle = Rectangle.fromElement(area, area);
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
    this.draggable = new Draggable(element, {
      container: this.area,
      bound: BoundToArc.bounding(this.shiftedCenter, this.options.radius, this.options.startAngle, this.options.endAngle),
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
class Chart extends EventEmitter {
  constructor(area, elements) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    super(options);
    const areaRectangle = Rectangle.fromElement(area, area);
    this.options = Object.assign({
      center: areaRectangle.getCenter(),
      radius: areaRectangle.getMinSide() / 2,
      touchRadius: areaRectangle.getMinSide() / 2,
      boundAngle: Math.PI / 9,
      fillStyles: range(0, elements.length).map(() => randomColor()),
      initAngles: range(-90, 270, 360 / elements.length).map(angle => toRadian(angle)),
      limitImg: null,
      limitImgOffset: new Point(0, 0)
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
      const halfSize = Point.elementSize(element).mult(0.5);
      const position = getPointFromRadialSystem(angle, this.options.touchRadius, this.options.center.sub(halfSize));
      return new Draggable(element, {
        container: this.area,
        bound: BoundToArc.bounding(this.options.center.sub(halfSize), this.options.touchRadius, this.getBoundAngle(i, false), this.getBoundAngle(i, true)),
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
  createClone(element) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.isInit) {
      return;
    }
    const rectangle = Rectangle.fromElement(element, element);
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
      point = new Point(0, -img.height / 2);
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
    const radius = getDistance(this.options.center, point);
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

export { ArcSlider, Chart, Spider };
