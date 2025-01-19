export const SkeletonModCard = () => {
  return (
    <div className="p-6 rounded-xl bg-miku-gray/50 backdrop-blur-sm animate-pulse border border-miku-deep/30">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 bg-miku-deep/30 rounded-lg w-32"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-miku-deep/30"></div>
          <div className="w-8 h-8 rounded-lg bg-miku-deep/30"></div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-miku-deep/30 rounded-lg w-full"></div>
        <div className="h-4 bg-miku-deep/30 rounded-lg w-5/6"></div>
        <div className="flex items-center gap-4">
          <div className="h-4 bg-miku-deep/30 rounded-lg w-20"></div>
          <div className="h-4 bg-miku-deep/30 rounded-lg w-16"></div>
        </div>
      </div>
    </div>
  );
};
