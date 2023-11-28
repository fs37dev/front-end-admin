import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { getReservationList } from "./slices/reservationSlice";

function Billing() {
  const { reservations } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();

  const getPaymentStatus = (status) => {
    if (status === "Approved") return <div className="badge badge-success">{status}</div>;
    if (status === "Pending") return <div className="badge badge-warning">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  useEffect(() => {
    dispatch(getReservationList());
  }, []);

  console.info(reservations);

  return (
    <>
      <TitleCard title="Reservation List" topMargin="mt-2">
        {/* Invoice list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Customer name</th>
                <th>Reservation Date</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => {
                return (
                  <tr key={i} className="">
                    <td>{r.id}</td>
                    <td>{r.customer.name}</td>
                    <td>{moment(r.date).format("D MMM YYYYY")}</td>
                    <td>{getPaymentStatus(r.status)}</td>
                    <td>
                      <button class="btn btn-sm bg-primary">Open</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Billing;
