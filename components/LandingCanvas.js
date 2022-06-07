// Step 5 - delete Instructions components
import { useThree, useFrame, Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import {
    CubeTextureLoader,
    CubeCamera,
    WebGLCubeRenderTarget,
    RGBFormat,
} from "three";
import presentationStyle from "../styles/jss/nextjs-material-kit-pro/pages/presentationStyle.js";
const useStyles = makeStyles(presentationStyle);

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49

function Skybox() {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();

    const texture = loader.load([
        "sky/left.png",
        "sky/right.png",
        "sky/top.png",
        "sky/bottom.png",
        "sky/back.png",
        "sky/front.png",
    ]);

    scene.background = texture;

    return null;
}

function Sphere() {
    const { scene, gl } = useThree();

    const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
        format: RGBFormat,
        generateMipmaps: true,
    });

    const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
    cubeCamera.position.set(0, 0, 0);
    scene.add(cubeCamera);

    useFrame(() => cubeCamera.update(gl, scene));

    return (
        <mesh>
            <meshBasicMaterial
                attach="material"
                envMap={cubeCamera.renderTarget.texture}
                color="white"
                roughness={0.01}
                metalness={1}
            />
        </mesh>
    );
}

const LandingCanvas = () => {
    const classes = useStyles();
    return (
        <>
        <Canvas linear>
            <Skybox />
            {/* <Sphere /> */}
            <OrbitControls autoRotate autoRotateSpeed={0.25} />
        </Canvas>
        </>
    );
};

export default LandingCanvas;

export async function getStaticProps() {
    return {
        props: {
            title: "Index",
        },
    };
}
