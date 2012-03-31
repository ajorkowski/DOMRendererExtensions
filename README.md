# DOMRendererExtensions

Extensions added to the DOM Renderer class in three.js. The original class just includes left/top css
transformations and nothing else. This version of the DOM renderer has the following features:

* The point of the particle is the centre of the element - not the top left corner
* Uses the CSS3 transform to scale the element and supports browser specific versions of it
* Properly defines the zIndex of the element

See <a href="https://github.com/mrdoob/three.js/">Three.js</a>

Update: This code has been merged into the Dev version of DOMRenderer

## Usage
This renderer only supports rendering Particle objects with a ParticleDOMMaterial in three.js

```
var particle = new THREE.Particle(new THREE.ParticleDOMMaterial(domElement));
```

## Example
A working demo can be seen on my website <a href="http://www.jorkowski.com">www.jorkowski.com</a>.
Give it a second to load, then you can rotate the menu around by click dragging the mouse.