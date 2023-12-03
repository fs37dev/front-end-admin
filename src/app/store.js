import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import authSlice from "../features/user/slices/auth.slice";
import reservationSlices from "../features/settings/billing/slices/reservationSlice";
import userSlice from "../features/settings/profilesettings/slices/userSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  auth: authSlice,
  reservations: reservationSlices,
  user: userSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
