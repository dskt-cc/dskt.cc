import { use } from "react";
import { fetchMods, fetchModMeta } from "@lib/mods.lib";
import { ModPageClient } from "./ModPageClient";

type Props = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any; // @todo: same weird type error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams: any; // @todo: cope
};

export default function ModPage(props: Props) {
  const params = use(Promise.resolve(props.params));
  const { slug } = params;

  return <ModPageClient slug={slug} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  try {
    const mods = await fetchMods();
    const mod = mods.find((m) => m.name.toLowerCase() === slug.toLowerCase());

    if (!mod) return { title: "Mod Not Found" };

    const meta = await fetchModMeta(mod.repo);

    return {
      title: `${mod.name} | dskt.cc`,
      description: meta.description,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return { title: "dskt.cc" };
  }
}
