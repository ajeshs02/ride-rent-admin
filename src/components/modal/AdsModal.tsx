import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { FilePenLine, Plus } from 'lucide-react'
import ADsForm from '../form/ADsForm'
import { AdsFormType } from '@/types/types'

type AdsModalProps = {
  type: 'Add' | 'Update'
  adsData?: AdsFormType | null
}

export default function AdsModal({ type, adsData }: AdsModalProps) {
  return (
    <Dialog>
      <DialogTrigger tabIndex={-1}>
        {type === 'Add' ? (
          <div className="flex-center gap-x-1 px-3 py-2 text-white  shadow-xl hover:scale-[1.02]  transition-all bg-yellow flex-center">
            New Ad <Plus />
          </div>
        ) : (
          <FilePenLine className="text-white hover:text-yellow" width={20} />
        )}
      </DialogTrigger>
      <DialogContent className="w-fit max-sm:w-[95%] mx-auto !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {type === 'Add' ? ' Add New AD' : 'Update AD'}
          </DialogTitle>
          <DialogDescription aria-label="add or update the AD" />
        </DialogHeader>
        {/* Ads Form */}
        <ADsForm type={type} adsData={adsData} />
      </DialogContent>
    </Dialog>
  )
}
