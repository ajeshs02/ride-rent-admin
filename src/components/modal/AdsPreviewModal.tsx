import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Eye } from 'lucide-react'

type ModalProps = {
  src: string
}

export default function AdsPreviewModal({ src }: ModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger tabIndex={-1}>
        <Eye className="text-white hover:text-yellow" width={30} />
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-sm:w-[95%] mx-auto !rounded-3xl">
        <DialogTitle>Ad Preview</DialogTitle>
        <DialogDescription aria-label="Preview of the selected AD" />
        <DialogHeader>
          <div className="w-full h-[400px] rounded-lg flex-center overflow-hidden">
            <img
              src={src}
              alt="ad preview"
              loading="lazy"
              className="object-contain w-full h-full"
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
