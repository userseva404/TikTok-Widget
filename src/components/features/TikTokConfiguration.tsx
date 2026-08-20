import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { IWidgetParams, TTikTokVersions } from "../Widget";
import { Switch } from "../ui/Switch";

import { useCallback, useEffect } from "react";
import { useWidgetParams } from "@/store/useTikTokWidgetParams";
import { Select, SelectItem } from "../ui/Select";

export function TikTokConfiguration() {
  const { getByClient, setParams } = useWidgetParams();

  const params = getByClient("tiktok");

  const { handleSubmit, watch, control } = useForm<IWidgetParams>({
    defaultValues: params,
  });

  const version = watch("small");

  const onSubmit: SubmitHandler<IWidgetParams> = useCallback((data) => {
    setParams("tiktok", data);
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

      <Field label="Widget version:">
        <Controller
          name="small"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <div className="flex flex-col gap-y-2">
                {versions.map(({ name, value }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {name}
                    </SelectItem>
                  );
                })}
              </div>
            </Select>
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
            <Switch
              disabled={version !== "default"}
              value={version === "small" ? false : field.value}
              onChange={field.onChange}
            />
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

const versions: { name: string; value: TTikTokVersions }[] = [
  {
    name: "Default",
    value: "default",
  },
  { name: "Small", value: "small" },
];
