import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  ShoppingBag,
  Calendar,
  CreditCard,
  Users,
  Wallet,
  Megaphone,
  Plug,
  ArrowRight,
  Check,
} from "lucide-react";

const modules = [
  {
    name: "Business Setup",
    description: "Configure locations, physical setup, and business settings",
    icon: Briefcase,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Catalog",
    description: "Manage products, inventory, and pricing",
    icon: ShoppingBag,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Bookings",
    description: "Handle appointments and scheduling",
    icon: Calendar,
    color: "bg-[#0B1D39]",
  },
  {
    name: "POS",
    description: "Point of sale system for transactions",
    icon: CreditCard,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Customers",
    description: "Customer management and relationships",
    icon: Users,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Finance",
    description: "Financial tracking and reporting",
    icon: Wallet,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Marketing",
    description: "Campaigns and promotional tools",
    icon: Megaphone,
    color: "bg-[#0B1D39]",
  },
  {
    name: "Integrations",
    description: "Connect with third-party services",
    icon: Plug,
    color: "bg-[#0B1D39]",
  },
];

const features = [
  "Role-based access control",
  "Real-time analytics dashboard",
  "Multi-location management",
  "Comprehensive reporting",
  "Mobile-responsive design",
  "Secure data handling",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B1D39] to-[#08162D] flex items-center justify-center">
                <span className="text-white font-bold text-sm">BS</span>
              </div>
              <span className="text-xl font-bold text-[#0B1D39]">BusinessOS</span>
            </Link>
            <Link href="/login">
              <Button className="bg-[#0B1D39] hover:bg-[#08162D] text-white">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0B1D39] mb-6">
              Modern Business
              <span className="text-[#F2C94C]"> Management</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
              StoreOS is a comprehensive platform that empowers businesses to manage
              operations, customers, finances, and more—all from one unified dashboard.
            </p>
            <div className="flex justify-center">
              <Link href="/login">
                <Button size="lg" className="bg-[#0B1D39] hover:bg-[#08162D] text-white text-lg px-8 py-6">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1D39] mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              All the tools to run your business efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#0B1D39] hover:shadow-md transition-all"
              >
                <Check className="h-6 w-6 text-[#0B1D39] flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F6F8FC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1D39] mb-4">
              Core Modules
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive modules to manage every aspect of your business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-[#0B1D39] transition-all group"
                >
                  <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#0B1D39] mb-2">
                    {module.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {module.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 sm:px-6 lg:px-8 bg-[#0B1D39] text-gray-400">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} BusinessOS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
