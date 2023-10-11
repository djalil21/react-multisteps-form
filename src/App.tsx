import { useMultistepForm } from "./useMultistepForm";
import UserForm from "./UserForm";
import AddressForm from "./AddressForm";
import AccountForm from "./AccountForm";
import { FormEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState(INITIAL_DATA)
  
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return {...prev,...fields}
    })
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <UserForm {...data} updateFields={updateFields} />,
      <AddressForm {...data} updateFields={updateFields} />,
      <AccountForm {...data} updateFields={updateFields} />,
    ]);
  
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("Successful Acount Creation")
  }

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <div
        style={{
          position: "relative",
          border: "1px solid black",
          padding: "2rem",
          margin: "1rem",
          borderRadius: "0.5rem",
          fontFamily: "Arial",
          maxWidth: "max-content",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              position: "absolute",
              top: ".5rem",
              right: ".5rem",
            }}
          >
            {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "flex-end",
              gap: ".5rem",
            }}
          >
            {!isFirstStep && (
              <button type="button" onClick={back}>
                back
              </button>
            )}
            <button type="submit">{isLastStep ? "finish" : "next"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
