"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { useEffect } from "react";
import { setIsOpen } from "@/features/menu/menuSlice";

const schema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "string.empty": "Menu is required" }),
  description: Joi.string()
    .required()
    .messages({ "string.empty": "Description is required" }),
  price: Joi.number()
    .required()
    .messages({ "number.base": "Price must be a number" }),
  category: Joi.string()
    .valid("coffee", "non-coffee", "food")
    .required()
    .messages({
      "string.empty": "Category is required",
      "any.only": "Please select a valid category",
    }),
  image: Joi.alternatives().conditional("type", {
    is: "create",
    then: Joi.any()
      .required()
      .messages({ "any.required": "Image is required" }),
    otherwise: Joi.any().optional(),
  }),
  type: Joi.string().valid("create", "edit").required(),
});

function ModalMenu() {
  const dispatch = useDispatch();
  const { isOpen, loading, type, productId, menuById, editData, newData } =
    useSelector((state) => state.menu);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    mode: "onSubmit",
    resolver: joiResolver(schema),
    defaultValues: {
      type,
    },
  });

  useEffect(() => {
    if (productId) {
      dispatch({ type: "menu/getMenuById", payload: productId });
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (type === "edit" && menuById) {
      setValue("name", menuById?.mn_name);
      setValue("price", menuById?.mn_price);
      setValue("description", menuById?.mn_desc);
      setValue("category", menuById?.mn_category);
    }
  }, [type, menuById, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);

      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      if (type === "edit") {
        dispatch({
          type: "menu/updateMenu",
          payload: { id: productId, formData },
        });
        if (editData) {
          setIsOpen(false);
        }
      }

      if (type === "create") {
        dispatch({
          type: "menu/createMenu",
          payload: formData,
        });
        if (newData) {
          setIsOpen(false);
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "edit" ? "Edit Menu" : "Create Menu"}
          </DialogTitle>
          <DialogDescription>
            {type === "edit"
              ? "Make changes to your menu item. Click save when you're done."
              : "Fill in the details for the new menu item and click save."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="items-center">
              <Label htmlFor="name">Menu</Label>
              <Input id="name" {...register("name")} type="text" />
              {errors.name && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="image">Image</Label>
              {type === "edit" && menuById?.mn_image && (
                <img
                  src={menuById?.mn_image}
                  alt={menuById?.mn_name}
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
                {...register("description")}
                className="w-full rounded-md border p-2 text-sm"
              />
              {errors.description && (
                <span className="text-red-700">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="price">Price</Label>
              <Input id="price" {...register("price")} type="number" />
              {errors.price && (
                <span className="text-red-700">{errors.price.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={watch("category")}
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
              <input type="hidden" {...register("category")} />
              {errors.category && (
                <span className="text-red-700">{errors.category.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : type === "edit"
                ? "Save Changes"
                : "Create Menu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalMenu;
