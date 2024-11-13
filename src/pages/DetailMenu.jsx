import CardDetail from "@/components/menu/CardDetail";
import CardRecommended from "@/components/menu/CardRecommended";
import Navbar from "@/components/navigation/Navbar";

function DetailMenu() {
  return (
    <>
      <Navbar />
      <div className="bg-earth3">
        <div id="menu-detail" className="py-10 px-6 lg:px-28">
          <CardDetail />
          <h1 className="text-3xl lg:text-4xl mb-6 lg:mb-10 font-bold mt-10 text-earth text-center">
            Recommended for You
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
            <CardRecommended />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailMenu;
