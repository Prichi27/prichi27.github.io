import './App.css';

function App() {
  return (
    <div className=" min-h-screen min-w-full bg-slate-800">

      {/* Main Resume Body */}
      <div className="flex flex-row w-80 h-auto bg-slate-200">
        
        {/* Main Details */}
        <div className="main-details">
          <div className="profile-photo"></div>
          <div className="contact-details"></div>
        </div>

        {/* Skills Container */}
        <div className="skills-container">
          <div className="education"></div>
          <div className="certificate"></div>
          <div className="skills"></div>
        </div>

        {/* Experience */}
        <div className="experience">
        </div>

      </div>
    </div>
  );
}

export default App;
