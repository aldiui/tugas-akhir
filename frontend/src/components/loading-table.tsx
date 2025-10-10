const LoadingTable = () => {
  return (
    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="bg-blue-600 text-white text-sm font-medium py-2.5 px-5 rounded-lg shadow-lg">
        Memproses...
      </div>
    </div>
  );
};

export default LoadingTable;
