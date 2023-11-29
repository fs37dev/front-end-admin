import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import ReservationDetail from "../../features/settings/billing/ReservationDetail";

function InternalPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Reservation" }));
  }, []);

  return <ReservationDetail />;
}

export default InternalPage;
