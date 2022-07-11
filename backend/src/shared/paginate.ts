import { Logger } from "@nestjs/common";
import { PageInfo } from "./page-info";
import { PaginationArgs } from "./pagination-args";
import { SelectQueryBuilder, MoreThan, LessThan } from "typeorm";

export async function paginate<T>(
  query: SelectQueryBuilder<T>,
  paginationArgs: PaginationArgs,
  cursorColumn = "id",
  fieldName,
  defaultLimit = 5,
  reverse = true,
): Promise<any> {
  const logger = new Logger("Pagination");

  const a = await query.getMany();
  console.log(a);

  const totalCountQuery = query.clone();

  // FORWARD pagination
  if (paginationArgs.first) {
    if (paginationArgs.after) {
      const offsetId = Number(
        Buffer.from(paginationArgs.after, "base64").toString("ascii"),
      );

      logger.verbose(`Paginate AfterID: ${offsetId}`);
      query.andWhere({ [cursorColumn]: LessThan(offsetId) });
    }

    const limit = paginationArgs.first ?? defaultLimit;

    query.take(limit);
  }

  const result = await query.getMany();

  const startCursorId: number =
    result.length > 0 ? result[0][cursorColumn] : null;
  const endCursorId: number =
    result.length > 0 ? result.slice(-1)[0][cursorColumn] : null;

  const beforeQuery = totalCountQuery.clone();

  const afterQuery = beforeQuery.clone();

  let countBefore = 0;
  let countAfter = 0;
  if (
    beforeQuery.expressionMap.wheres &&
    beforeQuery.expressionMap.wheres.length
  ) {
    countBefore = await beforeQuery
      .andWhere(`${fieldName} < :cursor`, { cursor: startCursorId })
      .getCount();
    countAfter = await afterQuery
      .andWhere(`${fieldName} > :cursor`, { cursor: endCursorId })
      .getCount();
  }

  logger.debug(`CountBefore:${countBefore}`);
  logger.debug(`CountAfter:${countAfter}`);

  const edges = result.map((value) => {
    return {
      node: value,
      cursor: Buffer.from(`${value[cursorColumn]}`).toString("base64"),
    };
  });

  const pageInfo = new PageInfo();
  pageInfo.startCursor = edges.length > 0 ? edges[0].cursor : null;
  pageInfo.endCursor = edges.length > 0 ? edges.slice(-1)[0].cursor : null;

  pageInfo.hasNextPage = countAfter > 0;
  pageInfo.hasPreviousPage = countBefore > 0;
  // pageInfo.countBefore = countBefore;
  // pageInfo.countNext = countAfter;
  // pageInfo.countCurrent = edges.length;
  // pageInfo.countTotal = countAfter + countBefore + edges.length;

  return { edges, pageInfo };
}
