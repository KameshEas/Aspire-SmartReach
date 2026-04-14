import type { Metadata } from "next";
import SignUpForm from "@/components/sections/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | Aspire SmartReach",
  description: "Create your Aspire SmartReach workspace and start scaling personalized outreach with AI.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
