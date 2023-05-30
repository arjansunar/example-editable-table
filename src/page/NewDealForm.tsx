import {
  Button,
  Collapse,
  CollapseProps,
  Form,
  FormItemProps,
  Input,
} from "antd";
import { useForm } from "antd/es/form/Form";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { NamePath } from "antd/es/form/interface";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Props = {};

export const CollapsableFormSection = ({ children }: CollapseProps) => {
  return (
    <Collapse defaultActiveKey={["0"]} ghost>
      <Collapse.Panel key={0} header={"header"} className="panel">
        {children}
      </Collapse.Panel>
    </Collapse>
  );
};

const VehicleInformationForm = () => {
  return (
    <FormItemWrapper
      label="Stock #"
      name={["vehicleInformation", "stockNo"]}
      onViewChildren={(val) => <div>{val}</div>}
    >
      <Input />
    </FormItemWrapper>
  );
};

const formSections = [
  {
    wrapper: CollapsableFormSection,
    form: VehicleInformationForm,
  },
  {
    wrapper: CollapsableFormSection,
    form: VehicleInformationForm,
  },
  {
    wrapper: ({children}: {children: ReactNode})=> <div className="tw-bg-red-500">{children}</div>,
    form: VehicleInformationForm,
  },
];

export const NewDealPage = (props: Props) => {
  return (
    <NewDealFormProvider>
      <ToggleEdit />
      {formSections.map((sections, idx) => (
        <sections.wrapper key={idx}>
          <sections.form />
        </sections.wrapper>
      ))}
    </NewDealFormProvider>
  );
};

const ToggleEdit = () => {
  const { setIsEdit } = useContext(NewDealFormContext);

  return (
    <Button
      onClick={() => {
        if (setIsEdit) {
          setIsEdit((prev) => !prev);
        }
      }}
    >
      toggle
    </Button>
  );
};

interface NewDealFormContext {
  isEdit: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
}
const NewDealFormContext = createContext<NewDealFormContext>({ isEdit: false });

const NewDealFormProvider = ({ children }: { children: ReactNode }) => {
  const newDealCtx = useContext(NewDealFormContext);
  const [isEdit, setIsEdit] = useState(newDealCtx.isEdit);
  const [form] = useForm();
  return (
    <NewDealFormContext.Provider value={{ isEdit, setIsEdit }}>
      <Form
        form={form}
        initialValues={{ vehicleInformation: { stockNo: "testing" } }}
      >
        <Form.Provider>{children}</Form.Provider>
      </Form>
    </NewDealFormContext.Provider>
  );
};

interface FormItemWrapper extends FormItemProps {
  label: ReactNode;
  onViewChildren?: (val: string | number) => ReactNode;
  name: NamePath;
}

const FormItemWrapper = ({
  children,
  onViewChildren,
  label,
  name,
  ...props
}: FormItemWrapper) => {
  const { isEdit } = useContext(NewDealFormContext);

  const form = useFormInstance();
  const fieldValue = form.getFieldValue(name);

  /** Return appropriate child according to the isEdit value */
  const _children = () => {
    if (!isEdit && onViewChildren) {
      return onViewChildren(fieldValue);
    }
    return children;
  };
  return (
    <Form.Item {...props} label={label} name={name}>
      {_children()}
    </Form.Item>
  );
};
