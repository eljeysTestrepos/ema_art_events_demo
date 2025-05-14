"use client";
import { Card, CardContent, CardTitle, cardVariants } from "../ui/card";

const OpacityTextBox = () => {
  return (
    <Card className={cardVariants({ variant: "opacity" })}>
      <CardTitle>Header</CardTitle>
      <CardContent>
        <p>Whatever info</p>
      </CardContent>
    </Card>
  );
};

export default OpacityTextBox;
