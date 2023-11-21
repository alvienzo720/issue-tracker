import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json({ issues: issues }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch all issues from the Database",
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }
    const deletedIssue = await prisma.issue.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An Internal Server error occured" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, title, description } = await request.json();
    if (!id) {
      return NextResponse.json({ message: "No id provided" }, { status: 400 });
    }
    const updateIssue = await prisma.issue.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json(updateIssue, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
