import { useEffect, useState } from "react";
import Header from "./components/Header";
import MapView from "./pages/MapView";
import ListView from "./pages/ListView";
import { useDispatch } from "react-redux";
import { getFlights } from "./redux/actions/flightActions";
import SideDetail from "./components/SideDetail";

function App() {
  const [showMapView, setShowMapView] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [detailId, setDetailId] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    /* 5 saniyede bir uçuş hareketleri güncellenir */
    const ref = setInterval(() => {
      dispatch(getFlights());
    }, 5000);

    /* kullanıcı farklı bir sayfaya geçince tekrarı durdurur */
    return () => {
      clearInterval(ref);
    };
  }, []);

  /* modal açmak için */
  const openModal = (id) => {
    /* detayı gösterilecek uçağın aid'si */
    setDetailId(id);
    /* modalı açar */
    setShowDetail(true);
  };

  return (
    <>
      <Header />

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

      {showMapView ? (
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
