this.DOMRenderer = class DOMRenderer
	constructor: ->
		@projector = new THREE.Projector()
		@domElement = document.createElement 'div' 
		@transformProp = @getSupportedProp ['transform', 'MozTransform', 'WebkitTransform', 'msTransform', 'OTransform']

	setSize: (width, height) ->
		@width = width 
		@height = height
		@widthHalf = @width >> 1
		@heightHalf = @height >> 1

	render: (scene, camera) ->
		renderData = @projector.projectScene(scene, camera)

		for element in renderData.elements
			if element instanceof THREE.RenderableParticle and element.material instanceof THREE.ParticleDOMMaterial
				dom = element.material.domElement
				v1x = element.x * @widthHalf + @widthHalf - (dom.offsetWidth >> 1)
				v1y = element.y * @heightHalf + @heightHalf - (dom.offsetHeight >> 1)
				
				scaleX = element.scale.x * @widthHalf 
				scaleY = element.scale.y * @heightHalf
				scaleVal = "scale(#{scaleX},#{scaleY})"
				
				if @transformProp
					dom.style[@transformProp] = scaleVal
					
				dom.style.zIndex = Math.abs Math.floor (1 - element.z) * camera.far / camera.near
				dom.style.left = v1x + 'px'
				dom.style.top = v1y + 'px'
				
		return
					
	getSupportedProp: (proparray) ->
		root = document.documentElement
		for prop in proparray
			if (typeof root.style[prop]=="string")
				return prop
		return null
