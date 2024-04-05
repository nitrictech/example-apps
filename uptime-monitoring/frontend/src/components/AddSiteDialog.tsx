import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API_BASE } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Loader2 } from "lucide-react";

const urlSchema = z.string().refine(
  (url) => {
    const idx = url.lastIndexOf(".");
    if (idx === -1 || url.substring(idx + 1) === "") {
      return false;
    }

    if (!url.startsWith("http:") && !url.startsWith("https:")) {
      url = "https://" + url;
    }

    try {
      const u = new URL(url);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch (_) {
      return false;
    }
  },
  {
    message: "Must be a valid URL.",
  }
);

const formSchema = z.object({
  url: urlSchema,
});

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddSiteDialog({ open, onClose }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      await fetch(`${API_BASE}/sites/${encodeURI(values.url)}`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });

      form.reset({
        url: "",
      });

      onClose();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    save.mutate(values);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add site</DialogTitle>
              <DialogDescription>
                Add your site to monitor here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-right'>Domain</FormLabel>
                    <FormControl>
                      <Input placeholder='google.com' {...field} />
                    </FormControl>
                    <FormDescription>
                      URL for the site to be monitored.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button disabled={save.isPending} type='submit'>
                {save.isPending && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
