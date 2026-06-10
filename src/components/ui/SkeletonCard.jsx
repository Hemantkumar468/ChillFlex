const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-800 rounded-lg aspect-[2/3] w-full mb-2" />
    <div className="bg-gray-800 rounded h-4 w-3/4 mb-1" />
    <div className="bg-gray-800 rounded h-3 w-1/2" />
  </div>
);

export const SkeletonRow = () => (
  <div className="mb-8">
    <div className="bg-gray-800 rounded h-6 w-48 mb-4 animate-pulse" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  </div>
);

export default SkeletonCard;
