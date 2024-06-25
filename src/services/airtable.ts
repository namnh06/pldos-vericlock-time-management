import Airtable, { Record } from "airtable";
import dotenv from "dotenv";
import { STATUS_CLOCKED_IN } from "../constants";
import { CreateData, UpdateData } from "../types";

const environment: string = process.env.NODE_ENV || "development";
dotenv.config({ path: `./.env.${environment}` });

const airtablePATKey: string = process.env.AIRTABLE_API_KEY || "";
const airtableBaseID: string = process.env.AIRTABLE_BASE_ID || "";
const airtableTableName: string = process.env.AIRTABLE_TABLE_NAME || "";

const base = new Airtable({ apiKey: airtablePATKey }).base(airtableBaseID);

export const createRecordClockIn = async (data: any) => {
  try {
    const record = await base(airtableTableName).create(data);
    return record;
  } catch (error) {
    console.error(`Error creating Airtable record: ${error}`);
    throw error;
  }
};

export const updateRecordClockOut = async (recordID: string, data: any) => {
  try {
    const record = await base(airtableTableName).update(recordID, data);
    return record;
  } catch (error) {
    console.error(`Error updating Airtable record: ${error}`);
    throw error;
  }
};

export const findRecordIdToUpdateClockOut = async (
  root: string,
  employeeId: string,
  start: string
): Promise<string | null> => {
  try {
    const formula = `AND(
        {Root} = '${root}', 
        {Employee ID} = '${employeeId}', 
        {Start} = '${start}', 
        {Status} = '${STATUS_CLOCKED_IN}', 
        {End} = ''
    )`;
    const records = await base(airtableTableName)
      .select({
        filterByFormula: formula,
      })
      .firstPage();

    if (records && records.length > 0) {
      return records[0].id;
    }
    return null;
  } catch (error) {
    console.error(`Error finding Airtable record: ${error}`);
    throw error;
  }
};
