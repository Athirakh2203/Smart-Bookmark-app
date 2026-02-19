export default function AboutSection() {
  const features = [
    { title: "Private Bookmarks", description: "All your bookmarks are private and only visible to you. Safe & secure.", icon: "🔒" },
    { title: "Real-time Updates", description: "Add or delete bookmarks and see changes instantly across devices.", icon: "⚡" },
    { title: "Easy Access", description: "Quickly access your favorite links anytime, anywhere with one click.", icon: "🌐" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-black via-[#75405f] to-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Why Smart Bookmark?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 bg-[#75405f]/20 backdrop-blur-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
