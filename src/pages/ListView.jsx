import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const ListView = ({ openModal }) => {
  const store = useSelector((store) => store);
  const [itemOffset, setItemOffset] = useState(10);

  /* SAYFALAMA HESAPLAMALARI */

  /* sayfa başına eleman sayısı */
  const itemsPerPage = 10;

  /* gösterilecek sonuncu eleman */
  const endOffset = itemOffset + itemsPerPage;

  /* gösterilecek aralıktaki elemanlar */
  const currentItems = store?.flights.slice(itemOffset, endOffset);

  /* toplam sayfa sayısı hesaplama */
  const pageCount = Math.ceil(store?.flights.length / itemsPerPage);

  const handlePageClick = (event) => {
    /* gösterilecek yeni elemanları hesaplar */
    const newOffset = (event.selected = itemsPerPage) % store?.flights.length;
    /* state güncelleme */
    setItemOffset(newOffset);
  };

  return (
    <div className="list-page">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th>Detaylar</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => openModal(flight.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="< Önceki"
        nextLabel="Sonraki >"
        pageCount={pageCount}
        className="pagination"
        activeClassName="active"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
      />
    </div>
  );
};

export default ListView;
