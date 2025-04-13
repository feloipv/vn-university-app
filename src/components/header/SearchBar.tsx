import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

const searchBarSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "Từ khóa không được để trống." })
    .max(100, { message: "Từ khóa không được dài quá 100 ký tự." }),
});

export type SearchBarType = z.infer<typeof searchBarSchema>;

const SearchBar = () => {
  const formSearchBar = useForm<SearchBarType>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = async (value: SearchBarType) => {
    console.log(value);
  };
  return (
    <Form {...formSearchBar}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          formSearchBar.handleSubmit(onSubmit)(e);
        }}
        className="space-y-6 m-auto w-full grid justify-items-end"
      >
        <FormField
          control={formSearchBar.control}
          name="search"
          render={({ field }) => (
            <FormItem
              className={`w-full h-max flex gap-0 border rounded-md focus-within:border-gray-500 ${
                formSearchBar.formState.errors.search &&
                "focus-within:border-red-500"
              }`}
            >
              <Button
                type="submit"
                className="w-max h-full hover:bg-transparent bg-transparent cursor-pointer text-gray-500 hover:text-black"
              >
                <Search className="text-inherit" />
              </Button>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tên trường đại học..."
                  className="focus-visible:ring-0 focus:outline-none w-full h-8 px-0 border-0"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
export default SearchBar;
