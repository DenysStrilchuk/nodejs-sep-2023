import { CronJob } from "cron";

import { EEmailActions } from "../constants/email.constants";
import { TimeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    console.log("[START CRON] Notify old visitors");
    const date = TimeHelper.subtractByParams(1, "days");
    const users = await userRepository.findWithOutActivityAfter(date);

    await Promise.all(
      users.map(async (user) => {
        return await emailService.sendMail(
          user.email,
          EEmailActions.OLD_VISITOR,
          {
            name: user.name,
          },
        );
      }),
    );
  } catch (error) {
    console.error("notifyOldVisitors: ", error);
  } finally {
    console.log("[END CRON] Notify old visitors");
  }
};

export const notifyOldVisitors = new CronJob("* * * 4 * *", handler);
