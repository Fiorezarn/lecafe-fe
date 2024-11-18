function VerifySuccess() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-earth4 text-earth">
      <h1
        className="text-4xl font-bold text-earth"
        style={{ color: "#493628" }}
      >
        Verification Successful
      </h1>
      <p className="mt-4 text-lg text-earth2 text-center max-w-md">
        Your account has been successfully verified! You can now access all
        features.
      </p>
      <button
        onClick={() => (window.location.href = "/login")}
        className="mt-8 px-6 py-3 rounded-md font-semibold text-white bg-earth2 hover:bg-earth3 transition-colors duration-300"
        style={{ backgroundColor: "#AB886D", color: "#E4E0E1" }}
      >
        Login Now
      </button>
    </div>
  );
}

export default VerifySuccess;
