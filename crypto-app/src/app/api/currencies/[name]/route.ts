import prisma from "@/lib/clients/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { name: string } }
) {
  const currency = params.name;
  await prisma.currency.delete({
    where: {
      name: String(currency),
    },
  });
  return new Response("", {
    status: 200,
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { name: string } }
) {
  const name = params.name;
  const res = await request.json();
  const { price } = res;
  const currency = await prisma.currency.findUnique({
    where: { name: name },
  });
  let newprices = currency?.prices!;
  if (newprices.includes(price)) {
    newprices.splice(newprices.indexOf(price), 1);
  } else {
    newprices.push(price);
  }
  await prisma.currency.update({
    where: {
      name: String(name),
    },
    data: {
      prices: {
        set: newprices,
      },
    },
  });
  return new Response("", {
    status: 200,
  });
}
