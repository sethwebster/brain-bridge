/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import Input from "~/app/components/Input";
import { handleSettingsSubmit } from "../actions";
import { type UserSettings } from "@prisma/client";
import { useState, useTransition } from "react";
import Button from "~/base-components/Button";
import { toast } from "react-toastify";

export default function Settings({ settings }: { settings: UserSettings }) {
  const [openAIApiKey, setopenAIApiKey] = useState(settings?.openAIApiKey ?? "");
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ openAIApiKey?: string }>({});
  return (
    <form
      action={() =>
        startTransition(async () => {
          try {
            setErrors({});
            console.log("submitting");
            const result = await handleSettingsSubmit({ openAIApiKey });
            if (result.errors.openAIApiKey) {
              setErrors(result.errors);
              return;
            } else {
              toast.success("Settings saved");
            }
          } catch (err) {
            console.error(err);
          }
        })
      }
    >
      <div className="flex flex-col">
        <label>OpenAPI Key</label>
        <Input
          name="openAIApiKey"
          defaultValue={settings?.openAIApiKey ?? ""}
          onChange={(e) => setopenAIApiKey(e.target.value)}
          disabled={isPending}
          placeholder="OpenAPI Key, ie. sk-23u90fuoijknwdu9o12jiebwuidhqoil"
        />
        {errors.openAIApiKey && (<div className="text-red-500">{errors.openAIApiKey}</div>)}
      </div>
      <Button type="submit" disabled={isPending} className="mt-2">
        Save
      </Button>
    </form>
  );
}
