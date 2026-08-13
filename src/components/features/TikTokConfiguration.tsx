import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { IWidgetParams } from "../Widget";
import { Switch } from "../ui/Switch";
import { useTikTokWidgetParams } from "store/useTikTokWidgetParams";
import { useCallback, useEffect } from "react";

export function TikTokConfiguration() {
  const { params, setParams } = useTikTokWidgetParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IWidgetParams>({
    defaultValues: params,
  });

  const onSubmit: SubmitHandler<IWidgetParams> = useCallback((data) => {
    setParams(data);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      handleSubmit(onSubmit)();
    });
    return () => subscription.unsubscribe();
  }, [watch, handleSubmit, onSubmit]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-x-10 gap-y-2 justify-evenly w-full items-center text-[1.35rem]"
    >
      <Field label="Description:">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field label="Small version:">
        <Controller
          name="small"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field label="Show stats:">
        <Controller
          name="stats"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>

      <Field label="Animation:">
        <Controller
          name="videoPartAnim"
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onChange={field.onChange} />
          )}
        />
      </Field>
    </form>
  );
}

const Field = ({
  label = "",
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <label>{label}</label>
      {children}
    </div>
  );
};
