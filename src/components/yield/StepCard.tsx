import { StepCardType } from "./types";

export const StepCard = ({ card }: { card: StepCardType }) => {
  const Icon = card.icon;

  return (
    <div className=" glass-card p-6 rounded-2xl bg-black/30  border border-gray-800">
      <div className="h-12 w-12 bg-[#2563eb1a] rounded-xl flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-[#2563eb]" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">
        {card.step}. {card.title}
      </h3>
      <p className="text-gray-300 text-sm">{card.description}</p>
    </div>
  );
};
