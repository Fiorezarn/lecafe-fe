import CardDetail from "@/components/menu/CardDetail";
import CardList from "@/components/menu/CardList";
import CardRecommended from "@/components/menu/CardRecommended";
import Navbar from "@/components/navbar/Navbar";

function DetailMenu() {
  return (
    <>
      <Navbar/>
      <div className="bg-earth3">
        <div id="menu-detail" className="py-28 px-28">
          <CardDetail />
          <h1 className="text-4xl mb-10 font-bold mt-10 text-earth text-center">
            Recommended for You
          </h1>
          <CardRecommended />
        </div>
      </div>
    </>
  );
}

export default DetailMenu;
