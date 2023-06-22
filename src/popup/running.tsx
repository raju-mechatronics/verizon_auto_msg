import React from "react";
import { clear, resume, start, stop } from "../common/storage";
import ReactLoading from "react-loading";
import SetView from "./setView";

export default function RunningPage({
  runningState,
  queue,
  sent,
  failed,
}: Partial<TExtensionState>) {
  function runningStateTextStye(runningState: RunningState): string {
    switch (runningState) {
      case "running":
        return "text-primary text-center text-xl";
      case "stopped":
        return "text-error text-center text-xl m-2";
      case "ready":
        return "text-success text-center text-xl m-2";
      case "finished":
        return "text-success text-center text-xl m-2";
      default:
        return "text-center text-xl m-2";
    }
  }
  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between">
        {runningState === "ready" && (
          <button className="btn btn-primary btn-sm" onClick={start}>
            Start
          </button>
        )}
        {runningState === "running" && (
          <button className="btn btn-info btn-sm" onClick={stop}>
            Stop
          </button>
        )}
        {runningState === "stopped" && (
          <button className="btn btn-primary btn-sm" onClick={resume}>
            Resume
          </button>
        )}
        <button className="btn btn-error btn-sm" onClick={clear}>
          clear
        </button>
      </div>
      {/* status of sent, failed out of total */}
      <div className="text-center text-xl text-primary w-full">
        {sent?.length || "0"} sent, {failed?.length || "0"} failed out of{" "}
        {queue?.length}
      </div>
      <div className="flex flex-col items-center justify-center p-10">
        {runningState === "running" && (
          <ReactLoading
            type="spokes"
            color="#000000"
            className="h-full w-full"
          />
        )}
        <h2 className={runningStateTextStye(runningState || "ready")}>
          {runningState?.toUpperCase()}
        </h2>
      </div>

      {/* message set Viewer*/}
      <b className="text-xl text-center text-info">MESSAGES</b>
      <div className={"overflow-y-auto overflow-x-hidden h-full "}>
        {failed?.map((set, index) => (
          <SetView {...set} status="failed" />
        ))}
        {sent?.map((set, index) => (
          <SetView {...set} status="sent" />
        ))}
        {queue?.map((set, index) => (
          <SetView {...set} status="pending" />
        ))}
      </div>
    </div>
  );
}
