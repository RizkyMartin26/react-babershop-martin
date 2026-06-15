import { useState, useRef, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Search, Crown, Edit, Trash2 } from "lucide-react";

const initialMembers = [
  {
    id: "MB001",
    name: "John Doe",
    level: "Gold",
    points: 1200,
    totalSpent: "Rp 3.500.000",
    status: "Active",
  },
  {
    id: "MB002",
    name: "Michael Smith",
    level: "Silver",
    points: 850,
    totalSpent: "Rp 2.100.000",
    status: "Active",
  },
  {
    id: "MB003",
    name: "David Beckham",
    level: "Bronze",
    points: 450,
    totalSpent: "Rp 950.000",
    status: "Active",
  },
  {
    id: "MB004",
    name: "Ryan Reynolds",
    level: "Gold",
    points: 1800,
    totalSpent: "Rp 5.400.000",
    status: "Active",
  },
  {
    id: "MB005",
    name: "Cristiano Ronaldo",
    level: "Gold",
    points: 2500,
    totalSpent: "Rp 8.200.000",
    status: "Active",
  },
  {
    id: "MB006",
    name: "Lionel Messi",
    level: "Gold",
    points: 2200,
    totalSpent: "Rp 7.100.000",
    status: "Active",
  },
  {
    id: "MB007",
    name: "Neymar Junior",
    level: "Silver",
    points: 950,
    totalSpent: "Rp 2.700.000",
    status: "Active",
  },
  {
    id: "MB008",
    name: "Kylian Mbappe",
    level: "Silver",
    points: 800,
    totalSpent: "Rp 2.300.000",
    status: "Inactive",
  },
  {
    id: "MB009",
    name: "Kevin De Bruyne",
    level: "Bronze",
    points: 350,
    totalSpent: "Rp 800.000",
    status: "Active",
  },
  {
    id: "MB010",
    name: "Erling Haaland",
    level: "Bronze",
    points: 400,
    totalSpent: "Rp 900.000",
    status: "Active",
  },
];

export default function Members() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const addMember = () => {
    const newMember = {
      id: `MB${String(members.length + 1).padStart(3, "0")}`,
      name: `Member ${members.length + 1}`,
      level: "Bronze",
      points: 0,
      totalSpent: "Rp 0",
      status: "Active",
    };

    setMembers([...members, newMember]);
  };

  const deleteMember = (id) => {
    setMembers(
      members.filter((member) => member.id !== id)
    );
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  const goldCount = members.filter(
    (m) => m.level === "Gold"
  ).length;

  const silverCount = members.filter(
    (m) => m.level === "Silver"
  ).length;

  const bronzeCount = members.filter(
    (m) => m.level === "Bronze"
  ).length;

  const totalPoints = members.reduce(
    (sum, member) => sum + member.points,
    0
  );

  return (
    <>
      <PageHeader
        title="Membership Management"
        subtitle="Manage loyal customers and reward points"
      >
        <button
          onClick={addMember}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-xl font-semibold shadow"
        >
          + Add Member
        </button>
      </PageHeader>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="text-gray-500">Total Members</h3>
          <p className="text-3xl font-bold">
            {members.length}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-5 shadow">
          <h3 className="text-yellow-700">
            Gold Members
          </h3>
          <p className="text-3xl font-bold">
            {goldCount}
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl p-5 shadow">
          <h3 className="text-gray-700">
            Silver Members
          </h3>
          <p className="text-3xl font-bold">
            {silverCount}
          </p>
        </div>

        <div className="bg-orange-100 rounded-2xl p-5 shadow">
          <h3 className="text-orange-700">
            Bronze Members
          </h3>
          <p className="text-3xl font-bold">
            {bronzeCount}
          </p>
        </div>

        <div className="bg-green-100 rounded-2xl p-5 shadow">
          <h3 className="text-green-700">
            Loyalty Points
          </h3>
          <p className="text-3xl font-bold">
            {totalPoints.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-5 shadow mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />

          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search member..."
            className="w-full border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">
                Member Name
              </th>
              <th className="p-4 text-left">Level</th>
              <th className="p-4 text-left">Points</th>
              <th className="p-4 text-left">
                Total Spending
              </th>
              <th className="p-4 text-left">
                Status
              </th>
              <th className="p-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {member.id}
                </td>

                <td className="p-4">
                  {member.name}
                </td>

                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-500" />
                    {member.level}
                  </span>
                </td>

                <td className="p-4">
                  {member.points}
                </td>

                <td className="p-4 font-semibold text-green-600">
                  {member.totalSpent}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button>
                      <Edit className="w-5 h-5 text-blue-500" />
                    </button>

                    <button
                      onClick={() =>
                        deleteMember(member.id)
                      }
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}