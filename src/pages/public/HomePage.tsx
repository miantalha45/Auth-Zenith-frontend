import type React from "react";
import { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    {
      title: "Secure Authentication",
      icon: "🔐",
      description: "JWT-based security",
    },
    {
      title: "Role Management",
      icon: "👤",
      description: "Advanced permissions",
    },
    {
      title: "Real-time Messaging",
      icon: "💬",
      description: "Instant communication",
    },
    { title: "Activity Logs", icon: "📊", description: "Complete audit trail" },
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
                🎯 Professional JWT Authentication Platform
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="text-transparent bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text">
                  Dev Empower
                </span>
                <span className="block text-4xl lg:text-5xl text-blue-600 mt-4">
                  JWT Authentication
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Master secure authentication and authorization with our
                comprehensive tutorial platform featuring real-world examples
                and hands-on projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Start Learning Now
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  View Documentation
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
                    <span className="text-sm text-gray-500 ml-4">JWT Demo</span>
                  </div>

                  <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm">
                    <div className="space-y-2">
                      <div>$ npm install jsonwebtoken</div>
                      <div className="text-gray-500">// Generate JWT Token</div>
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
            Why Choose Our Platform
          </h2>
          <p className="text-xl text-gray-600">
            Professional tools for modern developers
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
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers mastering JWT authentication
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200">
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
