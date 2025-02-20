import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
import { getSession } from "next-auth/react";

import { withAuthentication } from "lib/api-middlewares/with-authentication";
import { withMethods } from "lib/api-middlewares/with-methods";
import { db } from "lib/db";
import { withUser } from "lib/api-middlewares/with-user";
import { userNameSchema } from "lib/validations/user";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    try {
      const session = await getSession({ req });
      const user = session?.user;

      const body = JSON.parse(req.body);

      if (body?.name) {
        const payload = userNameSchema.parse(body);

        await db.user.update({
          where: {
            id: user.id,
          },
          data: {
            name: payload.name,
          },
        });
      }

      return res.end();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).end();
    }
  }
}

export default withMethods(["PATCH"], withAuthentication(withUser(handler)));
