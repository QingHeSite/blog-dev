<style lang="scss" scoped>
.globe-container {
    width: 40vw;
    height: 40vw;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 1px solid #000;
    position: fixed;
    top: 40px;
    right: 2px;
    z-index: 1000;
}
</style>
<template>
    <div class="globe-container" ref="globeContainer">
    </div>
</template>
<script setup>
import { ref, onMounted, useTemplateRef, nextTick } from "vue";
import countries from "./files/globe-data-min.json";
import travelHistory from "./files/my-flights.json";
import airportHistory from "./files/my-airports.json";

const globeContainer = useTemplateRef("globeContainer");
// const renderSize = 700;
const getRenderSize = () => {
    return window.innerWidth * 0.4
}

onMounted(async () => {
    if (typeof window !== "undefined") {
        await nextTick();
        const { WebGLRenderer, Scene, PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, Color, Fog, Mesh, SphereGeometry, TextureLoader, MeshPhongMaterial } = await import("three");
        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
        const { TrackballControls } = await import("three/examples/jsm/controls/TrackballControls.js")
        const ThreeGlobe = (await import("three-globe")).default;

        var renderer, camera, scene, controls, tbControls;
        let mouseX = 0;
        let mouseY = 0;
        let windowHalfX = window.innerWidth / 2;
        let windowHalfY = window.innerHeight / 2;
        var Globe;
        let renderSize = getRenderSize();
        init();
        initGlobe();
        onWindowResize();
        animate();

        // SECTION Initializing core ThreeJS elements
        function init() {
            // Initialize renderer
            renderer = new WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(renderSize, renderSize);
            // renderer.outputEncoding = THREE.sRGBEncoding;
            globeContainer.value.appendChild(renderer.domElement);

            // Initialize scene, light
            scene = new Scene();
            scene.add(new AmbientLight(0xbbbbbb, 0.3));
            scene.background = null;

            // Initialize camera, light
            camera = new PerspectiveCamera();
            camera.aspect = renderSize / renderSize;
            camera.updateProjectionMatrix();

            var dLight = new DirectionalLight(0xffffff, 0.8);
            dLight.position.set(-800, 2000, 400);
            camera.add(dLight);

            var dLight1 = new DirectionalLight(0x7982f6, 1);
            dLight1.position.set(-200, 500, 200);
            camera.add(dLight1);

            var dLight2 = new PointLight(0x8566cc, 0.5);
            dLight2.position.set(-200, 500, 200);
            camera.add(dLight2);

            camera.position.z = 400;
            camera.position.x = 0;
            camera.position.y = 0;

            scene.add(camera);

            // Additional effects
            scene.fog = new Fog(0x535ef3, 400, 2000);

            // Helpers
            // const axesHelper = new AxesHelper(800);
            // scene.add(axesHelper);
            // var helper = new DirectionalLightHelper(dLight);
            // scene.add(helper);
            // var helperCamera = new CameraHelper(dLight.shadow.camera);
            // scene.add(helperCamera);

            // Initialize controls
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dynamicDampingFactor = 0.01;
            controls.enablePan = false;
            controls.minDistance = 200;
            controls.maxDistance = 500;
            controls.rotateSpeed = 0.8;
            controls.zoomSpeed = 1;
            controls.autoRotate = true;

            controls.minPolarAngle = Math.PI / 3.5;
            controls.maxPolarAngle = Math.PI - Math.PI / 3;

            window.addEventListener("resize", onWindowResize, false);
            // document.addEventListener("mousemove", onMouseMove);
        }

        // SECTION Globe
        function initGlobe() {
            // Initialize the Globe
            Globe = new ThreeGlobe({
                waitForGlobeReady: true,
                animateIn: true,
            })
                // .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
                .hexPolygonsData(countries.features)
                .hexPolygonResolution(3)
                .hexPolygonMargin(0.7)
                .showAtmosphere(true)
                .atmosphereColor("#3a228a")
                .atmosphereAltitude(0.25)
                .hexPolygonColor((e) => {
                    if (
                        ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
                            e.properties.ISO_A3
                        )
                    ) {
                        return "rgba(255,255,255, 1)";
                    } else return "rgba(255,255,255, 0.7)";
                });

            // NOTE Arc animations are followed after the globe enters the scene
            setTimeout(() => {
                Globe.arcsData(travelHistory.flights)
                    .arcColor((e) => {
                        return e.status ? "#007dff" : "#FF4000";
                    })
                    .arcAltitude((e) => {
                        return e.arcAlt;
                    })
                    .arcStroke((e) => {
                        return e.status ? 0.5 : 0.3;
                    })
                    .arcDashLength(0.9)
                    .arcDashGap(4)
                    .arcDashAnimateTime(1000)
                    .arcsTransitionDuration(1000)
                    .arcDashInitialGap((e) => e.order * 1)
                    .labelsData(airportHistory.airports)
                    .labelColor(() => "#ffcb21")
                    .labelDotOrientation((e) => {
                        return e.text === "ALA" ? "top" : "right";
                    })
                    .labelDotRadius(0.3)
                    .labelSize((e) => e.size)
                    .labelText("city")
                    .labelResolution(6)
                    .labelAltitude(0.01)
                    .pointsData(airportHistory.airports)
                    .pointColor(() => "#ffffff")
                    .pointsMerge(true)
                    .pointAltitude(0.07)
                    .pointRadius(0.05);

            }, 1000);

            Globe.rotateY(-Math.PI * (5 / 9));
            Globe.rotateZ(-Math.PI / 6);
            const globeMaterial = Globe.globeMaterial();
            globeMaterial.color = new Color(0x3a228a);
            globeMaterial.emissive = new Color(0x220038);
            globeMaterial.emissiveIntensity = 0.1;
            globeMaterial.shininess = 0.7;

            // NOTE Cool stuff
            // globeMaterial.wireframe = true;
            console.log('globe', Globe);

            // const Clouds = new Mesh(new SphereGeometry(Globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75));
            // new TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
            //     Clouds.material = new MeshPhongMaterial({ map: cloudsTexture, transparent: true });
            // });
            // Globe.add(Clouds);
            scene.add(Globe);
        }

        function onMouseMove(event) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
            // console.log("x: " + mouseX + " y: " + mouseY);
        }

        function onWindowResize() {
            renderSize = getRenderSize();
            camera.aspect = renderSize / renderSize;
            camera.updateProjectionMatrix();
            windowHalfX = renderSize / 1.5;
            windowHalfY = renderSize / 1.5;
            renderer.setSize(renderSize, renderSize);
        }

        function animate() {
            // camera.position.x +=
            //   Math.abs(mouseX) <= windowHalfX / 2
            //     ? (mouseX / 2 - camera.position.x) * 0.005
            //     : 0;
            // camera.position.y += (-mouseY / 2 - camera.position.y) * 0.005;
            // camera.lookAt(scene.position);
            controls.update();
            // tbControls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

    }
});
</script>
