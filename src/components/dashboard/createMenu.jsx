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
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "@/features/menu/menuSlice";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "number.empty": "Price is required",
  }),
  category: Joi.string()
    .valid("coffee", "non-coffee", "food")
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": "Please select a valid category",
    }),
  image: Joi.any().required().messages({
    "any.required": "Image is required",
  }),
});

function ModalCreateMenu() {
  const dispatch = useDispatch();
  const { isOpen, loading } = useSelector((state) => state.menu);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      console.error("No image file selected");
      return;
    }
    dispatch({
      type: "menu/createMenu",
      payload: formData,
    });
  };

  const handleOpen = () => {
    dispatch(setIsOpen(true));
    reset();
  };

  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  const categoryData = [
    { id: 1, name: "coffee" },
    { id: 2, name: "non-coffee" },
    { id: 3, name: "food" },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? handleOpen() : handleClose())}
    >
      <DialogTrigger asChild>
        <Button className="mb-4" variant="success">
          New Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
          <DialogDescription>
            Fill the form below to create a new menu.
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
              />
              {errors.name && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                type="file"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <span className="text-red-700">{errors.image.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                type="text"
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
                type="number"
              />
              {errors.price && (
                <span className="text-red-700">{errors.price.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="category">Category</Label>
              <Select
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
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalCreateMenu;
