function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-earth4 text-earth">
      <h1
        className="text-4xl font-bold text-earth"
        style={{ color: "#493628" }}
      >
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-earth2 text-center max-w-md">
        Sorry, the page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-8 px-6 py-3 rounded-md font-semibold text-white bg-earth2 hover:bg-earth3 transition-colors duration-300"
        style={{ backgroundColor: "#AB886D", color: "#E4E0E1" }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
