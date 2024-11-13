function NoData({ title, paragraph }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <img
        src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731403601/no-data_l2xxij.png"
        alt="No data"
        className="w-40 h-40 mb-4"
      />
      <h2 className="text-white text-xl font-semibold">{title}</h2>
      <p className="text-earth1 text-center">{paragraph}</p>
    </div>
  );
}

export default NoData;
