import { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type SubDepartment = {
  sub_department: string;
  checked: boolean;
};

type Item = {
  department: string;
  sub_departments: SubDepartment[];
};

const SelectData = () => {
  const [items, setItems] = useState<Item[]>([
    {
      department: "customer_service",
      sub_departments: [
        { sub_department: "support", checked: false },
        { sub_department: "customer_success", checked: false },
      ],
    },
    {
      department: "design",
      sub_departments: [
        { sub_department: "graphic_design", checked: false },
        { sub_department: "product_design", checked: false },
        { sub_department: "web_design", checked: false },
      ],
    },
  ]);

  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (department: string) => {
    if (expanded.includes(department)) {
      setExpanded(expanded.filter((dep) => dep !== department));
    } else {
      setExpanded([...expanded, department]);
    }
  };

  const isDepartmentExpanded = (department: string) =>
    expanded.includes(department);

  const handleDepartmentChange = (department: string, checked: boolean) => {
    const updatedItems = items.map((item) => {
      if (item.department === department) {
        const updatedSubDepartments = item.sub_departments.map((subDept) => ({
          ...subDept,
          checked,
        }));

        return {
          ...item,
          sub_departments: updatedSubDepartments,
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleSubDepartmentChange = (
    department: string,
    subDepartment: string,
    checked: boolean
  ) => {
    const updatedItems = items.map((item) => {
      if (item.department === department) {
        const updatedSubDepartments = item.sub_departments.map((subDept) => {
          if (subDept.sub_department === subDepartment) {
            return {
              ...subDept,
              checked,
            };
          }
          return subDept;
        });

        return {
          ...item,
          sub_departments: updatedSubDepartments,
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  return (
    <div className="flex flex-col items-center my-5">
      <p className="text-2xl md:text-4xl font-bold mt-5">Department List</p>
      <div className="flex flex-col justify-start">
        {items.map((item) => (
          <ul key={item.department} className="list-disc">
            <div className="flex items-center cursor-pointer">
              <span className="mr-2">
                {isDepartmentExpanded(item.department) ? (
                  <button onClick={() => toggleExpand(item.department)}>
                    <ExpandLessIcon />
                  </button>
                ) : (
                  <button onClick={() => toggleExpand(item.department)}>
                    <ExpandMoreIcon />
                  </button>
                )}
              </span>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={item.sub_departments.every(
                      (subDept) => subDept.checked
                    )}
                    onChange={(e) =>
                      handleDepartmentChange(item.department, e.target.checked)
                    }
                  />
                }
                label={item.department}
              />
            </div>
            {isDepartmentExpanded(item.department) &&
              item.sub_departments.map((subDept) => (
                <li key={subDept.sub_department} className="ml-14 list-none">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={subDept.checked}
                        onChange={(e) =>
                          handleSubDepartmentChange(
                            item.department,
                            subDept.sub_department,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={subDept.sub_department}
                  />
                </li>
              ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SelectData;
