import { useState } from "react";
import Modal from "./Modal";
import { RootState } from "../../store/store";
import { onCloseCreateClass } from "../../store/createClassSlice";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createUserClass } from "../../store/userClassroomSlice";
import { CreateClassroom } from "../../models";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";


const schema = yup.object().shape({
  className: yup
    .string()
    .max(50, "Class name max 50")
    .required("Class name is required"),
  section: yup.string().max(50, "Class name max 50"),
  subject: yup.string().max(50, "Class name max 50"),
  room: yup.string().max(50, "Class name max 50"),
});

function CreateClassModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useAppSelector(
    (state: RootState) => state.createClass.isOpen
  );
  const dispatch = useAppDispatch();

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
    resolver: yupResolver<FieldValues>(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // // call api
    const promise = dispatch(createUserClass(data as CreateClassroom));
    promise
      .then(() => {
        dispatch(onCloseCreateClass());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        promise.abort();
      });
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
      isOpen={showModal}
      onClose={() => {
        dispatch(onCloseCreateClass());
      }}
      body={bodyContent}
      labelSubmit="Create"
      onSubmit={handleSubmit(onSubmit)}
      width="600px"
    />
  );
}

export default CreateClassModal;
