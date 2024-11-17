import CardRecommended from "@/components/menu/CardRecommended";

function SpecialMenu() {
  return (
    <section className="bg-earth6 p-10">
      <h1 className="text-3xl font-mono text-center font-bold text-[#83704d]">
        OUR SPECIAL MENU
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
        <CardRecommended />
      </div>
    </section>
  );
}

export default SpecialMenu;
