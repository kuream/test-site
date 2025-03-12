import "./App.css";
import Dither from "./Backgrounds/Dither/Dither";

function App() {
  return (
    <>
      <div className='dither-container' style={{ width: "100%", height: "100%", position: "relative" }}>
        <Dither
          waveColor={[0.5, 0.5, 0.5]}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.1}
          colorNum={1}
          waveAmplitude={0.2}
          waveFrequency={2.2}
          waveSpeed={0.07}
        />
      </div>
    </>
  );
}

export default App;
