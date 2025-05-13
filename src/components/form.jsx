import MachineInputs from "./machineinputs.jsx";
import ServiceInputs from "./serviceinputs.jsx";
import MiscInputs from "./miscinputs.jsx";

function Form() {
  return (
    <>
      <form action="#" method="post" id="service-form" className="service-form">
        <MachineInputs />
        <ServiceInputs />
        <MiscInputs />
      </form>
    </>
  );
}

export default Form;
