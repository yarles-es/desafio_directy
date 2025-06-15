import type { Title } from "../types/Table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setValueBySpecificKey = (title: string, data: any) => {
  if (title === "father" && data) {
    return data?.father?.name ? data.father.name : "";
  } else {
    return data[title];
  }
};

const sortTableByTypeNumber = (a: number, b: number) => {
  return a - b;
};

const sortTableByTypeString = (a: string, b: string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const sortTableByDate = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateA.getTime() - dateB.getTime();
};

const sortTableByTypeBoo = (a: boolean, b: boolean) => {
  return b === a ? 0 : b ? -1 : 1;
};

function sortTableByColumn<T>({
  titles,
  clickedKey,
  data,
  reverse = false,
}: {
  titles: Title[];
  clickedKey: string;
  data: T[];
  reverse?: boolean;
}): T[] {
  const title = titles.find((title) => title.key === clickedKey);

  if (!title) return data;
  if (title.order) {
    data.sort((a, b) => {
      const valueA = setValueBySpecificKey(clickedKey, a);
      const valueB = setValueBySpecificKey(clickedKey, b);
      if (title.type === "string") return sortTableByTypeString(valueA, valueB);
      if (title.type === "number")
        return sortTableByTypeNumber(Number(valueA), Number(valueB));
      if (title.type === "boolean") return sortTableByTypeBoo(valueA, valueB);
      if (title.type === "date") return sortTableByDate(valueA, valueB);
      return 0;
    });
  } else {
    return data;
  }

  return reverse ? data.reverse() : data;
}

export default sortTableByColumn;
