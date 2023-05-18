import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import SelectData from "../components/SelectData";
import ShowData from "../components/ShowData";
import { Data } from "../Model/Data";
import { Info } from "../Model/Info";

interface Props {
  data: Data[];
  info: Info;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DataPage = ({ data, info, open, setOpen }: Props) => {
  const checkInfo = () => {
    if (info.name === "") {
      setOpen(true);
    }
  };

  useEffect(() => {
    checkInfo();
  }, []);

  return (
    <>
      {info.name === "" ? (
        <ErrorMessage open={open} setOpen={setOpen} />
      ) : (
        <div>
          <ShowData data={data} />
          <SelectData />
        </div>
      )}
    </>
  );
};

export default DataPage;
