import * as Dialog from "@radix-ui/react-dialog";

export default function DialogDemo({
  open,
  setOpen,
  title,
  children,
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Portal>

        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 z-50"
        />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[500px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-8 shadow-2xl"
        >

          <Dialog.Title
            className="text-2xl font-bold mb-5"
          >
            {title}
          </Dialog.Title>

          {children}

        </Dialog.Content>

      </Dialog.Portal>
    </Dialog.Root>
  );
}