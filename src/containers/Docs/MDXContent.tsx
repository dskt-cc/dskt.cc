import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { ClientMDX } from "@components/MDX/ClientMDX";

export function MDXContent({ source }: { source: MDXRemoteSerializeResult }) {
  return <ClientMDX source={source} />;
}
