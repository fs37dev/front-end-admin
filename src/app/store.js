import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import leadsSlice from "../features/leads/leadSlice";
import registerSlice from "../features/user/redux/registerSlice";
import loginSlice from "../features/user/redux/loginSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  register: registerSlice,
  login: loginSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
