'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FileUpload } from '@/components/chat-components/file-upload';
import Orb from '@/components/ui/Orb';
// import ProfileCard from "@/lib/components/ProfileCard";
import { Particles } from '@/components/magicui/particles';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Server name is required.' }),
  imageUrl: z.string().min(1, { message: 'Server image is required.' }),
});

export function InitialModal() {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/servers', values);

      form.reset();
      if (response.data?.id) {
        router.push(`/servers/${response.data.id}`);
      } else {
        router.refresh();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollArea>
      <div className="h-screen max-h-screen !overflow-hidden w-screen flex bg-black justify-center items-center">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        <div className=" w-fit z-50 ">
          <BackgroundGradient className="rounded-[22px] flex flex-col  items-center min-h-[45vh] w-[25vw] min-w-[25vw] p-4 bg-white dark:bg-black">
            <div className="text-center space-y-2 pb-3 pc-details">
              <h3 className="">ChatSpace</h3>
              <p className="">Create your first chatspace</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <div className="space-y-4 ">
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl className="hidden">
                          <FileUpload
                            endpoint="serverImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isLoading}
                              placeholder="Enter server name"
                              className=" bg-transparent border border-neutral-600 focus-visible: ring-0 text-black focus-visible:ring-offset-0"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <button
                    className="pc-contact-btn"
                    disabled={isLoading}
                    style={{ pointerEvents: 'auto' }}
                    type="submit"
                    aria-label=""
                  >
                    Create
                  </button>
                </div>
              </form>
            </Form>
          </BackgroundGradient>
          {/* <ProfileCard/> */}
        </div>

        <Orb
          hoverIntensity={0}
          rotateOnHover={true}
          hue={0}
          forceHoverState={true}
        />
      </div>
    </ScrollArea>
  );
}
