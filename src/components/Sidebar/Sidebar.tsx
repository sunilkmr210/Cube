import React from "react";
import { useEffect, useState } from "react";
import "./Sidebar.css";

interface Customer {
  name: string;
  title: string;
  address: string;
}

interface SidebarProps {
  onSelected: (section: Customer | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelected }) => {
  const [customers, setCustomers] = useState([]);
  const [index1, setIndex1] = useState<number | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("./customers.json");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCustomers();
  }, []);

  const handleClick = (index: number, element: Customer) => {
    setIndex1((prevIndex1) => (prevIndex1 === index ? null : index));
    onSelected(index1===index ? null : element);
  };

  return (
    <div className="sidebar">
      {customers.map((element: Customer, index) => {
        return (
          <div
            key={index}
            className={`sidebar-section ${index1 === index ? "active" : ""}`}
            onClick={() => handleClick(index, element)}
          >
            <div className="title">{element.name}</div>
            <div>{element.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
