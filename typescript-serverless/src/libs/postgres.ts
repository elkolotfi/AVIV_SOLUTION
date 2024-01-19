import PostgresClient from "serverless-postgres";

const postgres = new PostgresClient({
  application_name: "listingapi-typescript",
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
const INITIALIZED = false;

export const getPostgres = async (): Promise<PostgresClient> => {
  if (!INITIALIZED) {
    await postgres.connect();
  }

  return postgres;
}

/**
 * Utility function to turn a dictionnary to a set of
 * rows, variables and values for selecting, inserting or updating
 * data in a table.
 */
export function extractVariables(row: object) {
  const columns = [];
  const variables = [];
  const columnsVariables = [];
  const values = [];

  for (const [index, [column, value]] of Object.entries(row).entries()) {
    columns.push(column);

    const variable = `$${index + 1}`;
    variables.push(variable);
    columnsVariables.push(`${column} = ${variable}`);

    values.push(value);
  }

  return { columns, variables, columnsVariables, values };
}
