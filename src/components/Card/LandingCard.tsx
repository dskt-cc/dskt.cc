import { GradientButton } from "@components/Button/GradientButton";

interface LandingCardProps {
    title: string;
    description: string;
    href: string;
    icon: React.ReactNode;
    buttonText: string;
  }
  
  export const LandingCard = ({ title, description, href, icon, buttonText }: LandingCardProps) => {
    return (
      <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:bg-gray-800/60 transition-colors">
        <h3 className="text-xl font-semibold mb-4 text-gray-200">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <GradientButton href={href} gradient="secondary">
          {icon}
          {buttonText}
        </GradientButton>
      </div>
    );
  };