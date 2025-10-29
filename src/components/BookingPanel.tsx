import React from "react";
import { BookingList } from "./BookingList";
import { useTranslation } from "react-i18next";

export const BookingPanel: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="booking-panel">
      <h2>{t("bookingVisualizer")}</h2>
      <BookingList />
    </div>
  );
};
