type TExtensionState = {
  sent: MessageSet[];
  failed: MessageSet[];
  queue: MessageSet[];
  numbers: string[];
  messages: string[];
  runningState: RunningState;
};

type MessageSet = {
  number: string;
  message: string;
};

type RunningState =
  | "paused"
  | "running"
  | "stopped"
  | "finished"
  | "failed"
  | "ready"
  | "idle";
