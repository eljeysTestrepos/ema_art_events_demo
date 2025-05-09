"use client";

const PersonalForm = () => {
  return (
    <form action="">
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
    </form>
  );
};

export default PersonalForm;
