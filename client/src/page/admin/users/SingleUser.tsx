import { useParams } from "react-router-dom";
import { UpdateUserInfoDto, User } from "../../../models";
import { useEffect, useState } from "react";
import { findUserApi, updateUserByAdminApi } from "../../../apis/userApis";
import { AxiosError } from "axios";
import AvatarCustom from "../../../components/avatar/AvatarCustom";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import InputSelect from "../../../components/inputs/inputSelect";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import dayjs from "dayjs";
import InputBoxText from "../../../components/inputs/inputBoxText";
import InputAreaText from "../../../components/inputs/inputAreaText";

function SingleUser() {
  const params = useParams();
  const [user, setUser] = useState<User>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (params.id) {
      const ctrl = new AbortController();

      findUserApi(params.id, ctrl.signal)
        .then((data) => {
          setUser(data.data);
          setValue("username", data.data.username);
          setValue("about", data.data.about);
          setValue("address", data.data.address);
          setValue("gender", data.data.gender);
          setValue("dateOfBirth", dayjs(data.data.dateOfBirth));
          ctrl.abort();
        })
        .catch((err: AxiosError) => {
          console.log(err.message);
          setError(err.message);
          ctrl.abort();
        });
    }
  }, [params.id]);

  const {
    register,
    reset,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      username: user?.username,
      about: user?.about,
      address: user?.address,
      gender: user?.gender,
      dateOfBirth: dayjs(user?.dateOfBirth),
    },
  });

  if (!user) return;
  if (error !== "") return <div className="">{error}</div>;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const ctrl = new AbortController();
    updateUserByAdminApi(user._id, data as UpdateUserInfoDto, ctrl.signal)
      .then(() => {
        ctrl.abort();
      })
      .catch((err: AxiosError) => {
        console.log(err);
        setError(err.message);
        ctrl.abort();
      })
      .finally(() => {
        setIsDisabled(true);
        ctrl.abort();
      });
  };

  return (
    <div className="relative w-full h-full pt-5 pb-5 px-6 md:px-10 flex flex-row gap-[30px] items-start overflow-hidden">
      <div className="view__info w-[50%]">
        <div className="top flex gap-4 items-center">
          <div className="relative img">
            <AvatarCustom
              classroomAvatar={false}
              name={user.username}
              url={""}
              fontSize={40}
              height={80}
              width={80}
            />

            <button className="absolute right-0 bottom-0 bg-blue-50 rounded-full w-5 h-5 flex justify-center items-center hover:bg-blue-100 transition-all">
              <ModeEditOutlineOutlinedIcon sx={{fontSize: 14}}/>
            </button>
          </div>
          <div className="text-2xl font-[600]">{user.email}</div>
          {isDisabled && (
            <button
              className="w-7 h-7 rounded-lg flex justify-center items-center hover:bg-blue-50/60  transition-all hover:scale-110 hover:-translate-y-1 duration-200 -ml-3"
              onClick={() => setIsDisabled(false)}
            >
              <DriveFileRenameOutlineOutlinedIcon
                sx={{ fontSize: 18 }}
                className="text-gray-500"
              />
            </button>
          )}
        </div>
        <div className="bottom mt-10 flex flex-col gap-[30px] text-sm">
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

          <div className="w-full flex">
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
          </div>

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
              reset({
                username: user.username,
                about: user.about,
                address: user.address,
                gender: user.gender,
                dateOfBirth: dayjs(user.dateOfBirth),
              });
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
      </div>
      <div className="activities w-1/2">
        <div className="h2 m-[20px] text-2xl font-[600]">Latest Acitities</div>
        <ul>
          <li className="activities__li relative list-none w-[1px] pt-[50px] bg-[#f45b69] ">
            <div className="min-w-[480px] p-[15px] bg-[#f45b6810]">
              <p className="mt-[5px]">Create new Class</p>
              <time className="text-[12px]">3 day ago</time>
            </div>
          </li>
          <li className="activities__li relative list-none w-[1px] pt-[50px] bg-[#f45b69] ">
            <div className="min-w-[480px] p-[15px] bg-[#f45b6810]">
              <p className="mt-[5px]">Create new Class</p>
              <time className="text-[12px]">4 day ago</time>
            </div>
          </li>
          <li className="activities__li relative list-none w-[1px] pt-[50px] bg-[#f45b69] ">
            <div className="min-w-[480px] p-[15px] bg-[#f45b6810]">
              <p className="mt-[5px]">Create new Class</p>
              <time className="text-[12px]">5 day ago</time>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SingleUser;
