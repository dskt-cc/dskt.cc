import { GradientButton } from "@components/Button/GradientButton";

interface LandingCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  buttonText: string;
}

export const LandingCard = ({
  title,
  description,
  href,
  icon,
  buttonText,
}: LandingCardProps) => {
  return (
    <div className="flex flex-col h-full p-6 bg-miku-gray/50 rounded-xl border border-miku-deep/30 hover:bg-miku-deep/20 hover:border-miku-deep/50 transition-all duration-200 group">
      <div className="flex-1">
        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-miku-teal group-hover:text-miku-waterleaf transition-colors duration-200">
          {title}
        </h3>
        <p className="text-miku-light mb-6 group-hover:text-miku-light/90 transition-colors duration-200">
          {description}
        </p>
      </div>
      <div className="w-full sm:w-auto">
        <GradientButton
          href={href}
          gradient="secondary"
          className="w-full sm:w-auto group-hover:scale-[1.02] transition-transform duration-200"
        >
          {icon}
          <span className="flex-1 text-center sm:flex-initial">
            {buttonText}
          </span>
        </GradientButton>
      </div>
    </div>
  );
};
