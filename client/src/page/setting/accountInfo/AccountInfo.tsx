import {
  FieldValues,
  useForm,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import dayjs from "dayjs";
import InputSelect from "../../../components/inputs/inputSelect";
import InputAreaText from "../../../components/inputs/inputAreaText";
import InputBoxText from "../../../components/inputs/inputBoxText";
import { useState } from "react";
import { User } from "../../../models";

interface Props {
  user: User;
}

function AccountInfo({user}: Props) {
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      username: user.username,
      about: "asdfasd",
      gender: user.gender,
      dateOfBirth: dayjs(user.dateOfBirth),
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="medium-24 my-1">
          Account Info <span className="text-rose-600">*</span>
        </p>
        <button
          className="w-7 h-7 rounded-lg flex justify-center items-center hover:bg-blue-50/60  transition-all hover:scale-110 hover:-translate-y-1 duration-200"
          onClick={() => setIsDisabled(!isDisabled)}
        >
          <DriveFileRenameOutlineOutlinedIcon
            sx={{ fontSize: 18 }}
            className="text-gray-500"
          />
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <InputBoxText
          id="username"
          label="User Name"
          disabled={isDisabled}
          register={register}
          errors={errors}
          required
          className="sm:col-span-4"
        />

        <InputBoxText
          id="address"
          label="Street Address"
          disabled={isDisabled}
          register={register}
          errors={errors}
          className="col-span-full"
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field }) => {
            return (
              <div className="relative sm:col-span-3 sm:col-start-1">
                <div id="dateOfBirth">
                  <DatePicker
                    {...field}
                    className="peer w-full"
                    disabled={isDisabled}
                    readOnly={isDisabled}
                    format="DD/MM/YYYY"
                    sx={{
                      "& .MuiInputBase-input.Mui-disabled": {
                        WebkitTextFillColor: "#000000",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#979797",
                      }, //styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": {
                          borderWidth: "2px",
                        },
                        height: "48px",
                        borderRadius: "6px",
                      },
                    }}
                    slotProps={{
                      field: {
                        clearable: false,
                      },
                      textField: {},
                    }}
                  />
                </div>
                <label
                  htmlFor="dateOfBirth"
                  className={`absolute medium-18  duration-150 transform z-10 top-3 -translate-y-11 origin-[0] scale-100`}
                >
                  {"Date of birth"}
                </label>
              </div>
            );
          }}
        />

        <InputSelect
          id="gender"
          label="Gender"
          disabled={isDisabled}
          register={register}
          required
          className="col-span-3"
        />

        <InputAreaText
          id="about"
          label="About"
          disabled={isDisabled}
          register={register}
          errors={errors}
          className="col-span-full"
          rows={6}
        />
      </div>
      <div
        className={`${
          !isDisabled ? "block" : "hidden"
        } flex w-full items-center justify-end gap-3 mt-5`}
      >
        <button
          className={`text-xl p-2 px-6 rounded-lg  hover:bg-blue-50`}
          onClick={() => {
            setIsDisabled(true);
            reset;
          }}
        >
          Cancel
        </button>

        <button
          className={` bg-blue-600/90 text-xl p-2 px-6 rounded-lg text-white hover:bg-blue-700`}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AccountInfo;
