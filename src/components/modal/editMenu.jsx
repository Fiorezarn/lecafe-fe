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

function ModalEditMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4" variant="success">
          New Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
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
              />
              {errors.name && (
                <span className="text-red-700">{errors.name.message}</span>
              )}
            </div>

            <div className="items-center">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                {...register("image", { required: "Image is required" })}
                type="file"
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
                type="text"
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
              )}{" "}
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
