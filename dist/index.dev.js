var DrageeWidgets = (function (exports) {
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

  exports.ArcSlider = ArcSlider;
  exports.Chart = Chart;
  exports.Spider = Spider;

  return exports;

})({});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGV2LmpzIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMvY3JlYXRlLWNhbnZhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9kcmFnZWUvZGlzdC9pbmRleC5lc20uanMiLCIuLi9zcmMvZ2VvbWV0cnkvYW5nbGVzLmpzIiwiLi4vc3JjL3NwaWRlci5qcyIsIi4uL3NyYy9hcmNzbGlkZXIuanMiLCIuLi9zcmMvdXRpbHMvcmFuZ2UuanMiLCIuLi9zcmMvY2hhcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gc2V0U3R5bGUoZWxlbWVudCwgc3R5bGUpIHtcbiAgc3R5bGUgPSBzdHlsZSB8fCB7fVxuICBsZXQgY3NzVGV4dCA9ICcnXG4gIGZvciAoY29uc3Qga2V5IGluIHN0eWxlKSB7XG4gICAgaWYgKHN0eWxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGNzc1RleHQgKz0ga2V5ICsgJzogJyArIHN0eWxlW2tleV0gKyAnOyAnXG4gICAgfVxuICB9XG5cbiAgZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gY3NzVGV4dFxufVxuXG5mdW5jdGlvbiBhcHBlbmRGaXJzdENoaWxkKGVsZW1lbnQsIG5vZGUpIHtcbiAgaWYgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGVsZW1lbnQuZmlyc3RDaGlsZClcbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFwcGVuZENoaWxkKG5vZGUpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKGFyZWEsIHJlY3RhZ2xlKSB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhcmVhKS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICBhcmVhLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICB9XG5cbiAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCByZWN0YWdsZS5zaXplLnggKyAncHgnKVxuICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCByZWN0YWdsZS5zaXplLnkgKyAncHgnKVxuICBzZXRTdHlsZShjYW52YXMsIHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICBsZWZ0OiByZWN0YWdsZS5wb3NpdGlvbi55ICsgJ3B4JyxcbiAgICB0b3A6IHJlY3RhZ2xlLnBvc2l0aW9uLnkgKyAncHgnLFxuICAgIHdpZHRoOiByZWN0YWdsZS5zaXplLnggKyAncHgnLFxuICAgIGhlaWdodDogcmVjdGFnbGUuc2l6ZS55ICsgJ3B4J1xuICB9KVxuICBhcHBlbmRGaXJzdENoaWxkKGFyZWEsIGNhbnZhcylcbiAgcmV0dXJuIGNhbnZhc1xufVxuIiwiY2xhc3MgRHJhZ2VlRXZlbnQgZXh0ZW5kcyBDdXN0b21FdmVudCB7XG4gIGNvbnN0cnVjdG9yKHR5cGUsIGRldGFpbCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIodHlwZSwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGRldGFpbFxuICAgIH0pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGV0YWlsKTtcbiAgfVxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGdldCBjYW5jZWxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0UHJldmVudGVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoRG9tRXZlbnQoZWxlbWVudCwgZXZlbnROYW1lLCBkZXRhaWwsIHtcbiAgY2FuY2VsYWJsZSA9IGZhbHNlXG59ID0ge30pIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgRHJhZ2VlRXZlbnQoZXZlbnROYW1lLCBkZXRhaWwsIHtcbiAgICBidWJibGVzOiB0cnVlLFxuICAgIGNhbmNlbGFibGVcbiAgfSk7XG4gIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIHJldHVybiBldmVudDtcbn1cblxuY2xhc3MgRXZlbnRFbWl0dGVyIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbikge1xuICAgICAgT2JqZWN0LmVudHJpZXMob3B0aW9ucy5vbikuZm9yRWFjaCgoW2V2ZW50TmFtZSwgZm5dKSA9PiB0aGlzLm9uKGV2ZW50TmFtZSwgZm4pKTtcbiAgICB9XG4gIH1cbiAgZW1pdChldmVudE5hbWUsIGRldGFpbCwge1xuICAgIGNhbmNlbGFibGUgPSBmYWxzZVxuICB9ID0ge30pIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBEcmFnZWVFdmVudChldmVudE5hbWUsIGRldGFpbCwge1xuICAgICAgY2FuY2VsYWJsZVxuICAgIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgcmV0dXJuIGV2ZW50O1xuICB9XG4gIGVtaXRXaXRoRG9tRXZlbnQoZWxlbWVudCwgZXZlbnROYW1lLCBkb21FdmVudE5hbWUsIGRldGFpbCwge1xuICAgIGNhbmNlbGFibGUgPSBmYWxzZVxuICB9ID0ge30pIHtcbiAgICBjb25zdCBldmVudCA9IHRoaXMuZW1pdChldmVudE5hbWUsIGRldGFpbCwge1xuICAgICAgY2FuY2VsYWJsZVxuICAgIH0pO1xuICAgIGlmICh0aGlzLmRvbUV2ZW50cyAmJiBkaXNwYXRjaERvbUV2ZW50KGVsZW1lbnQsIGRvbUV2ZW50TmFtZSwgZGV0YWlsLCB7XG4gICAgICBjYW5jZWxhYmxlXG4gICAgfSkuY2FuY2VsZWQpIHtcbiAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgIH1cbiAgICByZXR1cm4gZXZlbnQ7XG4gIH1cbiAgb24oZXZlbnROYW1lLCBmbiwgb3B0aW9ucykge1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGZuLCBvcHRpb25zKTtcbiAgICByZXR1cm4gKCkgPT4gdGhpcy5vZmYoZXZlbnROYW1lLCBmbik7XG4gIH1cbiAgb25jZShldmVudE5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIHRoaXMub24oZXZlbnROYW1lLCBmbiwge1xuICAgICAgb25jZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIG9mZihldmVudE5hbWUsIGZuKSB7XG4gICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZm4pO1xuICB9XG4gIHVuc3Vic2NyaWJlKGV2ZW50TmFtZSwgZm4pIHtcbiAgICB0aGlzLm9mZihldmVudE5hbWUsIGZuKTtcbiAgfVxuICBnZXQgZG9tRXZlbnRzKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnM/LmRvbUV2ZW50cyAhPT0gZmFsc2U7XG4gIH1cbn1cblxuLyoqIENsYXNzIHJlcHJlc2VudGluZyBhIHBvaW50LiAqL1xuY2xhc3MgUG9pbnQge1xuICAvKipcbiAgKiBDcmVhdGUgYSBwb2ludC5cbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIFRoZSB4IHZhbHVlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gVGhlIHkgdmFsdWUuXG4gICovXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gIH1cbiAgYWRkKHApIHtcbiAgICByZXR1cm4gbmV3IFBvaW50KHRoaXMueCArIHAueCwgdGhpcy55ICsgcC55KTtcbiAgfVxuICBzdWIocCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54IC0gcC54LCB0aGlzLnkgLSBwLnkpO1xuICB9XG4gIG11bHQoaykge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy54ICogaywgdGhpcy55ICogayk7XG4gIH1cbiAgbmVnYXRpdmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCgtdGhpcy54LCAtdGhpcy55KTtcbiAgfVxuICBjb21wYXJlKHApIHtcbiAgICByZXR1cm4gdGhpcy54ID09PSBwLnggJiYgdGhpcy55ID09PSBwLnk7XG4gIH1cbiAgY2xvbmUoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGB7eD0ke3RoaXMueH0seT0ke3RoaXMueX19YDtcbiAgfVxuICBzdGF0aWMgZWxlbWVudE9mZnNldChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIHJldHVybiBsYXlvdXRQb3NpdGlvbihlbGVtZW50KS5zdWIobGF5b3V0UG9zaXRpb24ocGFyZW50KSk7XG4gIH1cbiAgc3RhdGljIGVsZW1lbnRCb3VuZGluZ09mZnNldChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3QubGVmdCAtIHBhcmVudFJlY3QubGVmdCwgZWxlbWVudFJlY3QudG9wIC0gcGFyZW50UmVjdC50b3ApO1xuICB9XG4gIHN0YXRpYyBlbGVtZW50U2l6ZShlbGVtZW50KSB7XG4gICAgY29uc3QgZWxlbWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiBuZXcgUG9pbnQoZWxlbWVudFJlY3Qud2lkdGgsIGVsZW1lbnRSZWN0LmhlaWdodCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGxheW91dFBvc2l0aW9uKGVsZW1lbnQpIHtcbiAgY29uc3QgcG9zaXRpb24gPSBuZXcgUG9pbnQoZWxlbWVudC5vZmZzZXRMZWZ0LCBlbGVtZW50Lm9mZnNldFRvcCk7XG4gIGNvbnN0IG9mZnNldFBhcmVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICByZXR1cm4gb2Zmc2V0UGFyZW50ID8gcG9zaXRpb24uYWRkKG5ldyBQb2ludChvZmZzZXRQYXJlbnQuY2xpZW50TGVmdCwgb2Zmc2V0UGFyZW50LmNsaWVudFRvcCkpLmFkZChsYXlvdXRQb3NpdGlvbihvZmZzZXRQYXJlbnQpKSA6IHBvc2l0aW9uO1xufVxuXG5jbGFzcyBSZWN0YW5nbGUge1xuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgc2l6ZSkge1xuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xuICB9XG4gIGdldFAxKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG4gIGdldFAyKCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5zaXplLngsIHRoaXMucG9zaXRpb24ueSk7XG4gIH1cbiAgZ2V0UDMoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuc2l6ZSk7XG4gIH1cbiAgZ2V0UDQoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55KTtcbiAgfVxuICBnZXRDZW50ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb24uYWRkKHRoaXMuc2l6ZS5tdWx0KDAuNSkpO1xuICB9XG4gIG9yKHJlY3QpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IG5ldyBQb2ludChNYXRoLm1pbih0aGlzLnBvc2l0aW9uLngsIHJlY3QucG9zaXRpb24ueCksIE1hdGgubWluKHRoaXMucG9zaXRpb24ueSwgcmVjdC5wb3NpdGlvbi55KSk7XG4gICAgY29uc3Qgc2l6ZSA9IG5ldyBQb2ludChNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnNpemUueCwgcmVjdC5wb3NpdGlvbi54ICsgcmVjdC5zaXplLngpLCBNYXRoLm1heCh0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSwgcmVjdC5wb3NpdGlvbi55ICsgcmVjdC5zaXplLnkpKS5zdWIocG9zaXRpb24pO1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHBvc2l0aW9uLCBzaXplKTtcbiAgfVxuICBhbmQocmVjdCkge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFBvaW50KE1hdGgubWF4KHRoaXMucG9zaXRpb24ueCwgcmVjdC5wb3NpdGlvbi54KSwgTWF0aC5tYXgodGhpcy5wb3NpdGlvbi55LCByZWN0LnBvc2l0aW9uLnkpKTtcbiAgICBjb25zdCBzaXplID0gbmV3IFBvaW50KE1hdGgubWluKHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54LCByZWN0LnBvc2l0aW9uLnggKyByZWN0LnNpemUueCksIE1hdGgubWluKHRoaXMucG9zaXRpb24ueSArIHRoaXMuc2l6ZS55LCByZWN0LnBvc2l0aW9uLnkgKyByZWN0LnNpemUueSkpLnN1Yihwb3NpdGlvbik7XG4gICAgaWYgKHNpemUueCA8PSAwIHx8IHNpemUueSA8PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpO1xuICB9XG4gIGluY2x1ZGVQb2ludChwKSB7XG4gICAgcmV0dXJuICEodGhpcy5wb3NpdGlvbi54ID4gcC54IHx8IHRoaXMucG9zaXRpb24ueCArIHRoaXMuc2l6ZS54IDwgcC54IHx8IHRoaXMucG9zaXRpb24ueSA+IHAueSB8fCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLnNpemUueSA8IHAueSk7XG4gIH1cbiAgaW5jbHVkZVJlY3RhbmdsZShyZWN0YW5nbGUpIHtcbiAgICByZXR1cm4gdGhpcy5pbmNsdWRlUG9pbnQocmVjdGFuZ2xlLnBvc2l0aW9uKSAmJiB0aGlzLmluY2x1ZGVQb2ludChyZWN0YW5nbGUuZ2V0UDMoKSk7XG4gIH1cbiAgbW92ZVRvQm91bmQocmVjdCwgYXhpcykge1xuICAgIGxldCBzZWxBeGlzLCBjcm9zc1JlY3RhbmdsZTtcbiAgICBpZiAoYXhpcykge1xuICAgICAgc2VsQXhpcyA9IGF4aXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNyb3NzUmVjdGFuZ2xlID0gdGhpcy5hbmQocmVjdCk7XG4gICAgICBpZiAoIWNyb3NzUmVjdGFuZ2xlKSB7XG4gICAgICAgIHJldHVybiByZWN0O1xuICAgICAgfVxuICAgICAgc2VsQXhpcyA9IGNyb3NzUmVjdGFuZ2xlLnNpemUueCA+IGNyb3NzUmVjdGFuZ2xlLnNpemUueSA/ICd5JyA6ICd4JztcbiAgICB9XG4gICAgY29uc3QgdGhpc0NlbnRlciA9IHRoaXMuZ2V0Q2VudGVyKCk7XG4gICAgY29uc3QgcmVjdENlbnRlciA9IHJlY3QuZ2V0Q2VudGVyKCk7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXNDZW50ZXJbc2VsQXhpc10gPiByZWN0Q2VudGVyW3NlbEF4aXNdID8gLTEgOiAxO1xuICAgIGNvbnN0IG9mZnNldCA9IHNpZ24gPiAwID8gdGhpcy5wb3NpdGlvbltzZWxBeGlzXSArIHRoaXMuc2l6ZVtzZWxBeGlzXSAtIHJlY3QucG9zaXRpb25bc2VsQXhpc10gOiB0aGlzLnBvc2l0aW9uW3NlbEF4aXNdIC0gKHJlY3QucG9zaXRpb25bc2VsQXhpc10gKyByZWN0LnNpemVbc2VsQXhpc10pO1xuICAgIHJlY3QucG9zaXRpb25bc2VsQXhpc10gPSByZWN0LnBvc2l0aW9uW3NlbEF4aXNdICsgb2Zmc2V0O1xuICAgIHJldHVybiByZWN0O1xuICB9XG4gIGdldFNxdWFyZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplLnggKiB0aGlzLnNpemUueTtcbiAgfVxuICBzdHlsZUFwcGx5KGVsKSB7XG4gICAgZWwgPSBlbCB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbmQnKTtcbiAgICBlbC5zdHlsZS5sZWZ0ID0gdGhpcy5wb3NpdGlvbi54ICsgJ3B4JztcbiAgICBlbC5zdHlsZS50b3AgPSB0aGlzLnBvc2l0aW9uLnkgKyAncHgnO1xuICAgIGVsLnN0eWxlLndpZHRoID0gdGhpcy5zaXplLnggKyAncHgnO1xuICAgIGVsLnN0eWxlLmhlaWdodCA9IHRoaXMuc2l6ZS55ICsgJ3B4JztcbiAgfVxuICBncm93dGgoc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMuc2l6ZS5hZGQoc2l6ZSk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uYWRkKHNpemUubXVsdCgtMC41KSk7XG4gIH1cbiAgZ2V0TWluU2lkZSgpIHtcbiAgICByZXR1cm4gTWF0aC5taW4odGhpcy5zaXplLngsIHRoaXMuc2l6ZS55KTtcbiAgfVxuICBzdGF0aWMgZnJvbUVsZW1lbnQoZWxlbWVudCwgcGFyZW50ID0gZWxlbWVudC5wYXJlbnROb2RlLCBpc0NvbnNpZGVyVHJhbnNsYXRlID0gZmFsc2UpIHtcbiAgICBjb25zdCBwb3NpdGlvbiA9IGlzQ29uc2lkZXJUcmFuc2xhdGUgPyBQb2ludC5lbGVtZW50Qm91bmRpbmdPZmZzZXQoZWxlbWVudCwgcGFyZW50KSA6IFBvaW50LmVsZW1lbnRPZmZzZXQoZWxlbWVudCwgcGFyZW50KTtcbiAgICBjb25zdCBzaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCk7XG4gICAgcmV0dXJuIG5ldyBSZWN0YW5nbGUocG9zaXRpb24sIHNpemUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUl0ZW0gKGFycmF5LCB2YWwpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChhcnJheVtpXSA9PT0gdmFsKSB7XG4gICAgICBhcnJheS5zcGxpY2UoaSwgMSk7XG4gICAgICBpLS07XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuY29uc3Qgc2NvcGVzID0gW107XG5jb25zdCBzY29wZVN0YWNrID0gW107XG5jbGFzcyBTY29wZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGRyYWdnYWJsZXMsIHRyYXlzLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICBzY29wZXMuZm9yRWFjaChzY29wZSA9PiB7XG4gICAgICBpZiAoZHJhZ2dhYmxlcykge1xuICAgICAgICBkcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHNjb3BlLnJlbGVhc2VEcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gICAgICB9XG4gICAgICBpZiAodHJheXMpIHtcbiAgICAgICAgdHJheXMuZm9yRWFjaCh0cmF5ID0+IHNjb3BlLnJlbGVhc2VUcmF5KHRyYXkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBkcmFnZ2FibGVzIHx8IFtdO1xuICAgIHRoaXMudHJheXMgPSB0cmF5cyB8fCBbXTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlcyA9IG5ldyBNYXAoKTtcbiAgICBzY29wZXMucHVzaCh0aGlzKTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICB0aW1lRW5kOiBvcHRpb25zLnRpbWVFbmQgfHwgNDAwXG4gICAgfTtcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBpbml0KCkge1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB0aGlzLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gIH1cbiAgYWRkRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIHNjb3Blcy5mb3JFYWNoKHNjb3BlID0+IHNjb3BlLnJlbGVhc2VEcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gICAgdGhpcy5kcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcbiAgICB0aGlzLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKTtcbiAgfVxuICBpbml0RHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVzLnNldChkcmFnZ2FibGUsIGRyYWdnYWJsZS5vbignZHJhZzpyZWxlYXNlJywgZXZlbnQgPT4ge1xuICAgICAgaWYgKCFldmVudC5jYW5jZWxlZCAmJiB0aGlzLm9uUmVsZWFzZShkcmFnZ2FibGUpKSB7XG4gICAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuICByZWxlYXNlRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVzLmdldChkcmFnZ2FibGUpPy4oKTtcbiAgICB0aGlzLnVuc3Vic2NyaWJlcy5kZWxldGUoZHJhZ2dhYmxlKTtcbiAgICByZW1vdmVJdGVtKHRoaXMuZHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcbiAgfVxuICBhZGRUcmF5KHRyYXkpIHtcbiAgICBzY29wZXMuZm9yRWFjaChzY29wZSA9PiBzY29wZS5yZWxlYXNlVHJheSh0cmF5KSk7XG4gICAgdGhpcy50cmF5cy5wdXNoKHRyYXkpO1xuICB9XG4gIHJlbGVhc2VUcmF5KHRyYXkpIHtcbiAgICByZW1vdmVJdGVtKHRoaXMudHJheXMsIHRyYXkpO1xuICB9XG4gIG9uUmVsZWFzZShkcmFnZ2FibGUpIHtcbiAgICBpZiAoIWRyYWdnYWJsZS50cmF5cy5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBjb25zdCBzaG90VHJheXMgPSB0aGlzLnRyYXlzLmZpbHRlcih0cmF5ID0+IHtcbiAgICAgIHJldHVybiB0cmF5LmRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMTtcbiAgICB9KS5maWx0ZXIodHJheSA9PiB7XG4gICAgICByZXR1cm4gdHJheS5jYXRjaERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIH0pLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIHJldHVybiBhLmdldFJlY3RhbmdsZSgpLmdldFNxdWFyZSgpIC0gYi5nZXRSZWN0YW5nbGUoKS5nZXRTcXVhcmUoKTtcbiAgICB9KTtcbiAgICBjb25zdCBpc0FjY2VwdGVkID0gc2hvdFRyYXlzLmxlbmd0aCA+IDAgJiYgc2hvdFRyYXlzWzBdLmRyb3AoZHJhZ2dhYmxlKTtcbiAgICBpZiAoIWlzQWNjZXB0ZWQpIHtcbiAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uLCB7XG4gICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMudGltZUVuZFxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuZW1pdCgnc2NvcGU6Y2hhbmdlJywge1xuICAgICAgc2NvcGU6IHRoaXMsXG4gICAgICBkcmFnZ2FibGVcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXNldCgpIHtcbiAgICB0aGlzLnRyYXlzLmZvckVhY2godHJheSA9PiB0cmF5LnJlc2V0KCkpO1xuICB9XG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5yZWZyZXNoKCkpO1xuICAgIHRoaXMudHJheXMuZm9yRWFjaCh0cmF5ID0+IHRyYXkucmVmcmVzaCgpKTtcbiAgfVxuICBnZXQgcG9zaXRpb25zKCkge1xuICAgIHJldHVybiB0aGlzLnRyYXlzLm1hcCh0cmF5ID0+IHtcbiAgICAgIHJldHVybiB0cmF5LmlubmVyRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IHRoaXMuZHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSkpO1xuICAgIH0pO1xuICB9XG4gIHNldCBwb3NpdGlvbnMocG9zaXRpb25zKSB7XG4gICAgaWYgKHBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMudHJheXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnRyYXlzLmZvckVhY2godHJheSA9PiB0cmF5LnJlc2V0KCkpO1xuICAgICAgcG9zaXRpb25zLmZvckVhY2goKHRyYXlJbmRleGVzLCBpKSA9PiB7XG4gICAgICAgIHRyYXlJbmRleGVzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgICAgIHRoaXMudHJheXNbaV0uYWRkKHRoaXMuZHJhZ2dhYmxlc1tpbmRleF0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihgRXhwZWN0ZWQgJHt0aGlzLnRyYXlzLmxlbmd0aH0gcG9zaXRpb25zLCBnb3QgJHtwb3NpdGlvbnMubGVuZ3RofWApO1xuICAgIH1cbiAgfVxufVxuY29uc3QgZGVmYXVsdFNjb3BlID0gbmV3IFNjb3BlKCk7XG5mdW5jdGlvbiBjdXJyZW50U2NvcGUoKSB7XG4gIHJldHVybiBzY29wZVN0YWNrW3Njb3BlU3RhY2subGVuZ3RoIC0gMV0gfHwgZGVmYXVsdFNjb3BlO1xufVxuZnVuY3Rpb24gc2NvcGUoZm4pIHtcbiAgY29uc3QgY3VycmVudFNjb3BlID0gbmV3IFNjb3BlKCk7XG4gIHNjb3BlU3RhY2sucHVzaChjdXJyZW50U2NvcGUpO1xuICB0cnkge1xuICAgIGZuLmNhbGwoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBzY29wZVN0YWNrLnBvcCgpO1xuICB9XG4gIHJldHVybiBjdXJyZW50U2NvcGU7XG59XG5cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcbiAgbGV0IGxhc3RUaW1lID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uIGV4ZWN1dGVkRnVuY3Rpb24oKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHRoaXM7XG4gICAgY29uc3QgYXJncyA9IGFyZ3VtZW50cztcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGlmIChub3cgLSBsYXN0VGltZSA+PSB3YWl0KSB7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgbGFzdFRpbWUgPSBub3c7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRQYXJlbnRzQ2hhaW4oY2hpbGRFbGVtZW50LCByb290RWxlbWVudCkge1xuICBjb25zdCBjaGFpbiA9IFtdO1xuICBsZXQgZWxlbWVudCA9IGNoaWxkRWxlbWVudDtcbiAgd2hpbGUgKGVsZW1lbnQucGFyZW50Tm9kZSAmJiBlbGVtZW50ICE9PSByb290RWxlbWVudCkge1xuICAgIGNoYWluLnVuc2hpZnQoZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBjaGFpbjtcbn1cblxuY29uc3QgdGhyb3R0bGVkRHJhZ092ZXIgPSAoY2FsbGJhY2ssIGR1cmF0aW9uKSA9PiB7XG4gIGNvbnN0IHRocm90dGxlZENhbGxiYWNrID0gdGhyb3R0bGUoZXZlbnQgPT4gY2FsbGJhY2soZXZlbnQpLCBkdXJhdGlvbik7XG4gIHJldHVybiBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aHJvdHRsZWRDYWxsYmFjayhldmVudCk7XG4gIH07XG59O1xuY29uc3QgZm9ybUZpZWxkU2VsZWN0b3IgPSAnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QsIFtjb250ZW50ZWRpdGFibGVdOm5vdChbY29udGVudGVkaXRhYmxlPVwiZmFsc2VcIl0pJztcbmNvbnN0IGlzVG91Y2ggPSBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuY29uc3QgbW91c2VFdmVudHMgPSB7XG4gIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgbW92ZTogJ21vdXNlbW92ZScsXG4gIGVuZDogJ21vdXNldXAnXG59O1xuY29uc3QgdG91Y2hFdmVudHMgPSB7XG4gIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gIG1vdmU6ICd0b3VjaG1vdmUnLFxuICBlbmQ6ICd0b3VjaGVuZCdcbn07XG5jb25zdCBkcmFnZ2FibGVzID0gW107XG5jb25zdCBzdGFydEV2ZW50cyA9IG5ldyBXZWFrU2V0KCk7XG5jb25zdCB0cmFuc2Zvcm1Qcm9wZXJ0eSA9ICd0cmFuc2Zvcm0nO1xuY29uc3QgdHJhbnNpdGlvblByb3BlcnR5ID0gJ3RyYW5zaXRpb24nO1xuZnVuY3Rpb24gZ2V0VG91Y2hCeUlEKGVsZW1lbnQsIHRvdWNoSWQpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVtZW50LmNoYW5nZWRUb3VjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV0uaWRlbnRpZmllciA9PT0gdG91Y2hJZCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQuY2hhbmdlZFRvdWNoZXNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHByZXZlbnREb3VibGVJbml0KGRyYWdnYWJsZSkge1xuICBpZiAoZHJhZ2dhYmxlcy5zb21lKGV4aXN0aW5nID0+IGRyYWdnYWJsZS5lbGVtZW50ID09PSBleGlzdGluZy5lbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBEcmFnZ2FibGUgYWxyZWFkeSBleGlzdHMgZm9yIHRoaXMgZWxlbWVudCcpO1xuICB9XG4gIGRyYWdnYWJsZXMucHVzaChkcmFnZ2FibGUpO1xufVxuZnVuY3Rpb24gY29weVN0eWxlcyhzb3VyY2UsIGRlc3RpbmF0aW9uKSB7XG4gIGNvbnN0IGNzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoc291cmNlKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGNzW2ldO1xuICAgIGlmIChrZXkuaW5kZXhPZigndHJhbnNpdGlvbicpIDwgMCAmJiBrZXkuaW5kZXhPZigndHJhbnNmb3JtJykgPCAwKSB7XG4gICAgICBkZXN0aW5hdGlvbi5zdHlsZVtrZXldID0gY3Nba2V5XTtcbiAgICB9XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjb3B5U3R5bGVzKHNvdXJjZS5jaGlsZHJlbltpXSwgZGVzdGluYXRpb24uY2hpbGRyZW5baV0pO1xuICB9XG59XG5jbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgICB0aGlzLnRyYXlzID0gW107XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHByZXZlbnREb3VibGVJbml0KHRoaXMpO1xuICAgIGNvbnN0IHNjb3BlID0gb3B0aW9ucy5zY29wZSB8fCBjdXJyZW50U2NvcGUoKTtcbiAgICBzY29wZS5hZGREcmFnZ2FibGUodGhpcyk7XG4gICAgdGhpcy5fZW5hYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0Qm91bmRpbmcoKTtcbiAgICB0aGlzLnN0YXJ0UG9zaXRpb25pbmcoKTtcbiAgICB0aGlzLnN0YXJ0TGlzdGVuaW5nKCk7XG4gIH1cbiAgc3RhcnRCb3VuZGluZygpIHtcbiAgICB0aGlzLmJvdW5kaW5nID0gdGhpcy5vcHRpb25zLmJvdW5kaW5nIHx8IHtcbiAgICAgIGJvdW5kOiB0aGlzLm9wdGlvbnMuYm91bmQgfHwgKHBvaW50ID0+IHBvaW50KVxuICAgIH07XG4gIH1cbiAgc3RhcnRQb3NpdGlvbmluZygpIHtcbiAgICB0aGlzLl9zZXREZWZhdWx0VHJhbnNpdGlvbigpO1xuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5tZWFzdXJlT2Zmc2V0KCk7XG4gICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbiB8fCB0aGlzLm9mZnNldDtcbiAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcbiAgICB0aGlzLnJlZnJlc2goKTtcbiAgfVxuICByZW1lYXN1cmUoKSB7XG4gICAgY29uc3QgaXNBdEluaXRpYWxQb3NpdGlvbiA9IHRoaXMucG9zaXRpb24uY29tcGFyZSh0aGlzLmluaXRpYWxQb3NpdGlvbik7XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLm1lYXN1cmVPZmZzZXQoKTtcbiAgICB0aGlzLmluaXRpYWxQb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbiB8fCB0aGlzLm9mZnNldDtcbiAgICBpZiAoaXNBdEluaXRpYWxQb3NpdGlvbikge1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLmluaXRpYWxQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24odGhpcy5wb3NpdGlvbik7XG4gICAgfVxuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG4gIG1lYXN1cmVPZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb25zaWRlclRyYW5zZm9ybU9mZnNldCA/IFBvaW50LmVsZW1lbnRCb3VuZGluZ09mZnNldCh0aGlzLmVsZW1lbnQsIHRoaXMuY29udGFpbmVyKS5zdWIodGhpcy5fdHJhbnNmb3JtUG9zaXRpb24gfHwgbmV3IFBvaW50KDAsIDApKSA6IFBvaW50LmVsZW1lbnRPZmZzZXQodGhpcy5lbGVtZW50LCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cbiAgc3RhcnRMaXN0ZW5pbmcoKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgc2lnbmFsOiB0aGlzLmxpc3RlbmVycy5zaWduYWxcbiAgICB9O1xuICAgIHRoaXMuaGFuZGxlci5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBldmVudCA9PiB0aGlzLmRyYWdTdGFydChldmVudCksIG9wdGlvbnMpO1xuICAgIHRoaXMuaGFuZGxlci5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLnN0YXJ0LCBldmVudCA9PiB0aGlzLmRyYWdTdGFydChldmVudCksIG9wdGlvbnMpO1xuICB9XG4gIGdldFNpemUoKSB7XG4gICAgcmV0dXJuIFBvaW50LmVsZW1lbnRTaXplKHRoaXMuZWxlbWVudCk7XG4gIH1cbiAgZ2V0UG9zaXRpb24oKSB7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMub2Zmc2V0LmFkZCh0aGlzLl90cmFuc2Zvcm1Qb3NpdGlvbiB8fCBuZXcgUG9pbnQoMCwgMCkpO1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xuICB9XG4gIGdldENlbnRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbi5hZGQodGhpcy5nZXRTaXplKCkubXVsdCgwLjUpKTtcbiAgfVxuICBfc2V0RGVmYXVsdFRyYW5zaXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zaXRpb25Qcm9wZXJ0eV0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnQpW3RyYW5zaXRpb25Qcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIF9zZXRUcmFuc2l0aW9uKHRpbWUpIHtcbiAgICBsZXQgdHJhbnNpdGlvbiA9IHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2l0aW9uUHJvcGVydHldO1xuICAgIGNvbnN0IHRyYW5zaXRpb25Dc3MgPSBgdHJhbnNmb3JtICR7dGltZX1tc2A7XG4gICAgaWYgKCEvdHJhbnNmb3JtXFxzP1xcZCptP3M/Ly50ZXN0KHRyYW5zaXRpb24pKSB7XG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0cmFuc2l0aW9uICs9IGAsICR7dHJhbnNpdGlvbkNzc31gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbiA9IHRyYW5zaXRpb25Dc3M7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb24gPSB0cmFuc2l0aW9uLnJlcGxhY2UoL3RyYW5zZm9ybVxccz9cXGQqbT9zPy9nLCB0cmFuc2l0aW9uQ3NzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2l0aW9uUHJvcGVydHldICE9PSB0cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuc3R5bGVbdHJhbnNpdGlvblByb3BlcnR5XSA9IHRyYW5zaXRpb247XG4gICAgfVxuICB9XG4gIF9zZXRUcmFuc2xhdGUocG9pbnQpIHtcbiAgICB0aGlzLl90cmFuc2Zvcm1Qb3NpdGlvbiA9IHBvaW50O1xuICAgIGNvbnN0IHRyYW5zbGF0ZUNzcyA9IGB0cmFuc2xhdGUzZCgke3BvaW50Lnh9cHgsICR7cG9pbnQueX1weCwgMHB4KWA7XG4gICAgbGV0IHRyYW5zZm9ybSA9IHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV07XG4gICAgaWYgKHRoaXMuc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSAmJiBwb2ludC54ID09PSAwICYmIHBvaW50LnkgPT09IDApIHtcbiAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgJycpO1xuICAgIH0gZWxzZSBpZiAoIS90cmFuc2xhdGUzZFxcKFteKV0rXFwpLy50ZXN0KHRyYW5zZm9ybSkpIHtcbiAgICAgIGlmICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgdHJhbnNmb3JtICs9ICcgJztcbiAgICAgIH1cbiAgICAgIHRyYW5zZm9ybSArPSB0cmFuc2xhdGVDc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybSA9IHRyYW5zZm9ybS5yZXBsYWNlKC90cmFuc2xhdGUzZFxcKFteKV0rXFwpLywgdHJhbnNsYXRlQ3NzKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZWxlbWVudC5zdHlsZVt0cmFuc2Zvcm1Qcm9wZXJ0eV0gIT09IHRyYW5zZm9ybSkge1xuICAgICAgdGhpcy5lbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9IHRyYW5zZm9ybTtcbiAgICB9XG4gIH1cbiAgbW92ZShwb2ludCwge1xuICAgIGR1cmF0aW9uID0gMCxcbiAgICBzaWxlbnQgPSBmYWxzZVxuICB9ID0ge30pIHtcbiAgICBwb2ludCA9IHBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvaW50O1xuICAgIHRoaXMuX3NldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgICBpZiAoIXNpbGVudCkge1xuICAgICAgdGhpcy5lbWl0RHJhZ0V2ZW50KCdtb3ZlJyk7XG4gICAgfVxuICB9XG4gIHBpblBvc2l0aW9uKHBvaW50LCB7XG4gICAgZHVyYXRpb24gPSAwLFxuICAgIHNpbGVudCA9IHRydWVcbiAgfSA9IHt9KSB7XG4gICAgdGhpcy5waW5uZWRQb3NpdGlvbiA9IHBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5tb3ZlKHRoaXMucGlubmVkUG9zaXRpb24sIHtcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgc2lsZW50XG4gICAgfSk7XG4gIH1cbiAgcmVzZXRQb3NpdGlvblRvSW5pdGlhbCgpIHtcbiAgICB0aGlzLnBpblBvc2l0aW9uKHRoaXMuaW5pdGlhbFBvc2l0aW9uKTtcbiAgfVxuICByZWZyZXNoUG9zaXRpb24oKSB7XG4gICAgdGhpcy5zZXRQb3NpdGlvbih0aGlzLmdldFBvc2l0aW9uKCkpO1xuICB9XG4gIHNldFBvc2l0aW9uKHBvaW50KSB7XG4gICAgcG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICB0aGlzLl9zZXRUcmFuc2l0aW9uKDApO1xuICAgIHRoaXMuX3NldFRyYW5zbGF0ZShwb2ludC5zdWIodGhpcy5vZmZzZXQpKTtcbiAgfVxuICBkZXRlcm1pbmVEaXJlY3Rpb24ocG9pbnQpIHtcbiAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uIHx8PSB0aGlzLl9zdGFydFBvc2l0aW9uO1xuICAgIHRoaXMubGVmdERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueCA+IHBvaW50Lng7XG4gICAgdGhpcy5yaWdodERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueCA8IHBvaW50Lng7XG4gICAgdGhpcy51cERpcmVjdGlvbiA9IHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24ueSA+IHBvaW50Lnk7XG4gICAgdGhpcy5kb3duRGlyZWN0aW9uID0gdGhpcy5fcHJldmlvdXNEaXJlY3Rpb25Qb3NpdGlvbi55IDwgcG9pbnQueTtcbiAgICB0aGlzLl9wcmV2aW91c0RpcmVjdGlvblBvc2l0aW9uID0gcG9pbnQ7XG4gIH1cbiAgaXNGb3JtRmllbGQodGFyZ2V0KSB7XG4gICAgY29uc3QgZmllbGQgPSB0YXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuRWxlbWVudCAmJiB0YXJnZXQuY2xvc2VzdChmb3JtRmllbGRTZWxlY3Rvcik7XG4gICAgcmV0dXJuIEJvb2xlYW4oZmllbGQpICYmIHRoaXMuZWxlbWVudC5jb250YWlucyhmaWVsZCk7XG4gIH1cbiAgc2VlbXNTY3JvbGxpbmcoKSB7XG4gICAgcmV0dXJuICtuZXcgRGF0ZSgpIC0gdGhpcy5fc3RhcnRUb3VjaFRpbWVzdGFtcCA8IHRoaXMudG91Y2hEcmFnZ2luZ1RocmVzaG9sZDtcbiAgfVxuICBzaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpIHtcbiAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLm5hdGl2ZURyYWdBbmREcm9wICYmIHRoaXMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMubmF0aXZlRHJhZ0FuZERyb3A7XG4gICAgfVxuICB9XG4gIGRyYWdTdGFydChldmVudCkge1xuICAgIGlmICghdGhpcy5fZW5hYmxlIHx8IHRoaXMuaXNGb3JtRmllbGQoZXZlbnQudGFyZ2V0KSB8fCBzdGFydEV2ZW50cy5oYXMoZXZlbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN0YXJ0RXZlbnRzLmFkZChldmVudCk7XG4gICAgaWYgKHRoaXMuc3RvcFByb3BhZ2F0aW9uT25EcmFnU3RhcnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLmlzVG91Y2hFdmVudCA9IGlzVG91Y2ggJiYgZXZlbnQgaW5zdGFuY2VvZiB3aW5kb3cuVG91Y2hFdmVudDtcbiAgICB0aGlzLnRvdWNoUG9pbnQgPSB0aGlzLl9zdGFydFRvdWNoUG9pbnQgPSBuZXcgUG9pbnQodGhpcy5pc1RvdWNoRXZlbnQgPyBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6IGV2ZW50LmNsaWVudFgsIHRoaXMuaXNUb3VjaEV2ZW50ID8gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgOiBldmVudC5jbGllbnRZKTtcbiAgICB0aGlzLl9zdGFydFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIGlmICh0aGlzLmlzVG91Y2hFdmVudCkge1xuICAgICAgdGhpcy5fdG91Y2hJZCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gICAgICB0aGlzLl9zdGFydFRvdWNoVGltZXN0YW1wID0gK25ldyBEYXRlKCk7XG4gICAgfVxuICAgIHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQgPSB0aGlzLndpbmRvd1Njcm9sbFBvaW50O1xuICAgIHRoaXMuX3N0YXJ0U2Nyb2xsRWxlbWVudHNPZmZzZXQgPSB0aGlzLnNjcm9sbEVsZW1lbnRzT2Zmc2V0O1xuICAgIHRoaXMuZHJhZ0xpc3RlbmVycz8uYWJvcnQoKTtcbiAgICBjb25zdCB7XG4gICAgICBzaWduYWxcbiAgICB9ID0gdGhpcy5kcmFnTGlzdGVuZXJzID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgIHNpZ25hbFxuICAgIH07XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UGVuZGluZyA9ICF0aGlzLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkgJiYgdGhpcy5kcmFnU3RhcnRUaHJlc2hvbGQgPiAwO1xuICAgIGlmICghdGhpcy5fZHJhZ1N0YXJ0UGVuZGluZykge1xuICAgICAgY29uc3Qgc3RhcnRFdmVudCA9IHRoaXMuZW1pdERyYWdFdmVudCgnc3RhcnQnLCB7XG4gICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0YXJ0RXZlbnQuY2FuY2VsZWQgfHwgc2lnbmFsLmFib3J0ZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRVc2VOYXRpdmVEcmFnQW5kRHJvcCgpKSB7XG4gICAgICBpZiAodGhpcy5pc1RvdWNoRXZlbnQgJiYgdGhpcy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoKSB7XG4gICAgICAgIHRoaXMuX3N0YXJ0UGFyZW50c1Njcm9sbE9mZnNldCA9IHRoaXMucGFyZW50c1Njcm9sbE9mZnNldDtcbiAgICAgICAgY29uc3QgZW11bGF0ZU9uRmlyc3RNb3ZlID0gZXZlbnQgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnNlZW1zU2Nyb2xsaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsRHJhZ2dpbmcoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3AoZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjYW5jZWxFbXVsYXRpb24oKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2FuY2VsRW11bGF0aW9uID0gKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgZW11bGF0ZU9uRmlyc3RNb3ZlKTtcbiAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgY2FuY2VsRW11bGF0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBlbXVsYXRlT25GaXJzdE1vdmUsIG9wdGlvbnMpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgY2FuY2VsRW11bGF0aW9uLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCBldmVudCA9PiB0aGlzLm5hdGl2ZURyYWdTdGFydChldmVudCksIHtcbiAgICAgICAgICBzaWduYWxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgZXZlbnQgPT4gdGhpcy5uYXRpdmVEcmFnRW5kKGV2ZW50KSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdNb3ZlID0gZXZlbnQgPT4gdGhpcy5kcmFnTW92ZShldmVudCk7XG4gICAgICBjb25zdCBkcmFnRW5kID0gZXZlbnQgPT4gdGhpcy5kcmFnRW5kKGV2ZW50KTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgZHJhZ01vdmUsIG9wdGlvbnMpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtb3VzZUV2ZW50cy5tb3ZlLCBkcmFnTW92ZSwgb3B0aW9ucyk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgZHJhZ0VuZCwgb3B0aW9ucyk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1vdXNlRXZlbnRzLmVuZCwgZHJhZ0VuZCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNvbnN0IG9uU2Nyb2xsID0gZXZlbnQgPT4gdGhpcy5vblNjcm9sbChldmVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7XG4gICAgICBzaWduYWxcbiAgICB9KTtcbiAgICB0aGlzLnNjcm9sbEVsZW1lbnRzLmZvckVhY2gocCA9PiBwLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7XG4gICAgICBzaWduYWxcbiAgICB9KSk7XG4gIH1cbiAgZHJhZ01vdmUoZXZlbnQpIHtcbiAgICBsZXQgdG91Y2g7XG4gICAgdGhpcy5pc1RvdWNoRXZlbnQgPSBpc1RvdWNoICYmIGV2ZW50IGluc3RhbmNlb2Ygd2luZG93LlRvdWNoRXZlbnQ7XG4gICAgaWYgKHRoaXMuaXNUb3VjaEV2ZW50KSB7XG4gICAgICB0b3VjaCA9IGdldFRvdWNoQnlJRChldmVudCwgdGhpcy5fdG91Y2hJZCk7XG4gICAgICBpZiAoIXRvdWNoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnNlZW1zU2Nyb2xsaW5nKCkpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG91Y2hQb2ludCA9IG5ldyBQb2ludCh0aGlzLmlzVG91Y2hFdmVudCA/IHRvdWNoLnBhZ2VYIDogZXZlbnQuY2xpZW50WCwgdGhpcy5pc1RvdWNoRXZlbnQgPyB0b3VjaC5wYWdlWSA6IGV2ZW50LmNsaWVudFkpO1xuICAgIGlmICh0aGlzLl9kcmFnU3RhcnRQZW5kaW5nKSB7XG4gICAgICBjb25zdCBkeCA9IHRoaXMudG91Y2hQb2ludC54IC0gdGhpcy5fc3RhcnRUb3VjaFBvaW50Lng7XG4gICAgICBjb25zdCBkeSA9IHRoaXMudG91Y2hQb2ludC55IC0gdGhpcy5fc3RhcnRUb3VjaFBvaW50Lnk7XG4gICAgICBpZiAoTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KSA8IHRoaXMuZHJhZ1N0YXJ0VGhyZXNob2xkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RyYWdTdGFydFBlbmRpbmcgPSBmYWxzZTtcbiAgICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSB0aGlzLmVtaXREcmFnRXZlbnQoJ3N0YXJ0Jywge1xuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIGlmIChzdGFydEV2ZW50LmNhbmNlbGVkIHx8IHRoaXMuZHJhZ0xpc3RlbmVycy5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgICB0aGlzLmNhbmNlbERyYWdnaW5nKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBwb2ludCA9IHRoaXMuX3N0YXJ0UG9zaXRpb24uYWRkKHRoaXMudG91Y2hQb2ludC5zdWIodGhpcy5fc3RhcnRUb3VjaFBvaW50KSkuYWRkKHRoaXMud2luZG93U2Nyb2xsUG9pbnQuc3ViKHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQpKS5hZGQodGhpcy5zY3JvbGxFbGVtZW50c09mZnNldC5zdWIodGhpcy5fc3RhcnRTY3JvbGxFbGVtZW50c09mZnNldCkpO1xuICAgIHBvaW50ID0gdGhpcy5ib3VuZGluZy5ib3VuZChwb2ludCwgdGhpcy5nZXRTaXplKCkpO1xuICAgIHRoaXMuZGV0ZXJtaW5lRGlyZWN0aW9uKHBvaW50KTtcbiAgICB0aGlzLm1vdmUocG9pbnQpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtYWN0aXZlJyk7XG4gIH1cbiAgZHJhZ0VuZChldmVudCkge1xuICAgIHRoaXMuaXNUb3VjaEV2ZW50ID0gaXNUb3VjaCAmJiBldmVudCBpbnN0YW5jZW9mIHdpbmRvdy5Ub3VjaEV2ZW50O1xuICAgIGlmICh0aGlzLmlzVG91Y2hFdmVudCAmJiAhZ2V0VG91Y2hCeUlEKGV2ZW50LCB0aGlzLl90b3VjaElkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fZHJhZ1N0YXJ0UGVuZGluZykge1xuICAgICAgLy8gdGhyZXNob2xkIG5ldmVyIGNyb3NzZWQg4oCUIHRyZWF0IGFzIGNsaWNrLCBjbGVhbiB1cCBzaWxlbnRseVxuICAgICAgdGhpcy5fZHJhZ1N0YXJ0UGVuZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0RyYWdnaW5nKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIHRoaXMucmVsZWFzZSgpO1xuICAgIHRoaXMuZW1pdERyYWdFdmVudCgnZW5kJyk7XG4gICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1hY3RpdmUnKSk7XG4gIH1cbiAgb25TY3JvbGwoX2V2ZW50KSB7XG4gICAgbGV0IHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkpLmFkZCh0aGlzLnNjcm9sbEVsZW1lbnRzT2Zmc2V0LnN1Yih0aGlzLl9zdGFydFNjcm9sbEVsZW1lbnRzT2Zmc2V0KSk7XG4gICAgcG9pbnQgPSB0aGlzLmJvdW5kaW5nLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG4gICAgaWYgKCF0aGlzLm5hdGl2ZURyYWdBbmREcm9wKSB7XG4gICAgICB0aGlzLmRldGVybWluZURpcmVjdGlvbihwb2ludCk7XG4gICAgICB0aGlzLm1vdmUocG9pbnQpO1xuICAgIH1cbiAgfVxuICBuYXRpdmVEcmFnU3RhcnQoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdGaXJlRm94IGZpeCcpO1xuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xuICAgIGNvbnN0IHtcbiAgICAgIHNpZ25hbFxuICAgIH0gPSB0aGlzLmRyYWdMaXN0ZW5lcnM7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aHJvdHRsZWREcmFnT3ZlcihldmVudCA9PiB0aGlzLm5hdGl2ZURyYWdPdmVyKGV2ZW50KSwgdGhpcy5kcmFnT3ZlclRocm90dGxlRHVyYXRpb24pLCB7XG4gICAgICBzaWduYWxcbiAgICB9KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgZXZlbnQgPT4gdGhpcy5uYXRpdmVEcmFnRW5kKGV2ZW50KSwge1xuICAgICAgc2lnbmFsXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGV2ZW50ID0+IHRoaXMubmF0aXZlRHJvcChldmVudCksIHtcbiAgICAgIHNpZ25hbFxuICAgIH0pO1xuICB9XG4gIG5hdGl2ZURyYWdPdmVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdtb3ZlJztcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2VlLXBsYWNlaG9sZGVyJyk7XG4gICAgaWYgKGV2ZW50LmNsaWVudFggPT09IDAgJiYgZXZlbnQuY2xpZW50WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnRvdWNoUG9pbnQgPSBuZXcgUG9pbnQoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgbGV0IHBvaW50ID0gdGhpcy5fc3RhcnRQb3NpdGlvbi5hZGQodGhpcy50b3VjaFBvaW50LnN1Yih0aGlzLl9zdGFydFRvdWNoUG9pbnQpKS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludC5zdWIodGhpcy5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCkpLmFkZCh0aGlzLnNjcm9sbEVsZW1lbnRzT2Zmc2V0LnN1Yih0aGlzLl9zdGFydFNjcm9sbEVsZW1lbnRzT2Zmc2V0KSk7XG4gICAgcG9pbnQgPSB0aGlzLmJvdW5kaW5nLmJvdW5kKHBvaW50LCB0aGlzLmdldFNpemUoKSk7XG4gICAgdGhpcy5kZXRlcm1pbmVEaXJlY3Rpb24ocG9pbnQpO1xuICAgIHRoaXMucG9zaXRpb24gPSBwb2ludDtcbiAgICB0aGlzLmVtaXREcmFnRXZlbnQoJ21vdmUnKTtcbiAgfVxuICBuYXRpdmVEcmFnRW5kKF9ldmVudCkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICB0aGlzLnJlbGVhc2UoKTtcbiAgICB0aGlzLmVtaXREcmFnRXZlbnQoJ2VuZCcpO1xuICAgIHRoaXMuZHJhZ0xpc3RlbmVycy5hYm9ydCgpO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZWUtYWN0aXZlJyk7XG4gIH1cbiAgbmF0aXZlRHJvcChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgY2FuY2VsRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5kcmFnTGlzdGVuZXJzPy5hYm9ydCgpO1xuICAgIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAgIHRoaXMuX3ByZXZpb3VzRGlyZWN0aW9uUG9zaXRpb24gPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RyYWdnYWJsZScpO1xuICB9XG4gIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbikge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY29weVN0eWxlcykge1xuICAgICAgdGhpcy5vcHRpb25zLmNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvcHlTdHlsZXMoc291cmNlLCBkZXN0aW5hdGlvbik7XG4gICAgfVxuICB9XG4gIGVtdWxhdGVOYXRpdmVEcmFnQW5kRHJvcChldmVudCkge1xuICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSB0aGlzLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjbG9uZWRFbGVtZW50ID0gdGhpcy5lbGVtZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICBjbG9uZWRFbGVtZW50LnN0eWxlW3RyYW5zZm9ybVByb3BlcnR5XSA9ICcnO1xuICAgIHRoaXMuY29weVN0eWxlcyh0aGlzLmVsZW1lbnQsIGNsb25lZEVsZW1lbnQpO1xuICAgIGNsb25lZEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZHJhZ2VlLW5hdGl2ZS1lbXVsYXRpb24nKTtcbiAgICBjbG9uZWRFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb25lZEVsZW1lbnQpO1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICBjb25zdCBlbXVsYXRpb25EcmFnZ2FibGUgPSBuZXcgRHJhZ2dhYmxlKGNsb25lZEVsZW1lbnQsIHtcbiAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQuYm9keSxcbiAgICAgIHRvdWNoRHJhZ2dpbmdUaHJlc2hvbGQ6IDAsXG4gICAgICBkb21FdmVudHM6IGZhbHNlLFxuICAgICAgYm91bmQocG9pbnQpIHtcbiAgICAgICAgcmV0dXJuIHBvaW50O1xuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgICAgICAgIHRoaXMucG9zaXRpb24gPSBlbXVsYXRpb25EcmFnZ2FibGUucG9zaXRpb24uc3ViKGNvbnRhaW5lclJlY3RQb2ludCkuc3ViKHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQpLmFkZCh0aGlzLl9zdGFydFBhcmVudHNTY3JvbGxPZmZzZXQpO1xuICAgICAgICAgIHRoaXMuZGV0ZXJtaW5lRGlyZWN0aW9uKHRoaXMucG9zaXRpb24pO1xuICAgICAgICAgIHRoaXMuZW1pdERyYWdFdmVudCgnbW92ZScpO1xuICAgICAgICB9LFxuICAgICAgICAnZHJhZzplbmQnOiAoKSA9PiB7XG4gICAgICAgICAgZW11bGF0aW9uRHJhZ2dhYmxlLmRlc3Ryb3koKTtcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGNsb25lZEVsZW1lbnQpO1xuICAgICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnZWUtcGxhY2Vob2xkZXInKTtcbiAgICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZ2VlLWFjdGl2ZScpO1xuICAgICAgICAgIHRoaXMucmVsZWFzZSgpO1xuICAgICAgICAgIHRoaXMuZW1pdERyYWdFdmVudCgnZW5kJyk7XG4gICAgICAgICAgdGhpcy5jYW5jZWxEcmFnZ2luZygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3QgY29udGFpbmVyUmVjdFBvaW50ID0gbmV3IFBvaW50KGNvbnRhaW5lclJlY3QubGVmdCwgY29udGFpbmVyUmVjdC50b3ApO1xuICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5fc3RhcnRXaW5kb3dTY3JvbGxQb2ludCA9IHRoaXMuX3N0YXJ0V2luZG93U2Nyb2xsUG9pbnQ7XG4gICAgZW11bGF0aW9uRHJhZ2dhYmxlLm1vdmUodGhpcy5waW5uZWRQb3NpdGlvbi5hZGQoY29udGFpbmVyUmVjdFBvaW50KS5hZGQodGhpcy53aW5kb3dTY3JvbGxQb2ludCkuc3ViKHRoaXMucGFyZW50c1Njcm9sbE9mZnNldCkpO1xuICAgIGVtdWxhdGlvbkRyYWdnYWJsZS5kcmFnU3RhcnQoZXZlbnQpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgZW1pdERyYWdFdmVudCh0eXBlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdFdpdGhEb21FdmVudCh0aGlzLmVsZW1lbnQsIGBkcmFnOiR7dHlwZX1gLCBgZHJhZ2VlOiR7dHlwZX1gLCB7XG4gICAgICBkcmFnZ2FibGU6IHRoaXNcbiAgICB9LCBvcHRpb25zKTtcbiAgfVxuICByZWxlYXNlKCkge1xuICAgIGNvbnN0IHJlbGVhc2VFdmVudCA9IHRoaXMuZW1pdERyYWdFdmVudCgncmVsZWFzZScsIHtcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAoIXJlbGVhc2VFdmVudC5jYW5jZWxlZCkge1xuICAgICAgdGhpcy5waW5Qb3NpdGlvbih0aGlzLnBvc2l0aW9uKTtcbiAgICB9XG4gIH1cbiAgZ2V0UmVjdGFuZ2xlKCkge1xuICAgIHJldHVybiBuZXcgUmVjdGFuZ2xlKHRoaXMucG9zaXRpb24sIHRoaXMuZ2V0U2l6ZSgpKTtcbiAgfVxuICByZWZyZXNoKCkge1xuICAgIGlmICh0aGlzLmJvdW5kaW5nLnJlZnJlc2gpIHtcbiAgICAgIHRoaXMuYm91bmRpbmcucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuICBkZXN0cm95KCkge1xuICAgIHRoaXMubGlzdGVuZXJzLmFib3J0KCk7XG4gICAgdGhpcy5kcmFnTGlzdGVuZXJzPy5hYm9ydCgpO1xuICAgIHNjb3Blcy5mb3JFYWNoKHNjb3BlID0+IHNjb3BlLnJlbGVhc2VEcmFnZ2FibGUodGhpcykpO1xuICAgIHRoaXMudHJheXMuc2xpY2UoKS5mb3JFYWNoKHRyYXkgPT4gdHJheS5yZWxlYXNlRHJhZ2dhYmxlKHRoaXMpKTtcbiAgICBjb25zdCBpbmRleCA9IGRyYWdnYWJsZXMuaW5kZXhPZih0aGlzKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgZHJhZ2dhYmxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuICBnZXQgY29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMucGFyZW50IHx8IHRoaXMuZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbiAgZ2V0IGhhbmRsZXIoKSB7XG4gICAgaWYgKCF0aGlzLl9oYW5kbGVyKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5oYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9oYW5kbGVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmhhbmRsZXIpIHx8IHRoaXMuZWxlbWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2hhbmRsZXIgPSB0aGlzLm9wdGlvbnMuaGFuZGxlciB8fCB0aGlzLmVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9oYW5kbGVyO1xuICB9XG4gIGdldCBzdG9wUHJvcGFnYXRpb25PbkRyYWdTdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnN0b3BQcm9wYWdhdGlvbk9uRHJhZ1N0YXJ0IHx8IGZhbHNlO1xuICB9XG4gIGdldCBuYXRpdmVEcmFnQW5kRHJvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm5hdGl2ZURyYWdBbmREcm9wIHx8IGZhbHNlO1xuICB9XG4gIGdldCBlbXVsYXRlTmF0aXZlRHJhZ0FuZERyb3BPblRvdWNoKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW11bGF0ZU5hdGl2ZURyYWdBbmREcm9wT25Ub3VjaCB8fCBmYWxzZTtcbiAgfVxuICBnZXQgc2hvdWxkUmVtb3ZlWmVyb1RyYW5zbGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLnNob3VsZFJlbW92ZVplcm9UcmFuc2xhdGUgfHwgZmFsc2U7XG4gIH1cbiAgZ2V0IHRvdWNoRHJhZ2dpbmdUaHJlc2hvbGQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy50b3VjaERyYWdnaW5nVGhyZXNob2xkIHx8IDA7XG4gIH1cbiAgZ2V0IGRyYWdTdGFydFRocmVzaG9sZCgpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmRyYWdTdGFydFRocmVzaG9sZCB8fCAwO1xuICB9XG4gIGdldCBkcmFnT3ZlclRocm90dGxlRHVyYXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kcmFnT3ZlclRocm90dGxlRHVyYXRpb24gfHwgMTY7XG4gIH1cbiAgZ2V0IGlzQ29uc2lkZXJUcmFuc2Zvcm1PZmZzZXQoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5jb25zaWRlclRyYW5zZm9ybU9mZnNldCB8fCBmYWxzZTtcbiAgfVxuICBnZXQgd2luZG93U2Nyb2xsUG9pbnQoKSB7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkpO1xuICB9XG4gIGdldCBzY3JvbGxSb290Q29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc2Nyb2xsUm9vdENvbnRhaW5lciB8fCB0aGlzLmNvbnRhaW5lcjtcbiAgfVxuICBnZXQgc2Nyb2xsRWxlbWVudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlZFNjcm9sbEVsZW1lbnRzID8gdGhpcy5fY2FjaGVkU2Nyb2xsRWxlbWVudHMgOiB0aGlzLl9jYWNoZWRTY3JvbGxFbGVtZW50cyA9IGdldFBhcmVudHNDaGFpbih0aGlzLmVsZW1lbnQsIHRoaXMuc2Nyb2xsUm9vdENvbnRhaW5lcik7XG4gIH1cbiAgZ2V0IHNjcm9sbEVsZW1lbnRzT2Zmc2V0KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5zY3JvbGxFbGVtZW50cy5yZWR1Y2UoKHN1bSwgcCkgPT4gc3VtICsgcC5zY3JvbGxMZWZ0LCAwKSwgdGhpcy5zY3JvbGxFbGVtZW50cy5yZWR1Y2UoKHN1bSwgcCkgPT4gc3VtICsgcC5zY3JvbGxUb3AsIDApKTtcbiAgfVxuICBnZXQgcGFyZW50cygpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FjaGVkUGFyZW50cyA/IHRoaXMuX2NhY2hlZFBhcmVudHMgOiB0aGlzLl9jYWNoZWRQYXJlbnRzID0gZ2V0UGFyZW50c0NoYWluKHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIpO1xuICB9XG4gIGdldCBwYXJlbnRzU2Nyb2xsT2Zmc2V0KCkge1xuICAgIHJldHVybiBuZXcgUG9pbnQodGhpcy5wYXJlbnRzLnJlZHVjZSgoc3VtLCBwKSA9PiBzdW0gKyBwLnNjcm9sbExlZnQsIDApLCB0aGlzLnBhcmVudHMucmVkdWNlKChzdW0sIHApID0+IHN1bSArIHAuc2Nyb2xsVG9wLCAwKSk7XG4gIH1cbiAgZ2V0IGVuYWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZW5hYmxlO1xuICB9XG4gIHNldCBlbmFibGUoZW5hYmxlKSB7XG4gICAgaWYgKGVuYWJsZSkge1xuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWdlZS1kaXNhYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkcmFnZWUtZGlzYWJsZScpO1xuICAgIH1cbiAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24gZXhlY3V0ZWRGdW5jdGlvbigpIHtcbiAgICBjb25zdCBjb250ZXh0ID0gdGhpcztcbiAgICBjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGNvbnN0IGxhdGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgIH07XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyKSB7XG4gIGNvbnN0IGR4ID0gcDEueCAtIHAyLngsXG4gICAgZHkgPSBwMS55IC0gcDIueTtcbiAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG59XG5mdW5jdGlvbiBnZXRYRGlmZmVyZW5jZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguYWJzKHAxLnggLSBwMi54KTtcbn1cbmZ1bmN0aW9uIGdldFlEaWZmZXJlbmNlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5hYnMocDEueSAtIHAyLnkpO1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtZWRTcGFjZURpc3RhbmNlRmFjdG9yeShvcHRpb25zKSB7XG4gIHJldHVybiAocDEsIHAyKSA9PiB7XG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyhvcHRpb25zLnggKiBNYXRoLmFicyhwMS54IC0gcDIueCksIDIpICsgTWF0aC5wb3cob3B0aW9ucy55ICogTWF0aC5hYnMocDEueSAtIHAyLnkpLCAyKSk7XG4gIH07XG59XG5mdW5jdGlvbiBpbmRleE9mTmVhcmVzdFBvaW50KGFyciwgdmFsLCByYWRpdXMsIGdldERpc3RhbmNlRnVuYyA9IGdldERpc3RhbmNlKSB7XG4gIGxldCBzaXplLFxuICAgIGluZGV4ID0gMCxcbiAgICBpLFxuICAgIHRlbXA7XG4gIGlmIChhcnIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHNpemUgPSBnZXREaXN0YW5jZUZ1bmMoYXJyWzBdLCB2YWwpO1xuICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgdGVtcCA9IGdldERpc3RhbmNlRnVuYyhhcnJbaV0sIHZhbCk7XG4gICAgaWYgKHRlbXAgPCBzaXplKSB7XG4gICAgICBzaXplID0gdGVtcDtcbiAgICAgIGluZGV4ID0gaTtcbiAgICB9XG4gIH1cbiAgaWYgKHJhZGl1cyA+PSAwICYmIHNpemUgPiByYWRpdXMpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5jbGFzcyBMaXN0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZHJhZ2dhYmxlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB0aW1lRW5kOiAyMDAsXG4gICAgICB0aW1lRXhjaGFuZ2U6IDQwMCxcbiAgICAgIHJhZGl1czogMzBcbiAgICB9LCBvcHRpb25zKTtcbiAgICB0aGlzLmNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyO1xuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IGRyYWdnYWJsZXM7XG4gICAgdGhpcy5jaGFuZ2VkRHVyaW5nSXRlcmF0aW9uID0gZmFsc2U7XG4gICAgdGhpcy5jb250cm9sbGVycyA9IG5ldyBNYXAoKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGRlYm91bmNlKHRoaXMub25SZXNpemUuYmluZCh0aGlzKSwgMTAwKSk7XG4gICAgaWYgKHRoaXMuY29udGFpbmVyKSB7XG4gICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuICBvblJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnJlb3JkZXJPbkNoYW5nZSkgdGhpcy5yZXNldCgpO1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB7XG4gICAgICBpZiAoIWRyYWdnYWJsZS5pc0RyYWdnaW5nKSB7XG4gICAgICAgIGRyYWdnYWJsZS5zdGFydFBvc2l0aW9uaW5nKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICB0aGlzLl9lbmFibGUgPSB0cnVlO1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB0aGlzLmluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKSk7XG4gIH1cbiAgaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICBkcmFnZ2FibGUuZW5hYmxlID0gdGhpcy5fZW5hYmxlO1xuICAgIHRoaXMubGlzdGVuVG8oZHJhZ2dhYmxlLCAnZHJhZzptb3ZlJywgKCkgPT4gdGhpcy5vbk1vdmUoZHJhZ2dhYmxlKSk7XG4gICAgdGhpcy5saXN0ZW5UbyhkcmFnZ2FibGUsICdkcmFnOnJlbGVhc2UnLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQuY2FuY2VsZWQpIHJldHVybjtcbiAgICAgIGV2ZW50LmNhbmNlbCgpO1xuICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiwge1xuICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLnRpbWVFbmRcbiAgICAgIH0pO1xuICAgICAgdGhpcy5vblJlbGVhc2UoZHJhZ2dhYmxlKTtcbiAgICB9KTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUoZHJhZ2dhYmxlLmVsZW1lbnQpO1xuICB9XG4gIGxpc3RlblRvKGRyYWdnYWJsZSwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgZHJhZ2dhYmxlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCB7XG4gICAgICBzaWduYWw6IHRoaXMuc2lnbmFsRm9yKGRyYWdnYWJsZSlcbiAgICB9KTtcbiAgfVxuICBzaWduYWxGb3IoZHJhZ2dhYmxlKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRyb2xsZXJzLmhhcyhkcmFnZ2FibGUpKSB7XG4gICAgICB0aGlzLmNvbnRyb2xsZXJzLnNldChkcmFnZ2FibGUsIG5ldyBBYm9ydENvbnRyb2xsZXIoKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnRyb2xsZXJzLmdldChkcmFnZ2FibGUpLnNpZ25hbDtcbiAgfVxuICByZWxlYXNlRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIudW5vYnNlcnZlKGRyYWdnYWJsZS5lbGVtZW50KTtcbiAgICB0aGlzLmNvbnRyb2xsZXJzLmdldChkcmFnZ2FibGUpPy5hYm9ydCgpO1xuICAgIHRoaXMuY29udHJvbGxlcnMuZGVsZXRlKGRyYWdnYWJsZSk7XG4gICAgcmVtb3ZlSXRlbSh0aGlzLmRyYWdnYWJsZXMsIGRyYWdnYWJsZSk7XG4gIH1cbiAgb25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLnN3YXBwaW5nRGlzYWJsZWQpIHJldHVybjtcbiAgICBjb25zdCBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgY29uc3QgcGlubmVkUG9zaXRpb25zID0gc29ydGVkRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbik7XG4gICAgY29uc3QgY3VycmVudEluZGV4ID0gc29ydGVkRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG4gICAgY29uc3QgdGFyZ2V0SW5kZXggPSBpbmRleE9mTmVhcmVzdFBvaW50KHBpbm5lZFBvc2l0aW9ucywgZHJhZ2dhYmxlLnBvc2l0aW9uLCB0aGlzLm9wdGlvbnMucmFkaXVzLCB0aGlzLmRpc3RhbmNlRnVuYyk7XG4gICAgaWYgKHRhcmdldEluZGV4ICE9PSAtMSAmJiBjdXJyZW50SW5kZXggIT09IHRhcmdldEluZGV4KSB7XG4gICAgICBpZiAodGFyZ2V0SW5kZXggPCBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRhcmdldEluZGV4OyBpIDwgY3VycmVudEluZGV4OyBpKyspIHtcbiAgICAgICAgICBzb3J0ZWREcmFnZ2FibGVzW2ldLnBpblBvc2l0aW9uKHBpbm5lZFBvc2l0aW9uc1tpICsgMV0sIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMudGltZUV4Y2hhbmdlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBjdXJyZW50SW5kZXg7IGkgPCB0YXJnZXRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgc29ydGVkRHJhZ2dhYmxlc1tpICsgMV0ucGluUG9zaXRpb24ocGlubmVkUG9zaXRpb25zW2ldLCB7XG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5vcHRpb25zLnRpbWVFeGNoYW5nZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZHJhZ2dhYmxlLm5hdGl2ZURyYWdBbmREcm9wKSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihwaW5uZWRQb3NpdGlvbnNbdGFyZ2V0SW5kZXhdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IHBpbm5lZFBvc2l0aW9uc1t0YXJnZXRJbmRleF07XG4gICAgICB9XG4gICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgIH1cbiAgfVxuICBvblJlbGVhc2UoZHJhZ2dhYmxlKSB7XG4gICAgaWYgKHRoaXMuY2hhbmdlZER1cmluZ0l0ZXJhdGlvbikge1xuICAgICAgdGhpcy5lbWl0TGlzdEV2ZW50KCdjaGFuZ2UnLCBkcmFnZ2FibGUpO1xuICAgICAgdGhpcy5jaGFuZ2VkRHVyaW5nSXRlcmF0aW9uID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJlb3JkZXJPbkNoYW5nZSkge1xuICAgICAgICB0aGlzLnJlb3JkZXJFbGVtZW50cyhkcmFnZ2FibGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZW9yZGVyRWxlbWVudHMobW92ZWREcmFnZ2FibGUpIHtcbiAgICBjb25zdCBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgY29uc3QgaW5kZXggPSBzb3J0ZWREcmFnZ2FibGVzLmluZGV4T2YobW92ZWREcmFnZ2FibGUpO1xuICAgIGNvbnN0IG5leHQgPSBzb3J0ZWREcmFnZ2FibGVzW2luZGV4ICsgMV07XG4gICAgY29uc3QgcHJldmlvdXMgPSBzb3J0ZWREcmFnZ2FibGVzW2luZGV4IC0gMV07XG4gICAgdGhpcy5yZXNldCgpO1xuICAgIGlmIChuZXh0KSB7XG4gICAgICBuZXh0LmVsZW1lbnQuYmVmb3JlKG1vdmVkRHJhZ2dhYmxlLmVsZW1lbnQpO1xuICAgIH0gZWxzZSBpZiAocHJldmlvdXMpIHtcbiAgICAgIHByZXZpb3VzLmVsZW1lbnQuYWZ0ZXIobW92ZWREcmFnZ2FibGUuZWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGQgPT4gZC5zdGFydFBvc2l0aW9uaW5nKCkpO1xuICAgIHRoaXMuZW1pdExpc3RFdmVudCgncmVvcmRlcmVkJywgbW92ZWREcmFnZ2FibGUpO1xuICB9XG4gIGVtaXRMaXN0RXZlbnQodHlwZSwgZHJhZ2dhYmxlKSB7XG4gICAgdGhpcy5lbWl0V2l0aERvbUV2ZW50KGRyYWdnYWJsZS5lbGVtZW50LCBgbGlzdDoke3R5cGV9YCwgYGRyYWdlZTpsaXN0LSR7dHlwZX1gLCB7XG4gICAgICBsaXN0OiB0aGlzLFxuICAgICAgZHJhZ2dhYmxlXG4gICAgfSk7XG4gIH1cbiAgZ2V0Q3VycmVudFBpbm5lZFBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5kcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uLmNsb25lKCkpO1xuICB9XG4gIGdldFNvcnRlZERyYWdnYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlcy5zbGljZSgpLnNvcnQodGhpcy5zb3J0aW5nLmJpbmQodGhpcykpO1xuICB9XG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiBkcmFnZ2FibGUucmVzZXRQb3NpdGlvblRvSW5pdGlhbCgpKTtcbiAgfVxuICByZWZyZXNoKCkge1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiBkcmFnZ2FibGUucmVmcmVzaCgpKTtcbiAgfVxuICBhZGQoZHJhZ2dhYmxlcykge1xuICAgIGlmICghKGRyYWdnYWJsZXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIGRyYWdnYWJsZXMgPSBbZHJhZ2dhYmxlc107XG4gICAgfVxuICAgIGRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gdGhpcy5pbml0RHJhZ2dhYmxlKGRyYWdnYWJsZSkpO1xuICAgIHRoaXMuZHJhZ2dhYmxlcyA9IHRoaXMuZHJhZ2dhYmxlcy5jb25jYXQoZHJhZ2dhYmxlcyk7XG4gIH1cbiAgcmVtb3ZlKGRyYWdnYWJsZXMpIHtcbiAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgIH1cbiAgICBjb25zdCBzb3J0ZWREcmFnZ2FibGVzID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKCk7XG4gICAgY29uc3Qgc2xvdHMgPSBzb3J0ZWREcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uKTtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHRoaXMucmVsZWFzZURyYWdnYWJsZShkcmFnZ2FibGUpKTtcbiAgICBzb3J0ZWREcmFnZ2FibGVzLmZpbHRlcihkcmFnZ2FibGUgPT4gdGhpcy5kcmFnZ2FibGVzLmluY2x1ZGVzKGRyYWdnYWJsZSkpLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgaWYgKCFkcmFnZ2FibGUucGlubmVkUG9zaXRpb24uY29tcGFyZShzbG90c1tpXSkpIHtcbiAgICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHNsb3RzW2ldLCB7XG4gICAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy50aW1lRXhjaGFuZ2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uID0gc2xvdHNbaV07XG4gICAgfSk7XG4gIH1cbiAgY2xlYXIoKSB7XG4gICAgdGhpcy5yZW1vdmUodGhpcy5kcmFnZ2FibGVzLnNsaWNlKCkpO1xuICB9XG4gIGRlc3Ryb3koKSB7XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5kZXN0cm95KCkpO1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgfVxuICBzb3J0aW5nKGRyYWdnYWJsZUEsIGRyYWdnYWJsZUIpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnNvcnRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuc29ydGluZyhkcmFnZ2FibGVBLCBkcmFnZ2FibGVCKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRyYWdnYWJsZUEucGlubmVkUG9zaXRpb24ueSA8IGRyYWdnYWJsZUIucGlubmVkUG9zaXRpb24ueSkgcmV0dXJuIC0xO1xuICAgICAgaWYgKGRyYWdnYWJsZUEucGlubmVkUG9zaXRpb24ueSA+IGRyYWdnYWJsZUIucGlubmVkUG9zaXRpb24ueSkgcmV0dXJuIDE7XG4gICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi54IDwgZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi54KSByZXR1cm4gLTE7XG4gICAgICBpZiAoZHJhZ2dhYmxlQS5waW5uZWRQb3NpdGlvbi54ID4gZHJhZ2dhYmxlQi5waW5uZWRQb3NpdGlvbi54KSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICBnZXQgZGlzdGFuY2VGdW5jKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2V0RGlzdGFuY2UgfHwgZ2V0RGlzdGFuY2U7XG4gIH1cbiAgZ2V0IHBvc2l0aW9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50UGlubmVkUG9zaXRpb25zKCk7XG4gIH1cbiAgc2V0IHBvc2l0aW9ucyhwb3NpdGlvbnMpIHtcbiAgICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5kcmFnZ2FibGVzLmxlbmd0aCkge1xuICAgICAgcG9zaXRpb25zLmZvckVhY2goKHBvaW50LCBpKSA9PiB7XG4gICAgICAgIHRoaXMuZHJhZ2dhYmxlc1tpXS5waW5Qb3NpdGlvbihwb2ludCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoYEV4cGVjdGVkICR7dGhpcy5kcmFnZ2FibGVzLmxlbmd0aH0gcG9zaXRpb25zLCBnb3QgJHtwb3NpdGlvbnMubGVuZ3RofWApO1xuICAgIH1cbiAgfVxuICBnZXQgZW5hYmxlKCkge1xuICAgIHJldHVybiB0aGlzLl9lbmFibGU7XG4gIH1cbiAgc2V0IGVuYWJsZShlbmFibGUpIHtcbiAgICB0aGlzLl9lbmFibGUgPSBlbmFibGU7XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHtcbiAgICAgIGRyYWdnYWJsZS5lbmFibGUgPSBlbmFibGU7XG4gICAgfSk7XG4gIH1cbiAgZ2V0IHN3YXBwaW5nRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N3YXBwaW5nRGlzYWJsZWQ7XG4gIH1cbiAgc2V0IHN3YXBwaW5nRGlzYWJsZWQoZGlzYWJsZWQpIHtcbiAgICB0aGlzLl9zd2FwcGluZ0Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gIH1cbn1cblxuY29uc3QgYXJyYXlNb3ZlID0gKGFycmF5LCBmcm9tLCB0bykgPT4ge1xuICBhcnJheS5zcGxpY2UodG8gPCAwID8gYXJyYXkubGVuZ3RoICsgdG8gOiB0bywgMCwgYXJyYXkuc3BsaWNlKGZyb20sIDEpWzBdKTtcbn07XG5jbGFzcyBCdWJibGluZ0xpc3QgZXh0ZW5kcyBMaXN0IHtcbiAgYXV0b0RldGVjdEdhcCgpIHtcbiAgICBpZiAodGhpcy5fZ2FwICE9PSB1bmRlZmluZWQgfHwgdGhpcy5leHBsaWNpdEdhcCAhPT0gdW5kZWZpbmVkIHx8IHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGggPCAyKSByZXR1cm47XG4gICAgY29uc3QgYXhpcyA9IHRoaXMuYXhpcztcbiAgICBjb25zdCBzb3J0ZWQgPSB0aGlzLmdldFNvcnRlZERyYWdnYWJsZXMoKTtcbiAgICAvLyBEZXRhY2hlZCBlbGVtZW50cyByZXBvcnQgc2l6ZSAwXG4gICAgY29uc3QgaW5kZXggPSBzb3J0ZWQuZmluZEluZGV4KChkLCBpKSA9PiBpIDwgc29ydGVkLmxlbmd0aCAtIDEgJiYgZC5lbGVtZW50LmlzQ29ubmVjdGVkKTtcbiAgICBpZiAoaW5kZXggPT09IC0xKSByZXR1cm47XG4gICAgY29uc3QgW2N1cnJlbnQsIG5leHRdID0gW3NvcnRlZFtpbmRleF0sIHNvcnRlZFtpbmRleCArIDFdXTtcbiAgICB0aGlzLl9nYXAgPSBuZXh0LnBpbm5lZFBvc2l0aW9uW2F4aXNdIC0gY3VycmVudC5waW5uZWRQb3NpdGlvbltheGlzXSAtIGN1cnJlbnQuZ2V0U2l6ZSgpW2F4aXNdO1xuICB9XG4gIGF1dG9EZXRlY3RTdGFydFBvc2l0aW9uKCkge1xuICAgIGlmICh0aGlzLmRyYWdnYWJsZXMubGVuZ3RoID49IDEgJiYgIXRoaXMuc3RhcnRQb3NpdGlvbikge1xuICAgICAgdGhpcy5zdGFydFBvc2l0aW9uID0gdGhpcy5nZXRTb3J0ZWREcmFnZ2FibGVzKClbMF0ucGlubmVkUG9zaXRpb247XG4gICAgfVxuICB9XG4gIGluaXREcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgc3VwZXIuaW5pdERyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIHRoaXMubGlzdGVuVG8oZHJhZ2dhYmxlLCAnZHJhZzpzdGFydCcsICgpID0+IHRoaXMub25EcmFnU3RhcnQoZHJhZ2dhYmxlKSk7XG4gIH1cbiAgb25EcmFnU3RhcnQoZHJhZ2dhYmxlKSB7XG4gICAgdGhpcy5hdXRvRGV0ZWN0R2FwKCk7XG4gICAgdGhpcy5hdXRvRGV0ZWN0U3RhcnRQb3NpdGlvbigpO1xuICAgIHRoaXMuY2FjaGVkU29ydGVkRHJhZ2dhYmxlcyA9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSA9IHRoaXMuY2FjaGVkU29ydGVkRHJhZ2dhYmxlcy5pbmRleE9mKGRyYWdnYWJsZSk7XG4gIH1cbiAgb25Nb3ZlKGRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLnN3YXBwaW5nRGlzYWJsZWQpIHJldHVybjtcbiAgICBjb25zdCBwcmV2RHJhZ2dhYmxlID0gdGhpcy5jYWNoZWRTb3J0ZWREcmFnZ2FibGVzW3RoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSAtIDFdO1xuICAgIGNvbnN0IG5leHREcmFnZ2FibGUgPSB0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXNbdGhpcy5pbmRleE9mQWN0aXZlRHJhZ2dhYmxlICsgMV07XG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uO1xuICAgIGxldCBjdXJyZW50T3JkZXI7XG4gICAgbGV0IHRhcmdldEluZGV4O1xuICAgIGlmICh0aGlzLmlzTW92aW5nQmFja3dhcmQoZHJhZ2dhYmxlKSAmJiBwcmV2RHJhZ2dhYmxlKSB7XG4gICAgICBjdXJyZW50T3JkZXIgPSBbcHJldkRyYWdnYWJsZSwgZHJhZ2dhYmxlXS5tYXAoZCA9PiBkLnBpbm5lZFBvc2l0aW9uKTtcbiAgICAgIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChjdXJyZW50T3JkZXIsIGRyYWdnYWJsZS5wb3NpdGlvbiwgMTAwMDAsIHRoaXMuZGlzdGFuY2VGdW5jKTtcbiAgICAgIGlmICh0YXJnZXRJbmRleCA9PT0gMCkge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkpIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24ocHJldkRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHJhZ2dhYmxlLnBpbm5lZFBvc2l0aW9uID0gcHJldkRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZOZXdQb3NpdGlvbiA9IHRoaXMubmV4dFBvc2l0aW9uKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiwgZHJhZ2dhYmxlKTtcbiAgICAgICAgcHJldk5ld1Bvc2l0aW9uW3RoaXMuY3Jvc3NBeGlzXSA9IGN1cnJlbnRQb3NpdGlvblt0aGlzLmNyb3NzQXhpc107XG4gICAgICAgIHByZXZEcmFnZ2FibGUucGluUG9zaXRpb24ocHJldk5ld1Bvc2l0aW9uLCB7XG4gICAgICAgICAgZHVyYXRpb246IHRoaXMub3B0aW9ucy50aW1lRXhjaGFuZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIGFycmF5TW92ZSh0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMsIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZS0tLCB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5pc01vdmluZ0ZvcndhcmQoZHJhZ2dhYmxlKSAmJiBuZXh0RHJhZ2dhYmxlKSB7XG4gICAgICBjdXJyZW50T3JkZXIgPSBbZHJhZ2dhYmxlLCBuZXh0RHJhZ2dhYmxlXS5tYXAoZCA9PiBkLnBpbm5lZFBvc2l0aW9uKTtcbiAgICAgIHRhcmdldEluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChjdXJyZW50T3JkZXIsIGRyYWdnYWJsZS5wb3NpdGlvbiwgMTAwMDAsIHRoaXMuZGlzdGFuY2VGdW5jKTtcbiAgICAgIGlmICh0YXJnZXRJbmRleCA9PT0gMSkge1xuICAgICAgICBuZXh0RHJhZ2dhYmxlLnBpblBvc2l0aW9uKGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiwge1xuICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLm9wdGlvbnMudGltZUV4Y2hhbmdlXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVOZXdQb3NpdGlvbiA9IHRoaXMubmV4dFBvc2l0aW9uKG5leHREcmFnZ2FibGUucGlubmVkUG9zaXRpb24sIG5leHREcmFnZ2FibGUpO1xuICAgICAgICBpZiAoZHJhZ2dhYmxlLnNob3VsZFVzZU5hdGl2ZURyYWdBbmREcm9wKCkpIHtcbiAgICAgICAgICBkcmFnZ2FibGUucGluUG9zaXRpb24oZHJhZ2dhYmxlTmV3UG9zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IGRyYWdnYWJsZU5ld1Bvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5TW92ZSh0aGlzLmNhY2hlZFNvcnRlZERyYWdnYWJsZXMsIHRoaXMuaW5kZXhPZkFjdGl2ZURyYWdnYWJsZSsrLCB0aGlzLmluZGV4T2ZBY3RpdmVEcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLm9uTW92ZShkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLmNoYW5nZWREdXJpbmdJdGVyYXRpb24gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBidWJibGluZyhzb3J0ZWREcmFnZ2FibGVzLCBjdXJyZW50RHJhZ2dhYmxlKSB7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuc3RhcnRQb3NpdGlvbi5jbG9uZSgpO1xuICAgIHNvcnRlZERyYWdnYWJsZXMgfHw9IHRoaXMuZ2V0U29ydGVkRHJhZ2dhYmxlcygpO1xuICAgIHNvcnRlZERyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgaWYgKCFkcmFnZ2FibGUucGlubmVkUG9zaXRpb24uY29tcGFyZShjdXJyZW50UG9zaXRpb24pKSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGUgPT09IGN1cnJlbnREcmFnZ2FibGUgJiYgIWN1cnJlbnREcmFnZ2FibGUuc2hvdWxkVXNlTmF0aXZlRHJhZ0FuZERyb3AoKSkge1xuICAgICAgICAgIGRyYWdnYWJsZS5waW5uZWRQb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbi5jbG9uZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRyYWdnYWJsZS5waW5Qb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIHtcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkcmFnZ2FibGUgPT09IGN1cnJlbnREcmFnZ2FibGUgPyAwIDogdGhpcy5vcHRpb25zLnRpbWVFeGNoYW5nZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50UG9zaXRpb24gPSB0aGlzLm5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIGRyYWdnYWJsZSk7XG4gICAgfSk7XG4gIH1cbiAgcmVtb3ZlKGRyYWdnYWJsZXMpIHtcbiAgICBpZiAoIShkcmFnZ2FibGVzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICBkcmFnZ2FibGVzID0gW2RyYWdnYWJsZXNdO1xuICAgIH1cblxuICAgIC8vIERldGVjdCBsYXlvdXQgYmVmb3JlIHJlbW92YWwsIG90aGVyd2lzZSB0aGUgZ2FwIGlzIG1lYXN1cmVkIGFjcm9zcyB0aGUgaG9sZVxuICAgIHRoaXMuYXV0b0RldGVjdEdhcCgpO1xuICAgIHRoaXMuYXV0b0RldGVjdFN0YXJ0UG9zaXRpb24oKTtcbiAgICBkcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHRoaXMucmVsZWFzZURyYWdnYWJsZShkcmFnZ2FibGUpKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSB0aGlzLmRyYWdnYWJsZXMuZmlsdGVyKGQgPT4gIWRyYWdnYWJsZXMuaW5jbHVkZXMoZCkpO1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKGQgPT4gZC5zdGFydFBvc2l0aW9uaW5nKCkpO1xuICAgIGlmICh0aGlzLmRyYWdnYWJsZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5idWJibGluZygpO1xuICAgIH1cbiAgfVxuICBuZXh0UG9zaXRpb24ocG9zaXRpb24sIGRyYWdnYWJsZSkge1xuICAgIGNvbnN0IG5leHQgPSBwb3NpdGlvbi5jbG9uZSgpO1xuICAgIG5leHRbdGhpcy5heGlzXSA9IHBvc2l0aW9uW3RoaXMuYXhpc10gKyBkcmFnZ2FibGUuZ2V0U2l6ZSgpW3RoaXMuYXhpc10gKyB0aGlzLmdhcDtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxuICBpc01vdmluZ0JhY2t3YXJkKGRyYWdnYWJsZSkge1xuICAgIHJldHVybiB0aGlzLmF4aXMgPT09ICd4JyA/IGRyYWdnYWJsZS5sZWZ0RGlyZWN0aW9uIDogZHJhZ2dhYmxlLnVwRGlyZWN0aW9uO1xuICB9XG4gIGlzTW92aW5nRm9yd2FyZChkcmFnZ2FibGUpIHtcbiAgICByZXR1cm4gdGhpcy5heGlzID09PSAneCcgPyBkcmFnZ2FibGUucmlnaHREaXJlY3Rpb24gOiBkcmFnZ2FibGUuZG93bkRpcmVjdGlvbjtcbiAgfVxuICBnZXQgYXhpcygpIHtcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmF4aXMgPT09ICd4JyA/ICd4JyA6ICd5JztcbiAgfVxuICBnZXQgY3Jvc3NBeGlzKCkge1xuICAgIHJldHVybiB0aGlzLmF4aXMgPT09ICd4JyA/ICd5JyA6ICd4JztcbiAgfVxuICBnZXQgZGlzdGFuY2VGdW5jKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2V0RGlzdGFuY2UgfHwgKHRoaXMuYXhpcyA9PT0gJ3gnID8gZ2V0WERpZmZlcmVuY2UgOiBnZXRZRGlmZmVyZW5jZSk7XG4gIH1cbiAgZ2V0IGV4cGxpY2l0R2FwKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ2FwID8/IHRoaXMub3B0aW9ucy52ZXJ0aWNhbEdhcDtcbiAgfVxuICBnZXQgZ2FwKCkge1xuICAgIGlmICh0aGlzLmV4cGxpY2l0R2FwICE9PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLmV4cGxpY2l0R2FwO1xuICAgIHRoaXMuYXV0b0RldGVjdEdhcCgpO1xuICAgIHJldHVybiB0aGlzLl9nYXAgfHwgMDtcbiAgfVxuICBzZXQgZ2FwKGdhcFZhbHVlKSB7XG4gICAgdGhpcy5vcHRpb25zLmdhcCA9IGdhcFZhbHVlO1xuICB9XG4gIGdldCB2ZXJ0aWNhbEdhcCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYXA7XG4gIH1cbiAgc2V0IHZlcnRpY2FsR2FwKGdhcFZhbHVlKSB7XG4gICAgdGhpcy5nYXAgPSBnYXBWYWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgaWYgKHR5cGVvZiBzdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0b3AgPSBzdGFydDtcbiAgICBzdGFydCA9IDA7XG4gIH1cbiAgaWYgKHR5cGVvZiBzdGVwID09PSAndW5kZWZpbmVkJykge1xuICAgIHN0ZXAgPSAxO1xuICB9XG4gIGlmIChzdGVwID4gMCAmJiBzdGFydCA+PSBzdG9wIHx8IHN0ZXAgPCAwICYmIHN0YXJ0IDw9IHN0b3ApIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBzdGVwID4gMCA/IGkgPCBzdG9wIDogaSA+IHN0b3A7IGkgKz0gc3RlcCkge1xuICAgIHJlc3VsdC5wdXNoKGkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8vUmV0dXJuIGNyb3NzaW5nIHBvaW50IG9mIHR3byBsaW5lc1xuZnVuY3Rpb24gZGlyZWN0Q3Jvc3NpbmcoTDFQMSwgTDFQMiwgTDJQMSwgTDJQMikge1xuICBsZXQgdGVtcCwgazEsIGsyLCBiMSwgYjIsIHgsIHk7XG4gIGlmIChMMlAxLnggPT09IEwyUDIueCkge1xuICAgIHRlbXAgPSBMMlAxO1xuICAgIEwyUDEgPSBMMVAxO1xuICAgIEwxUDEgPSB0ZW1wO1xuICAgIHRlbXAgPSBMMlAyO1xuICAgIEwyUDIgPSBMMVAyO1xuICAgIEwxUDIgPSB0ZW1wO1xuICB9XG4gIGlmIChMMVAxLnggPT09IEwxUDIueCkge1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IEwxUDEueDtcbiAgICB5ID0geCAqIGsyICsgYjI7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfSBlbHNlIHtcbiAgICBrMSA9IChMMVAyLnkgLSBMMVAxLnkpIC8gKEwxUDIueCAtIEwxUDEueCk7XG4gICAgYjEgPSAoTDFQMi54ICogTDFQMS55IC0gTDFQMS54ICogTDFQMi55KSAvIChMMVAyLnggLSBMMVAxLngpO1xuICAgIGsyID0gKEwyUDIueSAtIEwyUDEueSkgLyAoTDJQMi54IC0gTDJQMS54KTtcbiAgICBiMiA9IChMMlAyLnggKiBMMlAxLnkgLSBMMlAxLnggKiBMMlAyLnkpIC8gKEwyUDIueCAtIEwyUDEueCk7XG4gICAgeCA9IChiMSAtIGIyKSAvIChrMiAtIGsxKTtcbiAgICB5ID0geCAqIGsxICsgYjE7XG4gICAgcmV0dXJuIG5ldyBQb2ludCh4LCB5KTtcbiAgfVxufVxuZnVuY3Rpb24gYm91bmRUb0xpbmUoQSwgQiwgUCkge1xuICBjb25zdCBBUCA9IG5ldyBQb2ludChQLnggLSBBLngsIFAueSAtIEEueSksXG4gICAgQUIgPSBuZXcgUG9pbnQoQi54IC0gQS54LCBCLnkgLSBBLnkpLFxuICAgIGFiMiA9IEFCLnggKiBBQi54ICsgQUIueSAqIEFCLnksXG4gICAgYXBfYWIgPSBBUC54ICogQUIueCArIEFQLnkgKiBBQi55LFxuICAgIHQgPSBhcF9hYiAvIGFiMjtcbiAgcmV0dXJuIG5ldyBQb2ludChBLnggKyBBQi54ICogdCwgQS55ICsgQUIueSAqIHQpO1xufVxuZnVuY3Rpb24gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodChMUDEsIExQMiwgbGVuZ2h0KSB7XG4gIGNvbnN0IGR4ID0gTFAyLnggLSBMUDEueDtcbiAgY29uc3QgZHkgPSBMUDIueSAtIExQMS55O1xuICBjb25zdCBwZXJjZW50ID0gbGVuZ2h0IC8gZ2V0RGlzdGFuY2UoTFAxLCBMUDIpO1xuICByZXR1cm4gbmV3IFBvaW50KExQMS54ICsgcGVyY2VudCAqIGR4LCBMUDEueSArIHBlcmNlbnQgKiBkeSk7XG59XG5mdW5jdGlvbiBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRwb2ludHMsIHBvaW50LCBpc1JpZ2h0KSB7XG4gIGNvbnN0IHJlc3VsdCA9IGJvdW5kcG9pbnRzLmZpbHRlcihiUG9pbnQgPT4ge1xuICAgIHJldHVybiBiUG9pbnQueSA+IHBvaW50LnkgfHwgKGlzUmlnaHQgPyBiUG9pbnQueCA8IHBvaW50LnggOiBiUG9pbnQueCA+IHBvaW50LngpO1xuICB9KTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocG9pbnQueSA8IHJlc3VsdFtpXS55KSB7XG4gICAgICByZXN1bHQuc3BsaWNlKGksIDAsIHBvaW50KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJlc3VsdC5wdXNoKHBvaW50KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuY2xhc3MgQmFzaWNTdHJhdGVneSB7XG4gIGNvbnN0cnVjdG9yKHJlY3RhbmdsZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSByZWN0YW5nbGU7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuICBnZXQgYm91bmRSZWN0KCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5yZWN0YW5nbGUgPT09ICdmdW5jdGlvbicgPyB0aGlzLnJlY3RhbmdsZSgpIDogdGhpcy5yZWN0YW5nbGU7XG4gIH1cbn1cbmNsYXNzIE5vdENyb3NzaW5nU3RyYXRlZ3kgZXh0ZW5kcyBCYXNpY1N0cmF0ZWd5IHtcbiAgcG9zaXRpb25pbmcocmVjdGFuZ2xlTGlzdCwgaW5kZXhlc09mTmV3cykge1xuICAgIGNvbnN0IHN0YXRpY1JlY3RhbmdsZUluZGV4ZXMgPSByZWN0YW5nbGVMaXN0LnJlZHVjZSgoaW5kZXhlcywgX3JlY3QsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXhlc09mTmV3cy5pbmRleE9mKGluZGV4KSA9PT0gLTEpIHtcbiAgICAgICAgaW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmRleGVzO1xuICAgIH0sIFtdKTtcbiAgICBpbmRleGVzT2ZOZXdzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgbGV0IHJlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4XTtcbiAgICAgIGxldCByZW1vdmFibGUgPSBmYWxzZTtcbiAgICAgIHN0YXRpY1JlY3RhbmdsZUluZGV4ZXMuZm9yRWFjaChpbmRleE9mU3RhdGljID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGljUmVjdCA9IHJlY3RhbmdsZUxpc3RbaW5kZXhPZlN0YXRpY107XG4gICAgICAgIHJlY3QgPSBzdGF0aWNSZWN0Lm1vdmVUb0JvdW5kKHJlY3QpO1xuICAgICAgfSk7XG4gICAgICByZW1vdmFibGUgPSBzdGF0aWNSZWN0YW5nbGVJbmRleGVzLnNvbWUoaW5kZXhPZlN0YXRpYyA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRpY1JlY3QgPSByZWN0YW5nbGVMaXN0W2luZGV4T2ZTdGF0aWNdO1xuICAgICAgICByZXR1cm4gISFzdGF0aWNSZWN0LmFuZChyZWN0KTtcbiAgICAgIH0pIHx8IHJlY3QuYW5kKHRoaXMuYm91bmRSZWN0KS5nZXRTcXVhcmUoKSAhPT0gcmVjdC5nZXRTcXVhcmUoKTtcbiAgICAgIGlmIChyZW1vdmFibGUpIHtcbiAgICAgICAgcmVjdC5yZW1vdmFibGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdGljUmVjdGFuZ2xlSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVjdGFuZ2xlTGlzdDtcbiAgfVxuICBzb3J0aW5nKG9kbERyYWdnYWJsZXNMaXN0LCBuZXdEcmFnZ2FibGVzLCBpbmRleE9mTmV3cykge1xuICAgIGNvbnN0IGRyYWdnYWJsZXMgPSBvZGxEcmFnZ2FibGVzTGlzdC5jb25jYXQobmV3RHJhZ2dhYmxlcyk7XG4gICAgbmV3RHJhZ2dhYmxlcy5mb3JFYWNoKGRyYWdnYWJsZSA9PiB7XG4gICAgICBpbmRleE9mTmV3cy5wdXNoKGRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZHJhZ2dhYmxlcztcbiAgfVxufVxuY2xhc3MgRmxvYXRMZWZ0U3RyYXRlZ3kgZXh0ZW5kcyBCYXNpY1N0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocmVjdGFuZ2xlLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihyZWN0YW5nbGUsIG9wdGlvbnMpO1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgfSwgb3B0aW9ucyk7XG4gICAgdGhpcy5yYWRpdXMgPSBvcHRpb25zLnJhZGl1cyB8fCA4MDtcbiAgICB0aGlzLnBhZGRpbmdUb3BMZWZ0ID0gb3B0aW9ucy5wYWRkaW5nVG9wTGVmdCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgdGhpcy5wYWRkaW5nQm90dG9tUmlnaHQgPSBvcHRpb25zLnBhZGRpbmdCb3R0b21SaWdodCB8fCBuZXcgUG9pbnQoMCwgMCk7XG4gICAgdGhpcy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgPSBvcHRpb25zLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyB8fCAwO1xuICAgIHRoaXMuZ2V0RGlzdGFuY2UgPSBvcHRpb25zLmdldERpc3RhbmNlIHx8IGdldERpc3RhbmNlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24gPSBvcHRpb25zLmdldFBvc2l0aW9uIHx8IChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLnBvc2l0aW9uKTtcbiAgfVxuICBwb3NpdGlvbmluZyhyZWN0YW5nbGVMaXN0LCBfaW5kZXhlc09mTmV3cykge1xuICAgIGNvbnN0IGJvdW5kUmVjdCA9IHRoaXMuYm91bmRSZWN0O1xuICAgIGNvbnN0IHJlY3RQMiA9IGJvdW5kUmVjdC5nZXRQMigpO1xuICAgIGxldCBib3VuZGFyeVBvaW50cyA9IFtib3VuZFJlY3QucG9zaXRpb25dO1xuICAgIHJlY3RhbmdsZUxpc3QuZm9yRWFjaCgocmVjdCwgcmVjdEluZGV4KSA9PiB7XG4gICAgICBsZXQgcG9zaXRpb24sXG4gICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm91bmRhcnlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRhcnlQb2ludHNbaV0ueCArIHRoaXMucGFkZGluZ1RvcExlZnQueCwgaSA+IDAgPyBib3VuZGFyeVBvaW50c1tpIC0gMV0ueSArIHRoaXMueUdhcEJldHdlZW5EcmFnZ2FibGVzIDogYm91bmRSZWN0LnBvc2l0aW9uLnkgKyB0aGlzLnBhZGRpbmdUb3BMZWZ0LnkpO1xuICAgICAgICBpc1ZhbGlkID0gcG9zaXRpb24ueCArIHJlY3Quc2l6ZS54IDwgcmVjdFAyLng7XG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb2ludChib3VuZFJlY3QucG9zaXRpb24ueCArIHRoaXMucGFkZGluZ1RvcExlZnQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gdGhpcy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiB0aGlzLnBhZGRpbmdUb3BMZWZ0LnkpKTtcbiAgICAgIH1cbiAgICAgIHJlY3QucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3ZhYmxlICYmIHJlY3QuZ2V0UDMoKS55ID4gYm91bmRSZWN0LmdldFAzKCkueSkge1xuICAgICAgICByZWN0LnJlbW92YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBib3VuZGFyeVBvaW50cyA9IGFkZFBvaW50VG9Cb3VuZFBvaW50cyhib3VuZGFyeVBvaW50cywgcmVjdC5nZXRQMygpLmFkZCh0aGlzLnBhZGRpbmdCb3R0b21SaWdodCkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICB9XG4gIHNvcnRpbmcob2RsRHJhZ2dhYmxlc0xpc3QsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgY29uc3QgbmV3TGlzdCA9IG9kbERyYWdnYWJsZXNMaXN0LmNvbmNhdCgpO1xuICAgIGNvbnN0IGxpc3RPbGRQb3NpdGlvbiA9IG9kbERyYWdnYWJsZXNMaXN0Lm1hcChkcmFnZ2FibGUgPT4gZHJhZ2dhYmxlLmdldFBvc2l0aW9uKCkpO1xuICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChuZXdEcmFnZ2FibGUgPT4ge1xuICAgICAgbGV0IGluZGV4ID0gaW5kZXhPZk5lYXJlc3RQb2ludChsaXN0T2xkUG9zaXRpb24sIHRoaXMuZ2V0UG9zaXRpb24obmV3RHJhZ2dhYmxlKSwgdGhpcy5yYWRpdXMsIHRoaXMuZ2V0RGlzdGFuY2UpO1xuICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICBpbmRleCA9IG5ld0xpc3QubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBuZXdMaXN0LmluZGV4T2Yob2RsRHJhZ2dhYmxlc0xpc3RbaW5kZXhdKTtcbiAgICAgIH1cbiAgICAgIG5ld0xpc3Quc3BsaWNlKGluZGV4LCAwLCBuZXdEcmFnZ2FibGUpO1xuICAgIH0pO1xuICAgIG5ld0RyYWdnYWJsZXMuZm9yRWFjaChuZXdEcmFnZ2FibGUgPT4ge1xuICAgICAgaW5kZXhPZk5ld3MucHVzaChuZXdMaXN0LmluZGV4T2YobmV3RHJhZ2dhYmxlKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld0xpc3Q7XG4gIH1cbn1cbmNsYXNzIEZsb2F0UmlnaHRTdHJhdGVneSBleHRlbmRzIEZsb2F0TGVmdFN0cmF0ZWd5IHtcbiAgY29uc3RydWN0b3IocmVjdGFuZ2xlLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihyZWN0YW5nbGUsIG9wdGlvbnMpO1xuICAgIHRoaXMucGFkZGluZ1RvcFJpZ2h0ID0gb3B0aW9ucy5wYWRkaW5nVG9wUmlnaHQgfHwgbmV3IFBvaW50KDUsIDUpO1xuICAgIHRoaXMucGFkZGluZ0JvdHRvbUxlZnQgPSBvcHRpb25zLnBhZGRpbmdCb3R0b21MZWZ0IHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgICB0aGlzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA9IG9wdGlvbnMueUdhcEJldHdlZW5EcmFnZ2FibGVzIHx8IDA7XG4gICAgdGhpcy5wYWRkaW5nQm90dG9tTmVnTGVmdCA9IG5ldyBQb2ludCgtdGhpcy5wYWRkaW5nQm90dG9tTGVmdC54LCB0aGlzLnBhZGRpbmdCb3R0b21MZWZ0LnkpO1xuICB9XG4gIHBvc2l0aW9uaW5nKHJlY3RhbmdsZUxpc3QsIF9pbmRleGVzT2ZOZXdzKSB7XG4gICAgY29uc3QgYm91bmRSZWN0ID0gdGhpcy5ib3VuZFJlY3Q7XG4gICAgbGV0IGJvdW5kYXJ5UG9pbnRzID0gW2JvdW5kUmVjdC5nZXRQMigpXTtcbiAgICByZWN0YW5nbGVMaXN0LmZvckVhY2goKHJlY3QsIHJlY3RJbmRleCkgPT4ge1xuICAgICAgbGV0IHBvc2l0aW9uLFxuICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJvdW5kYXJ5UG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFBvaW50KGJvdW5kYXJ5UG9pbnRzW2ldLnggLSByZWN0LnNpemUueCAtIHRoaXMucGFkZGluZ1RvcFJpZ2h0LngsIGkgPiAwID8gYm91bmRhcnlQb2ludHNbaSAtIDFdLnkgKyB0aGlzLnlHYXBCZXR3ZWVuRHJhZ2dhYmxlcyA6IGJvdW5kUmVjdC5wb3NpdGlvbi55ICsgdGhpcy5wYWRkaW5nVG9wUmlnaHQueSk7XG4gICAgICAgIGlzVmFsaWQgPSBwb3NpdGlvbi54ID4gcmVjdC5wb3NpdGlvbi54O1xuICAgICAgICBpZiAoaXNWYWxpZCkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9pbnQoYm91bmRSZWN0LmdldFAyKCkueCAtIHJlY3Quc2l6ZS54IC0gdGhpcy5wYWRkaW5nVG9wUmlnaHQueCwgYm91bmRhcnlQb2ludHNbYm91bmRhcnlQb2ludHMubGVuZ3RoIC0gMV0ueSArIChyZWN0SW5kZXggPiAwID8gdGhpcy55R2FwQmV0d2VlbkRyYWdnYWJsZXMgOiB0aGlzLnBhZGRpbmdUb3BSaWdodC55KSk7XG4gICAgICB9XG4gICAgICByZWN0LnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICBpZiAodGhpcy5vcHRpb25zLnJlbW92YWJsZSAmJiByZWN0LmdldFA0KCkueSA+IGJvdW5kUmVjdC5nZXRQNCgpLnkpIHtcbiAgICAgICAgcmVjdC5yZW1vdmFibGUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgYm91bmRhcnlQb2ludHMgPSBhZGRQb2ludFRvQm91bmRQb2ludHMoYm91bmRhcnlQb2ludHMsIHJlY3QuZ2V0UDQoKS5hZGQodGhpcy5wYWRkaW5nQm90dG9tTmVnTGVmdCksIHRydWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZWN0YW5nbGVMaXN0O1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICBjb25zdCBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKTtcbiAgY29uc3QgbWF4QW5nbGUgPSBNYXRoLm1heChhbHBoYSwgYmV0YSk7XG4gIHJldHVybiBNYXRoLm1pbihtYXhBbmdsZSAtIG1pbkFuZ2xlLCBtaW5BbmdsZSArIE1hdGguUEkgKiAyIC0gbWF4QW5nbGUpO1xufVxuZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIGNvbnN0IGRpZmYgPSBwMi5zdWIocDEpO1xuICByZXR1cm4gbm9ybWFsaXplQW5nbGUoTWF0aC5hdGFuMihkaWZmLnksIGRpZmYueCkpO1xufVxuZnVuY3Rpb24gYm91bmRBbmdsZShtaW4sIG1heCwgdmFsKSB7XG4gIGxldCBkbWluLCBkbWF4O1xuICBpZiAobWluIDwgbWF4ICYmIHZhbCA+IG1pbiAmJiB2YWwgPCBtYXgpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2UgaWYgKG1heCA8IG1pbiAmJiAodmFsIDwgbWF4IHx8IHZhbCA+IG1pbikpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpO1xuICAgIGRtYXggPSBnZXRBbmdsZURpZmYobWF4LCB2YWwpO1xuICAgIGlmIChkbWluIDwgZG1heCkge1xuICAgICAgcmV0dXJuIG1pbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFuZ2xlKHZhbCkge1xuICB3aGlsZSAodmFsIDwgMCkge1xuICAgIHZhbCArPSAyICogTWF0aC5QSTtcbiAgfVxuICB3aGlsZSAodmFsID4gMiAqIE1hdGguUEkpIHtcbiAgICB2YWwgLT0gMiAqIE1hdGguUEk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cbmZ1bmN0aW9uIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgbGVuZ3RoLCBjZW50ZXIpIHtcbiAgY2VudGVyID0gY2VudGVyIHx8IG5ldyBQb2ludCgwLCAwKTtcbiAgcmV0dXJuIGNlbnRlci5hZGQobmV3IFBvaW50KGxlbmd0aCAqIE1hdGguY29zKGFuZ2xlKSwgbGVuZ3RoICogTWF0aC5zaW4oYW5nbGUpKSk7XG59XG5cbmNsYXNzIEJvdW5kIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICByZXR1cm4gcG9pbnQ7XG4gIH1cbiAgcmVmcmVzaCgpIHt9XG4gIHN0YXRpYyBib3VuZGluZygpIHtcbiAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyB0aGlzKC4uLmFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIGluc3RhbmNlLmJvdW5kLmJpbmQoaW5zdGFuY2UpO1xuICB9XG59XG5jbGFzcyBCb3VuZFRvUmVjdGFuZ2xlIGV4dGVuZHMgQm91bmQge1xuICBjb25zdHJ1Y3RvcihyZWN0YW5nbGUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVjdGFuZ2xlID0gcmVjdGFuZ2xlO1xuICB9XG4gIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgY29uc3QgY2FsY1BvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICBjb25zdCByZWN0UDIgPSB0aGlzLnJlY3RhbmdsZS5nZXRQMygpO1xuICAgIGlmICh0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi54ID4gY2FsY1BvaW50LngpIHtcbiAgICAgIGNhbGNQb2ludC54ID0gdGhpcy5yZWN0YW5nbGUucG9zaXRpb24ueDtcbiAgICB9XG4gICAgaWYgKHRoaXMucmVjdGFuZ2xlLnBvc2l0aW9uLnkgPiBjYWxjUG9pbnQueSkge1xuICAgICAgY2FsY1BvaW50LnkgPSB0aGlzLnJlY3RhbmdsZS5wb3NpdGlvbi55O1xuICAgIH1cbiAgICBpZiAocmVjdFAyLnggPCBjYWxjUG9pbnQueCArIHNpemUueCkge1xuICAgICAgY2FsY1BvaW50LnggPSByZWN0UDIueCAtIHNpemUueDtcbiAgICB9XG4gICAgaWYgKHJlY3RQMi55IDwgY2FsY1BvaW50LnkgKyBzaXplLnkpIHtcbiAgICAgIGNhbGNQb2ludC55ID0gcmVjdFAyLnkgLSBzaXplLnk7XG4gICAgfVxuICAgIHJldHVybiBjYWxjUG9pbnQ7XG4gIH1cbn1cbmNsYXNzIEJvdW5kVG9FbGVtZW50IGV4dGVuZHMgQm91bmRUb1JlY3RhbmdsZSB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbnRhaW5lcikge1xuICAgIHN1cGVyKFJlY3RhbmdsZS5mcm9tRWxlbWVudChlbGVtZW50LCBjb250YWluZXIpKTtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICB9XG4gIHJlZnJlc2goKSB7XG4gICAgdGhpcy5yZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLmNvbnRhaW5lcik7XG4gIH1cbn1cbmNsYXNzIEJvdW5kVG9MaW5lWCBleHRlbmRzIEJvdW5kIHtcbiAgY29uc3RydWN0b3IoeCwgc3RhcnRZLCBlbmRZKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMuc3RhcnRZID0gc3RhcnRZO1xuICAgIHRoaXMuZW5kWSA9IGVuZFk7XG4gIH1cbiAgYm91bmQocG9pbnQsIHNpemUpIHtcbiAgICBjb25zdCBjYWxjUG9pbnQgPSBwb2ludC5jbG9uZSgpO1xuICAgIGNhbGNQb2ludC54ID0gdGhpcy54O1xuICAgIGlmICh0aGlzLnN0YXJ0WSA+IGNhbGNQb2ludC55KSB7XG4gICAgICBjYWxjUG9pbnQueSA9IHRoaXMuc3RhcnRZO1xuICAgIH1cbiAgICBpZiAodGhpcy5lbmRZIDwgY2FsY1BvaW50LnkgKyBzaXplLnkpIHtcbiAgICAgIGNhbGNQb2ludC55ID0gdGhpcy5lbmRZIC0gc2l6ZS55O1xuICAgIH1cbiAgICByZXR1cm4gY2FsY1BvaW50O1xuICB9XG59XG5jbGFzcyBCb3VuZFRvTGluZVkgZXh0ZW5kcyBCb3VuZCB7XG4gIGNvbnN0cnVjdG9yKHksIHN0YXJ0WCwgZW5kWCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgICB0aGlzLmVuZFggPSBlbmRYO1xuICB9XG4gIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgY29uc3QgY2FsY1BvaW50ID0gcG9pbnQuY2xvbmUoKTtcbiAgICBjYWxjUG9pbnQueSA9IHRoaXMueTtcbiAgICBpZiAodGhpcy5zdGFydFggPiBjYWxjUG9pbnQueCkge1xuICAgICAgY2FsY1BvaW50LnggPSB0aGlzLnN0YXJ0WDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZW5kWCA8IGNhbGNQb2ludC54ICsgc2l6ZS54KSB7XG4gICAgICBjYWxjUG9pbnQueCA9IHRoaXMuZW5kWCAtIHNpemUueDtcbiAgICB9XG4gICAgcmV0dXJuIGNhbGNQb2ludDtcbiAgfVxufVxuY2xhc3MgQm91bmRUb0xpbmUgZXh0ZW5kcyBCb3VuZCB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0UG9pbnQsIGVuZFBvaW50KSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXJ0UG9pbnQgPSBzdGFydFBvaW50O1xuICAgIHRoaXMuZW5kUG9pbnQgPSBlbmRQb2ludDtcbiAgICBjb25zdCBhbHBoYSA9IE1hdGguYXRhbjIoZW5kUG9pbnQueSAtIHN0YXJ0UG9pbnQueSwgZW5kUG9pbnQueCAtIHN0YXJ0UG9pbnQueCk7XG4gICAgY29uc3QgYmV0YSA9IGFscGhhICsgTWF0aC5QSSAvIDI7XG4gICAgdGhpcy5zb21lSyA9IDEwO1xuICAgIHRoaXMuY29zQmV0YSA9IE1hdGguY29zKGJldGEpO1xuICAgIHRoaXMuc2luQmV0YSA9IE1hdGguc2luKGJldGEpO1xuICB9XG4gIGJvdW5kKHBvaW50LCBzaXplKSB7XG4gICAgY29uc3QgcG9pbnQyID0gbmV3IFBvaW50KHBvaW50LnggKyB0aGlzLnNvbWVLICogdGhpcy5jb3NCZXRhLCBwb2ludC55ICsgdGhpcy5zb21lSyAqIHRoaXMuc2luQmV0YSk7XG4gICAgY29uc3QgbmV3RW5kUG9pbnQgPSBnZXRQb2ludE9uTGluZUJ5TGVuZ2h0KHRoaXMuZW5kUG9pbnQsIHRoaXMuc3RhcnRQb2ludCwgc2l6ZS54KTtcbiAgICBjb25zdCBwb2ludENyb3NzaW5nID0gZGlyZWN0Q3Jvc3NpbmcodGhpcy5zdGFydFBvaW50LCB0aGlzLmVuZFBvaW50LCBwb2ludCwgcG9pbnQyKTtcbiAgICByZXR1cm4gYm91bmRUb0xpbmUodGhpcy5zdGFydFBvaW50LCBuZXdFbmRQb2ludCwgcG9pbnRDcm9zc2luZyk7XG4gIH1cbn1cbmNsYXNzIEJvdW5kVG9DaXJjbGUgZXh0ZW5kcyBCb3VuZCB7XG4gIGNvbnN0cnVjdG9yKGNlbnRlciwgcmFkaXVzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmNlbnRlciA9IGNlbnRlcjtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgfVxuICBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICByZXR1cm4gZ2V0UG9pbnRPbkxpbmVCeUxlbmdodCh0aGlzLmNlbnRlciwgcG9pbnQsIHRoaXMucmFkaXVzKTtcbiAgfVxufVxuY2xhc3MgQm91bmRUb0FyYyBleHRlbmRzIEJvdW5kVG9DaXJjbGUge1xuICBjb25zdHJ1Y3RvcihjZW50ZXIsIHJhZGl1cywgc3RhcnRBbmdsZSwgZW5kQW5nbGUpIHtcbiAgICBzdXBlcihjZW50ZXIsIHJhZGl1cyk7XG4gICAgdGhpcy5fc3RhcnRBbmdsZSA9IHN0YXJ0QW5nbGU7XG4gICAgdGhpcy5fZW5kQW5nbGUgPSBlbmRBbmdsZTtcbiAgfVxuICBzdGFydEFuZ2xlKCkge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5fc3RhcnRBbmdsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX3N0YXJ0QW5nbGUoKSA6IHRoaXMuX3N0YXJ0QW5nbGU7XG4gIH1cbiAgZW5kQW5nbGUoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9lbmRBbmdsZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuX2VuZEFuZ2xlKCkgOiB0aGlzLl9lbmRBbmdsZTtcbiAgfVxuICBib3VuZChwb2ludCwgX3NpemUpIHtcbiAgICBsZXQgYW5nbGUgPSBnZXRBbmdsZSh0aGlzLmNlbnRlciwgcG9pbnQpO1xuICAgIGFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUpO1xuICAgIGFuZ2xlID0gYm91bmRBbmdsZSh0aGlzLnN0YXJ0QW5nbGUoKSwgdGhpcy5lbmRBbmdsZSgpLCBhbmdsZSk7XG4gICAgcmV0dXJuIGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShhbmdsZSwgdGhpcy5yYWRpdXMsIHRoaXMuY2VudGVyKTtcbiAgfVxufVxuXG5jbGFzcyBUcmF5IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgZHJhZ2dhYmxlcywgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIob3B0aW9ucyk7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICB0aW1lRW5kOiAyMDAsXG4gICAgICB0aW1lRXhjaGFuZ2U6IDQwMFxuICAgIH0sIG9wdGlvbnMpO1xuICAgIHRoaXMucG9zaXRpb25pbmdTdHJhdGVneSA9IG9wdGlvbnMuc3RyYXRlZ3kgfHwgbmV3IEZsb2F0TGVmdFN0cmF0ZWd5KHRoaXMuZ2V0UmVjdGFuZ2xlLmJpbmQodGhpcyksIHtcbiAgICAgIHJhZGl1czogODAsXG4gICAgICBnZXREaXN0YW5jZTogdHJhbnNmb3JtZWRTcGFjZURpc3RhbmNlRmFjdG9yeSh7XG4gICAgICAgIHg6IDEsXG4gICAgICAgIHk6IDRcbiAgICAgIH0pLFxuICAgICAgcmVtb3ZhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBbXTtcbiAgICB0aGlzLmNvbnRyb2xsZXJzID0gbmV3IE1hcCgpO1xuICAgIGRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gdGhpcy5hY2NlcHQoZHJhZ2dhYmxlKSk7XG4gICAgY29uc3Qgc2NvcGUgPSBvcHRpb25zLnNjb3BlIHx8IGN1cnJlbnRTY29wZSgpO1xuICAgIHNjb3BlLmFkZFRyYXkodGhpcyk7XG4gICAgdGhpcy5zdGFydEJvdW5kaW5nKCk7XG4gICAgdGhpcy5pbml0KCk7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdGhpcy5yZXNpemVPYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihkZWJvdW5jZSgoKSA9PiB0aGlzLm9uUmVzaXplKCksIDEwMCkpO1xuICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLmVsZW1lbnQpO1xuICAgIGlmICh0aGlzLmNvbnRhaW5lcikge1xuICAgICAgdGhpcy5yZXNpemVPYnNlcnZlci5vYnNlcnZlKHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gIH1cbiAgb25SZXNpemUoKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgY29uc3Qgc2hpZnQgPSBwb3NpdGlvbi5zdWIodGhpcy5sYXN0UG9zaXRpb24pO1xuICAgIHRoaXMubGFzdFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZpbHRlcihkcmFnZ2FibGUgPT4gIWRyYWdnYWJsZS5pc0RyYWdnaW5nKS5mb3JFYWNoKGRyYWdnYWJsZSA9PiBkcmFnZ2FibGUucmVtZWFzdXJlKCkpO1xuICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IGRyYWdnYWJsZS5zZXRQb3NpdGlvbihkcmFnZ2FibGUucG9zaXRpb24uYWRkKHNoaWZ0KSkpO1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG4gIHN0YXJ0Qm91bmRpbmcoKSB7XG4gICAgdGhpcy5ib3VuZCA9IHRoaXMub3B0aW9ucy5ib3VuZCB8fCBCb3VuZFRvRWxlbWVudC5ib3VuZGluZyh0aGlzLmVsZW1lbnQpO1xuICB9XG4gIHBvc2l0aW9uaW5nKGRyYWdnYWJsZXMsIGluZGV4ZXNPZk5ldykge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uaW5nU3RyYXRlZ3kucG9zaXRpb25pbmcoZHJhZ2dhYmxlcywgaW5kZXhlc09mTmV3KTtcbiAgfVxuICBzb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb25pbmdTdHJhdGVneS5zb3J0aW5nKG9sZERyYWdnYWJsZXMsIG5ld0RyYWdnYWJsZXMsIGluZGV4T2ZOZXdzKTtcbiAgfVxuICBpbml0KCkge1xuICAgIGxldCByZWN0YW5nbGVzLCBpbmRleGVzT2ZOZXc7XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMgPSB0aGlzLmRyYWdnYWJsZXMuZmlsdGVyKGRyYWdnYWJsZSA9PiB7XG4gICAgICBsZXQgZWxlbWVudCA9IGRyYWdnYWJsZS5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudCA9PT0gdGhpcy5lbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoKSB7XG4gICAgICBpbmRleGVzT2ZOZXcgPSByYW5nZSh0aGlzLmlubmVyRHJhZ2dhYmxlcy5sZW5ndGgpO1xuICAgICAgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGRyYWdnYWJsZSA9PiB7XG4gICAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICB9KSwgaW5kZXhlc09mTmV3KTtcbiAgICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgaW5kZXhlc09mTmV3KTtcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLmZvckVhY2goZHJhZ2dhYmxlID0+IHRoaXMuZW1pdFRyYXlFdmVudCgnYWRkJywgZHJhZ2dhYmxlKSk7XG4gICAgfVxuICB9XG4gIGdldFJlY3RhbmdsZSgpIHtcbiAgICByZXR1cm4gUmVjdGFuZ2xlLmZyb21FbGVtZW50KHRoaXMuZWxlbWVudCwgdGhpcy5jb250YWluZXIsIHRydWUpO1xuICB9XG4gIGNhdGNoRHJhZ2dhYmxlKGRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuY2F0Y2hEcmFnZ2FibGUpIHtcbiAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuY2F0Y2hEcmFnZ2FibGUodGhpcywgZHJhZ2dhYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdHJheVJlY3RhbmdsZSA9IHRoaXMuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgICBjb25zdCBkcmFnZ2FibGVTcXVhcmUgPSBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCkuZ2V0U3F1YXJlKCk7XG4gICAgICByZXR1cm4gZHJhZ2dhYmxlU3F1YXJlIDwgdHJheVJlY3RhbmdsZS5nZXRTcXVhcmUoKSAmJiB0cmF5UmVjdGFuZ2xlLmluY2x1ZGVQb2ludChkcmFnZ2FibGUuZ2V0Q2VudGVyKCkpO1xuICAgIH1cbiAgfVxuICBnZXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRSZWN0YW5nbGUoKS5wb3NpdGlvbjtcbiAgfVxuICBnZXRTaXplKCkge1xuICAgIHJldHVybiB0aGlzLmdldFJlY3RhbmdsZSgpLnNpemU7XG4gIH1cbiAgZGVzdHJveSgpIHtcbiAgICB0aGlzLmNvbnRyb2xsZXJzLmZvckVhY2goY29udHJvbGxlciA9PiBjb250cm9sbGVyLmFib3J0KCkpO1xuICAgIHRoaXMuY29udHJvbGxlcnMuY2xlYXIoKTtcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4gcmVtb3ZlSXRlbShkcmFnZ2FibGUudHJheXMsIHRoaXMpKTtcbiAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICBzY29wZXMuZm9yRWFjaChzY29wZSA9PiByZW1vdmVJdGVtKHNjb3BlLnRyYXlzLCB0aGlzKSk7XG4gIH1cbiAgcmVmcmVzaCgpIHtcbiAgICBjb25zdCByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgfSksIFtdKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtdLCAwKTtcbiAgfVxuICBkcm9wKGRyYWdnYWJsZSkge1xuICAgIGNvbnN0IG5ld0RyYWdnYWJsZXNJbmRleCA9IFtdO1xuICAgIGlmICghdGhpcy5nZXRSZWN0YW5nbGUoKS5pbmNsdWRlUG9pbnQoZHJhZ2dhYmxlLmdldENlbnRlcigpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBiZWZvcmVBZGRFdmVudCA9IHRoaXMuZW1pdFRyYXlFdmVudCgnYmVmb3JlQWRkJywgZHJhZ2dhYmxlLCB7XG4gICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKGJlZm9yZUFkZEV2ZW50LmNhbmNlbGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRyYWdnYWJsZS5wb3NpdGlvbiA9IHRoaXMuYm91bmQoZHJhZ2dhYmxlLnBvc2l0aW9uLCBkcmFnZ2FibGUuZ2V0U2l6ZSgpKTtcbiAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcyA9IHRoaXMuc29ydGluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcywgW2RyYWdnYWJsZV0sIG5ld0RyYWdnYWJsZXNJbmRleCk7XG4gICAgY29uc3QgcmVjdGFuZ2xlcyA9IHRoaXMucG9zaXRpb25pbmcodGhpcy5pbm5lckRyYWdnYWJsZXMubWFwKGRyYWdnYWJsZSA9PiB7XG4gICAgICByZXR1cm4gZHJhZ2dhYmxlLmdldFJlY3RhbmdsZSgpO1xuICAgIH0pLCBuZXdEcmFnZ2FibGVzSW5kZXgpO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgbmV3RHJhZ2dhYmxlc0luZGV4KTtcbiAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgdGhpcy5lbWl0VHJheUV2ZW50KCdhZGQnLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzZXRQb3NpdGlvbihyZWN0YW5nbGVzLCBpbmRleGVzT2ZOZXcsIHRpbWUpIHtcbiAgICB0aGlzLmlubmVyRHJhZ2dhYmxlcy5zbGljZSgwKS5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSByZWN0YW5nbGVzW2ldLFxuICAgICAgICB0aW1lRW5kID0gdGltZSB8fCB0aW1lID09PSAwID8gdGltZSA6IGluZGV4ZXNPZk5ldy5pbmRleE9mKGkpICE9PSAtMSA/IHRoaXMub3B0aW9ucy50aW1lRW5kIDogdGhpcy5vcHRpb25zLnRpbWVFeGNoYW5nZTtcbiAgICAgIGlmIChyZWN0LnJlbW92YWJsZSkge1xuICAgICAgICBkcmFnZ2FibGUubW92ZShkcmFnZ2FibGUuaW5pdGlhbFBvc2l0aW9uLCB7XG4gICAgICAgICAgZHVyYXRpb246IHRpbWVFbmQsXG4gICAgICAgICAgc2lsZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZW1vdmVJdGVtKHRoaXMuaW5uZXJEcmFnZ2FibGVzLCBkcmFnZ2FibGUpO1xuICAgICAgICB0aGlzLmVtaXRUcmF5RXZlbnQoJ3JlbW92ZScsIGRyYWdnYWJsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFnZ2FibGUubW92ZShyZWN0LnBvc2l0aW9uLCB7XG4gICAgICAgICAgZHVyYXRpb246IHRpbWVFbmQsXG4gICAgICAgICAgc2lsZW50OiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGFkZChkcmFnZ2FibGUsIHtcbiAgICBkdXJhdGlvbiA9IDBcbiAgfSA9IHt9KSB7XG4gICAgY29uc3QgbmV3RHJhZ2dhYmxlc0luZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMubGVuZ3RoO1xuICAgIGNvbnN0IGJlZm9yZUFkZEV2ZW50ID0gdGhpcy5lbWl0VHJheUV2ZW50KCdiZWZvcmVBZGQnLCBkcmFnZ2FibGUsIHtcbiAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAoYmVmb3JlQWRkRXZlbnQuY2FuY2VsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5hY2NlcHQoZHJhZ2dhYmxlKTtcbiAgICB0aGlzLnB1c2hJbm5lckRyYWdnYWJsZShkcmFnZ2FibGUpO1xuICAgIGNvbnN0IHJlY3RhbmdsZXMgPSB0aGlzLnBvc2l0aW9uaW5nKHRoaXMuaW5uZXJEcmFnZ2FibGVzLm1hcChkcmFnZ2FibGUgPT4ge1xuICAgICAgcmV0dXJuIGRyYWdnYWJsZS5nZXRSZWN0YW5nbGUoKTtcbiAgICB9KSwgW25ld0RyYWdnYWJsZXNJbmRleF0pO1xuICAgIHRoaXMuc2V0UG9zaXRpb24ocmVjdGFuZ2xlcywgW25ld0RyYWdnYWJsZXNJbmRleF0sIGR1cmF0aW9uKTtcbiAgICBpZiAodGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpICE9PSAtMSkge1xuICAgICAgdGhpcy5lbWl0VHJheUV2ZW50KCdhZGQnLCBkcmFnZ2FibGUpO1xuICAgIH1cbiAgfVxuICBwdXNoSW5uZXJEcmFnZ2FibGUoZHJhZ2dhYmxlKSB7XG4gICAgaWYgKHRoaXMuaW5uZXJEcmFnZ2FibGVzLmluZGV4T2YoZHJhZ2dhYmxlKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzLnB1c2goZHJhZ2dhYmxlKTtcbiAgICB9XG4gIH1cbiAgYWNjZXB0KGRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLmRyYWdnYWJsZXMuaW5jbHVkZXMoZHJhZ2dhYmxlKSkgcmV0dXJuO1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5wdXNoKGRyYWdnYWJsZSk7XG4gICAgZHJhZ2dhYmxlLnRyYXlzLnB1c2godGhpcyk7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICB0aGlzLmNvbnRyb2xsZXJzLnNldChkcmFnZ2FibGUsIGNvbnRyb2xsZXIpO1xuICAgIGRyYWdnYWJsZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnOm1vdmUnLCAoKSA9PiB0aGlzLnJlbW92ZShkcmFnZ2FibGUpLCB7XG4gICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsXG4gICAgfSk7XG4gIH1cbiAgcmVsZWFzZURyYWdnYWJsZShkcmFnZ2FibGUpIHtcbiAgICB0aGlzLnJlbW92ZShkcmFnZ2FibGUpO1xuICAgIHRoaXMuY29udHJvbGxlcnMuZ2V0KGRyYWdnYWJsZSk/LmFib3J0KCk7XG4gICAgdGhpcy5jb250cm9sbGVycy5kZWxldGUoZHJhZ2dhYmxlKTtcbiAgICByZW1vdmVJdGVtKHRoaXMuZHJhZ2dhYmxlcywgZHJhZ2dhYmxlKTtcbiAgICByZW1vdmVJdGVtKGRyYWdnYWJsZS50cmF5cywgdGhpcyk7XG4gIH1cbiAgcmVtb3ZlKGRyYWdnYWJsZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5pbm5lckRyYWdnYWJsZXMuaW5kZXhPZihkcmFnZ2FibGUpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICBjb25zdCByZWN0YW5nbGVzID0gdGhpcy5wb3NpdGlvbmluZyh0aGlzLmlubmVyRHJhZ2dhYmxlcy5tYXAoZHJhZ2dhYmxlID0+IHtcbiAgICAgIHJldHVybiBkcmFnZ2FibGUuZ2V0UmVjdGFuZ2xlKCk7XG4gICAgfSksIFtdKTtcbiAgICB0aGlzLnNldFBvc2l0aW9uKHJlY3RhbmdsZXMsIFtdKTtcbiAgICB0aGlzLmVtaXRUcmF5RXZlbnQoJ3JlbW92ZScsIGRyYWdnYWJsZSk7XG4gIH1cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5pbm5lckRyYWdnYWJsZXMuZm9yRWFjaChkcmFnZ2FibGUgPT4ge1xuICAgICAgZHJhZ2dhYmxlLm1vdmUoZHJhZ2dhYmxlLmluaXRpYWxQb3NpdGlvbiwge1xuICAgICAgICBzaWxlbnQ6IHRydWVcbiAgICAgIH0pO1xuICAgICAgdGhpcy5lbWl0VHJheUV2ZW50KCdyZW1vdmUnLCBkcmFnZ2FibGUpO1xuICAgIH0pO1xuICAgIHRoaXMuaW5uZXJEcmFnZ2FibGVzID0gW107XG4gIH1cbiAgZ2V0U29ydGVkRHJhZ2dhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5pbm5lckRyYWdnYWJsZXMuc2xpY2UoKTtcbiAgfVxuICBlbWl0VHJheUV2ZW50KHR5cGUsIGRyYWdnYWJsZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IGRvbVR5cGUgPSB0eXBlLnJlcGxhY2UoL1tBLVpdL2csIGxldHRlciA9PiBgLSR7bGV0dGVyLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgcmV0dXJuIHRoaXMuZW1pdFdpdGhEb21FdmVudCh0aGlzLmVsZW1lbnQsIGB0cmF5OiR7dHlwZX1gLCBgZHJhZ2VlOnRyYXktJHtkb21UeXBlfWAsIHtcbiAgICAgIHRyYXk6IHRoaXMsXG4gICAgICBkcmFnZ2FibGVcbiAgICB9LCBvcHRpb25zKTtcbiAgfVxuICBnZXQgY29udGFpbmVyKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgfHwgdGhpcy5vcHRpb25zLmNvbnRhaW5lciB8fCB0aGlzLm9wdGlvbnMucGFyZW50IHx8IHRoaXMuZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gIH1cbn1cblxuZXhwb3J0IHsgQm91bmQsIEJvdW5kVG9BcmMsIEJvdW5kVG9DaXJjbGUsIEJvdW5kVG9FbGVtZW50LCBCb3VuZFRvTGluZSwgQm91bmRUb0xpbmVYLCBCb3VuZFRvTGluZVksIEJvdW5kVG9SZWN0YW5nbGUsIEJ1YmJsaW5nTGlzdCwgRHJhZ2VlRXZlbnQsIERyYWdnYWJsZSwgRXZlbnRFbWl0dGVyLCBGbG9hdExlZnRTdHJhdGVneSwgRmxvYXRSaWdodFN0cmF0ZWd5LCBMaXN0LCBOb3RDcm9zc2luZ1N0cmF0ZWd5LCBQb2ludCwgUmVjdGFuZ2xlLCBTY29wZSwgVHJheSwgZGVmYXVsdFNjb3BlLCBnZXREaXN0YW5jZSwgZ2V0WERpZmZlcmVuY2UsIGdldFlEaWZmZXJlbmNlLCBpbmRleE9mTmVhcmVzdFBvaW50LCBzY29wZSwgc2NvcGVzLCB0cmFuc2Zvcm1lZFNwYWNlRGlzdGFuY2VGYWN0b3J5IH07XG4iLCJpbXBvcnQgeyBQb2ludCB9IGZyb20gJ2RyYWdlZSdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ2xlRGlmZihhbHBoYSwgYmV0YSkge1xuICBjb25zdCBtaW5BbmdsZSA9IE1hdGgubWluKGFscGhhLCBiZXRhKVxuICBjb25zdCBtYXhBbmdsZSA9ICBNYXRoLm1heChhbHBoYSwgYmV0YSlcbiAgcmV0dXJuIE1hdGgubWluKG1heEFuZ2xlIC0gbWluQW5nbGUsIG1pbkFuZ2xlICsgTWF0aC5QSSoyIC0gbWF4QW5nbGUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgY29uc3QgZGlmZiA9IHAyLnN1YihwMSlcbiAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKE1hdGguYXRhbjIoZGlmZi55LCBkaWZmLngpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9SYWRpYW4oYW5nbGUpIHtcbiAgcmV0dXJuICgoYW5nbGUgJSAzNjApICogTWF0aC5QSSAvIDE4MClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGVncmVlKGFuZ2xlKSB7XG4gIHJldHVybiAoYW5nbGUgKiAxODAgLyBNYXRoLlBJKSAlIDM2MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gYm91bmRBbmdsZShtaW4sIG1heCwgdmFsKSB7XG4gIGxldCBkbWluLCBkbWF4XG4gIGlmIChtaW4gPCBtYXggJiYgdmFsID4gbWluICYmIHZhbCA8IG1heCkge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIGlmIChtYXggPCBtaW4gJiYgKHZhbCA8IG1heCB8fCB2YWwgPiBtaW4pKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2Uge1xuICAgIGRtaW4gPSBnZXRBbmdsZURpZmYobWluLCB2YWwpXG4gICAgZG1heCA9IGdldEFuZ2xlRGlmZihtYXgsIHZhbClcbiAgICBpZiAoZG1pbiA8IGRtYXgpIHtcbiAgICAgIHJldHVybiBtaW5cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1heFxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmVhcmVzdEFuZ2xlKGFyciwgYW5nbGUpIHtcbiAgbGV0IGksIHRlbXAsIGRpZmYgPSBNYXRoLlBJICogMiwgdmFsdWVcbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7aSsrKSB7XG4gICAgdGVtcCA9IGdldEFuZ2xlRGlmZihhcnJbaV0sIGFuZ2xlKVxuICAgIGlmIChkaWZmIDwgdGVtcCkge1xuICAgICAgZGlmZiA9IHRlbXBcbiAgICAgIHZhbHVlID0gYXJyW2ldXG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQW5nbGUodmFsKSB7XG4gIHdoaWxlICh2YWwgPCAwKSB7XG4gICAgdmFsICs9IDIgKiBNYXRoLlBJXG4gIH1cbiAgd2hpbGUgKHZhbCA+IDIgKiBNYXRoLlBJKSB7XG4gICAgdmFsIC09IDIgKiBNYXRoLlBJXG4gIH1cbiAgcmV0dXJuIHZhbFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCBsZW5ndGgsIGNlbnRlcikge1xuICBjZW50ZXIgPSBjZW50ZXIgfHwgbmV3IFBvaW50KDAsIDApXG4gIHJldHVybiBjZW50ZXIuYWRkKG5ldyBQb2ludChsZW5ndGggKiBNYXRoLmNvcyhhbmdsZSksIGxlbmd0aCAqIE1hdGguc2luKGFuZ2xlKSkpXG59XG4iLCJpbXBvcnQgY3JlYXRlQ2FudmFzIGZyb20gJy4vdXRpbHMvY3JlYXRlLWNhbnZhcydcbmltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgUG9pbnQsXG4gIFJlY3RhbmdsZSxcbiAgQm91bmRUb0xpbmVcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQgeyBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0gfSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BpZGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBjb25zdCBhcmVhUmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGFyZWEsIGFyZWEpXG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhbmdsZTogMCxcbiAgICAgIGRBbmdsZTogMiAqIE1hdGguUEkgLyBlbGVtZW50cy5sZW5ndGgsXG4gICAgICBjZW50ZXI6IGFyZWFSZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICBzdGFydFJhZGl1czogNTAsXG4gICAgICBlbmRSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGxpbmVXaWR0aDogMixcbiAgICAgIHN0cm9rZVN0eWxlOiAnI2ZmNTU3NycsXG4gICAgICBmaWxsU3R5bGU6ICdyZ2JhKDE1MCwyNTUsNTAsMC44KSdcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5hcmVhID0gYXJlYVxuICAgIHRoaXMuYXJlYVJlY3RhbmdsZSA9IGFyZWFSZWN0YW5nbGVcbiAgICB0aGlzLmluaXQoZWxlbWVudHMpXG4gIH1cblxuICBpbml0KGVsZW1lbnRzKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXModGhpcy5hcmVhLCB0aGlzLmFyZWFSZWN0YW5nbGUpXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgdGhpcy5kcmFnZ2FibGVzID0gZWxlbWVudHMubWFwKChlbGVtZW50LCBpKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9IHRoaXMub3B0aW9ucy5hbmdsZSArIGkgKiB0aGlzLm9wdGlvbnMuZEFuZ2xlXG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IFBvaW50LmVsZW1lbnRTaXplKGVsZW1lbnQpLm11bHQoMC41KVxuICAgICAgY29uc3Qgc3RhcnQgPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oYW5nbGUsIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1cywgdGhpcy5vcHRpb25zLmNlbnRlcikuc3ViKGhhbGZTaXplKVxuICAgICAgY29uc3QgZW5kID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKGFuZ2xlLCB0aGlzLm9wdGlvbnMuZW5kUmFkaXVzLCB0aGlzLm9wdGlvbnMuY2VudGVyKS5zdWIoaGFsZlNpemUpXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvTGluZS5ib3VuZGluZyhzdGFydCwgZW5kKSxcbiAgICAgICAgcG9zaXRpb246IHN0YXJ0LFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgZHJhdygpIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS54LCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55KVxuICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKVxuXG4gICAgbGV0IHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzWzBdLmdldENlbnRlcigpXG4gICAgdGhpcy5jb250ZXh0Lm1vdmVUbyhwb2ludC54LCBwb2ludC55KVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRyYWdnYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBvaW50ID0gdGhpcy5kcmFnZ2FibGVzW2ldLmdldENlbnRlcigpXG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKHBvaW50LngsIHBvaW50LnkpXG4gICAgfVxuICAgIHRoaXMuY29udGV4dC5jbG9zZVBhdGgoKVxuICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSB0aGlzLm9wdGlvbnMubGluZVdpZHRoXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5vcHRpb25zLnN0cm9rZVN0eWxlXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVcbiAgICB0aGlzLmNvbnRleHQuZmlsbCgpXG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIERyYWdnYWJsZSxcbiAgQm91bmRUb0FyYyxcbiAgUmVjdGFuZ2xlLFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQge1xuICBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0sXG4gIGdldEFuZ2xlLFxuICBub3JtYWxpemVBbmdsZVxufSBmcm9tICcuL2dlb21ldHJ5L2FuZ2xlcydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJjU2xpZGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoYXJlYSwgZWxlbWVudCwgb3B0aW9ucz17fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgY29uc3QgYXJlYVJlY3RhbmdsZSA9IFJlY3RhbmdsZS5mcm9tRWxlbWVudChhcmVhLCBhcmVhKVxuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiBhcmVhUmVjdGFuZ2xlLmdldENlbnRlcigpLFxuICAgICAgcmFkaXVzOiBhcmVhUmVjdGFuZ2xlLmdldE1pblNpZGUoKSAvIDIsXG4gICAgICBzdGFydEFuZ2xlOiBNYXRoLlBJLFxuICAgICAgZW5kQW5nbGU6IDAsXG4gICAgICBhbmdsZXM6IFtNYXRoLlBJLCAtTWF0aC5QSSAvIDQsIDAsIE1hdGguUEkgLyA0LCBNYXRoLlBJIC8gMl0sXG4gICAgICB0aW1lOiA1MDBcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgdGhpcy5zaGlmdGVkQ2VudGVyID0gdGhpcy5vcHRpb25zLmNlbnRlclxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmluaXQoZWxlbWVudClcbiAgfVxuXG4gIGluaXQoZWxlbWVudCkge1xuICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLnN0YXJ0QW5nbGVcbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgIGFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcblxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgIHRoaXMuZHJhZ2dhYmxlID0gbmV3IERyYWdnYWJsZShlbGVtZW50LCB7XG4gICAgICBjb250YWluZXI6IHRoaXMuYXJlYSxcbiAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICB0aGlzLnNoaWZ0ZWRDZW50ZXIsXG4gICAgICAgIHRoaXMub3B0aW9ucy5yYWRpdXMsXG4gICAgICAgIHRoaXMub3B0aW9ucy5zdGFydEFuZ2xlLFxuICAgICAgICB0aGlzLm9wdGlvbnMuZW5kQW5nbGVcbiAgICAgICksXG4gICAgICBwb3NpdGlvbjogcG9zaXRpb24sXG4gICAgICBvbjoge1xuICAgICAgICAnZHJhZzptb3ZlJzogKCkgPT4gdGhpcy5jaGFuZ2UoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICB1cGRhdGVBbmdsZSgpIHtcbiAgICB0aGlzLmFuZ2xlID0gZ2V0QW5nbGUodGhpcy5zaGlmdGVkQ2VudGVyLCB0aGlzLmRyYWdnYWJsZS5wb3NpdGlvbilcbiAgfVxuXG4gIGNoYW5nZSgpIHtcbiAgICB0aGlzLnVwZGF0ZUFuZ2xlKClcbiAgICAvLyAgICAgIHZhciBhbmdsZSA9IEdlb21ldHJ5LmdldE5lYXJlc3RBbmdsZSh0aGlzLm9wdGlvbnMuYW5nbGVzLCB0aGlzLmFuZ2xlKTtcbiAgICAvLyAgICAgIHRoaXMuc2V0QW5nbGUoYW5nbGUsdGhpcy5vcHRpb25zLnRpbWUpO1xuICAgIHRoaXMuZW1pdCgnYXJjc2xpZGVyOmNoYW5nZScsIHsgYXJjU2xpZGVyOiB0aGlzLCBhbmdsZTogdGhpcy5hbmdsZSB9KVxuICB9XG5cbiAgc2V0QW5nbGUoYW5nbGUsIHRpbWUpIHtcbiAgICB0aGlzLmFuZ2xlID0gbm9ybWFsaXplQW5nbGUoYW5nbGUpXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRQb2ludEZyb21SYWRpYWxTeXN0ZW0oXG4gICAgICB0aGlzLmFuZ2xlLFxuICAgICAgdGhpcy5vcHRpb25zLnJhZGl1cyxcbiAgICAgIHRoaXMuc2hpZnRlZENlbnRlclxuICAgIClcbiAgICB0aGlzLmRyYWdnYWJsZS5waW5Qb3NpdGlvbihwb3NpdGlvbiwgeyBkdXJhdGlvbjogdGltZSB8fCAwIH0pXG4gICAgdGhpcy5lbWl0KCdhcmNzbGlkZXI6Y2hhbmdlJywgeyBhcmNTbGlkZXI6IHRoaXMsIGFuZ2xlOiB0aGlzLmFuZ2xlIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzdG9wID0gc3RhcnRcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAodHlwZW9mIHN0ZXAgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgc3RlcCA9IDFcbiAgfVxuICBpZiAoKHN0ZXAgPiAwICYmIHN0YXJ0ID49IHN0b3ApIHx8IChzdGVwIDwgMCAmJiBzdGFydCA8PSBzdG9wKSkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIGZvciAobGV0IGkgPSBzdGFydDsgc3RlcCA+IDAgPyBpIDwgc3RvcCA6IGkgPiBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICByZXN1bHQucHVzaChpKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cbiIsImltcG9ydCBjcmVhdGVDYW52YXMgZnJvbSAnLi91dGlscy9jcmVhdGUtY2FudmFzJ1xuaW1wb3J0IHJhbmdlIGZyb20gJy4vdXRpbHMvcmFuZ2UnXG5pbXBvcnQge1xuICBEcmFnZ2FibGUsXG4gIEJvdW5kVG9BcmMsXG4gIFBvaW50LFxuICBSZWN0YW5nbGUsXG4gIEV2ZW50RW1pdHRlcixcbiAgZ2V0RGlzdGFuY2Vcbn0gZnJvbSAnZHJhZ2VlJ1xuXG5pbXBvcnQge1xuICB0b1JhZGlhbixcbiAgZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtLFxuICBnZXRBbmdsZSxcbiAgbm9ybWFsaXplQW5nbGVcbn0gZnJvbSAnLi9nZW9tZXRyeS9hbmdsZXMnXG5cbmNvbnN0IHJuZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKjI1NSlcbn1cblxuY29uc3QgdG9IZXhTdHJpbmcgPSBmdW5jdGlvbihkaWdpdCkge1xuICBsZXQgc3RyID0gZGlnaXQudG9TdHJpbmcoMTYpXG4gIHdoaWxlIChzdHIubGVuZ3RoIDwgMikge1xuICAgIHN0ciA9ICcwJyArIHN0clxuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gcmFuZG9tQ29sb3IoKSB7XG4gIHJldHVybiBgIyR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfSR7dG9IZXhTdHJpbmcocm5kKCkpfWBcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzKGluZGV4LCBsZW5ndGgpIHtcbiAgY29uc3QgcmV0SW5kZXhlcyA9IFtdXG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICByZXRJbmRleGVzLnB1c2goaW5kZXgpXG4gICAgcmV0SW5kZXhlcy5wdXNoKChpbmRleCArIDEpICUgbGVuZ3RoKVxuICB9XG5cbiAgcmV0dXJuIHJldEluZGV4ZXNcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvciAoYXJlYSwgZWxlbWVudHMsIG9wdGlvbnM9e30pIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIGNvbnN0IGFyZWFSZWN0YW5nbGUgPSBSZWN0YW5nbGUuZnJvbUVsZW1lbnQoYXJlYSwgYXJlYSlcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNlbnRlcjogYXJlYVJlY3RhbmdsZS5nZXRDZW50ZXIoKSxcbiAgICAgIHJhZGl1czogYXJlYVJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgdG91Y2hSYWRpdXM6IGFyZWFSZWN0YW5nbGUuZ2V0TWluU2lkZSgpIC8gMixcbiAgICAgIGJvdW5kQW5nbGU6IE1hdGguUEkgLyA5LFxuICAgICAgZmlsbFN0eWxlczogcmFuZ2UoMCwgZWxlbWVudHMubGVuZ3RoKS5tYXAoKCkgPT4gcmFuZG9tQ29sb3IoKSksXG4gICAgICBpbml0QW5nbGVzOiByYW5nZSgtOTAsIDI3MCwgMzYwIC8gZWxlbWVudHMubGVuZ3RoKS5tYXAoKGFuZ2xlKSA9PiB0b1JhZGlhbihhbmdsZSkpLFxuICAgICAgbGltaXRJbWc6IG51bGwsXG4gICAgICBsaW1pdEltZ09mZnNldDogbmV3IFBvaW50KDAsIDApXG4gICAgfSwgb3B0aW9ucylcblxuICAgIHRoaXMuYXJlYSA9IGFyZWFcbiAgICB0aGlzLmFyZWFSZWN0YW5nbGUgPSBhcmVhUmVjdGFuZ2xlXG4gICAgdGhpcy5pbml0KGVsZW1lbnRzKVxuICB9XG5cbiAgaW5pdChlbGVtZW50cykge1xuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKHRoaXMuYXJlYSwgdGhpcy5hcmVhUmVjdGFuZ2xlKVxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLmRyYWdnYWJsZXMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5vcHRpb25zLmluaXRBbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gUG9pbnQuZWxlbWVudFNpemUoZWxlbWVudCkubXVsdCgwLjUpXG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGdldFBvaW50RnJvbVJhZGlhbFN5c3RlbShcbiAgICAgICAgYW5nbGUsXG4gICAgICAgIHRoaXMub3B0aW9ucy50b3VjaFJhZGl1cyxcbiAgICAgICAgdGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBuZXcgRHJhZ2dhYmxlKGVsZW1lbnQsIHtcbiAgICAgICAgY29udGFpbmVyOiB0aGlzLmFyZWEsXG4gICAgICAgIGJvdW5kOiBCb3VuZFRvQXJjLmJvdW5kaW5nKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5jZW50ZXIuc3ViKGhhbGZTaXplKSxcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudG91Y2hSYWRpdXMsXG4gICAgICAgICAgdGhpcy5nZXRCb3VuZEFuZ2xlKGksIGZhbHNlKSxcbiAgICAgICAgICB0aGlzLmdldEJvdW5kQW5nbGUoaSwgdHJ1ZSlcbiAgICAgICAgKSxcbiAgICAgICAgcG9zaXRpb246IHBvc2l0aW9uLFxuICAgICAgICBvbjoge1xuICAgICAgICAgICdkcmFnOm1vdmUnOiAoKSA9PiB0aGlzLmRyYXcoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB0aGlzLmlzSW5pdCA9IHRydWVcbiAgICB0aGlzLmRyYXcoKVxuICB9XG5cbiAgdXBkYXRlQW5nbGVzKCkge1xuICAgIHRoaXMuYW5nbGVzID0gdGhpcy5kcmFnZ2FibGVzLm1hcCgoZHJhZ2dhYmxlKSA9PiB7XG4gICAgICBjb25zdCBoYWxmU2l6ZSA9IGRyYWdnYWJsZS5nZXRTaXplKCkubXVsdCgwLjUpXG4gICAgICByZXR1cm4gZ2V0QW5nbGUodGhpcy5vcHRpb25zLmNlbnRlci5zdWIoaGFsZlNpemUpLCBkcmFnZ2FibGUucG9zaXRpb24pXG4gICAgfSlcbiAgfVxuXG4gIGdldEJvdW5kQW5nbGUoaW5kZXgsIGlzQ2xvc3NpbmcpIHtcbiAgICBjb25zdCBzaWduID0gaXNDbG9zc2luZyA/IDEgOiAtMVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGxldCBpID0gKGluZGV4ICsgc2lnbikgJSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICBpICs9IHRoaXMuYW5nbGVzLmxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZUFuZ2xlKHRoaXMuYW5nbGVzW2ldIC0gc2lnbiAqIHRoaXMub3B0aW9ucy5ib3VuZEFuZ2xlKVxuICAgIH1cbiAgfVxuXG4gIGRyYXcoKSB7XG4gICAgaWYgKCF0aGlzLmlzSW5pdCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVBbmdsZXMoKVxuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueCwgdGhpcy5hcmVhUmVjdGFuZ2xlLnNpemUueSlcbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0FyYyh0aGlzLmNvbnRleHQsIHRoaXMub3B0aW9ucy5jZW50ZXIsIHRoaXMub3B0aW9ucy5yYWRpdXMsIGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmRyYWdnYWJsZXMuZm9yRWFjaCgoX2RyYWdnYWJsZSwgaW5kZXgpID0+IHtcbiAgICAgIHRoaXMuZHJhd0xpbWl0SW1nKGluZGV4KVxuICAgIH0pXG5cbiAgICB0aGlzLmVtaXQoJ2NoYXJ0OmRyYXcnLCB7IGNoYXJ0OiB0aGlzIH0pXG4gIH1cblxuICBjcmVhdGVDbG9uZShlbGVtZW50LCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoIXRoaXMuaXNJbml0KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgcmVjdGFuZ2xlID0gUmVjdGFuZ2xlLmZyb21FbGVtZW50KGVsZW1lbnQsIGVsZW1lbnQpXG4gICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2VudGVyOiByZWN0YW5nbGUuZ2V0Q2VudGVyKCksXG4gICAgICByYWRpdXM6IHJlY3RhbmdsZS5nZXRNaW5TaWRlKCkgLyAyLFxuICAgICAgZmlsbFN0eWxlczogdGhpcy5vcHRpb25zLmZpbGxTdHlsZXNcbiAgICB9LCBvcHRpb25zKVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKGVsZW1lbnQsIHJlY3RhbmdsZSlcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb25zdCBjbG9uZU9iaiA9IHtcbiAgICAgIGRyYXc6ICgpID0+IHtcbiAgICAgICAgY29udGV4dC5jbGVhclJlY3QoMCwgMCwgcmVjdGFuZ2xlLnNpemUueCwgcmVjdGFuZ2xlLnNpemUueSlcbiAgICAgICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKF9kcmFnZ2FibGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgdGhpcy5kcmF3QXJjKGNvbnRleHQsIG9wdHMuY2VudGVyLCBvcHRzLnJhZGl1cywgaW5kZXgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGNsb25lT2JqLmRyYXcoKVxuICAgIHJldHVybiBjbG9uZU9ialxuICB9XG5cbiAgZ2V0RmlsbFN0eWxlKGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XSA9IHRoaXMub3B0aW9ucy5maWxsU3R5bGVzW2luZGV4XS5jYWxsKHRoaXMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZmlsbFN0eWxlc1tpbmRleF1cbiAgfVxuXG4gIGRyYXdBcmMoY29udGV4dCwgY2VudGVyLCByYWRpdXMsIGluZGV4KSB7XG4gICAgY29uc3Qgc3RhcnRBbmdsZSA9IHRoaXMuYW5nbGVzW2luZGV4XVxuICAgIGNvbnN0IGVuZEFuZ2xlID0gdGhpcy5hbmdsZXNbKGluZGV4KzEpICUgdGhpcy5hbmdsZXMubGVuZ3RoXVxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRGaWxsU3R5bGUoaW5kZXgpXG5cbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpXG4gICAgY29udGV4dC5tb3ZlVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuYXJjKGNlbnRlci54LCBjZW50ZXIueSwgcmFkaXVzLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgZmFsc2UpXG4gICAgY29udGV4dC5saW5lVG8oY2VudGVyLngsIGNlbnRlci55KVxuICAgIGNvbnRleHQuY2xvc2VQYXRoKClcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yXG4gICAgY29udGV4dC5maWxsKClcbiAgfVxuXG4gIGRyYXdMaW1pdEltZyhpbmRleCkge1xuICAgIGxldCBwb2ludCwgaW1nXG4gICAgaWYgKHRoaXMub3B0aW9ucy5saW1pdEltZykge1xuICAgICAgaW1nID0gdGhpcy5vcHRpb25zLmxpbWl0SW1nIGluc3RhbmNlb2YgQXJyYXkgPyB0aGlzLm9wdGlvbnMubGltaXRJbWdbaW5kZXhdIDogdGhpcy5vcHRpb25zLmxpbWl0SW1nXG4gICAgfVxuXG4gICAgaWYgKGltZykge1xuICAgICAgY29uc3QgYW5nbGUgPSBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpbmRleF0pXG4gICAgICBwb2ludCA9IG5ldyBQb2ludCgwLCAtaW1nLmhlaWdodCAvIDIpXG4gICAgICBwb2ludCA9IHBvaW50LmFkZCh0aGlzLm9wdGlvbnMubGltaXRJbWdPZmZzZXQpXG4gICAgICB0aGlzLmNvbnRleHQudHJhbnNsYXRlKHRoaXMuYXJlYVJlY3RhbmdsZS5zaXplLnggLyAyLCB0aGlzLmFyZWFSZWN0YW5nbGUuc2l6ZS55IC8gMilcbiAgICAgIHRoaXMuY29udGV4dC5yb3RhdGUoYW5nbGUpXG4gICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKGltZywgcG9pbnQueCwgcG9pbnQueSlcbiAgICAgIHRoaXMuY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMClcbiAgICB9XG4gIH1cblxuICBnZXRBbmdsZXNEaWZmKCkge1xuICAgIGNvbnN0IGFuZ2xlcyA9IHRoaXMuYW5nbGVzLnNsaWNlKDEpXG4gICAgbGV0IGJhc2VBbmdsZSA9IHRoaXMuYW5nbGVzWzBdXG5cbiAgICBhbmdsZXMucHVzaChiYXNlQW5nbGUpXG4gICAgcmV0dXJuIGFuZ2xlcy5tYXAoKGFuZ2xlKSA9PiB7XG4gICAgICBjb25zdCBkaWZmQW5nbGUgPSBub3JtYWxpemVBbmdsZShhbmdsZSAtIGJhc2VBbmdsZSlcbiAgICAgIGJhc2VBbmdsZSA9IGFuZ2xlXG4gICAgICByZXR1cm4gZGlmZkFuZ2xlXG4gICAgfSlcbiAgfVxuXG4gIGdldFBlcmNlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QW5nbGVzRGlmZigpLm1hcCgoZGlmZkFuZ2xlKSA9PiBkaWZmQW5nbGUgLyAoMiAqIE1hdGguUEkpKVxuICB9XG5cbiAgZ2V0QXJjQmlzZWN0cml4cygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRBbmdsZXNEaWZmKCkubWFwKChkaWZmQW5nbGUsIGkpID0+IHtcbiAgICAgIHJldHVybiBub3JtYWxpemVBbmdsZSh0aGlzLmFuZ2xlc1tpXSArIGRpZmZBbmdsZSAvIDIpXG4gICAgfSlcbiAgfVxuXG4gIGdldEFyY09uUG9pbnQocG9pbnQpIHtcbiAgICBjb25zdCBhbmdsZSA9IGdldEFuZ2xlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuICAgIGNvbnN0IHJhZGl1cyA9IGdldERpc3RhbmNlKHRoaXMub3B0aW9ucy5jZW50ZXIsIHBvaW50KVxuXG4gICAgaWYgKHJhZGl1cyA+IHRoaXMub3B0aW9ucy5yYWRpdXMpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGxldCBvZmZzZXQgPSAtMSwgaSwgalxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmFuZ2xlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG9mZnNldCA9PT0gLTEgfHwgdGhpcy5hbmdsZXNbb2Zmc2V0XSA+IHRoaXMuYW5nbGVzW2ldKSB7XG4gICAgICAgIG9mZnNldCA9IGlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChpID0gMCwgaiA9IG9mZnNldDsgaSA8IHRoaXMuYW5nbGVzLmxlbmd0aDsgaSsrLCBqID0gKGkgKyBvZmZzZXQpICUgdGhpcy5hbmdsZXMubGVuZ3RoKSB7XG4gICAgICBpZiAoYW5nbGUgPCB0aGlzLmFuZ2xlc1tqXSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoLS1qIDwgMCkge1xuICAgICAgaiArPSB0aGlzLmFuZ2xlcy5sZW5ndGhcbiAgICB9XG4gICAgcmV0dXJuIGpcbiAgfVxuXG4gIHNldEFuZ2xlcyhhbmdsZXMpIHtcbiAgICB0aGlzLmFuZ2xlcyA9IGFuZ2xlc1xuICAgIHRoaXMuZHJhZ2dhYmxlcy5mb3JFYWNoKChkcmFnZ2FibGUsIGkpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gdGhpcy5hbmdsZXNbaV1cbiAgICAgIGNvbnN0IGhhbGZTaXplID0gZHJhZ2dhYmxlLmdldFNpemUoKS5tdWx0KDAuNSlcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0UG9pbnRGcm9tUmFkaWFsU3lzdGVtKFxuICAgICAgICBhbmdsZSxcbiAgICAgICAgdGhpcy5vcHRpb25zLnRvdWNoUmFkaXVzLFxuICAgICAgICB0aGlzLm9wdGlvbnMuY2VudGVyLnN1YihoYWxmU2l6ZSlcbiAgICAgIClcblxuICAgICAgZHJhZ2dhYmxlLnBpblBvc2l0aW9uKHBvc2l0aW9uKVxuICAgIH0pXG4gICAgdGhpcy5kcmF3KClcbiAgfVxuXG4gIHNldEFjdGl2ZUFyYyhpbmRleCkge1xuICAgIGNvbnN0IGVuYWJsZUluZGV4ZXMgPSBnZXRBcnJheVdpdGhCb3VuZEluZGV4ZXMoaW5kZXgsIHRoaXMuZHJhZ2dhYmxlcy5sZW5ndGgpXG4gICAgdGhpcy5hY3RpdmVBcmNJbmRleCA9IGluZGV4XG4gICAgdGhpcy5kcmFnZ2FibGVzLmZvckVhY2goKGRyYWdnYWJsZSwgaSkgPT4ge1xuICAgICAgZHJhZ2dhYmxlLmVuYWJsZSA9IGVuYWJsZUluZGV4ZXMuaW5kZXhPZihpKSAhPT0gLTFcbiAgICB9KVxuICAgIHRoaXMuZHJhdygpXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJzZXRTdHlsZSIsImVsZW1lbnQiLCJzdHlsZSIsImNzc1RleHQiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImFwcGVuZEZpcnN0Q2hpbGQiLCJub2RlIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiY3JlYXRlQ2FudmFzIiwiYXJlYSIsInJlY3RhZ2xlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBvc2l0aW9uIiwic2V0QXR0cmlidXRlIiwic2l6ZSIsIngiLCJ5IiwibGVmdCIsInRvcCIsIndpZHRoIiwiaGVpZ2h0IiwiZ2V0QW5nbGUiLCJub3JtYWxpemVBbmdsZSIsImdldFBvaW50RnJvbVJhZGlhbFN5c3RlbSIsInAxIiwicDIiLCJkaWZmIiwic3ViIiwiTWF0aCIsImF0YW4yIiwidG9SYWRpYW4iLCJhbmdsZSIsIlBJIiwidmFsIiwibGVuZ3RoIiwiY2VudGVyIiwiUG9pbnQiLCJhZGQiLCJjb3MiLCJzaW4iLCJTcGlkZXIiLCJjb25zdHJ1Y3RvciIsImVsZW1lbnRzIiwib3B0aW9ucyIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImFyZWFSZWN0YW5nbGUiLCJSZWN0YW5nbGUiLCJmcm9tRWxlbWVudCIsIk9iamVjdCIsImFzc2lnbiIsImRBbmdsZSIsImdldENlbnRlciIsInN0YXJ0UmFkaXVzIiwiZW5kUmFkaXVzIiwiZ2V0TWluU2lkZSIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiZmlsbFN0eWxlIiwiaW5pdCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZHJhZ2dhYmxlcyIsIm1hcCIsImkiLCJoYWxmU2l6ZSIsImVsZW1lbnRTaXplIiwibXVsdCIsInN0YXJ0IiwiZW5kIiwiRHJhZ2dhYmxlIiwiY29udGFpbmVyIiwiYm91bmQiLCJCb3VuZFRvTGluZSIsImJvdW5kaW5nIiwib24iLCJkcmFnOm1vdmUiLCJkcmF3IiwiaXNJbml0IiwiY2xlYXJSZWN0IiwiYmVnaW5QYXRoIiwicG9pbnQiLCJtb3ZlVG8iLCJsaW5lVG8iLCJjbG9zZVBhdGgiLCJzdHJva2UiLCJmaWxsIiwiQXJjU2xpZGVyIiwiRXZlbnRFbWl0dGVyIiwicmFkaXVzIiwic3RhcnRBbmdsZSIsImVuZEFuZ2xlIiwiYW5nbGVzIiwidGltZSIsInNoaWZ0ZWRDZW50ZXIiLCJkcmFnZ2FibGUiLCJCb3VuZFRvQXJjIiwiY2hhbmdlIiwidXBkYXRlQW5nbGUiLCJlbWl0IiwiYXJjU2xpZGVyIiwic2V0QW5nbGUiLCJwaW5Qb3NpdGlvbiIsImR1cmF0aW9uIiwicmFuZ2UiLCJzdG9wIiwic3RlcCIsInJlc3VsdCIsInB1c2giLCJybmQiLCJyb3VuZCIsInJhbmRvbSIsInRvSGV4U3RyaW5nIiwiZGlnaXQiLCJzdHIiLCJ0b1N0cmluZyIsInJhbmRvbUNvbG9yIiwiZ2V0QXJyYXlXaXRoQm91bmRJbmRleGVzIiwiaW5kZXgiLCJyZXRJbmRleGVzIiwiQ2hhcnQiLCJ0b3VjaFJhZGl1cyIsImJvdW5kQW5nbGUiLCJmaWxsU3R5bGVzIiwiaW5pdEFuZ2xlcyIsImxpbWl0SW1nIiwibGltaXRJbWdPZmZzZXQiLCJnZXRCb3VuZEFuZ2xlIiwidXBkYXRlQW5nbGVzIiwiZ2V0U2l6ZSIsImlzQ2xvc3NpbmciLCJzaWduIiwiZm9yRWFjaCIsIl9kcmFnZ2FibGUiLCJkcmF3QXJjIiwiZHJhd0xpbWl0SW1nIiwiY2hhcnQiLCJjcmVhdGVDbG9uZSIsInJlY3RhbmdsZSIsIm9wdHMiLCJjbG9uZU9iaiIsImdldEZpbGxTdHlsZSIsImNhbGwiLCJjb2xvciIsImFyYyIsImltZyIsIkFycmF5IiwidHJhbnNsYXRlIiwicm90YXRlIiwiZHJhd0ltYWdlIiwic2V0VHJhbnNmb3JtIiwiZ2V0QW5nbGVzRGlmZiIsInNsaWNlIiwiYmFzZUFuZ2xlIiwiZGlmZkFuZ2xlIiwiZ2V0UGVyY2VudCIsImdldEFyY0Jpc2VjdHJpeHMiLCJnZXRBcmNPblBvaW50IiwiZ2V0RGlzdGFuY2UiLCJvZmZzZXQiLCJqIiwic2V0QW5nbGVzIiwic2V0QWN0aXZlQXJjIiwiZW5hYmxlSW5kZXhlcyIsImFjdGl2ZUFyY0luZGV4IiwiZW5hYmxlIiwiaW5kZXhPZiJdLCJtYXBwaW5ncyI6Ijs7O0VBQUEsU0FBU0EsUUFBUUEsQ0FBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUU7RUFDaENBLEVBQUFBLEtBQUssR0FBR0EsS0FBSyxJQUFJLEVBQUU7SUFDbkIsSUFBSUMsT0FBTyxHQUFHLEVBQUU7RUFDaEIsRUFBQSxLQUFLLE1BQU1DLEdBQUcsSUFBSUYsS0FBSyxFQUFFO0VBQ3ZCLElBQUEsSUFBSUEsS0FBSyxDQUFDRyxjQUFjLENBQUNELEdBQUcsQ0FBQyxFQUFFO1FBQzdCRCxPQUFPLElBQUlDLEdBQUcsR0FBRyxJQUFJLEdBQUdGLEtBQUssQ0FBQ0UsR0FBRyxDQUFDLEdBQUcsSUFBSTtFQUMzQztFQUNGO0VBRUFILEVBQUFBLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLEdBQUdBLE9BQU87RUFDakM7RUFFQSxTQUFTRyxnQkFBZ0JBLENBQUNMLE9BQU8sRUFBRU0sSUFBSSxFQUFFO0lBQ3ZDLElBQUlOLE9BQU8sQ0FBQ08sVUFBVSxFQUFFO01BQ3RCUCxPQUFPLENBQUNRLFlBQVksQ0FBQ0YsSUFBSSxFQUFFTixPQUFPLENBQUNPLFVBQVUsQ0FBQztFQUNoRCxHQUFDLE1BQU07RUFDTFAsSUFBQUEsT0FBTyxDQUFDUyxXQUFXLENBQUNILElBQUksQ0FBQztFQUMzQjtFQUNGO0VBRWUsU0FBU0ksWUFBWUEsQ0FBQ0MsSUFBSSxF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SSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDcEU7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNqRDtFQUNBLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRTtFQUNYLElBQUksTUFBTSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0SCxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO0VBQ3hMLElBQUksT0FBTyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0VBQ3hDO0VBQ0EsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFO0VBQ1osSUFBSSxNQUFNLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RILElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFDeEwsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO0VBQ3BDLE1BQU0sT0FBTyxJQUFJO0VBQ2pCO0VBQ0EsSUFBSSxPQUFPLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7RUFDeEM7RUFDQSxFQUFFLFlBQVksQ0FBQyxDQUFDLEVBQUU7RUFDbEIsSUFBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENB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QyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7RUFDOUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7RUFDbkIsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDMUI7RUFDQTtFQUNBLFNBQVMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzlCLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1QyxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ25DLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0VBQ3JDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxHQUFHO0VBQ25CLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDbEQ7RUFDQSxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFO0VBQ2xELEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxQixFQUFFLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7RUFDMUIsRUFBRSxNQUFNLE9BQU8sR0FBRyxNQUFNLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDaEQsRUFBRSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUM7RUFDOUQ7O0VBcUpBLFNBQVMsWUFBWSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7RUFDbkMsRUFBRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7RUFDeEMsRUFBRSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7RUFDeEMsRUFBRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFFBQVEsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDO0VBQ3pFO0VBQ0EsU0FBU2MsVUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7RUFDMUIsRUFBRSxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUN6QixFQUFFLE9BQU9DLGdCQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuRDtFQUNBLFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0VBQ25DLEVBQUUsSUFBSSxJQUFJLEVBQUUsSUFBSTtFQUNoQixFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEVBQUU7RUFDM0MsSUFBSSxPQUFPLEdBQUc7RUFDZCxHQUFHLE1BQU0sSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0VBQ3BELElBQUksT0FBTyxHQUFHO0VBQ2QsR0FBRyxNQUFNO0VBQ1QsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDakMsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDakMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7RUFDckIsTUFBTSxPQUFPLEdBQUc7RUFDaEIsS0FBSyxNQUFNO0VBQ1gsTUFBTSxPQUFPLEdBQUc7RUFDaEI7RUFDQTtFQUNBO0VBQ0EsU0FBU0EsZ0JBQWMsQ0FBQyxHQUFHLEVBQUU7RUFDN0IsRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLEVBQUU7RUFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFO0VBQ3RCO0VBQ0EsRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRTtFQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUU7RUFDdEI7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaO0VBQ0EsU0FBU0MsMEJBQXdCLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7RUFDekQsRUFBRSxNQUFNLEdBQUcsTUFBTSxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEMsRUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUNsRjs7RUFFQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsV0FBVyxHQUFHO0VBQ2hCLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7RUFDdEIsSUFBSSxPQUFPLEtBQUs7RUFDaEI7RUFDQSxFQUFFLE9BQU8sR0FBRztFQUNaLEVBQUUsT0FBTyxRQUFRLEdBQUc7RUFDcEIsSUFBSSxNQUFNLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztFQUMzQyxJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQ3hDO0VBQ0E7RUF3RUEsTUFBTSxXQUFXLFNBQVMsS0FBSyxDQUFDO0VBQ2hDLEVBQUUsV0FBVyxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUU7RUFDcEMsSUFBSSxLQUFLLEVBQUU7RUFDWCxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVTtFQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUTtFQUM1QixJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztFQUNsRixJQUFJLE1BQU0sSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7RUFDbkIsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO0VBQ2pDLElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztFQUNqQztFQUNBLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7RUFDckIsSUFBSSxNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztFQUN0RyxJQUFJLE1BQU0sV0FBVyxHQUFHLHNCQUFzQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ3RGLElBQUksTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO0VBQ3ZGLElBQUksT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDO0VBQ25FO0VBQ0E7RUFDQSxNQUFNLGFBQWEsU0FBUyxLQUFLLENBQUM7RUFDbEMsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTtFQUM5QixJQUFJLEtBQUssRUFBRTtFQUNYLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO0VBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNO0VBQ3hCO0VBQ0EsRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtFQUN0QixJQUFJLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztFQUNsRTtFQUNBO0VBQ0EsTUFBTSxVQUFVLFNBQVMsYUFBYSxDQUFDO0VBQ3ZDLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRTtFQUNwRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0VBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVO0VBQ2pDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRO0VBQzdCO0VBQ0EsRUFBRSxVQUFVLEdBQUc7RUFDZixJQUFJLE9BQU8sT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVc7RUFDekY7RUFDQSxFQUFFLFFBQVEsR0FBRztFQUNiLElBQUksT0FBTyxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUztFQUNuRjtFQUNBLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7RUFDdEIsSUFBSSxJQUFJLEtBQUssR0FBR0YsVUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0VBQzVDLElBQUksS0FBSyxHQUFHQyxnQkFBYyxDQUFDLEtBQUssQ0FBQztFQUNqQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxLQUFLLENBQUM7RUFDakUsSUFBSSxPQUFPQywwQkFBd0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3BFO0VBQ0E7O0VDNW5ETyxTQUFTRixRQUFRQSxDQUFDRyxFQUFFLEVBQUVDLEVBQUUsRUFBRTtFQUMvQixFQUFBLE1BQU1DLElBQUksR0FBR0QsRUFBRSxDQUFDRSxHQUFHLENBQUNILEVBQUUsQ0FBQztFQUN2QixFQUFBLE9BQU9GLGNBQWMsQ0FBQ00sSUFBSSxDQUFDQyxLQUFLLENBQUNILElBQUksQ0FBQ1YsQ0FBQyxFQUFFVSxJQUFJLENBQUNYLENBQUMsQ0FBQyxDQUFDO0VBQ25EO0VBRU8sU0FBU2UsUUFBUUEsQ0FBQ0MsS0FBSyxFQUFFO0lBQzlCLE9BQVNBLEtBQUssR0FBRyxHQUFHLEdBQUlILElBQUksQ0FBQ0ksRUFBRSxHQUFHLEdBQUc7RUFDdkM7RUFtQ08sU0FBU1YsY0FBY0EsQ0FBQ1csR0FBRyxFQUFFO0lBQ2xDLE9BQU9BLEdBQUcsR0FBRyxDQUFDLEVBQUU7RUFDZEEsSUFBQUEsR0FBRyxJQUFJLENBQUMsR0FBR0wsSUFBSSxDQUFDSSxFQUFFO0VBQ3BCO0VBQ0EsRUFBQSxPQUFPQyxHQUFHLEdBQUcsQ0FBQyxHQUFHTCxJQUFJLENBQUNJLEVBQUUsRUFBRTtFQUN4QkMsSUFBQUEsR0FBRyxJQUFJLENBQUMsR0FBR0wsSUFBSSxDQUFDSSxFQUFFO0VBQ3BCO0VBQ0EsRUFBQSxPQUFPQyxHQUFHO0VBQ1o7RUFFTyxTQUFTVix3QkFBd0JBLENBQUNRLEtBQUssRUFBRUcsTUFBTSxFQUFFQyxNQUFNLEVBQUU7SUFDOURBLE1BQU0sR0FBR0EsTUFBTSxJQUFJLElBQUlDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLE9BQU9ELE1BQU0sQ0FBQ0UsR0FBRyxDQUFDLElBQUlELEtBQUssQ0FBQ0YsTUFBTSxHQUFHTixJQUFJLENBQUNVLEdBQUcsQ0FBQ1AsS0FBSyxDQUFDLEVBQUVHLE1BQU0sR0FBR04sSUFBSSxDQUFDVyxHQUFHLENBQUNSLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDbEY7O0VDckRlLE1BQU1TLE1BQU0sQ0FBQztFQUMxQkMsRUFBQUEsV0FBV0EsQ0FBQ3BDLElBQUksRUFBRXFDLFFBQVEsRUFBYztFQUFBLElBQUEsSUFBWkMsT0FBTyxHQUFBQyxTQUFBLENBQUFWLE1BQUEsR0FBQSxDQUFBLElBQUFVLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUMsRUFBRTtNQUNwQyxNQUFNRSxhQUFhLEdBQUdDLFNBQVMsQ0FBQ0MsV0FBVyxDQUFDM0MsSUFBSSxFQUFFQSxJQUFJLENBQUM7RUFDdkQsSUFBQSxJQUFJLENBQUNzQyxPQUFPLEdBQUdNLE1BQU0sQ0FBQ0MsTUFBTSxDQUFDO0VBQzNCbkIsTUFBQUEsS0FBSyxFQUFFLENBQUM7UUFDUm9CLE1BQU0sRUFBRSxDQUFDLEdBQUd2QixJQUFJLENBQUNJLEVBQUUsR0FBR1UsUUFBUSxDQUFDUixNQUFNO0VBQ3JDQyxNQUFBQSxNQUFNLEVBQUVXLGFBQWEsQ0FBQ00sU0FBUyxFQUFFO0VBQ2pDQyxNQUFBQSxXQUFXLEVBQUUsRUFBRTtFQUNmQyxNQUFBQSxTQUFTLEVBQUVSLGFBQWEsQ0FBQ1MsVUFBVSxFQUFFLEdBQUcsQ0FBQztFQUN6Q0MsTUFBQUEsU0FBUyxFQUFFLENBQUM7RUFDWkMsTUFBQUEsV0FBVyxFQUFFLFNBQVM7RUFDdEJDLE1BQUFBLFNBQVMsRUFBRTtPQUNaLEVBQUVmLE9BQU8sQ0FBQztNQUVYLElBQUksQ0FBQ3RDLElBQUksR0FBR0EsSUFBSTtNQUNoQixJQUFJLENBQUN5QyxhQUFhLEdBQUdBLGFBQWE7RUFDbEMsSUFBQSxJQUFJLENBQUNhLElBQUksQ0FBQ2pCLFFBQVEsQ0FBQztFQUNyQjtJQUVBaUIsSUFBSUEsQ0FBQ2pCLFFBQVEsRUFBRTtFQUNiLElBQUEsSUFBSSxDQUFDbkMsTUFBTSxHQUFHSCxZQUFZLENBQUMsSUFBSSxDQUFDQyxJQUFJLEVBQUUsSUFBSSxDQUFDeUMsYUFBYSxDQUFDO01BQ3pELElBQUksQ0FBQ2MsT0FBTyxHQUFHLElBQUksQ0FBQ3JELE1BQU0sQ0FBQ3NELFVBQVUsQ0FBQyxJQUFJLENBQUM7TUFFM0MsSUFBSSxDQUFDQyxVQUFVLEdBQUdwQixRQUFRLENBQUNxQixHQUFHLENBQUMsQ0FBQ3JFLE9BQU8sRUFBRXNFLENBQUMsS0FBSztFQUM3QyxNQUFBLE1BQU1qQyxLQUFLLEdBQUcsSUFBSSxDQUFDWSxPQUFPLENBQUNaLEtBQUssR0FBR2lDLENBQUMsR0FBRyxJQUFJLENBQUNyQixPQUFPLENBQUNRLE1BQU07RUFDMUQsTUFBQSxNQUFNYyxRQUFRLEdBQUc3QixLQUFLLENBQUM4QixXQUFXLENBQUN4RSxPQUFPLENBQUMsQ0FBQ3lFLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckQsTUFBTUMsS0FBSyxHQUFHN0Msd0JBQXdCLENBQUNRLEtBQUssRUFBRSxJQUFJLENBQUNZLE9BQU8sQ0FBQ1UsV0FBVyxFQUFFLElBQUksQ0FBQ1YsT0FBTyxDQUFDUixNQUFNLENBQUMsQ0FBQ1IsR0FBRyxDQUFDc0MsUUFBUSxDQUFDO1FBQzFHLE1BQU1JLEdBQUcsR0FBRzlDLHdCQUF3QixDQUFDUSxLQUFLLEVBQUUsSUFBSSxDQUFDWSxPQUFPLENBQUNXLFNBQVMsRUFBRSxJQUFJLENBQUNYLE9BQU8sQ0FBQ1IsTUFBTSxDQUFDLENBQUNSLEdBQUcsQ0FBQ3NDLFFBQVEsQ0FBQztFQUV0RyxNQUFBLE9BQU8sSUFBSUssU0FBUyxDQUFDNUUsT0FBTyxFQUFFO1VBQzVCNkUsU0FBUyxFQUFFLElBQUksQ0FBQ2xFLElBQUk7VUFDcEJtRSxLQUFLLEVBQUVDLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDTixLQUFLLEVBQUVDLEdBQUcsQ0FBQztFQUN2Q3pELFFBQUFBLFFBQVEsRUFBRXdELEtBQUs7RUFDZk8sUUFBQUEsRUFBRSxFQUFFO0VBQ0YsVUFBQSxXQUFXLEVBQUVDLE1BQU0sSUFBSSxDQUFDQyxJQUFJO0VBQzlCO0VBQ0YsT0FBQyxDQUFDO0VBQ0osS0FBQyxDQUFDO01BRUYsSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtNQUNsQixJQUFJLENBQUNELElBQUksRUFBRTtFQUNiO0VBRUFBLEVBQUFBLElBQUlBLEdBQUc7RUFDTCxJQUFBLElBQUksQ0FBQyxJQUFJLENBQUNDLE1BQU0sRUFBRTtFQUNoQixNQUFBO0VBQ0Y7TUFDQSxJQUFJLENBQUNsQixPQUFPLENBQUNtQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUNqQyxhQUFhLENBQUNoQyxJQUFJLENBQUNDLENBQUMsRUFBRSxJQUFJLENBQUMrQixhQUFhLENBQUNoQyxJQUFJLENBQUNFLENBQUMsQ0FBQztFQUNsRixJQUFBLElBQUksQ0FBQzRDLE9BQU8sQ0FBQ29CLFNBQVMsRUFBRTtNQUV4QixJQUFJQyxLQUFLLEdBQUcsSUFBSSxDQUFDbkIsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDVixTQUFTLEVBQUU7RUFDMUMsSUFBQSxJQUFJLENBQUNRLE9BQU8sQ0FBQ3NCLE1BQU0sQ0FBQ0QsS0FBSyxDQUFDbEUsQ0FBQyxFQUFFa0UsS0FBSyxDQUFDakUsQ0FBQyxDQUFDO0VBRXJDLElBQUEsS0FBSyxJQUFJZ0QsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLElBQUksQ0FBQ0YsVUFBVSxDQUFDNUIsTUFBTSxFQUFFOEIsQ0FBQyxFQUFFLEVBQUU7UUFDL0NpQixLQUFLLEdBQUcsSUFBSSxDQUFDbkIsVUFBVSxDQUFDRSxDQUFDLENBQUMsQ0FBQ1osU0FBUyxFQUFFO0VBQ3RDLE1BQUEsSUFBSSxDQUFDUSxPQUFPLENBQUN1QixNQUFNLENBQUNGLEtBQUssQ0FBQ2xFLENBQUMsRUFBRWtFLEtBQUssQ0FBQ2pFLENBQUMsQ0FBQztFQUN2QztFQUNBLElBQUEsSUFBSSxDQUFDNEMsT0FBTyxDQUFDd0IsU0FBUyxFQUFFO01BQ3hCLElBQUksQ0FBQ3hCLE9BQU8sQ0FBQ0osU0FBUyxHQUFHLElBQUksQ0FBQ2IsT0FBTyxDQUFDYSxTQUFTO01BQy9DLElBQUksQ0FBQ0ksT0FBTyxDQUFDSCxXQUFXLEdBQUcsSUFBSSxDQUFDZCxPQUFPLENBQUNjLFdBQVc7RUFDbkQsSUFBQSxJQUFJLENBQUNHLE9BQU8sQ0FBQ3lCLE1BQU0sRUFBRTtNQUNyQixJQUFJLENBQUN6QixPQUFPLENBQUNGLFNBQVMsR0FBRyxJQUFJLENBQUNmLE9BQU8sQ0FBQ2UsU0FBUztFQUMvQyxJQUFBLElBQUksQ0FBQ0UsT0FBTyxDQUFDMEIsSUFBSSxFQUFFO0VBQ3JCO0VBQ0Y7O0VDN0RlLE1BQU1DLFNBQVMsU0FBU0MsWUFBWSxDQUFDO0VBQ2xEL0MsRUFBQUEsV0FBV0EsQ0FBQ3BDLElBQUksRUFBRVgsT0FBTyxFQUFjO0VBQUEsSUFBQSxJQUFaaUQsT0FBTyxHQUFBQyxTQUFBLENBQUFWLE1BQUEsR0FBQSxDQUFBLElBQUFVLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUMsRUFBRTtNQUNuQyxLQUFLLENBQUNELE9BQU8sQ0FBQztNQUNkLE1BQU1HLGFBQWEsR0FBR0MsU0FBUyxDQUFDQyxXQUFXLENBQUMzQyxJQUFJLEVBQUVBLElBQUksQ0FBQztFQUN2RCxJQUFBLElBQUksQ0FBQ3NDLE9BQU8sR0FBR00sTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDM0JmLE1BQUFBLE1BQU0sRUFBRVcsYUFBYSxDQUFDTSxTQUFTLEVBQUU7RUFDakNxQyxNQUFBQSxNQUFNLEVBQUUzQyxhQUFhLENBQUNTLFVBQVUsRUFBRSxHQUFHLENBQUM7UUFDdENtQyxVQUFVLEVBQUU5RCxJQUFJLENBQUNJLEVBQUU7RUFDbkIyRCxNQUFBQSxRQUFRLEVBQUUsQ0FBQztRQUNYQyxNQUFNLEVBQUUsQ0FBQ2hFLElBQUksQ0FBQ0ksRUFBRSxFQUFFLENBQUNKLElBQUksQ0FBQ0ksRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUVKLElBQUksQ0FBQ0ksRUFBRSxHQUFHLENBQUMsRUFBRUosSUFBSSxDQUFDSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0VBQzVENkQsTUFBQUEsSUFBSSxFQUFFO09BQ1AsRUFBRWxELE9BQU8sQ0FBQztFQUVYLElBQUEsSUFBSSxDQUFDbUQsYUFBYSxHQUFHLElBQUksQ0FBQ25ELE9BQU8sQ0FBQ1IsTUFBTTtNQUN4QyxJQUFJLENBQUM5QixJQUFJLEdBQUdBLElBQUk7RUFDaEIsSUFBQSxJQUFJLENBQUNzRCxJQUFJLENBQUNqRSxPQUFPLENBQUM7RUFDcEI7SUFFQWlFLElBQUlBLENBQUNqRSxPQUFPLEVBQUU7RUFDWixJQUFBLE1BQU1xQyxLQUFLLEdBQUcsSUFBSSxDQUFDWSxPQUFPLENBQUMrQyxVQUFVO0VBQ3JDLElBQUEsTUFBTTlFLFFBQVEsR0FBR1csd0JBQXdCLENBQ3ZDUSxLQUFLLEVBQ0wsSUFBSSxDQUFDWSxPQUFPLENBQUM4QyxNQUFNLEVBQ25CLElBQUksQ0FBQ0ssYUFDUCxDQUFDO01BRUQsSUFBSSxDQUFDL0QsS0FBSyxHQUFHQSxLQUFLO0VBQ2xCLElBQUEsSUFBSSxDQUFDZ0UsU0FBUyxHQUFHLElBQUl6QixTQUFTLENBQUM1RSxPQUFPLEVBQUU7UUFDdEM2RSxTQUFTLEVBQUUsSUFBSSxDQUFDbEUsSUFBSTtRQUNwQm1FLEtBQUssRUFBRXdCLFVBQVUsQ0FBQ3RCLFFBQVEsQ0FDeEIsSUFBSSxDQUFDb0IsYUFBYSxFQUNsQixJQUFJLENBQUNuRCxPQUFPLENBQUM4QyxNQUFNLEVBQ25CLElBQUksQ0FBQzlDLE9BQU8sQ0FBQytDLFVBQVUsRUFDdkIsSUFBSSxDQUFDL0MsT0FBTyxDQUFDZ0QsUUFDZixDQUFDO0VBQ0QvRSxNQUFBQSxRQUFRLEVBQUVBLFFBQVE7RUFDbEIrRCxNQUFBQSxFQUFFLEVBQUU7RUFDRixRQUFBLFdBQVcsRUFBRUMsTUFBTSxJQUFJLENBQUNxQixNQUFNO0VBQ2hDO0VBQ0YsS0FBQyxDQUFDO0VBQ0o7RUFFQUMsRUFBQUEsV0FBV0EsR0FBRztFQUNaLElBQUEsSUFBSSxDQUFDbkUsS0FBSyxHQUFHVixRQUFRLENBQUMsSUFBSSxDQUFDeUUsYUFBYSxFQUFFLElBQUksQ0FBQ0MsU0FBUyxDQUFDbkYsUUFBUSxDQUFDO0VBQ3BFO0VBRUFxRixFQUFBQSxNQUFNQSxHQUFHO01BQ1AsSUFBSSxDQUFDQyxXQUFXLEVBQUU7RUFDbEI7RUFDQTtFQUNBLElBQUEsSUFBSSxDQUFDQyxJQUFJLENBQUMsa0JBQWtCLEVBQUU7RUFBRUMsTUFBQUEsU0FBUyxFQUFFLElBQUk7UUFBRXJFLEtBQUssRUFBRSxJQUFJLENBQUNBO0VBQU0sS0FBQyxDQUFDO0VBQ3ZFO0VBRUFzRSxFQUFBQSxRQUFRQSxDQUFDdEUsS0FBSyxFQUFFOEQsSUFBSSxFQUFFO0VBQ3BCLElBQUEsSUFBSSxDQUFDOUQsS0FBSyxHQUFHVCxjQUFjLENBQUNTLEtBQUssQ0FBQztFQUNsQyxJQUFBLE1BQU1uQixRQUFRLEdBQUdXLHdCQUF3QixDQUN2QyxJQUFJLENBQUNRLEtBQUssRUFDVixJQUFJLENBQUNZLE9BQU8sQ0FBQzhDLE1BQU0sRUFDbkIsSUFBSSxDQUFDSyxhQUNQLENBQUM7RUFDRCxJQUFBLElBQUksQ0FBQ0MsU0FBUyxDQUFDTyxXQUFXLENBQUMxRixRQUFRLEVBQUU7UUFBRTJGLFFBQVEsRUFBRVYsSUFBSSxJQUFJO0VBQUUsS0FBQyxDQUFDO0VBQzdELElBQUEsSUFBSSxDQUFDTSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7RUFBRUMsTUFBQUEsU0FBUyxFQUFFLElBQUk7UUFBRXJFLEtBQUssRUFBRSxJQUFJLENBQUNBO0VBQU0sS0FBQyxDQUFDO0VBQ3ZFO0VBQ0Y7O0VDNUVlLFNBQVN5RSxLQUFLQSxDQUFDcEMsS0FBSyxFQUFFcUMsSUFBSSxFQUFFQyxJQUFJLEVBQUU7SUFDL0MsTUFBTUMsTUFBTSxHQUFHLEVBQUU7RUFDakIsRUFBQSxJQUFJLE9BQU9GLElBQUksS0FBSyxXQUFXLEVBQUU7RUFDL0JBLElBQUFBLElBQUksR0FBR3JDLEtBQUs7RUFDWkEsSUFBQUEsS0FBSyxHQUFHLENBQUM7RUFDWDtFQUNBLEVBQUEsSUFBSSxPQUFPc0MsSUFBSSxLQUFLLFdBQVcsRUFBRTtFQUMvQkEsSUFBQUEsSUFBSSxHQUFHLENBQUM7RUFDVjtFQUNBLEVBQUEsSUFBS0EsSUFBSSxHQUFHLENBQUMsSUFBSXRDLEtBQUssSUFBSXFDLElBQUksSUFBTUMsSUFBSSxHQUFHLENBQUMsSUFBSXRDLEtBQUssSUFBSXFDLElBQUssRUFBRTtFQUM5RCxJQUFBLE9BQU8sRUFBRTtFQUNYO0lBQ0EsS0FBSyxJQUFJekMsQ0FBQyxHQUFHSSxLQUFLLEVBQUVzQyxJQUFJLEdBQUcsQ0FBQyxHQUFHMUMsQ0FBQyxHQUFHeUMsSUFBSSxHQUFHekMsQ0FBQyxHQUFHeUMsSUFBSSxFQUFFekMsQ0FBQyxJQUFJMEMsSUFBSSxFQUFFO0VBQzdEQyxJQUFBQSxNQUFNLENBQUNDLElBQUksQ0FBQzVDLENBQUMsQ0FBQztFQUNoQjtFQUNBLEVBQUEsT0FBTzJDLE1BQU07RUFDZjs7RUNFQSxNQUFNRSxHQUFHLEdBQUcsWUFBVztJQUNyQixPQUFPakYsSUFBSSxDQUFDa0YsS0FBSyxDQUFDbEYsSUFBSSxDQUFDbUYsTUFBTSxFQUFFLEdBQUMsR0FBRyxDQUFDO0VBQ3RDLENBQUM7RUFFRCxNQUFNQyxXQUFXLEdBQUcsVUFBU0MsS0FBSyxFQUFFO0VBQ2xDLEVBQUEsSUFBSUMsR0FBRyxHQUFHRCxLQUFLLENBQUNFLFFBQVEsQ0FBQyxFQUFFLENBQUM7RUFDNUIsRUFBQSxPQUFPRCxHQUFHLENBQUNoRixNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3JCZ0YsR0FBRyxHQUFHLEdBQUcsR0FBR0EsR0FBRztFQUNqQjtFQUNBLEVBQUEsT0FBT0EsR0FBRztFQUNaLENBQUM7RUFFRCxTQUFTRSxXQUFXQSxHQUFHO0lBQ3JCLE9BQU8sQ0FBQSxDQUFBLEVBQUlKLFdBQVcsQ0FBQ0gsR0FBRyxFQUFFLENBQUMsR0FBR0csV0FBVyxDQUFDSCxHQUFHLEVBQUUsQ0FBQyxDQUFHRyxFQUFBQSxXQUFXLENBQUNILEdBQUcsRUFBRSxDQUFDLENBQUUsQ0FBQTtFQUMzRTtFQUVBLFNBQVNRLHdCQUF3QkEsQ0FBQ0MsS0FBSyxFQUFFcEYsTUFBTSxFQUFFO0lBQy9DLE1BQU1xRixVQUFVLEdBQUcsRUFBRTtFQUNyQixFQUFBLElBQUlELEtBQUssS0FBSyxFQUFFLEVBQUU7RUFDaEJDLElBQUFBLFVBQVUsQ0FBQ1gsSUFBSSxDQUFDVSxLQUFLLENBQUM7TUFDdEJDLFVBQVUsQ0FBQ1gsSUFBSSxDQUFDLENBQUNVLEtBQUssR0FBRyxDQUFDLElBQUlwRixNQUFNLENBQUM7RUFDdkM7RUFFQSxFQUFBLE9BQU9xRixVQUFVO0VBQ25CO0VBRWUsTUFBTUMsS0FBSyxTQUFTaEMsWUFBWSxDQUFDO0VBQzlDL0MsRUFBQUEsV0FBV0EsQ0FBRXBDLElBQUksRUFBRXFDLFFBQVEsRUFBYztFQUFBLElBQUEsSUFBWkMsT0FBTyxHQUFBQyxTQUFBLENBQUFWLE1BQUEsR0FBQSxDQUFBLElBQUFVLFNBQUEsQ0FBQSxDQUFBLENBQUEsS0FBQUMsU0FBQSxHQUFBRCxTQUFBLENBQUEsQ0FBQSxDQUFBLEdBQUMsRUFBRTtNQUNyQyxLQUFLLENBQUNELE9BQU8sQ0FBQztNQUNkLE1BQU1HLGFBQWEsR0FBR0MsU0FBUyxDQUFDQyxXQUFXLENBQUMzQyxJQUFJLEVBQUVBLElBQUksQ0FBQztFQUN2RCxJQUFBLElBQUksQ0FBQ3NDLE9BQU8sR0FBR00sTUFBTSxDQUFDQyxNQUFNLENBQUM7RUFDM0JmLE1BQUFBLE1BQU0sRUFBRVcsYUFBYSxDQUFDTSxTQUFTLEVBQUU7RUFDakNxQyxNQUFBQSxNQUFNLEVBQUUzQyxhQUFhLENBQUNTLFVBQVUsRUFBRSxHQUFHLENBQUM7RUFDdENrRSxNQUFBQSxXQUFXLEVBQUUzRSxhQUFhLENBQUNTLFVBQVUsRUFBRSxHQUFHLENBQUM7RUFDM0NtRSxNQUFBQSxVQUFVLEVBQUU5RixJQUFJLENBQUNJLEVBQUUsR0FBRyxDQUFDO0VBQ3ZCMkYsTUFBQUEsVUFBVSxFQUFFbkIsS0FBSyxDQUFDLENBQUMsRUFBRTlELFFBQVEsQ0FBQ1IsTUFBTSxDQUFDLENBQUM2QixHQUFHLENBQUMsTUFBTXFELFdBQVcsRUFBRSxDQUFDO1FBQzlEUSxVQUFVLEVBQUVwQixLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUc5RCxRQUFRLENBQUNSLE1BQU0sQ0FBQyxDQUFDNkIsR0FBRyxDQUFFaEMsS0FBSyxJQUFLRCxRQUFRLENBQUNDLEtBQUssQ0FBQyxDQUFDO0VBQ2xGOEYsTUFBQUEsUUFBUSxFQUFFLElBQUk7RUFDZEMsTUFBQUEsY0FBYyxFQUFFLElBQUkxRixLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7T0FDL0IsRUFBRU8sT0FBTyxDQUFDO01BRVgsSUFBSSxDQUFDdEMsSUFBSSxHQUFHQSxJQUFJO01BQ2hCLElBQUksQ0FBQ3lDLGFBQWEsR0FBR0EsYUFBYTtFQUNsQyxJQUFBLElBQUksQ0FBQ2EsSUFBSSxDQUFDakIsUUFBUSxDQUFDO0VBQ3JCO0lBRUFpQixJQUFJQSxDQUFDakIsUUFBUSxFQUFFO0VBQ2IsSUFBQSxJQUFJLENBQUNuQyxNQUFNLEdBQUdILFlBQVksQ0FBQyxJQUFJLENBQUNDLElBQUksRUFBRSxJQUFJLENBQUN5QyxhQUFhLENBQUM7TUFDekQsSUFBSSxDQUFDYyxPQUFPLEdBQUcsSUFBSSxDQUFDckQsTUFBTSxDQUFDc0QsVUFBVSxDQUFDLElBQUksQ0FBQztNQUMzQyxJQUFJLENBQUNDLFVBQVUsR0FBR3BCLFFBQVEsQ0FBQ3FCLEdBQUcsQ0FBQyxDQUFDckUsT0FBTyxFQUFFc0UsQ0FBQyxLQUFLO1FBQzdDLE1BQU1qQyxLQUFLLEdBQUcsSUFBSSxDQUFDWSxPQUFPLENBQUNpRixVQUFVLENBQUM1RCxDQUFDLENBQUM7RUFDeEMsTUFBQSxNQUFNQyxRQUFRLEdBQUc3QixLQUFLLENBQUM4QixXQUFXLENBQUN4RSxPQUFPLENBQUMsQ0FBQ3lFLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckQsTUFBTXZELFFBQVEsR0FBR1csd0JBQXdCLENBQ3ZDUSxLQUFLLEVBQ0wsSUFBSSxDQUFDWSxPQUFPLENBQUM4RSxXQUFXLEVBQ3hCLElBQUksQ0FBQzlFLE9BQU8sQ0FBQ1IsTUFBTSxDQUFDUixHQUFHLENBQUNzQyxRQUFRLENBQ2xDLENBQUM7RUFFRCxNQUFBLE9BQU8sSUFBSUssU0FBUyxDQUFDNUUsT0FBTyxFQUFFO1VBQzVCNkUsU0FBUyxFQUFFLElBQUksQ0FBQ2xFLElBQUk7RUFDcEJtRSxRQUFBQSxLQUFLLEVBQUV3QixVQUFVLENBQUN0QixRQUFRLENBQ3hCLElBQUksQ0FBQy9CLE9BQU8sQ0FBQ1IsTUFBTSxDQUFDUixHQUFHLENBQUNzQyxRQUFRLENBQUMsRUFDakMsSUFBSSxDQUFDdEIsT0FBTyxDQUFDOEUsV0FBVyxFQUN4QixJQUFJLENBQUNNLGFBQWEsQ0FBQy9ELENBQUMsRUFBRSxLQUFLLENBQUMsRUFDNUIsSUFBSSxDQUFDK0QsYUFBYSxDQUFDL0QsQ0FBQyxFQUFFLElBQUksQ0FDNUIsQ0FBQztFQUNEcEQsUUFBQUEsUUFBUSxFQUFFQSxRQUFRO0VBQ2xCK0QsUUFBQUEsRUFBRSxFQUFFO0VBQ0YsVUFBQSxXQUFXLEVBQUVDLE1BQU0sSUFBSSxDQUFDQyxJQUFJO0VBQzlCO0VBQ0YsT0FBQyxDQUFDO0VBQ0osS0FBQyxDQUFDO01BRUYsSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtNQUNsQixJQUFJLENBQUNELElBQUksRUFBRTtFQUNiO0VBRUFtRCxFQUFBQSxZQUFZQSxHQUFHO01BQ2IsSUFBSSxDQUFDcEMsTUFBTSxHQUFHLElBQUksQ0FBQzlCLFVBQVUsQ0FBQ0MsR0FBRyxDQUFFZ0MsU0FBUyxJQUFLO1FBQy9DLE1BQU05QixRQUFRLEdBQUc4QixTQUFTLENBQUNrQyxPQUFPLEVBQUUsQ0FBQzlELElBQUksQ0FBQyxHQUFHLENBQUM7RUFDOUMsTUFBQSxPQUFPOUMsUUFBUSxDQUFDLElBQUksQ0FBQ3NCLE9BQU8sQ0FBQ1IsTUFBTSxDQUFDUixHQUFHLENBQUNzQyxRQUFRLENBQUMsRUFBRThCLFNBQVMsQ0FBQ25GLFFBQVEsQ0FBQztFQUN4RSxLQUFDLENBQUM7RUFDSjtFQUVBbUgsRUFBQUEsYUFBYUEsQ0FBQ1QsS0FBSyxFQUFFWSxVQUFVLEVBQUU7RUFDL0IsSUFBQSxNQUFNQyxJQUFJLEdBQUdELFVBQVUsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUVoQyxJQUFBLE9BQU8sTUFBTTtRQUNYLElBQUlsRSxDQUFDLEdBQUcsQ0FBQ3NELEtBQUssR0FBR2EsSUFBSSxJQUFJLElBQUksQ0FBQ3ZDLE1BQU0sQ0FBQzFELE1BQU07UUFDM0MsSUFBSThCLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDVEEsUUFBQUEsQ0FBQyxJQUFJLElBQUksQ0FBQzRCLE1BQU0sQ0FBQzFELE1BQU07RUFDekI7RUFDQSxNQUFBLE9BQU9aLGNBQWMsQ0FBQyxJQUFJLENBQUNzRSxNQUFNLENBQUM1QixDQUFDLENBQUMsR0FBR21FLElBQUksR0FBRyxJQUFJLENBQUN4RixPQUFPLENBQUMrRSxVQUFVLENBQUM7T0FDdkU7RUFDSDtFQUVBN0MsRUFBQUEsSUFBSUEsR0FBRztFQUNMLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQ0MsTUFBTSxFQUFFO0VBQ2hCLE1BQUE7RUFDRjtNQUVBLElBQUksQ0FBQ2tELFlBQVksRUFBRTtNQUNuQixJQUFJLENBQUNwRSxPQUFPLENBQUNtQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUNqQyxhQUFhLENBQUNoQyxJQUFJLENBQUNDLENBQUMsRUFBRSxJQUFJLENBQUMrQixhQUFhLENBQUNoQyxJQUFJLENBQUNFLENBQUMsQ0FBQztNQUNsRixJQUFJLENBQUM4QyxVQUFVLENBQUNzRSxPQUFPLENBQUMsQ0FBQ0MsVUFBVSxFQUFFZixLQUFLLEtBQUs7UUFDN0MsSUFBSSxDQUFDZ0IsT0FBTyxDQUFDLElBQUksQ0FBQzFFLE9BQU8sRUFBRSxJQUFJLENBQUNqQixPQUFPLENBQUNSLE1BQU0sRUFBRSxJQUFJLENBQUNRLE9BQU8sQ0FBQzhDLE1BQU0sRUFBRTZCLEtBQUssQ0FBQztFQUM3RSxLQUFDLENBQUM7TUFFRixJQUFJLENBQUN4RCxVQUFVLENBQUNzRSxPQUFPLENBQUMsQ0FBQ0MsVUFBVSxFQUFFZixLQUFLLEtBQUs7RUFDN0MsTUFBQSxJQUFJLENBQUNpQixZQUFZLENBQUNqQixLQUFLLENBQUM7RUFDMUIsS0FBQyxDQUFDO0VBRUYsSUFBQSxJQUFJLENBQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFO0VBQUVxQyxNQUFBQSxLQUFLLEVBQUU7RUFBSyxLQUFDLENBQUM7RUFDMUM7SUFFQUMsV0FBV0EsQ0FBQy9JLE9BQU8sRUFBZ0I7RUFBQSxJQUFBLElBQWRpRCxPQUFPLEdBQUFDLFNBQUEsQ0FBQVYsTUFBQSxHQUFBLENBQUEsSUFBQVUsU0FBQSxDQUFBLENBQUEsQ0FBQSxLQUFBQyxTQUFBLEdBQUFELFNBQUEsQ0FBQSxDQUFBLENBQUEsR0FBRyxFQUFFO0VBQy9CLElBQUEsSUFBSSxDQUFDLElBQUksQ0FBQ2tDLE1BQU0sRUFBRTtFQUNoQixNQUFBO0VBQ0Y7TUFDQSxNQUFNNEQsU0FBUyxHQUFHM0YsU0FBUyxDQUFDQyxXQUFXLENBQUN0RCxPQUFPLEVBQUVBLE9BQU8sQ0FBQztFQUN6RCxJQUFBLE1BQU1pSixJQUFJLEdBQUcxRixNQUFNLENBQUNDLE1BQU0sQ0FBQztFQUN6QmYsTUFBQUEsTUFBTSxFQUFFdUcsU0FBUyxDQUFDdEYsU0FBUyxFQUFFO0VBQzdCcUMsTUFBQUEsTUFBTSxFQUFFaUQsU0FBUyxDQUFDbkYsVUFBVSxFQUFFLEdBQUcsQ0FBQztFQUNsQ29FLE1BQUFBLFVBQVUsRUFBRSxJQUFJLENBQUNoRixPQUFPLENBQUNnRjtPQUMxQixFQUFFaEYsT0FBTyxDQUFDO0VBRVgsSUFBQSxNQUFNcEMsTUFBTSxHQUFHSCxZQUFZLENBQUNWLE9BQU8sRUFBRWdKLFNBQVMsQ0FBQztFQUMvQyxJQUFBLE1BQU05RSxPQUFPLEdBQUdyRCxNQUFNLENBQUNzRCxVQUFVLENBQUMsSUFBSSxDQUFDO0VBQ3ZDLElBQUEsTUFBTStFLFFBQVEsR0FBRztRQUNmL0QsSUFBSSxFQUFFQSxNQUFNO0VBQ1ZqQixRQUFBQSxPQUFPLENBQUNtQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTJELFNBQVMsQ0FBQzVILElBQUksQ0FBQ0MsQ0FBQyxFQUFFMkgsU0FBUyxDQUFDNUgsSUFBSSxDQUFDRSxDQUFDLENBQUM7VUFDM0QsSUFBSSxDQUFDOEMsVUFBVSxDQUFDc0UsT0FBTyxDQUFDLENBQUNDLFVBQVUsRUFBRWYsS0FBSyxLQUFLO0VBQzdDLFVBQUEsSUFBSSxDQUFDZ0IsT0FBTyxDQUFDMUUsT0FBTyxFQUFFK0UsSUFBSSxDQUFDeEcsTUFBTSxFQUFFd0csSUFBSSxDQUFDbEQsTUFBTSxFQUFFNkIsS0FBSyxDQUFDO0VBQ3hELFNBQUMsQ0FBQztFQUNKO09BQ0Q7TUFDRHNCLFFBQVEsQ0FBQy9ELElBQUksRUFBRTtFQUNmLElBQUEsT0FBTytELFFBQVE7RUFDakI7SUFFQUMsWUFBWUEsQ0FBQ3ZCLEtBQUssRUFBRTtNQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDM0UsT0FBTyxDQUFDZ0YsVUFBVSxDQUFDTCxLQUFLLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDeEQsSUFBSSxDQUFDM0UsT0FBTyxDQUFDZ0YsVUFBVSxDQUFDTCxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMzRSxPQUFPLENBQUNnRixVQUFVLENBQUNMLEtBQUssQ0FBQyxDQUFDd0IsSUFBSSxDQUFDLElBQUksQ0FBQztFQUM1RTtFQUNBLElBQUEsT0FBTyxJQUFJLENBQUNuRyxPQUFPLENBQUNnRixVQUFVLENBQUNMLEtBQUssQ0FBQztFQUN2QztJQUVBZ0IsT0FBT0EsQ0FBQzFFLE9BQU8sRUFBRXpCLE1BQU0sRUFBRXNELE1BQU0sRUFBRTZCLEtBQUssRUFBRTtFQUN0QyxJQUFBLE1BQU01QixVQUFVLEdBQUcsSUFBSSxDQUFDRSxNQUFNLENBQUMwQixLQUFLLENBQUM7RUFDckMsSUFBQSxNQUFNM0IsUUFBUSxHQUFHLElBQUksQ0FBQ0MsTUFBTSxDQUFDLENBQUMwQixLQUFLLEdBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQzFCLE1BQU0sQ0FBQzFELE1BQU0sQ0FBQztFQUM1RCxJQUFBLE1BQU02RyxLQUFLLEdBQUcsSUFBSSxDQUFDRixZQUFZLENBQUN2QixLQUFLLENBQUM7TUFFdEMxRCxPQUFPLENBQUNvQixTQUFTLEVBQUU7TUFDbkJwQixPQUFPLENBQUNzQixNQUFNLENBQUMvQyxNQUFNLENBQUNwQixDQUFDLEVBQUVvQixNQUFNLENBQUNuQixDQUFDLENBQUM7RUFDbEM0QyxJQUFBQSxPQUFPLENBQUNvRixHQUFHLENBQUM3RyxNQUFNLENBQUNwQixDQUFDLEVBQUVvQixNQUFNLENBQUNuQixDQUFDLEVBQUV5RSxNQUFNLEVBQUVDLFVBQVUsRUFBRUMsUUFBUSxFQUFFLEtBQUssQ0FBQztNQUNwRS9CLE9BQU8sQ0FBQ3VCLE1BQU0sQ0FBQ2hELE1BQU0sQ0FBQ3BCLENBQUMsRUFBRW9CLE1BQU0sQ0FBQ25CLENBQUMsQ0FBQztNQUNsQzRDLE9BQU8sQ0FBQ3dCLFNBQVMsRUFBRTtNQUNuQnhCLE9BQU8sQ0FBQ0YsU0FBUyxHQUFHcUYsS0FBSztNQUN6Qm5GLE9BQU8sQ0FBQzBCLElBQUksRUFBRTtFQUNoQjtJQUVBaUQsWUFBWUEsQ0FBQ2pCLEtBQUssRUFBRTtNQUNsQixJQUFJckMsS0FBSyxFQUFFZ0UsR0FBRztFQUNkLElBQUEsSUFBSSxJQUFJLENBQUN0RyxPQUFPLENBQUNrRixRQUFRLEVBQUU7UUFDekJvQixHQUFHLEdBQUcsSUFBSSxDQUFDdEcsT0FBTyxDQUFDa0YsUUFBUSxZQUFZcUIsS0FBSyxHQUFHLElBQUksQ0FBQ3ZHLE9BQU8sQ0FBQ2tGLFFBQVEsQ0FBQ1AsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDM0UsT0FBTyxDQUFDa0YsUUFBUTtFQUNyRztFQUVBLElBQUEsSUFBSW9CLEdBQUcsRUFBRTtRQUNQLE1BQU1sSCxLQUFLLEdBQUdULGNBQWMsQ0FBQyxJQUFJLENBQUNzRSxNQUFNLENBQUMwQixLQUFLLENBQUMsQ0FBQztFQUNoRHJDLE1BQUFBLEtBQUssR0FBRyxJQUFJN0MsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDNkcsR0FBRyxDQUFDN0gsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNyQzZELEtBQUssR0FBR0EsS0FBSyxDQUFDNUMsR0FBRyxDQUFDLElBQUksQ0FBQ00sT0FBTyxDQUFDbUYsY0FBYyxDQUFDO1FBQzlDLElBQUksQ0FBQ2xFLE9BQU8sQ0FBQ3VGLFNBQVMsQ0FBQyxJQUFJLENBQUNyRyxhQUFhLENBQUNoQyxJQUFJLENBQUNDLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDK0IsYUFBYSxDQUFDaEMsSUFBSSxDQUFDRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ3BGLE1BQUEsSUFBSSxDQUFDNEMsT0FBTyxDQUFDd0YsTUFBTSxDQUFDckgsS0FBSyxDQUFDO0VBQzFCLE1BQUEsSUFBSSxDQUFDNkIsT0FBTyxDQUFDeUYsU0FBUyxDQUFDSixHQUFHLEVBQUVoRSxLQUFLLENBQUNsRSxDQUFDLEVBQUVrRSxLQUFLLENBQUNqRSxDQUFDLENBQUM7RUFDN0MsTUFBQSxJQUFJLENBQUM0QyxPQUFPLENBQUMwRixZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDN0M7RUFDRjtFQUVBQyxFQUFBQSxhQUFhQSxHQUFHO01BQ2QsTUFBTTNELE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU0sQ0FBQzRELEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDbkMsSUFBQSxJQUFJQyxTQUFTLEdBQUcsSUFBSSxDQUFDN0QsTUFBTSxDQUFDLENBQUMsQ0FBQztFQUU5QkEsSUFBQUEsTUFBTSxDQUFDZ0IsSUFBSSxDQUFDNkMsU0FBUyxDQUFDO0VBQ3RCLElBQUEsT0FBTzdELE1BQU0sQ0FBQzdCLEdBQUcsQ0FBRWhDLEtBQUssSUFBSztFQUMzQixNQUFBLE1BQU0ySCxTQUFTLEdBQUdwSSxjQUFjLENBQUNTLEtBQUssR0FBRzBILFNBQVMsQ0FBQztFQUNuREEsTUFBQUEsU0FBUyxHQUFHMUgsS0FBSztFQUNqQixNQUFBLE9BQU8ySCxTQUFTO0VBQ2xCLEtBQUMsQ0FBQztFQUNKO0VBRUFDLEVBQUFBLFVBQVVBLEdBQUc7RUFDWCxJQUFBLE9BQU8sSUFBSSxDQUFDSixhQUFhLEVBQUUsQ0FBQ3hGLEdBQUcsQ0FBRTJGLFNBQVMsSUFBS0EsU0FBUyxJQUFJLENBQUMsR0FBRzlILElBQUksQ0FBQ0ksRUFBRSxDQUFDLENBQUM7RUFDM0U7RUFFQTRILEVBQUFBLGdCQUFnQkEsR0FBRztFQUNqQixJQUFBLE9BQU8sSUFBSSxDQUFDTCxhQUFhLEVBQUUsQ0FBQ3hGLEdBQUcsQ0FBQyxDQUFDMkYsU0FBUyxFQUFFMUYsQ0FBQyxLQUFLO0VBQ2hELE1BQUEsT0FBTzFDLGNBQWMsQ0FBQyxJQUFJLENBQUNzRSxNQUFNLENBQUM1QixDQUFDLENBQUMsR0FBRzBGLFNBQVMsR0FBRyxDQUFDLENBQUM7RUFDdkQsS0FBQyxDQUFDO0VBQ0o7SUFFQUcsYUFBYUEsQ0FBQzVFLEtBQUssRUFBRTtNQUNuQixNQUFNbEQsS0FBSyxHQUFHVixRQUFRLENBQUMsSUFBSSxDQUFDc0IsT0FBTyxDQUFDUixNQUFNLEVBQUU4QyxLQUFLLENBQUM7TUFDbEQsTUFBTVEsTUFBTSxHQUFHcUUsV0FBVyxDQUFDLElBQUksQ0FBQ25ILE9BQU8sQ0FBQ1IsTUFBTSxFQUFFOEMsS0FBSyxDQUFDO0VBRXRELElBQUEsSUFBSVEsTUFBTSxHQUFHLElBQUksQ0FBQzlDLE9BQU8sQ0FBQzhDLE1BQU0sRUFBRTtFQUNoQyxNQUFBLE9BQU8sRUFBRTtFQUNYO01BRUEsSUFBSXNFLE1BQU0sR0FBRyxFQUFFO1FBQUUvRixDQUFDO1FBQUVnRyxDQUFDO0VBQ3JCLElBQUEsS0FBS2hHLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUM0QixNQUFNLENBQUMxRCxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRTtFQUN2QyxNQUFBLElBQUkrRixNQUFNLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQ25FLE1BQU0sQ0FBQ21FLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQ25FLE1BQU0sQ0FBQzVCLENBQUMsQ0FBQyxFQUFFO0VBQ3pEK0YsUUFBQUEsTUFBTSxHQUFHL0YsQ0FBQztFQUNaO0VBQ0Y7RUFDQSxJQUFBLEtBQUtBLENBQUMsR0FBRyxDQUFDLEVBQUVnRyxDQUFDLEdBQUdELE1BQU0sRUFBRS9GLENBQUMsR0FBRyxJQUFJLENBQUM0QixNQUFNLENBQUMxRCxNQUFNLEVBQUU4QixDQUFDLEVBQUUsRUFBRWdHLENBQUMsR0FBRyxDQUFDaEcsQ0FBQyxHQUFHK0YsTUFBTSxJQUFJLElBQUksQ0FBQ25FLE1BQU0sQ0FBQzFELE1BQU0sRUFBRTtRQUMxRixJQUFJSCxLQUFLLEdBQUcsSUFBSSxDQUFDNkQsTUFBTSxDQUFDb0UsQ0FBQyxDQUFDLEVBQUU7RUFDMUIsUUFBQTtFQUNGO0VBQ0Y7RUFDQSxJQUFBLElBQUksRUFBRUEsQ0FBQyxHQUFHLENBQUMsRUFBRTtFQUNYQSxNQUFBQSxDQUFDLElBQUksSUFBSSxDQUFDcEUsTUFBTSxDQUFDMUQsTUFBTTtFQUN6QjtFQUNBLElBQUEsT0FBTzhILENBQUM7RUFDVjtJQUVBQyxTQUFTQSxDQUFDckUsTUFBTSxFQUFFO01BQ2hCLElBQUksQ0FBQ0EsTUFBTSxHQUFHQSxNQUFNO01BQ3BCLElBQUksQ0FBQzlCLFVBQVUsQ0FBQ3NFLE9BQU8sQ0FBQyxDQUFDckMsU0FBUyxFQUFFL0IsQ0FBQyxLQUFLO0VBQ3hDLE1BQUEsTUFBTWpDLEtBQUssR0FBRyxJQUFJLENBQUM2RCxNQUFNLENBQUM1QixDQUFDLENBQUM7UUFDNUIsTUFBTUMsUUFBUSxHQUFHOEIsU0FBUyxDQUFDa0MsT0FBTyxFQUFFLENBQUM5RCxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzlDLE1BQU12RCxRQUFRLEdBQUdXLHdCQUF3QixDQUN2Q1EsS0FBSyxFQUNMLElBQUksQ0FBQ1ksT0FBTyxDQUFDOEUsV0FBVyxFQUN4QixJQUFJLENBQUM5RSxPQUFPLENBQUNSLE1BQU0sQ0FBQ1IsR0FBRyxDQUFDc0MsUUFBUSxDQUNsQyxDQUFDO0VBRUQ4QixNQUFBQSxTQUFTLENBQUNPLFdBQVcsQ0FBQzFGLFFBQVEsQ0FBQztFQUNqQyxLQUFDLENBQUM7TUFDRixJQUFJLENBQUNpRSxJQUFJLEVBQUU7RUFDYjtJQUVBcUYsWUFBWUEsQ0FBQzVDLEtBQUssRUFBRTtNQUNsQixNQUFNNkMsYUFBYSxHQUFHOUMsd0JBQXdCLENBQUNDLEtBQUssRUFBRSxJQUFJLENBQUN4RCxVQUFVLENBQUM1QixNQUFNLENBQUM7TUFDN0UsSUFBSSxDQUFDa0ksY0FBYyxHQUFHOUMsS0FBSztNQUMzQixJQUFJLENBQUN4RCxVQUFVLENBQUNzRSxPQUFPLENBQUMsQ0FBQ3JDLFNBQVMsRUFBRS9CLENBQUMsS0FBSztRQUN4QytCLFNBQVMsQ0FBQ3NFLE1BQU0sR0FBR0YsYUFBYSxDQUFDRyxPQUFPLENBQUN0RyxDQUFDLENBQUMsS0FBSyxFQUFFO0VBQ3BELEtBQUMsQ0FBQztNQUNGLElBQUksQ0FBQ2EsSUFBSSxFQUFFO0VBQ2I7RUFDRjs7Ozs7Ozs7Ozs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlsxXX0=
