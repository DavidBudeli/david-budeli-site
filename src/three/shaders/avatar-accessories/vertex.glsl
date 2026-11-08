#include ../includes/avatar-progress/vertex.glsl;

varying vec3 vViewNormal;

void main() {
    vViewNormal = normalize(normalMatrix * normal);
    vModelProgress = getModelProgress(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
