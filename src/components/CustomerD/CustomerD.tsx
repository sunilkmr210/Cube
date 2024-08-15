import React, { useEffect, useState } from "react";
import "./CustomerD.css";

const accessKey = "RWiUhBoqHSQPil8qjLuPBOwJGazAhMrarDIIR-ypEsM";

interface Customer {
  name: string;
  title: string;
  address: string;
}

interface CustomerProps {
  section: Customer | null;
}

const CustomerD: React.FC<CustomerProps> = ({ section }) => {
  const [imageUrls, setImageUrls] = useState([]);

  
  useEffect(() => {
    const fetchImages = async ()=>{
      try{
        const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}&count=9`)
        const data = await res.json();
        setImageUrls(data);
      }catch(err){
        console.log(err);
      }
    };
    
    fetchImages();

    const id = setInterval(()=>{
      fetchImages();
    }, 10000);

    return ()=> clearInterval(id);

  }, [section]);

  return (
    <div className="container">
      <div className="details">
        <h2>{section && section.name}</h2>
        <p>{section && section.title}</p>
        <p>Address: {section?.address}</p>
      </div>
      <div className="grid">
        {imageUrls.map((image: any) => {
          return <img key={image.urls} src={image.urls.regular} alt="crypto" />;
        })}
      </div>
    </div>
  );
};

export default CustomerD;
