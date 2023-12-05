import { createSlice } from "@reduxjs/toolkit";
import { getFlights } from "../actions/flightActions";

const initialState = {
    flights: [],
    isLoading: true,
    isError: false,
};

const flightSlice = createSlice({
    name: "flight",
    initialState,
    extraReducers: (builder) => {
        builder
            //cevap beklerken

            .addCase(getFlights.pending, (state) => {
                state.isLoading = true;
            })

            //olumlu cevap geliğinde

            .addCase(getFlights.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.isError = false,
                    state.flights = action.payload;
            })

            //olumsuz cevap geldiğinde

            .addCase(getFlights.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                alert("Bir Hata Oluştu");
            });
    },
});

export default flightSlice.reducer;