export class babylonMod {


    constructor(_element) {
        this.canvas = document.getElementById('renderCanvas');
        setTimeout(this.init.bind(this), 500);
        this.mode = 'vr';
    }

    init() {

        this.engine = new BABYLON.Engine(this.canvas , true);
        var scene = new BABYLON.Scene(this.engine);

        //Create a light
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(100, 100, 0), scene);

        //Create an Arc Rotate Camera - aimed negative z this time

        var camera = new BABYLON.VRDeviceOrientationFreeCamera("Camera", new BABYLON.Vector3(0, 2, 0), scene, true);
        camera.attachControl(this.canvas, true);
        scene.activeCamera = camera;

        //Material generated using raananw's babylon material editor, https://github.com/raananw/BabylonJS-Material-Editor ;
        var _holoDeck = new BABYLON.StandardMaterial('holo deck', scene);
        _holoDeck.alpha = 1;
        _holoDeck.backFaceCulling = false;
        _holoDeck.specularPower = 1;
        _holoDeck.useSpecularOverAlpha = true;
        _holoDeck.useAlphaFromDiffuseTexture = false;

        // diffuse definitions;

        _holoDeck.diffuseColor = new BABYLON.Color3(1.00, 1.00, 1.00);
        //Texture Parameters ;
        //TODO change the filename to fit your needs!;
        var _holoDeck_diffuseTexture = new BABYLON.Texture('build/img/textures/_holoDeck_diffuse.png', scene);
        _holoDeck_diffuseTexture.uScale = 5;
        _holoDeck_diffuseTexture.vScale = 5;
        _holoDeck_diffuseTexture.coordinatesMode = 0;
        _holoDeck_diffuseTexture.uOffset = 0;
        _holoDeck_diffuseTexture.vOffset = 0;
        _holoDeck_diffuseTexture.uAng = 0;
        _holoDeck_diffuseTexture.vAng = 0;
        _holoDeck_diffuseTexture.level = 1;
        _holoDeck_diffuseTexture.coordinatesIndex = 0;
        _holoDeck_diffuseTexture.hasAlpha = true;
        _holoDeck_diffuseTexture.getAlphaFromRGB = false;

        _holoDeck.diffuseTexture = _holoDeck_diffuseTexture;

        // emissive definitions;

        _holoDeck.emissiveColor = new BABYLON.Color3(0.00, 0.75, 0.00);

        // ambient definitions;

        _holoDeck.ambientColor = new BABYLON.Color3(0.00, 0.03, 0.04);

        // specular definitions;

        _holoDeck.specularColor = new BABYLON.Color3(0.00, 0.75, 0.00);

        // reflection definitions;

        //Fresnel Parameters ;

        var _holoDeck_reflectionFresnel = new BABYLON.FresnelParameters();
        _holoDeck_reflectionFresnel.isEnabled = true;
        _holoDeck_reflectionFresnel.bias = 0.8;
        _holoDeck_reflectionFresnel.power = 1;
        _holoDeck_reflectionFresnel.leftColor = new BABYLON.Color3(1, 1, 1);
        _holoDeck_reflectionFresnel.rightColor = new BABYLON.Color3(0, 0, 0);
        _holoDeck.reflectionFresnelParameters = _holoDeck_reflectionFresnel;


        var box = BABYLON.Mesh.CreateBox("box", 17.0, scene);
        box.material = _holoDeck;
        //Creation of a plane
        var plane = BABYLON.Mesh.CreatePlane("plane", 20, scene);
        plane.position.y = -5;
        plane.rotation.x = Math.PI / 2;



        //Creation of a repeated textured material
        var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("build/img/textures/grass.jpg", scene);
        materialPlane.diffuseTexture.uScale = 5.0; //Repeat 5 times on the Vertical Axes
        materialPlane.diffuseTexture.vScale = 5.0; //Repeat 5 times on the Horizontal Axes
        materialPlane.backFaceCulling = false; //Always show the front and the back of an element


        plane.material = materialPlane;

        var skybox = BABYLON.Mesh.CreateBox("skyBox", 500.0, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("build/img/textures/TropicalSunnyDay", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;

        scene.executeWhenReady(function() {
            this.engine.runRenderLoop(function() {
                scene.render();
            });
        }.bind(this));


        return scene;

        window.addEventListener("resize", function() {
            this.engineengine.resize();
        });

    }

    toggle(){
        if(this.mode == 'vr'){
            this.mode = 'nomral';
            
        }else{
            this.mode = 'vr';
        }
    }


}