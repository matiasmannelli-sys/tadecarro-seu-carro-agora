import ProgressBar from "@/components/ProgressBar";
import CarDisplay from "@/components/CarDisplay";
import QuickActions from "@/components/QuickActions";

const HomePage = () => {
  // Mock data — will come from Supabase
  const contractProgress = 67;
  const monthsLeft = 8;

  return (
    <div className="flex flex-col min-h-screen pb-6">
      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
        <ProgressBar percentage={contractProgress} monthsLeft={monthsLeft} />
      </div>

      <div className="opacity-0 animate-fade-up flex-1 flex items-center justify-center" style={{ animationDelay: "250ms", animationFillMode: "forwards" }}>
        <CarDisplay />
      </div>

      <div className="opacity-0 animate-fade-up" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
        <QuickActions userName="João Silva" />
      </div>
    </div>
  );
};

export default HomePage;
