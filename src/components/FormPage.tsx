import React, { useState } from "react";
import {
  FaInfoCircle,
  FaUserTie,
  FaCommentDots,
  FaBook,
  FaClipboardList,
  FaCog,
  FaCheckCircle,
} from "react-icons/fa";

const STEPS = [
  {
    id: "basicInfo",
    title: "Basic Info",
    icon: <FaInfoCircle />,
  },
  {
    id: "personality",
    title: "Personality",
    icon: <FaUserTie />,
  },
  {
    id: "communication",
    title: "Communication",
    icon: <FaCommentDots />,
  },
  {
    id: "knowledge",
    title: "Knowledge",
    icon: <FaBook />,
  },
  {
    id: "examples",
    title: "Message Examples",
    icon: <FaClipboardList />,
  },
  {
    id: "settings",
    title: "Settings",
    icon: <FaCog />,
  },
  {
    id: "review",
    title: "Review",
    icon: <FaCheckCircle />,
  },
];

export default function FormPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    description: "",
    modelProvider: "",

    // Personality
    bio: "",
    lore: "",
    personalityAdjectives: [],

    // Communication
    chatStyle: "",
    postStyle: "",

    // Knowledge
    knowledgeTopics: [],
    expertiseLevel: "",

    // Message Examples
    messageExamples: [],

    // Settings
    temperature: 0.7,
    maxTokens: 150,
    privacySettings: "",
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case "basicInfo":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-blue">
                Agent Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md bg-white/10 border-brand-green"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-blue">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full rounded-md bg-white/10 border-brand-green"
              />
            </div>
          </div>
        );
      default:
        return <div>Step not implemented</div>;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Agent Configuration:", formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white/5 rounded-lg shadow-lg p-8">
        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index <= currentStep ? "text-brand-green" : "text-gray-500"
              }`}
            >
              {step.icon}
              <span className="text-xs mt-2">{step.title}</span>
              <div
                className={`h-1 w-16 mt-2 ${
                  index <= currentStep ? "bg-brand-green" : "bg-gray-500"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Step Content */}
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Back
              </button>
            )}

            {currentStep < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 bg-brand-green text-brand-dark rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-brand-green text-brand-dark rounded"
              >
                Submit Agent
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
