import { Prisma, CheckIn } from "@prisma/client";
import { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckInRepository {
  private items: CheckIn[] = [];

  async findByUserIdOnDate(userId: string, _: Date) {
    const checkInOnSameDay = this.items.find((checkIn) => {
      return checkIn.user_id === userId;
    });

    if (!checkInOnSameDay) {
      return null;
    }

    return checkInOnSameDay;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
