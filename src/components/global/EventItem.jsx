"use client";
import Image from "next/image";
import Placeholder from "@/app/assets/img/placeholder.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";
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
import { useState } from "react";

const EventItem = (dataevent, dataSMK) => {
  console.log("eventItem: ", "SMK: ", dataSMK, "eventList: ", dataevent);
  const pathname = usePathname();
  const isEventsPage = pathname?.startsWith("/events");
  const isDashboardPage = pathname?.startsWith("/dashboard");
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Sletter event med ID: ${dataevent.id}`);
    setOpen(false);
  };

  // const data = dataevent.artworkIds.map((artwork) => {
  //   const result = smkarr.find((SMKitem) => SMKitem.object_number == artwork);
  //   return result;
  // });
  // console.log("SMK data iforholdet til sitets event id: ", data);

  return (
    <article className="grid grid-cols-1 p-6 md:grid-cols-[auto_1fr] md:gap-6 md:flex-row">
      <figure className="max-w-[250px] mb-6 grid grid-cols-1 grid-rows-1 md:flex-shrink-0">
        <div className="w-[200px] h-[250px] bg-black rounded-xl row-start-1 col-start-1"></div>
        <Image
          src={Placeholder}
          alt="noget"
          width={500}
          height={500}
          className="block w-[200px] h-[250px] z-2 rounded-xl row-start-1 col-start-1"
          style={{ objectFit: "cover", transform: "translate(25px, 25px)" }}
        />
      </figure>
      <Card
        className={`mb-2 flex flex-col h-full md:ml-0`}
        style={{ minWidth: "250px" }}
      >
        <CardHeader className="p-4">
          <CardTitle className="">{dataevent.title}</CardTitle>
          <CardDescription className="mb-1">{dataevent.date}</CardDescription>
          <CardDescription>{dataevent.time || "17.00"}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <p>{dataevent.location?.name}</p>
          <p className="mb-2">{dataevent.location?.address}</p>
          <p>{dataevent.description}</p>
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
    </article>
  );
};

export default EventItem;
