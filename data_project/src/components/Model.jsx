import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useCallback } from "react";
import { useGLTF, Environment, OrbitControls, ContactShadows, SpotLight } from "@react-three/drei";
import { proxy, useSnapshot} from 'valtio'
import { HexColorPicker } from "react-colorful";


const state = proxy({
  current : null,
  items : {
    
  }
})

function Picker() {
  const snap = useSnapshot(state)
  return (
    <div style = {{display : snap.current ? "block" : "none"}}>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <h1 className = "pickertext" style={{color: "white", position : "relative", right: "60px",lineHeight: "60px", letterSpacing : "-3px", margin : "15px", fontSize : "4em"}}>{snap.current}</h1>
    </div>
  )
}

function Model() {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF('/bike.glb')
  const [ meshes, setMeshes ] = useState(() => [
    { id : "cylinder", geometry : nodes.Cylinder.geometry, material : materials.Body, materialName: "Body", position : [0, 16.6, -51.14], rotation : [0.24, -0.1, -0.01], scale : [2.61, 6.62, 2.88]},
    { id : "back_wheel", geometry : nodes.Back_Wheel.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals", position : [0, -24.01, 49.29], rotation : [Math.PI, -0.01, Math.PI] },
    { id : "between_pedals", geometry : nodes.Between_Pedals.geometry, material : materials.Body, materialName:  "Body", position : [-0.32, 6.38, 0] },
    { id : "body", geometry : nodes.Body.geometry, material : materials.Body, materialName:  "Body", position : [0, 6.65, 0] },
    { id : "chain", geometry : nodes.Chain.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals", position : [4.75, -24.31, 22.59], rotation : [0, -1.53, 0], scale : 113.38 },
    { id : "front_wheel", geometry : nodes.Front_Wheel.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals",  position : [-0.17, -26.48, -62.75] },
    { id : "gear", geometry : nodes.Gear.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals", position : [6.22, -24.04, 48.6], scale : -56.33 },
    { id : "gear_2", geometry : nodes.Gear_2.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals", position : [3.9, -24.52, 2.13], scale : 2.65 },
    { id : "left_pedal", geometry : nodes.Left_Pedal.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals",  position : [-0.86, -25.12, 6.42], rotation : [0, 0, 3.14], scale : 1.08 },
    { id : "right_pedal", geometry : nodes.Right_Pedal.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals", position : [1.52, -26.29, 5.69] },
    { id : "seat", geometry : nodes.Seat.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals",position : [0, 34.6, 19.54] },
    { id : "steering_wheel", geometry : nodes.Steering_Wheel.geometry, material : materials.Wheel , materialName : "Front", position : [0, 2.21, -54.71]},
    { id : "bell" , geometry : nodes.bell.geometry, material : materials.Material, materialName : "Bell", position : [-29.92, 66.23, -50.35], rotation : [Math.PI, -1.51, Math.PI], scale : 4.45},
    { id : "iPhoneMount",  geometry : nodes.Bike_mount_iPhone6.geometry , material : nodes.Bike_mount_iPhone6.material , materialName : "iPhone Mount", position : [-0.93, 63.83, -50.1], rotation : [1.42, -0.02, -1.55], scale : 0.08 },
    { id : "GoProMount",  geometry : nodes.bike_Mount.geometry, material : materials['Bike Mount'], materialName : "GoPro Mount", position : [42.82, 51.13, -37.56], rotation : [-Math.PI, 1.54, -Math.PI], scale : 0.19 }
  ])

  const removeMeshById = useCallback((id) => {
    setMeshes((meshes) => meshes.filter((mesh) => mesh.id !== id));
  }, []);

  const addMesh = useCallback((mesh) => {
    setMeshes((meshes) => [...meshes, mesh]);
  }, []);


  useEffect(() => {
    meshes.forEach((mesh) => {
      mesh.material.color.set(snap.items[mesh.materialName])
    })
  }, [snap.items, snap.color])


  return (
    <>
    <section id="model">
    <div flex = "1" style = {{display: 'flex', justifyContent:'left'}}>
      <h1 style={{color:"white", fontFamily : "poppins", fontSize : "40px", fontWeight : '500'}}>
        Bike Model
      </h1>
    </div>
    <div className="model" style = {{position: "sticky", display: 'flex', justifyContent: 'flex', width: "1300px", height: "700px", marginTop: '30px'}} >
    <Canvas style = {{backgroundImage: "url('https://img.freepik.com/premium-photo/modern-brand-new-home-garage-interior-background_1372-1356.jpg?w=2000')", objectFit: "fit", backgroundRepeat : 'no-repeat', backgroundSize :'cover'}} camera={{ fov: 100, position : [130, 10, -100]}}>
        <ambientLight intensity={1.25} />
        <SpotLight intensity={0.3} position = {[15,20,20]} />
        <Suspense fallback={null}>
        <group {...meshes} dispose={null}
          onPointerMissed = {(e) => (state.current = null)}
          onPointerDown = {(e) => (state.current = e.object.materialName)}
        >
          {meshes.map((mesh) => (
            <mesh
              key={mesh.id}
              geometry={mesh.geometry}
              material={mesh.material}
              materialName = {mesh.materialName}
              position={mesh.position}
              rotation={mesh.rotation}
              scale={mesh.scale}
              materialColor={mesh.materialColor}
            />
          ))}
        </group>
        </Suspense>
        <Environment files= "royal_esplanade_1k.hdr" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
        <OrbitControls />
      </Canvas>
      </div>
      <div className="pickerandbuttons" style = {{ width: "1300px", height: "400px", marginTop: '30px'}} >
      <div className = "buttons1" style = {{display: 'flex', position: 'absolute', right: '30px', marginTop: '50px'}}>
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => removeMeshById("seat")}>Remove Seat</button>
      
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => addMesh({ id : "seat", geometry : nodes.Seat.geometry, material : materials.Everything_else, materialName : "Wheels, Seat and Pedals",position : [0, 34.6, 19.54]})}>Add Seat</button>
      </div>
      <div className = "buttons2" style = {{display: 'flex', position: 'absolute', right: '30px', marginTop: '120px'}}>
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => removeMeshById("iPhoneMount")}>Remove iPhone Mount</button>
      
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => addMesh({ id : "iPhoneMount",  geometry : nodes.Bike_mount_iPhone6.geometry , material : nodes.Bike_mount_iPhone6.material , materialName : "iPhone Mount", position : [-0.93, 63.83, -50.1], rotation : [1.42, -0.02, -1.55], scale : 0.08 })}>Add iPhone Mount</button>
      </div>
      <div className = "buttons3" style = {{display: 'flex', position: 'absolute', right: '30px', marginTop: '190px'}}>
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => removeMeshById("GoProMount")}>Remove GoPro Mount</button>
      
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => addMesh( { id : "GoProMount",  geometry : nodes.bike_Mount.geometry, material : materials['Bike Mount'], materialName : "GoPro Mount", position : [42.82, 51.13, -37.56], rotation : [-Math.PI, 1.54, -Math.PI], scale : 0.19 })}>Add GoPro Mount</button>
      </div>
      <div className = "buttons4" style = {{display: 'flex', position: 'absolute', right: '30px', marginTop: '260px'}}>
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => removeMeshById("bell")}>Remove Bell</button>
      
      <button style={{marginRight : "20px", backgroundColor : "white", color : "black", borderRadius : "20px", padding : "10px", fontSize : "20px", fontWeight : "500"}} onClick={() => addMesh({ id : "bell" , geometry : nodes.bell.geometry, material : materials.Material, materialName : "Bell", position : [-29.92, 66.23, -50.35], rotation : [Math.PI, -1.51, Math.PI], scale : 4.45})}>Add Bell</button>
      </div>
      
      <div className = "pickeredit" style={{position : 'absolute', left: '100px', marginTop: "30px", width : "400px"}}>
        <Picker/>
      </div>
      </div>
      </section>
    </>
  );
}

export default Model;