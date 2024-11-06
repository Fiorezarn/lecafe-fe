import CardDetail from "@/components/menu/CardDetail";
import CardList from "@/components/menu/CardList";
import CardRecommended from "@/components/menu/CardRecommended";
import Navbar from "@/components/navbar/Navbar";

function DetailMenu() {
  return (
    <>
      <Navbar navClass={"bg-earth border-gray-200 fixed w-full z-10"}/>
      <div className="bg-earth3">
        <div id="menu-detail" className="py-28 px-28">
          <CardDetail />
          <h1 className="text-4xl mb-10 font-bold mt-10 text-earth text-center">
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
