import { formatPrice } from "@/lib/utils";

function ExpandedRowComponent({ data }) {
  const orderDetail = JSON.parse(data.OrderDetail[0].od_mn_json);
  const orderDetails = orderDetail.filter((item) => item.id !== "SHIPPING");

  return (
    <div className="p-6 bg-white border-t border-gray-200 shadow-md">
      <h4 className="text-xl font-semibold mb-4">Order Details</h4>

      {orderDetails.map((item, index) => (
        <div key={index} className="flex items-center mb-6">
          <img
            className="w-24 h-24 object-cover rounded-md border mr-4"
            src={item.image}
            alt={item.name}
          />
          <div className="flex-1">
            <p className="text-lg font-medium">{item.name}</p>
            <p className="text-gray-600">Item Name</p>
          </div>

          <div className="flex flex-col ml-4">
            <p className="font-medium">Quantity</p>
            <p className="text-gray-600">{item.quantity}</p>
          </div>
          <div className="flex flex-col ml-4">
            <p className="font-medium">Price</p>
            <p className="text-gray-600">{formatPrice(item.price)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpandedRowComponent;
