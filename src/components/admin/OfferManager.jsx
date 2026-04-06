import { useEffect, useState } from "react";
import {
  addOffer,
  getAllOffers,
  deleteOffer,
} from "../../services/firebase/firestore/adminHandlers";

const OfferManager = () => {
  const [offerData, setOfferData] = useState({ img: "" });
  const [offers, setOffers] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  // 🟨 CAMBIO: carga todas las ofertas para mostrarlas en admin
  const loadOffers = async () => {
    try {
      setLoadingOffers(true);
      const data = await getAllOffers();
      setOffers(data);
    } catch (error) {
      console.error("Error loading offers:", error);
      alert("No se pudieron cargar las ofertas.");
    } finally {
      setLoadingOffers(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  // 🟨 CAMBIO: agrega una oferta y recarga la lista
  const handleAddOffer = async () => {
    const cleanImg = offerData.img.trim();

    if (!cleanImg) {
      alert("Ingresá una URL de imagen válida.");
      return;
    }

    try {
      setLoadingAdd(true);
      await addOffer({ img: cleanImg });
      alert("Oferta agregada correctamente.");
      setOfferData({ img: "" });
      await loadOffers();
    } catch (error) {
      console.error("Error adding offer:", error);
      alert("No se pudo agregar la oferta.");
    } finally {
      setLoadingAdd(false);
    }
  };

  // 🟨 CAMBIO: borra una oferta por id y recarga la lista
  const handleDeleteOffer = async (id) => {
    const confirmDelete = window.confirm("¿Seguro que querés borrar esta oferta?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await deleteOffer(id);
      alert("Oferta borrada correctamente.");
      await loadOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
      alert("No se pudo borrar la oferta.");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar oferta</h2>

      <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
        <input
          type="text"
          className="border p-2 rounded w-full mb-3"
          placeholder="Link de la imagen"
          value={offerData.img}
          onChange={(e) => setOfferData({ img: e.target.value })}
        />

        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded disabled:opacity-60"
          onClick={handleAddOffer}
          disabled={loadingAdd}
        >
          {loadingAdd ? "Guardando..." : "Agregar oferta"}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Ofertas cargadas</h3>

        {loadingOffers ? (
          <p>Cargando ofertas...</p>
        ) : offers.length === 0 ? (
          <p>No hay ofertas cargadas.</p>
        ) : (
          <div className="grid gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="border rounded-lg p-4 bg-white shadow-sm flex flex-col md:flex-row gap-4 items-start"
              >
                <div className="w-full md:w-44 shrink-0">
                  <img
                    src={offer.img}
                    alt="Oferta"
                    className="w-full h-40 object-cover rounded"
                  />
                </div>

                <div className="flex-1 text-left w-full">
                  <p className="text-sm mb-2 break-all">
                    <strong>ID:</strong> {offer.id}
                  </p>

                  <p className="text-sm mb-2 break-all">
                    <strong>Imagen:</strong> {offer.img}
                  </p>

                  <p className="text-sm mb-2">
                    <strong>Estado:</strong> {offer.active ? "Activa" : "Inactiva"}
                  </p>

                  <p className="text-sm">
                    <strong>Creada:</strong> {offer.createdAt || "Sin fecha"}
                  </p>
                </div>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
                  onClick={() => handleDeleteOffer(offer.id)}
                  disabled={deletingId === offer.id}
                >
                  {deletingId === offer.id ? "Borrando..." : "Borrar"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OfferManager;