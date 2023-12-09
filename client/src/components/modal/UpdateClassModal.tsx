import { useState } from "react";
import Modal from "./Modal";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { ObjectUserClassRoom, UpdateClassroom } from "../../models";

interface Props {
    currentClass: ObjectUserClassRoom;
    isOpen: boolean;
    handleClose: () => void;
}

function UpdateClassModal({currentClass, isOpen = false, handleClose}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      className: currentClass.classId.className,
      section: currentClass.classId.section,
      subject: currentClass.classId.subject,
      room: currentClass.classId.room,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // // call api
    console.log(data);
    // const promise = dispatch(createUserClass(data as UpdateClassroom));

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
      title="Create Class"
      disabled={isLoading}
      isOpen={isOpen}
      onClose={handleClose}
      body={bodyContent}
      labelSubmit="Create"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default UpdateClassModal;
