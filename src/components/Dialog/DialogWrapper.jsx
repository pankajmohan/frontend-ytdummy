import * as Dialog from '@radix-ui/react-dialog';
// import { X } from 'lucide-react';
import { AiOutlineClose } from 'react-icons/ai';

export default function DialogWrapper({ 
  open, 
  setOpen, 
  title = "Dialog", 
  trigger, 
  children, 
  size = "md" 
}) {
  const maxWidth = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content
          className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                      w-full ${maxWidth[size]} rounded-xl  bg-zinc-900 
                      p-6 shadow-lg`}
        >
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-semibold  text-white">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className=" text-zinc-400 hover:text-white">
                <AiOutlineClose size={20} />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-4">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
