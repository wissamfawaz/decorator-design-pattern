# CycleIn

Welcome to our CycleIn Project!

Our website can be found on https://cycle-in.vercel.app/.
It might take some time to load as we are using free hosting.

The project started with the idea of implementing the decorator design pattern, whose whole point is to create decorator classes, which wrap the original class and supply additional functionality.

We realized that React, by default, implements the decorator design pattern through the HOC pattern which allows us to reuse component logic without repeating code. Also, we utilized the decorator design pattern in a function-based manner by wrapping the functions with hooks in each other.

We wanted to use the full abilities of the decorator design pattern and implement it in a way the user can see it, hence why we thought of an online garage. The CycleIn application allows you to decorate your own bicycle and explore several features. It also allows the user to be fully creative with his color choices and gives him the options of a few add-ons.

To implement the project, a 3D design of a bike was first created with the add-ons, and then exported to a glb file (gltf 2.0). Then, using the gltfjsx library, we transformed it into a javascript file that contained the 3D model. We then started using Three.js to render the 3D model.

Since a 3D model is made up of several components (called meshes or objects in 3D design), our main data structure was an array of these meshes, where each mesh had an ID, a material, a geometry, material color, and so on. We then added two functions that interact with this array by calling the function again through a UseCallback (changes only when the inputs are changed.) This is an example of utilising the decorator design pattern.

Then, we created a color picker for the user using ReactColorful and used a map to map each mesh with its id, geometry, material, position, rotation, scale, and so on. The useEffect function allows the user to change the color of the material he's selected when he selects a color in the color picker.

Then, to render the 3D model, we set up its environment, with ambient light, spotlight, suspense, textures, shadows, and finally gave orbit controls to the user to allow him to interact with it however he wants.

We also added buttons to allow the user to remove and add the optional add-ons using the two functions we specified before, removeMeshbyID and addMesh.

The rest of the frontend was made to allow a user-friendly environment for the idea of the online garage, including a navbar, quotes and pictures, a footer, etc...

We then deployed the project on Vercel for ease of submission.
