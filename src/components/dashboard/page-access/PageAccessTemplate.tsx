import type React from "react";
import { AiOutlineCheck } from "react-icons/ai";
import type { IconType } from "react-icons";

interface PageAccessTemplateProps {
  role: string;
  icon: IconType;
  color: string;
  children?: React.ReactNode;
  description?: string;
  features?: string[];
}

const PageAccessTemplate: React.FC<PageAccessTemplateProps> = ({
  role,
  icon: Icon,
  color,
  children,
  description,
  features,
}) => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center"
      style={{ borderColor: color }}
    >
      <div
        className="max-w-4xl mx-auto w-full bg-white rounded-2xl shadow-lg p-8 space-y-8 border-2"
        style={{ borderColor: color }}
      >
        {/* Header Section */}
        <section className="w-full flex flex-col sm:flex-row justify-center items-center gap-8 text-center sm:text-left">
          <div
            className="p-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}1A` }}
          >
            <Icon className="text-6xl" style={{ color: color }} />
          </div>
          <div className="space-y-2" style={{ color: color }}>
            <h2 className="text-4xl font-bold">This is {role} Page</h2>
            <p className="text-lg opacity-90">
              You must have {role} access to see this page
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="space-y-6">
          {children && <div className="text-center">{children}</div>}

          {description && (
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-center">
              <p>{description}</p>
            </div>
          )}

          {features && features.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Key Features for {role}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg"
                  >
                    <AiOutlineCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-800">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PageAccessTemplate;
