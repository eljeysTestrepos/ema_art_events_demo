"use client";
import { useForm } from "react-hook-form"; // <--- Ny import
import {
  Form,
  FormControl,
  FormDescription, // Kan udelades hvis ikke brugt
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // <--- Ny import: Din Shadcn UI Input komponent
import CustomButton from "@/components/global/CustomButton"; // Antager denne er din submit-knap

const PersonalForm = () => {
  // 1. Initialiser React Hook Form
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  // 2. Håndter indsendelse af formularen
  const onSubmit = (data) => {
    console.log("Formular data:", data);
    // Her kan du sende data til din backend, f.eks.
  };

  return (
    // 3. Brug form.handleSubmit
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {" "}
        {/* Tilføj en klasse for spacing */}
        <h1 className="text-2xl font-bold">This is PersonalForm</h1>{" "}
        {/* Lidt styling for overskriften */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Første fornavn felt */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />{" "}
                  {/* Brug Shadcn Input her */}
                </FormControl>
                <FormMessage /> {/* Viser valideringsfejl */}
              </FormItem>
            )}
          />

          {/* Efternavn felt */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Adresse felt */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Main St 123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* By felt */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Copenhagen" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Postnummer felt */}
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip code</FormLabel>
                <FormControl>
                  <Input placeholder="1234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* Submit-knap */}
        <CustomButton type="submit" text="Submit"></CustomButton>
      </form>
    </Form>
  );
};

export default PersonalForm;
