import type React from "react";
import { useState, useEffect } from "react";
import {
  Lock,
  Users,
  MessageSquare,
  BarChart,
  ShieldCheck,
  Palette,
  Cog,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/path";

const HomePage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      title: "Auth & Access Control",
      icon: Lock,
      description: "Comprehensive authentication and authorization solutions.",
      details: [
        "Four-tier RBAC: Owner, Admin, Manager, User",
        "Fully protected routes and role-specific permissions",
        "Seamless registration & login experience",
      ],
    },
    {
      title: "User Management",
      icon: Users,
      description: "Streamlined user lifecycle management.",
      details: [
        "End-to-end user CRUD operations",
        "Dynamic role assignment",
        "Profile management with extended attributes",
        "Real-time user metrics",
      ],
    },
    {
      title: "Messaging System",
      icon: MessageSquare,
      description: "Robust internal communication capabilities.",
      details: [
        "Internal user-to-user communication",
        "Organized inbox with filters (sent/received)",
        "Real-time message updates with a clean UI",
      ],
    },
    {
      title: "Dashboards & Insights",
      icon: BarChart,
      description: "Actionable insights and monitoring for all roles.",
      details: [
        "Custom dashboards for each role",
        "System performance monitoring, activity tracking, and audit logs",
      ],
    },
    {
      title: "Security Practices",
      icon: ShieldCheck,
      description: "Built with enterprise-grade security in mind.",
      details: [
        "Secure password hashing via ASP.NET Identity",
        "Strict CORS policies",
        "Input sanitization + proper status code management",
        "Role-based API access",
      ],
    },
    {
      title: "UI/UX Highlights",
      icon: Palette,
      description: "Modern, responsive, and user-friendly interface.",
      details: [
        "Built with Tailwind CSS",
        "Fully responsive across devices",
        "Enhanced with toasts, loaders, and error states",
      ],
    },
    {
      title: "Architecture & Engineering",
      icon: Cog,
      description: "Scalable and maintainable codebase.",
      details: [
        "Clean separation using Service & Repository patterns",
        "Scalable via Dependency Injection",
        "Docker-ready setup",
        "Config-based environments and smooth DB migrations",
      ],
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div
            className={`flex-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                🛡️ Advanced Authentication & Authorization Platform
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text">
                  Auth Zenith
                </span>
                <span className="block text-4xl lg:text-5xl text-blue-600 mt-4">
                  Comprehensive Auth Solutions
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Implement robust and scalable authentication and authorization
                for your applications with our production-ready solutions and
                comprehensive tools.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate(PATH_PUBLIC.login)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div
            className={`flex-1 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-500 ml-4">
                      Auth Demo
                    </span>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                    <div className="space-y-2">
                      <div>$ npm install jsonwebtoken</div>
                      <div className="text-gray-500">
                        // Generate Authentication Token
                      </div>
                      <div>const token = jwt.sign(payload, secret)</div>
                      <div className="text-green-300">
                        ✓ Token generated successfully
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                Live Demo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Auth Zenith?
          </h2>
          <p className="text-xl text-gray-600">
            Robust, scalable, and secure authentication solutions for modern
            applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 ${
                currentFeature === index ? "ring-2 ring-blue-500 shadow-lg" : ""
              }`}
            >
              <div className="text-4xl mb-4">
                <feature.icon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  currentFeature === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <ul className="space-y-2">
                    {feature.details?.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Secure Your Applications?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Integrate powerful authentication and authorization into your
            projects today.
          </p>
          <button
            onClick={() => navigate(PATH_PUBLIC.login)}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started with Auth Zenith
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
