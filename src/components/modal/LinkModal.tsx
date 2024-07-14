import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { LinkFormType } from '@/types/types'
import { LinkFormDefaultValues } from '@/constants'
import { LinkFormSchema } from '@/lib/validator'
import { FilePenLine } from 'lucide-react'

type LinkModalProps = {
  type: 'Add' | 'Update'
  linkData?: LinkFormType | null
}

export default function LinkModal({ type, linkData }: LinkModalProps) {
  const [open, setOpen] = useState(false)

  const initialValues =
    linkData && type === 'Update' ? linkData : LinkFormDefaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof LinkFormSchema>>({
    resolver: zodResolver(LinkFormSchema),
    defaultValues: initialValues,
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LinkFormSchema>) {
    console.log('values', values)
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

    // close modal
    wait().then(() => setOpen(false))

    if (type === 'Add') {
      return
    }

    if (type === 'Update') {
      return
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={`w-full h-full ${type === 'Add' ? '' : 'mr-3'}`}
        tabIndex={-1}
      >
        {type === 'Add' ? (
          <div className="flex-center gap-x-1 px-3 py-2 text-white  shadow-xl hover:scale-[1.02]  transition-all bg-yellow flex-center">
            Add New Link
          </div>
        ) : (
          <FilePenLine className="hover:text-yellow" />
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[700px] max-sm:w-[95%] mx-auto !rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {type === 'Add' ? ' Add New Link' : 'Update Link'}
          </DialogTitle>
          <DialogDescription aria-label="add or update the link" />
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-5 max-w-[800px] mx-auto  bg-white rounded-3xl p-2 md:p-3 "
              >
                <div className="flex flex-col gap-5 ">
                  {/* type title */}
                  <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                      <FormItem className="w-full mb-2 ">
                        <FormLabel className="ml-2 ">Label</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: 'Browse Luxury Vehicles for Rent in Abu Dhabi'"
                            {...field}
                            className="input-field"
                          />
                        </FormControl>

                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />

                  {/* type value */}
                  <FormField
                    control={form.control}
                    name="link"
                    render={({ field }) => (
                      <FormItem className="w-full mb-2 ">
                        <FormLabel className="ml-2 ">Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: 'airport_pickup'"
                            {...field}
                            className="input-field"
                          />
                        </FormControl>
                        <FormDescription className="ml-2">
                          Link should be in the following format
                        </FormDescription>
                        <FormMessage className="ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                {/* submit  */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full flex-center col-span-2 mt-3 !text-lg !font-semibold button bg-yellow hover:bg-yellow/90"
                >
                  {type === 'Add' ? 'Publish Link' : 'Update Link'}
                </Button>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
