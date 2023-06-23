import { useEffect, useState } from "react";
import Info from "./Info";
import { getAllState } from "../common/storage";
import RunningPage from "./running";

function App() {
  const [state, setState] = useState<TExtensionState>({} as TExtensionState);

  useEffect(() => {
    getAllState().then(setState);
    chrome.storage.onChanged.addListener((changes) => {
      changes;
      getAllState().then(setState);
    });
  }, []);

  return (
    <div className="min-h-[25rem] w-96 h-[512px] m-2 p-2 border">
      <h2 className="text-xl drop-shadow-md font-semibold text-center">
        Auto Message Sender
      </h2>
      <div className="divider mt-0" />
      {state.runningState === "idle" ? <Info /> : <RunningPage {...state} />}
    </div>
  );
}

export default App;
