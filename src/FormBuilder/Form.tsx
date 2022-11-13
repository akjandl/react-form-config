import {useFormBuilderContext} from "./FormBuilderContext";

interface FormProps { children: JSX.Element | JSX.Element[]}

export default function Form(props: FormProps) {
  const {formKit} = useFormBuilderContext();

  return (
    <form onSubmit={formKit.handleSubmit}>
      {props.children}
    </form>
  );
}
