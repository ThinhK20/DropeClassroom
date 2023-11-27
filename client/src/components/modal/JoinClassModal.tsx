import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPortalCustom from "../portal/ReactPortalCustom";
import Modal from "./Modal";
import { RootState } from "../../store/store";
import InputText from "../inputs/inputText";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { onCloseJoinClass } from "../../store/joinClassSlice";

function JoinClassModal() {
  const [isLoading, setIsLoading] = useState(false);
  const showModal = useSelector((state: RootState) => state.joinClass.isOpen);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
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
  };

  const headerContent = (
    <span className="mt-2">
        Ask your teacher for the class code, then enter it here
    </span>
  );

  const bodyContent = (
    <div className="flex flex-col gap-4 pt-4 ">
      <InputText
        id="ClassCode"
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
        <p>Use a class code consisting of 5-7 letters or numbers, without spaces or symbols.</p>
        <ol className="list-disc px-4 mt-2">
            <li>Use an authorized account.</li>
            <li>Use a class code consisting of 5-7 letters or numbers, without spaces or symbols.</li>
        </ol>
    </div>
  );

  return (
    <ReactPortalCustom wrapperId="react-portal-create-modal-container">
      <Modal
        title="Join Class"
        disabled={isLoading}
        isOpen={showModal}
        onClose={() => dispatch(onCloseJoinClass())}
        header={headerContent}
        body={bodyContent}
        footer={footerBody}
        labelSubmit="Join"
        onSubmit={handleSubmit(onSubmit)}
      />
    </ReactPortalCustom>
  );
}

export default JoinClassModal;
