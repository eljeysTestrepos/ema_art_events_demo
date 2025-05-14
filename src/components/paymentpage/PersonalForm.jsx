"use client";
import { Button } from "@/components/ui/button";
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

const PersonalForm = () => {
  return (
    <Form>
      <h1> This is ParsonalForm</h1>
      <div>
        <section>
          <label htmlFor="">Fistname</label>
          <input type="text" />
        </section>
        <section>
          <label htmlFor="">Lastname</label>
          <input type="text" />
        </section>
      </div>
      <div>
        <section>
          <label htmlFor="">Adress</label>
          <input type="text" />
        </section>
        <section>
          <label htmlFor="">City</label>
          <input type="text" />
        </section>
        <section>
          <label htmlFor="">Zip code</label>
          <input type="text" />
        </section>
      </div>
    </Form>
  );
};

export default PersonalForm;
