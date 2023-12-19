import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../../models";
import InputBoxText from "../../../components/inputs/inputBoxText";

interface Props {
  user: User;
}

function AccountSetting({ user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    shouldUnregister: true,
    defaultValues: {
      password: "",
      newPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  };
  return (
    <>
      <p className="medium-24 my-1">Account Setting</p>
      <div className="divide-y divide-gray-200">
        <div className="px-4 pt-6 pb-3 sm:px-0">
          <div className="medium-18 font-medium leading-6 text-gray-900">
            Email address
          </div>
          <div className="flex gap-1 mt-4 py-3 regular-18 leading-6 text-gray-700 sm:mt-0">
            Your email address is{" "}
            <p className="font-medium whitespace-nowrap hover:underline">
              {user.email}
            </p>
          </div>
        </div>
        <div className="pt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="medium-18 font-medium leading-6 text-gray-900 sm:col-span-4">
            Password
          </div>
          <InputBoxText
            id="password"
            type="password"
            label="Current Password"
            register={register}
            errors={errors}
            required
            className="sm:col-span-3"
          />

          <InputBoxText
            id="password"
            label="New Password"
            register={register}
            errors={errors}
            required
            className="sm:col-span-3"
          />
          <div className="sm:col-span-6 flex justify-end items-center -mt-4 gap-2">
            <button
              className={`bg-rose-600/90 text-xl p-2 px-6 rounded-lg text-white hover:bg-rose-700`}
              onClick={handleSubmit(onSubmit)}
            >
              Delete Account
            </button>
            <button
              className={`bg-blue-600/90 text-xl p-2 px-6 rounded-lg text-white hover:bg-blue-700`}
              onClick={handleSubmit(onSubmit)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountSetting;
