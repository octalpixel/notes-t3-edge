import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
    <SignUp path="/signup" routing="path" signInUrl="/signin" />
);
export default SignUpPage;
