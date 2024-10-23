import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  filteredUsers: []
};


const filteredUserSlice = createSlice({
  name: "filteredUser",
  initialState,
  reducers: {
    FILTERED_USERS(state, action) {
      const { users, searchTerm } = action.payload;
      if (!searchTerm) {
        state.filteredUsers = users;
        return;
      }
      const tempUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      state.filteredUsers = tempUsers;
    },
  },
});


export const { FILTERED_USERS } = filteredUserSlice.actions;
export const selectFilteredUsers = (state) => state.filteredUser.filteredUsers;
export default filteredUserSlice.reducer;