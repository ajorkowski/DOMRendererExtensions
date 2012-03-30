(function() {
  var DOMRenderer;

  this.DOMRenderer = DOMRenderer = (function() {

    function DOMRenderer() {
      this.projector = new THREE.Projector();
      this.domElement = document.createElement('div');
      this.transformProp = this.getSupportedProp(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);
    }

    DOMRenderer.prototype.setSize = function(width, height) {
      this.width = width;
      this.height = height;
      this.widthHalf = this.width >> 1;
      return this.heightHalf = this.height >> 1;
    };

    DOMRenderer.prototype.render = function(scene, camera) {
      var dom, element, renderData, scaleVal, scaleX, scaleY, v1x, v1y, _i, _len, _ref;
      renderData = this.projector.projectScene(scene, camera);
      _ref = renderData.elements;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        element = _ref[_i];
        if (element instanceof THREE.RenderableParticle && element.material instanceof THREE.ParticleDOMMaterial) {
          dom = element.material.domElement;
          v1x = element.x * this.widthHalf + this.widthHalf - (dom.offsetWidth >> 1);
          v1y = element.y * this.heightHalf + this.heightHalf - (dom.offsetHeight >> 1);
          scaleX = element.scale.x * this.widthHalf;
          scaleY = element.scale.y * this.heightHalf;
          scaleVal = "scale(" + scaleX + "," + scaleY + ")";
          if (this.transformProp) dom.style[this.transformProp] = scaleVal;
          dom.style.zIndex = Math.abs(Math.floor((1 - element.z) * camera.far / camera.near));
          dom.style.left = v1x + 'px';
          dom.style.top = v1y + 'px';
        }
      }
    };

    DOMRenderer.prototype.getSupportedProp = function(proparray) {
      var prop, root, _i, _len;
      root = document.documentElement;
      for (_i = 0, _len = proparray.length; _i < _len; _i++) {
        prop = proparray[_i];
        if (typeof root.style[prop] === "string") return prop;
      }
      return null;
    };

    return DOMRenderer;

  })();

}).call(this);
