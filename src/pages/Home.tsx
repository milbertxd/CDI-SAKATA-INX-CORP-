// ...existing imports...
const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: "none" }}
      >
        <source src="vid.mp4" type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-20 bg-transparent">
        {/* ...your existing Home content/components... */}
      </div>
    </div>
  );
};

export default Home;