import servicesData from "../data/servicesData";
import PageHeader from "../components/PageHeader";

function Services() {
  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Available Services"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800"
          >
            <h2 className="text-2xl text-yellow-400 font-bold">
              {service.name}
            </h2>

            <p className="mt-3 text-zinc-400">
              {service.duration}
            </p>

            <button className="mt-5 bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold">
              {service.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;