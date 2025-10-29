import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { bookingMachine, BookingEventType } from "../machines/bookingMachine";
import { useTranslation } from "react-i18next";
import "./BookingList.css";

interface Booking {
  id: string;
}

export const BookingList: React.FC = () => {
  const { t } = useTranslation();

  const [bookings] = useState<Booking[]>([{ id: "BKG-1" }, { id: "BKG-2" }, { id: "BKG-3" }]);

  return (
    <div className="booking-list">
      {bookings.map((b) => {
        // ✅ useMachine всегда на верхнем уровне map
        const [state, send] = useMachine(bookingMachine);

        // Доступные события для текущего состояния
        const eventMap: Record<BookingEventType, boolean> = {
          [BookingEventType.PENDING]: false, // скрыть pending по дефолту
          [BookingEventType.CONFIRM]: state.value === BookingEventType.PENDING,
          [BookingEventType.CANCEL]:
            state.value === BookingEventType.PENDING || state.value === BookingEventType.CONFIRM,
          [BookingEventType.CHECK_IN]: state.value === BookingEventType.CONFIRM,
          [BookingEventType.CHECK_OUT]: state.value === BookingEventType.CHECK_IN,
        };

        return (
          <div key={b.id} className="booking-card">
            <h3>{b.id}</h3>
            <p>
              {t("currentState")} <b>{state.value.toString()}</b>
            </p>

            <div className="buttons">
              {Object.values(BookingEventType)
                .filter((ev) => ev !== BookingEventType.PENDING) // убираем pending
                .map((ev) => (
                  <button
                    key={ev}
                    disabled={!eventMap[ev]}
                    onClick={() => send({ type: ev })}
                    className={eventMap[ev] ? "active" : "disabled"}
                  >
                    {t(ev)}
                  </button>
                ))}
            </div>

            <div className="history">
              <h4>{t("history")}</h4>
              <ul>
                {state.context.history.map((h: any, idx: number) => (
                  <li key={idx}>
                    {t(JSON.stringify(h.event))} {"\u2192"} {h.timestamp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};
