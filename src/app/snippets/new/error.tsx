"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const NewSnippetsError = ({ error }: ErrorPageProps) => {
  return <div>{error.message}</div>;
};

export default NewSnippetsError;
