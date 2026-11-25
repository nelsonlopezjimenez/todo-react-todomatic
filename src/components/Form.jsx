import { useState } from "react";

// Two ways to read a form in React. Version 1 is active.
// To try Version 2: comment out Version 1 (from here to its closing brace),
// uncomment Version 2 below, and remove the useState import.

// ---------------------------------------------------------------------------
// Version 1: controlled inputs
// Each input's value lives in React state and changes on every keystroke.
// ---------------------------------------------------------------------------
function Form({ addTask }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // NOTE: As written, this function has a bug: it doesn't prevent the user
  // from submitting an empty form. This is left as an exercise for developers
  // working through MDN's React tutorial.
  function handleSubmit(event) {
    event.preventDefault();
    addTask(name, email);
    setName("");
    setEmail("");
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>

      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <label htmlFor="new-todo-email" className="label__lg">
        Email (optional)
      </label>
      <input
        type="email"
        id="new-todo-email"
        className="input input__lg"
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleEmailChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Version 2: form action with FormData (React 19)
// The inputs keep their own values (no state, no onChange). On submit, React
// calls the action with a FormData object, read by each input's `name`, and
// then clears the form by itself. No preventDefault needed.
// https://react.dev/reference/react-dom/components/form
// ---------------------------------------------------------------------------
// function Form({ addTask }) {
//   // NOTE: As written, this function has a bug: it doesn't prevent the user
//   // from submitting an empty form. This is left as an exercise for developers
//   // working through MDN's React tutorial.
//   function addTaskAction(formData) {
//     addTask(formData.get("text"), formData.get("email"));
//   }
//
//   return (
//     <form action={addTaskAction}>
//       <h2 className="label-wrapper">
//         <label htmlFor="new-todo-input" className="label__lg">
//           What needs to be done?
//         </label>
//       </h2>
//
//       <input
//         type="text"
//         id="new-todo-input"
//         className="input input__lg"
//         name="text"
//         autoComplete="off"
//       />
//       <label htmlFor="new-todo-email" className="label__lg">
//         Email (optional)
//       </label>
//       <input
//         type="email"
//         id="new-todo-email"
//         className="input input__lg"
//         name="email"
//         autoComplete="email"
//       />
//       <button type="submit" className="btn btn__primary btn__lg">
//         Add
//       </button>
//     </form>
//   );
// }

export default Form;
