# DOMRendererExtensions

Extensions added to the DOM Renderer class in three.js. The original class just includes left/top css
transformations and nothing else. This version of the DOM renderer has the following features:

* The point of the particle is the centre of the element - not the top left corner
* Uses the CSS3 transform to scale the element and supports browser specific versions of it
* Properly defines the zIndex of the element

## Usage
This renderer only supports rendering Particle objects with a ParticleDOMMaterial in three.js

```
var particle = new THREE.Particle(new THREE.ParticleDOMMaterial(domElement));
```