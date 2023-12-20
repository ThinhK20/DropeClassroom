import { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import { RootState } from "../../store/store";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { onCloseJoinClass } from "../../store/joinClassSlice";
import { userJoinClassByCode } from "../../store/userClassroomSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { AxiosError } from "axios";

function JoinClassModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useSelector((state: RootState) => state.joinClass.isOpen);
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
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data.classCode);
    // call api
    const promise = dispatch(userJoinClassByCode({classCode: data.classCode}));

    promise.then(() => {
      reset();
      dispatch(onCloseJoinClass());
    })
    .catch((err: AxiosError) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
      promise.abort();
    })
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
      onClose={() => {dispatch(onCloseJoinClass()); reset();}}
      header={headerContent}
      body={bodyContent}
      footer={footerBody}
      labelSubmit="Join"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
}

export default JoinClassModal;
