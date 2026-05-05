import barbersData from "../data/barbersData";
import PageHeader from "../components/PageHeader";

function Barbers() {
  return (
    <div>
      <PageHeader
        title="Professional Barbers"
        subtitle="Meet Our Experts"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {barbersData.map((barber) => (
          <div
            key={barber.id}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
          >
            <div className="w-20 h-20 rounded-full bg-yellow-400 mb-5"></div>

            <h2 className="text-2xl font-bold text-white">
              {barber.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              Experience: {barber.experience}
            </p>

            <p className="text-yellow-400 mt-2">
              {barber.specialty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Barbers;