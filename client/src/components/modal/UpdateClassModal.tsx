import { useEffect, useState } from "react";
import Modal from "./Modal";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../hooks/hooks";
import { ObjectUserClassRoom, UpdateClassroom } from "../../models";
import { updateUserClass } from "../../store/userClassroomSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface Props {
  currentClass: ObjectUserClassRoom;
  isOpen: boolean;
  handleClose: () => void;
}

const schema = yup.object().shape({
  className: yup
    .string()
    .max(50, "Class name max 50")
    .required("Class name is required"),
  section: yup.string().max(50, "Class name max 50"),
  subject: yup.string().max(50, "Class name max 50"),
  room: yup.string().max(50, "Class name max 50"),
});

function UpdateClassModal({
  currentClass,
  isOpen = false,
  handleClose,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({resolver: yupResolver<FieldValues>(schema)});

  useEffect(() => {
    setValue("className", currentClass.classId.className);
    setValue("section", currentClass.classId.section);
    setValue("subject", currentClass.classId.subject);
    setValue("room", currentClass.classId.room);
  }, [currentClass]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    // // call api
    console.log(data);
    dispatch(
      updateUserClass({
        path: `c/${currentClass.classId._id}`,
        body: data as UpdateClassroom,
      })
    )
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
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
      title="Update Class"
      disabled={isLoading}
      isOpen={isOpen}
      onClose={handleClose}
      body={bodyContent}
      labelSubmit="Update"
      onSubmit={handleSubmit(onSubmit)}
      width="600px"
    />
  );
}

export default UpdateClassModal;
