import React from "react";
import Profile from "./modules/profile";
import Skills from "./modules/skills";
import { ThreeContainer } from "./modules/three";

const App = () => {
  return (
    <div className="bg-main flex justify-center items-center w-full h-full">
      <ThreeContainer />
      <div className="h-100 z-10 w-full text-white flex flex-col justify-center items-center">
        <h1 className="text-6xl uppercase">Under</h1>
        <h1 className="text-6xl uppercase">Construction</h1>
      </div>
    </div>
    // <div className="flex justify-center min-h-screen max-h-fit min-w-full bg-main">

    //   {/* Main Resume Body */}
    //   <div className="flex flex-col p-5 items-center w-1/2 min-h-screen bg-resume space-y-4">

    //     {/* Main Details */}
    //     <Profile />

    //     <div className="border-separator"></div>

    //     {/* Skills Container */}
    //     <Skills />

    //     <div className="border-separator"></div>

    //     {/* Experience */}
    //     <div className="experience">
    //       <h2 className="font-header">Experience</h2>
    //       <div className="flex flex-col">
    //         <span>Streamline Studios</span>
    //         <span>Game Programmer ( 10 Jan 2022 - Present )</span>
    //         <span>Technology: Unity, C#, Unreal, C++</span>
    //         <ul>
    //           <li>Developing 3D immersive technologies for companies.</li>
    //           <li>AR and VR experiences.</li>
    //           <li>Providing engine tools to facilitate users workflow.</li>
    //           <li>Gameplay programming and design.</li>
    //           <li>Networked game and architecture in UE5</li>
    //           <li>Tasks breakdown, planning and assignments.</li>
    //         </ul>
    //       </div>

    //       <div className="flex flex-col">
    //         <span>Streamline Studios</span>
    //         <span>Game Programmer ( 10 Jan 2022 - Present )</span>
    //         <span>Technology: Unity, C#, Unreal, C++</span>
    //         <ul>
    //           <li>Developing 3D immersive technologies for companies.</li>
    //           <li>AR and VR experiences.</li>
    //           <li>Providing engine tools to facilitate users workflow.</li>
    //           <li>Gameplay programming and design.</li>
    //           <li>Networked game and architecture in UE5</li>
    //           <li>Tasks breakdown, planning and assignments.</li>
    //         </ul>
    //       </div>

    //       <div className="flex flex-col">
    //         <span>Streamline Studios</span>
    //         <span>Game Programmer ( 10 Jan 2022 - Present )</span>
    //         <span>Technology: Unity, C#, Unreal, C++</span>
    //         <ul>
    //           <li>Developing 3D immersive technologies for companies.</li>
    //           <li>AR and VR experiences.</li>
    //           <li>Providing engine tools to facilitate users workflow.</li>
    //           <li>Gameplay programming and design.</li>
    //           <li>Networked game and architecture in UE5</li>
    //           <li>Tasks breakdown, planning and assignments.</li>
    //         </ul>
    //       </div>
    //     </div>

    //   </div>
    // </div>
  );
}

export default App;
