import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import { getReservationDetail, getReservationList } from "../billing/slices/reservationSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { useParams } from "react-router-dom";
import SelectBox from "../../../components/Input/SelectBox";

function ReservationDetail() {
  const { reservation } = useSelector((state) => state.reservations);
  const dispatch = useDispatch();
  const params = useParams();

  const [statusValue, setStatusValue] = useState(reservation.status);

  const getPaymentStatus = (status) => {
    if (status === "Approved") return <div className="badge badge-success">{status}</div>;
    if (status === "Pending") return <div className="badge badge-warning">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };

  useEffect(() => {
    dispatch(getReservationDetail(params.id));
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    console.info(e);
  };

  const handleStatusChange = () => {
    setStatusValue();
  };

  return (
    <>
      <TitleCard title="Reservation Detail" topMargin="mt-2">
        {/* Invoice in table format loaded constant */}

        {reservation && (
          <form onSubmit={handleSubmitForm}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm mb-2">Reservation ID</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{reservation.id}</div>
                </div>
              </div>

              <div>
                <p className="text-sm mb-2">Status</p>
                <select className="select select-primary w-full max-w-xs" id="status" value={statusValue} onChange={(e) => handleStatusChange(e.target.value)}>
                  <option disabled selected value={reservation.status}>
                    {reservation.status}
                  </option>
                  {reservation.status == "Pending" && <option value="Approved">Approved</option>}
                  {reservation.status == "Pending" && <option value="Rejected">Rejected</option>}
                </select>
              </div>

              <div>
                <p className="text-sm mb-2">Transaction Date</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{moment(reservation.createdAt).format("LLL")}</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Update Date</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{moment(reservation.updatedAt).format("LLL")}</div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm mb-2">Customer Name</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{reservation.customer.name}</div>
                </div>
              </div>
            </div>

            <div className="divider"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm mb-2">Reservation Date</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{moment(reservation.date).format("LL")}</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Reservation Time</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{reservation.time}</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Package</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{reservation.package.name}</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Duration</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{reservation.package.duration}</div>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Price</p>
                <div className="flex w-full h-12 font-semibold items-center">
                  <div>{`$ ${reservation.package.price}`}</div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <button className="btn btn-primary float-right">Update</button>
            </div>
          </form>
        )}
      </TitleCard>
    </>
  );
}

export default ReservationDetail;
