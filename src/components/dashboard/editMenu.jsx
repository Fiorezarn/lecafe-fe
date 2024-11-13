import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Pen } from "lucide-react";

function ModalEditMenu({ menuId }) {
  const dispatch = useDispatch();
  const { menuById } = useSelector((state) => state.menu);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleEditClick = () => {
    reset();
    if (menuId) {
      dispatch({ type: "menu/getMenuById", payload: menuId });
    }
  };

  useEffect(() => {
    if (menuById) {
      setValue("name", menuById.mn_name);
      setValue("price", menuById.mn_price);
      setValue("description", menuById.mn_desc);
      setValue("category", menuById.mn_category);
    }
  }, [menuById, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    dispatch({
      type: "menu/updateMenu",
      payload: { id: menuId, formData: formData },
    });
  };

  const categoryData = [
    { id: 1, name: "coffee" },
    { id: 2, name: "non-coffee" },
    { id: 3, name: "food" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4" variant="primary" onClick={handleEditClick}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="items-center">
              <Label htmlFor="name">Menu</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                type="text"
                defaultValue={menuById?.mn_name || ""}
              />
              {errors.name && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="image">Image</Label>
              {menuById?.mn_image && (
                <img
                  src={menuById.mn_image}
                  alt={menuById.mn_name}
                  className="mt-2 h-20 w-20 object-cover"
                />
              )}
              <Input id="image" {...register("image")} type="file" />
              {errors.image && (
                <span className="text-red-700">{errors.image.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="w-full rounded-md border border-input p-2 text-sm"
                defaultValue={menuById?.mn_desc || ""}
              />
              {errors.description && (
                <span className="text-red-700">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                {...register("price", { required: "Price is required" })}
                type="text"
                defaultValue={menuById?.mn_price || ""}
              />
              {errors.price && (
                <span className="text-red-700">{errors.price.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="category">Category</Label>
              <Select
                defaultValue={menuById?.mn_category || ""}
                onValueChange={(selectedValue) => {
                  setValue("category", selectedValue);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryData.map((item) => (
                    <SelectItem value={item.name} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <span className="text-red-700">{errors.category.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalEditMenu;
