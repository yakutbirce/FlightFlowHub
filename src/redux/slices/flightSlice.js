import { createSlice } from "@reduxjs/toolkit"
import { getFlights } from '../actions/flightActions'

const initialState = {
    flights: [],
    isLoading: true,
    isError: false,
    route: []
}

const flightSlice = createSlice({
    name: "flight",
    initialState,
    extraReducers: (builder) => {
        // builder'a yeni bi aşama eklerken addCase kullanılır

        // cevap beklerken
        builder.addCase(getFlights.pending, (state) => {
            state.isLoading = true;
        })
            // olumlu ceavp geldiğinde
            .addCase(getFlights.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.flights = action.payload;
            })
            // olumsuz cevap geldiğinde
            .addCase(getFlights.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
                alert("Üzgünüz, bir hata oluştu!");
            });
    },
    reducers: {
        setRoute: (state, action) => {
            const newRoute = action.payload.map((i) => [i.lat, i.lng])
            state.route = newRoute;
        }
    }
});

export default flightSlice.reducer;

export const { setRoute } = flightSlice.actions;