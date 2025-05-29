"use client";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/global/CustomButton";
import { useRouter } from "next/navigation";

const PersonalForm = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Formular data:", data);

    router.push("/paymentconfirmation");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 col-start-1 mt-8 ml-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            rules={{ required: "Fornavn er påkrævet" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fornavn</FormLabel>
                <FormControl>
                  <Input placeholder="Anders" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            rules={{ required: "Efternavn er påkrævet" }}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Efternavn</FormLabel>
                <FormControl>
                  <Input placeholder="Andersen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email er påkrævet",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Ugyldig email adresse",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="address"
            rules={{ required: "Adresse er påkrævet" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="Gade 123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            rules={{ required: "By er påkrævet" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>By</FormLabel>
                <FormControl>
                  <Input placeholder="København" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            rules={{
              required: "Postnummer er påkrævet",
              pattern: {
                value: /^\d{4}$/,
                message: "Ugyldigt postnummer (skal være 4 cifre)",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postnummer</FormLabel>
                <FormControl>
                  <Input placeholder="1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CustomButton type="submit" text="Gå til betaling"></CustomButton>
      </form>
    </FormProvider>
  );
};

export default PersonalForm;
