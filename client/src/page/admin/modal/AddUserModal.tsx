import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import { RootState } from "../../../store/store";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import InputText from "../../../components/inputs/inputText";

function CreateUserModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useAppSelector(
    (state: RootState) => state.createClass.isOpen
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      className: "",
      section: "",
      subject: "",
      room: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // // call api
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 pt-4">
      <InputText
        id="className"
        label="Class Name (required)"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <InputText
        id="section"
        label="Section"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <InputText
        id="subject"
        label="Subject"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <InputText
        id="room"
        label="Room"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  return (
    <Modal
      title="Add user"
      disabled={isLoading}
      isOpen={showModal}
      onClose={() => {}}
      body={bodyContent}
      labelSubmit="Create"
      onSubmit={handleSubmit(onSubmit)}
      width="600px"
    />
  );
}

export default CreateUserModal;
