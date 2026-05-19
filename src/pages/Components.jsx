import {
  Sparkles,
  Scissors,
  Crown,
  ShieldCheck,
} from "lucide-react";

import Button from "../components/basic/Button";
import Badge from "../components/basic/Badge";
import Avatar from "../components/basic/Avatar";
import InputField from "../components/basic/InputField";

import Card from "../components/display/Card";
import StatsCard from "../components/display/StatsCard";
import ServiceCard from "../components/display/ServiceCard";

import Container from "../components/layout/Container";
import Footer from "../components/layout/Footer";

import PageHeader from "../components/PageHeader";

export default function Components() {
  return (
    <Container>

      {/* HERO SECTION */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-10 text-white shadow-2xl">

        <div className="absolute top-0 right-0 opacity-10">
          <Scissors className="w-72 h-72" />
        </div>

        <div className="relative z-10 max-w-2xl">

          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-amber-400" />

            <span className="text-amber-400 font-semibold">
              Premium React Components
            </span>
          </div>

          <h1 className="text-5xl font-black leading-tight mb-5">
            Elite Barber UI Component System
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Reusable React components designed for modern
            barbershop management dashboards with clean
            architecture and premium UI experience.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button type="primary">
              Explore Components
            </Button>

            <button className="border border-gray-600 hover:border-amber-500 px-5 py-2 rounded-xl transition">
              Documentation
            </button>
          </div>

        </div>

      </div>

      {/* PAGE HEADER */}
      <PageHeader
        title="Components Playground"
        subtitle="Reusable component showcase for CRM Barbershop"
      />

      {/* BASIC COMPONENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BUTTON */}
        <Card>

          <div className="flex items-center justify-between mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Button Component
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Reusable action buttons
              </p>
            </div>

            <Badge type="success">
              Active
            </Badge>

          </div>

          <div className="flex gap-3 flex-wrap">

            <Button type="primary">
              Primary
            </Button>

            <Button type="success">
              Success
            </Button>

            <Button type="danger">
              Danger
            </Button>

            <Button type="warning">
              Warning
            </Button>

          </div>

        </Card>

        {/* INPUT */}
        <Card>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Input Component
          </h2>

          <p className="text-gray-500 text-sm mb-5">
            Form reusable component
          </p>

          <InputField placeholder="Search customer..." />

        </Card>

      </div>

      {/* AVATAR + BADGE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* AVATAR */}
        <Card>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Avatar Component
          </h2>

          <div className="flex items-center gap-5">

            <div className="text-center">
              <Avatar name="Admin" />
              <p className="text-sm mt-2 text-gray-500">
                Admin
              </p>
            </div>

            <div className="text-center">
              <Avatar name="Budi" />
              <p className="text-sm mt-2 text-gray-500">
                Barber
              </p>
            </div>

            <div className="text-center">
              <Avatar name="Siti" />
              <p className="text-sm mt-2 text-gray-500">
                Customer
              </p>
            </div>

          </div>

        </Card>

        {/* BADGE */}
        <Card>

          <h2 className="text-2xl font-bold text-gray-800 mb-5">
            Badge Component
          </h2>

          <div className="flex gap-3 flex-wrap">

            <Badge type="success">
              Confirmed
            </Badge>

            <Badge type="warning">
              Pending
            </Badge>

            <Badge type="danger">
              Cancelled
            </Badge>

          </div>

        </Card>

      </div>

      {/* STATS */}
      <div>

        <div className="flex items-center gap-3 mb-6">

          <Crown className="text-amber-500" />

          <h2 className="text-3xl font-bold text-gray-800">
            Dashboard Stats Components
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <StatsCard
            title="Revenue"
            value="Rp 12.000.000"
            color="from-amber-500 to-amber-600"
          />

          <StatsCard
            title="Bookings"
            value="320"
            color="from-blue-500 to-blue-600"
          />

          <StatsCard
            title="Customers"
            value="1,200"
            color="from-green-500 to-green-600"
          />

        </div>

      </div>

      {/* SERVICE CARDS */}
      <div>

        <div className="flex items-center gap-3 mb-6">

          <ShieldCheck className="text-green-500" />

          <h2 className="text-3xl font-bold text-gray-800">
            Service Components
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <ServiceCard
            title="Hair Cut"
            price="Rp 50.000"
            description="Professional haircut service with modern style and premium tools."
          />

          <ServiceCard
            title="Hair Coloring"
            price="Rp 150.000"
            description="Premium hair coloring service with high quality products."
          />

          <ServiceCard
            title="Shaving"
            price="Rp 35.000"
            description="Clean shaving experience for a professional appearance."
          />

        </div>

      </div>

      {/* PREVIEW IMAGE */}
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="p-8">

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            CRM Dashboard Preview
          </h2>

          <p className="text-gray-500 mb-8">
            Modern barbershop management dashboard inspired by premium Figma UI.
          </p>

          <img
            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop"
            alt="Barbershop"
            className="w-full h-[400px] object-cover rounded-2xl"
          />

        </div>

      </div>

      {/* FOOTER */}
      <Footer />

    </Container>
  );
}