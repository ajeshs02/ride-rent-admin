import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'

type DeleteModalProps = {
  onDelete: () => void
}

export default function DeleteModal({ onDelete }: DeleteModalProps) {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirmDelete = async () => {
    await onDelete()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Trash2 className="text-red-400 hover:text-red-500" />
      </DialogTrigger>
      <DialogContent className=" w-fit max-sm:w-[95%] mx-auto !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Confirm Delete
          </DialogTitle>
          <DialogDescription aria-label="Delete selected item" />
          <div>
            <p className="mt-2 mb-8 text-lg text-center">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center gap-3">
              <Button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 !text-white !font-semibold"
              >
                Confirm
              </Button>
              <Button
                onClick={handleClose}
                className="bg-gray-400 hover:bg-gray-500 !text-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
