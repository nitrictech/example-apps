import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { API_BASE } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  url: string;
  onClose: () => void;
}

export function RemoveSiteDialog({ url, onClose }: Props) {
  const queryClient = useQueryClient();
  const remove = useMutation({
    mutationFn: async (u: string) => {
      await fetch(`${API_BASE}/sites/${encodeURI(u)}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
  });

  function onSubmit() {
    remove.mutate(url);
    onClose();
  }

  return (
    <Dialog
      open={!!url}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Remove site</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            <span className='font-bold'>{url}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='sm:justify-between mt-10'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
          <Button type='button' onClick={onSubmit}>
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
