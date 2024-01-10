import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { RootState } from "../../store/store";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { onCloseJoinClass } from "../../store/joinClassSlice";
import { userJoinClassByCode } from "../../store/userClassroomSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { Alert } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  classCode: yup
    .string()
    .matches(/^[a-zA-Z0-9].{6}$/, "Class code must be exactly 6 characters")
    .required("Class code is required"),
});

function JoinClassModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useSelector((state: RootState) => state.joinClass.isOpen);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const dispatch = useAppDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      classCode: "",
    },
    resolver: yupResolver<FieldValues>(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // call api
    dispatch(userJoinClassByCode({ classCode: data.classCode }))
      .unwrap()
      .then(() => {
        reset();
        dispatch(onCloseJoinClass());
        setErrorMsg("");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMsg("Class not found");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const headerContent = (
    <span className="mt-2">
      Ask your teacher for the class code, then enter it here
    </span>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4 pt-4 ">
      <InputText
        id="classCode"
        label="Class Code"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {errorMsg && <Alert severity="error">{errorMsg || errors['classCode']?.message as string}</Alert>}
      {errors['classCode'] && <Alert severity="error">{errors['classCode']?.message as string}</Alert>}
    </div>
  );

  const footerBody = (
    <div className="text-sm mt-4">
      <p>
        Use a class code consisting of 5-7 letters or numbers, without spaces or
        symbols.
      </p>
      <ol className="list-disc px-4 mt-2">
        <li>Use an authorized account.</li>
        <li>
          Use a class code consisting of 5-7 letters or numbers, without spaces
          or symbols.
        </li>
      </ol>
    </div>
  );

  return (
    <Modal
      title="Join Class"
      disabled={isLoading}
      isOpen={showModal}
      onClose={() => {
        dispatch(onCloseJoinClass());
        setErrorMsg("");
        reset();
      }}
      header={headerContent}
      body={bodyContent}
      footer={footerBody}
      labelSubmit="Join"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default JoinClassModal;
