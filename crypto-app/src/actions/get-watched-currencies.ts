'use server'

import prisma from "@/lib/clients/prisma";

export const getWatchedCurrencies = async() => {
    const result = await prisma.currency.findMany();
    return result;
}