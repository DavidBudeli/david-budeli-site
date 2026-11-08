#include ../includes/avatar-progress/fragment.glsl;
#include ../includes/about-ambient.glsl;

uniform vec3 uColor;
varying vec3 vViewNormal;

void main() {
    vec3 normal = normalize(vViewNormal);
    float light = 0.58 + 0.42 * max(dot(normal, normalize(vec3(-0.3, 0.8, 1.0))), 0.0);
    float sheen = pow(1.0 - abs(normal.z), 3.0) * 0.12;
    gl_FragColor = vec4(applyAmbient(uColor * light + sheen), getProgress());
}
