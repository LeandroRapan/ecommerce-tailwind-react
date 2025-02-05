import { useState } from "react";
import { addOffer } from "../../services/firebase/firestore/adminHandlers";

const OfferManager = () => {
    const [offerData, setOfferData] = useState({ img: "" });

    const handleAddOffer = async () => {
        try {
            await addOffer(offerData);
            alert("Offer added successfully!");
            setOfferData({ img: "" });
        } catch (error) {
            alert("Failed to add offer.");
        }
    };

    return (
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Add Offer</h2>
            <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                placeholder="Image Link"
                value={offerData.img}
                onChange={(e) => setOfferData({ img: e.target.value })}
            />
            <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={handleAddOffer}
            >
                Add Offer
            </button>
        </section>
    );
};

export default OfferManager;