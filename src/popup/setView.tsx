import React from "react";

export default function SetView(
  props: MessageSet & {
    status?: "failed" | "sent" | "pending";
  }
) {
  return (
    <div className="flex flex-col items-center justify-between m-1 p-2 border-y-2">
      <div className="flex w-full  justify-between">
        <h2 className="text-lg">{props.number}</h2>
        <div
          className={`${
            props.status === "pending"
              ? "text-primary"
              : props.status === "failed"
              ? "text-error"
              : "text-success"
          }`}
        >
          {props.status?.toUpperCase()}
        </div>
      </div>
      <div className="text-sm">{props.message}</div>
    </div>
  );
}
