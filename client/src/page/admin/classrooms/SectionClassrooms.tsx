import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ClassCode from "../../../components/box/ClassCode";
import InputText from "../../../components/inputs/inputText";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Classroom, UpdateClassroom } from "../../../models";
import { useEffect, useState } from "react";
import { updateClassApi } from "../../../apis/classroomApis";
import { AxiosError } from "axios";
import JoinClass from "../../../components/box/JoinClass";

interface Props {
  clr: Classroom;
}

function SectionClassrooms({ clr }: Props) {
  const [isSubmit, setSubmit] = useState<boolean>(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      className: clr?.className,
      section: clr?.section,
      subject: clr?.subject,
      room: clr?.room,
    },
  });

  useEffect(() => {
    setValue("className", clr?.className);
    setValue("section", clr?.section);
    setValue("subject", clr?.subject);
    setValue("room", clr?.room);
  }, [clr]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const ctrl = new AbortController();
    updateClassApi(`c/${clr?._id}`, data as UpdateClassroom, ctrl.signal)
      .then((data) => {
        console.log(data.data);
        ctrl.abort();
        setSubmit(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
        ctrl.abort();
      });
  };

  if (!clr) return;

  return (
    <>
      <div className="flex-1 flex relative gap-2 overflow-hidden">
        <img src={clr?.coverImage} className="w-full object-cover rounded-md" />
        <div className="my-2 mr-2 absolute top-0 right-0 flex justify-end">
          <button className="flex items-center justify-center space-x-1 bg-white/90 py-2 px-4 rounded-lg shadow hover:bg-white">
            <ModeEditOutlineOutlinedIcon />
            <span className="">Customize</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-2 w-max mt-4">
        <ClassCode classCode={clr?.classCode as string} />
        <JoinClass />
      </div>
      <div className="flex flex-col gap-4 pt-4">
        <InputText
          id="className"
          label="Class Name (required)"
          register={register}
          errors={errors}
          required
        />
        <InputText
          id="section"
          label="Section"
          register={register}
          errors={errors}
        />
        <InputText
          id="subject"
          label="Subject"
          register={register}
          errors={errors}
        />
        <InputText id="room" label="Room" register={register} errors={errors} />
        <div className="flex justify-end ">
          {!isSubmit ? (
            <button
              className="px-10 py-2 rounded-md border w-max bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => setSubmit(!isSubmit)}
            >
              Edit
            </button>
          ) : (
            <button
              className="px-10 py-2 rounded-md border w-max bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleSubmit(onSubmit)}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SectionClassrooms;
