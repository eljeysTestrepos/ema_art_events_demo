"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Definer dit form schema med Zod
const formSchema = z.object({
  fornavn: z.string().min(2, {
    message: "Fornavn skal være mindst 2 tegn.",
  }),
  efternavn: z.string().min(2, {
    message: "Efternavn skal være mindst 2 tegn.",
  }),
  adresse: z.string().min(5, {
    message: "Adresse skal være mindst 5 tegn.",
  }),
  by: z.string().min(2, {
    message: "By skal være mindst 2 tegn.",
  }),
});

const PersonalForm = () => {
  // Initialiser form hooket
  const form = useForm({
    resolver: zodResolver(formSchema), // Brug Zod resolver
    defaultValues: {
      fornavn: "",
      efternavn: "",
      adresse: "",
      by: "",
    },
  });

  // Funktion til at håndtere formindsendelse
  const onSubmit = (data) => {
    // Gør noget med form dataene her
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fornavn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Navn</FormLabel>
                <FormControl>
                  <Input placeholder="Navn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="efternavn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Efternavn</FormLabel>
                <FormControl>
                  <Input placeholder="Efternavn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="adresse"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="Adresse" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>By</FormLabel>
              <FormControl>
                <Input placeholder="By" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Indsend</Button>
      </form>
    </Form>
  );
};

export default PersonalForm;
