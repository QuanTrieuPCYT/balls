import { global_config } from "@/lib/global";
import { redirect } from "next/navigation";

export default function Page() {
  redirect(`${global_config.proxied_path}/auth`);
}
