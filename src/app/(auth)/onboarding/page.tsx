import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { OnboardingForm } from "~/components/auth/onboarding-form";

export default function OnboardingPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Welcome onboard</CardTitle>
        <CardDescription>
          Please fill out the required information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OnboardingForm />
      </CardContent>
    </>
  );
}
