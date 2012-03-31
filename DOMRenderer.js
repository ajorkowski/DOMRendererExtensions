THREE.DOMRenderer = function () {
	var _renderList = null,
	_projector = new THREE.Projector(),
	_div = document.createElement( 'div' ),
	_width, _height, _widthHalf, _heightHalf, _transformProp;
	
	var getSupportedProp = function (proparray) {
    var root = document.documentElement
    for ( var i = 0; i < proparray.length; i++ ) { 
        if (typeof root.style[proparray[i]]=="string") { 
            return proparray[i]
        }
    }
    return null;
  };
  
  _transformProp = getSupportedProp(['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']);

	this.domElement = _div;

	this.setSize = function ( width, height ) {
		_width = width; _height = height;
		_widthHalf = _width / 2; _heightHalf = _height / 2;
	};

	this.render = function ( scene, camera ) {
		var e, el, m, ml, element, material, dom, v1x, v1y;

		_renderList = _projector.projectScene( scene, camera );
		
		for ( e = 0, el = _renderList.elements.length; e < el; e++ ) {

			element = _renderList.elements[ e ];

			if ( element instanceof THREE.RenderableParticle && element.material instanceof THREE.ParticleDOMMaterial ) {

				dom = element.material.domElement;
				
				v1x = element.x * _widthHalf + _widthHalf - (dom.offsetWidth >> 1); 
				v1y = element.y * _heightHalf + _heightHalf - (dom.offsetHeight >> 1);
				
				dom.style.left = v1x + 'px';
				dom.style.top = v1y + 'px';
				dom.style.zIndex = Math.abs(Math.floor((1 - element.z) * camera.far / camera.near))

				if(_transformProp) {
					scaleX = element.scale.x * _widthHalf;
					scaleY = element.scale.y * _heightHalf;
					scaleVal = "scale(" + scaleX + "," + scaleY + ")";
					dom.style[_transformProp] = scaleVal;
				}
			}
		}
	};
}
