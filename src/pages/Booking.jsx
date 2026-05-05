import { useState } from "react";
import PageHeader from "../components/PageHeader";

function Booking() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Booking Success\nName: ${name}\nService: ${service}`
    );

    setName("");
    setService("");
  };

  return (
    <div>
      <PageHeader
        title="Booking"
        subtitle="Book Your Haircut"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-2xl max-w-xl"
      >
        <div className="mb-5">
          <label className="block mb-2 text-white">
            Customer Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 text-white"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-white">
            Select Service
          </label>

          <select
            value={service}
            onChange={(e) =>
              setService(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-black border border-zinc-700 text-white"
            required
          >
            <option value="">
              Choose Service
            </option>

            <option value="Hair Cut">
              Hair Cut
            </option>

            <option value="Beard Trim">
              Beard Trim
            </option>

            <option value="Hair Coloring">
              Hair Coloring
            </option>
          </select>
        </div>

        <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;