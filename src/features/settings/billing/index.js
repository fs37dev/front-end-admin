import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { getReservationDetail, getReservationList } from "./slices/reservationSlice";
import { useNavigate } from "react-router-dom";

function Billing() {
  const { reservations } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPaymentStatus = (status) => {
    if (status === "Approved") return <div className="badge badge-success">{status}</div>;
    if (status === "Pending") return <div className="badge badge-warning">{status}</div>;
    if (status === "Rejected") return <div className="badge badge-error">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  useEffect(() => {
    dispatch(getReservationList());
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/app/reservation/${id}`);
  };

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
                  <tr key={i}>
                    <td>{r.id}</td>
                    <td>{r.customer.name}</td>
                    <td>{moment(r.date).format("LL")}</td>
                    <td>{getPaymentStatus(r.status)}</td>
                    <td>
                      <button className="btn btn-sm bg-primary" onClick={() => handleButtonClick(r.id)}>
                        Open
                      </button>
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
