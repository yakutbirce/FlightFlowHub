import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { getFlights } from "./redux/actions/flightActions";
import SideDetail from "./components/SideDetail";
function App() {
  const [showMapView, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  useEffect(() => {
    dispatch(getFlights());
  }, [dispatch]);

  const openModal = (id) => {
    setDetailId(id);
    setShowDetail(true);
  };

  const handleSearch = () => {
    // Kullanıcının girdiği arama terimine göre uçuşları filtrele
    const filteredFlights = store.flights.filter((flight) =>
      flight.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filtrelenmiş uçuşları Redux store'a gönder
    dispatch(setSearchResults(filteredFlights));
  };

  return (
    <>
      <Header />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Uçuş Ara..."
        />
        <button className="button-search" onClick={handleSearch}>
          Ara
        </button>
      </div>

      <div className="view-buttons">
        <button
          className={showMapView ? "active" : ""}
          onClick={() => setShowMapView(true)}
        >
          Harita Görünümü
        </button>
        <button
          className={!showMapView ? "active" : ""}
          onClick={() => setShowMapView(false)}
        >
          Liste Görünümü
        </button>
      </div>

      {searchQuery ? (
        // Eğer bir arama yapıldıysa, filtrelenmiş sonuçları göster
        <ListView openModal={openModal} />
      ) : showMapView ? (
        <MapView openModal={openModal} />
      ) : (
        <ListView openModal={openModal} />
      )}

      {showDetail && (
        <SideDetail detailId={detailId} setShowDetail={setShowDetail} />
      )}
    </>
  );
}

export default App;
