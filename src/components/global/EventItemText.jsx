"use client";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { useState } from "react";

//Components
import CustomButton from "./CustomButton";

//Framer Motion
import {
  backInOut,
  easeInOut,
  motion,
  useAnimationControls,
} from "framer-motion";

//Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Label } from "@/components/ui/label";

const EventItemText = ({
  id,
  title,
  description,
  date,
  location,
  totalTickets,
  bookedTickets,
  ...rest
}) => {
  const pathname = usePathname();
  const isEventsPage = pathname?.startsWith("/events");
  const isDashboardPage = pathname?.startsWith("/dashboard");
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Sletter event med ID: ${id}`);
    setOpen(false);
  };
  console.log(`EventItemText: ${dataevent}`);

  //Framer motion: Animation read more ... Hover
  const controles = useAnimationControls();
  const handleHover = () => {
    controles.start("animate");
  };
  const handleLeave = () => {
    controles.start("initial");
  };
  return (
    <Card
      className={`mb-2 flex flex-col grid-cols-2 h-full md:ml-0`}
      style={{ minWidth: "250px" }}
    >
      <CardHeader className="p-4 relative">
        <CardTitle className="">{title}</CardTitle>
        <CardDescription className="mb-1">{date}</CardDescription>

        <CardDescription>{rest.time || "17.00"}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex flex-col flex-grow">
        <p>{location?.name}</p>
        <p className="mb-2">{location?.address}</p>
        <p>{description}</p>
      </CardContent>
      <CardFooter
        className={`flex items-center justify-between p-4 ${
          isDashboardPage
            ? "flex-col items-start gap-2"
            : "flex-row items-center justify-between"
        }`}
      >
        {isEventsPage ? (
          <>
            <Link
              href={`/eventView/${dataevent.id}`}
              className="flex items-center"
            >
              Læs mere <p className="ml-2">➡️</p>
            </Link>
            <div style={{ marginBottom: "auto" }}>
              <CustomButton
                link="/paymentpage"
                text="Tilmeld"
                onClick={() => console.log("Tilmeld")}
              />
            </div>
          </>
        ) : (
          <div
            className="flex items-center gap-2"
            style={{ marginBottom: "auto" }}
          >
            <CustomButton
              text="Rediger"
              onClick={() => console.log("Rediger event")}
            />
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <CustomButton text="Slet" variant="destructive" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Er du sikker på, at du vil slette dette event? Denne
                    handling kan ikke fortrydes.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-end">
                  <AlertDialogCancel onClick={() => setOpen(false)}>
                    Annuller
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Slet
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventItemText;
