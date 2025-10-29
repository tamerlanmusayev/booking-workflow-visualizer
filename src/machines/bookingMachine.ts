import { assign, createMachine } from "xstate";

export enum BookingEventType {
  PENDING = "PENDING",
  CONFIRM = "CONFIRM",
  CANCEL = "CANCEL",
  CHECK_IN = "CHECK_IN",
  CHECK_OUT = "CHECK_OUT",
}

export interface HistoryItem {
  event: string;
  timestamp: string;
}

export interface BookingContext {
  history: HistoryItem[];
}

export const bookingMachine = createMachine(
  {
    id: "booking",
    initial: BookingEventType.PENDING,
    context: { history: [] as HistoryItem[] },
    states: {
      [BookingEventType.PENDING]: {
        on: {
          CONFIRM: { target: BookingEventType.CONFIRM, actions: "addHistory" },
          CANCEL: { target: BookingEventType.CANCEL, actions: "addHistory" },
        },
      },
      [BookingEventType.CONFIRM]: {
        on: {
          CHECK_IN: { target: BookingEventType.CHECK_IN, actions: "addHistory" },
          CANCEL: { target: BookingEventType.CANCEL, actions: "addHistory" },
        },
      },
      [BookingEventType.CHECK_IN]: {
        on: {
          CHECK_OUT: { target: BookingEventType.CHECK_OUT, actions: "addHistory" },
        },
      },
      [BookingEventType.CHECK_OUT]: { type: "final" },
      [BookingEventType.CANCEL]: { type: "final" },
    },
  } as const,
  {
    actions: {
      addHistory: assign({
        history: ({ context, event }) => {
          return [...(context.history || []), { event: event.type, timestamp: new Date().toLocaleTimeString() }];
        },
      }),
    },
  }
);
