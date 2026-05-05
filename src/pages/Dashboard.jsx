import { Users, CalendarCheck, Scissors, DollarSign } from "lucide-react";

export default function Dashboard() {

  const stats = [
    {
      title: "Customers",
      value: "1,200",
      icon: <Users size={22} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Bookings",
      value: "320",
      icon: <CalendarCheck size={22} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Barbers",
      value: "12",
      icon: <Scissors size={22} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Revenue",
      value: "$8,500",
      icon: <DollarSign size={22} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>
        <p className="text-slate-400 mt-1">
          Welcome back! Here's what's happening today ✂️
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`p-3 rounded-xl ${item.color}`}>
              {item.icon}
            </div>

            <div>
              <p className="text-2xl font-bold text-slate-800">
                {item.value}
              </p>
              <p className="text-sm text-slate-400">
                {item.title}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* SECTION 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* CHART (DUMMY) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Revenue Analytics
          </h2>

          <div className="h-[250px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl text-slate-400">
            Chart will appear here 📊
          </div>

        </div>

        {/* TOP BARBERS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Top Barbers
          </h2>

          <div className="space-y-4">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Barber {item}
                  </p>
                  <p className="text-xs text-slate-400">
                    Professional Stylist
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* SECTION 3 - RECENT BOOKINGS */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">

        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Recent Bookings
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="text-slate-400 border-b">
              <tr>
                <th className="text-left py-2">Customer</th>
                <th className="text-left">Service</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody className="text-slate-700">

              <tr className="border-b">
                <td className="py-3">Rizky</td>
                <td>Haircut</td>
                <td>10 May 2026</td>
                <td className="text-green-500 font-medium">Completed</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Andi</td>
                <td>Shaving</td>
                <td>09 May 2026</td>
                <td className="text-yellow-500 font-medium">Pending</td>
              </tr>

              <tr>
                <td className="py-3">Siti</td>
                <td>Hair Coloring</td>
                <td>08 May 2026</td>
                <td className="text-red-500 font-medium">Cancelled</td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}