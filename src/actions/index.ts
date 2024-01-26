"use server";
import { revalidatePath } from "next/cache";
// This needs to be a server action

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect("/");
}
export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title") as string; // form name property
    const code = formData.get("code") as string;

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer",
      };
    }
    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
    // throw new Error("Failed to save to database");
    // Redirect the user back to the root route
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    }
    return { message: "Something went Wrong" };
  }
  revalidatePath("/");
  redirect("/");
}
