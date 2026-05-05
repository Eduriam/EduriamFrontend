// This page works as a workaround for a bug in NextJS ^9.1.7
// Bug Report: https://github.com/vercel/next.js/issues/10024
// Solution Source: https://github.com/vercel/next.js/discussions/40000#discussioncomment-6291368
import { notFound } from "next/navigation";

const NotFoundCatchAll = () => notFound();

export default NotFoundCatchAll;
