import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { RootState } from "../../store/store";
import { onCloseCreateClass } from "../../store/createClassSlice";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler,  } from "react-hook-form";

function CreateClassModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useSelector((state: RootState) => state.createClass.isOpen);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      className: "",
      section: "",
      subject: "",
      room: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // call api
  }

  const bodyContent = (
    <div className="flex flex-col gap-4 pt-4">
      <InputText
        id="ClassName"
        label="Class Name (required)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="Section"
        label="Section"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="Subject"
        label="Subject"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="Room"
        label="Room"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    
    <Modal
      title="Create Class"
      disabled={isLoading}
      isOpen={showModal}
      onClose={() => {dispatch(onCloseCreateClass()); reset();}}
      body={bodyContent}
      labelSubmit="Create"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default CreateClassModal;
