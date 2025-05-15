"use client";

import Button from "./CustomButton";

const Basket = () => {
  return (
    <section>
      <h1> This is Basket </h1>
      <ul>
        <li>Titel på event</li>
        <li>Dato på event</li>
        <li>tidspunkt for event</li>
        <li>Lokation</li>
        <li>Hvilket Galleri</li>
      </ul>
      <section>
        <p>Vælg antal billetter</p>
        <div>
          <form action="">
            <Button></Button>
            <label htmlFor=""></label>
            <input type="text" />
            <Button></Button>
          </form>
          <p>95,-</p>
        </div>
        <div>
          <p>Total: </p>
          <p>95,-</p>
        </div>
        <Button>Gå til Betaling</Button>
      </section>

      {/* nice to have toggle til published / draft på kurator siden */}
    </section>
  );
};

export default Basket;
